import { prisma } from '@vocabxpert/db';

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      targetLanguage: true,
      level: true,
      activeLearningLanguageId: true,
      lists: {
        select: {
          id: true,
          learningLanguageId: true,
        },
      },
    },
  });

  let usersProcessed = 0;
  let listsLinked = 0;

  for (const user of users) {
    /**
     * Cria o idioma atual do usuário na nova tabela.
     *
     * O upsert torna o script seguro para ser executado novamente:
     * caso o idioma já exista, ele só atualiza o nível.
     */
    const learningLanguage = await prisma.userLearningLanguage.upsert({
      where: {
        userId_language: {
          userId: user.id,
          language: user.targetLanguage,
        },
      },
      update: {
        level: user.level,
      },
      create: {
        userId: user.id,
        language: user.targetLanguage,
        level: user.level,
      },
      select: {
        id: true,
        language: true,
        level: true,
      },
    });

    /**
     * Define o idioma legado como idioma ativo apenas se o usuário
     * ainda não possuir um idioma ativo.
     */
    if (!user.activeLearningLanguageId) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          activeLearningLanguageId: learningLanguage.id,
        },
      });
    }

    /**
     * Todas as listas existentes pertencem ao único idioma que o
     * usuário tinha antes de adicionarmos suporte a múltiplos idiomas.
     */
    const unlinkedListIds = user.lists
      .filter((list) => !list.learningLanguageId)
      .map((list) => list.id);

    if (unlinkedListIds.length > 0) {
      const result = await prisma.vocabList.updateMany({
        where: {
          id: {
            in: unlinkedListIds,
          },
          userId: user.id,
        },
        data: {
          learningLanguageId: learningLanguage.id,
        },
      });

      listsLinked += result.count;
    }

    usersProcessed += 1;

    console.info(
      `[migrate-languages] Usuário ${user.id}: ` +
        `${learningLanguage.language} (${learningLanguage.level})`
    );
  }

  console.info('\nMigração concluída:');
  console.info(`- Usuários processados: ${usersProcessed}`);
  console.info(`- Listas vinculadas: ${listsLinked}`);
}

main()
  .catch((error) => {
    console.error('[migrate-languages] Falha:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });