// app/onboarding/step1.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import SelectionBox from '../../src/components/onboarding/SelectionBox';
import LanguageDropdown from '../../src/components/onboarding/LanguageDropdown';
import SearchIcon from '../../src/components/icons/SearchIcon';
import OnboardingButton from '../../src/components/onboarding/OnboardingButton';
import ArrowLeftIcon from '../../src/components/icons/ArrowLeftIcon'; // Import ArrowLeftIcon
import { languages } from '../../src/data/onboardingData';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { radio } from '../../src/theme/radio';
import { getShadow } from '../../src/theme/shadows';

interface Step1Props {
  nativeLanguage: string | null;
  targetLanguage: string | null;
  onNativeLanguageChange: (langId: string) => void;
  onTargetLanguageChange: (langId: string) => void;
  onNext: () => void;
  onBack: () => void; // ✅ Adicionado onBack prop
  currentStep: number; // ✅ Adicionado currentStep
  totalSteps: number; // ✅ Adicionado totalSteps
}

const OnboardingStep1: React.FC<Step1Props> = ({
  nativeLanguage,
  targetLanguage,
  onNativeLanguageChange,
  onTargetLanguageChange,
  onNext,
  onBack,
  currentStep,
  totalSteps,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const progress = (currentStep / totalSteps) * 100;

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) && lang.id !== nativeLanguage
  );

  const isNextDisabled = !nativeLanguage || !targetLanguage;

  return (
    <View style={styles.fullScreen}>
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Qual é o seu idioma nativo?</Text>
        <LanguageDropdown
          label="Idioma Nativo"
          selectedLanguageId={nativeLanguage}
          onSelectLanguage={onNativeLanguageChange}
        />

        <Text style={styles.title}>Qual idioma você quer aprender?</Text>
        <View style={[styles.searchInputContainer, getShadow('sh1')]}>
          <SearchIcon color={colors.light} size={18} />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar..."
            placeholderTextColor={colors.light}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.languageOptions}>
          {filteredLanguages.map((lang) => (
            <SelectionBox
              key={lang.id}
              label={lang.name}
              icon={<Text style={styles.flagIcon}>{lang.flag}</Text>}
              isSelected={targetLanguage === lang.id}
              onPress={() => onTargetLanguageChange(lang.id)}
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
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radio.md,
    paddingHorizontal: spacing.s4,
    height: 52,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: spacing.s4,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.s2,
    fontSize: 15,
    fontFamily: 'DM Sans',
    color: colors.text,
  },
  languageOptions: {
    marginTop: spacing.s3,
  },
  flagIcon: {
    fontSize: 20,
  },
});

export default OnboardingStep1;