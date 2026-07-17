import { Prisma, prisma } from "@vocabxpert/db";

export type GeneratedExercise = {
  type: ExerciseType;
  payload: Prisma.JsonValue;
};
type ExerciseType =
  | "RANDOM"
  | "MULTIPLE_CHOICE_TRANSLATION"
  | "CREATE_SENTENCE"
  | "CLOZE"
  | "FLASHCARD"
  | "MATCH"
  | "DICTATION"
  | "CHOOSE_CORRECT_EXAMPLE"
  | "WORD_ORDER";

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickOne<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function removeFirstCaseInsensitive(haystack: string, needle: string) {
  // remove só a 1ª ocorrência, case-insensitive (bom o suficiente pro cloze)
  const idx = haystack.toLowerCase().indexOf(needle.toLowerCase());
  if (idx === -1) return null;
  return haystack.slice(0, idx) + "____" + haystack.slice(idx + needle.length);
}

function includesWord(haystack: string, word: string) {
  return haystack.toLowerCase().includes(word.toLowerCase());
}

function safeUniq(arr: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of arr) {
    const key = s.trim().toLowerCase();
    if (!key) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
}

const ALL_TYPES = [
  "MULTIPLE_CHOICE_TRANSLATION",
  "CREATE_SENTENCE",
  "CLOZE",
  "FLASHCARD",
  "MATCH",
  "DICTATION",
  "CHOOSE_CORRECT_EXAMPLE",
  "WORD_ORDER",
] as const;

type ConcreteExerciseType = (typeof ALL_TYPES)[number];

