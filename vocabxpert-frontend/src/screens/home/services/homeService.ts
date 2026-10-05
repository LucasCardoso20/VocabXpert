import { appStorage } from '../../../storage/appStorage';
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
  const userId = await appStorage.getItem('x-user-id');

  if (!userId) {
    throw new Error('x-user-id não encontrado no appStorage');
  }

  const headers = {
    'x-user-id': userId,
  };

  // 1) Busca somente as listas do idioma ativo.
  const listsResponse = await apiClient.get('/lists', { headers });
  const rawLists: ApiList[] = listsResponse.data?.items ?? [];

  /**
   * IMPORTANTE:
   *
   * Não usamos mais "default-list-id" salvo no storage.
   * Esse ID pode pertencer ao idioma anteriormente ativo.
   *
   * Exemplo:
   * - inglês ativo → default-list-id = ID da Lista Geral inglesa
   * - usuário ativa espanhol
   * - esse ID inglês não pode ser usado no contexto espanhol
   */
  const defaultList =
    rawLists.find((list) => list.isDefault) ??
    rawLists[0] ??
    null;

  // 2) Busca os vocabulários da lista padrão DO IDIOMA ATIVO.
  let defaultVocabs: ApiVocab[] = [];

  if (defaultList) {
    const vocabsResponse = await apiClient.get(
      `/lists/${defaultList.id}/vocabs`,
      { headers }
    );

    defaultVocabs = vocabsResponse.data?.items ?? [];
  }

  // 3) Conta os vocabulários de cada lista do idioma ativo.
  const countsByListId = new Map<string, number>();

  const countRequests = await Promise.allSettled(
    rawLists.map((list) =>
      apiClient.get(`/lists/${list.id}/vocabs`, { headers })
    )
  );

  rawLists.forEach((list, index) => {
    const result = countRequests[index];

    if (result.status === 'fulfilled') {
      const items: ApiVocab[] = result.value.data?.items ?? [];

      countsByListId.set(list.id, items.length);
      return;
    }

    countsByListId.set(list.id, 0);
  });

  const vocabs: VocabCard[] = defaultVocabs.slice(0, 10).map((vocab) => ({
    id: vocab.id,
    word: vocab.word,
    translation: vocab.translation ?? '-',
  }));

  const lists: VocabList[] = rawLists.map((list) => ({
    id: list.id,
    title: list.name,
    count: countsByListId.get(list.id) ?? 0,
  }));

  return {
    vocabs,
    lists,
  };
}