import { prisma } from "@vocabxpert/db";
import { CreateReviewBodySchema, CreateReviewResponseSchema } from "../http/reviews.js";
import { applyReviewToProgress } from "../services/srs/updateProgress.js";
export const reviewsRoutes = async (app) => {
    app.post("/vocabs/:vocabId/reviews", async (req, reply) => {
        const { vocabId } = req.params;
        const body = CreateReviewBodySchema.parse(req.body);
        // ownership: vocab tem que ser do user
        const vocab = await prisma.vocab.findFirst({
            where: { id: vocabId, userId: req.userId },
            select: { id: true },
        });
        if (!vocab) {
            return reply.status(404).send({ ok: false, error: "VOCAB_NOT_FOUND" });
        }
        const review = await prisma.vocabReview.create({
            data: {
                userId: req.userId,
                vocabId,
                outcome: body.outcome,
            },
            select: { id: true },
        });
        await applyReviewToProgress({
            userId: req.userId,
            vocabId,
            outcome: body.outcome,
        });
        return CreateReviewResponseSchema.parse({ ok: true, reviewId: review.id });
    });
};
