import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '@/src/theme/colors';
import { radio } from '@/src/theme/radio';
import { spacing } from '@/src/theme/spacing';

import {
  fetchProgressOverview,
  type ProgressActivityItem,
  type ProgressOverview,
} from './services/progressService';

function getPerformanceMessage(score: number, totalReviews: number) {
  if (totalReviews === 0) {
    return 'Conclua alguns exercícios para acompanhar seu desempenho.';
  }

  if (score >= 85) {
    return 'Excelente trabalho. Seu vocabulário está ficando bem sólido.';
  }

  if (score >= 60) {
    return 'Bom progresso. Continue revisando para consolidar as palavras.';
  }

  return 'Você está praticando — essas palavras voltarão em breve.';
}

function getDayLabel(dateString: string) {
  const date = new Date(`${dateString}T12:00:00`);

  return date.toLocaleDateString('pt-BR', {
    weekday: 'short',
  })
    .replace('.', '')
    .slice(0, 3)
    .replace(/^./, (letter) => letter.toUpperCase());
}

function getStreakLabel(streak: number) {
  if (streak === 0) {
    return 'Comece sua sequência hoje';
  }

  if (streak === 1) {
    return '1 dia seguido estudando';
  }

  return `${streak} dias seguidos estudando`;
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

function ActivityChart({ activity }: { activity: ProgressActivityItem[] }) {
  const maxReviews = Math.max(...activity.map((item) => item.reviews), 1);

  return (
    <View style={styles.activityChart}>
      {activity.map((item) => {
        const hasReviews = item.reviews > 0;
        const barHeight = hasReviews
          ? Math.max(12, (item.reviews / maxReviews) * 108)
          : 5;

        return (
          <View key={item.date} style={styles.activityColumn}>
            <Text style={styles.activityCount}>
              {hasReviews ? item.reviews : ''}
            </Text>

            <View style={styles.activityBarArea}>
              <View
                style={[
                  styles.activityBar,
                  {
                    height: barHeight,
                    backgroundColor: hasReviews
                      ? colors.primary
                      : colors.border,
                  },
                ]}
              />
            </View>

            <Text style={styles.activityDay}>{getDayLabel(item.date)}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default function ProgressScreen() {
  const router = useRouter();

  const [data, setData] = useState<ProgressOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProgress = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      const overview = await fetchProgressOverview();
      setData(overview);
    } catch (err: any) {
      console.error(
        '[ProgressScreen] load error:',
        err?.response?.data ?? err?.message ?? err
      );

      setError('Não foi possível carregar seu progresso.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
  void loadProgress();
}, [loadProgress]);

  const attentionItems = useMemo(() => {
    if (!data) {
      return [];
    }

    const { summary } = data;
    const items: string[] = [];

    if (summary.dueNow > 0) {
      items.push(
        `${summary.dueNow} ${
          summary.dueNow === 1 ? 'palavra precisa' : 'palavras precisam'
        } de revisão`
      );
    }

    if (summary.newVocabs > 0) {
      items.push(
        `${summary.newVocabs} ${
          summary.newVocabs === 1 ? 'palavra ainda é nova' : 'palavras ainda são novas'
        }`
      );
    }

    if (summary.scheduled > 0) {
      items.push(
        `${summary.scheduled} ${
          summary.scheduled === 1 ? 'palavra está agendada' : 'palavras estão agendadas'
        }`
      );
    }

    return items;
  }, [data]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando seu progresso...</Text>
      </View>
    );
  }

  if (error && !data) {
    return (
      <View style={styles.center}>
        <Ionicons name="cloud-offline-outline" size={42} color={colors.muted} />

        <Text style={styles.errorText}>{error}</Text>

        <Pressable style={styles.primaryButton} onPress={() => loadProgress()}>
          <Text style={styles.primaryButtonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  if (!data) {
    return null;
  }

  const { summary, activity } = data;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => loadProgress(true)}
          tintColor={colors.primary}
        />
      }
    >
      <View>
        <Text style={styles.title}>Seu progresso</Text>

        <Text style={styles.subtitle}>
          Veja como seu vocabulário evolui a cada sessão.
        </Text>
      </View>

      <View style={styles.streakCard}>
        <View style={styles.streakIcon}>
          <Text style={styles.streakEmoji}>🔥</Text>
        </View>

        <View style={styles.streakContent}>
          <Text style={styles.streakValue}>
            {summary.currentStreak === 0
              ? 'Sua sequência começa agora'
              : `${summary.currentStreak} ${
                  summary.currentStreak === 1 ? 'dia' : 'dias'
                }`}
          </Text>

          <Text style={styles.streakLabel}>
            {getStreakLabel(summary.currentStreak)}
          </Text>
        </View>
      </View>

      <View style={styles.scoreCard}>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreValue}>
            {summary.totalReviews > 0 ? `${summary.averageScore}%` : '—'}
          </Text>

          <Text style={styles.scoreLabel}>média</Text>
        </View>

        <View style={styles.scoreContent}>
          <Text style={styles.scoreTitle}>Desempenho geral</Text>

          <Text style={styles.scoreDescription}>
            {getPerformanceMessage(summary.averageScore, summary.totalReviews)}
          </Text>
        </View>
      </View>

      <View style={styles.summaryGrid}>
        <SummaryCard
          label="Total"
          value={summary.totalVocabs}
          icon="library-outline"
          color={colors.primary}
        />

        <SummaryCard
          label="Revisões"
          value={summary.totalReviews}
          icon="checkmark-done-outline"
          color="#16A34A"
        />

        <SummaryCard
          label="Pendentes"
          value={summary.dueNow}
          icon="alarm-outline"
          color="#DC2626"
        />

        <SummaryCard
          label="Em estudo"
          value={summary.learning}
          icon="school-outline"
          color="#D97706"
        />
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>Atividade semanal</Text>
            <Text style={styles.cardSubtitle}>Revisões nos últimos 7 dias</Text>
          </View>

          <Ionicons name="bar-chart-outline" size={22} color={colors.primary} />
        </View>

        <ActivityChart activity={activity} />
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.cardTitle}>Pontos de atenção</Text>
            <Text style={styles.cardSubtitle}>
              Uma visão rápida da sua agenda
            </Text>
          </View>

          <Ionicons
            name="information-circle-outline"
            size={22}
            color={colors.primary}
          />
        </View>

        {attentionItems.length === 0 ? (
          <Text style={styles.emptyText}>
            Adicione palavras e conclua sessões para acompanhar sua evolução.
          </Text>
        ) : (
          <View style={styles.attentionList}>
            {attentionItems.map((item) => (
              <View key={item} style={styles.attentionRow}>
                <View style={styles.attentionBullet} />
                <Text style={styles.attentionText}>{item}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={() => router.push('/reviews')}
      >
        <Ionicons name="calendar-outline" size={19} color="#FFFFFF" />
        <Text style={styles.primaryButtonText}>Ver minhas revisões</Text>
      </Pressable>

      <Pressable
        style={styles.outlineButton}
        onPress={() => router.push('/study')}
      >
        <Ionicons name="play-outline" size={19} color={colors.primary} />
        <Text style={styles.outlineButtonText}>Estudar agora</Text>
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
    gap: spacing.s3,
    padding: spacing.s4,
    paddingBottom: spacing.s6,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s3,
    paddingHorizontal: spacing.s5,
    backgroundColor: colors.background,
  },

  title: {
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 25,
  },

  subtitle: {
    marginTop: spacing.s1,
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 13,
    lineHeight: 19,
  },

  streakCard: {
    minHeight: 88,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s3,
    padding: spacing.s4,
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: radio.lg,
    backgroundColor: '#FFFBEB',
  },

  streakIcon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radio.full,
    backgroundColor: '#FEF3C7',
  },

  streakEmoji: {
    fontSize: 25,
  },

  streakContent: {
    flex: 1,
  },

  streakValue: {
    color: '#92400E',
    fontFamily: 'DM Sans Bold',
    fontSize: 16,
  },

  streakLabel: {
    marginTop: 2,
    color: '#A16207',
    fontFamily: 'DM Sans Medium',
    fontSize: 12,
  },

  scoreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s4,
    padding: spacing.s4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radio.lg,
    backgroundColor: colors.surface,
  },

  scoreCircle: {
    width: 86,
    height: 86,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: colors.primary,
    borderRadius: radio.full,
  },

  scoreValue: {
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 22,
  },

  scoreLabel: {
    marginTop: 1,
    color: colors.muted,
    fontFamily: 'DM Sans Medium',
    fontSize: 10,
  },

  scoreContent: {
    flex: 1,
  },

  scoreTitle: {
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 16,
  },

  scoreDescription: {
    marginTop: spacing.s1,
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 12.5,
    lineHeight: 18,
  },

  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s2,
  },

  summaryCard: {
    width: '48%',
    minHeight: 116,
    padding: spacing.s3,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radio.lg,
    backgroundColor: colors.surface,
  },

  summaryIcon: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radio.full,
  },

  summaryValue: {
    marginTop: spacing.s2,
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 23,
  },

  summaryLabel: {
    marginTop: 2,
    color: colors.muted,
    fontFamily: 'DM Sans Medium',
    fontSize: 12,
  },

  card: {
    padding: spacing.s4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radio.lg,
    backgroundColor: colors.surface,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.s2,
  },

  cardTitle: {
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 16,
  },

  cardSubtitle: {
    marginTop: 2,
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 12,
  },

  activityChart: {
    height: 155,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 4,
    marginTop: spacing.s4,
  },

  activityColumn: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  activityCount: {
    minHeight: 16,
    marginBottom: 3,
    color: colors.primary,
    fontFamily: 'DM Sans Bold',
    fontSize: 11,
  },

  activityBarArea: {
    height: 110,
    justifyContent: 'flex-end',
  },

  activityBar: {
    width: 22,
    minHeight: 5,
    borderRadius: radio.full,
  },

  activityDay: {
    marginTop: spacing.s2,
    color: colors.muted,
    fontFamily: 'DM Sans Medium',
    fontSize: 10,
  },

  attentionList: {
    gap: spacing.s3,
    marginTop: spacing.s4,
  },

  attentionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.s2,
  },

  attentionBullet: {
    width: 8,
    height: 8,
    marginTop: 5,
    borderRadius: radio.full,
    backgroundColor: colors.primary,
  },

  attentionText: {
    flex: 1,
    color: colors.text,
    fontFamily: 'DM Sans',
    fontSize: 13,
    lineHeight: 19,
  },

  emptyText: {
    marginTop: spacing.s4,
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 13,
    lineHeight: 19,
  },

  primaryButton: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
    paddingHorizontal: spacing.s4,
    borderRadius: radio.full,
    backgroundColor: colors.primary,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontFamily: 'DM Sans SemiBold',
    fontSize: 15,
  },

  outlineButton: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
    paddingHorizontal: spacing.s4,
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

  loadingText: {
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 14,
  },

  errorText: {
    color: colors.danger,
    fontFamily: 'DM Sans Medium',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});