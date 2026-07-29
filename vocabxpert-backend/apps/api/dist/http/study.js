import { z } from "zod";
export const StudyScopeSchema = z.enum(["LAST_10", "ALL", "DUE"]);
export const SessionExerciseTypeSchema = z.enum([
    "RANDOM",
    "MULTIPLE_CHOICE_TRANSLATION",
    "CREATE_SENTENCE",
    "CLOZE",
    "FLASHCARD",
    "MATCH",
    "DICTATION",
    "CHOOSE_CORRECT_EXAMPLE",
    "WORD_ORDER",
]);
export const ConcreteExerciseTypeSchema = z.enum([
    "MULTIPLE_CHOICE_TRANSLATION",
    "CREATE_SENTENCE",
    "CLOZE",
    "FLASHCARD",
    "MATCH",
    "DICTATION",
    "CHOOSE_CORRECT_EXAMPLE",
    "WORD_ORDER",
]);
export const CreateStudySessionBodySchema = z.object({
    listId: z.string().uuid(),
    exerciseType: SessionExerciseTypeSchema.optional().default("RANDOM"),
    enabledExerciseTypes: z.array(ConcreteExerciseTypeSchema).optional(), // ✅ sem RANDOM
    scope: StudyScopeSchema.optional().default("DUE"),
    limit: z.number().int().min(1).max(50).optional().default(10),
    direction: z.enum(["WORD_TO_TRANSLATION", "TRANSLATION_TO_WORD"]).optional().default("WORD_TO_TRANSLATION"),
});
export const StudyExerciseSchema = z.object({
    id: z.string().uuid(),
    sessionId: z.string().uuid(),
    vocabId: z.string().uuid(),
    type: ConcreteExerciseTypeSchema, // ✅ nunca pode ser RANDOM
    payload: z.unknown(),
    createdAt: z.union([z.date(), z.string()]).transform((v) => (v instanceof Date ? v.toISOString() : v)),
});
export const CreateStudySessionResponseSchema = z.object({
    sessionId: z.string().uuid(),
    firstExercise: StudyExerciseSchema.nullable(),
});
export const SubmitAttemptBodySchema = z.object({
    response: z.unknown(), // cada tipo tem seu formato; a IA avalia
});
export const SubmitAttemptResponseSchema = z.object({
    ok: z.literal(true),
    attemptId: z.string().uuid(),
    reviewId: z.string().uuid(),
    outcome: z.enum(["KNOWN", "UNKNOWN"]),
    verdict: z.enum(["CORRECT", "PARTIAL", "INCORRECT", "UNKNOWN"]),
    score: z.number().min(0).max(1),
    feedback: z.string(),
    nextDueAt: z.string().datetime().nullable(),
    evaluator: z.enum(["DETERMINISTIC", "GEMINI"]), // ✅ novo
    aiModel: z.string(), // ✅ novo
    latencyMs: z.number().int().min(0), // ✅ novo     
});
