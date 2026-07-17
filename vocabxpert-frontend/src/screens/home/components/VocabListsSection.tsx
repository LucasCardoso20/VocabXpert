import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { radio } from '../../../theme/radio';
import { VocabList } from '../types';

interface Props {
  lists: VocabList[];
  onPressList?: (list: VocabList) => void;
  onAddList?: () => void;
}

export default function VocabListsSection({ lists, onPressList, onAddList }: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Vocabs List</Text>

        <Pressable
          style={styles.addBtn}
          onPress={() => {
            onAddList?.();
          }}
        >
          <Ionicons name="add" size={14} color="#fff" />
        </Pressable>
      </View>

      {lists.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma lista encontrada.</Text>
      ) : (
        <View style={styles.grid}>
          {lists.map((item) => (
            <Pressable
              key={item.id}
              style={styles.card}
              onPress={() => onPressList?.(item)}
            >
              <View style={styles.iconWrap}>
                <Ionicons name="document-text-outline" size={18} color={colors.primary} />
              </View>

              {/* Ajuste aqui se no seu tipo for "name" em vez de "title" */}
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </Text>

              <Text style={styles.cardCount}>
                {item.count} Flashcards
              </Text>
            </Pressable>
          ))}
        </View>
      )}
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
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.s3,
  },
  card: {
    width: '48%',
    minHeight: 110,
    borderRadius: radio.md,
    backgroundColor: '#FFF8F0',
    padding: spacing.s3,
    position: 'relative',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.s1,
  },
  cardTitle: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    paddingRight: 20,
  },
  cardCount: {
    marginTop: spacing.s1,
    fontSize: 11.5,
    color: colors.muted,
    fontFamily: 'DM Sans Medium',
  },

  emptyText: {
    fontSize: 13,
    color: colors.muted,
    fontFamily: 'DM Sans',
  },
});