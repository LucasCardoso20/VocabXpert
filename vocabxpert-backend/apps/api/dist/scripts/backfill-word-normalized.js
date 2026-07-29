import { prisma } from "@vocabxpert/db";
function normalizeWord(input) {
    return input.trim().replace(/\s+/g, " ").toLowerCase();
}
async function main() {
    const vocabs = await prisma.vocab.findMany({
        select: { id: true, word: true, wordNormalized: true },
    });
    let updated = 0;
    for (const v of vocabs) {
        const wn = normalizeWord(v.word);
        if (v.wordNormalized !== wn) {
            await prisma.vocab.update({
                where: { id: v.id },
                data: { wordNormalized: wn },
            });
            updated++;
        }
    }
    console.log({ total: vocabs.length, updated });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
