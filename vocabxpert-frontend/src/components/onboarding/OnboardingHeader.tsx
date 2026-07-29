// src/components/onboarding/OnboardingHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radio } from '../../theme/radio';

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void; // Optional custom back handler
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({ currentStep, totalSteps, onBack }) => {
  const router = useRouter();
  const progress = (currentStep / totalSteps) * 100;

  const handleBackPress = () => {
    if (onBack) {
      onBack();
    } else {
      router.back(); // Default router back
    }
  };

  return (
    <View style={styles.header}>
      {currentStep > 1 ? ( // Show back button only from step 2 onwards
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <ArrowLeftIcon color={colors.text} size={24} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButtonPlaceholder} /> // Placeholder to maintain layout
      )}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>{currentStep}/{totalSteps}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.s4,
    paddingTop: spacing.s5, // Ajuste para SafeArea
    backgroundColor: colors.background,
    width: '100%',
    marginTop: spacing.s5,
  },
  backButton: {
    padding: spacing.s2,
  },
  backButtonPlaceholder: {
    width: 24 + spacing.s2 * 2, // Match back button size for alignment
  },
  progressBarContainer: {
    flex: 1,
    height: 12, // ✅ Ajustado para 12px de altura
    backgroundColor: colors.border,
    borderRadius: radio.full,
    marginHorizontal: spacing.s4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radio.full,
  },
  progressText: {
    fontSize: 13,
    fontFamily: 'DM Sans SemiBold',
    color: colors.muted,
  },
});

export default OnboardingHeader;