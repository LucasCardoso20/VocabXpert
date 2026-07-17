// src/screens/StudyConfigScreen.tsx

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform, // ✅ Importar Platform para Picker
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import apiClient from '../api/client';
import * as SecureStore from 'expo-secure-store';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useRouter } from 'expo-router';

// ✅ Importar os tokens de design
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { radio } from '../theme/radio';
import { getShadow } from '../theme/shadows';

// Manter a SplashScreen visível enquanto os recursos são carregados
SplashScreen.preventAutoHideAsync();

interface StudyConfig {
  exerciseTypes: string[];
  scopes: string[];
  defaults: {
    exerciseType: string;
    scope: string;
    limit: number;
    direction: string;
  };
}

interface StartSessionRequest {
  exerciseType: string;
  scope: string;
  limit: number;
}

interface StartSessionResponse {
  sessionId: string;
  firstExercise: any; // Ajustaremos isso com a interface real do exercício depois
}

const StudyConfigScreen: React.FC = () => {
  const router = useRouter();

  const [config, setConfig] = useState<StudyConfig | null>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [startingSession, setStartingSession] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedExerciseType, setSelectedExerciseType] = useState<string>('');
  const [selectedScope, setSelectedScope] = useState<string>('');
  const [selectedLimit, setSelectedLimit] = useState<string>('10');

  const [fontsLoaded] = useFonts({
    'DM Sans': require('../../assets/fonts/DMSans-Regular.ttf'),
    'DM Sans Medium': require('../../assets/fonts/DMSans-Medium.ttf'),
    'DM Sans SemiBold': require('../../assets/fonts/DMSans-SemiBold.ttf'),
    'DM Sans Bold': require('../../assets/fonts/DMSans-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !loadingConfig) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, loadingConfig]);

  useEffect(() => {
    const fetchStudyConfig = async () => {
      try {
        setLoadingConfig(true);
        setError(null);
        const response = await apiClient.get('/study/config');
        const fetchedConfig: StudyConfig = response.data;
        setConfig(fetchedConfig);

        setSelectedExerciseType(fetchedConfig.defaults.exerciseType);
        setSelectedScope(fetchedConfig.defaults.scope);
        setSelectedLimit(String(fetchedConfig.defaults.limit));

      } catch (err: any) {
        console.error('Failed to fetch study config:', err);
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoadingConfig(false);
      }
    };

    fetchStudyConfig();
  }, []);

  const startStudySession = async () => {
    if (!config) {
      Alert.alert('Erro', 'Configurações de estudo não carregadas.');
      return;
    }

    const limitNum = parseInt(selectedLimit, 10);
    if (isNaN(limitNum) || limitNum <= 0) {
      Alert.alert('Erro', 'O limite de vocabulários deve ser um número positivo.');
      return;
    }

    try {
      setStartingSession(true);
      setError(null);

      const requestBody: StartSessionRequest = {
        exerciseType: selectedExerciseType,
        scope: selectedScope,
        limit: limitNum,
      };

      const response = await apiClient.post<StartSessionResponse>('/study/session', requestBody);
      const { sessionId, firstExercise } = response.data;

      router.push({
        pathname: '/study/exercise',
        params: {
          sessionId: sessionId,
          firstExercise: JSON.stringify(firstExercise),
        },
      });

    } catch (err: any) {
      console.error('Failed to start study session:', err);
      Alert.alert('Erro ao iniciar estudo', err.response?.data?.message || err.message || 'Ocorreu um erro desconhecido.');
      setError(err.message || 'An unknown error occurred during session start.');
    } finally {
      setStartingSession(false);
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} onLayout={onLayoutRootView}>
      <View style={styles.container}>
        <Text style={styles.title}>Configurar Estudo</Text>

        {loadingConfig && (
          <View style={styles.feedbackContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Carregando configurações...</Text>
          </View>
        )}

        {error && (
          <View style={styles.feedbackContainer}>
            <Text style={styles.errorText}>Erro: {error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={() => Alert.alert('Ação', 'Tentar Novamente')}>
              <Text style={styles.retryButtonText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        )}

        {config && !loadingConfig && (
          <>
            {/* Seletor de Tipo de Exercício */}
            <Text style={styles.label}>Tipo de Exercício:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedExerciseType}
                onValueChange={(itemValue) => setSelectedExerciseType(itemValue)}
                style={styles.picker}
                itemStyle={Platform.OS === 'ios' ? styles.pickerItem : undefined} // itemStyle apenas para iOS
              >
                {config.exerciseTypes.map((type) => (
                  <Picker.Item key={type} label={type} value={type} />
                ))}
              </Picker>
            </View>

            {/* Seletor de Escopo */}
            <Text style={styles.label}>Escopo:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedScope}
                onValueChange={(itemValue) => setSelectedScope(itemValue)}
                style={styles.picker}
                itemStyle={Platform.OS === 'ios' ? styles.pickerItem : undefined}
              >
                {config.scopes.map((scope) => (
                  <Picker.Item key={scope} label={scope} value={scope} />
                ))}
              </Picker>
            </View>

            {/* Input para Limite */}
            <Text style={styles.label}>Limite de Vocabulários:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setSelectedLimit}
              value={selectedLimit}
              keyboardType="numeric"
              placeholder="Número de vocabulários"
              placeholderTextColor={colors.light}
            />

            {/* Botão Iniciar Estudo */}
            <TouchableOpacity
              style={styles.button}
              onPress={startStudySession}
              disabled={startingSession}
            >
              {startingSession ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Iniciar Estudo</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.s5,
  },
  container: {
    width: '100%',
    maxWidth: 390,
    paddingHorizontal: spacing.s5,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'DM Sans Bold',
    marginBottom: spacing.s8,
    color: colors.text,
    letterSpacing: -0.5,
  },
  feedbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.s5,
    backgroundColor: colors.surface,
    borderRadius: radio.xl,
    ...getShadow('sh2'),
    marginVertical: spacing.s5,
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'DM Sans',
    color: colors.text,
    marginTop: spacing.s2,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'DM Sans',
    color: colors.danger,
    textAlign: 'center',
    marginVertical: spacing.s2,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.s3,
    paddingHorizontal: spacing.s5,
    borderRadius: radio.full,
    marginTop: spacing.s4,
    ...getShadow('shPrimary'),
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'DM Sans SemiBold',
  },
  label: {
    fontSize: 13,
    fontFamily: 'DM Sans SemiBold',
    color: colors.muted,
    marginTop: spacing.s5,
    marginBottom: spacing.s2,
    alignSelf: 'flex-start',
    width: '100%',
    letterSpacing: 0.1,
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: colors.surface2,
    borderRadius: radio.md,
    marginBottom: spacing.s4,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.border,
    ...getShadow('sh1'),
  },
  picker: {
    height: 50,
    width: '100%',
    color: colors.text,
  },
  pickerItem: { // Apenas para iOS, Android estiliza o texto diretamente no Picker
    color: colors.text,
    fontFamily: 'DM Sans',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.surface2,
    color: colors.text,
    borderRadius: radio.md,
    paddingHorizontal: spacing.s4,
    fontSize: 14,
    fontFamily: 'DM Sans',
    marginBottom: spacing.s5,
    borderColor: colors.border,
    borderWidth: 1.5,
    ...getShadow('sh1'),
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.s4,
    paddingHorizontal: spacing.s8,
    borderRadius: radio.full,
    marginTop: spacing.s5,
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    ...getShadow('shPrimary'),
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'DM Sans SemiBold',
    letterSpacing: -0.1,
  },
});

export default StudyConfigScreen;