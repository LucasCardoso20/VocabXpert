import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radio } from '../../theme/radio';

import {
  cacheInitialStudyExercise,
  createStudySession,
  fetchStudyLists,
  type ConcreteExerciseType,
  type StudyList,
} from '../study/services/studyService';

import {
  fetchReviewDashboard,
  type ReviewDashboard,
  type ReviewDashboardItem,
  type ReviewStatus,
} from './services/reviewService';

const REVIEW_EXERCISE_TYPES: ConcreteExerciseType[] = [
  'FLASHCARD',
  'MULTIPLE_CHOICE_TRANSLATION',
  'CLOZE',
  'CHOOSE_CORRECT_EXAMPLE',
  'WORD_ORDER',
  'MATCH',
  'DICTATION',
  'CREATE_SENTENCE',
];

const statusConfig: Record<
  ReviewStatus,
  {
    label: string;
    icon: React.ComponentProps<typeof Ionicons>['name'];
    backgroundColor: string;
    textColor: string;
  }
> = {
  DUE: {
    label: 'Para revisar',
    icon: 'alarm-outline',
    backgroundColor: '#FEE2E2',
    textColor: '#B91C1C',
  },
  NEW: {
    label: 'Nova',
    icon: 'sparkles-outline',
    backgroundColor: '#E0E7FF',
    textColor: '#3730A3',
  },
  LEARNING: {
    label: 'Em estudo',
    icon: 'school-outline',
    backgroundColor: '#FEF3C7',
    textColor: '#92400E',
  },
  SCHEDULED: {
    label: 'Agendada',
    icon: 'calendar-outline',
    backgroundColor: '#DCFCE7',
    textColor: '#166534',
  },
};

function formatReviewDate(dateValue: string | null) {
  if (!dateValue) {
    return 'Nunca revisada';
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return 'Data indisponível';
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function SummaryCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return (
    <View style={styles.summaryCard}>
      <View style={[styles.summaryIcon, { backgroundColor: `${color}18` }]}>
        <Ionicons name={icon} size={19} color={color} />
      </View>

      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

function VocabReviewItem({ item }: { item: ReviewDashboardItem }) {
  const config = statusConfig[item.status];

  return (
    <View style={styles.vocabCard}>
      <View style={styles.vocabTopRow}>
        <View style={styles.vocabTexts}>
          <Text style={styles.word}>{item.word}</Text>

          {!!item.translation && (
            <Text style={styles.translation}>{item.translation}</Text>
          )}
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: config.backgroundColor },
          ]}
        >
          <Ionicons name={config.icon} size={13} color={config.textColor} />

          <Text style={[styles.statusText, { color: config.textColor }]}>
            {config.label}
          </Text>
        </View>
      </View>

      <View style={styles.vocabDetails}>
        <Text style={styles.detailText}>
          Revisões: <Text style={styles.detailValue}>{item.repetitions}</Text>
        </Text>

        <Text style={styles.detailText}>
          Sequência: <Text style={styles.detailValue}>{item.streak}</Text>
        </Text>

        <Text style={styles.detailText}>
          Intervalo:{' '}
          <Text style={styles.detailValue}>
            {item.interval === 1 ? '1 dia' : `${item.interval} dias`}
          </Text>
        </Text>
      </View>

      <Text style={styles.nextReviewText}>
        {item.status === 'NEW'
          ? 'Ainda não estudada'
          : `Próxima revisão: ${formatReviewDate(item.nextDueAt)}`}
      </Text>
    </View>
  );
}

export default function VocabReviewScreen() {
  const router = useRouter();

  const [lists, setLists] = useState<StudyList[]>([]);
  const [selectedListId, setSelectedListId] = useState('');
  const [dashboard, setDashboard] = useState<ReviewDashboard | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedList = useMemo(
    () => lists.find((list) => list.id === selectedListId),
    [lists, selectedListId]
  );

  const hasItemsToStudy = useMemo(() => {
    if (!dashboard) {
      return false;
    }

    return dashboard.summary.dueNow + dashboard.summary.newVocabs > 0;
  }, [dashboard]);

  const loadInitialData = useCallback(async () => {
    const studyLists = await fetchStudyLists();

    setLists(studyLists);

    const defaultList =
      studyLists.find((list) => list.isDefault) ?? studyLists[0];

    setSelectedListId(defaultList?.id ?? '');

    return defaultList?.id ?? '';
  }, []);

  const loadDashboard = useCallback(async (listId: string) => {
    if (!listId) {
      setDashboard(null);
      return;
    }

    const data = await fetchReviewDashboard(listId);
    setDashboard(data);
  }, []);

  const loadScreen = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError(null);

        let listIdToLoad = selectedListId;

        if (!listIdToLoad) {
          listIdToLoad = await loadInitialData();
        }

        if (listIdToLoad) {
          await loadDashboard(listIdToLoad);
        }
      } catch (err: any) {
        console.error(
          '[VocabReviewScreen] load error:',
          err?.response?.data ?? err?.message ?? err
        );

        setError('Não foi possível carregar as revisões.');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [loadDashboard, loadInitialData, selectedListId]
  );

  useEffect(() => {
    void loadScreen();
  }, [loadScreen]);

  const selectList = useCallback(
    async (listId: string) => {
      try {
        setSelectedListId(listId);
        setError(null);
        setRefreshing(true);

        await loadDashboard(listId);
      } catch (err: any) {
        console.error(
          '[VocabReviewScreen] list change error:',
          err?.response?.data ?? err?.message ?? err
        );

        setError('Não foi possível carregar esta lista.');
      } finally {
        setRefreshing(false);
      }
    },
    [loadDashboard]
  );

  const startDueReview = useCallback(async () => {
    if (!selectedListId) {
      Alert.alert(
        'Selecione uma lista',
        'Escolha uma lista antes de iniciar a revisão.'
      );
      return;
    }

    try {
      setStarting(true);

      const session = await createStudySession({
        listId: selectedListId,
        scope: 'DUE',
        limit: 10,
        direction: 'WORD_TO_TRANSLATION',
        exerciseType: 'RANDOM',
        enabledExerciseTypes: REVIEW_EXERCISE_TYPES,
      });

      if (!session.firstExercise) {
        Alert.alert(
          'Nenhuma palavra pendente',
          'Esta lista não possui palavras disponíveis para revisão agora.'
        );

        await loadDashboard(selectedListId);
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
        '[VocabReviewScreen] start review error:',
        err?.response?.data ?? err?.message ?? err
      );

      Alert.alert(
        'Não foi possível iniciar',
        'Ocorreu um erro ao criar sua sessão de revisão.'
      );
    } finally {
      setStarting(false);
    }
  }, [loadDashboard, router, selectedListId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando suas revisões...</Text>
      </View>
    );
  }

  if (error && !dashboard) {
    return (
      <View style={styles.center}>
        <Ionicons name="cloud-offline-outline" size={40} color={colors.muted} />
        <Text style={styles.errorText}>{error}</Text>

        <Pressable style={styles.primaryButton} onPress={() => loadScreen()}>
          <Text style={styles.primaryButtonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => loadScreen(true)}
          tintColor={colors.primary}
        />
      }
    >
      <View style={styles.pageHeader}>
  <View style={styles.headerText}>
    <Text style={styles.title}>Revisões</Text>

    <Text style={styles.subtitle}>
      Acompanhe seu progresso e mantenha as palavras frescas na memória.
    </Text>
  </View>

  <Pressable
    style={styles.progressButton}
    onPress={() => router.push('/progress')}
    accessibilityRole="button"
    accessibilityLabel="Abrir progresso"
  >
    <Ionicons
      name="stats-chart-outline"
      size={18}
      color={colors.primary}
    />

    <Text style={styles.progressButtonText}>Progresso</Text>
  </Pressable>
</View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Lista de vocabulários</Text>

        {lists.length === 0 ? (
          <Text style={styles.emptyText}>
            Você ainda não possui listas de vocabulário.
          </Text>
        ) : (
          <>
            <View style={styles.chipsWrap}>
              {lists.map((list) => {
                const active = list.id === selectedListId;

                return (
                  <Pressable
                    key={list.id}
                    style={[styles.chip, active && styles.chipActive]}
                    onPress={() => selectList(list.id)}
                    disabled={refreshing}
                  >
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.chipText,
                        active && styles.chipTextActive,
                      ]}
                    >
                      {list.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {!!selectedList && (
              <Text style={styles.helperText}>
                Exibindo o progresso de: {selectedList.name}
              </Text>
            )}
          </>
        )}
      </View>

      {!!dashboard && (
        <>
          <View style={styles.summaryGrid}>
            <SummaryCard
              label="Para revisar"
              value={dashboard.summary.dueNow}
              icon="alarm-outline"
              color="#DC2626"
            />

            <SummaryCard
              label="Novas"
              value={dashboard.summary.newVocabs}
              icon="sparkles-outline"
              color="#4F46E5"
            />

            <SummaryCard
              label="Em estudo"
              value={dashboard.summary.learning}
              icon="school-outline"
              color="#D97706"
            />

            <SummaryCard
              label="Agendadas"
              value={dashboard.summary.scheduled}
              icon="calendar-outline"
              color="#16A34A"
            />
          </View>

          <Pressable
            style={[
              styles.primaryButton,
              (!hasItemsToStudy || starting) && styles.primaryButtonDisabled,
            ]}
            onPress={startDueReview}
            disabled={!hasItemsToStudy || starting}
          >
            {starting ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="play-outline" size={20} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>
                  Revisar pendentes e novas
                </Text>
              </>
            )}
          </Pressable>

          {!hasItemsToStudy && (
            <Text style={styles.allDoneText}>
              Tudo em dia. Suas palavras estão agendadas para revisões futuras. ✨
            </Text>
          )}

          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>Palavras da lista</Text>

            <Text style={styles.listCount}>
              {dashboard.summary.totalVocabs}{' '}
              {dashboard.summary.totalVocabs === 1
                ? 'palavra'
                : 'palavras'}
            </Text>
          </View>

          {dashboard.items.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons
                name="library-outline"
                size={34}
                color={colors.muted}
              />
              <Text style={styles.emptyText}>
                Esta lista ainda não possui palavras.
              </Text>
            </View>
          ) : (
            <View style={styles.vocabsList}>
              {dashboard.items.map((item) => (
                <VocabReviewItem key={item.id} item={item} />
              ))}
            </View>
          )}
        </>
      )}
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
  pageHeader: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: spacing.s3,
},

headerText: {
  flex: 1,
},

progressButton: {
  minHeight: 38,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  paddingHorizontal: spacing.s3,
  borderWidth: 1,
  borderColor: colors.primary,
  borderRadius: radio.full,
  backgroundColor: colors.surface,
},

progressButtonText: {
  color: colors.primary,
  fontFamily: 'DM Sans SemiBold',
  fontSize: 12,
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
  helperText: {
    marginTop: spacing.s3,
    fontFamily: 'DM Sans',
    fontSize: 12,
    lineHeight: 17,
    color: colors.muted,
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
    color: '#FFFFFF',
  },

  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s2,
  },
  summaryCard: {
    width: '48%',
    minHeight: 122,
    backgroundColor: colors.surface,
    borderRadius: radio.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.s3,
  },
  summaryIcon: {
    width: 34,
    height: 34,
    borderRadius: radio.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryValue: {
    marginTop: spacing.s2,
    fontFamily: 'DM Sans Bold',
    fontSize: 24,
    color: colors.text,
  },
  summaryLabel: {
    marginTop: 2,
    fontFamily: 'DM Sans Medium',
    fontSize: 12,
    color: colors.muted,
  },

  primaryButton: {
    minHeight: 54,
    borderRadius: radio.full,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
    paddingHorizontal: spacing.s4,
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontFamily: 'DM Sans SemiBold',
    fontSize: 15,
  },

  allDoneText: {
    marginTop: -spacing.s1,
    textAlign: 'center',
    fontFamily: 'DM Sans',
    fontSize: 12,
    lineHeight: 17,
    color: colors.muted,
  },

  listHeader: {
    marginTop: spacing.s1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listCount: {
    fontFamily: 'DM Sans Medium',
    fontSize: 12,
    color: colors.muted,
  },

  vocabsList: {
    gap: spacing.s2,
  },
  vocabCard: {
    backgroundColor: colors.surface,
    borderRadius: radio.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.s3,
  },
  vocabTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.s2,
  },
  vocabTexts: {
    flex: 1,
  },
  word: {
    fontFamily: 'DM Sans Bold',
    fontSize: 16,
    color: colors.text,
  },
  translation: {
    marginTop: 2,
    fontFamily: 'DM Sans',
    fontSize: 13,
    color: colors.muted,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: radio.full,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  statusText: {
    fontFamily: 'DM Sans SemiBold',
    fontSize: 10,
  },

  vocabDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s2,
    marginTop: spacing.s3,
  },
  detailText: {
    fontFamily: 'DM Sans',
    fontSize: 11,
    color: colors.muted,
  },
  detailValue: {
    fontFamily: 'DM Sans SemiBold',
    color: colors.text,
  },
  nextReviewText: {
    marginTop: spacing.s2,
    fontFamily: 'DM Sans',
    fontSize: 11,
    color: colors.muted,
  },

  emptyCard: {
    alignItems: 'center',
    gap: spacing.s2,
    backgroundColor: colors.surface,
    borderRadius: radio.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    padding: spacing.s5,
  },
  emptyText: {
    fontFamily: 'DM Sans',
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
  },

  loadingText: {
    fontFamily: 'DM Sans',
    fontSize: 14,
    color: colors.muted,
  },
  errorText: {
    fontFamily: 'DM Sans Medium',
    fontSize: 14,
    lineHeight: 20,
    color: colors.danger,
    textAlign: 'center',
  },
});