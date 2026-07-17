import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import SearchIcon from '../../src/components/icons/SearchIcon';
import OnboardingButton from '../../src/components/onboarding/OnboardingButton';
import { interests } from '../../src/data/onboardingData';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { radio } from '../../src/theme/radio';
import { getShadow } from '../../src/theme/shadows';

type InterestItem = {
  id: string;
  label: string;
  icon?: string; // emoji ou string do ícone
};

interface Step3Props {
  selectedInterests: string[];
  onInterestToggle: (interestId: string) => void;
  onNext: () => void;
  isLoading: boolean;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

const OnboardingStep3: React.FC<Step3Props> = ({
  selectedInterests,
  onInterestToggle,
  onNext,
  isLoading,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customInterestText, setCustomInterestText] = useState('');

  const interestsList = interests as InterestItem[];

  const filteredInterests = useMemo(
    () =>
      interestsList.filter((interest) =>
        interest.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [interestsList, searchQuery]
  );

  const customSelectedInterests = useMemo(
    () =>
      selectedInterests.filter(
        (id) => !interestsList.some((interest) => interest.id === id)
      ),
    [selectedInterests, interestsList]
  );

  const isNextDisabled =
    selectedInterests.length === 0 && customInterestText.trim().length === 0;

  const handleAddCustomInterest = () => {
    const trimmedText = customInterestText.trim();
    if (!trimmedText) return;

    if (selectedInterests.includes(trimmedText)) {
      Alert.alert('Atenção', 'Este interesse já foi adicionado.');
      return;
    }

    onInterestToggle(trimmedText);
    setCustomInterestText('');
  };

  return (
    <View style={styles.fullScreen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Quais são seus interesses?</Text>

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

        <Text style={styles.label}>Adicionar interesse personalizado:</Text>
        <View style={[styles.customInterestInputContainer, getShadow('sh1')]}>
          <TextInput
            style={styles.customInterestInput}
            placeholder="Ex: Criptomoedas, Astrofísica, Culinária Francesa..."
            placeholderTextColor={colors.light}
            value={customInterestText}
            onChangeText={setCustomInterestText}
            onSubmitEditing={handleAddCustomInterest}
          />
          <TouchableOpacity
            onPress={handleAddCustomInterest}
            style={styles.addInterestButton}
          >
            <Text style={styles.addInterestButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        {customSelectedInterests.length > 0 && (
          <View style={styles.customChipsWrap}>
            {customSelectedInterests.map((customId) => (
              <TouchableOpacity
                key={customId}
                style={styles.customChip}
                onPress={() => onInterestToggle(customId)}
                activeOpacity={0.85}
              >
                <Text style={styles.customChipText}>{customId}</Text>
                <Text style={styles.customChipRemove}>✕</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.interestGrid}>
          {filteredInterests.map((interest) => {
            const isSelected = selectedInterests.includes(interest.id);
            return (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.interestCard,
                  isSelected && styles.interestCardSelected,
                  getShadow('sh1'),
                ]}
                onPress={() => onInterestToggle(interest.id)}
                activeOpacity={0.9}
              >
                <Text style={styles.interestIcon}>{interest.icon ?? '✨'}</Text>
                <Text
                  style={[
                    styles.interestLabel,
                    isSelected && styles.interestLabelSelected,
                  ]}
                  numberOfLines={2}
                >
                  {interest.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <OnboardingButton
        label="Começar a Aprender!"
        onPress={onNext}
        isLoading={isLoading}
        isDisabled={isNextDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.s5,
    paddingTop: spacing.s5,
    paddingBottom: spacing.s8,
  },

  title: {
    fontSize: 16.8,
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

  label: {
    fontSize: 13,
    fontFamily: 'DM Sans SemiBold',
    color: colors.muted,
    marginTop: spacing.s2,
    marginBottom: spacing.s2,
    alignSelf: 'flex-start',
    width: '100%',
    letterSpacing: 0.1,
  },

  customInterestInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radio.md,
    paddingHorizontal: spacing.s4,
    height: 52,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginBottom: spacing.s3,
  },
  customInterestInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'DM Sans',
    color: colors.text,
  },
  addInterestButton: {
    marginLeft: spacing.s3,
    backgroundColor: colors.primaryMid,
    paddingVertical: spacing.s2,
    paddingHorizontal: spacing.s4,
    borderRadius: radio.full,
  },
  addInterestButtonText: {
    color: colors.primaryDark,
    fontSize: 13,
    fontFamily: 'DM Sans SemiBold',
  },

  customChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.s3,
    gap: spacing.s2,
  },
  customChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.2,
    borderColor: colors.primary,
    borderRadius: radio.full,
    paddingVertical: spacing.s2,
    paddingHorizontal: spacing.s3,
  },
  customChipText: {
    color: colors.text,
    fontFamily: 'DM Sans Medium',
    fontSize: 13,
    marginRight: spacing.s2,
  },
  customChipRemove: {
    color: colors.primary,
    fontFamily: 'DM Sans Bold',
    fontSize: 12,
  },

  // GRID 2 por linha
  interestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: spacing.s2,
  },
  interestCard: {
    width: '48%',
    minHeight: 108,
    backgroundColor: colors.surface,
    borderRadius: radio.lg ?? radio.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingVertical: spacing.s3,
    paddingHorizontal: spacing.s3,
    marginBottom: spacing.s3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  interestCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryMid,
  },
  interestIcon: {
    fontSize: 24,
    marginBottom: spacing.s2,
  },
  interestLabel: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 17,
    fontFamily: 'DM Sans Medium',
    color: colors.text,
  },
  interestLabelSelected: {
    fontFamily: 'DM Sans Bold',
    color: colors.primaryDark,
  },
});

export default OnboardingStep3;