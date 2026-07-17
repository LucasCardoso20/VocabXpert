import { z } from "zod";

export const TooltipLookupQuerySchema = z.object({
  listId: z.string().uuid(),
  text: z.string().min(1).max(80),
});

export const TooltipVocabSchema = z.object({
  id: z.string().uuid(),
  word: z.string(),
  translation: z.string().nullable(),
  examples: z.array(z.string()),
});

export const TooltipLookupResponseSchema = z.object({
  found: z.boolean(),
  vocab: TooltipVocabSchema.nullable(),
  suggestions: z.array(
    z.object({
      word: z.string(),
      translation: z.string(),
      examples: z.array(z.string()).max(3),
    })
  ),
});

export const TooltipAddBodySchema = z.object({
  listId: z.string().uuid(),
  word: z.string().min(1).max(80),
  translation: z.string().min(1).max(120).optional(),
  autoEnrich: z.boolean().optional().default(true),
});

export const TooltipAddResponseSchema = z.object({
  created: z.boolean(),
  vocab: TooltipVocabSchema,
  enriched: z.boolean(),
});