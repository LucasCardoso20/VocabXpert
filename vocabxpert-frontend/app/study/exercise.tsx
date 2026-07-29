// app/study/exercise.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as Speech from 'expo-speech';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { radio } from '../../src/theme/radio';
import {
  ensureStudySessionStats,
  finishStudySessionStats,
  registerStudyAttempt,
  registerStudySkip
} from '@/src/screens/study/services/studyStatsService';
import {
  fetchNextStudyExercise,
  finishStudySession,
  getCachedInitialStudyExercise,
  removeCachedInitialStudyExercise,
  submitStudyAttempt,
  type StudyExercise,
  type SubmitAttemptResponse,
  type Issue,
} from '../../src/screens/study/services/studyService';

type ChoicePayload = {
  prompt?: string;
  sentence?: string;
  word?: string;
  options?: string[];
  correctIndex?: number;
  direction?: string;
};

type FlashcardPayload = {
  front?: string;
  back?: string | null;
  direction?: string;
  note?: string | null;
};

type WordOrderPayload = {
  tokens?: string[];
  targetSentence?: string;
  mustIncludeWord?: string;
};

type WordOrderToken = {
  id: string;
  value: string;
};

type MatchPayload = {
  left?: string[];
  right?: string[];
  pairs?: Array<{
    word: string;
    translation: string;
  }>;
};

type MatchSelection = {
  word: string;
  translation: string;
};

type DictationPayload = {
  language?: string;
  locale?: string;
  textToDictate?: string;
  hintTranslation?: string;
};

type CreateSentencePayload = {
  word?: string;
  translation?: string | null;
  constraints?: {
    language?: string;
    minWords?: number;
    mustIncludeWord?: boolean;
    forbidNativeLanguage?: boolean;
  };
};

function createWordOrderTokens(tokens: string[]): WordOrderToken[] {
  return tokens.map((value, index) => ({
    id: `${index}-${value}`,
    value,
  }));
}

type ChoiceExerciseType =
  | 'MULTIPLE_CHOICE_TRANSLATION'
  | 'CLOZE'
  | 'CHOOSE_CORRECT_EXAMPLE';

function isChoiceExercise(
  type: StudyExercise['type']
): type is ChoiceExerciseType {
  return (
    type === 'MULTIPLE_CHOICE_TRANSLATION' ||
    type === 'CLOZE' ||
    type === 'CHOOSE_CORRECT_EXAMPLE'
  );
}

function getChoiceInstruction(type: ChoiceExerciseType) {
  if (type === 'MULTIPLE_CHOICE_TRANSLATION') {
    return 'Escolha a resposta correta';
  }

  if (type === 'CLOZE') {
    return 'Complete a frase';
  }

  return 'Escolha o exemplo correto';
}

function getChoicePrompt(
  type: ChoiceExerciseType,
  payload: ChoicePayload | null
) {
  if (type === 'MULTIPLE_CHOICE_TRANSLATION') {
    return payload?.prompt ?? 'Palavra indisponível';
  }

  if (type === 'CLOZE') {
    return payload?.sentence ?? 'Frase indisponível';
  }

  if (payload?.word) {
    return `Qual frase usa “${payload.word}” corretamente?`;
  }

  return 'Escolha a frase correta.';
}

function getExerciseLabel(type: StudyExercise['type']) {
  if (type === 'FLASHCARD') return 'Flashcard';

  if (type === 'MULTIPLE_CHOICE_TRANSLATION') {
    return 'Múltipla escolha';
  }

  if (type === 'CLOZE') {
    return 'Complete a frase';
  }

  if (type === 'CHOOSE_CORRECT_EXAMPLE') {
    return 'Exemplo correto';
  }

  if (type === 'WORD_ORDER') {
    return 'Ordene as palavras';
  }

  if (type === 'MATCH') {
    return 'Associar pares';
  }

  if (type === 'DICTATION') {
    return 'Ditado';
  }

  if (type === 'CREATE_SENTENCE') {
  return 'Criar frase';
}

  return 'Exercício';
}

function getVerdictTitle(verdict: SubmitAttemptResponse['verdict']) {
  if (verdict === 'CORRECT') return 'Muito bem!';
  if (verdict === 'PARTIAL') return 'Quase lá!';
  if (verdict === 'INCORRECT') return 'Continue praticando';
  return 'Avaliação indisponível';
}

function normalizeWordOrderToken(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

export default function ExerciseScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    sessionId?: string | string[];
  }>();

  const sessionId = Array.isArray(params.sessionId)
    ? params.sessionId[0]
    : params.sessionId;

  const [loading, setLoading] = useState(true);
  const [loadingNext, setLoadingNext] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [exercise, setExercise] = useState<StudyExercise | null>(null);
  const [attempt, setAttempt] = useState<SubmitAttemptResponse | null>(null);
  const [finished, setFinished] = useState(false);

  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );

  const [wordOrderAvailableTokens, setWordOrderAvailableTokens] = useState<
    WordOrderToken[]
  >([]);

  const [wordOrderAnswerTokens, setWordOrderAnswerTokens] = useState<
    WordOrderToken[]
  >([]);

  const [selectedMatchWord, setSelectedMatchWord] = useState<string | null>(
  null
);

const [matchSelections, setMatchSelections] = useState<MatchSelection[]>([]);

  const [flashcardAnswer, setFlashcardAnswer] = useState('');
