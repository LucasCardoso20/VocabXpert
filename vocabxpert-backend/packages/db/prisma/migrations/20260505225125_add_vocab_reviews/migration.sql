-- CreateEnum
CREATE TYPE "ReviewOutcome" AS ENUM ('KNOWN', 'UNKNOWN');

-- CreateTable
CREATE TABLE "VocabReview" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vocabId" TEXT NOT NULL,
    "outcome" "ReviewOutcome" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VocabReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VocabReview_userId_createdAt_idx" ON "VocabReview"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "VocabReview_vocabId_createdAt_idx" ON "VocabReview"("vocabId", "createdAt");

-- AddForeignKey
ALTER TABLE "VocabReview" ADD CONSTRAINT "VocabReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabReview" ADD CONSTRAINT "VocabReview_vocabId_fkey" FOREIGN KEY ("vocabId") REFERENCES "Vocab"("id") ON DELETE CASCADE ON UPDATE CASCADE;
