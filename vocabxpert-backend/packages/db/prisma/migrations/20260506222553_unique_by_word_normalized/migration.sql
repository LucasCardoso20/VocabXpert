/*
  Warnings:

  - A unique constraint covering the columns `[listId,wordNormalized]` on the table `Vocab` will be added. If there are existing duplicate values, this will fail.
  - Made the column `wordNormalized` on table `Vocab` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Vocab_listId_word_key";

-- AlterTable
ALTER TABLE "Vocab" ALTER COLUMN "wordNormalized" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vocab_listId_wordNormalized_key" ON "Vocab"("listId", "wordNormalized");
