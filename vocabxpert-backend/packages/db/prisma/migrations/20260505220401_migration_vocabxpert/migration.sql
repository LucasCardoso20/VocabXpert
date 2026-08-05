/*
  Warnings:

  - A unique constraint covering the columns `[listId,word]` on the table `Vocab` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Vocab_listId_word_key" ON "Vocab"("listId", "word");
