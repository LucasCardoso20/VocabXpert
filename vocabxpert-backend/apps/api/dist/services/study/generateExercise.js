import { prisma } from "@vocabxpert/db";
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function pickOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function removeFirstCaseInsensitive(haystack, needle) {
    // remove só a 1ª ocorrência, case-insensitive (bom o suficiente pro cloze)
    const idx = haystack.toLowerCase().indexOf(needle.toLowerCase());
    if (idx === -1)
        return null;
    return haystack.slice(0, idx) + "____" + haystack.slice(idx + needle.length);
}
function includesWord(haystack, word) {
    return haystack.toLowerCase().includes(word.toLowerCase());
}
function safeUniq(arr) {
    const seen = new Set();
    const out = [];
    for (const s of arr) {
        const key = s.trim().toLowerCase();
        if (!key)
            continue;
        if (seen.has(key))
            continue;
        seen.add(key);
        out.push(s);
    }
    return out;
}
function resolveSpeechLocale(targetLanguage) {
    const language = targetLanguage
        ?.trim()
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '');
    if (!language) {
        return undefined;
    }
    if (language === 'en' ||
        language === 'english' ||
        language === 'ingles') {
        return 'en-US';
    }
    if (language === 'pt' ||
        language === 'portuguese' ||
        language === 'portugues') {
        return 'pt-BR';
    }
    if (language === 'es' ||
        language === 'spanish' ||
        language === 'espanhol') {
        return 'es-ES';
    }
    if (language === 'fr' ||
        language === 'french' ||
        language === 'frances') {
        return 'fr-FR';
    }
    if (language === 'de' ||
        language === 'german' ||
        language === 'alemao') {
        return 'de-DE';
    }
    if (language === 'it' ||
        language === 'italian' ||
        language === 'italiano') {
        return 'it-IT';
    }
    if (language === 'ja' ||
        language === 'japanese' ||
        language === 'japones') {
        return 'ja-JP';
    }
    if (language === 'ko' ||
        language === 'korean' ||
        language === 'coreano') {
        return 'ko-KR';
    }
    if (language === 'zh' ||
        language === 'chinese' ||
        language === 'chines') {
        return 'zh-CN';
    }
    return undefined;
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
];
function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
export async function generateExercise(input) {
    const vocab = await prisma.vocab.findFirst({
        where: { id: input.vocabId, userId: input.userId, listId: input.listId },
        select: {
            id: true,
            word: true,
            translation: true,
            examples: { select: { text: true } },
        },
    });
    if (!vocab)
        throw new Error("VOCAB_NOT_FOUND");
    const resolvedType = input.exerciseType === "RANDOM"
        ? pick((input.enabledExerciseTypes?.length ? input.enabledExerciseTypes : ALL_TYPES))
        : input.exerciseType;
    const examples = vocab.examples.map((e) => e.text).filter(Boolean);
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
            .map((o) => (input.direction === "WORD_TO_TRANSLATION" ? o.translation : o.word))
            .filter((x) => Boolean(x))
            .filter((x) => x !== correct);
        const options = new Set([correct]);
        while (options.size < 4 && pool.length > 0)
            options.add(pickOne(pool));
        const optionList = shuffle(Array.from(options));
        const correctIndex = optionList.findIndex((x) => x === correct);
        return {
            type: resolvedType,
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
            .filter((x) => x.translation)
            .slice(0, 4);
        const pairs = candidates.map((c) => ({ word: c.word, translation: c.translation }));
        const left = shuffle(pairs.map((p) => p.word));
        const right = shuffle(pairs.map((p) => p.translation));
        return {
            type: resolvedType,
            payload: { pairs, left, right },
        };
    }
    if (resolvedType === "CHOOSE_CORRECT_EXAMPLE") {
        const examples = (vocab.examples ?? []).map((e) => (typeof e === "string" ? e : e?.text)).filter(Boolean);
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
        while (distractors.length < 2)
            distractors.push("I like coffee.");
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
        const baseFromExamples = examples.find((t) => t.toLowerCase().includes(vocab.word.toLowerCase())) ?? null;
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
        const wordPool = others.map((o) => o.word).filter((w) => w.toLowerCase() !== vocab.word.toLowerCase());
        const options = new Set([vocab.word]);
        while (options.size < 4 && wordPool.length > 0)
            options.add(pickOne(wordPool));
        const optionList = shuffle(Array.from(options));
        const correctIndex = optionList.findIndex((w) => w === vocab.word);
        return {
            type: resolvedType,
            payload: {
                sentence: clozed,
                options: optionList,
                correctIndex,
            },
        };
    }
    if (resolvedType === "WORD_ORDER") {
        const examples = vocab.examples?.map((e) => e.text).filter(Boolean) ?? [];
        const fromExamples = examples.find((t) => t.toLowerCase().includes(vocab.word.toLowerCase())) ?? null;
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
        const tokens = shuffle(targetSentence
            .split(/\s+/)
            .map((t) => t.trim())
            .filter(Boolean));
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
        const textToDictate = (examples[0] ?? vocab.word).trim();
        return {
            type: resolvedType,
            payload: {
                language: "target",
                locale: resolveSpeechLocale(input.targetLanguage),
                textToDictate,
                hintTranslation: vocab.translation,
            },
        };
    }
    if (resolvedType === "CREATE_SENTENCE") {
        return {
            type: resolvedType,
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
