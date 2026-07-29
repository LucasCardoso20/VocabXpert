export function normalizeWord(input: string) {
  return input
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}