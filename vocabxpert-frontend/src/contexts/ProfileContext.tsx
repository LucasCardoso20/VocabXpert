import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { appStorage } from '../storage/appStorage';
import {
  activateLearningLanguage,
  getProfile,
  type LearningLanguage,
  type Profile,
} from '../services/profileService';

type ProfileContextValue = {
  profile: Profile | null;
  activeLanguage: LearningLanguage | null;
  isLoadingProfile: boolean;
  profileError: string | null;

  refreshProfile: () => Promise<void>;
  changeActiveLanguage: (languageId: string) => Promise<void>;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  const refreshProfile = useCallback(async () => {
    const userId = await appStorage.getItem('x-user-id');

    /**
     * Durante o onboarding ainda não existe usuário persistido.
     * Não chamamos GET /profile nesse caso.
     */
    if (!userId) {
      setProfile(null);
      setProfileError(null);
      setIsLoadingProfile(false);
      return;
    }

    try {
      setIsLoadingProfile(true);
      setProfileError(null);

      const loadedProfile = await getProfile();

      setProfile(loadedProfile);
    } catch (error: any) {
      console.error(
        'Erro ao carregar perfil:',
        error?.response?.data || error?.message
      );

      setProfileError('Não foi possível carregar o perfil.');
    } finally {
      setIsLoadingProfile(false);
    }
  }, []);

  useEffect(() => {
    void refreshProfile();
  }, [refreshProfile]);

  const changeActiveLanguage = useCallback(
    async (languageId: string) => {
      if (!profile || profile.activeLanguageId === languageId) {
        return;
      }

      await activateLearningLanguage(languageId);

      /**
       * Rebuscamos o perfil completo em vez de alterar somente um campo
       * localmente. Assim Header, Home e futuras telas continuam coerentes.
       */
      await refreshProfile();
    },
    [profile, refreshProfile]
  );

  const activeLanguage = useMemo(() => {
    if (!profile?.activeLanguageId) {
      return null;
    }

    return (
      profile.languages.find(
        (language) => language.id === profile.activeLanguageId
      ) ?? null
    );
  }, [profile]);

  const value = useMemo<ProfileContextValue>(
    () => ({
      profile,
      activeLanguage,
      isLoadingProfile,
      profileError,
      refreshProfile,
      changeActiveLanguage,
    }),
    [
      profile,
      activeLanguage,
      isLoadingProfile,
      profileError,
      refreshProfile,
      changeActiveLanguage,
    ]
  );

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile deve ser usado dentro de ProfileProvider.');
  }

  return context;
}