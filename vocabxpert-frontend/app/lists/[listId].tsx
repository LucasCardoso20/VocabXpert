import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { radio } from '../../src/theme/radio';

import {
  fetchVocabListDetail,
  type VocabListDetail,
  type VocabListItem,
} from '../../src/screens/lists/services/vocabListDetailService';

export default function VocabListDetailScreen() {
  const router = useRouter();
  const { listId } = useLocalSearchParams<{ listId: string }>();

  const [data, setData] = useState<VocabListDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState('');

  const load = useCallback(
    async (isRefresh = false) => {
      if (!listId) return;

      try {
        setError(null);
        if (isRefresh) setRefreshing(true);
        else setLoading(true);

        const res = await fetchVocabListDetail(String(listId));
        setData(res);
      } catch (e: any) {
        console.error('Erro ao carregar lista:', e?.response?.data || e?.message || e);

        const apiError = e?.response?.data?.error;
        if (apiError === 'LIST_NOT_FOUND') {
          setError('Lista não encontrada (ou não pertence ao usuário).');
        } else {
          setError('Não foi possível carregar esta lista.');
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [listId]
  );

  useFocusEffect(
    useCallback(() => {
      load(false);
    }, [load])
  );

  const filteredItems = useMemo(() => {
    const items = data?.items ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return items;

    return items.filter((v) => {
      const word = (v.word ?? '').toLowerCase();
      const translation = (v.translation ?? '').toLowerCase();
      return word.includes(q) || translation.includes(q);
    });
  }, [data?.items, query]);

  const renderItem = useCallback(
    ({ item }: { item: VocabListItem }) => (
      <Pressable
        style={styles.row}
        onPress={() => {
          router.push({
            pathname: '/vocab/[vocabId]',
            params: { vocabId: item.id },
          });
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.word} numberOfLines={1}>
            {item.word}
          </Text>
          {!!item.translation && (
            <Text style={styles.translation} numberOfLines={1}>
              {item.translation}
            </Text>
          )}
        </View>

        <Ionicons name="chevron-forward" size={18} color={colors.muted} />
      </Pressable>
    ),
    [router]
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error ?? 'Lista não encontrada.'}</Text>

        <Pressable style={styles.primaryBtn} onPress={() => load(false)}>
          <Text style={styles.primaryBtnText}>Tentar novamente</Text>
        </Pressable>

        <Pressable style={styles.secondaryBtn} onPress={() => router.back()}>
          <Text style={styles.secondaryBtnText}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()} hitSlop={10}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {data.name}
          </Text>
          <Text style={styles.headerSubtitle}>
            {data.items.length} {data.items.length === 1 ? 'palavra' : 'palavras'}
          </Text>
        </View>

        {/* Botão + já manda listId pra /vocab/create */}
        <Pressable
          style={[styles.iconBtn, styles.addBtn]}
          onPress={() => {
            router.push({
              pathname: '/vocab/create',
              params: { listId: data.id },
            });
          }}
          hitSlop={10}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={16} color={colors.muted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar palavra ou tradução..."
          placeholderTextColor={colors.light}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {!!query && (
          <Pressable onPress={() => setQuery('')} hitSlop={10}>
            <Ionicons name="close-circle" size={18} color={colors.muted} />
          </Pressable>
        )}
      </View>

      {/* List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.listContent, filteredItems.length === 0 && { flex: 1 }]}
        ItemSeparatorComponent={() => <View style={{ height: spacing.s2 }} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Nada por aqui ainda</Text>
            <Text style={styles.emptyText}>
              {query.trim() ? 'Nenhum resultado para sua busca.' : 'Adicione sua primeira palavra nesta lista.'}
            </Text>

            {!query.trim() && (
              <Pressable
                style={styles.primaryBtn}
                onPress={() =>
                  router.push({
                    pathname: '/vocab/create',
                    params: { listId: data.id },
                  })
                }
              >
                <Text style={styles.primaryBtnText}>Adicionar vocab</Text>
              </Pressable>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },

  center: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.s5,
    gap: spacing.s3,
  },

  header: {
    paddingTop: spacing.s3,
    paddingHorizontal: spacing.s4,
    paddingBottom: spacing.s2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s2,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radio.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addBtn: {
    backgroundColor: colors.primary,
    borderColor: 'transparent',
  },
  headerTitle: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'DM Sans Bold',
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: colors.muted,
    fontFamily: 'DM Sans',
  },

  searchBox: {
    marginHorizontal: spacing.s4,
    marginTop: spacing.s2,
    marginBottom: spacing.s3,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.s3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s2,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontFamily: 'DM Sans',
    fontSize: 14,
  },

  listContent: {
    paddingHorizontal: spacing.s4,
    paddingBottom: spacing.s6,
  },

  row: {
    minHeight: 64,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.s4,
    paddingVertical: spacing.s3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s3,
  },
  word: {
    fontSize: 15,
    color: colors.text,
    fontFamily: 'DM Sans SemiBold',
  },
  translation: {
    marginTop: 4,
    fontSize: 12.5,
    color: colors.muted,
    fontFamily: 'DM Sans',
  },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.s5,
    gap: spacing.s2,
  },
  emptyTitle: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'DM Sans Bold',
  },
  emptyText: {
    fontSize: 13,
    color: colors.muted,
    fontFamily: 'DM Sans',
    textAlign: 'center',
  },

  primaryBtn: {
    marginTop: spacing.s2,
    height: 48,
    borderRadius: radio.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.s5,
  },
  primaryBtnText: {
    color: '#fff',
    fontFamily: 'DM Sans SemiBold',
    fontSize: 14,
  },

  secondaryBtn: {
    height: 44,
    borderRadius: radio.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.s5,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryBtnText: {
    color: colors.text,
    fontFamily: 'DM Sans SemiBold',
    fontSize: 14,
  },

  errorText: {
    color: colors.text,
    fontFamily: 'DM Sans Medium',
    fontSize: 14,
    textAlign: 'center',
  },
});