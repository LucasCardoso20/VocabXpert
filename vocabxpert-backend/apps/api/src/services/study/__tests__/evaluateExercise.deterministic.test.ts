// apps/api/src/services/study/__tests__/evaluateExercise.deterministic.test.ts

// Importa a função correta do arquivo correto, com a extensão .ts
import { evaluateExerciseDeterministic } from '../evaluateExercise.deterministic.ts';
// Importa ExerciseType. Ajuste o caminho se necessário, mas @vocabxpert/db é o padrão para monorepo
import { ExerciseType } from '@vocabxpert/db';

// Describe é uma suíte de testes
describe('evaluateExerciseDeterministic - FLASHCARD', () => {
  // Define um input comum para evitar repetição
  const commonInput = {
    nativeLanguage: 'portuguese',
    targetLanguage: 'english',
    // As propriedades 'type' e 'payload' devem estar no nível superior
    type: 'FLASHCARD' as ExerciseType,
    payload: {
      word: 'apple',
      translation: 'maçã',
      back: 'maçã', // Adicionado 'back' para simular o payload do FLASHCARD
    },
    expected: {
      word: 'apple',
      translation: 'maçã',
      payload: {},
    },
    direction: 'WORD_TO_TRANSLATION' as const,
  };

  // Testes para FLASHCARD
  it('should return CORRECT for a correct answer (case-insensitive)', () => {
    const userResponse = { answer: 'maçã' };
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse,
    });
    expect(result).toEqual({
      verdict: 'CORRECT',
      outcome: 'KNOWN',
      feedback: 'Correct.',
      score: 1,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return CORRECT for a correct answer with different casing', () => {
    const userResponse = { answer: 'Maçã' };
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse,
    });
    expect(result).toEqual({
      verdict: 'CORRECT',
      outcome: 'KNOWN',
      feedback: 'Correct.',
      score: 1,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return CORRECT for a correct answer with leading/trailing spaces', () => {
    const userResponse = { answer: '  maçã  ' };
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse,
    });
    expect(result).toEqual({
      verdict: 'CORRECT',
      outcome: 'KNOWN',
      feedback: 'Correct.',
      score: 1,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return INCORRECT for an incorrect answer', () => {
    const userResponse = { answer: 'banana' };
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse,
    });
    expect(result).toEqual({
      verdict: 'INCORRECT',
      outcome: 'UNKNOWN',
      feedback: 'Incorrect. Expected: maçã',
      score: 0,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return PARTIAL for a partial answer (includes expected)', () => {
    const userResponse = { answer: 'maça' }; // Sem o til
    const partialInput = {
      ...commonInput,
      payload: { ...commonInput.payload, back: 'maçã' },
      expected: { ...commonInput.expected, translation: 'maçã' },
    };
    const result = evaluateExerciseDeterministic({
      ...partialInput,
      userResponse,
    });
    expect(result).toEqual({
      verdict: 'PARTIAL',
      outcome: 'UNKNOWN',
      feedback: 'Almost. Expected: maçã',
      score: 0.5,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return null if payload is missing', () => {
    const userResponse = { answer: 'maçã' };
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      payload: undefined, // Simula payload ausente
      userResponse,
    });
    expect(result).toBeNull();
  });

  it('should return null if userResponse is missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: undefined, // Simula userResponse ausente
    });
    expect(result).toBeNull();
  });
});


// ... (seu código existente para FLASHCARD)

// NOVA SUÍTE DE TESTES: MULTIPLE_CHOICE_TRANSLATION
describe('evaluateExerciseDeterministic - MULTIPLE_CHOICE_TRANSLATION', () => {
  const commonInput = {
    nativeLanguage: 'portuguese',
    targetLanguage: 'english',
    type: 'MULTIPLE_CHOICE_TRANSLATION' as ExerciseType,
    payload: {
      prompt: 'Hello',
      options: ['Olá', 'Adeus', 'Obrigado', 'Por favor'],
      correctIndex: 0, // 'Olá'
    },
    userResponse: {
      index: 0, // Resposta do usuário: 'Olá'
    },
    expected: {
      word: 'Hello',
      translation: 'Olá',
      payload: {},
    },
    direction: 'WORD_TO_TRANSLATION' as const,
  };

  it('should return CORRECT for the correct option', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { index: 0 }, // Escolhe a opção correta
    });
    expect(result).toEqual({
      verdict: 'CORRECT',
      outcome: 'KNOWN',
      feedback: 'Correct.',
      score: 1,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return INCORRECT for an incorrect option', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { index: 1 }, // Escolhe uma opção incorreta ('Adeus')
    });
    expect(result).toEqual({
      verdict: 'INCORRECT',
      outcome: 'UNKNOWN',
      feedback: 'Incorrect. Correct answer: Olá',
      score: 0,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return null if payload options are missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      payload: { ...commonInput.payload, options: undefined }, // Simula opções ausentes
    });
    expect(result).toBeNull();
  });

  it('should return null if payload correctIndex is missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      payload: { ...commonInput.payload, correctIndex: undefined }, // Simula correctIndex ausente
    });
    expect(result).toBeNull();
  });

  it('should return null if userResponse index is missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { index: undefined }, // Simula userResponse index ausente
    });
    expect(result).toBeNull();
  });

  it('should return null if userResponse index is out of bounds', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { index: 99 }, // Simula index fora dos limites
    });
    expect(result).toBeNull();
  });
});

