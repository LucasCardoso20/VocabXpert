import { z } from "zod";

export const ProgressOverviewResponseSchema = z.object({
  ok: z.literal(true),

  summary: z.object({
    totalVocabs: z.number().int().nonnegative(),
    newVocabs: z.number().int().nonnegative(),
    dueNow: z.number().int().nonnegative(),
    learning: z.number().int().nonnegative(),
    scheduled: z.number().int().nonnegative(),

    totalReviews: z.number().int().nonnegative(),
    averageScore: z.number().min(0).max(100),
    currentStreak: z.number().int().nonnegative(),
  }),

  activity: z.array(
    z.object({
      date: z.string(),
      reviews: z.number().int().nonnegative(),
    })
  ),
});

export type ProgressOverviewResponse = z.infer<
  typeof ProgressOverviewResponseSchema
>;