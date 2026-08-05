import type { FastifyPluginAsync } from "fastify";
import { prisma } from "@vocabxpert/db";

import { ProgressOverviewResponseSchema } from "../http/progress.js";

const DAYS_IN_ACTIVITY = 7;

function getUtcDayStart(date: Date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
}

function addUtcDays(date: Date, days: number) {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function buildActivityDays(now: Date) {
  const today = getUtcDayStart(now);
  const firstDay = addUtcDays(today, -(DAYS_IN_ACTIVITY - 1));

  return Array.from({ length: DAYS_IN_ACTIVITY }, (_, index) => {
    const day = addUtcDays(firstDay, index);

    return {
      date: toDateKey(day),
      reviews: 0,
    };
  });
}

function calculateCurrentStreak(reviewDates: Date[], now: Date) {
  const reviewDaySet = new Set(reviewDates.map(toDateKey));

  const today = getUtcDayStart(now);
  const yesterday = addUtcDays(today, -1);

  /**
   * A sequência pode começar hoje ou ontem.
   *
   * Exemplo:
   * - estudou hoje: conta a partir de hoje;
   * - ainda não estudou hoje, mas estudou ontem: mantém a sequência;
   * - não estudou hoje nem ontem: sequência é zero.
   */
  let cursor = reviewDaySet.has(toDateKey(today)) ? today : yesterday;

  if (!reviewDaySet.has(toDateKey(cursor))) {
    return 0;
  }

  let streak = 0;

  while (reviewDaySet.has(toDateKey(cursor))) {
    streak += 1;
    cursor = addUtcDays(cursor, -1);
  }

  return streak;
}

export const progressRoutes: FastifyPluginAsync = async (app) => {
  app.get("/progress/overview", async (req) => {
    const now = new Date();
    const activity = buildActivityDays(now);
    const activityStartDate = new Date(`${activity[0].date}T00:00:00.000Z`);

    const [
      vocabs,
      totalReviews,
      averageAttemptScore,
      reviewsForActivity,
      allReviewDates,
    ] = await Promise.all([
      prisma.vocab.findMany({
        where: {
          userId: req.userId,
        },
        select: {
          id: true,
          progresses: {
            where: {
              userId: req.userId,
            },
            select: {
              repetitions: true,
              nextDueAt: true,
            },
            take: 1,
          },
        },
      }),

      prisma.vocabReview.count({
        where: {
          userId: req.userId,
        },
      }),

      prisma.studyAttempt.aggregate({
        where: {
          userId: req.userId,
          aiScore: {
            not: null,
          },
        },
        _avg: {
          aiScore: true,
        },
      }),

      prisma.vocabReview.findMany({
        where: {
          userId: req.userId,
          createdAt: {
            gte: activityStartDate,
          },
        },
        select: {
          createdAt: true,
        },
      }),

      prisma.vocabReview.findMany({
        where: {
          userId: req.userId,
        },
        select: {
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    let newVocabs = 0;
    let dueNow = 0;
    let learning = 0;
    let scheduled = 0;

    for (const vocab of vocabs) {
      const progress = vocab.progresses[0] ?? null;

      if (!progress) {
        newVocabs += 1;
        continue;
      }

      const isDue =
        progress.nextDueAt !== null && progress.nextDueAt <= now;

      if (isDue) {
        dueNow += 1;
        continue;
      }

      /**
       * Mantém a mesma regra que você já usa em /reviews/dashboard.
       */
      if (progress.repetitions === 0) {
        learning += 1;
        continue;
      }

      scheduled += 1;
    }

    const activityMap = new Map<string, number>(
      activity.map((item) => [item.date, 0])
    );

    for (const review of reviewsForActivity) {
      const dateKey = toDateKey(review.createdAt);

      if (activityMap.has(dateKey)) {
        activityMap.set(dateKey, (activityMap.get(dateKey) ?? 0) + 1);
      }
    }

    const activityWithReviews = activity.map((item) => ({
      date: item.date,
      reviews: activityMap.get(item.date) ?? 0,
    }));

    /**
     * O banco armazena aiScore como decimal entre 0 e 1.
     * A API entrega percentual entre 0 e 100 para o frontend.
     */
    const averageScore = Math.round(
      Math.max(0, Math.min(1, averageAttemptScore._avg.aiScore ?? 0)) * 100
    );

    return ProgressOverviewResponseSchema.parse({
      ok: true,

      summary: {
        totalVocabs: vocabs.length,
        newVocabs,
        dueNow,
        learning,
        scheduled,

        totalReviews,
        averageScore,
        currentStreak: calculateCurrentStreak(
          allReviewDates.map((review) => review.createdAt),
          now
        ),
      },

      activity: activityWithReviews,
    });
  });
};