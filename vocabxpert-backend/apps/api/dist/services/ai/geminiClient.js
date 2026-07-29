import { GoogleGenerativeAI, GoogleGenerativeAIFetchError } from "@google/generative-ai";
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // 1 segundo
let isCircuitOpen = false;
let circuitOpenUntil = 0;
const CIRCUIT_BREAKER_DURATION_MS = 60 * 1000; // 1 minuto
let geminiModel = null;
function getGeminiModel() {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set in environment variables.");
    }
    if (!geminiModel) {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        geminiModel = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-2.5-flash" });
    }
    return geminiModel;
}
// --- Função para fazer a chamada à API da Gemini com Retry e Circuit Breaker ---
export async function callGeminiWithResilience(prompt, parser, // Função para parsear a resposta da Gemini
context = {}, // Contexto para logs
generationConfig // Importado de @google/generative-ai
) {
    // 1. Verificar Circuit Breaker
    if (isCircuitOpen && Date.now() < circuitOpenUntil) {
        console.warn({ ...context, circuitOpenUntil: new Date(circuitOpenUntil).toISOString() }, "Gemini circuit is open. Falling back.");
        return { data: null, error: "AI_CIRCUIT_OPEN", fallbackUsed: true };
    }
    else if (isCircuitOpen && Date.now() >= circuitOpenUntil) {
        // Tentar fechar o circuito (estado half-open)
        isCircuitOpen = false;
        console.info({ ...context }, "Gemini circuit is now half-open. Attempting request.");
    }
    const model = getGeminiModel();
    let lastError = null;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            console.info({ ...context, attempt }, "Calling Gemini API...");
            const result = await model.generateContent({
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                // ✅ NOVO: Passar o generationConfig aqui
                generationConfig: generationConfig,
            });
            const response = result.response;
            const text = response.text();
            // Se a requisição for bem-sucedida, fechar o circuito se estava aberto
            if (isCircuitOpen) {
                isCircuitOpen = false;
                console.info({ ...context }, "Gemini circuit closed after successful request.");
            }
            // Tentar parsear a resposta
            try {
                const parsedData = parser(text);
                return { data: parsedData, error: null, fallbackUsed: false };
            }
            catch (parseError) {
                console.error({ ...context, parseError: parseError instanceof Error ? parseError.message : String(parseError), geminiResponse: text }, "Failed to parse Gemini response.");
                return { data: null, error: "AI_PARSE_ERROR", fallbackUsed: true };
            }
        }
        catch (error) {
            lastError = error;
            console.error({ ...context, attempt, error: error instanceof Error ? error.message : String(error) }, "Gemini API call failed.");
            // Verificar se é um erro de rate limit (429) ou outro erro que justifique o retry
            if (error instanceof GoogleGenerativeAIFetchError) {
                if (error.status === 429) {
                    console.warn({ ...context, attempt }, "Gemini rate limit hit (429). Retrying...");
                }
                else if (error.status && error.status >= 500) {
                    console.warn({ ...context, attempt }, `Gemini server error (${error.status}). Retrying...`);
                }
                else {
                    // Para outros erros 4xx, não faz sentido tentar novamente
                    console.error({ ...context, attempt }, `Gemini client error (${error.status}). Not retrying.`);
                    break; // Sair do loop de retry
                }
            }
            else {
                // Erros não-HTTP, como problemas de rede
                console.warn({ ...context, attempt }, "Non-HTTP Gemini error. Retrying...");
            }
            if (attempt < MAX_RETRIES) {
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * attempt)); // Backoff exponencial simples
            }
        }
    }
    // Se todas as retries falharem, abrir o circuito
    isCircuitOpen = true;
    circuitOpenUntil = Date.now() + CIRCUIT_BREAKER_DURATION_MS;
    console.error({ ...context, lastError: lastError instanceof Error ? lastError.message : String(lastError), circuitOpenUntil: new Date(circuitOpenUntil).toISOString() }, "All Gemini attempts failed. Opening circuit breaker.");
    return { data: null, error: "AI_REQUEST_FAILED", fallbackUsed: true };
}
