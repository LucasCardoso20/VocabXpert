-- AlterTable
ALTER TABLE "StudySession" ADD COLUMN     "direction" TEXT NOT NULL DEFAULT 'WORD_TO_TRANSLATION',
ADD COLUMN     "vocabIds" JSONB;
