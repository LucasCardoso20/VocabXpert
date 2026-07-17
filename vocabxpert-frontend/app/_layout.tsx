// app/_layout.tsx
// Remova: import 'react-native-gesture-handler'; // Não é necessário aqui se não houver gestos globais
import { Stack } from 'expo-router';
import { useAppFonts } from '../src/theme/typography';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';
// Remova: import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Não é necessário aqui
// Remova: import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'; // Não é necessário aqui

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const fontsLoaded = useAppFonts();
  const [onboardingStatus, setOnboardingStatus] = useState<'loading' | 'completed' | 'not_completed'>(
    'loading'
  );

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const onboarded = await SecureStore.getItemAsync('onboarded');
        if (onboarded === 'true') {
          setOnboardingStatus('completed');
        } else {
          setOnboardingStatus('not_completed');
        }
      } catch (e) {
        console.error('Failed to check onboarding status:', e);
        setOnboardingStatus('not_completed');
      }
    };
    checkOnboarding();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && onboardingStatus !== 'loading') {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, onboardingStatus]);

  if (!fontsLoaded || onboardingStatus === 'loading') {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="dark" />
      {onboardingStatus === 'not_completed' ? (
        <Stack screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          animationDuration: 220,
          gestureEnabled: true,
        }}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack>
      ) : (
        <Stack screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          animationDuration: 220,
          gestureEnabled: true,
        }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* ESTA É A LINHA QUE PRECISA SER RESTAURADA! */}
          <Stack.Screen
            name="vocab/create" // <-- O NOME DA SUA ROTA DE CRIAÇÃO DE VOCABULÁRIO
            options={{
              headerShown: true,
              title: 'Adicionar Vocab',
              presentation: 'card', // Para abrir como um modal/card
            }}
          />
          <Stack.Screen name="study/exercise" options={{ headerShown: false }} />
        </Stack>
      )}
    </View>
  );
}