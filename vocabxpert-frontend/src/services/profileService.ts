import apiClient from '../api/client';

export type TargetLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type LearningLanguage = {
  id: string;
  language: string;
  level: TargetLevel;
  isActive: boolean;
  listCount: number;
  createdAt: string;
  updatedAt: string;
};

export type Interest = {
  id: string;
  name: string;
};

export type Profile = {
  id: string;
  displayName: string;
  email: string | null;
  nativeLanguage: string;
  createdAt: string;
  updatedAt: string;
  activeLanguageId: string | null;
  interests: Interest[];
  languages: LearningLanguage[];
};

type GetProfileResponse = {
  ok: true;
  profile: Profile;
};

type ActivateLanguageResponse = {
  ok: true;
  activeLanguage: {
    id: string;
    language: string;
    level: TargetLevel;
    isActive: true;
  };
};

export async function getProfile(): Promise<Profile> {
  const response = await apiClient.get<GetProfileResponse>('/profile');

  return response.data.profile;
}

export async function activateLearningLanguage(
  languageId: string
): Promise<ActivateLanguageResponse['activeLanguage']> {
  const response = await apiClient.post<ActivateLanguageResponse>(
    `/profile/languages/${languageId}/activate`
  );

  return response.data.activeLanguage;
}