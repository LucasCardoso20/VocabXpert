import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  Pressable,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

import HomeSearchBar from './components/HomeSearchBar';
import MyVocabsSection from './components/MyVocabsSection';
import VocabListsSection from './components/VocabListsSection';
import { fetchHomeData } from './services/homeService';
import { VocabCard, VocabList } from './types';

export default function HomeScreen() {
  const router = useRouter();

  const [vocabs, setVocabs] = useState<VocabCard[]>([]);
  const [lists, setLists] = useState<VocabList[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Evita duplicar o load: um no mount + outro no primeiro focus
  const didInitialLoadRef = useRef(false);

  const loadHome = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      setError(null);

      const data = await fetchHomeData();
      setVocabs(data.vocabs);
      setLists(data.lists);
    } catch (err: any) {
      console.error('Erro ao carregar Home:', err?.response?.data || err?.message);
      setError('Não foi possível carregar os dados da Home.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Primeiro carregamento
  useEffect(() => {
    (async () => {
      await loadHome(false);
      didInitialLoadRef.current = true;
    })();
  }, [loadHome]);

  // Recarrega sempre que voltar para a Home (ex: depois de criar vocab/lista)
  useFocusEffect(
    useCallback(() => {
      if (!didInitialLoadRef.current) return;
      loadHome(true);
    }, [loadHome])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryBtn} onPress={() => loadHome(false)}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => loadHome(true)} />
        }
      >
        <HomeSearchBar />

        <MyVocabsSection
          vocabs={vocabs}
          onAddVocab={() => {
            router.push('/vocab/create');
          }}
          onStartQuiz={() => {
            router.push('/study');
          }}
          onPressVocab={(vocab) => {
            router.push({
              pathname: '/vocab/[vocabId]',
              params: { vocabId: vocab.id },
            });
          }}
          onPressSound={(vocab) => {
            // sua lógica atual de fala/pronúncia
          }}
        />

        <VocabListsSection 
        lists={lists}  
        onPressList={(list) => {
            router.push({
              pathname: '/lists/[listId]',
              params: { listId: list.id },
            });
          }}/>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {refreshing && (
        <View style={styles.refreshBadge}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingTop: spacing.s2, paddingBottom: spacing.s4 },
  bottomSpacer: { height: 110 },

  center: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.s5,
  },
  errorText: {
    color: colors.text,
    fontFamily: 'DM Sans Medium',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: spacing.s3,
  },
  retryBtn: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: spacing.s4,
    paddingVertical: spacing.s2,
  },
  retryText: {
    color: '#fff',
    fontFamily: 'DM Sans SemiBold',
    fontSize: 13,
  },
  refreshBadge: {
    position: 'absolute',
    top: 12,
    right: 16,
  },
});