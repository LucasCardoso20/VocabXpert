import * as SecureStore from 'expo-secure-store';
import apiClient from '../../../api/client';
import { HomeData, VocabCard, VocabList } from '../types';

type ApiList = {
  id: string;
  name: string;
  isDefault: boolean;
  createdAt: string;
};

type ApiVocab = {
  id: string;
  word: string;
  wordNormalized: string;
  translation: string | null;
  createdAt: string;
};

export async function fetchHomeData(): Promise<HomeData> {
  const userId = await SecureStore.getItemAsync('x-user-id');
  const storedDefaultListId = await SecureStore.getItemAsync('default-list-id');

  if (!userId) {
    throw new Error('x-user-id não encontrado no SecureStore');
  }

  const headers = { 'x-user-id': userId };

  // 1) listas do usuário
  const listsResponse = await apiClient.get('/lists', { headers });
  const rawLists: ApiList[] = listsResponse.data?.items ?? [];

  // escolhe a lista default (prioriza SecureStore, depois isDefault)
  const fallbackDefault = rawLists.find((l) => l.isDefault)?.id ?? rawLists[0]?.id;
  const defaultListId = storedDefaultListId || fallbackDefault;

  // 2) vocabs da lista default (para "My Vocabs")
  let defaultVocabs: ApiVocab[] = [];
  if (defaultListId) {
    const vocabsResponse = await apiClient.get(`/lists/${defaultListId}/vocabs`, { headers });
    defaultVocabs = vocabsResponse.data?.items ?? [];
  }

  // 3) contar vocabs de cada lista (temporário até backend devolver count no /lists)
  const countsByListId = new Map<string, number>();
  const countRequests = await Promise.allSettled(
    rawLists.map((list) => apiClient.get(`/lists/${list.id}/vocabs`, { headers }))
  );

  rawLists.forEach((list, index) => {
    const result = countRequests[index];
    if (result.status === 'fulfilled') {
      const items: ApiVocab[] = result.value.data?.items ?? [];
      countsByListId.set(list.id, items.length);
    } else {
      countsByListId.set(list.id, 0);
    }
  });

  const vocabs: VocabCard[] = defaultVocabs.slice(0, 10).map((v) => ({
    id: v.id,
    word: v.word,
    translation: v.translation ?? '-',
  }));

  const lists: VocabList[] = rawLists.map((l) => ({
    id: l.id,
    title: l.name,
    count: countsByListId.get(l.id) ?? 0,
  }));

  return { vocabs, lists };
}