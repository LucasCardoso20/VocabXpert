-- CreateEnum
CREATE TYPE "TargetLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "passwordHash" TEXT,
    "nativeLanguage" TEXT NOT NULL,
    "targetLanguage" TEXT NOT NULL,
    "level" "TargetLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInterest" (
    "userId" TEXT NOT NULL,
    "interestId" TEXT NOT NULL,

    CONSTRAINT "UserInterest_pkey" PRIMARY KEY ("userId","interestId")
);

-- CreateTable
CREATE TABLE "VocabList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VocabList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vocab" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "translation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vocab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VocabExample" (
    "id" TEXT NOT NULL,
    "vocabId" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "VocabExample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VocabNote" (
    "id" TEXT NOT NULL,
    "vocabId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VocabNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Interest_name_key" ON "Interest"("name");

-- CreateIndex
CREATE INDEX "VocabList_userId_idx" ON "VocabList"("userId");

-- CreateIndex
CREATE INDEX "Vocab_userId_idx" ON "Vocab"("userId");

-- CreateIndex
CREATE INDEX "Vocab_listId_idx" ON "Vocab"("listId");

-- CreateIndex
CREATE INDEX "VocabExample_vocabId_idx" ON "VocabExample"("vocabId");

-- CreateIndex
CREATE INDEX "VocabNote_vocabId_idx" ON "VocabNote"("vocabId");

-- AddForeignKey
ALTER TABLE "UserInterest" ADD CONSTRAINT "UserInterest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInterest" ADD CONSTRAINT "UserInterest_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabList" ADD CONSTRAINT "VocabList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vocab" ADD CONSTRAINT "Vocab_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vocab" ADD CONSTRAINT "Vocab_listId_fkey" FOREIGN KEY ("listId") REFERENCES "VocabList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabExample" ADD CONSTRAINT "VocabExample_vocabId_fkey" FOREIGN KEY ("vocabId") REFERENCES "Vocab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabNote" ADD CONSTRAINT "VocabNote_vocabId_fkey" FOREIGN KEY ("vocabId") REFERENCES "Vocab"("id") ON DELETE CASCADE ON UPDATE CASCADE;