// NOVA SUÍTE DE TESTES: CLOZE
describe('evaluateExerciseDeterministic - CLOZE', () => {
  const commonInput = {
    nativeLanguage: 'portuguese',
    targetLanguage: 'english',
    type: 'CLOZE' as ExerciseType,
    payload: {
      sentence: 'Eu gosto de ___.',
      options: ['maçãs', 'bananas', 'peras', 'uvas'],
      correctIndex: 0, // 'maçãs'
    },
    userResponse: {
      index: 0, // Resposta do usuário: 'maçãs'
    },
    expected: {
      word: 'maçãs', // O que se espera como palavra correta para o CLOZE
      translation: 'apples', // Tradução correspondente (se aplicável)
      payload: {},
    },
    direction: 'WORD_TO_TRANSLATION' as const, // Ou outro que faça sentido para o CLOZE
  };

  it('should return CORRECT for the correct option', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { index: 0 }, // Escolhe a opção correta
    });
    expect(result).toEqual({
      verdict: 'CORRECT',
      outcome: 'KNOWN',
      feedback: 'Correct.',
      score: 1,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return INCORRECT for an incorrect option', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { index: 1 }, // Escolhe uma opção incorreta ('bananas')
    });
    expect(result).toEqual({
      verdict: 'INCORRECT',
      outcome: 'UNKNOWN',
      feedback: 'Incorrect. Expected: maçãs', // Feedback deve refletir a opção correta
      score: 0,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return null if payload options are missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      payload: { ...commonInput.payload, options: undefined }, // Simula opções ausentes
    });
    expect(result).toBeNull();
  });

  it('should return null if payload correctIndex is missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      payload: { ...commonInput.payload, correctIndex: undefined }, // Simula correctIndex ausente
    });
    expect(result).toBeNull();
  });

  it('should return null if userResponse index is missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { index: undefined }, // Simula userResponse index ausente
    });
    expect(result).toBeNull();
  });

  it('should return null if userResponse index is out of bounds', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { index: 99 }, // Simula index fora dos limites
    });
    expect(result).toBeNull();
  });
});

// NOVA SUÍTE DE TESTES: CHOOSE_CORRECT_EXAMPLE
describe('evaluateExerciseDeterministic - CHOOSE_CORRECT_EXAMPLE', () => {
  const commonInput = {
    nativeLanguage: 'portuguese',
    targetLanguage: 'english',
    type: 'CHOOSE_CORRECT_EXAMPLE' as ExerciseType,
    payload: {
      word: 'run',
      options: [
        'I run every morning.', // Correta
        'He runs a company.',
        'They are running late.',
        'The water runs cold.',
      ],
      correctIndex: 0, // 'I run every morning.'
    },
    userResponse: {
      index: 0, // Resposta do usuário: 'I run every morning.'
    },
    expected: {
      word: 'run',
      translation: 'correr', // Ou outro que faça sentido
      payload: {},
    },
    direction: 'WORD_TO_TRANSLATION' as const, // Ou outro que faça sentido
  };

  it('should return CORRECT for the correct example', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { index: 0 }, // Escolhe a opção correta
    });
    expect(result).toEqual({
      verdict: 'CORRECT',
      outcome: 'KNOWN',
      feedback: 'Correct.',
      score: 1,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return INCORRECT for an incorrect example', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { index: 1 }, // Escolhe uma opção incorreta
    });
    expect(result).toEqual({
      verdict: 'INCORRECT',
      outcome: 'UNKNOWN',
      feedback: 'Incorrect. Correct example: I run every morning.', // Feedback deve refletir a opção correta
      score: 0,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return null if payload options are missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      payload: { ...commonInput.payload, options: undefined }, // Simula opções ausentes
    });
    expect(result).toBeNull();
  });

  it('should return null if payload correctIndex is missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      payload: { ...commonInput.payload, correctIndex: undefined }, // Simula correctIndex ausente
    });
    expect(result).toBeNull();
  });

  it('should return null if userResponse index is missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { index: undefined }, // Simula userResponse index ausente
    });
    expect(result).toBeNull();
  });

  it('should return null if userResponse index is out of bounds', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { index: 99 }, // Simula index fora dos limites
    });
    expect(result).toBeNull();
  });
});

