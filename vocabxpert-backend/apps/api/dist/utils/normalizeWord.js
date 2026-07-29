export function normalizeWord(input) {
    return input
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
}
