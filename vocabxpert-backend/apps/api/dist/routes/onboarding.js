import { prisma } from "@vocabxpert/db";
import { OnboardingBodySchema, OnboardingResponseSchema } from "../http/onboarding.js";
import { generateInitialVocabsViaGemini } from "../services/ai/initialVocabs.gemini.js";
import { wordFields } from "../utils/wordFields.js";
const INITIAL_VOCABS_COUNT = 10;
export const onboardingRoutes = async (app) => {
    app.post("/onboarding", async (req, reply) => {
        const startedAt = Date.now();
        // 0) Parse + log de entrada
        const body = OnboardingBodySchema.parse(req.body);
        const interestNames = [...body.interests, ...body.customInterests]
            .map((s) => s.trim())
            .filter(Boolean);
        req.log.info({
            step: "ONBOARDING_START",
            nativeLanguage: body.nativeLanguage,
            targetLanguage: body.targetLanguage,
            level: body.level,
            interestCount: interestNames.length,
        }, "onboarding");
        // 1) DB transaction
        const dbStartedAt = Date.now();
        const { userId, defaultListId } = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email: null,
                    passwordHash: null,
                    nativeLanguage: body.nativeLanguage,
                    targetLanguage: body.targetLanguage,
                    level: body.level,
                    lists: { create: { name: "Lista Geral", isDefault: true } },
                },
                include: { lists: true },
            });
            if (interestNames.length > 0) {
                const interests = await Promise.all(interestNames.map((name) => tx.interest.upsert({
                    where: { name },
                    update: {},
                    create: { name },
                })));
                await tx.userInterest.createMany({
                    data: interests.map((i) => ({ userId: user.id, interestId: i.id })),
                    skipDuplicates: true,
                });
            }
            const defaultList = user.lists.find((l) => l.isDefault);
            if (!defaultList)
                throw new Error("DEFAULT_LIST_NOT_CREATED");
            return { userId: user.id, defaultListId: defaultList.id };
        });
        const seedInitialVocabs = body.seedInitialVocabs ?? true;
        if (seedInitialVocabs) {
            // comportamento atual: chama Gemini, salva 10 vocabs etc
            // ✅ mas trate 429 sem explodir a rota (você já faz log)
        }
        else {
            req.log.info({ step: "SKIP_INITIAL_VOCABS" }, "onboarding");
        }
        req.log.info({
            step: "DB_CREATED",
            userId,
            defaultListId,
            dbMs: Date.now() - dbStartedAt,
        }, "onboarding");
        // 2) Gemini + persist (best-effort)
        const geminiStartedAt = Date.now();
        try {
            req.log.info({
                step: "GEMINI_CALL_START",
                count: INITIAL_VOCABS_COUNT,
                hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
                model: process.env.GEMINI_MODEL, // ok logar o nome do modelo, não é segredo
            }, "onboarding");
            const aiVocabs = await generateInitialVocabsViaGemini({
                nativeLanguage: body.nativeLanguage,
                targetLanguage: body.targetLanguage,
                level: body.level,
                interests: interestNames,
                count: INITIAL_VOCABS_COUNT,
            });
            req.log.info({
                step: "GEMINI_CALL_OK",
                items: aiVocabs.length,
                geminiMs: Date.now() - geminiStartedAt,
            }, "onboarding");
            const saveStartedAt = Date.now();
            await prisma.$transaction(async (tx) => {
                for (const item of aiVocabs) {
                    const { word, wordNormalized } = wordFields(item.word);
                    await tx.vocab.create({
                        data: {
                            userId,
                            listId: defaultListId,
                            word,
                            wordNormalized,
                            translation: item.translation,
                            examples: {
                                create: item.examples.map((text) => ({ text })),
                            },
                        },
                    });
                }
            });
            req.log.info({
                step: "VOCABS_SAVED",
                items: aiVocabs.length,
                saveMs: Date.now() - saveStartedAt,
            }, "onboarding");
        }
        catch (err) {
            req.log.error({
                step: "GEMINI_FAILED_TO_GENERATE_INITIAL_VOCABS",
                err,
                geminiMs: Date.now() - geminiStartedAt,
            }, "onboarding");
        }
        const payload = { userId, defaultListId };
        OnboardingResponseSchema.parse(payload);
        req.log.info({ step: "ONBOARDING_DONE", totalMs: Date.now() - startedAt, userId, defaultListId }, "onboarding");
        return reply.send(payload);
    });
};
