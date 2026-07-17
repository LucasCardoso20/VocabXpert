import { z } from "zod";

export const CreateReviewBodySchema = z.object({
  outcome: z.enum(["KNOWN", "UNKNOWN"]),
});

export const CreateReviewResponseSchema = z.object({
  ok: z.literal(true),
  reviewId: z.string().uuid(),
});