function pick<T>(arr: readonly T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function generateExercise(input: {
  userId: string;
  listId: string;
  vocabId: string;
  exerciseType: "RANDOM" | ConcreteExerciseType;
  enabledExerciseTypes?: ConcreteExerciseType[];
  direction: "WORD_TO_TRANSLATION" | "TRANSLATION_TO_WORD";
}) : Promise<GeneratedExercise> {
  const vocab = await prisma.vocab.findFirst({
    where: { id: input.vocabId, userId: input.userId, listId: input.listId },
    select: {
      id: true,
      word: true,
      translation: true,
      examples: { select: { text: true } },
    },
  });
  if (!vocab) throw new Error("VOCAB_NOT_FOUND");

  const resolvedType: ConcreteExerciseType =
    input.exerciseType === "RANDOM"
      ? pick((input.enabledExerciseTypes?.length ? input.enabledExerciseTypes : ALL_TYPES))
      : input.exerciseType;


  const examples = vocab.examples.map((e: any) => e.text).filter(Boolean);

  // helper: pega outras palavras da lista (para distratores e match)
  const others = await prisma.vocab.findMany({
    where: { userId: input.userId, listId: input.listId, id: { not: vocab.id }, translation: { not: null } },
    select: { id: true, word: true, translation: true, examples: { select: { text: true } } },
    take: 50,
  });

  // Garantias mínimas para app “final”:
  // - se falta tradução, não dá pra fazer vários exercícios; cai em fallback que pede ao usuário marcar com IA (ou força enrich previamente)
  if (!vocab.translation) {
    return {
      type: "FLASHCARD",
      payload: {
        front: vocab.word,
        back: null,
        note: "Missing translation. Please enrich this word.",
      },
    };
  }

  if (resolvedType === "FLASHCARD") {
  const front = input.direction === "WORD_TO_TRANSLATION" ? vocab.word : vocab.translation;
  const back = input.direction === "WORD_TO_TRANSLATION" ? vocab.translation : vocab.word;

  return {
    type: "FLASHCARD",
    payload: {
      front: front ?? vocab.word,
      back: back ?? null,
      direction: input.direction,
      note: back ? null : "Missing translation. Please enrich this word.",
    },
  };
}

  if (resolvedType === "MULTIPLE_CHOICE_TRANSLATION") {
    const correct = input.direction === "WORD_TO_TRANSLATION" ? vocab.translation : vocab.word;

    const pool = others
      .map((o: any) => (input.direction === "WORD_TO_TRANSLATION" ? o.translation : o.word))
      .filter((x: any): x is string => Boolean(x))
      .filter((x: any) => x !== correct);

    const options = new Set<string>([correct]);
    while (options.size < 4 && pool.length > 0) options.add(pickOne(pool));

    const optionList = shuffle(Array.from(options));
    const correctIndex = optionList.findIndex((x: any) => x === correct);

    return {
      type: resolvedType as ExerciseType,
      payload: {
        prompt: input.direction === "WORD_TO_TRANSLATION" ? vocab.word : vocab.translation,
        options: optionList,
        correctIndex,
        direction: input.direction,
      },
    };
  }

  if (resolvedType === "MATCH") {
    // 4 pares word <-> translation
    const candidates = shuffle([{ id: vocab.id, word: vocab.word, translation: vocab.translation }, ...others])
      .filter((x: any) => x.translation)
      .slice(0, 4);

    const pairs = candidates.map((c: any) => ({ word: c.word, translation: c.translation! }));
    const left = shuffle(pairs.map((p: any) => p.word));
    const right = shuffle(pairs.map((p: any) => p.translation));

    return {
      type: resolvedType as ExerciseType,
      payload: { pairs, left, right },
    };
  }

  if (resolvedType === "CHOOSE_CORRECT_EXAMPLE") {
    const examples: string[] =
      (vocab.examples ?? []).map((e: any) => (typeof e === "string" ? e : e?.text)).filter(Boolean);

    // tenta pegar um exemplo que contém a palavra
    let correctExample = examples.find((t) => includesWord(t, vocab.word)) ?? null;

    // ✅ fallback template (sempre contém a palavra)
    if (!correctExample) {
      correctExample = `This is a good ${vocab.word} for the class.`;
    }

    // distractors: tenta usar examples que NÃO contenham a palavra
    const distractorsFromExamples = examples.filter((t) => !includesWord(t, vocab.word));

    // fallback distractors fixos
    const distractorPool = safeUniq([
      ...distractorsFromExamples,
      "The user needs a clear interface.",
      "Please click here to start.",
      "We talked about design yesterday.",
      "I booked a hotel near the airport.",
    ]);

    const distractors = shuffle(distractorPool).slice(0, 2);

    // ✅ garante 3 opções no mínimo (1 correta + 2 erradas)
    while (distractors.length < 2) distractors.push("I like coffee.");

    const options = shuffle([correctExample, ...distractors]);

    return {
      type: "CHOOSE_CORRECT_EXAMPLE",
      payload: {
        word: vocab.word,
        options,
        correctIndex: options.indexOf(correctExample),
      },
    };
  }

  if (resolvedType === "CLOZE") {
    const baseFromExamples =
    examples.find((t: any) => t.toLowerCase().includes(vocab.word.toLowerCase())) ?? null;

    // ✅ fallback sem examples: gera uma frase template em inglês (target)
    const templates = [
      `I saw ${vocab.word} today.`,
      `I like ${vocab.word}.`,
      `This is ${vocab.word}.`,
      `We talked about ${vocab.word} yesterday.`,
    ];

    const base = baseFromExamples ?? pickOne(templates);
    const clozed = removeFirstCaseInsensitive(base, vocab.word) ?? base.replace(vocab.word, "____");

    // opções de palavras (word)
    const wordPool = others.map((o: any) => o.word).filter((w: any) => w.toLowerCase() !== vocab.word.toLowerCase());
    const options = new Set<string>([vocab.word]);
    while (options.size < 4 && wordPool.length > 0) options.add(pickOne(wordPool));

    const optionList = shuffle(Array.from(options));
    const correctIndex = optionList.findIndex((w) => w === vocab.word);

    return {
      type: resolvedType as ExerciseType,
      payload: {
        sentence: clozed,
        options: optionList,
        correctIndex,
      },
    };
  }

  if (resolvedType === "WORD_ORDER") {
  const examples = vocab.examples?.map((e: any) => e.text).filter(Boolean) ?? [];

  const fromExamples =
    examples.find((t: string) => t.toLowerCase().includes(vocab.word.toLowerCase())) ?? null;

  const templates = [
    `I would like to place an order for coffee.`,
    `I want to order a coffee, please.`,
    `Can I order a taxi, please?`,
    `I will order ${vocab.word} tomorrow.`, // garante word em algum template
  ];

  // ✅ garante uma frase base sempre
  const base = fromExamples ?? templates[0];

  // ✅ garante que a frase final contém a palavra do vocab (pra manter consistência do payload)
  // Se não contiver, injeta de forma simples
  const targetSentence = base.toLowerCase().includes(vocab.word.toLowerCase())
    ? base
    : `${vocab.word} ${base}`;

  const tokens = shuffle(
    targetSentence
      .split(/\s+/)
      .map((t: string) => t.trim())
      .filter(Boolean)
  ) as any;

  return {
    type: "WORD_ORDER",
    payload: {
      tokens,
      targetSentence,
      mustIncludeWord: vocab.word,
    },
  };
}

  if (resolvedType === "DICTATION") {
    // Produção: melhor ditar uma frase curta (exemplo) ou a palavra
    const textToDictate = (examples[0] ?? vocab.word).trim();

    return {
      type: resolvedType as ExerciseType,
      payload: {
        language: "target",
        textToDictate,
        hintTranslation: vocab.translation,
        // front pode usar TTS do device; opcionalmente você adiciona um endpoint de áudio depois
      },
    };
  }

  if (resolvedType === "CREATE_SENTENCE") {
    return {
      type: resolvedType as ExerciseType,
      payload: {
        word: vocab.word,
        translation: vocab.translation,
        constraints: {
          language: "target",
          minWords: 6,
          mustIncludeWord: true,
          forbidNativeLanguage: true,
        },
      },
    };
  }

  // fallback final
  return {
    type: "FLASHCARD",
    payload: { front: vocab.word, back: vocab.translation, direction: "WORD_TO_TRANSLATION" },
  };
}