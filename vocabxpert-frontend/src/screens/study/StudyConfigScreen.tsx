// src/screens/study/StudyConfigScreen.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radio } from '../../theme/radio';

import {
  cacheInitialStudyExercise,
  createStudySession,
  fetchStudyConfig,
  fetchStudyLists,
  type ConcreteExerciseType,
  type SessionExerciseType,
  type StudyConfig,
  type StudyDirection,
  type StudyList,
  type StudyScope,
} from './services/studyService';
import { Ionicons } from '@expo/vector-icons';

const INITIAL_SUPPORTED_TYPES: ConcreteExerciseType[] = [
  'FLASHCARD',
  'MULTIPLE_CHOICE_TRANSLATION',
  'CLOZE',
  'CHOOSE_CORRECT_EXAMPLE',
  'WORD_ORDER',
  'MATCH',
  'DICTATION',
  'CREATE_SENTENCE'
];

const IMPLEMENTED_EXERCISE_TYPES: SessionExerciseType[] = [
  'RANDOM',
  'FLASHCARD',
  'MULTIPLE_CHOICE_TRANSLATION',
  'CLOZE',
  'CHOOSE_CORRECT_EXAMPLE',
  'WORD_ORDER',
  'MATCH',
  'DICTATION',
  'CREATE_SENTENCE'
];

const scopeLabels: Record<StudyScope, string> = {
  DUE: 'Pendentes',
  ALL: 'Todas',
  LAST_10: 'Últimas 10',
};

const directionLabels: Record<StudyDirection, string> = {
  WORD_TO_TRANSLATION: 'Palavra → Tradução',
  TRANSLATION_TO_WORD: 'Tradução → Palavra',
};

type ExerciseOption = {
  type: SessionExerciseType;
  title: string;
  description: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
};

const EXERCISE_OPTIONS: ExerciseOption[] = [
  {
    type: 'RANDOM',
    title: 'Aleatório',
    description: 'Mistura automaticamente os tipos de exercício.',
    icon: 'shuffle-outline',
  },
  {
    type: 'FLASHCARD',
    title: 'Flashcards',
    description: 'Digite ou recorde a tradução da palavra.',
    icon: 'layers-outline',
  },
  {
    type: 'MULTIPLE_CHOICE_TRANSLATION',
    title: 'Múltipla escolha',
    description: 'Escolha a tradução correta entre as alternativas.',
    icon: 'list-outline',
  },
  {
    type: 'CLOZE',
    title: 'Complete a frase',
    description: 'Preencha a lacuna com a palavra adequada.',
    icon: 'create-outline',
  },
  {
    type: 'CHOOSE_CORRECT_EXAMPLE',
    title: 'Exemplo correto',
    description: 'Selecione a frase que usa a palavra corretamente.',
    icon: 'checkmark-circle-outline',
  },
  {
    type: 'WORD_ORDER',
    title: 'Ordene as palavras',
    description: 'Organize as palavras para formar uma frase.',
    icon: 'reorder-three-outline',
  },
  {
    type: 'DICTATION',
    title: 'Ditado',
    description: 'Ouça ou leia a palavra e digite a resposta.',
    icon: 'volume-high-outline',
  },
  {
    type: 'MATCH',
    title: 'Associar pares',
    description: 'Relacione palavras e traduções correspondentes.',
    icon: 'git-compare-outline',
  },
  {
    type: 'CREATE_SENTENCE',
    title: 'Criar frase',
    description: 'Escreva uma frase usando a palavra estudada.',
    icon: 'chatbubble-ellipses-outline',
  },
];

