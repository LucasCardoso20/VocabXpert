import * as SecureStore from 'expo-secure-store';

const firstExerciseKey = (sessionId: string) => `study:firstExercise:${sessionId}`;

export async function cacheFirstExercise(sessionId: string, ex: StudyExercise | null) {
  if (!ex) return;
  await SecureStore.setItemAsync(firstExerciseKey(sessionId), JSON.stringify(ex));
}

export async function popCachedFirstExercise(sessionId: string): Promise<StudyExercise | null> {
  const key = firstExerciseKey(sessionId);
  const raw = await SecureStore.getItemAsync(key);
  if (!raw) return null;

  await SecureStore.deleteItemAsync(key);

  try {
    return JSON.parse(raw) as StudyExercise;
  } catch {
    return null;
  }
}