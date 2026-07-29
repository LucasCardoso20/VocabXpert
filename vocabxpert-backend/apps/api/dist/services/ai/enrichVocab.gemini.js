import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";
const EnrichSchema = z.object({
    translation: z.string().min(1).max(120),
    examples: z.array(z.string().min(1).max(200)).min(3).max(3),
});
function extractJson(text) {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start)
        throw new Error("AI_NO_JSON");
    return text.slice(start, end + 1);
}
async function withTimeout(p, ms) {
    return await Promise.race([
        p,
        new Promise((_, rej) => setTimeout(() => rej(new Error("AI_TIMEOUT")), ms)),
    ]);
}
function buildPrompt(input) {
    return [
        "Return ONLY a valid JSON object. No markdown, no extra text.",
        "You are generating language-learning data.",
        `Native language: ${input.nativeLanguage}`,
        `Target language: ${input.targetLanguage}`,
        `Level: ${input.level}`,
        `Target word/term: ${JSON.stringify(input.word)}`,
        "",
        "Rules:",
        "- translation must be in native language",
        "- examples must be in target language",
        "- exactly 3 examples, natural, short (6-14 words), no numbering, no quotes",
        "- each example should include the target word/term (case-insensitive match is ok)",
        "",
        'Output JSON: {"translation":"...","examples":["...","...","..."]}',
    ].join("\n");
}
export async function enrichVocabViaGemini(input) {
    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = process.env.GEMINI_MODEL; // gemini-2.5-flash
    if (!apiKey)
        throw new Error("MISSING_GEMINI_API_KEY");
    if (!modelName)
        throw new Error("MISSING_GEMINI_MODEL");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });
    const prompt = buildPrompt(input);
    const result = await withTimeout(model.generateContent(prompt), 12000);
    const text = result.response.text().trim();
    const obj = JSON.parse(extractJson(text));
    return EnrichSchema.parse(obj);
}
