// apps/api/src/services/ai/evaluateExercise.gemini.ts

import { GenerativeModel } from "@google/generative-ai";
import { ExerciseType } from "@vocabxpert/db";
import { z } from "zod";
import { callGeminiWithResilience } from "./geminiClient.js";

// --- Schema para a resposta esperada da Gemini ---
const GeminiEvaluationResponseSchema = z.object({
  verdict: z.enum(["CORRECT", "INCORRECT", "UNKNOWN"]),
  feedback: z.string(),
  score: z.number().min(0).max(1),
});

type GeminiEvaluationResponse = z.infer<typeof GeminiEvaluationResponseSchema>;

// --- Tipo de retorno da função de avaliação ---
export type EvaluationResult = {
  verdict: "CORRECT" | "INCORRECT" | "UNKNOWN";
  feedback: string;
  score: number;
  aiModel: string;
  latencyMs: number;
};

// --- Função auxiliar para parsear a resposta da Gemini ---
function parseGeminiResponse(text: string): GeminiEvaluationResponse {
  // A Gemini pode retornar a resposta JSON dentro de blocos de código markdown
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
  const jsonString = jsonMatch ? jsonMatch[1] : text;

  // Tentar parsear o JSON
  const parsed = JSON.parse(jsonString);
  return GeminiEvaluationResponseSchema.parse(parsed);
}

export async function evaluateExerciseViaGemini(input: {
  nativeLanguage: string;
  targetLanguage: string;
  exerciseType: ExerciseType;
  exercisePayload: any;
  userResponse: any;
  expected: { word: string; translation: string; payload: any };
}): Promise<EvaluationResult> {
  const startTime = Date.now();

  // ✅ Removido o getGeminiModel() direto daqui, agora é feito pelo geminiClient
  // const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    You are an AI assistant specialized in evaluating language learning exercises.
    Evaluate the user's response for a "${input.exerciseType}" exercise.
    The user's native language is "${input.nativeLanguage}" and they are learning "${input.targetLanguage}".

    Exercise Details:
    - Exercise Type: ${input.exerciseType}
    - Expected Word: "${input.expected.word}"
    - Expected Translation: "${input.expected.translation}"
    - Exercise Payload: ${JSON.stringify(input.exercisePayload)}

    User's Response:
    - User Input: ${JSON.stringify(input.userResponse)}

    Provide a verdict, a brief feedback, and a score (0 to 1) based on correctness.
    - "CORRECT": The response is perfectly correct.
    - "INCORRECT": The response is wrong.
    - "UNKNOWN": If you cannot confidently determine correctness (e.g., for creative responses where multiple answers are valid).

    Return your response as a JSON object with the following structure:
    \`\`\`json
    {
      "verdict": "CORRECT" | "INCORRECT" | "UNKNOWN",
      "feedback": "string",
      "score": 0 | 0.5 | 1
    }
    \`\`\`
    `;

  // ✅ Usar a função resiliente para chamar a Gemini
  const geminiResult = await callGeminiWithResilience(
    prompt,
    parseGeminiResponse, // Passar a função parser
    {
      // Contexto para logs
      exerciseType: input.exerciseType,
      vocabWord: input.expected.word,
      userId: "N/A_FROM_GEMINI_SERVICE", // userId não está disponível aqui, mas pode ser adicionado se necessário
    }
  );

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
  } else {
    // ✅ Implementar o Fallback: Se a chamada à Gemini falhou ou o circuito estava aberto
    console.warn(
      {
        error: geminiResult.error,
        fallbackUsed: geminiResult.fallbackUsed,
        exerciseType: input.exerciseType,
        vocabWord: input.expected.word,
      },
      "Gemini evaluation failed or circuit open. Using fallback."
    );
    return {
      verdict: "UNKNOWN", // Ou "INCORRECT" dependendo da sua política de fallback
      feedback: "Could not evaluate response due to AI service issues. Please try again.",
      score: 0,
      aiModel: "fallback-deterministic", // Indicar que foi um fallback
      latencyMs: latencyMs, // Latência da tentativa de chamar a IA
    };
  }
}