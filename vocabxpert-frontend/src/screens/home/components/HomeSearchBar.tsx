import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next'; // Importe o hook useTranslation
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { radio } from '../../../theme/radio';

export default function HomeSearchBar() {
  const { t } = useTranslation(); // Inicialize o hook de tradução

  return (
    <View style={styles.wrap}>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color={colors.light} />
        <TextInput
          style={styles.input}
          placeholder={t('home.searchBar.placeholder')}
          placeholderTextColor={colors.light}
        />
      </View>

      <Pressable style={styles.filterBtn}>
        <Ionicons name="options-outline" size={18} color={colors.muted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s3,
    paddingHorizontal: spacing.s5,
    paddingBottom: spacing.s4,
  },
  searchBar: {
    flex: 1,
    height: 50,
    borderRadius: radio.md,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.s4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s3,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontFamily: 'DM Sans',
  },
  filterBtn: {
    width: 50,
    height: 50,
    borderRadius: radio.md,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});