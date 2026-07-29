import { evaluateDeterministicExercise } from '../evaluateDeterministicExercise';
// Describe é uma suíte de testes, um agrupamento lógico de testes relacionados.
// O primeiro argumento é uma descrição, o segundo é uma função que contém os testes.
describe('evaluateDeterministicExercise - FLASHCARD', () => {
    // Define um input comum para evitar repetição em cada teste
    const commonInput = {
        nativeLanguage: 'portuguese',
        targetLanguage: 'english',
        exerciseType: 'FLASHCARD', // Indica que estamos testando FLASHCARD
        exercisePayload: {
            word: 'apple',
            translation: 'maçã',
        },
        expected: {
            word: 'apple',
            translation: 'maçã',
            payload: {}, // Não usado diretamente para FLASHCARD, mas presente no tipo
        },
    };
    // it (ou test) define um caso de teste individual.
    // O primeiro argumento é o que o teste deve fazer, o segundo é a função com a lógica do teste.
    it('should return CORRECT for a correct answer (case-insensitive)', () => {
        // AAA Pattern: Arrange (Organizar), Act (Agir), Assert (Afirmar)
        // Arrange: Prepara os dados de entrada
        const userResponse = { answer: 'maçã' };
        // Act: Executa a função que está sendo testada
        const result = evaluateDeterministicExercise({
            ...commonInput, // Usa o input comum
            userResponse, // Adiciona a resposta do usuário
        });
        // Assert: Verifica se o resultado é o esperado
        expect(result).toEqual({
            verdict: 'CORRECT',
            feedback: 'Correct.',
            score: 1,
        });
    });
    it('should return CORRECT for a correct answer with different casing', () => {
        const userResponse = { answer: 'Maçã' };
        const result = evaluateDeterministicExercise({
            ...commonInput,
            userResponse,
        });
        expect(result).toEqual({
            verdict: 'CORRECT',
            feedback: 'Correct.',
            score: 1,
        });
    });
    it('should return CORRECT for a correct answer with leading/trailing spaces', () => {
        const userResponse = { answer: '  maçã  ' };
        const result = evaluateDeterministicExercise({
            ...commonInput,
            userResponse,
        });
        expect(result).toEqual({
            verdict: 'CORRECT',
            feedback: 'Correct.',
            score: 1,
        });
    });
    it('should return INCORRECT for an incorrect answer', () => {
        const userResponse = { answer: 'banana' };
        const result = evaluateDeterministicExercise({
            ...commonInput,
            userResponse,
        });
        expect(result).toEqual({
            verdict: 'INCORRECT',
            feedback: 'Incorrect. Expected: maçã',
            score: 0,
        });
    });
    it('should return INCORRECT for an empty answer', () => {
        const userResponse = { answer: '' };
        const result = evaluateDeterministicExercise({
            ...commonInput,
            userResponse,
        });
        expect(result).toEqual({
            verdict: 'INCORRECT',
            feedback: 'Incorrect. Expected: maçã',
            score: 0,
        });
    });
    it('should return null if exercisePayload is missing', () => {
        const userResponse = { answer: 'maçã' };
        const result = evaluateDeterministicExercise({
            ...commonInput,
            exercisePayload: undefined, // Simula payload ausente
            userResponse,
        });
        expect(result).toBeNull();
    });
    it('should return null if userResponse is missing', () => {
        const result = evaluateDeterministicExercise({
            ...commonInput,
            userResponse: undefined, // Simula userResponse ausente
        });
        expect(result).toBeNull();
    });
});
