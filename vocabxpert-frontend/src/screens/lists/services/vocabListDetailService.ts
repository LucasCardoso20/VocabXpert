import { appStorage } from '../../../storage/appStorage';
import apiClient from '../../../api/client';

export type VocabListItem = {
  id: string;
  word: string;
  wordNormalized?: string;
  translation: string | null;
  createdAt?: string;
};

export type VocabListDetail = {
  id: string;
  name: string;
  items: VocabListItem[];
};

type GetListsResponse = {
  items: { id: string; name: string; isDefault: boolean; createdAt?: string }[];
};

type GetListVocabsResponse = {
  items: VocabListItem[];
};

export async function fetchVocabListDetail(listId: string): Promise<VocabListDetail> {
  const userId = await appStorage.getItem('x-user-id');
  if (!userId) throw new Error('USER_ID_NOT_FOUND');

  const headers = { 'x-user-id': userId };

  // 1) Busca nome da lista via GET /lists
  // 2) Busca vocabs via GET /lists/:listId/vocabs
  const [listsRes, vocabsRes] = await Promise.all([
    apiClient.get<GetListsResponse>('/lists', { headers, timeout: 20000 }),
    apiClient.get<GetListVocabsResponse>(`/lists/${listId}/vocabs`, { headers, timeout: 20000 }),
  ]);

  const list = listsRes.data?.items?.find((l) => l.id === listId);

  return {
    id: listId,
    name: list?.name ?? 'Lista',
    items: vocabsRes.data?.items ?? [],
  };
}