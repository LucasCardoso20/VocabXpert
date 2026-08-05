import { prisma } from "@vocabxpert/db";

export async function getActiveLearningLanguage(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      activeLearningLanguageId: true,
      activeLearningLanguage: {
        select: {
          id: true,
          language: true,
          level: true,
        },
      },
    },
  });

  if (!user?.activeLearningLanguageId || !user.activeLearningLanguage) {
    return null;
  }

  return user.activeLearningLanguage;
}