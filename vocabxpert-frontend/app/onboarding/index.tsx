// app/onboarding/index.tsx

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import { appStorage } from '../../src/storage/appStorage';
import apiClient from '../../src/api/client';

import OnboardingHeader from '../../src/components/onboarding/OnboardingHeader';
import OnboardingStep1 from './step1';
import OnboardingStep2 from './step2';
import OnboardingStep3 from './step3';

import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';


// Tipos para o estado do onboarding
interface OnboardingData {
  nativeLanguage: string | null;
  targetLanguage: string | null;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | null;
  interests: string[];
}

const TOTAL_STEPS = 3;

const OnboardingFlow: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    nativeLanguage: null,
    targetLanguage: null,
    level: null,
    interests: [],
  });
  const [loading, setLoading] = useState(false);

const [navDirection, setNavDirection] = useState<'forward' | 'back'>('forward');

const stepOpacity = useRef(new Animated.Value(1)).current;
const stepTranslateX = useRef(new Animated.Value(0)).current;

useEffect(() => {
  stepOpacity.setValue(0);
  stepTranslateX.setValue(navDirection === 'forward' ? 24 : -24);

  Animated.parallel([
    Animated.timing(stepOpacity, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),
    Animated.timing(stepTranslateX, {
      toValue: 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),
  ]).start();
}, [currentStep, navDirection, stepOpacity, stepTranslateX]);

  const updateOnboardingData = useCallback((key: keyof OnboardingData, value: any) => {
    setOnboardingData(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleNext = useCallback(async () => {
    // Basic validation for each step
    if (currentStep === 1) {
      if (!onboardingData.nativeLanguage || !onboardingData.targetLanguage) {
        Alert.alert('Atenção', 'Por favor, selecione seu idioma nativo e o idioma que deseja aprender.');
        return;
      }
    } else if (currentStep === 2) {
      if (!onboardingData.level) {
        Alert.alert('Atenção', 'Por favor, selecione seu nível no idioma.');
        return;
      }
    } else if (currentStep === 3) {
      if (onboardingData.interests.length === 0) {
        Alert.alert('Atenção', 'Por favor, selecione pelo menos um interesse.');
        return;
      }
      // Last step, submit data
      setLoading(true);
      try {
        // ✅ AQUI É ONDE ENVIAMOS OS DADOS PARA O BACKEND
        const response = await apiClient.post('/onboarding', {
          userName: 'Usuário Anônimo', // ✅ Você pode adicionar um campo de nome na tela 1 ou 3 se quiser
          nativeLanguage: onboardingData.nativeLanguage,
          targetLanguage: onboardingData.targetLanguage,
          level: onboardingData.level,
          interests: onboardingData.interests, // ✅ Enviando como array, conforme o backend espera
          customInterests: [], // ✅ Se você tiver custom interests separados, envie aqui
          timeout: 90000, // 90 segundos para garantir que o backend tenha tempo suficiente para processar
        });

        const { userId, defaultListId } = response.data;

        // Salvar userId e defaultListId (se necessário) e marcar onboarding como completo
        await appStorage.setItem('x-user-id', userId);
        await appStorage.setItem('default-list-id', defaultListId); // Salvar a lista padrão
        await appStorage.setItem('onboarded', 'true');

        Alert.alert('Sucesso!', 'Seu perfil foi criado com sucesso!');
        router.replace('/(tabs)'); // Redireciona para a tela principal
      } catch (error: any) {
        console.error('Erro no onboarding:', error.response?.data || error.message);
        Alert.alert('Erro', 'Não foi possível completar o onboarding. Tente novamente.');
      } finally {
        setLoading(false);
      }
      return;
    }
    setNavDirection('forward');
    setCurrentStep(prev => prev + 1);
  }, [currentStep, onboardingData, router]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setNavDirection('back');
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OnboardingStep1
            nativeLanguage={onboardingData.nativeLanguage}
            targetLanguage={onboardingData.targetLanguage}
            onNativeLanguageChange={(langId) => updateOnboardingData('nativeLanguage', langId)}
            onTargetLanguageChange={(langId) => updateOnboardingData('targetLanguage', langId)}
            onNext={handleNext}
            onBack={handleBack} // ✅ Passando onBack
            currentStep={currentStep} // ✅ Passando currentStep
            totalSteps={TOTAL_STEPS} // ✅ Passando totalSteps
          />
        );
      case 2:
        return (
          <OnboardingStep2
            level={onboardingData.level}
            onLevelChange={(levelId) => updateOnboardingData('level', levelId)}
            onNext={handleNext}
            onBack={handleBack} // ✅ Passando onBack
            currentStep={currentStep} // ✅ Passando currentStep
            totalSteps={TOTAL_STEPS} // ✅ Passando totalSteps
          />
        );
      case 3:
        return (
          <OnboardingStep3
            selectedInterests={onboardingData.interests}
            onInterestToggle={(interestId) => {
              const newInterests = onboardingData.interests.includes(interestId)
                ? onboardingData.interests.filter(id => id !== interestId)
                : [...onboardingData.interests, interestId];
              updateOnboardingData('interests', newInterests);
            }}
            onNext={handleNext}
            isLoading={loading}
            onBack={handleBack} // ✅ Passando onBack
            currentStep={currentStep} // ✅ Passando currentStep
            totalSteps={TOTAL_STEPS} // ✅ Passando totalSteps
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.fullScreen}>
      <OnboardingHeader
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onBack={handleBack}
      />
      <Animated.View
        style={[
          styles.stepContainer,
          {
            opacity: stepOpacity,
            transform: [{ translateX: stepTranslateX }],
          },
        ]}
      >
        {renderStep()}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  stepContainer: {
    flex: 1,
  }
});

export default OnboardingFlow;