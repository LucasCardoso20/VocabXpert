export function wordFields(raw) {
    const word = raw.trim().replace(/\s+/g, " ");
    const wordNormalized = word.toLowerCase();
    return { word, wordNormalized };
}
