import { prisma } from "@vocabxpert/db";

function asWordNormalized(s: string) {
  return s.trim().replace(/\s+/g, " ").toLowerCase();
}

async function main() {
  // pega grupos duplicados via SQL (mais confiável que groupBy nesse caso)
  const groups = await prisma.$queryRaw<
    { listId: string; wordNormalized: string; ids: string[] }[]
  >`
    SELECT
      "listId",
      "wordNormalized",
      array_agg(id ORDER BY "createdAt" ASC) AS ids
    FROM "Vocab"
    WHERE "wordNormalized" IS NOT NULL
    GROUP BY "listId", "wordNormalized"
    HAVING COUNT(*) > 1
    ORDER BY COUNT(*) DESC;
  `;

  console.log(`Found ${groups.length} duplicate groups`);

  for (const g of groups) {
    const ids = g.ids;
    const keepId = ids[0];
    const deleteIds = ids.slice(1);

    console.log(`\n[listId=${g.listId}] wordNormalized="${g.wordNormalized}" keep=${keepId} delete=${deleteIds.length}`);

    // move filhos dos duplicados para o keepId
    await prisma.vocabExample.updateMany({
      where: { vocabId: { in: deleteIds } },
      data: { vocabId: keepId },
    });

    await prisma.vocabNote.updateMany({
      where: { vocabId: { in: deleteIds } },
      data: { vocabId: keepId },
    });

    await prisma.vocabReview.updateMany({
      where: { vocabId: { in: deleteIds } },
      data: { vocabId: keepId },
    });

    // deleta os vocabs duplicados
    await prisma.vocab.deleteMany({
      where: { id: { in: deleteIds } },
    });
  }

  // sanity check rápido: "passport" normalizado é "passport"
  const passport = await prisma.vocab.findMany({
    where: { wordNormalized: asWordNormalized("passport") },
    select: { id: true, listId: true, word: true, wordNormalized: true },
  });
  console.log("\nRemaining vocabs with wordNormalized='passport':");
  console.table(passport);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });