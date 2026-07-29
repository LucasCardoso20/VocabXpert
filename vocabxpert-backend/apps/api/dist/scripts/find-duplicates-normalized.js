import { prisma } from "@vocabxpert/db";
async function main() {
    const groups = await prisma.vocab.groupBy({
        by: ["listId", "wordNormalized"],
        where: { wordNormalized: { not: null } },
        // retorna contagem por um campo (id é sempre não-null)
        _count: { id: true },
        // having filtra por CAMPO com agregação (não existe having: { _count: ... })
        having: {
            id: {
                _count: { gt: 1 },
            },
        },
        // pode ordenar por agregação (contagem do id)
        orderBy: {
            _count: { id: "desc" },
        },
    });
    console.log(`Found ${groups.length} duplicate groups`);
    for (const g of groups) {
        console.log({
            listId: g.listId,
            wordNormalized: g.wordNormalized,
            count: g._count.id,
        });
        const items = await prisma.vocab.findMany({
            where: { listId: g.listId, wordNormalized: g.wordNormalized },
            select: { id: true, word: true, createdAt: true },
            orderBy: { createdAt: "asc" },
        });
        console.table(items);
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
