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
import { useTranslation } from 'react-i18next';

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
import { useProfile } from '@/src/contexts/ProfileContext';

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
    labelKey: string;
    icon: React.ComponentProps<typeof Ionicons>['name'];
    backgroundColor: string;
    textColor: string;
  }
> = {
  DUE: {
    labelKey: 'reviewScreen.status.due',
    icon: 'alarm-outline',
    backgroundColor: '#FEE2E2',
    textColor: '#B91C1C',
  },
  NEW: {
    labelKey: 'reviewScreen.status.new',
    icon: 'sparkles-outline',
    backgroundColor: '#E0E7FF',
    textColor: '#3730A3',
  },
  LEARNING: {
    labelKey: 'reviewScreen.status.learning',
    icon: 'school-outline',
    backgroundColor: '#FEF3C7',
    textColor: '#92400E',
  },
  SCHEDULED: {
    labelKey: 'reviewScreen.status.scheduled',
    icon: 'calendar-outline',
    backgroundColor: '#DCFCE7',
    textColor: '#166534',
  },
};

function formatReviewDate(
  t: (key: string, options?: Record<string, unknown>) => string,
  dateValue: string | null
) {
  if (!dateValue) {
    return t('reviewScreen.date.never');
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return t('reviewScreen.date.invalid');
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
  const { t } = useTranslation();
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
            {t(config.labelKey)}
          </Text>
        </View>
      </View>

      <View style={styles.vocabDetails}>
        <Text style={styles.detailText}>
          {t('reviewScreen.item.repetitionsLabel')} <Text style={styles.detailValue}>{item.repetitions}</Text>
        </Text>

        <Text style={styles.detailText}>
          {t('reviewScreen.item.streakLabel')} <Text style={styles.detailValue}>{item.streak}</Text>
        </Text>

        <Text style={styles.detailText}>
          {t('reviewScreen.item.intervalLabel')}{' '}
          <Text style={styles.detailValue}>
            {t('reviewScreen.item.intervalValue', { count: item.interval })}
          </Text>
        </Text>
      </View>

      <Text style={styles.nextReviewText}>
        {item.status === 'NEW'
          ? t('reviewScreen.item.notStudiedYet')
          : t('reviewScreen.item.nextReview', {
              date: formatReviewDate(t, item.nextDueAt),
            })}
      </Text>
    </View>
  );
}

export default function VocabReviewScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { activeLanguage, isLoadingProfile } = useProfile();
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
    async (isRefresh = false, reloadListsForCurrentLanguage = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError(null);

        /**
         * Ao trocar o idioma, a listId previamente selecionada pertence
         * ao idioma anterior. Portanto, ela não pode ser reutilizada.
         */
        if (reloadListsForCurrentLanguage) {
          setDashboard(null);
          setLists([]);
          setSelectedListId('');
        }

        let listIdToLoad = selectedListId;

        if (reloadListsForCurrentLanguage || !listIdToLoad) {
          listIdToLoad = await loadInitialData();
        }

        if (listIdToLoad) {
          await loadDashboard(listIdToLoad);
        } else {
          setDashboard(null);
        }
      } catch (err: any) {
        console.error(
          '[VocabReviewScreen] load error:',
          err?.response?.data ?? err?.message ?? err
        );

        setError(t('reviewScreen.errors.loadFailed'));
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [loadDashboard, loadInitialData, selectedListId, t]
  );

  useEffect(() => {
    if (isLoadingProfile || !activeLanguage?.id) {
      return;
    }

    /**
     * true força a tela a esquecer a lista selecionada no idioma anterior
     * e carregar a lista padrão do idioma recém-ativado.
     */
    void loadScreen(false, true);
  }, [activeLanguage?.id, isLoadingProfile, loadScreen]);

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

        setError(t('reviewScreen.errors.listChangeFailed'));
      } finally {
        setRefreshing(false);
      }
    },
    [loadDashboard, t]
  );

  const startDueReview = useCallback(async () => {
    if (!selectedListId) {
      Alert.alert(
        t('reviewScreen.alerts.selectListTitle'),
        t('reviewScreen.alerts.selectListMessage')
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
          t('reviewScreen.alerts.noWordsTitle'),
          t('reviewScreen.alerts.noWordsMessage')
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
        t('reviewScreen.alerts.startErrorTitle'),
        t('reviewScreen.alerts.startErrorMessage')
      );
    } finally {
      setStarting(false);
    }
  }, [loadDashboard, router, selectedListId, t]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{t('reviewScreen.loading')}</Text>
      </View>
    );
  }

  if (error && !dashboard) {
    return (
      <View style={styles.center}>
        <Ionicons name="cloud-offline-outline" size={40} color={colors.muted} />
        <Text style={styles.errorText}>{error}</Text>

        <Pressable style={styles.primaryButton} onPress={() => loadScreen()}>
          <Text style={styles.primaryButtonText}>{t('reviewScreen.retry')}</Text>
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
          <Text style={styles.title}>{t('reviewScreen.title')}</Text>

          <Text style={styles.subtitle}>
            {t('reviewScreen.subtitle')}
          </Text>
        </View>

        <Pressable
          style={styles.progressButton}
          onPress={() => router.push('/progress')}
          accessibilityRole="button"
          accessibilityLabel={t('reviewScreen.progressButton.accessibilityLabel')}
        >
          <Ionicons
            name="stats-chart-outline"
            size={18}
            color={colors.primary}
          />

          <Text style={styles.progressButtonText}>{t('reviewScreen.progressButton.label')}</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>{t('reviewScreen.lists.title')}</Text>

        {lists.length === 0 ? (
          <Text style={styles.emptyText}>
            {t('reviewScreen.lists.empty')}
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
                {t('reviewScreen.lists.showingProgressOf', {
                  name: selectedList.name,
                })}
              </Text>
            )}
          </>
        )}
      </View>

      {!!dashboard && (
        <>
          <View style={styles.summaryGrid}>
            <SummaryCard
              label={t('reviewScreen.summary.due')}
              value={dashboard.summary.dueNow}
              icon="alarm-outline"
              color="#DC2626"
            />

            <SummaryCard
              label={t('reviewScreen.summary.new')}
              value={dashboard.summary.newVocabs}
              icon="sparkles-outline"
              color="#4F46E5"
            />

            <SummaryCard
              label={t('reviewScreen.summary.learning')}
              value={dashboard.summary.learning}
              icon="school-outline"
              color="#D97706"
            />

            <SummaryCard
              label={t('reviewScreen.summary.scheduled')}
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
                  {t('reviewScreen.buttons.reviewPendingAndNew')}
                </Text>
              </>
            )}
          </Pressable>

          {!hasItemsToStudy && (
            <Text style={styles.allDoneText}>
              {t('reviewScreen.allDone')}
            </Text>
          )}

          <View style={styles.listHeader}>
            <Text style={styles.sectionTitle}>{t('reviewScreen.wordsList.title')}</Text>

            <Text style={styles.listCount}>
              {t('reviewScreen.wordsList.count', {
                count: dashboard.summary.totalVocabs,
              })}
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
                {t('reviewScreen.wordsList.empty')}
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