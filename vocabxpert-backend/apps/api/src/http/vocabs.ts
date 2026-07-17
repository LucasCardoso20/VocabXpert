import { z } from "zod";

export const CreateVocabBodySchema = z.object({
  listId: z.string().uuid(),
  word: z.string().min(1),
  translation: z.string().optional(),
  examples: z.array(z.string().min(1)).max(5).optional(),
});

export const VocabNoteSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
  createdAt: z.string().or(z.date()),
});

export const VocabExampleSchema = z.object({
  id: z.string().uuid(),
  text: z.string(),
});

export const VocabDetailSchema = z.object({
  id: z.string().uuid(),
  word: z.string(),
  translation: z.string().nullable(),
  listId: z.string().uuid(),
  examples: z.array(VocabExampleSchema),
  notes: z.array(VocabNoteSchema),
});

export const CreateVocabResponseSchema = VocabDetailSchema.pick({
  id: true,
  word: true,
  translation: true,
  listId: true,
}).extend({
  examples: z.array(VocabExampleSchema),
  notes: z.array(VocabNoteSchema),
});

export const VocabListItemSchema = z.object({
  id: z.string().uuid(),
  word: z.string(),
  translation: z.string().nullable(),
  createdAt: z.coerce.date(), // ou z.string(), dependendo do que você retorna
  examples: z.array(VocabExampleSchema),
});

export const AddNoteBodySchema = z.object({
  text: z.string().min(1).max(500),
});

export const PreviewVocabBodySchema = z.object({
  word: z.string().min(1),
});

export const PreviewVocabResponseSchema = z.object({
  translation: z.string().nullable(),
  examples: z.array(z.string()).default([]),
});