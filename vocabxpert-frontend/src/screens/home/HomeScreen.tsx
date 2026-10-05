// app/index.tsx (ou onde sua HomeScreen está definida)
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  Pressable,
  RefreshControl,
  Alert, // Importar Alert para exibir mensagens de erro
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import * as Speech from 'expo-speech'; // Importar expo-speech
import HomeSearchBar from './components/HomeSearchBar';
import MyVocabsSection from './components/MyVocabsSection';
import VocabListsSection from './components/VocabListsSection';
import { fetchHomeData } from './services/homeService';
import { VocabCard, VocabList } from './types';
import { useProfile } from '@/src/contexts/ProfileContext';
import HomeHeader from '@/src/components/layout/HomeHeader';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';


export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { activeLanguage, isLoadingProfile } = useProfile(); // Obter activeLanguage do contexto

  const [vocabs, setVocabs] = useState<VocabCard[]>([]);
  const [lists, setLists] = useState<VocabList[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [speakingWordId, setSpeakingWordId] = useState<string | null>(null); // Estado para controlar qual palavra está sendo falada

  // Evita duplicar o load: um no mount + outro no primeiro focus
  const didInitialLoadRef = useRef(false);

  const loadHome = useCallback(async (isRefresh = false) => {
    if (isLoadingProfile) {
      // Se o perfil ainda está carregando, não tenta carregar a home para evitar erros de activeLanguage
      return;
    }

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await fetchHomeData();
      setVocabs(data.vocabs);
      setLists(data.lists);
    } catch (err) {
      console.error("Failed to load home data:", err);
      setError(t('home.errors.loadFailed'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [isLoadingProfile, t]); // Adicionar isLoadingProfile e t como dependências

  // Recarrega a home quando o idioma ativo muda
  useEffect(() => {
    if (!isLoadingProfile && activeLanguage) {
      loadHome();
    }
  }, [activeLanguage, isLoadingProfile, loadHome]);

  useFocusEffect(
    useCallback(() => {
      if (!didInitialLoadRef.current) {
        loadHome();
        didInitialLoadRef.current = true;
      }
    }, [loadHome])
  );

  // Função para lidar com a reprodução de áudio
 const handleSpeak = useCallback(
  (vocab: VocabCard) => {
    const word = vocab.word.trim();

    if (!word) {
      Alert.alert(
        t('common.error'),
        t('vocab.myVocabs.alerts.noWordToSpeak')
      );
      return;
    }

    if (!activeLanguage?.language) {
      Alert.alert(
        t('common.error'),
        t('vocab.myVocabs.alerts.noLanguageSelected')
      );
      return;
    }

    Speech.stop();
    setSpeakingWordId(vocab.id);

    Speech.speak(word, {
      language: activeLanguage.language,
      rate: 0.95,
      pitch: 1,
      onDone: () => setSpeakingWordId(null),
      onStopped: () => setSpeakingWordId(null),
      onError: () => setSpeakingWordId(null),
    });
  },
  [activeLanguage, t]
);


  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{t('home.loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryBtn} onPress={() => loadHome(false)}>
          <Text style={styles.retryText}>{t('common.retry')}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HomeHeader /> {/* Mantém o HomeHeader aqui, se ele for um componente separado */}
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
          onPressSound={handleSpeak}
          speakingWordId={speakingWordId}
        />

        <VocabListsSection
          lists={lists}
          onPressList={(list) => {
            router.push({
              pathname: '/lists/[listId]',
              params: { listId: list.id },
            });
          }} />

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
  loadingText: {
    marginTop: spacing.s3,
    color: colors.muted,
    fontFamily: 'DM Sans Medium',
    fontSize: 16,
  },
});