const [dictationAnswer, setDictationAnswer] = useState('');
const [createdSentence, setCreatedSentence] = useState('');
  const loadInitialExercise = useCallback(async () => {
    if (!sessionId) {
      setError('Identificador da sessão não encontrado.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      /**
       * Não chamamos /next automaticamente quando o cache está vazio.
       *
       * Isso evita pular o primeiro exercício caso o usuário entre
       * diretamente nesta tela por engano.
       */
      const cachedExercise = await getCachedInitialStudyExercise(sessionId);

      if (!cachedExercise) {
        setError(
          'Não foi possível recuperar o primeiro exercício desta sessão. Inicie uma nova sessão de estudo.'
        );
        return;
      }

      setExercise(cachedExercise);
      setAttempt(null);
      setFinished(false);
      setSelectedOptionIndex(null);
      setFlashcardAnswer('');
      setDictationAnswer('');
      setCreatedSentence('');
    } catch (err: any) {
      console.error(
        '[ExerciseScreen] load initial error:',
        err?.response?.data ?? err?.message ?? err
      );

      setError('Não foi possível carregar o exercício.');
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    const initializeStudySession = async () => {
      if (sessionId) {
        try {
          /**
           * Cria as estatísticas locais desta sessão somente
           * se elas ainda não existirem.
           *
           * Não apaga nem reinicia estatísticas existentes.
           */
          await ensureStudySessionStats(sessionId);
        } catch (err) {
          /**
           * Não impedimos o exercício de carregar se, por algum
           * motivo, o armazenamento local das estatísticas falhar.
           */
          console.warn(
            '[ExerciseScreen] failed to initialize session stats:',
            err
          );
        }
      }

      /**
       * Mantém sua lógica atual: carrega o primeiro exercício
       * salvo no cache da sessão.
       */
      await loadInitialExercise();
    };

    void initializeStudySession();
  }, [loadInitialExercise, sessionId]);

  const choicePayload = useMemo<ChoicePayload | null>(() => {
    if (!exercise || !isChoiceExercise(exercise.type)) {
      return null;
    }

    return exercise.payload as ChoicePayload;
  }, [exercise]);

  const flashcardPayload = useMemo(() => {
    if (exercise?.type !== 'FLASHCARD') {
      return null;
    }

    return exercise.payload as FlashcardPayload;
  }, [exercise]);

  const wordOrderPayload = useMemo<WordOrderPayload | null>(() => {
    if (exercise?.type !== 'WORD_ORDER') {
      return null;
    }

    return exercise.payload as WordOrderPayload;
  }, [exercise]);

  const matchPayload = useMemo<MatchPayload | null>(() => {
  if (exercise?.type !== 'MATCH') {
    return null;
  }

  return exercise.payload as MatchPayload;
}, [exercise]);

const dictationPayload = useMemo<DictationPayload | null>(() => {
  if (exercise?.type !== 'DICTATION') {
    return null;
  }

  return exercise.payload as DictationPayload;
}, [exercise]);

  const correctWordOrderTokens = useMemo(() => {
  const targetSentence = wordOrderPayload?.targetSentence;

  if (!targetSentence) {
    return [];
  }

  return targetSentence
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}, [wordOrderPayload?.targetSentence]);

const createSentencePayload = useMemo<CreateSentencePayload | null>(() => {
  if (exercise?.type !== 'CREATE_SENTENCE') {
    return null;
  }

  return exercise.payload as CreateSentencePayload;
}, [exercise]);

const playDictation = useCallback(async () => {
  const text = dictationPayload?.textToDictate?.trim();
  const locale = dictationPayload?.locale?.trim();

  if (!text) {
    setError('Não foi possível carregar o texto deste ditado.');
    return;
  }

  if (!locale) {
    setError(
      'Este ditado não possui um idioma configurado para reprodução.'
    );
    return;
  }

  try {
    await Speech.stop();

    Speech.speak(text, {
      language: locale,
      rate: 0.82,
      pitch: 1,
    });
  } catch (err) {
    console.warn('[ExerciseScreen] dictation speech error:', err);

    setError('Não foi possível reproduzir o áudio do ditado.');
  }
}, [dictationPayload]);

useEffect(() => {
  if (exercise?.type !== 'DICTATION') {
    return;
  }

  setDictationAnswer('');

  /**
   * Pequeno atraso para a tela terminar de montar antes da fala.
   */
  const timeoutId = setTimeout(() => {
    void playDictation();
  }, 250);

  return () => {
    clearTimeout(timeoutId);
  };
}, [exercise?.id, exercise?.type, playDictation]);

useEffect(() => {
  return () => {
    void Speech.stop();
  };
}, []);

  useEffect(() => {
    if (exercise?.type !== 'WORD_ORDER') {
      setWordOrderAvailableTokens([]);
      setWordOrderAnswerTokens([]);
      return;
    }

    const payload = exercise.payload as WordOrderPayload;

    const tokens = Array.isArray(payload.tokens)
      ? payload.tokens.filter(
        (token): token is string =>
          typeof token === 'string' && token.trim().length > 0
      )
      : [];

    setWordOrderAvailableTokens(createWordOrderTokens(tokens));
    setWordOrderAnswerTokens([]);
  }, [exercise]);

  useEffect(() => {
  if (exercise?.type !== 'MATCH') {
    setSelectedMatchWord(null);
    setMatchSelections([]);
    return;
  }

  setSelectedMatchWord(null);
  setMatchSelections([]);
}, [exercise]);

  const addWordOrderToken = (token: WordOrderToken) => {
    if (submitting || attempt) {
      return;
    }

    setWordOrderAvailableTokens((current) =>
      current.filter((item) => item.id !== token.id)
    );

    setWordOrderAnswerTokens((current) => [...current, token]);
  };

  const removeWordOrderToken = (token: WordOrderToken) => {
    if (submitting || attempt) {
      return;
    }

    setWordOrderAnswerTokens((current) =>
      current.filter((item) => item.id !== token.id)
    );

    setWordOrderAvailableTokens((current) => [...current, token]);
  };

  const selectMatchWord = (word: string) => {
  if (submitting || attempt) {
    return;
  }

  const alreadyMatched = matchSelections.some(
    (match) => match.word === word
  );

  if (alreadyMatched) {
    setMatchSelections((current) =>
      current.filter((match) => match.word !== word)
    );

    if (selectedMatchWord === word) {
      setSelectedMatchWord(null);
    }

    return;
  }

  setSelectedMatchWord(word);
};

const selectMatchTranslation = (translation: string) => {
  if (submitting || attempt || !selectedMatchWord) {
    return;
  }

  const translationAlreadyUsed = matchSelections.some(
    (match) => match.translation === translation
  );

  if (translationAlreadyUsed) {
    return;
  }

  setMatchSelections((current) => [
    ...current,
    {
      word: selectedMatchWord,
      translation,
    },
  ]);

  setSelectedMatchWord(null);
};

  const sendAttempt = useCallback(async () => {
    if (!exercise || submitting || attempt) return;

    let response: unknown;

    if (isChoiceExercise(exercise.type)) {
      if (selectedOptionIndex === null) {
        Alert.alert(
          'Escolha uma resposta',
          'Selecione uma das alternativas.'
        );
        return;
      }

      response = {
        index: selectedOptionIndex,
      };
    } else if (exercise.type === 'FLASHCARD') {
      const answer = flashcardAnswer.trim();

      if (!answer) {
        Alert.alert(
          'Digite uma resposta',
          'Preencha sua resposta antes de continuar.'
        );
        return;
      }

      response = {
        answer,
      };
    } else if (exercise.type === 'WORD_ORDER') {
      if (wordOrderAnswerTokens.length === 0) {
        Alert.alert(
          'Monte a frase',
          'Toque nas palavras para colocá-las na ordem correta.'
        );
        return;
      }

      if (wordOrderAvailableTokens.length > 0) {
        Alert.alert(
          'Frase incompleta',
          'Use todas as palavras antes de verificar a resposta.'
        );
        return;
      }

      response = {
        tokens: wordOrderAnswerTokens.map((token) => token.value),
      };
    } else if (exercise.type === 'MATCH') {
  const totalWords = Array.isArray(matchPayload?.left)
    ? matchPayload.left.length
    : 0;

  if (totalWords === 0) {
    setError('Não foi possível carregar os pares deste exercício.');
    return;
  }

  if (matchSelections.length !== totalWords) {
    Alert.alert(
      'Complete todos os pares',
      'Associe cada palavra à sua tradução antes de verificar a resposta.'
    );
    return;
  }

  response = {
    matches: matchSelections,
  };
}else if (exercise.type === 'DICTATION') {
  const text = dictationAnswer.trim();

  if (!text) {
    Alert.alert(
      'Digite o que ouviu',
      'Ouça o áudio e escreva a frase antes de verificar sua resposta.'
    );
    return;
  }

  response = {
    text,
  };
}else if (exercise.type === 'CREATE_SENTENCE') {
  const sentence = createdSentence.trim();

  if (!sentence) {
    Alert.alert(
      'Escreva uma frase',
      'Crie uma frase antes de verificar sua resposta.'
    );
    return;
  }

  response = {
    sentence,
  };
} else {
  setError(
    `O tipo ${exercise.type} ainda não está disponível nesta etapa.`
  );
  return;
}

    try {
      setSubmitting(true);
      setError(null);

      const result = await submitStudyAttempt(exercise.id, response);
      if (sessionId) {
        try {
          await registerStudyAttempt(sessionId, {
            verdict: result.verdict,
            outcome: result.outcome,
            score: result.score,
            exerciseType: exercise.type,
          });
        } catch (statsError) {
          /**
           * A resposta já foi salva no backend.
           * Então falha de estatística local não deve impedir
           * o usuário de receber o feedback do exercício.
           */
          console.warn(
            '[ExerciseScreen] failed to register attempt stats:',
            statsError
          );
        }
      }
      /**
       * O primeiro exercício já foi respondido com sucesso.
       * Agora ele não precisa mais ficar no armazenamento local.
       */
      if (sessionId) {
        await removeCachedInitialStudyExercise(sessionId);
      }

      setAttempt(result);
    } catch (err: any) {
      console.error(
        '[ExerciseScreen] submit attempt error:',
        err?.response?.data ?? err?.message ?? err
      );

      const apiError = err?.response?.data?.error;

      if (apiError === 'INVALID_RESPONSE_SHAPE') {
        setError('A resposta enviada não possui o formato esperado.');
      } else if (apiError === 'EXERCISE_NOT_FOUND') {
        setError('Este exercício não existe mais ou não pertence ao usuário.');
      } else {
        setError('Não foi possível avaliar sua resposta.');
      }
    } finally {
      setSubmitting(false);
    }
  }, [
  attempt,
  createdSentence,
  dictationAnswer,
  exercise,
  flashcardAnswer,
  matchPayload,
  matchSelections,
  selectedOptionIndex,
  sessionId,
  submitting,
  wordOrderAnswerTokens,
  wordOrderAvailableTokens,
]);

  const loadNextExercise = useCallback(async () => {
    if (!sessionId || loadingNext) return;

    try {
      setLoadingNext(true);
      setError(null);

      const result = await fetchNextStudyExercise(sessionId);

      if (!result.exercise) {
        try {
          await finishStudySessionStats(sessionId);
        } catch (statsError) {
          console.warn(
            '[ExerciseScreen] failed to finish session stats:',
            statsError
          );
        }

        router.replace({
          pathname: '/study/results',
          params: {
            sessionId,
          },
        });

        return;
      }

      setExercise(result.exercise);
      setAttempt(null);
      setSelectedOptionIndex(null);
      setFlashcardAnswer('');
      setDictationAnswer('');
      setCreatedSentence('');
    } catch (err: any) {
      console.error(
        '[ExerciseScreen] next exercise error:',
        err?.response?.data ?? err?.message ?? err
      );

      setError('Não foi possível carregar o próximo exercício.');
    } finally {
      setLoadingNext(false);
    }
  }, [loadingNext, sessionId]);

  const skipCurrentExercise = useCallback(async () => {
  if (!sessionId || submitting || loadingNext || attempt) {
    return;
  }

  try {
    setError(null);

    if (exercise) {
      await registerStudySkip(sessionId, {
        exerciseType: exercise.type,
      });
    }

    await removeCachedInitialStudyExercise(sessionId);

    await loadNextExercise();
  } catch (err) {
    console.warn('[ExerciseScreen] skip exercise error:', err);
    setError('Não foi possível pular este exercício.');
  }
}, [
  attempt,
  exercise,
  loadNextExercise,
  loadingNext,
  sessionId,
  submitting,
]);

  const endSession = useCallback(() => {
    if (!sessionId) {
      router.replace('/study');
      return;
    }

    Alert.alert(
      'Encerrar sessão?',
      'O seu progresso já respondido foi salvo.',
      [
        {
          text: 'Continuar estudando',
          style: 'cancel',
        },
        {
          text: 'Encerrar',
          style: 'destructive',
          onPress: async () => {
            try {
              await finishStudySession(sessionId);
            } catch (err) {
              console.warn('[ExerciseScreen] finish session error:', err);
            } finally {
              router.replace('/study');
            }
          },
        },
      ]
    );
  }, [router, sessionId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Preparando exercício...</Text>
      </View>
    );
  }

  if (error && !exercise && !finished) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>

        <Pressable
          style={styles.primaryBtn}
          onPress={() => router.replace('/study')}
        >
          <Text style={styles.primaryBtnText}>Voltar para estudos</Text>
        </Pressable>
      </View>
    );
  }

  if (finished) {
    return (
      <View style={styles.center}>
        <View style={styles.finishIcon}>
          <Ionicons name="checkmark" size={32} color="#fff" />
        </View>

        <Text style={styles.finishTitle}>Sessão concluída!</Text>

        <Text style={styles.finishText}>
          Seu progresso foi salvo. Cada resposta ajuda o sistema a organizar
          suas próximas revisões.
        </Text>

        <Pressable
          style={styles.primaryBtn}
          onPress={() => router.replace('/study')}
        >
          <Text style={styles.primaryBtnText}>Voltar para estudos</Text>
        </Pressable>
      </View>
    );
  }

  if (!exercise) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Nenhum exercício disponível nesta sessão.
        </Text>
      </View>
    );
  }

