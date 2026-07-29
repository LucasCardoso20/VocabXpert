import { prisma } from "@vocabxpert/db";
import { CreateListBodySchema, CreateListResponseSchema, GetListsResponseSchema, } from "../http/lists.js";
export const listsRoutes = async (app) => {
    // GET /lists
    app.get("/lists", async (req) => {
        const items = await prisma.vocabList.findMany({
            where: { userId: req.userId },
            orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
            select: { id: true, name: true, isDefault: true, createdAt: true },
        });
        return GetListsResponseSchema.parse({ items });
    });
    // POST /lists
    app.post("/lists", async (req) => {
        const body = CreateListBodySchema.parse(req.body);
        const created = await prisma.vocabList.create({
            data: { userId: req.userId, name: body.name, isDefault: false },
            select: { id: true, name: true, isDefault: true },
        });
        return CreateListResponseSchema.parse(created);
    });
    // GET /lists/:listId/vocabs
    app.get("/lists/:listId/vocabs", async (req, reply) => {
        const { listId } = req.params;
        // ownership check (lista pertence ao user)
        const list = await prisma.vocabList.findFirst({
            where: { id: listId, userId: req.userId },
            select: { id: true },
        });
        if (!list) {
            return reply.status(404).send({ ok: false, error: "LIST_NOT_FOUND" });
        }
        const items = await prisma.vocab.findMany({
            where: { listId, userId: req.userId },
            orderBy: { createdAt: "desc" },
            select: { id: true, word: true, wordNormalized: true, translation: true, createdAt: true },
        });
        return { items };
    });
};
