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

export type CreateLearningLanguageBody = {
  language: string;
  level: TargetLevel;
  makeActive?: boolean;
};

export type UpdateLearningLanguageBody = {
  level: TargetLevel;
};

type CreateLearningLanguageResponse = {
  ok: true;
  language: LearningLanguage & {
    lists: Array<{
      id: string;
      name: string;
      isDefault: boolean;
    }>;
  };
};

type UpdateLearningLanguageResponse = {
  ok: true;
  language: {
    id: string;
    language: string;
    level: TargetLevel;
    updatedAt: string;
  };
};

type DeleteLearningLanguageResponse = {
  ok: true;
  deletedLanguage: {
    id: string;
    language: string;
  };
  activeLanguageId: string | null;
};

export async function createLearningLanguage(
  body: CreateLearningLanguageBody
): Promise<CreateLearningLanguageResponse['language']> {
  const response = await apiClient.post<CreateLearningLanguageResponse>(
    '/profile/languages',
    body
  );

  return response.data.language;
}

export async function updateLearningLanguage(
  languageId: string,
  body: UpdateLearningLanguageBody
): Promise<UpdateLearningLanguageResponse['language']> {
  const response = await apiClient.patch<UpdateLearningLanguageResponse>(
    `/profile/languages/${languageId}`,
    body
  );

  return response.data.language;
}

export async function deleteLearningLanguage(
  languageId: string
): Promise<DeleteLearningLanguageResponse> {
  const response = await apiClient.delete<DeleteLearningLanguageResponse>(
    `/profile/languages/${languageId}`
  );

  return response.data;
}

export type UpdateProfileBody = {
  displayName?: string;
  nativeLanguage?: string;
};

export type UpdateInterestsBody = string[];

export async function updateProfile(
  body: UpdateProfileBody
): Promise<void> {
  await apiClient.patch('/profile', body);
}

export async function updateInterests(
  interests: UpdateInterestsBody
): Promise<void> {
  await apiClient.put('/profile/interests', { interests });
}