import { z } from "zod";

export const CreateReviewBodySchema = z.object({
  outcome: z.enum(["KNOWN", "UNKNOWN"]),
});

export const CreateReviewResponseSchema = z.object({
  ok: z.literal(true),
  reviewId: z.string().uuid(),
});

export const ReviewDashboardQuerySchema = z.object({
  listId: z.string().uuid(),
});

export const ReviewDashboardItemSchema = z.object({
  id: z.string().uuid(),
  word: z.string(),
  translation: z.string().nullable(),

  status: z.enum(["DUE", "NEW", "LEARNING", "SCHEDULED"]),

  repetitions: z.number().int(),
  streak: z.number().int(),
  interval: z.number().int(),

  lastOutcome: z.enum(["KNOWN", "UNKNOWN"]).nullable(),
  lastReviewedAt: z.date().nullable(),
  nextDueAt: z.date().nullable(),
});

export const ReviewDashboardResponseSchema = z.object({
  ok: z.literal(true),

  summary: z.object({
    totalVocabs: z.number().int().nonnegative(),
    dueNow: z.number().int().nonnegative(),
    newVocabs: z.number().int().nonnegative(),
    learning: z.number().int().nonnegative(),
    scheduled: z.number().int().nonnegative(),
  }),

  items: z.array(ReviewDashboardItemSchema),
});