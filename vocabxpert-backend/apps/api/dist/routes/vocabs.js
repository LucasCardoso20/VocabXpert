import { prisma } from "@vocabxpert/db";
import { AddNoteBodySchema, CreateVocabBodySchema, PreviewVocabBodySchema, PreviewVocabResponseSchema, VocabDetailSchema, } from "../http/vocabs.js";
import { enrichVocabViaGemini } from "../services/ai/enrichVocab.gemini.js";
import { wordFields } from "../utils/wordFields.js";
export const vocabsRoutes = async (app) => {
    // POST /vocabs (manual, sem IA)
    function isPrismaP2002(e) {
        return typeof e === "object" && e !== null && e.code === "P2002";
    }
    app.post("/vocabs", async (req, reply) => {
        const body = CreateVocabBodySchema.parse(req.body);
        const list = await prisma.vocabList.findFirst({
            where: { id: body.listId, userId: req.userId },
            select: { id: true },
        });
        if (!list)
            return reply.status(404).send({ ok: false, error: "LIST_NOT_FOUND" });
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { nativeLanguage: true, targetLanguage: true, level: true },
        });
        if (!user)
            return reply.status(404).send({ ok: false, error: "USER_NOT_FOUND" });
        const { word, wordNormalized } = wordFields(body.word);
        try {
            // IA sempre tenta enriquecer
            let aiTranslation = null;
            let aiExamples = [];
            try {
                const enriched = await enrichVocabViaGemini({
                    nativeLanguage: user.nativeLanguage,
                    targetLanguage: user.targetLanguage,
                    level: user.level,
                    word,
                });
                aiTranslation = enriched.translation ?? null;
                aiExamples = (enriched.examples ?? []).map((t) => t.trim()).filter(Boolean).slice(0, 3);
            }
            catch {
                // fallback silencioso: não quebra criação
            }
            const manualTranslation = body.translation?.trim() || null;
            const manualExamples = (body.examples ?? []).map((t) => t.trim()).filter(Boolean).slice(0, 5);
            const finalTranslation = manualTranslation || aiTranslation || null;
            const finalExamples = manualExamples.length > 0 ? manualExamples : aiExamples;
            const vocab = await prisma.vocab.create({
                data: {
                    userId: req.userId,
                    listId: body.listId,
                    word,
                    wordNormalized,
                    translation: finalTranslation,
                    examples: finalExamples.length
                        ? { create: finalExamples.map((text) => ({ text })) }
                        : undefined,
                },
                include: {
                    examples: { select: { id: true, vocabId: true, text: true } },
                    notes: { select: { id: true, vocabId: true, text: true, createdAt: true, updatedAt: true } },
                },
            });
            return vocab;
        }
        catch (e) {
            if (isPrismaP2002(e)) {
                return reply.status(409).send({
                    ok: false,
                    error: "VOCAB_ALREADY_EXISTS",
                    fields: ["listId", "wordNormalized"],
                });
            }
            throw e;
        }
    });
    // GET /vocabs/:vocabId
    app.get("/vocabs/:vocabId", async (req, reply) => {
        const { vocabId } = req.params;
        const vocab = await prisma.vocab.findFirst({
            where: { id: vocabId, userId: req.userId },
            include: {
                examples: { select: { id: true, text: true } },
                notes: { select: { id: true, text: true, createdAt: true }, orderBy: { createdAt: "desc" } },
            },
        });
        if (!vocab) {
            return reply.status(404).send({ ok: false, error: "VOCAB_NOT_FOUND" });
        }
        const { word, wordNormalized } = wordFields(vocab.word);
        return VocabDetailSchema.parse({
            id: vocab.id,
            word,
            wordNormalized,
            translation: vocab.translation,
            listId: vocab.listId,
            examples: vocab.examples,
            notes: vocab.notes,
        });
    });
    // POST /vocabs/:vocabId/notes
    app.post("/vocabs/:vocabId/notes", async (req, reply) => {
        const { vocabId } = req.params;
        const body = AddNoteBodySchema.parse(req.body);
        const vocab = await prisma.vocab.findFirst({
            where: { id: vocabId, userId: req.userId },
            select: { id: true },
        });
        if (!vocab) {
            return reply.status(404).send({ ok: false, error: "VOCAB_NOT_FOUND" });
        }
        const note = await prisma.vocabNote.create({
            data: { vocabId, text: body.text },
            select: { id: true, text: true, createdAt: true },
        });
        return note;
    });
    app.post('/vocabs/preview', async (req, reply) => {
        const body = PreviewVocabBodySchema.parse(req.body);
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { nativeLanguage: true, targetLanguage: true, level: true },
        });
        if (!user)
            return reply.status(404).send({ ok: false, error: 'USER_NOT_FOUND' });
        const { word } = wordFields(body.word);
        const enriched = await enrichVocabViaGemini({
            nativeLanguage: user.nativeLanguage,
            targetLanguage: user.targetLanguage,
            level: user.level,
            word,
        });
        return PreviewVocabResponseSchema.parse({
            translation: enriched.translation ?? null,
            examples: (enriched.examples ?? []).slice(0, 3),
        });
    });
};
