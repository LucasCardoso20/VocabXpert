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

export type HomeData = {
  vocabs: VocabCard[];
  lists: VocabList[];
};