import { z } from "zod";
const IndexResponse = z.object({ index: z.number().int().min(0) });
const FlashcardResponse = z.object({ answer: z.string().min(1) });
const WordOrderResponse = z.object({ tokens: z.array(z.string().min(1)).min(1) });
const DictationResponse = z.object({ text: z.string().min(1) });
const MatchResponse = z.object({
    matches: z.array(z.object({ word: z.string().min(1), translation: z.string().min(1) })).min(1),
});
const CreateSentenceResponse = z.object({
    sentence: z.string().trim().min(1),
});
export function validateAttemptResponse(input) {
    const t = input.exerciseType;
    if (t === "MULTIPLE_CHOICE_TRANSLATION")
        return IndexResponse.parse(input.response);
    if (t === "CLOZE")
        return IndexResponse.parse(input.response);
    if (t === "CHOOSE_CORRECT_EXAMPLE")
        return IndexResponse.parse(input.response);
    if (t === "FLASHCARD")
        return FlashcardResponse.parse(input.response);
    if (t === "WORD_ORDER")
        return WordOrderResponse.parse(input.response);
    if (t === "DICTATION")
        return DictationResponse.parse(input.response);
    if (t === "MATCH")
        return MatchResponse.parse(input.response);
    // CREATE_SENTENCE e outros subjetivos podem ficar livres (ou validar outro contrato)
    if (t === "CREATE_SENTENCE") {
        return CreateSentenceResponse.parse(input.response);
    }
    return input.response;
}
