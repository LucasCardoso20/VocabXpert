import type { FastifyPluginAsync } from "fastify";
import { prisma } from "@vocabxpert/db";

import {
  createLearningLanguageBodySchema,
  updateInterestsBodySchema,
  updateLearningLanguageBodySchema,
  updateProfileBodySchema,
} from "../http/profile.js";

type LanguageParams = {
  languageId: string;
};

export const profileRoutes: FastifyPluginAsync = async (app) => {
  /**
   * GET /profile
   *
   * Retorna tudo que o app precisa para:
   * - header;
   * - seletor de idioma;
   * - tela Perfil e preferências.
   */
  app.get("/profile", async (req, reply) => {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
      select: {
        id: true,
        displayName: true,
        email: true,
        nativeLanguage: true,
        activeLearningLanguageId: true,
        createdAt: true,
        updatedAt: true,

        interests: {
          orderBy: {
            interest: {
              name: "asc",
            },
          },
          select: {
            interest: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },

        learningLanguages: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            language: true,
            level: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: {
                lists: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return reply.code(404).send({
        ok: false,
        error: "USER_NOT_FOUND",
      });
    }

    return reply.send({
      ok: true,
      profile: {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        nativeLanguage: user.nativeLanguage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,

        activeLanguageId: user.activeLearningLanguageId,

        interests: user.interests.map(({ interest }) => interest),

        languages: user.learningLanguages.map((language) => ({
          id: language.id,
          language: language.language,
          level: language.level,
          isActive: language.id === user.activeLearningLanguageId,
          listCount: language._count.lists,
          createdAt: language.createdAt,
          updatedAt: language.updatedAt,
        })),
      },
    });
  });

  /**
   * PATCH /profile
   *
   * Edita nome exibido e/ou idioma nativo.
   */
  app.patch("/profile", async (req, reply) => {
    const body = updateProfileBodySchema.parse(req.body);

    const exists = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
      select: {
        id: true,
      },
    });

    if (!exists) {
      return reply.code(404).send({
        ok: false,
        error: "USER_NOT_FOUND",
      });
    }

    const user = await prisma.user.update({
      where: {
        id: req.userId,
      },
      data: {
        ...(body.displayName !== undefined
          ? { displayName: body.displayName }
          : {}),

        ...(body.nativeLanguage !== undefined
          ? { nativeLanguage: body.nativeLanguage }
          : {}),
      },
      select: {
        id: true,
        displayName: true,
        nativeLanguage: true,
        updatedAt: true,
      },
    });

    return reply.send({
      ok: true,
      profile: user,
    });
  });

  /**
   * POST /profile/languages
   *
   * Cria um idioma de estudo e uma Lista Geral exclusiva para ele.
   */
  app.post("/profile/languages", async (req, reply) => {
    const body = createLearningLanguageBodySchema.parse(req.body);

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          id: req.userId,
        },
        select: {
          id: true,
          activeLearningLanguageId: true,
        },
      });

      if (!user) {
        return {
          type: "USER_NOT_FOUND" as const,
        };
      }

      const existing = await tx.userLearningLanguage.findUnique({
        where: {
          userId_language: {
            userId: req.userId,
            language: body.language,
          },
        },
        select: {
          id: true,
        },
      });

      if (existing) {
        return {
          type: "LANGUAGE_ALREADY_EXISTS" as const,
          languageId: existing.id,
        };
      }

      const learningLanguage = await tx.userLearningLanguage.create({
        data: {
          userId: req.userId,
          language: body.language,
          level: body.level,
        },
        select: {
          id: true,
          language: true,
          level: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      const defaultList = await tx.vocabList.create({
        data: {
          userId: req.userId,
          learningLanguageId: learningLanguage.id,
          name: "Lista Geral",
          isDefault: true,
        },
        select: {
          id: true,
          name: true,
          isDefault: true,
        },
      });

      const shouldActivate =
        body.makeActive || !user.activeLearningLanguageId;

      if (shouldActivate) {
        await tx.user.update({
          where: {
            id: req.userId,
          },
          data: {
            activeLearningLanguageId: learningLanguage.id,

            // Compatibilidade temporária com código legado.
            targetLanguage: learningLanguage.language,
            level: learningLanguage.level,
          },
        });
      }

      return {
        type: "SUCCESS" as const,
        language: {
          ...learningLanguage,
          isActive: shouldActivate,
          lists: [defaultList],
        },
      };
    });

    if (result.type === "USER_NOT_FOUND") {
      return reply.code(404).send({
        ok: false,
        error: "USER_NOT_FOUND",
      });
    }

    if (result.type === "LANGUAGE_ALREADY_EXISTS") {
      return reply.code(409).send({
        ok: false,
        error: "LANGUAGE_ALREADY_EXISTS",
        languageId: result.languageId,
      });
    }

    return reply.code(201).send({
      ok: true,
      language: result.language,
    });
  });

  /**
   * PATCH /profile/languages/:languageId
   *
   * Altera o nível de um idioma que pertence ao usuário.
   */
  app.patch<{ Params: LanguageParams }>(
    "/profile/languages/:languageId",
    async (req, reply) => {
      const body = updateLearningLanguageBodySchema.parse(req.body);
      const { languageId } = req.params;

      const result = await prisma.$transaction(async (tx) => {
        const language = await tx.userLearningLanguage.findFirst({
          where: {
            id: languageId,
            userId: req.userId,
          },
          select: {
            id: true,
            language: true,
          },
        });

        if (!language) {
          return null;
        }

        const updatedLanguage = await tx.userLearningLanguage.update({
          where: {
            id: languageId,
          },
          data: {
            level: body.level,
          },
          select: {
            id: true,
            language: true,
            level: true,
            updatedAt: true,
          },
        });

        const user = await tx.user.findUnique({
          where: {
            id: req.userId,
          },
          select: {
            activeLearningLanguageId: true,
          },
        });

        // Mantém os campos legados sincronizados apenas se o idioma editado
        // for o idioma atualmente ativo.
        if (user?.activeLearningLanguageId === languageId) {
          await tx.user.update({
            where: {
              id: req.userId,
            },
            data: {
              level: body.level,
            },
          });
        }

        return updatedLanguage;
      });

      if (!result) {
        return reply.code(404).send({
          ok: false,
          error: "LEARNING_LANGUAGE_NOT_FOUND",
        });
      }

      return reply.send({
        ok: true,
        language: result,
      });
    }
  );

  /**
   * POST /profile/languages/:languageId/activate
   *
   * Troca o idioma em contexto no app.
   */
  app.post<{ Params: LanguageParams }>(
    "/profile/languages/:languageId/activate",
    async (req, reply) => {
      const { languageId } = req.params;

      const language = await prisma.userLearningLanguage.findFirst({
        where: {
          id: languageId,
          userId: req.userId,
        },
        select: {
          id: true,
          language: true,
          level: true,
        },
      });

      if (!language) {
        return reply.code(404).send({
          ok: false,
          error: "LEARNING_LANGUAGE_NOT_FOUND",
        });
      }

      await prisma.user.update({
        where: {
          id: req.userId,
        },
        data: {
          activeLearningLanguageId: language.id,

          // Compatibilidade temporária com serviços que ainda leem User.
          targetLanguage: language.language,
          level: language.level,
        },
      });

      return reply.send({
        ok: true,
        activeLanguage: {
          ...language,
          isActive: true,
        },
      });
    }
  );

  /**
   * PUT /profile/interests
   *
   * Substitui todos os interesses do usuário.
   * Uma lista vazia é permitida: interesses podem ser removidos.
   */
  app.put("/profile/interests", async (req, reply) => {
    const body = updateInterestsBodySchema.parse(req.body);

    const interestNames = [
      ...new Set(
        body.interests
          .map((interest) => interest.trim())
          .filter(Boolean)
      ),
    ];

    const interests = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          id: req.userId,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        return null;
      }

      const savedInterests = await Promise.all(
        interestNames.map((name) =>
          tx.interest.upsert({
            where: {
              name,
            },
            update: {},
            create: {
              name,
            },
            select: {
              id: true,
              name: true,
            },
          })
        )
      );

      await tx.userInterest.deleteMany({
        where: {
          userId: req.userId,
        },
      });

      if (savedInterests.length > 0) {
        await tx.userInterest.createMany({
          data: savedInterests.map((interest) => ({
            userId: req.userId,
            interestId: interest.id,
          })),
          skipDuplicates: true,
        });
      }

      return savedInterests;
    });

    if (!interests) {
      return reply.code(404).send({
        ok: false,
        error: "USER_NOT_FOUND",
      });
    }

    return reply.send({
      ok: true,
      interests,
    });
  });

  app.delete<{ Params: LanguageParams }>(
  "/profile/languages/:languageId",
  async (req, reply) => {
    const { languageId } = req.params;

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          id: req.userId,
        },
        select: {
          id: true,
          activeLearningLanguageId: true,
          learningLanguages: {
            orderBy: {
              createdAt: "asc",
            },
            select: {
              id: true,
              language: true,
              level: true,
            },
          },
        },
      });

      if (!user) {
        return {
          type: "USER_NOT_FOUND" as const,
        };
      }

      const languageToDelete = user.learningLanguages.find(
        (language) => language.id === languageId
      );

      if (!languageToDelete) {
        return {
          type: "LEARNING_LANGUAGE_NOT_FOUND" as const,
        };
      }

      if (user.learningLanguages.length <= 1) {
        return {
          type: "CANNOT_DELETE_LAST_LANGUAGE" as const,
        };
      }

      const nextActiveLanguage = user.learningLanguages.find(
        (language) => language.id !== languageId
      );

      const deletingActiveLanguage =
        user.activeLearningLanguageId === languageId;

      /**
       * As listas dependem do idioma. Apagamos primeiro para respeitar
       * as chaves estrangeiras, caso a relation não use cascade.
       */
      await tx.vocabList.deleteMany({
        where: {
          userId: req.userId,
          learningLanguageId: languageId,
        },
      });

      await tx.userLearningLanguage.delete({
        where: {
          id: languageId,
        },
      });

      if (deletingActiveLanguage && nextActiveLanguage) {
        await tx.user.update({
          where: {
            id: req.userId,
          },
          data: {
            activeLearningLanguageId: nextActiveLanguage.id,

            // Compatibilidade com fluxos legados.
            targetLanguage: nextActiveLanguage.language,
            level: nextActiveLanguage.level,
          },
        });
      }

      return {
        type: "SUCCESS" as const,
        deletedLanguage: {
          id: languageToDelete.id,
          language: languageToDelete.language,
        },
        activeLanguageId: deletingActiveLanguage
          ? nextActiveLanguage?.id ?? null
          : user.activeLearningLanguageId,
      };
    });

    if (result.type === "USER_NOT_FOUND") {
      return reply.code(404).send({
        ok: false,
        error: "USER_NOT_FOUND",
      });
    }

    if (result.type === "LEARNING_LANGUAGE_NOT_FOUND") {
      return reply.code(404).send({
        ok: false,
        error: "LEARNING_LANGUAGE_NOT_FOUND",
      });
    }

    if (result.type === "CANNOT_DELETE_LAST_LANGUAGE") {
      return reply.code(409).send({
        ok: false,
        error: "CANNOT_DELETE_LAST_LEARNING_LANGUAGE",
      });
    }

    return reply.send({
      ok: true,
      deletedLanguage: result.deletedLanguage,
      activeLanguageId: result.activeLanguageId,
    });
  }
);
};