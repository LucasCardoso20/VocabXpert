import { appStorage } from '@/src/storage/appStorage';

export type StudyVerdict =
  | 'CORRECT'
  | 'PARTIAL'
  | 'INCORRECT'
  | 'UNKNOWN';

export type StudyOutcome = 'KNOWN' | 'UNKNOWN';

export type StudyAttemptStatsInput = {
  verdict: StudyVerdict;
  outcome: StudyOutcome;
  score: number;
  exerciseType: string;
};

export type StudySkipStatsInput = {
  exerciseType: string;
};

export type StudySessionStats = {
  sessionId: string;
  startedAt: string;
  finishedAt: string | null;

  answered: number;
  skipped: number;

  correct: number;
  partial: number;
  incorrect: number;

  known: number;
  unknown: number;

  totalScore: number;

  /**
   * Contabiliza somente exercícios respondidos.
   */
  exerciseTypes: Record<string, number>;

  /**
   * Contabiliza exercícios pulados por formato.
   */
  skippedExerciseTypes: Record<string, number>;
};

const statsKey = (sessionId: string) =>
  `study_session_stats_${sessionId}`;

function createEmptyStats(sessionId: string): StudySessionStats {
  return {
    sessionId,
    startedAt: new Date().toISOString(),
    finishedAt: null,

    answered: 0,
    skipped: 0,

    correct: 0,
    partial: 0,
    incorrect: 0,

    known: 0,
    unknown: 0,

    totalScore: 0,

    exerciseTypes: {},
    skippedExerciseTypes: {},
  };
}

function normalizeStudySessionStats(
  value: Partial<StudySessionStats>
): StudySessionStats {
  return {
    sessionId: value.sessionId ?? '',
    startedAt: value.startedAt ?? new Date().toISOString(),
    finishedAt: value.finishedAt ?? null,

    answered: value.answered ?? 0,
    skipped: value.skipped ?? 0,

    correct: value.correct ?? 0,
    partial: value.partial ?? 0,
    incorrect: value.incorrect ?? 0,

    known: value.known ?? 0,
    unknown: value.unknown ?? 0,

    totalScore: value.totalScore ?? 0,

    exerciseTypes: value.exerciseTypes ?? {},
    skippedExerciseTypes: value.skippedExerciseTypes ?? {},
  };
}

function normalizeScore(score: number) {
  if (!Number.isFinite(score)) {
    return 0;
  }

  // O backend normalmente trabalha com 0 a 1.
  // Também aceita defensivamente uma eventual escala de 0 a 100.
  const normalized = score > 1 ? score / 100 : score;

  return Math.max(0, Math.min(1, normalized));
}

export function getStudyAverageScore(stats: StudySessionStats) {
  if (stats.answered === 0) {
    return 0;
  }

  return stats.totalScore / stats.answered;
}

export async function getStudySessionStats(
  sessionId: string
): Promise<StudySessionStats | null> {
  const raw = await appStorage.getItem(statsKey(sessionId));

  if (!raw) {
    return null;
  }

  try {
    return normalizeStudySessionStats(
      JSON.parse(raw) as Partial<StudySessionStats>
    );
  } catch {
    await appStorage.removeItem(statsKey(sessionId));
    return null;
  }
}

/**
 * Cria o registro somente se ele ainda não existir.
 * Seguro para recarregamentos/HMR sem zerar a sessão atual.
 */
export async function ensureStudySessionStats(
  sessionId: string
): Promise<StudySessionStats> {
  const existing = await getStudySessionStats(sessionId);

  if (existing) {
    return existing;
  }

  const stats = createEmptyStats(sessionId);

  await appStorage.setItem(statsKey(sessionId), JSON.stringify(stats));

  return stats;
}

export async function registerStudyAttempt(
  sessionId: string,
  input: StudyAttemptStatsInput
): Promise<StudySessionStats> {
  const current =
    (await getStudySessionStats(sessionId)) ??
    createEmptyStats(sessionId);

  const score = normalizeScore(input.score);

  const next: StudySessionStats = {
    ...current,
    answered: current.answered + 1,
    totalScore: current.totalScore + score,

    correct:
      input.verdict === 'CORRECT'
        ? current.correct + 1
        : current.correct,

    partial:
      input.verdict === 'PARTIAL'
        ? current.partial + 1
        : current.partial,

    incorrect:
      input.verdict === 'INCORRECT' || input.verdict === 'UNKNOWN'
        ? current.incorrect + 1
        : current.incorrect,

    known:
      input.outcome === 'KNOWN'
        ? current.known + 1
        : current.known,

    unknown:
      input.outcome === 'UNKNOWN'
        ? current.unknown + 1
        : current.unknown,

    exerciseTypes: {
      ...current.exerciseTypes,
      [input.exerciseType]:
        (current.exerciseTypes[input.exerciseType] ?? 0) + 1,
    },
  };

  await appStorage.setItem(statsKey(sessionId), JSON.stringify(next));

  return next;
}

export async function registerStudySkip(
  sessionId: string,
  input: StudySkipStatsInput
): Promise<StudySessionStats> {
  const current =
    (await getStudySessionStats(sessionId)) ??
    createEmptyStats(sessionId);

  const next: StudySessionStats = {
    ...current,
    skipped: current.skipped + 1,

    skippedExerciseTypes: {
      ...current.skippedExerciseTypes,
      [input.exerciseType]:
        (current.skippedExerciseTypes[input.exerciseType] ?? 0) + 1,
    },
  };

  await appStorage.setItem(statsKey(sessionId), JSON.stringify(next));

  return next;
}

export async function finishStudySessionStats(
  sessionId: string
): Promise<StudySessionStats> {
  const current =
    (await getStudySessionStats(sessionId)) ??
    createEmptyStats(sessionId);

  const finished: StudySessionStats = {
    ...current,
    finishedAt: new Date().toISOString(),
  };

  await appStorage.setItem(statsKey(sessionId), JSON.stringify(finished));

  return finished;
}