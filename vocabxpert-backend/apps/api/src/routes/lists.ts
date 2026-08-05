import type { FastifyPluginAsync } from "fastify";
import { prisma } from "@vocabxpert/db";
import {
  CreateListBodySchema,
  CreateListResponseSchema,
  GetListsResponseSchema,
  StudyListResponseSchema,
} from "../http/lists.js";
import { getActiveLearningLanguage } from "../lib/active-learning-language.js";

export const listsRoutes: FastifyPluginAsync = async (app) => {
  // GET /lists
  app.get("/lists", async (req, reply) => {
    const activeLanguage = await getActiveLearningLanguage(req.userId);

    if (!activeLanguage) {
      return reply.code(409).send({
        ok: false,
        error: "NO_ACTIVE_LEARNING_LANGUAGE",
      });
    }
    const items = await prisma.vocabList.findMany({
      where: { userId: req.userId, learningLanguageId: activeLanguage.id },
      orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
      select: { id: true, name: true, isDefault: true, createdAt: true },
    });

    return GetListsResponseSchema.parse({ items });
  });

  // POST /lists
  app.post("/lists", async (req, reply) => {
    const activeLanguage = await getActiveLearningLanguage(req.userId);

    if (!activeLanguage) {
      return reply.code(409).send({
        ok: false,
        error: "NO_ACTIVE_LEARNING_LANGUAGE",
      });
    }
    const body = CreateListBodySchema.parse(req.body);

    const created = await prisma.vocabList.create({
      data: { 
        userId: req.userId, 
        name: body.name, 
        isDefault: false, 
        learningLanguageId: activeLanguage.id 
      },
      select: { id: true, name: true, isDefault: true },
    });

    return CreateListResponseSchema.parse(created);
  });

  // GET /lists/:listId/vocabs
  app.get("/lists/:listId/vocabs", async (req, reply) => {
    const activeLanguage = await getActiveLearningLanguage(req.userId);

    if (!activeLanguage) {
      return reply.code(409).send({
        ok: false,
        error: "NO_ACTIVE_LEARNING_LANGUAGE",
      });
    }
    const { listId } = req.params as { listId: string };

    // ownership check (lista pertence ao user)
    const list = await prisma.vocabList.findFirst({
      where: { id: listId, userId: req.userId, learningLanguageId: activeLanguage.id },
      select: { id: true },
    });

    if (!list) {
      return reply.status(404).send({ ok: false, error: "LIST_NOT_FOUND" });
    }

    const items = await prisma.vocab.findMany({
  where: {
    listId,
    userId: req.userId,
  },
  orderBy: {
    createdAt: "desc",
  },
  select: {
    id: true,
    word: true,
    wordNormalized: true,
    translation: true,
    createdAt: true,
  },
});
    return { items };
  });

  
};