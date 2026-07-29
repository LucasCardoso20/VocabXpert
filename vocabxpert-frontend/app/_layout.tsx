import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { appStorage } from '@/src/storage/appStorage';
import { useAppFonts } from '@/src/theme/typography';

SplashScreen.preventAutoHideAsync();

type OnboardingStatus = 'loading' | 'completed' | 'not_completed';

export default function RootLayout() {
  const fontsLoaded = useAppFonts();

  const [onboardingStatus, setOnboardingStatus] =
    useState<OnboardingStatus>('loading');

  useEffect(() => {
    async function checkOnboarding() {
      try {
        const onboarded = await appStorage.getItem('onboarded');

        setOnboardingStatus(
          onboarded === 'true' ? 'completed' : 'not_completed'
        );
      } catch (error) {
        console.error('Failed to check onboarding status:', error);

        // Em caso de falha, o caminho seguro é exibir onboarding.
        setOnboardingStatus('not_completed');
      }
    }

    void checkOnboarding();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && onboardingStatus !== 'loading') {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, onboardingStatus]);

  // Mantém a Splash Screen enquanto fontes e storage são verificados.
  if (!fontsLoaded || onboardingStatus === 'loading') {
    return null;
  }

  const initialRouteName =
    onboardingStatus === 'completed' ? '(tabs)' : 'onboarding';

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="dark" />

      <Stack
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          animationDuration: 220,
          gestureEnabled: true,
        }}
      >
        {/* Sempre registradas */}
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="vocab/create"
          options={{
            headerShown: true,
            title: 'Adicionar Vocab',
            presentation: 'card',
          }}
        />

        <Stack.Screen name="study" options={{ headerShown: false }} />

        <Stack.Screen
          name="study/exercise"
          options={{ headerShown: false }}
        />
      </Stack>
    </View>
  );
}