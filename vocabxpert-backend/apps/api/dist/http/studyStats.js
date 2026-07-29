import { z } from "zod";
export const StudyStatsQuerySchema = z.object({
    listId: z.string().uuid(),
    windowDays: z.coerce.number().int().min(1).max(90).optional().default(7),
});
export const StudyStatsResponseSchema = z.object({
    listId: z.string().uuid(),
    totalVocabs: z.number().int().min(0),
    reviewedVocabs: z.number().int().min(0),
    neverReviewedVocabs: z.number().int().min(0),
    dueNowVocabs: z.number().int().min(0),
    reviewsInWindow: z.number().int().min(0),
    knownInWindow: z.number().int().min(0),
    unknownInWindow: z.number().int().min(0),
});
