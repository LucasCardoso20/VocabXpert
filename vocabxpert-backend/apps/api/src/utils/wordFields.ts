export function wordFields(raw: string) {
  const word = raw.trim().replace(/\s+/g, " ");
  const wordNormalized = word.toLowerCase();
  return { word, wordNormalized };
}