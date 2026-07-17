export type VocabCard = {
  id: string;
  word: string;
  translation: string;
};

export type VocabList = {
  id: string;
  title: string;
  count: number;
};

export const myVocabs: VocabCard[] = [
  { id: '1', word: 'Acknowledge', translation: 'reconhecer' },
  { id: '2', word: 'My mother always cheers...', translation: 'Minha mãe sempre torce...' },
  { id: '3', word: 'Lake', translation: 'Lago' },
  { id: '4', word: 'Jogging', translation: 'Corrida' },
  { id: '5', word: 'Resilience', translation: 'Resiliência' },
  { id: '6', word: 'Endeavor', translation: 'Empenho' },
  { id: '7', word: 'Threshold', translation: 'Limiar' },
  { id: '8', word: 'Bliss', translation: 'Felicidade' },
];

export const vocabLists: VocabList[] = [
  { id: 'futebol', title: 'Vocabulários de Futebol', count: 10 },
  { id: 'gerais', title: 'Vocabulários Gerais', count: 5 },
];