import { prisma } from "@vocabxpert/db";
import { enrichVocabViaGemini } from "../ai/enrichVocab.gemini.js";
export async function ensureVocabEnriched(input) {
    const vocab = await prisma.vocab.findFirst({
        where: { id: input.vocabId, userId: input.userId },
        select: {
            id: true,
            word: true,
            translation: true,
            examples: { select: { id: true, text: true } },
        },
    });
    if (!vocab)
        throw new Error("VOCAB_NOT_FOUND");
    const needsTranslation = !vocab.translation;
    const needsExamples = vocab.examples.length < 3;
    if (!needsTranslation && !needsExamples)
        return { enriched: false };
    const enriched = await enrichVocabViaGemini({
        nativeLanguage: input.nativeLanguage,
        targetLanguage: input.targetLanguage,
        word: vocab.word,
        level: input.level
    });
    await prisma.$transaction(async (tx) => {
        if (!vocab.translation) {
            await tx.vocab.update({
                where: { id: vocab.id },
                data: { translation: enriched.translation },
            });
        }
        const existingTexts = new Set(vocab.examples.map((e) => e.text.trim().toLowerCase()));
        const toCreate = enriched.examples
            .map((t) => t.trim())
            .filter((t) => t.length > 0)
            .filter((t) => !existingTexts.has(t.toLowerCase()))
            .slice(0, Math.max(0, 3 - vocab.examples.length));
        if (toCreate.length) {
            await tx.vocabExample.createMany({
                data: toCreate.map((text) => ({ vocabId: vocab.id, text })),
            });
        }
    });
    return { enriched: true };
}
