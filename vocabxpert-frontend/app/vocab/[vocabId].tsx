// app/vocab/[vocabId].tsx
import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import * as Speech from 'expo-speech';

import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { radio } from '../../src/theme/radio';

import { fetchVocabDetail, type VocabDetail } from '../../src/screens/vocab/services/vocabDetailService';

type TabKey = 'examples' | 'notes';

export default function VocabDetailScreen() {
  const router = useRouter();
  const { vocabId } = useLocalSearchParams<{ vocabId: string }>();

  const [activeTab, setActiveTab] = useState<TabKey>('examples');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<VocabDetail | null>(null);

  const load = useCallback(async () => {
    if (!vocabId) return;

    try {
      setLoading(true);
      setError(null);

      const data = await fetchVocabDetail(vocabId);
      setDetail(data);
    } catch (e: any) {
      console.error('Erro ao carregar vocab detail:', e?.response?.data || e?.message || e);
      setError('Não foi possível carregar este vocabulário.');
    } finally {
      setLoading(false);
    }
  }, [vocabId]);

  // Recarrega sempre que a tela ganhar foco (ex: voltou de outra tela)
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const badgeText = useMemo(() => {
    // No seu backend atual eu não vi "partOfSpeech" no schema.
    // Mantemos um placeholder elegante até você adicionar no backend.
    return 'Vocab';
  }, []);

  const onSpeak = useCallback(() => {
    const word = detail?.word?.trim();
    if (!word) return;

    Speech.stop();
    Speech.speak(word, {
      language: 'en',
      rate: 0.95,
      pitch: 1.0,
    });
  }, [detail?.word]);

  const onPractice = useCallback(() => {
    // Ajuste a rota conforme seu app (ex: /study/exercise?vocabId=...)
    router.push({
      pathname: '/study/exercise',
      params: { vocabId: String(vocabId) },
    });
  }, [router, vocabId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !detail) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error ?? 'Vocab não encontrado.'}</Text>
        <Pressable style={styles.retryBtn} onPress={load}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </Pressable>
        <Pressable style={styles.backBtnInline} onPress={() => router.back()}>
          <Text style={styles.backBtnInlineText}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.innerHeader}>
          <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={10}>
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </Pressable>

          <Text style={styles.innerTitle}>Vocab</Text>

          {/* espaço pra manter centralizado */}
          <View style={{ width: 36 }} />
        </View>

        {/* Hero card */}
        <View style={styles.heroCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>

          <Text style={styles.word}>{detail.word}</Text>

          {/* Se você tiver fonética no backend no futuro, pluga aqui */}
          {/* <Text style={styles.phonetic}>/əkˈnɒlɪdʒ/</Text> */}

          <Text style={styles.translation}>{detail.translation ?? ''}</Text>

          <Pressable style={styles.soundPill} onPress={onSpeak}>
            <Ionicons name="volume-high-outline" size={16} color="#fff" />
            <Text style={styles.soundPillText}>Ouvir pronúncia</Text>
          </Pressable>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <Pressable
            onPress={() => setActiveTab('examples')}
            style={[styles.tabBtn, activeTab === 'examples' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'examples' && styles.tabTextActive]}>
              Exemplos
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('notes')}
            style={[styles.tabBtn, activeTab === 'notes' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, activeTab === 'notes' && styles.tabTextActive]}>
              Notas
            </Text>
          </Pressable>
        </View>

        {/* Panel: exemplos */}
        {activeTab === 'examples' ? (
          <View style={{ gap: spacing.s3 }}>
            {detail.examples?.length ? (
              detail.examples.map((ex) => (
                <View key={ex.id} style={styles.exampleCard}>
                  <Text style={styles.exampleEn}>"{ex.text}"</Text>
                  {/* Seu protótipo tem EN + PT; hoje o backend retorna só text.
                      Quando você adicionar tradução do exemplo, mostramos aqui. */}
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>Nenhum exemplo disponível.</Text>
            )}
          </View>
        ) : (
          /* Panel: notas */
          <View style={{ gap: spacing.s3 }}>
            {detail.notes?.length ? (
              detail.notes.map((n) => (
                <View key={n.id} style={styles.exampleCard}>
                  <Text style={styles.noteText}>{n.text}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>Nenhuma nota adicionada.</Text>
            )}
          </View>
        )}

        <View style={styles.bottomPad}>
          <Pressable style={styles.primaryBtn} onPress={onPractice}>
            <Text style={styles.primaryBtnText}>Praticar esta palavra</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.s4,
    paddingTop: spacing.s3,
    paddingBottom: spacing.s6,
  },

  center: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.s5,
    gap: spacing.s3,
  },
  errorText: {
    color: colors.text,
    fontFamily: 'DM Sans Medium',
    fontSize: 14,
    textAlign: 'center',
  },
  retryBtn: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: spacing.s4,
    paddingVertical: spacing.s2,
  },
  retryText: { color: '#fff', fontFamily: 'DM Sans SemiBold', fontSize: 13 },
  backBtnInline: { paddingVertical: spacing.s2 },
  backBtnInlineText: { color: colors.primary, fontFamily: 'DM Sans SemiBold' },

  innerHeader: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.s3,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: radio.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerTitle: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'DM Sans Bold',
  },

  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.s5,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.s4,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(79,70,229,0.12)',
    marginBottom: spacing.s3,
  },
  badgeText: {
    color: colors.primary,
    fontFamily: 'DM Sans SemiBold',
    fontSize: 12,
  },
  word: {
    fontSize: 22,
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    marginBottom: spacing.s2,
  },
  translation: {
    fontSize: 15,
    color: colors.muted,
    fontFamily: 'DM Sans Medium',
    marginBottom: spacing.s4,
  },
  soundPill: {
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  soundPillText: {
    color: '#fff',
    fontFamily: 'DM Sans SemiBold',
    fontSize: 13,
  },

  tabs: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.s4,
  },
  tabBtn: {
    flex: 1,
    height: 44,
    borderRadius: 999,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabBtnActive: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  tabText: {
    fontFamily: 'DM Sans SemiBold',
    fontSize: 13,
    color: colors.muted,
  },
  tabTextActive: {
    color: colors.text,
  },

  exampleCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.s4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  exampleEn: {
    color: colors.text,
    fontFamily: 'DM Sans Medium',
    fontSize: 13.5,
    lineHeight: 19,
  },
  noteText: {
    color: colors.text,
    fontFamily: 'DM Sans',
    fontSize: 13.5,
    lineHeight: 19,
  },
  emptyText: {
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 13,
  },

  bottomPad: { marginTop: spacing.s5 },
  primaryBtn: {
    height: 52,
    borderRadius: radio.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontFamily: 'DM Sans SemiBold',
    fontSize: 15,
  },
});