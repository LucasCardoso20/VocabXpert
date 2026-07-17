// src/components/onboarding/SelectionBox.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CheckmarkIcon from '../icons/CheckmarkIcon';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radio } from '../../theme/radio';
import { getShadow } from '../../theme/shadows';

interface SelectionBoxProps {
  label: string;
  description?: string; // Para níveis
  icon?: React.ReactNode; // Para bandeiras ou ícones de gráfico
  isSelected: boolean;
  onPress: () => void;
  isMultiSelect?: boolean; // Para interesses
}

const SelectionBox: React.FC<SelectionBoxProps> = ({ label, description, icon, isSelected, onPress, isMultiSelect = false }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
        getShadow('sh1'), // Aplicar sombra
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.textContainer}>
          <Text style={[styles.label, isSelected && styles.selectedLabel]}>{label}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </View>
      {isSelected && (
        <View style={styles.checkmarkContainer}>
          <CheckmarkIcon color={colors.primary} size={20} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radio.md,
    paddingVertical: spacing.s4,
    paddingHorizontal: spacing.s5,
    marginBottom: spacing.s3,
    borderWidth: 1.5,
    borderColor: colors.border,
    width: '100%',
  },
  selectedContainer: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: spacing.s3,
    width: 24, // Fixar largura para alinhamento
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontFamily: 'DM Sans Medium',
    color: colors.text,
  },
  selectedLabel: {
    fontFamily: 'DM Sans SemiBold',
    color: colors.primary,
  },
  description: {
    fontSize: 12,
    fontFamily: 'DM Sans',
    color: colors.muted,
    marginTop: spacing.s1,
  },
  checkmarkContainer: {
    marginLeft: spacing.s3,
  },
});

export default SelectionBox;