-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activeLearningLanguageId" TEXT;

-- AlterTable
ALTER TABLE "VocabList" ADD COLUMN     "learningLanguageId" TEXT;

-- CreateTable
CREATE TABLE "UserLearningLanguage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "level" "TargetLevel" NOT NULL DEFAULT 'BEGINNER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserLearningLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserLearningLanguage_userId_idx" ON "UserLearningLanguage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserLearningLanguage_userId_language_key" ON "UserLearningLanguage"("userId", "language");

-- CreateIndex
CREATE INDEX "VocabList_learningLanguageId_idx" ON "VocabList"("learningLanguageId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_activeLearningLanguageId_fkey" FOREIGN KEY ("activeLearningLanguageId") REFERENCES "UserLearningLanguage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLearningLanguage" ADD CONSTRAINT "UserLearningLanguage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabList" ADD CONSTRAINT "VocabList_learningLanguageId_fkey" FOREIGN KEY ("learningLanguageId") REFERENCES "UserLearningLanguage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
