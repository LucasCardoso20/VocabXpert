-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('RANDOM', 'MULTIPLE_CHOICE_TRANSLATION', 'CREATE_SENTENCE', 'CLOZE', 'FLASHCARD', 'MATCH', 'DICTATION', 'CHOOSE_CORRECT_EXAMPLE', 'WORD_ORDER');

-- CreateEnum
CREATE TYPE "StudyScope" AS ENUM ('LAST_10', 'ALL', 'DUE');

-- CreateTable
CREATE TABLE "StudySession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "exerciseType" "ExerciseType" NOT NULL DEFAULT 'RANDOM',
    "scope" "StudyScope" NOT NULL DEFAULT 'DUE',
    "limit" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "StudySession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyExercise" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vocabId" TEXT NOT NULL,
    "type" "ExerciseType" NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudyExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyAttempt" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "response" JSONB NOT NULL,
    "outcome" "ReviewOutcome" NOT NULL,
    "aiScore" DOUBLE PRECISION,
    "aiFeedback" TEXT,
    "aiVerdict" TEXT,
    "aiModel" TEXT,
    "aiLatencyMs" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudyAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StudySession_userId_createdAt_idx" ON "StudySession"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "StudySession_listId_createdAt_idx" ON "StudySession"("listId", "createdAt");

-- CreateIndex
CREATE INDEX "StudyExercise_sessionId_createdAt_idx" ON "StudyExercise"("sessionId", "createdAt");

-- CreateIndex
CREATE INDEX "StudyExercise_userId_createdAt_idx" ON "StudyExercise"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "StudyExercise_vocabId_createdAt_idx" ON "StudyExercise"("vocabId", "createdAt");

-- CreateIndex
CREATE INDEX "StudyAttempt_exerciseId_createdAt_idx" ON "StudyAttempt"("exerciseId", "createdAt");

-- CreateIndex
CREATE INDEX "StudyAttempt_userId_createdAt_idx" ON "StudyAttempt"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "StudySession" ADD CONSTRAINT "StudySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudySession" ADD CONSTRAINT "StudySession_listId_fkey" FOREIGN KEY ("listId") REFERENCES "VocabList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyExercise" ADD CONSTRAINT "StudyExercise_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "StudySession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyExercise" ADD CONSTRAINT "StudyExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyExercise" ADD CONSTRAINT "StudyExercise_vocabId_fkey" FOREIGN KEY ("vocabId") REFERENCES "Vocab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyAttempt" ADD CONSTRAINT "StudyAttempt_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "StudyExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyAttempt" ADD CONSTRAINT "StudyAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