describe('evaluateExerciseDeterministic - DICTATION', () => {
  const commonInput = {
    nativeLanguage: 'portuguese',
    targetLanguage: 'english',
    type: 'DICTATION' as ExerciseType,
    payload: {
      textToDictate: 'The quick brown fox jumps over the lazy dog.',
    },
    userResponse: {
      text: 'The quick brown fox jumps over the lazy dog.',
    },
    expected: {
      word: 'fox', // Exemplo de palavra esperada
      translation: 'raposa', // Exemplo de tradução
      payload: {},
    },
    direction: 'WORD_TO_TRANSLATION' as const, // Ou outro que faça sentido
  };

  it('should return CORRECT for a perfectly matching dictation', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { text: 'The quick brown fox jumps over the lazy dog.' },
    });
    expect(result).toEqual({
      verdict: 'CORRECT',
      outcome: 'KNOWN',
      feedback: 'Correct.',
      score: 1,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return CORRECT for dictation with different casing or extra spaces (normalized)', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { text: '  the QUICK brown FOX jumps over the LAZY dog.  ' },
    });
    expect(result).toEqual({
      verdict: 'CORRECT',
      outcome: 'KNOWN',
      feedback: 'Correct.',
      score: 1,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return INCORRECT for a dictation with a different word', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { text: 'The quick black fox jumps over the lazy dog.' }, // 'black' instead of 'brown'
    });
    expect(result).toEqual({
      verdict: 'INCORRECT',
      outcome: 'UNKNOWN',
      feedback: 'Incorrect. Expected: The quick brown fox jumps over the lazy dog.',
      score: 0,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return null if payload textToDictate is missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      payload: { ...commonInput.payload, textToDictate: undefined }, // Simula textToDictate ausente
    });
    expect(result).toBeNull();
  });

  it('should return null if userResponse text is missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { text: undefined }, // Simula userResponse text ausente
    });
    expect(result).toBeNull();
  });
});

// NOVA SUÍTE DE TESTES: DICTATION
describe('evaluateExerciseDeterministic - DICTATION', () => {
  const commonInput = {
    nativeLanguage: 'portuguese',
    targetLanguage: 'english',
    type: 'DICTATION' as ExerciseType,
    payload: {
      textToDictate: 'The quick brown fox jumps over the lazy dog.',
    },
    userResponse: {
      text: 'The quick brown fox jumps over the lazy dog.',
    },
    expected: {
      word: 'The quick brown fox jumps over the lazy dog.',
      translation: 'A raposa marrom rápida pula sobre o cão preguiçoso.',
      payload: {},
    },
    direction: 'WORD_TO_TRANSLATION' as const, // Ou outro que faça sentido
  };

  it('should return CORRECT for a correct dictation', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { text: 'The quick brown fox jumps over the lazy dog.' },
    });
    expect(result).toEqual({
      verdict: 'CORRECT',
      outcome: 'KNOWN',
      feedback: 'Correct.',
      score: 1,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return CORRECT for a correct dictation with different casing and extra spaces', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { text: '  the QUICK brown FOX JUMPS over the LAZY dog.  ' },
    });
    expect(result).toEqual({
      verdict: 'CORRECT',
      outcome: 'KNOWN',
      feedback: 'Correct.',
      score: 1,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return INCORRECT for an incorrect dictation', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { text: 'The quick black fox jumps over the lazy cat.' },
    });
    expect(result).toEqual({
      verdict: 'INCORRECT',
      outcome: 'UNKNOWN',
      feedback: 'Incorrect. Expected: The quick brown fox jumps over the lazy dog.',
      score: 0,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return null if payload textToDictate is missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      payload: { ...commonInput.payload, textToDictate: undefined },
    });
    expect(result).toBeNull();
  });

  it('should return null if userResponse text is missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { text: undefined },
    });
    expect(result).toBeNull();
  });

  it('should return null if userResponse text is not a string', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { text: 123 as any }, // Simula um tipo incorreto
    });
    expect(result).toBeNull();
  });
});

