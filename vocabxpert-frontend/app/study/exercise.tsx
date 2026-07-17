// app/study/exercise.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import apiClient from '../../src/api/client';

// ✅ Importar os tokens de design
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { radio } from '../../src/theme/radio';
import { getShadow } from '../../src/theme/shadows';

// ✅ Interface para o tipo de exercício (ajuste conforme seu backend)
interface Exercise {
  id: string;
  question: string;
  type: 'FLASHCARD' | 'MULTIPLE_CHOICE' | 'CLOZE' | 'WORD_ORDER' | 'DICTATION' | 'CHOOSE_CORRECT_EXAMPLE';
  options?: string[]; // Para exercícios de múltipla escolha
  // Adicione outros campos relevantes do seu exercício, como 'answer' para CLOZE, etc.
}

const ExerciseScreen: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>(''); // ✅ Estado para a resposta do usuário
  const [loadingNextExercise, setLoadingNextExercise] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.sessionId && params.firstExercise) {
      setSessionId(params.sessionId as string);
      try {
        const parsedExercise = JSON.parse(params.firstExercise as string) as Exercise;
        setCurrentExercise(parsedExercise);
        setUserAnswer(''); // Limpar resposta ao carregar novo exercício
      } catch (e) {
        console.error('Failed to parse firstExercise:', e);
        setError('Erro ao carregar o primeiro exercício.');
      }
    } else {
      setError('Dados da sessão de estudo ausentes.');
    }
  }, [params]);

  const handleAnswer = async (answer: string) => {
    if (!sessionId || !currentExercise || loadingNextExercise) return;

    try {
      setLoadingNextExercise(true);
      setError(null);

      const response = await apiClient.post(`/study/attempt`, {
        sessionId: sessionId,
        exerciseId: currentExercise.id,
        answer: answer,
      });

      const { nextExercise, isSessionComplete } = response.data;

      if (isSessionComplete) {
        Alert.alert('Estudo Concluído!', 'Você revisou todos os vocabulários desta sessão.');
        router.replace('/'); // Voltar para a tela inicial ou de configurações
      } else if (nextExercise) {
        setCurrentExercise(nextExercise as Exercise);
        setUserAnswer(''); // Limpar resposta para o próximo exercício
      } else {
        setError('Nenhum próximo exercício recebido.');
      }

    } catch (err: any) {
      console.error('Failed to submit answer or get next exercise:', err);
      Alert.alert('Erro', err.response?.data?.message || err.message || 'Ocorreu um erro ao processar sua resposta.');
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoadingNextExercise(false);
    }
  };

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => router.replace('/')}>
          <Text style={styles.retryButtonText}>Voltar para Configurações</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!currentExercise) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando exercício...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Text style={styles.questionLabel}>Qual o significado de:</Text>
        <View style={styles.quizHero}>
          <Text style={styles.quizWord}>{currentExercise.question}</Text>
        </View>

        {/* Renderizar opções de resposta com base no tipo de exercício */}
        {currentExercise.type === 'MULTIPLE_CHOICE' && currentExercise.options ? (
          <View style={styles.quizOptions}>
            {currentExercise.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quizOption}
                onPress={() => handleAnswer(option)}
                disabled={loadingNextExercise}
              >
                <Text style={styles.quizOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          // Para outros tipos de exercício (ex: CLOZE, WORD_ORDER, DICTATION),
          // você precisará de um TextInput para a resposta do usuário.
          <View style={styles.quizOptions}>
            <TextInput
              style={styles.textInputAnswer}
              placeholder="Digite sua resposta aqui..."
              placeholderTextColor={colors.light}
              onChangeText={setUserAnswer}
              value={userAnswer}
              onSubmitEditing={() => handleAnswer(userAnswer)}
              editable={!loadingNextExercise}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => handleAnswer(userAnswer)}
              disabled={loadingNextExercise || !userAnswer.trim()} // Desabilitar se a resposta estiver vazia
            >
              {loadingNextExercise ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Submeter Resposta</Text>
              )}
            </TouchableOpacity>
          </View>
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
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.s5,
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
  container: {
    width: '100%',
    maxWidth: 390,
    paddingHorizontal: spacing.s5,
    alignItems: 'center',
  },
  questionLabel: {
    fontSize: 13,
    fontFamily: 'DM Sans Medium',
    color: colors.muted, // Usando muted para se aproximar do rgba(255,255,255,0.65) em fundo escuro
    marginBottom: spacing.s3,
    letterSpacing: 0.2,
  },
  quizHero: {
    backgroundColor: colors.primary,
    borderRadius: radio.xl,
    marginHorizontal: -spacing.s4, // Ajuste para ocupar a largura total do container
    paddingVertical: spacing.s8,
    paddingHorizontal: spacing.s5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: spacing.s5,
  },
  quizWord: {
    fontSize: 32,
    fontFamily: 'DM Sans Bold',
    color: '#fff',
    letterSpacing: -0.5,
    lineHeight: 1.15,
    textAlign: 'center',
  },
  quizOptions: {
    width: '100%',
    flexDirection: 'column',
    gap: spacing.s3,
  },
  quizOption: {
    width: '100%',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radio.lg,
    paddingVertical: 16,
    paddingHorizontal: spacing.s5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s3,
    ...getShadow('sh1'),
  },
  quizOptionText: {
    fontSize: 15,
    fontFamily: 'DM Sans Medium',
    color: colors.text,
  },
  textInputAnswer: {
    width: '100%',
    height: 50,
    backgroundColor: colors.surface2,
    color: colors.text,
    borderRadius: radio.md,
    paddingHorizontal: spacing.s4,
    fontSize: 14,
    fontFamily: 'DM Sans',
    marginBottom: spacing.s3,
    borderColor: colors.border,
    borderWidth: 1.5,
    ...getShadow('sh1'),
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.s4,
    paddingHorizontal: spacing.s8,
    borderRadius: radio.full,
    marginTop: spacing.s2,
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    ...getShadow('shPrimary'),
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'DM Sans SemiBold',
    letterSpacing: -0.1,
  },
});

export default ExerciseScreen;