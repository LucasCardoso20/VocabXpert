// apps/api/src/services/ai/initialVocabs.gemini.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { callGeminiWithResilience } from "./geminiClient.js"; // ✅ Importar o cliente resiliente

const InitialVocabItemSchema = z.object({
  word: z.string().min(1),
  translation: z.string().min(1),
  examples: z.array(z.string().min(1)).max(5).default([]),
});
const InitialVocabListSchema = z.array(InitialVocabItemSchema).length(10); // você definiu 10

export type GenerateInitialVocabsInput = {
  nativeLanguage: string;
  targetLanguage: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  interests: string[];
  count: number; // vamos validar count = 10 na prática
};

// ✅ Nova função parser para a resposta da Gemini
function parseInitialVocabsResponse(text: string): z.infer<typeof InitialVocabListSchema> {
  // Tentar remover blocos de código markdown, se houver
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
  const jsonString = jsonMatch ? jsonMatch[1] : text;

  // Tentar parsear o JSON
  const parsed = JSON.parse(jsonString);
  return InitialVocabListSchema.parse(parsed);
}

export async function generateInitialVocabsViaGemini(
  input: GenerateInitialVocabsInput
): Promise<z.infer<typeof InitialVocabListSchema>> { // ✅ Retornar o tipo correto
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL; // ✅ Usar GEMINI_MODEL

  if (!apiKey) throw new Error("MISSING_GEMINI_API_KEY");
  if (!modelName) throw new Error("MISSING_GEMINI_MODEL_NAME"); // ✅ Lançar erro se o nome do modelo estiver faltando

  if (input.count !== 10) {
    throw new Error("INVALID_INITIAL_VOCABS_COUNT");
  }

  const prompt = [
    `You are an expert language teacher generating initial vocabulary items for a language-learning app.`,
    `Return ONLY a valid JSON array (no markdown formatting, no backticks, no comments).`,
    ``,
    `Constraints:`,
    `- Output must be a JSON array with exactly ${input.count} items.`,
    `- Each item must follow this exact structure: { "word": string, "translation": string, "examples": string[] }`,
    `- "word": A relevant vocabulary word in the target language (${input.targetLanguage}).`,
    `- "translation": The translation of the word in the native language (${input.nativeLanguage}).`,
    `- "examples": An array containing exactly ONE short example sentence in the target language.`,
    `  * CRITICAL: The example sentence MUST be strictly appropriate for a ${input.level} learner.`,
    `  * CRITICAL: The example sentence MUST be contextually related to the user's interests: ${input.interests.join(", ") || "everyday life"}.`,
    `- Avoid duplicate words.`,
    ``,
    `Return the JSON array now:`
].join("\n");

  // ✅ Usar callGeminiWithResilience
  const geminiResult = await callGeminiWithResilience(
    prompt,
    parseInitialVocabsResponse, // ✅ Usar o novo parser
    {
      // Contexto para logs
      task: "generateInitialVocabs",
      nativeLanguage: input.nativeLanguage,
      targetLanguage: input.targetLanguage,
      level: input.level,
      interests: input.interests,
    },
    
    {
      responseMimeType: "application/json",
    }
  );

  if (geminiResult.data) {
    return geminiResult.data;
  } else {
    // ✅ Fallback: Se a Gemini falhar, retornar uma lista vazia ou um conjunto de vocabulários padrão
    console.warn(
      {
        error: geminiResult.error,
        fallbackUsed: geminiResult.fallbackUsed,
        task: "generateInitialVocabs",
      },
      "Gemini failed to generate initial vocabs. Returning empty list as fallback."
    );
    return []; // Retorna uma lista vazia como fallback
  }
}