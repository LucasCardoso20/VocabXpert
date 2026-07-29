// apps/api/src/services/ai/evaluateExercise.gemini.ts
import { z } from "zod";
import { callGeminiWithResilience } from "./geminiClient.js";
const IssueSchema = z.object({
    type: z.enum(["grammar", "spelling", "vocabulary", "meaning", "other"]),
    explanation: z.string(),
    // Opcional: para indicar o trecho da frase onde o problema ocorre
    startIndex: z.number().optional(),
    endIndex: z.number().optional(),
});
// --- Schema para a resposta esperada da Gemini ---
const GeminiEvaluationResponseSchema = z.object({
    verdict: z.enum(["CORRECT", "PARTIAL", "INCORRECT", "UNKNOWN"]),
    feedback: z.string(),
    score: z.number().min(0).max(1),
    // Novos campos para feedback detalhado
    correctedSentence: z.string().optional(), // Versão corrigida da frase do usuário
    issues: z.array(IssueSchema).optional(), // Lista de problemas encontrados
});
// --- Função auxiliar para parsear a resposta da Gemini ---
function parseGeminiResponse(text) {
    // A Gemini pode retornar a resposta JSON dentro de blocos de código markdown
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : text;
    // Tentar parsear o JSON
    const parsed = JSON.parse(jsonString);
    return GeminiEvaluationResponseSchema.parse(parsed);
}
export async function evaluateExerciseViaGemini(input) {
    const startTime = Date.now();
    // ✅ Removido o getGeminiModel() direto daqui, agora é feito pelo geminiClient
    // const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const userSentence = typeof input.userResponse?.sentence === "string"
        ? input.userResponse.sentence.trim()
        : "";
    const constraints = input.exercisePayload?.constraints ?? {};
    const prompt = `
You are an AI assistant specialized in evaluating language learning exercises.

Evaluate a CREATE_SENTENCE exercise.

Student profile:
- Native language: "${input.nativeLanguage}"
- Target language: "${input.targetLanguage}"

Exercise requirements:
- Required word: "${input.expected.word}"
- Translation/reference meaning: "${input.expected.translation}"
- Minimum words: ${constraints.minWords ?? 0}
- Must include the required word: ${constraints.mustIncludeWord === true ? "yes" : "no"}
- Must avoid the native language: ${constraints.forbidNativeLanguage === true ? "yes" : "no"}

Student sentence:
"${userSentence}"

Evaluation rules:
1. Check whether the sentence is written predominantly in the target language.
2. Check whether it contains the required word, allowing normal capitalization differences.
3. Check whether it has at least the requested minimum number of words.
4. Check whether the required word is used in a meaningful and grammatically acceptable way.
5. Minor punctuation, capitalization, or non-critical grammar mistakes can receive a partial score.
6. Do not require the sentence to match a predefined sentence exactly. Creative but valid sentences are allowed.

Verdict rules:
- "CORRECT": The sentence fulfills all requirements perfectly.
- "PARTIAL": The sentence fulfills most requirements but has minor issues (e.g., small grammar error, slightly awkward phrasing).
- "INCORRECT": The sentence does not fulfill an essential requirement, has an invalid use of the word, or is not understandable.
- "UNKNOWN": Use only when the sentence may be valid but cannot be assessed confidently.

Feedback rules:
- Write concise, encouraging feedback in the student's native language: "${input.nativeLanguage}".
- Explain what was correct or what needs improvement.
- If the sentence is not perfectly correct, provide a 'correctedSentence' field with a suggested corrected version.
- If there are specific issues, list them in the 'issues' array. Each issue should have a 'type' (grammar, spelling, vocabulary, meaning, other) and an 'explanation' in the student's native language.

Return only valid JSON, without Markdown fences:

{
  "verdict": "CORRECT" | "PARTIAL" | "INCORRECT" | "UNKNOWN",
  "feedback": "string",
  "score": 0 | 0.5 | 1,
  "correctedSentence"?: "string",
  "issues"?: [
    {
      "type": "grammar" | "spelling" | "vocabulary" | "meaning" | "other",
      "explanation": "string"
    }
  ]
}
`;
    // ✅ Usar a função resiliente para chamar a Gemini
    const geminiResult = await callGeminiWithResilience(prompt, parseGeminiResponse, // Passar a função parser
    {
        // Contexto para logs
        exerciseType: input.exerciseType,
        vocabWord: input.expected.word,
        userId: "N/A_FROM_GEMINI_SERVICE", // userId não está disponível aqui, mas pode ser adicionado se necessário
    });
    const latencyMs = Date.now() - startTime;
    if (geminiResult.data) {
        // Se a Gemini retornou dados válidos
        return {
            verdict: geminiResult.data.verdict,
            feedback: geminiResult.data.feedback,
            score: geminiResult.data.score,
            aiModel: process.env.GEMINI_MODEL || "gemini-2.5-flash", // Modelo usado
            latencyMs: latencyMs,
        };
    }
    else {
        // ✅ Implementar o Fallback: Se a chamada à Gemini falhou ou o circuito estava aberto
        console.warn({
            error: geminiResult.error,
            fallbackUsed: geminiResult.fallbackUsed,
            exerciseType: input.exerciseType,
            vocabWord: input.expected.word,
        }, "Gemini evaluation failed or circuit open. Using fallback.");
        return {
            verdict: "UNKNOWN", // Ou "INCORRECT" dependendo da sua política de fallback
            feedback: "Could not evaluate response due to AI service issues. Please try again.",
            score: 0,
            aiModel: "fallback-deterministic", // Indicar que foi um fallback
            latencyMs: latencyMs, // Latência da tentativa de chamar a IA
        };
    }
}
