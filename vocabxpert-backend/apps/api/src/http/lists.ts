import { z } from "zod";

export const ListSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  isDefault: z.boolean(),
  createdAt: z.string().or(z.date()),
});

export const GetListsResponseSchema = z.object({
  items: z.array(ListSchema),
});

export const CreateListBodySchema = z.object({
  name: z.string().min(1).max(60),
});

export const CreateListResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  isDefault: z.boolean(),
});

export const StudyListResponseSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().uuid(),
      word: z.string(),
      translation: z.string().nullable(),
    })
  ),
});