import * as SecureStore from 'expo-secure-store';
import apiClient from '../../../api/client';

export type ListItem = {
  id: string;
  name: string;
  isDefault: boolean;
};

type GetListsResponse = {
  items: ListItem[];
};

export async function fetchUserLists(): Promise<ListItem[]> {
  const userId = await SecureStore.getItemAsync('x-user-id');
  if (!userId) throw new Error('USER_ID_NOT_FOUND');

  const { data } = await apiClient.get<GetListsResponse>('/lists', {
    headers: { 'x-user-id': userId },
  });

  return data?.items ?? [];
}

export async function createList(name: string): Promise<ListItem> {
  const userId = await SecureStore.getItemAsync('x-user-id');
  if (!userId) throw new Error('USER_ID_NOT_FOUND');

  const { data } = await apiClient.post(
    '/lists',
    { name: name.trim() },
    { headers: { 'x-user-id': userId } }
  );

  return data as ListItem; // { id, name, isDefault }
}

export async function previewVocab(word: string): Promise<{ translation: string; examples: string[] }> {
  const userId = await SecureStore.getItemAsync('x-user-id');
  if (!userId) throw new Error('USER_ID_NOT_FOUND');

  const { data } = await apiClient.post(
    '/vocabs/preview',
    { word: word.trim() },
    {
      headers: { 'x-user-id': userId },
      timeout: 20000,
    }
  );

  return {
    translation: data?.translation ?? '',
    examples: Array.isArray(data?.examples) ? data.examples : [],
  };
}

export async function createVocab(params: {
  listId: string;
  word: string;
  translation?: string;
  examples?: string[];
}) {
  const userId = await SecureStore.getItemAsync('x-user-id');
  if (!userId) throw new Error('USER_ID_NOT_FOUND');

  const payload = {
    listId: params.listId,
    word: params.word.trim(),
    translation: params.translation?.trim() || undefined,
    // backend: prioriza manualExamples se vierem preenchidos
    examples: (params.examples ?? []).map((t) => t.trim()).filter(Boolean).slice(0, 5),
  };

  const { data } = await apiClient.post('/vocabs', payload, {
    headers: { 'x-user-id': userId },
    timeout: 25000,
  });

  return data;
}