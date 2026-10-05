import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { radio } from '@/src/theme/radio';
import {
  getStudyAverageScore,
  getStudySessionStats,
  StudySessionStats,
} from '@/src/screens/study/services/studyStatsService';
import { useTranslation } from 'react-i18next';

function getSessionDuration(
  startedAt: string,
  finishedAt: string | null
) {
  const start = new Date(startedAt).getTime();
  const end = new Date(finishedAt ?? new Date().toISOString()).getTime();

  const seconds = Math.max(0, Math.floor((end - start) / 1000));

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}min ${remainingSeconds}s`;
}

function getPerformanceLabel(percentage: number, t: any) {
  if (percentage >= 90) return t('study.results.performance.excellent');
  if (percentage >= 75) return t('study.results.performance.veryGood');
  if (percentage >= 55) return t('study.results.performance.goodProgress');
  return t('study.results.performance.keepPracticing');
}

type MetricProps = {
  value: string | number;
  label: string;
  color: string;
};

function Metric({ value, label, color }: MetricProps) {
  return (
    <View style={styles.metric}>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

export default function StudyResultsScreen() {
  const router = useRouter();
  const { t } = useTranslation(); // Inicialize o hook de tradução
  const params = useLocalSearchParams<{ sessionId?: string | string[] }>();

  const sessionId = Array.isArray(params.sessionId)
    ? params.sessionId[0]
    : params.sessionId;

  const [stats, setStats] = useState<StudySessionStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getStudySessionStats(sessionId);
        setStats(data);
      } catch (error) {
        console.error('[StudyResultsScreen] stats error:', error);
      } finally {
        setLoading(false);
      }
    };

    void loadStats();
  }, [sessionId]);

  const performance = useMemo(() => {
    if (!stats) {
      return 0;
    }

    return Math.round(getStudyAverageScore(stats) * 100);
  }, [stats]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.loadingText}>{t('study.results.preparing')}</Text>
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>{t('study.results.unavailableTitle')}</Text>

        <Text style={styles.errorText}>
          {t('study.results.unavailableText')}
        </Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.primaryButtonText}>{t('study.results.backToHome')}</Text>
        </Pressable>
      </View>
    );
  }

  const duration = getSessionDuration(stats.startedAt, stats.finishedAt);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.trophy}>
            <Text style={styles.trophyEmoji}>🎉</Text>
          </View>

          <Text style={styles.title}>{t('study.results.sessionCompleted')}</Text>

          <Text style={styles.subtitle}>
            {getPerformanceLabel(performance, t)}
          </Text>

          <View style={styles.performanceCircle}>
            <Text style={styles.performanceValue}>{performance}%</Text>
            <Text style={styles.performanceLabel}>{t('study.results.performance')}</Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>{t('study.results.sessionSummary')}</Text>

          <View style={styles.metricsGrid}>
            <Metric
              value={stats.answered}
              label={t('study.results.metrics.answered')}
              color={colors.primary}
            />

            <Metric
              value={duration}
              label={t('study.results.metrics.duration')}
              color="#8B5CF6"
            />

            <Metric
              value={stats.known}
              label={t('study.results.metrics.known')}
              color="#16A34A"
            />

            <Metric
              value={stats.unknown}
              label={t('study.results.metrics.review')}
              color="#EA580C"
            />

            <Metric
              value={stats.skipped}
              label={t('study.results.metrics.skipped')}
              color="#64748B"
            />
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>{t('study.results.results')}</Text>

          <View style={styles.resultRow}>
            <View style={[styles.dot, { backgroundColor: '#16A34A' }]} />
            <Text style={styles.resultLabel}>{t('study.results.correct')}</Text>
            <Text style={styles.resultValue}>{stats.correct}</Text>
          </View>

          <View style={styles.resultRow}>
            <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.resultLabel}>{t('study.results.partial')}</Text>
            <Text style={styles.resultValue}>{stats.partial}</Text>
          </View>

          <View style={styles.resultRow}>
            <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.resultLabel}>{t('study.results.incorrect')}</Text>
            <Text style={styles.resultValue}>{stats.incorrect}</Text>
          </View>

          <View style={styles.resultRow}>
            <View style={[styles.dot, { backgroundColor: '#64748B' }]} />
            <Text style={styles.resultLabel}>{t('study.results.skipped')}</Text>
            <Text style={styles.resultValue}>{stats.skipped}</Text>
          </View>
        </View>

        {Object.keys(stats.exerciseTypes).length > 0 && (
          <View style={styles.summaryCard}>
            <Text style={styles.cardTitle}>{t('study.results.exercisesPracticed')}</Text>

            {Object.entries(stats.exerciseTypes).map(
              ([exerciseType, total]) => (
                <View style={styles.exerciseTypeRow} key={exerciseType}>
                  <Text style={styles.exerciseTypeName}>
                    {exerciseType.replaceAll('_', ' ')}
                  </Text>

                  <Text style={styles.exerciseTypeValue}>
                    {t('study.results.timesCount', { count: total })}
                  </Text>
                </View>
              )
            )}
          </View>
        )}

        {Object.keys(stats.skippedExerciseTypes).length > 0 && (
          <View style={styles.summaryCard}>
            <Text style={styles.cardTitle}>{t('study.results.exercisesSkipped')}</Text>

            {Object.entries(stats.skippedExerciseTypes).map(
              ([exerciseType, total]) => (
                <View style={styles.exerciseTypeRow} key={exerciseType}>
                  <Text style={styles.exerciseTypeName}>
                    {exerciseType.replaceAll('_', ' ')}
                  </Text>

                  <Text style={styles.exerciseTypeValue}>
                    {t('study.results.timesCount', { count: total })}
                  </Text>
                </View>
              )
            )}
          </View>
        )}

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.replace('/reviews')}
        >
          <Text style={styles.primaryButtonText}>{t('study.results.viewReviews')}</Text>
        </Pressable>

        <Pressable
          style={styles.outlineButton}
          onPress={() => router.replace('/study')}
        >
          <Text style={styles.outlineButtonText}>{t('study.results.studyAgain')}</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.secondaryButtonText}>{t('study.results.backToHome')}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.s4,
    paddingTop: spacing.s6,
    paddingBottom: spacing.s6,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.s5,
    gap: spacing.s3,
  },

  loadingText: {
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 14,
  },

  hero: {
    alignItems: 'center',
    marginBottom: spacing.s5,
  },
  trophy: {
    width: 74,
    height: 74,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radio.full,
    backgroundColor: '#FEF3C7',
  },
  trophyEmoji: {
    fontSize: 34,
  },
  title: {
    marginTop: spacing.s3,
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 25,
  },
  subtitle: {
    marginTop: spacing.s1,
    color: colors.muted,
    fontFamily: 'DM Sans Medium',
    fontSize: 14,
  },

  performanceCircle: {
    width: 138,
    height: 138,
    marginTop: spacing.s4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radio.full,
    borderWidth: 9,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  performanceValue: {
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 31,
  },
  performanceLabel: {
    marginTop: 1,
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 11,
  },

  summaryCard: {
    marginBottom: spacing.s3,
    padding: spacing.s4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radio.lg,
    backgroundColor: colors.surface,
  },
  cardTitle: {
    marginBottom: spacing.s4,
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 16,
  },

  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metric: {
    width: '50%',
    marginBottom: spacing.s4,
  },
  metricValue: {
    fontFamily: 'DM Sans Bold',
    fontSize: 22,
  },
  metricLabel: {
    marginTop: 2,
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 12,
  },

  resultRow: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dot: {
    width: 10,
    height: 10,
    marginRight: spacing.s3,
    borderRadius: radio.full,
  },
  resultLabel: {
    flex: 1,
    color: colors.text,
    fontFamily: 'DM Sans Medium',
    fontSize: 14,
  },
  resultValue: {
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 15,
  },

  exerciseTypeRow: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  exerciseTypeName: {
    flex: 1,
    marginRight: spacing.s3,
    color: colors.text,
    fontFamily: 'DM Sans Medium',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  exerciseTypeValue: {
    color: colors.muted,
    fontFamily: 'DM Sans SemiBold',
    fontSize: 12,
  },

  primaryButton: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radio.full,
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontFamily: 'DM Sans SemiBold',
    fontSize: 15,
  },

  secondaryButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.s2,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontFamily: 'DM Sans SemiBold',
    fontSize: 14,
  },

  errorTitle: {
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 20,
  },
  errorText: {
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  outlineButton: {
  height: 52,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: spacing.s2,
  borderWidth: 1,
  borderColor: colors.primary,
  borderRadius: radio.full,
  backgroundColor: colors.surface,
},

outlineButtonText: {
  color: colors.primary,
  fontFamily: 'DM Sans SemiBold',
  fontSize: 15,
},
});