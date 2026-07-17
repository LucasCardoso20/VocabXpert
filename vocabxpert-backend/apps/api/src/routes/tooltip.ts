import type { FastifyPluginAsync } from "fastify";
import { prisma } from "@vocabxpert/db";
import {
  TooltipAddBodySchema,
  TooltipAddResponseSchema,
  TooltipLookupQuerySchema,
  TooltipLookupResponseSchema,
} from "../http/tooltip.js";
import { normalizeWord } from "../services/vocab/normalizeWord.js";
import { ensureVocabEnriched } from "../services/vocab/ensureVocabEnriched.js";
import { enrichVocabViaGemini } from "../services/ai/enrichVocab.gemini.js";

export const tooltipRoutes: FastifyPluginAsync = async (app) => {
  // Lookup rápido (para Tooltip)
  app.get("/tooltip/lookup", async (req, reply) => {
    const q = TooltipLookupQuerySchema.parse(req.query);

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { nativeLanguage: true, targetLanguage: true, level: true },
    });
    if (!user) return reply.status(404).send({ ok: false, error: "USER_NOT_FOUND" });

    const wordNormalized = normalizeWord(q.text);

    const vocab = await prisma.vocab.findFirst({
      where: {
        userId: req.userId,
        listId: q.listId,
        wordNormalized,
      },
      select: {
        id: true,
        word: true,
        translation: true,
        examples: { select: { text: true } },
      },
    });

    if (vocab) {
      const res = {
        found: true,
        vocab: {
          id: vocab.id,
          word: vocab.word,
          translation: vocab.translation,
          examples: vocab.examples.map((e) => e.text),
        },
        suggestions: [],
      };
      return TooltipLookupResponseSchema.parse(res);
    }

    // Não existe ainda -> sugere via IA (sem salvar)
    const ai = await enrichVocabViaGemini({
      nativeLanguage: user.nativeLanguage,
      targetLanguage: user.targetLanguage,
      word: q.text,
      level: user.level
    });

    const res = {
      found: false,
      vocab: null,
      suggestions: [
        {
          word: q.text.trim(),
          translation: ai.translation,
          examples: ai.examples,
        },
      ],
    };
    return TooltipLookupResponseSchema.parse(res);
  });

  // Add rápido (e opcionalmente enriquecer)
  app.post("/tooltip/add", async (req, reply) => {
    const body = TooltipAddBodySchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { nativeLanguage: true, targetLanguage: true, level: true },
    });
    if (!user) return reply.status(404).send({ ok: false, error: "USER_NOT_FOUND" });

    const wordNormalized = normalizeWord(body.word);

    // tenta achar existente
    const existing = await prisma.vocab.findFirst({
      where: { userId: req.userId, listId: body.listId, wordNormalized },
      select: { id: true },
    });

    let created = false;
    const vocabId =
      existing?.id ??
      (await prisma.vocab.create({
        data: {
          userId: req.userId,
          listId: body.listId,
          word: body.word.trim(),
          wordNormalized,
          translation: body.translation?.trim() ?? null,
        },
        select: { id: true },
      })).id;

    created = !existing;

    let enriched = false;
    if (body.autoEnrich) {
      const r = await ensureVocabEnriched({
        userId: req.userId,
        vocabId,
        nativeLanguage: user.nativeLanguage,
        targetLanguage: user.targetLanguage,
        level: user.level
      });
      enriched = r.enriched;
    }

    const vocab = await prisma.vocab.findFirst({
      where: { id: vocabId, userId: req.userId },
      select: { id: true, word: true, translation: true, examples: { select: { text: true } } },
    });
    if (!vocab) return reply.status(404).send({ ok: false, error: "VOCAB_NOT_FOUND" });

    return TooltipAddResponseSchema.parse({
      created,
      enriched,
      vocab: {
        id: vocab.id,
        word: vocab.word,
        translation: vocab.translation,
        examples: vocab.examples.map((e) => e.text),
      },
    });
  });
};