// src/components/onboarding/OnboardingButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radio } from '../../theme/radio';
import { getShadow } from '../../theme/shadows';

interface OnboardingButtonProps {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  isPrimary?: boolean;
  isDisabled?: boolean;
}

const OnboardingButton: React.FC<OnboardingButtonProps> = ({
  label,
  onPress,
  isLoading = false,
  isPrimary = true,
  isDisabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        isDisabled && styles.disabledButton,
        isPrimary ? getShadow('shPrimary') : getShadow('sh1'),
      ]}
      onPress={onPress}
      disabled={isLoading || isDisabled}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={isPrimary ? '#fff' : colors.primary} />
      ) : (
        <Text style={[styles.buttonText, isPrimary ? styles.primaryButtonText : styles.secondaryButtonText]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radio.full,
    paddingVertical: spacing.s4,
    paddingHorizontal: spacing.s8,
    marginTop: spacing.s5,
    marginBottom: spacing.s3,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1.5,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'DM Sans SemiBold',
    letterSpacing: -0.1,
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: colors.text,
  },
});

export default OnboardingButton;