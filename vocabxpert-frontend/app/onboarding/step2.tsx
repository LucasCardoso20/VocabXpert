// app/onboarding/step2.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SelectionBox from '../../src/components/onboarding/SelectionBox';
import GraphIcon from '../../src/components/icons/GraphIcon';
import OnboardingButton from '../../src/components/onboarding/OnboardingButton';
import ArrowLeftIcon from '../../src/components/icons/ArrowLeftIcon'; // Import ArrowLeftIcon
import { levels } from '../../src/data/onboardingData';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { radio } from '../../src/theme/radio';

interface Step2Props {
  level: string | null;
  onLevelChange: (levelId: string) => void;
  onNext: () => void;
  onBack: () => void; // ✅ Adicionado onBack prop
  currentStep: number; // ✅ Adicionado currentStep
  totalSteps: number; // ✅ Adicionado totalSteps
}

const OnboardingStep2: React.FC<Step2Props> = ({
  level,
  onLevelChange,
  onNext,
  onBack,
  currentStep,
  totalSteps,
}) => {
  const progress = (currentStep / totalSteps) * 100;
  const isNextDisabled = !level;

  return (
    <View style={styles.fullScreen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Qual é o seu nível nesse idioma?</Text>
        <View style={styles.levelOptions}>
          {levels.map((lvl) => (
            <SelectionBox
              key={lvl.id}
              label={lvl.label}
              description={lvl.description}
              icon={<GraphIcon color={colors.primary} size={24} />}
              isSelected={level === lvl.id}
              onPress={() => onLevelChange(lvl.id)}
            />
          ))}
        </View>
      </ScrollView>
      <OnboardingButton label="Continuar" onPress={onNext} isDisabled={isNextDisabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.s4,
    paddingTop: spacing.s5, // Ajuste para SafeArea
    paddingBottom: spacing.s3,
    backgroundColor: colors.background,
    width: '100%',
  },
  backButton: {
    padding: spacing.s2,
  },
  progressBarContainer: {
    flex: 1,
    height: 12, // ✅ Increased thickness
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.s5, // Added horizontal padding
    paddingTop: spacing.s5,
    paddingBottom: spacing.s8, // Espaço para o botão
  },
  title: {
    fontSize: 16.8, // ✅ Ajustado font size
    fontFamily: 'DM Sans Bold',
    color: colors.text,
    marginBottom: spacing.s4,
  },
  levelOptions: {
    marginTop: spacing.s3,
  },
});

export default OnboardingStep2;