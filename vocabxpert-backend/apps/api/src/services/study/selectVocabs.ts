import { prisma } from "@vocabxpert/db";
import type { StudyScope } from "@vocabxpert/db";

export async function selectVocabIds(input: {
  userId: string;
  listId: string;
  scope: StudyScope;
  limit: number;
}) {
  if (input.scope === "LAST_10") {
    const vocabs = await prisma.vocab.findMany({
      where: { userId: input.userId, listId: input.listId },
      orderBy: { createdAt: "desc" },
      take: Math.min(10, input.limit),
      select: { id: true },
    });
    return vocabs.map((v: any) => v.id);
  }

  if (input.scope === "ALL") {
    const vocabs = await prisma.vocab.findMany({
      where: { userId: input.userId, listId: input.listId },
      orderBy: { createdAt: "desc" },
      take: input.limit,
      select: { id: true },
    });
    return vocabs.map((v: any) => v.id);
  }

  // DUE (produção): due = nextDueAt <= now + incluir sem progress (nunca estudados)
  const dueProgress = await prisma.vocabProgress.findMany({
    where: {
      userId: input.userId,
      nextDueAt: { lte: new Date() },
      vocab: { listId: input.listId },
    },
    orderBy: { nextDueAt: "asc" },
    take: input.limit,
    select: { vocabId: true },
  });

  const dueIds = dueProgress.map((p: any) => p.vocabId);
  const dueSet = new Set(dueIds);

  if (dueIds.length < input.limit) {
   const neverStudied = await prisma.vocab.findMany({
  where: {
    userId: input.userId,
    listId: input.listId,
    progresses: {
      none: {},
    },
  },
  orderBy: {
    createdAt: 'desc',
  },
  take: input.limit - dueIds.length,
  select: {
    id: true,
  },
});

    for (const v of neverStudied) {
      if (!dueSet.has(v.id)) dueIds.push(v.id);
    }
  }

  return dueIds;
}