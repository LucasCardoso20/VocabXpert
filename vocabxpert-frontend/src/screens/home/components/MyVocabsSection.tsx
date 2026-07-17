import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  LayoutChangeEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { radio } from '../../../theme/radio';
import { VocabCard } from '../types';

function chunk<T>(arr: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < arr.length; i += size) pages.push(arr.slice(i, i + size));
  return pages;
}

interface Props {
  vocabs: VocabCard[];
  onAddVocab?: () => void;
  onStartQuiz?: () => void;
  onPressVocab?: (vocab: VocabCard) => void;
  onPressSound?: (vocab: VocabCard) => void;
}

export default function MyVocabsSection({
  vocabs,
  onAddVocab,
  onStartQuiz,
  onPressVocab,
  onPressSound,
}: Props) {
  const pages = useMemo(() => chunk(vocabs, 4), [vocabs]);
  const listRef = useRef<FlatList<VocabCard[]>>(null);

  const [pageWidth, setPageWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setPageWidth(e.nativeEvent.layout.width);
  };

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!pageWidth) return;
    const page = Math.round(e.nativeEvent.contentOffset.x / pageWidth);
    setCurrentPage(page);
  };

  const goToPage = (index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true });
    setCurrentPage(index);
  };

  if (vocabs.length === 0) {
    return (
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.title}>My Vocabs</Text>
          <Pressable
            style={styles.addBtn}
            onPress={() => {
              console.log('[MyVocabsSection] add pressed');
              onAddVocab?.();
            }}
          >
            <Ionicons name="add" size={14} color="#fff" />
          </Pressable>
        </View>

        <Text style={styles.emptyText}>Nenhum vocabulário encontrado.</Text>

        <Pressable style={styles.primaryBtn} onPress={onStartQuiz}>
          <Text style={styles.primaryBtnText}>Teste Seu Conhecimento!</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      {/* Header com + */}
      <View style={styles.header}>
        <Text style={styles.title}>My Vocabs</Text>
        <Pressable style={styles.addBtn} onPress={onAddVocab}>
          <Ionicons name="add" size={14} color="#fff" />
        </Pressable>
      </View>

      {/* Carrossel */}
      <View onLayout={onLayout}>
        <FlatList
          ref={listRef}
          data={pages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumEnd}
          keyExtractor={(_, i) => `page-${i}`}
          getItemLayout={(_, index) => ({
            length: pageWidth || 1,
            offset: (pageWidth || 1) * index,
            index,
          })}
          onScrollToIndexFailed={() => {}}
          renderItem={({ item }) => (
            <View style={[styles.page, { width: pageWidth || '100%' }]}>
              <View style={styles.grid}>
                {item.map((card) => (
                  <Pressable
                    key={card.id}
                    style={styles.card}
                    onPress={() => onPressVocab?.(card)}
                  >
                    <Pressable
                      style={styles.soundBtn}
                      onPress={(e) => {
                        e.stopPropagation();
                        onPressSound?.(card);
                      }}
                    >
                      <Ionicons name="volume-medium-outline" size={15} color={colors.light} />
                    </Pressable>

                    <Text style={styles.word} numberOfLines={2}>
                      {card.word}
                    </Text>
                    <Text style={styles.translation} numberOfLines={1}>
                      {card.translation}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        />
      </View>

      {/* Dots */}
      <View style={styles.dots}>
        {pages.map((_, i) => (
          <Pressable
            key={`dot-${i}`}
            onPress={() => goToPage(i)}
            style={[styles.dot, currentPage === i && styles.dotActive]}
          />
        ))}
      </View>

      {/* CTA */}
      <Pressable style={styles.primaryBtn} onPress={onStartQuiz}>
        <Text style={styles.primaryBtnText}>Teste Seu Conhecimento!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    marginHorizontal: spacing.s4,
    marginBottom: spacing.s4,
    paddingHorizontal: spacing.s4,
    paddingTop: spacing.s5,
    paddingBottom: spacing.s5,
    shadowColor: '#0D1B42',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s4,
  },
  title: {
    fontSize: 17,
    color: colors.text,
    fontFamily: 'DM Sans Bold',
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: radio.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
  },

  page: {},
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.s3,
  },
  card: {
    width: '48%',
    minHeight: 96,
    borderRadius: radio.md,
    backgroundColor: '#F2F5FF',
    padding: spacing.s3,
    position: 'relative',
  },
  soundBtn: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  word: {
    marginTop: 2,
    paddingRight: 22,
    fontSize: 13,
    lineHeight: 18,
    color: colors.text,
    fontFamily: 'DM Sans SemiBold',
    flex: 1,
  },
  translation: {
    marginTop: spacing.s2,
    fontSize: 11.5,
    color: colors.muted,
    fontFamily: 'DM Sans',
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginVertical: spacing.s4,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: radio.full,
    backgroundColor: colors.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },

  primaryBtn: {
    height: 52,
    borderRadius: radio.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 20,
    elevation: 3,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'DM Sans SemiBold',
    letterSpacing: -0.1,
  },

  emptyText: {
    fontSize: 13,
    color: colors.muted,
    fontFamily: 'DM Sans',
    marginBottom: spacing.s4,
  },
});