const unsupported =
  exercise.type !== 'FLASHCARD' &&
  exercise.type !== 'DICTATION' &&
  exercise.type !== 'CREATE_SENTENCE' &&
  exercise.type !== 'WORD_ORDER' &&
  exercise.type !== 'MATCH' &&
  !isChoiceExercise(exercise.type);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={endSession} hitSlop={10}>
          <Ionicons name="close" size={22} color={colors.text} />
        </Pressable>

        <Text style={styles.headerTitle}>{getExerciseLabel(exercise.type)}</Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {unsupported ? (
          <View style={styles.exerciseCard}>
            <Text style={styles.exerciseTitle}>
              Tipo de exercício ainda em construção
            </Text>

            <Text style={styles.exerciseDescription}>
              O backend gerou um exercício do tipo:{' '}
              <Text style={styles.boldText}>{exercise.type}</Text>.
            </Text>

            <Text style={styles.exerciseDescription}>
              Nesta primeira etapa, escolha Flashcards, Múltipla Escolha ou
              Aleatório.
            </Text>

            <Pressable style={styles.primaryBtn} onPress={endSession}>
              <Text style={styles.primaryBtnText}>Encerrar sessão</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {isChoiceExercise(exercise.type) && (
              <View style={styles.exerciseCard}>
                <Text style={styles.eyebrow}>
                  {getChoiceInstruction(exercise.type)}
                </Text>

                <View style={styles.hero}>
                  <Text style={styles.heroText}>
                    {getChoicePrompt(exercise.type, choicePayload)}
                  </Text>
                </View>

                {!choicePayload?.options?.length ? (
                  <Text style={styles.inlineError}>
                    Não foi possível carregar as alternativas deste exercício.
                  </Text>
                ) : (
                  <View style={styles.options}>
                    {choicePayload.options.map((option, index) => {
                      const selected = selectedOptionIndex === index;

                      return (
                        <Pressable
                          key={`${option}-${index}`}
                          style={[
                            styles.option,
                            selected && styles.optionSelected,
                            (submitting || !!attempt) && styles.optionDisabled,
                          ]}
                          onPress={() => setSelectedOptionIndex(index)}
                          disabled={submitting || !!attempt}
                        >
                          <View
                            style={[
                              styles.optionCircle,
                              selected && styles.optionCircleSelected,
                            ]}
                          >
                            {selected && (
                              <Ionicons
                                name="checkmark"
                                size={14}
                                color="#fff"
                              />
                            )}
                          </View>

                          <Text
                            style={[
                              styles.optionText,
                              selected && styles.optionTextSelected,
                            ]}
                          >
                            {option}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                )}
              </View>
            )}

            {exercise.type === 'FLASHCARD' && (
              <View style={styles.exerciseCard}>
                <Text style={styles.eyebrow}>Digite a resposta correta</Text>

                <View style={styles.hero}>
                  <Text style={styles.heroText}>
                    {flashcardPayload?.front ?? 'Palavra'}
                  </Text>
                </View>

                {!!flashcardPayload?.note && (
                  <Text style={styles.noteText}>
                    {flashcardPayload.note}
                  </Text>
                )}

                <TextInput
                  style={styles.answerInput}
                  placeholder="Digite sua resposta..."
                  placeholderTextColor={colors.light}
                  value={flashcardAnswer}
                  onChangeText={setFlashcardAnswer}
                  editable={!submitting && !attempt}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={sendAttempt}
                />
              </View>
            )}

            {exercise.type === 'DICTATION' && (
  <View style={styles.exerciseCard}>
    <Text style={styles.eyebrow}>Ouça e escreva o que você ouviu</Text>

    <View style={styles.dictationAudioArea}>
      <View style={styles.dictationAudioIcon}>
        <Ionicons
          name="volume-high"
          size={34}
          color={colors.primary}
        />
      </View>

      <Text style={styles.dictationAudioTitle}>Ditado em áudio</Text>

      <Text style={styles.dictationAudioDescription}>
        Ouça a frase com atenção e escreva exatamente o que você escutou.
      </Text>

      <Pressable
        style={styles.dictationReplayButton}
        onPress={() => {
          void playDictation();
        }}
        disabled={submitting || !!attempt}
      >
        <Pressable
  style={[
    styles.dictationSkipButton,
    (submitting || loadingNext || !!attempt) &&
      styles.dictationSkipButtonDisabled,
  ]}
  onPress={() => {
    void skipCurrentExercise();
  }}
  disabled={submitting || loadingNext || !!attempt}
>
  <Ionicons
    name="play-skip-forward-outline"
    size={18}
    color={colors.muted}
  />

  <Text style={styles.dictationSkipButtonText}>
    {loadingNext ? 'Pulando...' : 'Pular este exercício'}
  </Text>
</Pressable>
        <Ionicons
          name="refresh-outline"
          size={18}
          color={colors.primary}
        />

        <Text style={styles.dictationReplayButtonText}>
          Ouvir novamente
        </Text>
      </Pressable>
    </View>

    {!!dictationPayload?.hintTranslation && (
      <View style={styles.dictationHint}>
        <Ionicons
          name="bulb-outline"
          size={17}
          color="#A16207"
        />

        <Text style={styles.dictationHintText}>
          Dica: {dictationPayload.hintTranslation}
        </Text>
      </View>
    )}

    <TextInput
      style={styles.dictationInput}
      placeholder="Digite o que você ouviu..."
      placeholderTextColor={colors.light}
      value={dictationAnswer}
      onChangeText={setDictationAnswer}
      editable={!submitting && !attempt}
      autoCapitalize="sentences"
      autoCorrect={false}
      multiline
      textAlignVertical="top"
      returnKeyType="done"
      onSubmitEditing={sendAttempt}
    />
  </View>
)}

{exercise.type === 'CREATE_SENTENCE' && (
  <View style={styles.exerciseCard}>
    <Text style={styles.eyebrow}>
      Crie uma frase usando esta palavra
    </Text>

    <View style={styles.createSentenceWordCard}>
      <Text style={styles.createSentenceWord}>
        {createSentencePayload?.word ?? 'Palavra'}
      </Text>

      {!!createSentencePayload?.translation && (
        <Text style={styles.createSentenceTranslation}>
          {createSentencePayload.translation}
        </Text>
      )}
    </View>

    <View style={styles.createSentenceRequirements}>
      <View style={styles.createSentenceRequirementRow}>
        <Ionicons
          name="checkmark-circle-outline"
          size={17}
          color={colors.primary}
        />

        <Text style={styles.createSentenceRequirementText}>
          Use a palavra na sua frase.
        </Text>
      </View>

      {(createSentencePayload?.constraints?.minWords ?? 0) > 0 && (
        <View style={styles.createSentenceRequirementRow}>
          <Ionicons
            name="text-outline"
            size={17}
            color={colors.primary}
          />

          <Text style={styles.createSentenceRequirementText}>
            Use pelo menos{' '}
            {createSentencePayload?.constraints?.minWords} palavras.
          </Text>
        </View>
      )}

      <View style={styles.createSentenceRequirementRow}>
        <Ionicons
          name="language-outline"
          size={17}
          color={colors.primary}
        />

        <Text style={styles.createSentenceRequirementText}>
          Escreva no idioma que está estudando.
        </Text>
      </View>
    </View>

    <TextInput
      style={styles.createSentenceInput}
      placeholder="Escreva sua frase aqui..."
      placeholderTextColor={colors.light}
      value={createdSentence}
      onChangeText={setCreatedSentence}
      editable={!submitting && !attempt}
      autoCapitalize="sentences"
      autoCorrect={false}
      multiline
      textAlignVertical="top"
      returnKeyType="default"
    />

    <Text style={styles.createSentenceWordCount}>
      {createdSentence
        .trim()
        .split(/\s+/)
        .filter(Boolean).length}{' '}
      palavras
    </Text>
  </View>
)}

            {exercise.type === 'WORD_ORDER' && (
  <View style={styles.exerciseCard}>
    <Text style={styles.eyebrow}>Monte a frase correta</Text>

    <Text style={styles.wordOrderInstruction}>
      Toque nas palavras para organizá-las na ordem certa.
    </Text>

    <View style={styles.wordOrderAnswerArea}>
      {wordOrderAnswerTokens.length === 0 ? (
        <Text style={styles.wordOrderEmptyText}>
          Toque nas palavras abaixo para formar a frase.
        </Text>
      ) : (
        <View style={styles.wordOrderTokensWrap}>
          {wordOrderAnswerTokens.map((token) => (
            <Pressable
              key={token.id}
              style={[
                styles.wordOrderToken,
                styles.wordOrderAnswerToken,
                (submitting || !!attempt) &&
                  styles.wordOrderTokenDisabled,
              ]}
              onPress={() => removeWordOrderToken(token)}
              disabled={submitting || !!attempt}
            >
              <Text style={styles.wordOrderAnswerTokenText}>
                {token.value}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>

    <Text style={styles.wordOrderSectionLabel}>
      Palavras disponíveis
    </Text>

    <View style={styles.wordOrderTokensWrap}>
      {wordOrderAvailableTokens.map((token) => (
        <Pressable
          key={token.id}
          style={[
            styles.wordOrderToken,
            (submitting || !!attempt) && styles.wordOrderTokenDisabled,
          ]}
          onPress={() => addWordOrderToken(token)}
          disabled={submitting || !!attempt}
        >
          <Text style={styles.wordOrderTokenText}>
            {token.value}
          </Text>
        </Pressable>
      ))}
    </View>
  </View>
)}

{exercise.type === 'MATCH' && (
  <View style={styles.exerciseCard}>
    <Text style={styles.eyebrow}>Associe cada palavra à tradução</Text>

    <Text style={styles.matchInstruction}>
      Primeiro selecione uma palavra. Depois toque na tradução
      correspondente.
    </Text>

    {!matchPayload?.left?.length || !matchPayload?.right?.length ? (
      <Text style={styles.inlineError}>
        Não foi possível carregar os pares deste exercício.
      </Text>
    ) : (
      <View style={styles.matchColumns}>
        <View style={styles.matchColumn}>
          <Text style={styles.matchColumnTitle}>Palavras</Text>

          <View style={styles.matchItems}>
            {matchPayload.left.map((word, index) => {
              const match = matchSelections.find(
                (item) => item.word === word
              );

              const selected = selectedMatchWord === word;

              return (
                <Pressable
                  key={`${word}-${index}`}
                  style={[
                    styles.matchItem,
                    selected && styles.matchItemSelected,
                    !!match && styles.matchItemMatched,
                    (submitting || !!attempt) &&
                      styles.matchItemDisabled,
                  ]}
                  onPress={() => selectMatchWord(word)}
                  disabled={submitting || !!attempt}
                >
                  <Text
                    style={[
                      styles.matchItemText,
                      selected && styles.matchItemTextSelected,
                      !!match && styles.matchItemTextMatched,
                    ]}
                  >
                    {word}
                  </Text>

                  {!!match && (
                    <View style={styles.matchConnectedBadge}>
                      <Ionicons
                        name="checkmark"
                        size={13}
                        color="#FFFFFF"
                      />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.matchColumn}>
          <Text style={styles.matchColumnTitle}>Traduções</Text>

          <View style={styles.matchItems}>
            {matchPayload.right.map((translation, index) => {
              const alreadyUsed = matchSelections.some(
                (item) => item.translation === translation
              );

              const canSelect =
                !!selectedMatchWord &&
                !alreadyUsed &&
                !submitting &&
                !attempt;

              return (
                <Pressable
                  key={`${translation}-${index}`}
                  style={[
                    styles.matchItem,
                    alreadyUsed && styles.matchTranslationUsed,
                    !canSelect && !alreadyUsed && styles.matchItemInactive,
                    (submitting || !!attempt) &&
                      styles.matchItemDisabled,
                  ]}
                  onPress={() => selectMatchTranslation(translation)}
                  disabled={!canSelect}
                >
                  <Text
                    style={[
                      styles.matchItemText,
                      alreadyUsed && styles.matchTranslationUsedText,
                    ]}
                  >
                    {translation}
                  </Text>

                  {alreadyUsed && (
                    <Ionicons
                      name="checkmark-circle"
                      size={17}
                      color="#15803D"
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    )}

    {matchSelections.length > 0 && (
      <Text style={styles.matchProgressText}>
        {matchSelections.length} de {matchPayload?.left?.length} pares associados
      </Text>
    )}
  </View>
)}

            {!!error && <Text style={styles.inlineError}>{error}</Text>}

            {!attempt ? (
              <Pressable
                style={[
                  styles.primaryBtn,
                  submitting && styles.primaryBtnDisabled,
                ]}
                onPress={sendAttempt}
                disabled={submitting}
              >
                {submitting ? (
                  <View style={styles.loadingRow}>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text style={styles.primaryBtnText}>Avaliando...</Text>
                  </View>
                ) : (
                  <Text style={styles.primaryBtnText}>Verificar resposta</Text>
                )}
              </Pressable>
            ) : (
              <View
                style={[
                  styles.feedbackCard,
                  attempt.verdict === 'CORRECT'
                    ? styles.feedbackCorrect
                    : styles.feedbackIncorrect,
                ]}
              >
                <Text style={styles.feedbackTitle}>
                  {getVerdictTitle(attempt.verdict)}
                </Text>

                <Text style={styles.feedbackText}>{attempt.feedback}</Text>

                <Text style={styles.feedbackMeta}>
                  Pontuação: {Math.round(attempt.score * 100)}%
                </Text>

                {exercise.type === 'MATCH' &&
  attempt.verdict !== 'CORRECT' &&
  Array.isArray(matchPayload?.pairs) &&
  matchPayload.pairs.length > 0 && (
    <View style={styles.matchCorrection}>
      <Text style={styles.matchCorrectionTitle}>
        Correção dos pares
      </Text>

      <Text style={styles.matchCorrectionDescription}>
        Veja quais associações ficaram corretas e quais precisam ser revisadas.
      </Text>

      <View style={styles.matchCorrectionList}>
        {matchPayload.pairs.map((pair, index) => {
          const userMatch = matchSelections.find(
            (selection) =>
              normalizeWordOrderToken(selection.word) ===
              normalizeWordOrderToken(pair.word)
          );

          const userTranslation = userMatch?.translation ?? null;

          const isCorrect =
            !!userTranslation &&
            normalizeWordOrderToken(userTranslation) ===
              normalizeWordOrderToken(pair.translation);

          return (
            <View
              key={`${pair.word}-${pair.translation}-${index}`}
              style={[
                styles.matchCorrectionItem,
                isCorrect
                  ? styles.matchCorrectionItemCorrect
                  : styles.matchCorrectionItemWrong,
              ]}
            >
              <View style={styles.matchCorrectionItemHeader}>
                <Ionicons
                  name={
                    isCorrect
                      ? 'checkmark-circle'
                      : 'close-circle'
                  }
                  size={19}
                  color={isCorrect ? '#15803D' : '#DC2626'}
                />

                <Text
                  style={[
                    styles.matchCorrectionWord,
                    isCorrect
                      ? styles.matchCorrectionTextCorrect
                      : styles.matchCorrectionTextWrong,
                  ]}
                >
                  {pair.word}
                </Text>
              </View>

              {isCorrect ? (
                <Text
                  style={[
                    styles.matchCorrectionAnswer,
                    styles.matchCorrectionTextCorrect,
                  ]}
                >
                  {pair.translation}
                </Text>
              ) : (
                <>
                  <Text style={styles.matchCorrectionUserAnswer}>
                    Sua resposta:{' '}
                    <Text style={styles.matchCorrectionWrongAnswer}>
                      {userTranslation ?? 'não associado'}
                    </Text>
                  </Text>

                  <Text style={styles.matchCorrectionExpectedAnswer}>
                    Correto: {pair.translation}
                  </Text>
                </>
              )}
            </View>
          );
        })}
      </View>
    </View>
  )}

{exercise.type === 'DICTATION' &&
  attempt.verdict !== 'CORRECT' &&
  dictationPayload?.textToDictate && (
    <View style={styles.dictationCorrectAnswer}>
      <View style={styles.dictationCorrectAnswerHeader}>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color="#15803D"
        />

        <Text style={styles.dictationCorrectAnswerTitle}>
          Frase correta
        </Text>
      </View>

      <Text style={styles.dictationCorrectAnswerText}>
        {dictationPayload.textToDictate}
      </Text>
    </View>
  )}
  {exercise.type === 'CREATE_SENTENCE' &&
  attempt.verdict !== 'CORRECT' &&
  attempt.aiModel !== 'fallback-deterministic' && (
    <View style={styles.createSentenceCorrection}>
      {!!attempt.correctedSentence && (
        <View style={styles.createSentenceCorrectedBlock}>
          <Text style={styles.createSentenceCorrectedTitle}>
            Sugestão de correção
          </Text>
          <Text style={styles.createSentenceCorrectedText}>
            {attempt.correctedSentence}
          </Text>
        </View>
      )}

      {Array.isArray(attempt.issues) && attempt.issues.length > 0 && (
        <View style={styles.createSentenceIssuesBlock}>
          <Text style={styles.createSentenceIssuesTitle}>
            Pontos a melhorar
          </Text>
              {attempt.issues.map((issue: Issue, index: number) => ( // <-- AGORA COM O TIPO CORRETO
              <View
                key={`${issue.type}-${index}`}
                style={styles.createSentenceIssueItem}
              >
                <Ionicons
                  name="alert-circle-outline"
                  size={17}
                  color="#EF4444"
                />
                <Text style={styles.createSentenceIssueText}>
                  {issue.explanation}
                </Text>
              </View>
            ))}
        </View>
      )}
    </View>
  )}
                {exercise.type === 'WORD_ORDER' &&
  attempt.verdict !== 'CORRECT' &&
  wordOrderPayload?.targetSentence &&
  wordOrderAnswerTokens.length > 0 && (
    <View style={styles.wordOrderCorrection}>
      <Text style={styles.wordOrderCorrectionTitle}>
        Sua ordem
      </Text>

      <Text style={styles.wordOrderCorrectionDescription}>
        Verde indica uma palavra na posição correta. Vermelho indica
        que ela precisa mudar de posição.
      </Text>

      <View style={styles.wordOrderCorrectionTokens}>
        {wordOrderAnswerTokens.map((token, index) => {
          const expectedToken = correctWordOrderTokens[index];

          const isCorrectPosition =
            typeof expectedToken === 'string' &&
            normalizeWordOrderToken(token.value) ===
              normalizeWordOrderToken(expectedToken);

          return (
            <View
              key={token.id}
              style={[
                styles.wordOrderCorrectionToken,
                isCorrectPosition
                  ? styles.wordOrderCorrectionTokenCorrect
                  : styles.wordOrderCorrectionTokenWrong,
              ]}
            >
              <Text
                style={[
                  styles.wordOrderCorrectionTokenText,
                  isCorrectPosition
                    ? styles.wordOrderCorrectionTokenTextCorrect
                    : styles.wordOrderCorrectionTokenTextWrong,
                ]}
              >
                {token.value}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.wordOrderCorrectAnswer}>
        <View style={styles.wordOrderCorrectAnswerHeader}>
          <Ionicons
            name="checkmark-circle"
            size={18}
            color="#15803D"
          />

          <Text style={styles.wordOrderCorrectAnswerTitle}>
            Ordem correta
          </Text>
        </View>

        <Text style={styles.wordOrderCorrectAnswerText}>
          {wordOrderPayload.targetSentence}
        </Text>
      </View>
    </View>
  )}

                <Pressable
                  style={[
                    styles.primaryBtn,
                    loadingNext && styles.primaryBtnDisabled,
                  ]}
                  onPress={loadNextExercise}
                  disabled={loadingNext}
                >
                  {loadingNext ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.primaryBtnText}>Próximo exercício</Text>
                  )}
                </Pressable>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.s4,
    paddingBottom: spacing.s6,
    gap: spacing.s3,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.s5,
    gap: spacing.s3,
  },

  header: {
    paddingTop: spacing.s3,
    paddingHorizontal: spacing.s4,
    paddingBottom: spacing.s2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s2,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radio.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 15,
  },

  exerciseCard: {
    backgroundColor: colors.surface,
    borderRadius: radio.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.s4,
  },
  eyebrow: {
    fontFamily: 'DM Sans SemiBold',
    color: colors.muted,
    fontSize: 13,
    textAlign: 'center',
  },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: radio.xl,
    minHeight: 145,
    marginTop: spacing.s4,
    paddingHorizontal: spacing.s4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroText: {
    color: '#fff',
    fontFamily: 'DM Sans Bold',
    fontSize: 30,
    textAlign: 'center',
  },

  options: {
    marginTop: spacing.s4,
    gap: spacing.s2,
  },
  option: {
    minHeight: 58,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radio.md,
    paddingHorizontal: spacing.s3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s3,
    backgroundColor: colors.surface,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: '#F2F5FF',
  },
  optionDisabled: {
    opacity: 0.7,
  },
  optionCircle: {
    width: 24,
    height: 24,
    borderRadius: radio.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionCircleSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    flex: 1,
    color: colors.text,
    fontFamily: 'DM Sans Medium',
    fontSize: 14,
  },
  optionTextSelected: {
    fontFamily: 'DM Sans Bold',
  },

  answerInput: {
    height: 54,
    marginTop: spacing.s4,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radio.md,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.s4,
    color: colors.text,
    fontFamily: 'DM Sans',
    fontSize: 15,
  },
  noteText: {
    marginTop: spacing.s3,
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
  },

  feedbackCard: {
    borderRadius: radio.lg,
    borderWidth: 1,
    padding: spacing.s4,
  },
  feedbackCorrect: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  feedbackIncorrect: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FDBA74',
  },
  feedbackTitle: {
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 17,
  },
  feedbackText: {
    marginTop: spacing.s2,
    color: colors.text,
    fontFamily: 'DM Sans',
    lineHeight: 20,
    fontSize: 13.5,
  },
  feedbackMeta: {
    marginTop: spacing.s3,
    color: colors.muted,
    fontFamily: 'DM Sans SemiBold',
    fontSize: 12,
  },

  primaryBtn: {
    height: 54,
    borderRadius: radio.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.s5,
  },
  primaryBtnDisabled: {
    opacity: 0.6,
  },
  primaryBtnText: {
    color: '#fff',
    fontFamily: 'DM Sans SemiBold',
    fontSize: 15,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s2,
  },

  loadingText: {
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 14,
  },
  errorText: {
    color: colors.danger,
    fontFamily: 'DM Sans Medium',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  inlineError: {
    color: colors.danger,
    fontFamily: 'DM Sans Medium',
    textAlign: 'center',
    fontSize: 13,
  },

  finishIcon: {
    width: 68,
    height: 68,
    borderRadius: radio.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C55E',
  },
  finishTitle: {
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 22,
    textAlign: 'center',
  },
  finishText: {
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 13.5,
    lineHeight: 20,
    textAlign: 'center',
  },

  exerciseTitle: {
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 17,
  },
  exerciseDescription: {
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 13.5,
    lineHeight: 20,
    marginTop: spacing.s2,
  },
  boldText: {
    color: colors.text,
    fontFamily: 'DM Sans Bold',
  },

  wordOrderInstruction: {
  marginTop: spacing.s2,
  color: colors.muted,
  fontFamily: 'DM Sans',
  fontSize: 13,
  lineHeight: 19,
  textAlign: 'center',
},

wordOrderAnswerArea: {
  minHeight: 100,
  marginTop: spacing.s4,
  padding: spacing.s3,
  justifyContent: 'center',
  borderWidth: 1.5,
  borderStyle: 'dashed',
  borderColor: colors.border,
  borderRadius: radio.md,
  backgroundColor: '#F8FAFF',
},

wordOrderEmptyText: {
  color: colors.muted,
  fontFamily: 'DM Sans',
  fontSize: 13,
  lineHeight: 19,
  textAlign: 'center',
},

wordOrderSectionLabel: {
  marginTop: spacing.s4,
  marginBottom: spacing.s2,
  color: colors.text,
  fontFamily: 'DM Sans SemiBold',
  fontSize: 13,
},

wordOrderTokensWrap: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: spacing.s2,
},

wordOrderToken: {
  minHeight: 38,
  justifyContent: 'center',
  paddingHorizontal: spacing.s3,
  paddingVertical: 8,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: radio.full,
  backgroundColor: colors.surface,
},

wordOrderAnswerToken: {
  borderColor: colors.primary,
  backgroundColor: colors.primary,
},

wordOrderTokenDisabled: {
  opacity: 0.65,
},

wordOrderTokenText: {
  color: colors.text,
  fontFamily: 'DM Sans SemiBold',
  fontSize: 13,
},

wordOrderAnswerTokenText: {
  color: '#FFFFFF',
  fontFamily: 'DM Sans SemiBold',
  fontSize: 13,
},

wordOrderCorrection: {
  marginTop: spacing.s4,
  paddingTop: spacing.s3,
  borderTopWidth: 1,
  borderTopColor: 'rgba(13, 27, 66, 0.12)',
},

wordOrderCorrectionTitle: {
  color: colors.text,
  fontFamily: 'DM Sans Bold',
  fontSize: 14,
},

wordOrderCorrectionDescription: {
  marginTop: spacing.s1,
  color: colors.muted,
  fontFamily: 'DM Sans',
  fontSize: 12,
  lineHeight: 17,
},

wordOrderCorrectionTokens: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: spacing.s2,
  marginTop: spacing.s3,
},

wordOrderCorrectionToken: {
  paddingHorizontal: spacing.s3,
  paddingVertical: 8,
  borderRadius: radio.full,
  borderWidth: 1,
},

wordOrderCorrectionTokenCorrect: {
  backgroundColor: '#DCFCE7',
  borderColor: '#86EFAC',
},

wordOrderCorrectionTokenWrong: {
  backgroundColor: '#FEE2E2',
  borderColor: '#FCA5A5',
},

wordOrderCorrectionTokenText: {
  fontFamily: 'DM Sans SemiBold',
  fontSize: 13,
},

wordOrderCorrectionTokenTextCorrect: {
  color: '#166534',
},

wordOrderCorrectionTokenTextWrong: {
  color: '#B91C1C',
},

wordOrderCorrectAnswer: {
  marginTop: spacing.s3,
  padding: spacing.s3,
  borderRadius: radio.md,
  borderWidth: 1,
  borderColor: '#86EFAC',
  backgroundColor: '#F0FDF4',
},

wordOrderCorrectAnswerHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.s2,
},

wordOrderCorrectAnswerTitle: {
  color: '#166534',
  fontFamily: 'DM Sans Bold',
  fontSize: 13,
},

wordOrderCorrectAnswerText: {
  marginTop: spacing.s2,
  color: '#166534',
  fontFamily: 'DM Sans Medium',
  fontSize: 14,
  lineHeight: 21,
},

matchInstruction: {
  marginTop: spacing.s2,
  color: colors.muted,
  fontFamily: 'DM Sans',
  fontSize: 13,
  lineHeight: 19,
  textAlign: 'center',
},

matchColumns: {
  flexDirection: 'row',
  gap: spacing.s2,
  marginTop: spacing.s4,
},

matchColumn: {
  flex: 1,
},

matchColumnTitle: {
  marginBottom: spacing.s2,
  color: colors.muted,
  fontFamily: 'DM Sans SemiBold',
  fontSize: 12,
  textAlign: 'center',
},

matchItems: {
  gap: spacing.s2,
},

matchItem: {
  minHeight: 54,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing.s1,
  paddingHorizontal: spacing.s2,
  paddingVertical: spacing.s2,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: radio.md,
  backgroundColor: colors.surface,
},

matchItemSelected: {
  borderColor: colors.primary,
  backgroundColor: '#EAF0FF',
},

matchItemMatched: {
  borderColor: '#86EFAC',
  backgroundColor: '#F0FDF4',
},

matchItemInactive: {
  opacity: 0.6,
},

matchItemDisabled: {
  opacity: 0.7,
},

matchItemText: {
  flex: 1,
  color: colors.text,
  fontFamily: 'DM Sans SemiBold',
  fontSize: 12.5,
  lineHeight: 17,
  textAlign: 'center',
},

matchItemTextSelected: {
  color: colors.primary,
  fontFamily: 'DM Sans Bold',
},

matchItemTextMatched: {
  color: '#166534',
},

matchConnectedBadge: {
  width: 19,
  height: 19,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: radio.full,
  backgroundColor: '#22C55E',
},

matchTranslationUsed: {
  borderColor: '#86EFAC',
  backgroundColor: '#F0FDF4',
},

matchTranslationUsedText: {
  color: '#166534',
},

matchProgressText: {
  marginTop: spacing.s3,
  color: colors.muted,
  fontFamily: 'DM Sans Medium',
  fontSize: 12,
  textAlign: 'center',
},

dictationAudioArea: {
  alignItems: 'center',
  marginTop: spacing.s4,
  padding: spacing.s4,
  borderRadius: radio.lg,
  borderWidth: 1,
  borderColor: '#C7D2FE',
  backgroundColor: '#F2F5FF',
},

dictationAudioIcon: {
  width: 64,
  height: 64,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: radio.full,
  backgroundColor: '#FFFFFF',
},

dictationAudioTitle: {
  marginTop: spacing.s3,
  color: colors.text,
  fontFamily: 'DM Sans Bold',
  fontSize: 16,
},

dictationAudioDescription: {
  marginTop: spacing.s1,
  color: colors.muted,
  fontFamily: 'DM Sans',
  fontSize: 12.5,
  lineHeight: 18,
  textAlign: 'center',
},

dictationReplayButton: {
  minHeight: 42,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.s2,
  marginTop: spacing.s3,
  paddingHorizontal: spacing.s3,
  borderWidth: 1,
  borderColor: colors.primary,
  borderRadius: radio.full,
  backgroundColor: '#FFFFFF',
},

dictationReplayButtonText: {
  color: colors.primary,
  fontFamily: 'DM Sans SemiBold',
  fontSize: 13,
},

dictationHint: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: spacing.s2,
  marginTop: spacing.s3,
  padding: spacing.s3,
  borderRadius: radio.md,
  backgroundColor: '#FEFCE8',
  borderWidth: 1,
  borderColor: '#FDE68A',
},

dictationHintText: {
  flex: 1,
  color: '#854D0E',
  fontFamily: 'DM Sans Medium',
  fontSize: 12.5,
  lineHeight: 18,
},

dictationInput: {
  minHeight: 110,
  marginTop: spacing.s4,
  paddingHorizontal: spacing.s3,
  paddingVertical: spacing.s3,
  borderWidth: 1.5,
  borderColor: colors.border,
  borderRadius: radio.md,
  backgroundColor: colors.surface,
  color: colors.text,
  fontFamily: 'DM Sans',
  fontSize: 15,
  lineHeight: 22,
},

dictationCorrectAnswer: {
  marginTop: spacing.s4,
  padding: spacing.s3,
  borderWidth: 1,
  borderColor: '#86EFAC',
  borderRadius: radio.md,
  backgroundColor: '#F0FDF4',
},

dictationCorrectAnswerHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.s2,
},

dictationCorrectAnswerTitle: {
  color: '#166534',
  fontFamily: 'DM Sans Bold',
  fontSize: 13,
},

dictationCorrectAnswerText: {
  marginTop: spacing.s2,
  color: '#166534',
  fontFamily: 'DM Sans Medium',
  fontSize: 14,
  lineHeight: 21,
},
dictationSkipButton: {
  minHeight: 40,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing.s2,
  marginTop: spacing.s2,
  paddingHorizontal: spacing.s3,
},

dictationSkipButtonDisabled: {
  opacity: 0.55,
},

dictationSkipButtonText: {
  color: colors.muted,
  fontFamily: 'DM Sans SemiBold',
  fontSize: 13,
},
createSentenceWordCard: {
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 128,
  marginTop: spacing.s4,
  padding: spacing.s4,
  borderRadius: radio.xl,
  backgroundColor: colors.primary,
},

createSentenceWord: {
  color: '#FFFFFF',
  fontFamily: 'DM Sans Bold',
  fontSize: 30,
  textAlign: 'center',
},

createSentenceTranslation: {
  marginTop: spacing.s2,
  color: 'rgba(255, 255, 255, 0.82)',
  fontFamily: 'DM Sans Medium',
  fontSize: 15,
  textAlign: 'center',
},

createSentenceRequirements: {
  gap: spacing.s2,
  marginTop: spacing.s4,
  padding: spacing.s3,
  borderWidth: 1,
  borderColor: '#C7D2FE',
  borderRadius: radio.md,
  backgroundColor: '#F2F5FF',
},

createSentenceRequirementRow: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: spacing.s2,
},

createSentenceRequirementText: {
  flex: 1,
  color: colors.text,
  fontFamily: 'DM Sans Medium',
  fontSize: 12.5,
  lineHeight: 18,
},

createSentenceInput: {
  minHeight: 130,
  marginTop: spacing.s4,
  paddingHorizontal: spacing.s3,
  paddingVertical: spacing.s3,
  borderWidth: 1.5,
  borderColor: colors.border,
  borderRadius: radio.md,
  backgroundColor: colors.surface,
  color: colors.text,
  fontFamily: 'DM Sans',
  fontSize: 15,
  lineHeight: 22,
},

createSentenceWordCount: {
  marginTop: spacing.s2,
  color: colors.muted,
  fontFamily: 'DM Sans Medium',
  fontSize: 12,
  textAlign: 'right',
},
matchCorrection: {
  marginTop: spacing.s4,
  paddingTop: spacing.s3,
  borderTopWidth: 1,
  borderTopColor: 'rgba(13, 27, 66, 0.12)',
},

matchCorrectionTitle: {
  color: colors.text,
  fontFamily: 'DM Sans Bold',
  fontSize: 14,
},

matchCorrectionDescription: {
  marginTop: spacing.s1,
  color: colors.muted,
  fontFamily: 'DM Sans',
  fontSize: 12,
  lineHeight: 17,
},

matchCorrectionList: {
  gap: spacing.s2,
  marginTop: spacing.s3,
},

matchCorrectionItem: {
  padding: spacing.s3,
  borderWidth: 1,
  borderRadius: radio.md,
},

matchCorrectionItemCorrect: {
  borderColor: '#86EFAC',
  backgroundColor: '#F0FDF4',
},

matchCorrectionItemWrong: {
  borderColor: '#FCA5A5',
  backgroundColor: '#FEF2F2',
},

matchCorrectionItemHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.s2,
},

matchCorrectionWord: {
  flex: 1,
  fontFamily: 'DM Sans Bold',
  fontSize: 14,
},

matchCorrectionTextCorrect: {
  color: '#166534',
},

matchCorrectionTextWrong: {
  color: '#B91C1C',
},

matchCorrectionAnswer: {
  marginTop: spacing.s2,
  fontFamily: 'DM Sans SemiBold',
  fontSize: 13,
},

matchCorrectionUserAnswer: {
  marginTop: spacing.s2,
  color: colors.text,
  fontFamily: 'DM Sans',
  fontSize: 12.5,
  lineHeight: 18,
},

matchCorrectionWrongAnswer: {
  color: '#B91C1C',
  fontFamily: 'DM Sans SemiBold',
},

matchCorrectionExpectedAnswer: {
  marginTop: 2,
  color: '#166534',
  fontFamily: 'DM Sans SemiBold',
  fontSize: 12.5,
  lineHeight: 18,
},
createSentenceCorrection: {
  marginTop: spacing.s4,
  paddingTop: spacing.s3,
  borderTopWidth: 1,
  borderTopColor: 'rgba(13, 27, 66, 0.12)',
},

createSentenceCorrectedBlock: {
  marginBottom: spacing.s3,
},

createSentenceCorrectedTitle: {
  color: colors.text,
  fontFamily: 'DM Sans Bold',
  fontSize: 14,
},

createSentenceCorrectedText: {
  marginTop: spacing.s1,
  color: colors.text,
  fontFamily: 'DM Sans Medium',
  fontSize: 14,
  lineHeight: 21,
},

createSentenceIssuesBlock: {},

createSentenceIssuesTitle: {
  color: colors.text,
  fontFamily: 'DM Sans Bold',
  fontSize: 14,
  marginBottom: spacing.s2,
},

createSentenceIssueItem: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: spacing.s2,
  marginBottom: spacing.s1,
},

createSentenceIssueText: {
  flex: 1,
  color: colors.text,
  fontFamily: 'DM Sans',
  fontSize: 12.5,
  lineHeight: 18,
},
});