describe('evaluateExerciseDeterministic - MATCH', () => {
  const commonInput = {
    nativeLanguage: 'portuguese',
    targetLanguage: 'english',
    type: 'MATCH' as ExerciseType,
    payload: {
      pairs: [
        { word: 'apple', translation: 'maçã' },
        { word: 'banana', translation: 'banana' },
        { word: 'orange', translation: 'laranja' },
      ],
    },
    userResponse: {
      matches: [
        { word: 'apple', translation: 'maçã' },
        { word: 'banana', translation: 'banana' },
        { word: 'orange', translation: 'laranja' },
      ],
    },
    expected: {
      word: 'apple',
      translation: 'maçã',
      payload: {},
    },
    direction: 'WORD_TO_TRANSLATION' as const, // Ou outro que faça sentido
  };

  it('should return CORRECT for all correct matches', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: {
        matches: [
          { word: 'apple', translation: 'maçã' },
          { word: 'banana', translation: 'banana' },
          { word: 'orange', translation: 'laranja' },
        ],
      },
    });
    expect(result).toEqual({
      verdict: 'CORRECT',
      outcome: 'KNOWN',
      feedback: 'Perfect match.',
      score: 1,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return PARTIAL for some correct matches', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: {
        matches: [
          { word: 'apple', translation: 'maçã' }, // Correto
          { word: 'banana', translation: 'laranja' }, // Incorreto
          { word: 'orange', translation: 'banana' }, // Incorreto
        ],
      },
    });
    expect(result).toEqual({
      verdict: 'PARTIAL',
      outcome: 'UNKNOWN',
      feedback: 'Some matches are correct.',
      score: 1 / 3, // 1 de 3 corretos
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return INCORRECT for no correct matches', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: {
        matches: [
          { word: 'apple', translation: 'banana' },
          { word: 'banana', translation: 'laranja' },
          { word: 'orange', translation: 'maçã' },
        ],
      },
    });
    expect(result).toEqual({
      verdict: 'INCORRECT',
      outcome: 'UNKNOWN',
      feedback: 'Most matches are incorrect.',
      score: 0,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should handle different casing and spaces in matches (normalized)', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: {
        matches: [
          { word: ' APPLE ', translation: ' MAÇÃ ' },
          { word: 'banana', translation: 'banana' },
          { word: 'orange', translation: 'laranja' },
        ],
      },
    });
    expect(result).toEqual({
      verdict: 'CORRECT',
      outcome: 'KNOWN',
      feedback: 'Perfect match.',
      score: 1,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return null if payload pairs are missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      payload: { ...commonInput.payload, pairs: undefined },
    });
    expect(result).toBeNull();
  });

  it('should return null if userResponse matches are missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { matches: undefined },
    });
    expect(result).toBeNull();
  });

  it('should return null if a pair in payload is malformed', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      payload: { pairs: [{ word: 'apple', translation: 123 as any }] }, // Malformado
    });
    expect(result).toBeNull();
  });

  it('should return null if a match in userResponse is malformed', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { matches: [{ word: 'apple', translation: 123 as any }] }, // Malformado
    });
    expect(result).toBeNull();
  });

  it('should return null if payload pairs is empty', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      payload: { pairs: [] },
    });
    expect(result).toBeNull();
  });
});

describe('evaluateExerciseDeterministic - WORD_ORDER', () => {
  const commonInput = {
    nativeLanguage: 'portuguese',
    targetLanguage: 'english',
    type: 'WORD_ORDER' as ExerciseType,
    payload: {
      targetSentence: 'The quick brown fox.',
    },
    userResponse: {
      tokens: ['The', 'quick', 'brown', 'fox.'],
    },
    expected: {
      word: 'The quick brown fox.',
      translation: 'A raposa marrom rápida.',
      payload: {},
    },
    direction: 'WORD_TO_TRANSLATION' as const, // Ou outro que faça sentido
  };

  it('should return CORRECT for the correct word order', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { tokens: ['The', 'quick', 'brown', 'fox.'] },
    });
    expect(result).toEqual({
      verdict: 'CORRECT',
      outcome: 'KNOWN',
      feedback: 'Correct order.',
      score: 1,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return CORRECT for correct word order with different casing and extra spaces (normalized)', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { tokens: ['  the  ', 'QUICK', 'brown', 'FOX.  '] },
    });
    expect(result).toEqual({
      verdict: 'CORRECT',
      outcome: 'KNOWN',
      feedback: 'Correct order.',
      score: 1,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return INCORRECT for an incorrect word order', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { tokens: ['Quick', 'the', 'fox', 'brown.'] },
    });
    expect(result).toEqual({
      verdict: 'INCORRECT',
      outcome: 'UNKNOWN',
      feedback: 'Incorrect order.',
      score: 0,
      aiModel: 'deterministic-v1',
      latencyMs: 0,
    });
  });

  it('should return null if payload targetSentence is missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      payload: { ...commonInput.payload, targetSentence: undefined },
    });
    expect(result).toBeNull();
  });

  it('should return null if userResponse tokens are missing', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { tokens: undefined },
    });
    expect(result).toBeNull();
  });

  it('should return null if userResponse tokens is not an array', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { tokens: 'not an array' as any },
    });
    expect(result).toBeNull();
  });

  it('should return null if userResponse tokens contains non-string elements', () => {
    const result = evaluateExerciseDeterministic({
      ...commonInput,
      userResponse: { tokens: ['The', 123, 'fox.'] as any },
    });
    expect(result).toBeNull();
  });
});