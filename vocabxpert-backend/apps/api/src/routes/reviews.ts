import type { FastifyPluginAsync } from "fastify";
import { prisma } from "@vocabxpert/db";
import {
  CreateReviewBodySchema,
  CreateReviewResponseSchema,
  ReviewDashboardQuerySchema,
  ReviewDashboardResponseSchema,
} from "../http/reviews.js";
import { applyReviewToProgress } from "../services/srs/updateProgress.js";

export const reviewsRoutes: FastifyPluginAsync = async (app) => {
    app.get("/reviews/lists", async (req) => {
    const lists = await prisma.vocabList.findMany({
      where: {
        userId: req.userId,
      },
      select: {
        id: true,
        name: true,
        isDefault: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      ok: true,
      lists,
    };
  });

  app.get("/reviews/dashboard", async (req, reply) => {
    const query = ReviewDashboardQuerySchema.parse(req.query);
    const now = new Date();

    const list = await prisma.vocabList.findFirst({
      where: {
        id: query.listId,
        userId: req.userId,
      },
      select: {
        id: true,
      },
    });

    if (!list) {
      return reply.status(404).send({
        ok: false,
        error: "LIST_NOT_FOUND",
      });
    }

    const vocabs = await prisma.vocab.findMany({
      where: {
        userId: req.userId,
        listId: query.listId,
      },
      select: {
        id: true,
        word: true,
        translation: true,
        progresses: {
          where: {
            userId: req.userId,
          },
          select: {
            repetitions: true,
            streak: true,
            interval: true,
            lastOutcome: true,
            lastReviewedAt: true,
            nextDueAt: true,
          },
          take: 1,
        },
      },
    });

    const statusWeight = {
      DUE: 0,
      NEW: 1,
      LEARNING: 2,
      SCHEDULED: 3,
    } as const;
    type ReviewStatus = keyof typeof statusWeight;

    const items = vocabs.map((vocab) => {
      const progress = vocab.progresses[0] ?? null;

      const isNew = !progress;
      const isDue =
        progress?.nextDueAt !== null &&
        progress?.nextDueAt !== undefined &&
        progress.nextDueAt <= now;

      const status: ReviewStatus = isDue
        ? "DUE"
        : isNew
          ? "NEW"
          : progress?.repetitions === 0
            ? "LEARNING"
            : "SCHEDULED";

      return {
        id: vocab.id,
        word: vocab.word,
        translation: vocab.translation,

        status,

        repetitions: progress?.repetitions ?? 0,
        streak: progress?.streak ?? 0,
        interval: progress?.interval ?? 0,

        lastOutcome: progress?.lastOutcome ?? null,
        lastReviewedAt: progress?.lastReviewedAt ?? null,
        nextDueAt: progress?.nextDueAt ?? null,
      };
    });

    items.sort((a, b) => {
      const byStatus = statusWeight[a.status] - statusWeight[b.status];

      if (byStatus !== 0) {
        return byStatus;
      }

      const aDate = a.nextDueAt?.getTime() ?? 0;
      const bDate = b.nextDueAt?.getTime() ?? 0;

      return aDate - bDate;
    });

    const summary = {
      totalVocabs: items.length,
      dueNow: items.filter((item) => item.status === "DUE").length,
      newVocabs: items.filter((item) => item.status === "NEW").length,
      learning: items.filter((item) => item.status === "LEARNING").length,
      scheduled: items.filter((item) => item.status === "SCHEDULED").length,
    };

    return ReviewDashboardResponseSchema.parse({
      ok: true,
      summary,
      items,
    });
  });

  app.post("/vocabs/:vocabId/reviews", async (req, reply) => {
    const { vocabId } = req.params as { vocabId: string };
    const body = CreateReviewBodySchema.parse(req.body);

    // ownership: vocab tem que ser do user
    const vocab = await prisma.vocab.findFirst({
      where: { id: vocabId, userId: req.userId },
      select: { id: true },
    });

    if (!vocab) {
      return reply.status(404).send({ ok: false, error: "VOCAB_NOT_FOUND" });
    }

    const review = await prisma.vocabReview.create({
      data: {
        userId: req.userId,
        vocabId,
        outcome: body.outcome,
      },
      select: { id: true },
    });

    await applyReviewToProgress({
      userId: req.userId,
      vocabId,
      outcome: body.outcome,
    });

    return CreateReviewResponseSchema.parse({ ok: true, reviewId: review.id });
  });
};