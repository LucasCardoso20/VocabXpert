type Verdict = "CORRECT" | "PARTIAL" | "INCORRECT";
type Outcome = "KNOWN" | "UNKNOWN";

export type DeterministicEvalResult = {
  verdict: Verdict;
  outcome: Outcome;
  score: number; // 0..1
  feedback: string;
  aiModel: string; // mantém compatibilidade com sua tabela
  latencyMs: number;
};

// apps/api/src/services/study/evaluateExercise.deterministic.ts
function norm(s: string) {
  return s
    .trim()
    .toLowerCase()
    // .normalize("NFKD") // REMOVIDO: Para manter acentos e cedilhas
    // .replace(/[\u0300-\u036f]/g, "") // REMOVIDO: Para manter acentos e cedilhas
    .replace(/[^\p{L}\p{N}]+/gu, " ") // Isso ainda remove pontuações e caracteres especiais
    .trim()
    .replace(/\s+/g, " ");
}

// NOVA FUNÇÃO: normLoose - para comparações mais flexíveis (ignora acentos)
function normLoose(s: string) {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFKD") // Mantém esta linha para remover acentos
    .replace(/[\u0300-\u036f]/g, "") // Mantém esta linha para remover acentos
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function result(verdict: "CORRECT" | "PARTIAL" | "INCORRECT", feedback: string, score?: number) {
  const finalScore = score ?? (verdict === "CORRECT" ? 1 : verdict === "PARTIAL" ? 0.5 : 0);
  return {
    verdict,
    outcome: verdict === "CORRECT" ? ("KNOWN" as const) : ("UNKNOWN" as const),
    score: finalScore,
    feedback,
    aiModel: "deterministic-v1",
    latencyMs: 0,
  };
}

export function evaluateExerciseDeterministic(input: {
  type: string;
  payload: unknown;
  userResponse: unknown;
  expected: { word: string; translation: string | null };
  direction: "WORD_TO_TRANSLATION" | "TRANSLATION_TO_WORD";
}) {
  const p: any = input.payload;
  const r: any = input.userResponse;

  // MC
  if (input.type === "MULTIPLE_CHOICE_TRANSLATION") {
    if (!Array.isArray(p?.options) || typeof p?.correctIndex !== "number") return null;
    if (typeof r?.index !== "number") return null;

    // ADICIONADO: Verifica se o índice da resposta do usuário está dentro dos limites das opções
    if (r.index < 0 || r.index >= p.options.length) {
      return null;
    }

    return r.index === p.correctIndex
      ? result("CORRECT", "Correct.")
      : result("INCORRECT", `Incorrect. Correct answer: ${p.options[p.correctIndex]}`);
  }

    // FLASHCARD
  if (input.type === "FLASHCARD") {
    if (typeof p !== 'object' || p === null) return null;

    if (typeof r?.answer !== "string") return null;

    const expected =
      typeof p?.back === "string" && p.back.trim().length > 0
        ? p.back
        : input.direction === "WORD_TO_TRANSLATION"
          ? input.expected.translation
          : input.expected.word;

    if (!expected) return null;

    const a = norm(r.answer); // 'a' continua sendo normalizado de forma rigorosa
    const e = norm(expected); // 'e' continua sendo normalizado de forma rigorosa

    if (a === e) return result("CORRECT", "Correct.");

    // NOVO: Use normLoose para a verificação PARTIAL
    const aLoose = normLoose(r.answer);
    const eLoose = normLoose(expected);

    if (aLoose.includes(eLoose) || eLoose.includes(aLoose)) return result("PARTIAL", `Almost. Expected: ${expected}`, 0.5);
    return result("INCORRECT", `Incorrect. Expected: ${expected}`);
  }
    // CLOZE (o seu CLOZE é por alternativas)
  if (input.type === "CLOZE") {
    if (!Array.isArray(p?.options) || typeof p?.correctIndex !== "number") return null;
    if (typeof r?.index !== "number") return null;

    // ADICIONADO: Verifica se o índice da resposta do usuário está dentro dos limites das opções
    if (r.index < 0 || r.index >= p.options.length) {
      return null;
    }

    return r.index === p.correctIndex
      ? result("CORRECT", "Correct.")
      : result("INCORRECT", `Incorrect. Expected: ${p.options[p.correctIndex]}`);
  }

  // CHOOSE_CORRECT_EXAMPLE (você usa options)
  if (input.type === "CHOOSE_CORRECT_EXAMPLE") {
    if (!Array.isArray(p?.options) || typeof p?.correctIndex !== "number") return null;
    if (typeof r?.index !== "number") return null;

    // ADICIONADO: Verifica se o índice da resposta do usuário está dentro dos limites das opções
    if (r.index < 0 || r.index >= p.options.length) {
      return null;
    }

    return r.index === p.correctIndex
      ? result("CORRECT", "Correct.")
      : result("INCORRECT", `Incorrect. Correct example: ${p.options[p.correctIndex]}`);
  }

  // WORD_ORDER (você usa targetSentence)
  if (input.type === "WORD_ORDER") {
    if (!Array.isArray(r?.tokens) || !r.tokens.every((t: any) => typeof t === "string")) return null;
    if (typeof p?.targetSentence !== "string") return null;

    const got = norm(r.tokens.join(" "));
    const exp = norm(p.targetSentence);

    return got === exp ? result("CORRECT", "Correct order.") : result("INCORRECT", "Incorrect order.");
  }

  // DICTATION (você usa textToDictate)
  if (input.type === "DICTATION") {
    if (typeof p?.textToDictate !== "string") return null;
    if (typeof r?.text !== "string") return null;

    return norm(r.text) === norm(p.textToDictate)
      ? result("CORRECT", "Correct.")
      : result("INCORRECT", `Incorrect. Expected: ${p.textToDictate}`);
  }


    // MATCH
  // payload: { pairs: Array<{ word: string; translation: string }> ... }
  // response: { matches: Array<{ word: string; translation: string }> }
  if (input.type === "MATCH") {
    if (!Array.isArray(p?.pairs)) return null;
    if (!Array.isArray(r?.matches)) return null;

    // expected: Map(word -> translation)
    const expected = new Map<string, string>();

    for (const pair of p.pairs) {
      if (typeof pair?.word !== "string" || typeof pair?.translation !== "string") return null;
      expected.set(norm(pair.word), norm(pair.translation));
    }

    if (expected.size === 0) return null;

    let correct = 0;

    for (const m of r.matches) {
      if (typeof m?.word !== "string" || typeof m?.translation !== "string") return null;

      const w = norm(m.word);
      const t = norm(m.translation);

      const expT = expected.get(w);
      if (expT && expT === t) correct++;
    }

    const total = expected.size;
    const score = correct / total;

    if (score === 1) return result("CORRECT", "Perfect match.", 1);
  if (score > 0 && score < 1) return result("PARTIAL", "Some matches are correct.", score); // <-- ALTERADO AQUI
  return result("INCORRECT", "Most matches are incorrect.", score);
  }

  return null; // não sei avaliar -> cai pra Gemini
}