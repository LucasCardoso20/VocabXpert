-- CreateTable
CREATE TABLE "VocabProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vocabId" TEXT NOT NULL,
    "ease" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "interval" INTEGER NOT NULL DEFAULT 0,
    "repetitions" INTEGER NOT NULL DEFAULT 0,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "lastOutcome" "ReviewOutcome",
    "lastReviewedAt" TIMESTAMP(3),
    "nextDueAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VocabProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VocabProgress_userId_nextDueAt_idx" ON "VocabProgress"("userId", "nextDueAt");

-- CreateIndex
CREATE INDEX "VocabProgress_vocabId_idx" ON "VocabProgress"("vocabId");

-- CreateIndex
CREATE UNIQUE INDEX "VocabProgress_userId_vocabId_key" ON "VocabProgress"("userId", "vocabId");

-- AddForeignKey
ALTER TABLE "VocabProgress" ADD CONSTRAINT "VocabProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabProgress" ADD CONSTRAINT "VocabProgress_vocabId_fkey" FOREIGN KEY ("vocabId") REFERENCES "Vocab"("id") ON DELETE CASCADE ON UPDATE CASCADE;
