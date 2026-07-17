import { Prisma, prisma, PrismaClient } from "@vocabxpert/db";

type Outcome = "KNOWN" | "UNKNOWN";

/**
 * Algoritmo estilo SM-2 simplificado (produção-friendly):
 * - UNKNOWN: reseta streak, reduz ease, intervalo curto
 * - KNOWN: aumenta reps/streak, ajusta intervalo, ease sobe levemente
 */

type DbClient = PrismaClient | Prisma.TransactionClient;

export async function applyReviewToProgress(input: {
  userId: string;
  vocabId: string;
  outcome: Outcome;
  reviewedAt?: Date;
  prisma?: DbClient; // ✅ novo 
}) {
  const now = input.reviewedAt ?? new Date();
  const db = input.prisma || prisma;

  const current = await db.vocabProgress.upsert({
    where: { userId_vocabId: { userId: input.userId, vocabId: input.vocabId } },
    create: {
      userId: input.userId,
      vocabId: input.vocabId,
      lastOutcome: input.outcome,
      lastReviewedAt: now,
      nextDueAt: now, // será ajustado abaixo
    },
    update: {},
    select: {
      id: true,
      ease: true,
      interval: true,
      repetitions: true,
      streak: true,
    },
  });

  let ease = current.ease;
  let interval = current.interval;
  let repetitions = current.repetitions;
  let streak = current.streak;

  if (input.outcome === "UNKNOWN") {
    streak = 0;
    repetitions = Math.max(0, repetitions - 1);
    ease = Math.max(1.3, ease - 0.2);
    interval = 1; // 1 dia (pode virar horas depois se quiser granularidade)
  } else {
    streak += 1;
    repetitions += 1;
    ease = Math.min(3.0, ease + 0.05);

    if (repetitions <= 1) interval = 1;
    else if (repetitions === 2) interval = 3;
    else interval = Math.round(interval * ease);
  }

  const nextDueAt = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

  await db.vocabProgress.update({
    where: { id: current.id },
    data: {
      ease,
      interval,
      repetitions,
      streak,
      lastOutcome: input.outcome,
      lastReviewedAt: now,
      nextDueAt,
    },
  });

  return { ease, interval, repetitions, streak, nextDueAt };
}