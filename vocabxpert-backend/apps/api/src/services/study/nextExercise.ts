// apps/api/src/services/study/nextExercise.ts

import { ExerciseType, Prisma, prisma } from "@vocabxpert/db";
import { generateExercise, type GeneratedExercise } from "./generateExercise.js";

function parseVocabIds(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

function normalizeDirection(v: unknown) {
  return v === "TRANSLATION_TO_WORD" ? "TRANSLATION_TO_WORD" : "WORD_TO_TRANSLATION";
}

export async function createNextExerciseForSession(input: { sessionId: string; userId: string }) {
  const session = await prisma.studySession.findFirst({
    where: { id: input.sessionId, userId: input.userId },
    select: {
      id: true,
      listId: true,
      exerciseType: true,
      enabledExerciseTypes: true,
      direction: true,
      vocabIds: true,
      currentIndex: true,
      finishedAt: true,
    },
  });

  if (!session) return { kind: "NOT_FOUND" as const };

  const user = await prisma.user.findUnique({
  where: { id: input.userId },
  select: {
    targetLanguage: true,
  },
});

if (!user) {
  throw new Error("USER_NOT_FOUND");
}

  if (session.finishedAt) {
    console.info({ sessionId: session.id, finishedAt: session.finishedAt }, "Session already finished."); // ✅ Log
    return { kind: "DONE" as const, exercise: null };
  }

  const vocabIds = parseVocabIds(session.vocabIds);

  if (session.currentIndex >= vocabIds.length) {
    const now = new Date();
    const updatedSession = await prisma.studySession.update({
      where: { id: session.id },
      data: { finishedAt: now },
    });
    console.info({ sessionId: session.id, finishedAt: updatedSession.finishedAt }, "Session marked as finished."); // ✅ Log
    return { kind: "DONE" as const, exercise: null };
  }

  const vocabId = vocabIds[session.currentIndex];

  const gen: GeneratedExercise = await generateExercise({
  userId: input.userId,
  listId: session.listId,
  vocabId,
  exerciseType: session.exerciseType as ExerciseType,
  direction: normalizeDirection(session.direction),
  enabledExerciseTypes: session.enabledExerciseTypes as any,
  targetLanguage: user.targetLanguage,
});

  const exercise = await prisma.studyExercise.create({
    data: {
      sessionId: session.id,
      userId: input.userId,
      vocabId,
      type: gen.type,
      payload: gen.payload as any,
    },
    select: {
      id: true,
      sessionId: true,
      userId: true,
      vocabId: true,
      type: true,
      payload: true,
      createdAt: true,
    },
  });

  await prisma.studySession.update({
    where: { id: session.id },
    data: { currentIndex: { increment: 1 } },
  });

  return { kind: "OK" as const, exercise };
}