import { z } from "zod";

export const targetLevelSchema = z.enum([
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
]);

export const updateProfileBodySchema = z
  .object({
    displayName: z.string().trim().min(1).max(80).optional(),
    nativeLanguage: z
      .string()
      .trim()
      .min(2)
      .max(10)
      .transform((value) => value.toLowerCase())
      .optional(),
  })
  .refine(
    (body) =>
      body.displayName !== undefined || body.nativeLanguage !== undefined,
    {
      message: "Informe ao menos um campo para atualizar.",
    }
  );

export const createLearningLanguageBodySchema = z.object({
  language: z
    .string()
    .trim()
    .min(2)
    .max(10)
    .transform((value) => value.toLowerCase()),

  level: targetLevelSchema,

  // Ao adicionar um idioma pelo header/perfil, ele se torna ativo por padrão.
  makeActive: z.boolean().optional().default(true),
});

export const updateLearningLanguageBodySchema = z.object({
  level: targetLevelSchema,
});

export const updateInterestsBodySchema = z.object({
  interests: z.array(z.string().trim().min(1).max(80)).max(20),
});