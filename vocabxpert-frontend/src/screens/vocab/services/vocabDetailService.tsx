import * as SecureStore from 'expo-secure-store';
import apiClient from '../../../api/client';

export type VocabExample = {
  id: string;
  text: string;
};

export type VocabNote = {
  id: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
};

export type VocabDetail = {
  id: string;
  word: string;
  wordNormalized?: string;
  translation: string | null;
  listId: string;
  examples: VocabExample[];
  notes: VocabNote[];
};

export async function fetchVocabDetail(vocabId: string): Promise<VocabDetail> {
  const userId = await SecureStore.getItemAsync('x-user-id');
  if (!userId) throw new Error('USER_ID_NOT_FOUND');

  const { data } = await apiClient.get(`/vocabs/${vocabId}`, {
    headers: { 'x-user-id': userId },
    timeout: 20000,
  });

  // Ajuste fino caso o backend embrulhe em { ok: true, ... }
  return data as VocabDetail;
}