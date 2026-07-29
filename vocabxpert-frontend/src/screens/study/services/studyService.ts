// src/screens/study/services/studyService.ts
import { appStorage } from '../../../storage/appStorage';
import apiClient from '../../../api/client';

export type StudyScope = 'LAST_10' | 'ALL' | 'DUE';

export type StudyDirection =
  | 'WORD_TO_TRANSLATION'
  | 'TRANSLATION_TO_WORD';

export type SessionExerciseType =
  | 'RANDOM'
  | 'MULTIPLE_CHOICE_TRANSLATION'
  | 'CREATE_SENTENCE'
  | 'CLOZE'
  | 'FLASHCARD'
  | 'MATCH'
  | 'DICTATION'
  | 'CHOOSE_CORRECT_EXAMPLE'
  | 'WORD_ORDER';

export type ConcreteExerciseType = Exclude<SessionExerciseType, 'RANDOM'>;

export type StudyExercise = {
  id: string;
  sessionId: string;
  vocabId: string;
  type: ConcreteExerciseType;
  payload: unknown;
  createdAt: string;
};

export type StudyConfig = {
  exerciseTypes: SessionExerciseType[];
  scopes: StudyScope[];
  defaults: {
    exerciseType: SessionExerciseType;
    scope: StudyScope;
    limit: number;
    direction: StudyDirection;
  };
};

export type StudyList = {
  id: string;
  name: string;
  isDefault: boolean;
  createdAt?: string;
};

export type CreateStudySessionBody = {
  listId: string;
  exerciseType: SessionExerciseType;
  enabledExerciseTypes?: ConcreteExerciseType[];
  scope: StudyScope;
  limit: number;
  direction: StudyDirection;
};

export type CreateStudySessionResponse = {
  sessionId: string;
  firstExercise: StudyExercise | null;
};

// apps/api/src/services/ai/evaluateExercise.gemini.ts
export type Issue = {
  type: 'grammar' | 'spelling' | 'vocabulary' | 'meaning' | 'other';
  explanation: string;
  startIndex?: number;
  endIndex?: number;
};

export type SubmitAttemptResponse = {
  ok: true;
  attemptId: string;
  reviewId: string;
  outcome: 'KNOWN' | 'UNKNOWN';
  verdict: 'CORRECT' | 'PARTIAL' | 'INCORRECT' | 'UNKNOWN';
  score: number;
  feedback: string;
  nextDueAt: string | null;
  evaluator: 'DETERMINISTIC' | 'GEMINI';
  aiModel?: string;
  latencyMs: number;
  correctedSentence?: string;
  issues?: Issue[];
};

type StudyListsResponse = {
  items: StudyList[];
};

type NextExerciseResponse = {
  ok: true;
  sessionId: string;
  exercise: StudyExercise | null;
};

const initialExerciseKey = (sessionId: string) =>
  `study_initial_exercise_${sessionId}`;

async function getAuthHeaders() {
  const userId = await appStorage.getItem('x-user-id');

  if (!userId) {
    throw new Error('USER_ID_NOT_FOUND');
  }

  return {
    'x-user-id': userId,
  };
}

/**
 * GET /study/config
 */
export async function fetchStudyConfig(): Promise<StudyConfig> {
  const headers = await getAuthHeaders();

  const { data } = await apiClient.get<StudyConfig>('/study/config', {
    headers,
    timeout: 20000,
  });

  return data;
}

/**
 * GET /lists
 */
export async function fetchStudyLists(): Promise<StudyList[]> {
  const headers = await getAuthHeaders();

  const { data } = await apiClient.get<StudyListsResponse>('/lists', {
    headers,
    timeout: 20000,
  });

  return data.items ?? [];
}

/**
 * POST /study/session
 */
export async function createStudySession(
  body: CreateStudySessionBody
): Promise<CreateStudySessionResponse> {
  const headers = await getAuthHeaders();

  const { data } = await apiClient.post<CreateStudySessionResponse>(
    '/study/session',
    body,
    {
      headers,
      timeout: 30000,
    }
  );

  return data;
}

/**
 * POST /study/exercises/:exerciseId/attempt
 */
export async function submitStudyAttempt(
  exerciseId: string,
  response: unknown
): Promise<SubmitAttemptResponse> {
  const headers = await getAuthHeaders();

  const { data } = await apiClient.post<SubmitAttemptResponse>(
    `/study/exercises/${exerciseId}/attempt`,
    { response },
    {
      headers,
      timeout: 60000,
    }
  );

  return data;
}

/**
 * GET /study/sessions/:sessionId/next
 */
export async function fetchNextStudyExercise(
  sessionId: string
): Promise<NextExerciseResponse> {
  const headers = await getAuthHeaders();

  const { data } = await apiClient.get<NextExerciseResponse>(
    `/study/sessions/${sessionId}/next`,
    {
      headers,
      timeout: 30000,
    }
  );

  return data;
}

/**
 * POST /study/sessions/:sessionId/finish
 */
export async function finishStudySession(
  sessionId: string
): Promise<{ ok: true }> {
  const headers = await getAuthHeaders();

  const { data } = await apiClient.post<{ ok: true }>(
    `/study/sessions/${sessionId}/finish`,
    {},
    {
      headers,
      timeout: 20000,
    }
  );

  return data;
}

/**
 * O primeiro exercício vem apenas no POST /study/session.
 *
 * Guardamos localmente para a tela de exercício recebê-lo sem
 * colocar um JSON gigante na URL.
 */
export async function cacheInitialStudyExercise(
  sessionId: string,
  exercise: StudyExercise
) {
  await appStorage.setItem(
    initialExerciseKey(sessionId),
    JSON.stringify(exercise)
  );
}

/**
 * Mantém o exercício no cache até ele ser respondido.
 * Assim, se houver um reload antes da resposta, ele não se perde.
 */
export async function getCachedInitialStudyExercise(
  sessionId: string
): Promise<StudyExercise | null> {
  const raw = await appStorage.getItem(initialExerciseKey(sessionId));

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StudyExercise;
  } catch {
    await removeCachedInitialStudyExercise(sessionId);
    return null;
  }
}

export async function removeCachedInitialStudyExercise(sessionId: string) {
  await appStorage.removeItem(initialExerciseKey(sessionId));
}