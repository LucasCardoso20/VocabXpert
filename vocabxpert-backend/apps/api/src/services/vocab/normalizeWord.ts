export function normalizeWord(input: string) {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^\p{L}\p{N}]+/gu, " ") // remove pontuação
    .trim()
    .replace(/\s+/g, " ");
}