export default function StudyConfigScreen() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [config, setConfig] = useState<StudyConfig | null>(null);
  const [lists, setLists] = useState<StudyList[]>([]);

  const [selectedListId, setSelectedListId] = useState('');
  const [scope, setScope] = useState<StudyScope>('DUE');
  const [limit, setLimit] = useState(10);
  const [direction, setDirection] =
    useState<StudyDirection>('WORD_TO_TRANSLATION');

  const [exerciseType, setExerciseType] =
    useState<SessionExerciseType>('RANDOM');

  const selectedList = useMemo(
    () => lists.find((list) => list.id === selectedListId),
    [lists, selectedListId]
  );

  const availableExerciseOptions = useMemo(() => {
  if (!config) {
    return [];
  }

  return EXERCISE_OPTIONS.filter((option) =>
    config.exerciseTypes.includes(option.type)
  );
}, [config]);

  const loadScreenData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [studyConfig, studyLists] = await Promise.all([
        fetchStudyConfig(),
        fetchStudyLists(),
      ]);

      setConfig(studyConfig);
      setLists(studyLists);

      const defaultList =
        studyLists.find((list) => list.isDefault) ?? studyLists[0];

      setSelectedListId(defaultList?.id ?? '');
      setScope(studyConfig.defaults.scope);
      setLimit(studyConfig.defaults.limit);
      setDirection(studyConfig.defaults.direction);

      const defaultType = studyConfig.defaults.exerciseType;

        setExerciseType(
  IMPLEMENTED_EXERCISE_TYPES.includes(defaultType)
    ? defaultType
    : 'RANDOM'
);
    } catch (err: any) {
      console.error(
        '[StudyConfigScreen] load error:',
        err?.response?.data ?? err?.message ?? err
      );

      setError('Não foi possível carregar as configurações de estudo.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadScreenData();
  }, [loadScreenData]);

  const startSession = useCallback(async () => {
    if (!selectedListId) {
      Alert.alert(
        'Selecione uma lista',
        'Você precisa escolher uma lista antes de iniciar o estudo.'
      );
      return;
    }

    try {
      setStarting(true);

      const session = await createStudySession({
        listId: selectedListId,
        scope,
        limit,
        direction,
        exerciseType,
        enabledExerciseTypes:
          exerciseType === 'RANDOM' ? INITIAL_SUPPORTED_TYPES : undefined,
      });

      if (!session.firstExercise) {
        Alert.alert(
          'Nada para estudar',
          'Esta seleção não encontrou vocabulários disponíveis para estudo.'
        );
        return;
      }

      await cacheInitialStudyExercise(
        session.sessionId,
        session.firstExercise
      );

      router.push({
        pathname: '/study/exercise',
        params: {
          sessionId: session.sessionId,
        },
      });
    } catch (err: any) {
      console.error(
        '[StudyConfigScreen] start error:',
        err?.response?.data ?? err?.message ?? err
      );

      const apiError = err?.response?.data?.error;

      if (apiError === 'LIST_NOT_FOUND') {
        Alert.alert(
          'Lista indisponível',
          'A lista selecionada não foi encontrada ou não pertence a este usuário.'
        );
        return;
      }

      Alert.alert(
        'Erro ao iniciar',
        'Não foi possível criar a sua sessão de estudo.'
      );
    } finally {
      setStarting(false);
    }
  }, [direction, exerciseType, limit, router, scope, selectedListId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Preparando seu estudo...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>

        <Pressable style={styles.primaryBtn} onPress={loadScreenData}>
          <Text style={styles.primaryBtnText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text style={styles.title}>Hora de estudar</Text>
        <Text style={styles.subtitle}>
          Configure uma sessão rápida e mantenha o vocabulário afiado.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Lista de vocabulários</Text>

        {lists.length === 0 ? (
          <Text style={styles.emptyText}>
            Você ainda não possui listas para estudar.
          </Text>
        ) : (
          <View style={styles.chipsWrap}>
            {lists.map((list) => {
              const active = list.id === selectedListId;

              return (
                <Pressable
                  key={list.id}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setSelectedListId(list.id)}
                >
                  <Text
                    style={[styles.chipText, active && styles.chipTextActive]}
                    numberOfLines={1}
                  >
                    {list.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        {!!selectedList && (
          <Text style={styles.helperText}>
            Selecionada: {selectedList.name}
          </Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>O que revisar?</Text>

        <View style={styles.chipsWrap}>
          {(config?.scopes ?? ['DUE', 'ALL', 'LAST_10']).map((item) => {
            const active = scope === item;

            return (
              <Pressable
                key={item}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setScope(item)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {scopeLabels[item]}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, styles.subSectionTitle]}>
          Quantidade
        </Text>

        <View style={styles.chipsWrap}>
          {[5, 10, 20, 30].map((amount) => {
            const active = limit === amount;

            return (
              <Pressable
                key={amount}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setLimit(amount)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {amount} palavras
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Direção</Text>

        <View style={styles.chipsWrap}>
          {(
            ['WORD_TO_TRANSLATION', 'TRANSLATION_TO_WORD'] as StudyDirection[]
          ).map((item) => {
            const active = direction === item;

            return (
              <Pressable
                key={item}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setDirection(item)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {directionLabels[item]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

         <View style={styles.card}>
  <Text style={styles.sectionTitle}>Formato do exercício</Text>

  <View style={styles.chipsWrap}>
  {EXERCISE_OPTIONS.filter((option) =>
    IMPLEMENTED_EXERCISE_TYPES.includes(option.type)
  ).map((option) => {
    const active = exerciseType === option.type;

    return (
      <Pressable
        key={option.type}
        style={[styles.chip, active && styles.chipActive]}
        onPress={() => setExerciseType(option.type)}
      >
        <Text
          style={[
            styles.chipText,
            active && styles.chipTextActive,
          ]}
        >
          {option.title}
        </Text>
      </Pressable>
    );
  })}
</View>

<Text style={styles.helperText}>
  {exerciseType === 'RANDOM'
    ? 'No modo aleatório, a sessão alterna entre os formatos implementados.'
    : 'A sessão usará somente o formato selecionado.'}
</Text>

  <Text style={styles.helperText}>
    {exerciseType === 'RANDOM'
      ? 'No modo aleatório, o sistema alterna entre os formatos disponíveis.'
      : 'A sessão usará somente o formato selecionado.'}
  </Text>
</View>

      <Pressable
        style={[
          styles.primaryBtn,
          (starting || lists.length === 0) && styles.primaryBtnDisabled,
        ]}
        onPress={startSession}
        disabled={starting || lists.length === 0}
      >
        {starting ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.primaryBtnText}>Iniciar sessão</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.s5,
    paddingBottom: spacing.s6,
    gap: spacing.s3,
  },
  center: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.s5,
    gap: spacing.s3,
  },

  title: {
    fontFamily: 'DM Sans Bold',
    fontSize: 24,
    color: colors.text,
  },
  subtitle: {
    marginTop: spacing.s1,
    fontFamily: 'DM Sans',
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radio.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.s4,
  },
  sectionTitle: {
    fontFamily: 'DM Sans Bold',
    fontSize: 14,
    color: colors.text,
  },
  subSectionTitle: {
    marginTop: spacing.s4,
  },

  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s2,
    marginTop: spacing.s3,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radio.full,
    backgroundColor: '#F2F5FF',
    paddingHorizontal: spacing.s3,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontFamily: 'DM Sans SemiBold',
    fontSize: 12,
    color: colors.text,
  },
  chipTextActive: {
    color: '#fff',
  },

  helperText: {
    marginTop: spacing.s3,
    fontFamily: 'DM Sans',
    fontSize: 12,
    lineHeight: 17,
    color: colors.muted,
  },
  emptyText: {
    marginTop: spacing.s2,
    fontFamily: 'DM Sans',
    fontSize: 13,
    color: colors.muted,
  },

  primaryBtn: {
    height: 54,
    borderRadius: radio.full,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.s2,
  },
  primaryBtnDisabled: {
    opacity: 0.55,
  },
  primaryBtnText: {
    color: '#fff',
    fontFamily: 'DM Sans SemiBold',
    fontSize: 15,
  },

  loadingText: {
    fontFamily: 'DM Sans',
    fontSize: 14,
    color: colors.muted,
  },
  errorText: {
    fontFamily: 'DM Sans Medium',
    fontSize: 14,
    color: colors.danger,
    textAlign: 'center',
  },

  exerciseOptions: {
  marginTop: spacing.s3,
  gap: spacing.s2,
},

exerciseOption: {
  minHeight: 72,
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.s3,
  padding: spacing.s3,
  borderRadius: radio.md,
  borderWidth: 1,
  borderColor: colors.border,
  backgroundColor: '#F2F5FF',
},

exerciseOptionActive: {
  backgroundColor: colors.primary,
  borderColor: colors.primary,
},

exerciseOptionDisabled: {
  opacity: 0.52,
},

exerciseIcon: {
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: radio.full,
  backgroundColor: colors.surface,
},

exerciseIconActive: {
  backgroundColor: 'rgba(255, 255, 255, 0.18)',
},

exerciseTextContent: {
  flex: 1,
},

exerciseTitleRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: spacing.s2,
},

exerciseOptionTitle: {
  flex: 1,
  fontFamily: 'DM Sans Bold',
  fontSize: 13,
  color: colors.text,
},

exerciseOptionTitleActive: {
  color: '#FFFFFF',
},

exerciseOptionDescription: {
  marginTop: 2,
  fontFamily: 'DM Sans',
  fontSize: 11.5,
  lineHeight: 16,
  color: colors.muted,
},

exerciseOptionDescriptionActive: {
  color: 'rgba(255, 255, 255, 0.82)',
},

comingSoonText: {
  paddingHorizontal: spacing.s2,
  paddingVertical: 4,
  borderRadius: radio.full,
  backgroundColor: 'rgba(13, 27, 66, 0.08)',
  color: colors.muted,
  fontFamily: 'DM Sans SemiBold',
  fontSize: 10,
},
});