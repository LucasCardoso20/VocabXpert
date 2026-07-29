import { z } from "zod";
export const OnboardingBodySchema = z.object({
    nativeLanguage: z.string().min(1),
    targetLanguage: z.string().min(1),
    level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
    interests: z.array(z.string().min(1)),
    customInterests: z.array(z.string().min(1)).default([]),
    seedInitialVocabs: z.boolean().optional(),
});
export const OnboardingResponseSchema = z.object({
    userId: z.string().min(1),
    defaultListId: z.string().min(1),
});
