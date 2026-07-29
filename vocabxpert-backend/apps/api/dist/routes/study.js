// apps/api/src/routes/study.ts
import { prisma } from "@vocabxpert/db";
import { CreateStudySessionBodySchema, CreateStudySessionResponseSchema, StudyExerciseSchema, SubmitAttemptBodySchema, SubmitAttemptResponseSchema, } from "../http/study.js";
import { selectVocabIds } from "../services/study/selectVocabs.js";
import { evaluateExerciseViaGemini } from "../services/ai/evaluateExercise.gemini.js"; // ✅ Importar EvaluationResult
import { applyReviewToProgress } from "../services/srs/updateProgress.js";
import { StudyStatsQuerySchema, StudyStatsResponseSchema } from "../http/studyStats.js";
import { evaluateExerciseDeterministic } from "../services/study/evaluateExercise.deterministic.js";
import { validateAttemptResponse } from "../services/study/validateAttemptResponse.js";
import { ZodError } from "zod";
import { createNextExerciseForSession } from "../services/study/nextExercise.js";
let studyConfigCache = null;
const STUDY_CONFIG_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos de TTL (Time To Live)
let studyConfigCacheTimestamp = 0;
export const studyRoutes = async (app) => {
    // Config para a tela “Testar conhecimento”
    app.get("/study/config", async () => {
        const now = Date.now();
        // ✅ Verificar se o cache é válido
        if (studyConfigCache && (now - studyConfigCacheTimestamp < STUDY_CONFIG_CACHE_TTL_MS)) {
            console.info("Serving /study/config from cache.");
            return studyConfigCache;
        }
        console.info("Generating /study/config and caching it.");
        const config = {
            exerciseTypes: [
                "RANDOM",
                "MULTIPLE_CHOICE_TRANSLATION",
                "CREATE_SENTENCE",
                "CLOZE",
                "FLASHCARD",
                "MATCH",
                "DICTATION",
                "CHOOSE_CORRECT_EXAMPLE",
                "WORD_ORDER",
            ],
            scopes: ["LAST_10", "ALL", "DUE"],
            defaults: { exerciseType: "RANDOM", scope: "DUE", limit: 10, direction: "WORD_TO_TRANSLATION" },
        };
        // ✅ Armazenar no cache
        studyConfigCache = config;
        studyConfigCacheTimestamp = now;
        return config;
    });
    // Criar sessão
    app.post("/study/session", async (req, reply) => {
        const body = CreateStudySessionBodySchema.parse(req.body);
        const list = await prisma.vocabList.findFirst({
            where: { id: body.listId, userId: req.userId },
            select: { id: true },
        });
        if (!list)
            return reply.status(404).send({ ok: false, error: "LIST_NOT_FOUND" });
        const vocabIds = await selectVocabIds({
            userId: req.userId,
            listId: body.listId,
            scope: body.scope,
            limit: body.limit,
        });
        const session = await prisma.studySession.create({
            data: {
                userId: req.userId,
                listId: body.listId,
                exerciseType: body.exerciseType,
                enabledExerciseTypes: body.enabledExerciseTypes,
                scope: body.scope,
                limit: body.limit,
                direction: body.direction,
                currentIndex: 0,
                vocabIds: vocabIds,
            },
            select: { id: true },
        });
        const r = await createNextExerciseForSession({ sessionId: session.id, userId: req.userId });
        let firstExercise = null;
        if (r.kind === "OK" && r.exercise) {
            firstExercise = StudyExerciseSchema.parse(r.exercise);
        }
        else if (r.kind === "NOT_FOUND") {
            return reply.status(500).send({ ok: false, error: "SESSION_NOT_FOUND_AFTER_CREATION" });
        }
        return CreateStudySessionResponseSchema.parse({
            sessionId: session.id,
            firstExercise: firstExercise,
        });
    });
    // Obter detalhes de uma sessão de estudo
    app.get("/study/sessions/:sessionId", async (req, reply) => {
        const { sessionId } = req.params;
        const session = await prisma.studySession.findFirst({
            where: { id: sessionId, userId: req.userId },
            select: {
                id: true,
                listId: true,
                exerciseType: true,
                enabledExerciseTypes: true,
                direction: true,
                vocabIds: true,
                currentIndex: true,
                finishedAt: true,
                scope: true,
                limit: true,
            },
        });
        if (!session)
            return reply.status(404).send({ ok: false, error: "SESSION_NOT_FOUND" });
        console.info({ sessionId: session.id, finishedAt: session.finishedAt }, "GET /study/sessions/:sessionId returned.");
        return { ok: true, session };
    });
    // Próximo exercício da sessão
    app.get("/study/sessions/:sessionId/next", async (req, reply) => {
        const { sessionId } = req.params;
        const r = await createNextExerciseForSession({ sessionId, userId: req.userId });
        if (r.kind === "NOT_FOUND")
            return reply.status(404).send({ ok: false, error: "SESSION_NOT_FOUND" });
        return { ok: true, sessionId, exercise: r.exercise };
    });
    // Finalizar sessão manualmente
    app.post("/study/sessions/:sessionId/finish", async (req, reply) => {
        const { sessionId } = req.params;
        const session = await prisma.studySession.findFirst({
            where: { id: sessionId, userId: req.userId },
            select: { id: true },
        });
        if (!session)
            return reply.status(404).send({ ok: false, error: "SESSION_NOT_FOUND" });
        await prisma.studySession.update({
            where: { id: sessionId },
            data: { finishedAt: new Date() },
        });
        return { ok: true };
    });
    // Tentativa + avaliação IA em tempo real + review + progress
    app.post("/study/exercises/:exerciseId/attempt", async (req, reply) => {
        try {
            const { exerciseId } = req.params;
            const body = SubmitAttemptBodySchema.parse(req.body);
            const exercise = await prisma.studyExercise.findFirst({
                where: { id: exerciseId, userId: req.userId },
                select: {
                    id: true,
                    vocabId: true,
                    type: true,
                    payload: true,
                    vocab: { select: { word: true, translation: true } },
                    session: { select: { direction: true } },
                },
            });
            if (!exercise)
                return reply.status(404).send({ ok: false, error: "EXERCISE_NOT_FOUND" });
            let responseValidated;
            try {
                responseValidated = validateAttemptResponse({ exerciseType: exercise.type, response: body.response });
            }
            catch (e) {
                if (e instanceof ZodError) {
                    return reply.status(400).send({
                        ok: false,
                        error: "INVALID_RESPONSE_SHAPE",
                        issues: e.issues,
                        exerciseType: exercise.type,
                    });
                }
                throw e;
            }
            const user = await prisma.user.findUnique({
                where: { id: req.userId },
                select: { nativeLanguage: true, targetLanguage: true },
            });
            if (!user)
                return reply.status(404).send({ ok: false, error: "USER_NOT_FOUND" });
            const expected = {
                word: exercise.vocab.word,
                translation: exercise.vocab.translation,
                payload: exercise.payload,
            };
            const direction = (exercise.session?.direction ?? "WORD_TO_TRANSLATION");
            // ✅ Usar o tipo EvaluationResult para 'ai'
            let ai;
            let evaluator = "DETERMINISTIC";
            // Avaliação determinística para tipos de exercício específicos
            const deterministicResult = evaluateExerciseDeterministic({
                type: exercise.type,
                payload: exercise.payload,
                userResponse: responseValidated,
                expected,
                direction,
            });
            if (deterministicResult) {
                ai = deterministicResult;
            }
            else if (exercise.type === "CREATE_SENTENCE") {
                ai = await evaluateExerciseViaGemini({
                    nativeLanguage: user.nativeLanguage,
                    targetLanguage: user.targetLanguage,
                    exerciseType: exercise.type,
                    exercisePayload: exercise.payload,
                    userResponse: responseValidated,
                    expected,
                });
                evaluator = "GEMINI";
            }
            else {
                console.error({ exerciseType: exercise.type }, "Deterministic evaluator missing for objective exercise type"); // ✅ Alterado para console.error
                return reply.status(500).send({ ok: false, error: "DETERMINISTIC_EVALUATOR_MISSING" });
            }
            console.info({ exerciseType: exercise.type }, "attempt: starting transaction"); // ✅ Alterado para console.info
            // ✅ Calcular o outcome com base no verdict
            const outcome = ai.verdict === "CORRECT" ? "KNOWN" : "UNKNOWN";
            const { attempt, review, progress } = await prisma.$transaction(async (tx) => {
                const attempt = await tx.studyAttempt.create({
                    data: {
                        exerciseId: exercise.id,
                        userId: req.userId,
                        response: responseValidated,
                        outcome: outcome, // ✅ AGORA SIM, usando a variável 'outcome' calculada
                        aiScore: ai.score,
                        aiFeedback: ai.feedback,
                        aiVerdict: ai.verdict,
                        aiModel: ai.aiModel,
                        aiLatencyMs: ai.latencyMs,
                    },
                    select: { id: true, outcome: true },
                });
                const review = await tx.vocabReview.create({
                    data: { userId: req.userId, vocabId: exercise.vocabId, outcome: attempt.outcome },
                    select: { id: true },
                });
                const progress = await applyReviewToProgress({
                    userId: req.userId,
                    vocabId: exercise.vocabId,
                    outcome: attempt.outcome,
                    prisma: tx,
                });
                return { attempt, review, progress };
            });
            return SubmitAttemptResponseSchema.parse({
                ok: true,
                attemptId: attempt.id,
                reviewId: review.id,
                outcome: attempt.outcome,
                verdict: ai.verdict,
                score: ai.score,
                feedback: ai.feedback,
                nextDueAt: progress.nextDueAt.toISOString(),
                evaluator,
                aiModel: ai.aiModel,
                latencyMs: ai.latencyMs,
            });
        }
        catch (err) {
            console.error({ err }, "attempt: failed"); // ✅ Alterado para console.error
            return reply.status(500).send({
                ok: false,
                error: "INTERNAL_SERVER_ERROR",
                message: err instanceof Error ? err.message : String(err),
                stack: err instanceof Error ? err.stack : undefined,
            });
        }
    });
    app.get("/study/stats", async (req, reply) => {
        const q = StudyStatsQuerySchema.parse(req.query);
        const list = await prisma.vocabList.findFirst({
            where: { id: q.listId, userId: req.userId },
            select: { id: true },
        });
        if (!list)
            return reply.status(404).send({ ok: false, error: "LIST_NOT_FOUND" });
        const vocabs = await prisma.vocab.findMany({
            where: { userId: req.userId, listId: q.listId },
            select: { id: true },
        });
        const vocabIds = vocabs.map((v) => v.id);
        const totalVocabs = vocabIds.length;
        if (totalVocabs === 0) {
            return StudyStatsResponseSchema.parse({
                listId: q.listId,
                totalVocabs: 0,
                reviewedVocabs: 0,
                neverReviewedVocabs: 0,
                dueNowVocabs: 0,
                reviewsInWindow: 0,
                knownInWindow: 0,
                unknownInWindow: 0,
            });
        }
        const reviewedDistinct = await prisma.vocabReview.findMany({
            where: { userId: req.userId, vocabId: { in: vocabIds } },
            distinct: ["vocabId"],
            select: { vocabId: true },
        });
        const reviewedVocabs = reviewedDistinct.length;
        const neverReviewedVocabs = Math.max(0, totalVocabs - reviewedVocabs);
        const now = new Date();
        const dueNowVocabs = await prisma.vocabProgress.count({
            where: {
                userId: req.userId,
                vocabId: { in: vocabIds },
                nextDueAt: { lte: now },
            },
        });
        const since = new Date(Date.now() - q.windowDays * 24 * 60 * 60 * 1000);
        const grouped = await prisma.vocabReview.groupBy({
            by: ["outcome"],
            where: {
                userId: req.userId,
                vocabId: { in: vocabIds },
                createdAt: { gte: since },
            },
            _count: { _all: true },
        });
        const knownInWindow = grouped.find((g) => g.outcome === "KNOWN")?._count._all ?? 0;
        const unknownInWindow = grouped.find((g) => g.outcome === "UNKNOWN")?._count._all ?? 0;
        const reviewsInWindow = knownInWindow + unknownInWindow;
        return StudyStatsResponseSchema.parse({
            listId: q.listId,
            totalVocabs,
            reviewedVocabs,
            neverReviewedVocabs,
            dueNowVocabs,
            reviewsInWindow,
            knownInWindow,
            unknownInWindow,
        });
    });
};
