import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useProfile } from '@/src/contexts/ProfileContext';
import {
  updateInterests,
  updateProfile,
  type Interest,
} from '@/src/services/profileService';
import { colors } from '@/src/theme/colors';
import { radio } from '@/src/theme/radio';
import { spacing } from '@/src/theme/spacing';
import { interests as ONBOARDING_INTERESTS } from '@/src/data/onboardingData';
import { useTranslation } from 'react-i18next';

const NATIVE_LANGUAGE_OPTIONS = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'Inglês', flag: '🇺🇸' },
  { code: 'es', name: 'Espanhol', flag: '🇪🇸' },
  { code: 'fr', name: 'Francês', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'de', name: 'Alemão', flag: '🇩🇪' },
  { code: 'ja', name: 'Japonês', flag: '🇯🇵' },
  { code: 'ko', name: 'Coreano', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinês', flag: '🇨🇳' },
];

const INTEREST_OPTIONS = ONBOARDING_INTERESTS;
function getNativeLanguageData(code: string) {
  return (
    NATIVE_LANGUAGE_OPTIONS.find((lang) => lang.code === code) ?? {
      code,
      name: code.toUpperCase(),
      flag: '🌐',
    }
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation(); // Adicionado o hook de tradução

  const { profile, isLoadingProfile, refreshProfile } = useProfile();
  const [customInterestText, setCustomInterestText] = useState('');
  const [isAddingCustomInterest, setIsAddingCustomInterest] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingNativeLanguage, setIsEditingNativeLanguage] = useState(false);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [customInterestNamesMap, setCustomInterestNamesMap] = useState<
    Record<string, string>
  >({});
  const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName);
      setNativeLanguage(profile.nativeLanguage);

      const newSelectedInterests: string[] = [];
      const newCustomInterestNamesMap: Record<string, string> = {};

      profile.interests.forEach((interest) => {
        const onboardingOption = ONBOARDING_INTERESTS.find(
          (opt) => opt.id === interest.id
        );

        if (onboardingOption) {
          // É um interesse padrão, adiciona o ID (ex: 'tv_series')
          newSelectedInterests.push(interest.id);
        } else {
          // É um interesse personalizado.
          // O backend retorna interest.id (UUID) e interest.name (UUID).
          // Precisamos do nome legível. Se ele foi adicionado nesta sessão,
          // o customInterestNamesMap já o terá. Caso contrário, não temos o nome.
          // Por enquanto, vamos assumir que o 'name' do backend é o nome legível,
          // mas se continuar vindo UUID, teremos que aceitar o UUID ou
          // pedir uma mudança no backend.
          newSelectedInterests.push(interest.id); // Adiciona o ID (UUID)
          newCustomInterestNamesMap[interest.id] = interest.name; // Mapeia ID -> Nome (que é UUID, por enquanto)
        }
      });

      setSelectedInterests(newSelectedInterests);
      setCustomInterestNamesMap(newCustomInterestNamesMap);
    }
  }, [profile]);

  const nativeLanguageData = useMemo(
    () => getNativeLanguageData(nativeLanguage),
    [nativeLanguage]
  );

  const handleSaveProfile = useCallback(async () => {
    if (!profile) return;

    const updates: { displayName?: string; nativeLanguage?: string } = {};

    if (displayName !== profile.displayName) {
      updates.displayName = displayName;
    }
    if (nativeLanguage !== profile.nativeLanguage) {
      updates.nativeLanguage = nativeLanguage;
    }

    if (Object.keys(updates).length === 0) {
      setIsEditingName(false);
      setIsEditingNativeLanguage(false);
      return;
    }

    try {
      setIsSaving(true);
      await updateProfile(updates);
      await refreshProfile();
      setIsEditingName(false);
      setIsEditingNativeLanguage(false);
    } catch (error: any) {
      console.error(
        '[ProfileScreen] update profile error:',
        error?.response?.data ?? error?.message ?? error
      );
      Alert.alert(
        t('profile.errors.saveProfileTitle'), // 'Erro ao salvar'
        t('profile.errors.saveProfileMessage') // 'Não foi possível atualizar seu perfil. Tente novamente.'
      );
    } finally {
      setIsSaving(false);
    }
  }, [displayName, nativeLanguage, profile, refreshProfile, t]);

  const handleSaveInterests = useCallback(async () => {
    if (!profile) return;

    try {
      setIsSaving(true);
      await updateInterests(selectedInterests);
      await refreshProfile();
      setIsEditingInterests(false);
    } catch (error: any) {
      console.error(
        '[ProfileScreen] update interests error:',
        error?.response?.data ?? error?.message ?? error
      );
      Alert.alert(
        t('profile.errors.saveInterestsTitle'), // 'Erro ao salvar'
        t('profile.errors.saveInterestsMessage') // 'Não foi possível atualizar seus interesses. Tente novamente.'
      );
    } finally {
      setIsSaving(false);
    }
  }, [selectedInterests, profile, refreshProfile, t]);

     const toggleInterest = useCallback(
    (interestId: string) => {
      setSelectedInterests((prev) => {
        if (prev.includes(interestId)) {
          // Se o interesse está sendo removido, e é personalizado, remove do mapa
          setCustomInterestNamesMap((prevMap) => {
            const newMap = { ...prevMap };
            delete newMap[interestId];
            return newMap;
          });
          return prev.filter((id) => id !== interestId);
        } else {
          return [...prev, interestId];
        }
      });
    },
    []
  );

  const handleAddCustomInterest = useCallback(() => {
    const trimmedText = customInterestText.trim();
    if (!trimmedText) {
      Alert.alert(
        t('profile.customInterest.emptyAlertTitle'), // 'Atenção'
        t('profile.customInterest.emptyAlertMessage') // 'O interesse não pode ser vazio.'
      );
      return;
    }

    // Verifica se já existe na lista de interesses padrão ou nos selecionados
    const existsInAppInterests = INTEREST_OPTIONS.some(
      (interest) => interest.label.toLowerCase() === trimmedText.toLowerCase()
    );
    const existsInSelected = selectedInterests.some(
      (id) => id.toLowerCase() === trimmedText.toLowerCase()
    );

    if (existsInAppInterests || existsInSelected) {
      Alert.alert(
        t('profile.customInterest.existsAlertTitle'), // 'Atenção'
        t('profile.customInterest.existsAlertMessage') // 'Este interesse já foi adicionado ou existe na lista.'
      );
      return;
    }

    setSelectedInterests((prev) => [...prev, trimmedText]);
    setCustomInterestNamesMap((prev) => ({ ...prev, [trimmedText]: trimmedText })); // Mapeia o nome para si mesmo
    setCustomInterestText('');
    setIsAddingCustomInterest(false);
  }, [customInterestText, selectedInterests, t]);

  if (isLoadingProfile || !profile) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{t('profile.loadingProfile')}</Text> {/* 'Carregando perfil...' */}
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + spacing.s6 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.title}>{t('profile.title')}</Text> {/* 'Meu perfil' */}

          <Text style={styles.subtitle}>
            {t('profile.subtitle')} {/* 'Gerencie suas informações pessoais e preferências.' */}
          </Text>
        </View>

        {/* Nome exibido */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{t('profile.displayNameSection.title')}</Text> {/* 'Nome exibido' */}

            <TouchableOpacity
              onPress={() => setIsEditingName(true)}
              disabled={isSaving}
            >
              <Ionicons name="pencil-outline" size={18} color={colors.muted} />
            </TouchableOpacity>
          </View>

          <Text style={styles.cardValue}>{profile.displayName}</Text>
        </View>

        {/* Idioma nativo */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{t('profile.nativeLanguageSection.title')}</Text> {/* 'Idioma nativo' */}

            <TouchableOpacity
              onPress={() => setIsEditingNativeLanguage(true)}
              disabled={isSaving}
            >
              <Ionicons name="pencil-outline" size={18} color={colors.muted} />
            </TouchableOpacity>
          </View>

          <View style={styles.nativeLanguageDisplay}>
            <Text style={styles.nativeLanguageFlag}>
              {nativeLanguageData.flag}
            </Text>
            <Text style={styles.nativeLanguageName}>
              {nativeLanguageData.name}
            </Text>
          </View>
        </View>

                {/* Interesses */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{t('profile.interestsSection.title')}</Text> {/* 'Interesses' */}

            <TouchableOpacity
              onPress={() => setIsEditingInterests(true)}
              disabled={isSaving}
            >
              <Ionicons name="pencil-outline" size={18} color={colors.muted} />
            </TouchableOpacity>
          </View>

          {profile.interests.length === 0 ? (
            <Text style={styles.emptyText}>
              {t('profile.interestsSection.emptyState')} {/* 'Nenhum interesse selecionado.' */}
            </Text>
          ) : (
            <View style={styles.interestsGrid}>
              {profile.interests.map((interest) => {
                const onboardingOption = ONBOARDING_INTERESTS.find(
                  (opt) => opt.id === interest.id
                );
                const isCustom = !onboardingOption;

                return (
                  <View key={interest.id} style={styles.interestChip}>
                    {isCustom ? (
                      <Ionicons
                        name="star-outline" // Ícone genérico para personalizado
                        size={16}
                        color={colors.primary}
                      />
                    ) : (
                      <Text style={styles.interestChipEmoji}>
                        {onboardingOption?.icon}
                      </Text>
                    )}
                    <Text style={styles.interestChipText}>
                      {onboardingOption?.label ?? customInterestNamesMap[interest.id] ?? interest.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* Botão para gerenciar idiomas */}
        <TouchableOpacity
          style={styles.manageLanguagesButton}
          activeOpacity={0.8}
          onPress={() => router.push('/languages')}
        >
          <Ionicons name="language-outline" size={19} color={colors.muted} />

          <Text style={styles.manageLanguagesButtonText}>
            {t('profile.manageLanguagesButton')} {/* 'Gerenciar idiomas de estudo' */}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.muted}
          />
        </TouchableOpacity>
      </ScrollView>

            {/* Modal: Editar nome */}
      <Modal
        visible={isEditingName}
        transparent
        animationType="slide"
        onRequestClose={() => !isSaving && setIsEditingName(false)}
      >
        <Pressable // Este é o Pressable que aplica o styles.overlay
          style={styles.overlay}
          onPress={() => !isSaving && setIsEditingName(false)}
        >
          <Pressable // Este é o Pressable que contém o conteúdo do modal (modalCard)
            style={[
              styles.modalCard,
              {
                paddingBottom: Math.max(insets.bottom, spacing.s4),
              },
            ]}
            onPress={() => undefined} // Impede que o clique no conteúdo feche o modal
          >
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>{t('profile.editNameModal.title')}</Text> {/* 'Editar nome' */}
                <Text style={styles.modalSubtitle}>
                  {t('profile.editNameModal.subtitle')} {/* 'Como você gostaria de ser chamado?' */}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                disabled={isSaving}
                onPress={() => setIsEditingName(false)}
              >
                <Ionicons name="close" size={20} color={colors.muted} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.textInput}
              value={displayName}
              onChangeText={setDisplayName}
              placeholder={t('profile.editNameModal.placeholder')} // 'Seu nome'
              placeholderTextColor={colors.muted}
              maxLength={80}
              editable={!isSaving}
            />

            <TouchableOpacity
              style={[
                styles.primaryButton,
                (displayName.trim() === '' || isSaving) &&
                  styles.disabledButton,
              ]}
              activeOpacity={0.8}
              disabled={displayName.trim() === '' || isSaving}
              onPress={() => void handleSaveProfile()}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>{t('common.save')}</Text> // 'Salvar'
              )}
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
      {/* Modal: Editar idioma nativo */}
      <Modal
        visible={isEditingNativeLanguage}
        transparent
        animationType="slide"
        onRequestClose={() => !isSaving && setIsEditingNativeLanguage(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => !isSaving && setIsEditingNativeLanguage(false)}
        >
          <Pressable
  style={[
    styles.modalCard,
    {
      paddingBottom: Math.max(insets.bottom, spacing.s4),
    },
  ]}
  onPress={() => undefined}
>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>{t('profile.editNativeLanguageModal.title')}</Text> {/* 'Idioma nativo' */}
                <Text style={styles.modalSubtitle}>
                  {t('profile.editNativeLanguageModal.subtitle')} {/* 'Qual é o seu idioma principal?' */}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                disabled={isSaving}
                onPress={() => setIsEditingNativeLanguage(false)}
              >
                <Ionicons name="close" size={20} color={colors.muted} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalScroll}
              contentContainerStyle={styles.modalScrollContent}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              {NATIVE_LANGUAGE_OPTIONS.map((lang) => {
                const selected = lang.code === nativeLanguage;
                return (
                  <TouchableOpacity
                    key={lang.code}
                    style={[
                      styles.languageOption,
                      selected && styles.languageOptionSelected,
                    ]}
                    activeOpacity={0.8}
                    disabled={isSaving || selected}
                    onPress={() => setNativeLanguage(lang.code)}
                  >
                    <Text style={styles.optionFlag}>{lang.flag}</Text>
                    <Text
                      style={[
                        styles.languageOptionText,
                        selected && styles.languageOptionTextSelected,
                      ]}
                    >
                      {lang.name}
                    </Text>
                    {selected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={21}
                        color={colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.primaryButton,
                (nativeLanguage === profile.nativeLanguage || isSaving) &&
                  styles.disabledButton,
              ]}
              activeOpacity={0.8}
              disabled={nativeLanguage === profile.nativeLanguage || isSaving}
              onPress={() => void handleSaveProfile()}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>{t('common.save')}</Text> // 'Salvar'
              )}
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Modal: Editar interesses */}
      <Modal
        visible={isEditingInterests}
        transparent
        animationType="slide"
        onRequestClose={() => !isSaving && setIsEditingInterests(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => !isSaving && setIsEditingInterests(false)}
        >
          <Pressable
  style={[
    styles.modalCard,
    {
      paddingBottom: Math.max(insets.bottom, spacing.s4),
    },
  ]}
  onPress={() => undefined}
>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>{t('profile.editInterestsModal.title')}</Text> {/* 'Interesses' */}
                <Text style={styles.modalSubtitle}>
                  {t('profile.editInterestsModal.subtitle')} {/* 'Escolha tópicos que te interessam.' */}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                disabled={isSaving}
                onPress={() => setIsEditingInterests(false)}
              >
                <Ionicons name="close" size={20} color={colors.muted} />
              </TouchableOpacity>
            </View>

                        <ScrollView
              style={styles.modalScroll}
              contentContainerStyle={styles.modalScrollContent}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              {/* Adicionar interesse personalizado */}
              <View style={styles.customInterestSection}>
                {isAddingCustomInterest ? (
                  <View style={styles.customInterestInputContainer}>
                    <TextInput
                      style={styles.customInterestInput}
                      placeholder={t('profile.customInterest.placeholder')} // 'Ex: Criptomoedas, Astrofísica...'
                      placeholderTextColor={colors.muted}
                      value={customInterestText}
                      onChangeText={setCustomInterestText}
                      onSubmitEditing={handleAddCustomInterest}
                      editable={!isSaving}
                    />
                    <TouchableOpacity
                      onPress={handleAddCustomInterest}
                      style={[
                        styles.addCustomInterestButton,
                        (customInterestText.trim() === '' || isSaving) && styles.disabledButton,
                      ]}
                      disabled={customInterestText.trim() === '' || isSaving}
                    >
                      <Text style={styles.addCustomInterestButtonText}>{t('common.add')}</Text> {/* 'Adicionar' */}
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.addCustomInterestToggle}
                    onPress={() => setIsAddingCustomInterest(true)}
                    disabled={isSaving}
                  >
                    <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
                    <Text style={styles.addCustomInterestToggleText}>{t('profile.customInterest.addCustomInterestButton')}</Text> {/* 'Adicionar interesse personalizado' */}
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.interestsGridModal}>
                {INTEREST_OPTIONS.map((option) => {
                  const isSelected = selectedInterests.includes(option.id);
                  return (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.interestChipModal,
                        isSelected && styles.interestChipModalSelected,
                      ]}
                      activeOpacity={0.8}
                      disabled={isSaving}
                      onPress={() => toggleInterest(option.id)}
                    >
                       {option.icon && (
                        <Text style={styles.interestChipModalEmoji}>
                          {option.icon}
                        </Text>
                      )}
                      <Text
                        style={[
                          styles.interestChipModalText,
                          isSelected && styles.interestChipModalTextSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                {/* Renderizar interesses personalizados já selecionados */}
                {selectedInterests
                  .filter(
                    (id) => !INTEREST_OPTIONS.some((interest) => interest.id === id)
                  )
                  .map((customId) => {
                    // Para interesses personalizados, o customId é o próprio nome
                    // Para interesses padrão que o backend pode ter retornado com ID como nome,
                    // tentamos encontrar o label correspondente.
                    const standardOption = ONBOARDING_INTERESTS.find(
                      (opt) => opt.id === customId
                    );
                    const displayText = standardOption?.label ?? customInterestNamesMap[customId] ?? customId;

                    return (
                      <TouchableOpacity
                        key={customId}
                        style={[
                          styles.interestChipModal,
                          styles.interestChipModalSelected, // Sempre selecionado
                        ]}
                        activeOpacity={0.8}
                        disabled={isSaving}
                        onPress={() => toggleInterest(customId)}
                      >
                        <Ionicons name="star-outline" size={18} color={colors.primary} />
                        <Text
                          style={[
                            styles.interestChipModalText,
                            styles.interestChipModalTextSelected,
                          ]}
                        >
                          {displayText} {/* <--- AGORA EXIBE O NOME CORRETO */}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.primaryButton,
                (JSON.stringify(selectedInterests.sort()) ===
                  JSON.stringify(profile.interests.map((i) => i.id).sort()) ||
                  isSaving) &&
                  styles.disabledButton,
              ]}
              activeOpacity={0.8}
              disabled={
                JSON.stringify(selectedInterests.sort()) ===
                  JSON.stringify(profile.interests.map((i) => i.id).sort()) ||
                isSaving
              }
              onPress={() => void handleSaveInterests()}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>{t('common.save')}</Text> // 'Salvar'
              )}
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    gap: spacing.s3,
    padding: spacing.s5,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s3,
    backgroundColor: colors.background,
  },

  loadingText: {
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 14,
  },

  title: {
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 25,
  },

  subtitle: {
    marginTop: spacing.s1,
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 13,
    lineHeight: 19,
  },

  card: {
    padding: spacing.s4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radio.lg,
    backgroundColor: colors.surface,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.s2,
  },

  cardTitle: {
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 16,
  },

  cardValue: {
    color: colors.text,
    fontFamily: 'DM Sans Medium',
    fontSize: 15,
  },

  nativeLanguageDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s2,
    marginTop: spacing.s1,
  },

  nativeLanguageFlag: {
    fontSize: 24,
  },

  nativeLanguageName: {
    color: colors.text,
    fontFamily: 'DM Sans Medium',
    fontSize: 15,
  },

  emptyText: {
    marginTop: spacing.s2,
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 13,
  },

  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s2,
    marginTop: spacing.s2,
  },

  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.s3,
    paddingVertical: 8,
    borderRadius: radio.full,
    backgroundColor: 'rgba(79, 70, 229, 0.10)',
  },

    customInterestSection: {
    marginBottom: spacing.s3,
  },
  customInterestInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radio.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.s3,
    height: 54,
  },
  customInterestInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'DM Sans',
    color: colors.text,
  },
  addCustomInterestButton: {
    marginLeft: spacing.s2,
    backgroundColor: colors.primary,
    paddingVertical: spacing.s2,
    paddingHorizontal: spacing.s3,
    borderRadius: radio.full,
  },
  addCustomInterestButtonText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'DM Sans SemiBold',
  },
  addCustomInterestToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
    minHeight: 54,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    borderRadius: radio.full,
  },
  addCustomInterestToggleText: {
    color: colors.primary,
    fontFamily: 'DM Sans SemiBold',
    fontSize: 15,
  },

  interestChipText: {
    color: colors.primary,
    fontFamily: 'DM Sans SemiBold',
    fontSize: 12,
  },
    interestChipEmoji: {
    fontSize: 16,
  },

  manageLanguagesButton: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s2,
    paddingHorizontal: spacing.s4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radio.md,
    backgroundColor: colors.surface,
  },

  manageLanguagesButtonText: {
    flex: 1,
    color: colors.text,
    fontFamily: 'DM Sans Medium',
    fontSize: 14,
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.40)',
  },

modalCard: {
  maxHeight: '92%',
  borderTopLeftRadius: 28,
  borderTopRightRadius: 28,
  backgroundColor: colors.background,
  overflow: 'hidden',
  paddingHorizontal: spacing.s5,
  paddingTop: spacing.s5, // <--- Adicione esta linha
},

modalScroll: {
  flexShrink: 1, // <--- Mantenha esta linha
},

  modalScrollContent: {
    paddingTop: spacing.s5,
    paddingBottom: spacing.s4,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.s3,
    marginBottom: spacing.s4,
  },

  modalTitle: {
    maxWidth: 280,
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 20,
  },

  modalSubtitle: {
    maxWidth: 290,
    marginTop: 3,
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 12,
    lineHeight: 17,
  },

  closeButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radio.full,
    backgroundColor: colors.surface,
  },

  textInput: {
    minHeight: 54,
    paddingHorizontal: spacing.s4,
    paddingVertical: spacing.s3,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radio.md,
    backgroundColor: colors.surface,
    color: colors.text,
    fontFamily: 'DM Sans',
    fontSize: 15,
  },

  primaryButton: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
    borderRadius: radio.full,
    backgroundColor: colors.primary,
    marginTop: spacing.s4,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontFamily: 'DM Sans SemiBold',
    fontSize: 15,
  },

  disabledButton: {
    opacity: 0.5,
  },

  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.s3,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radio.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.s2,
  },

  languageOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(79, 70, 229, 0.10)',
  },

  optionFlag: {
    fontSize: 20,
  },

  languageOptionText: {
    flex: 1,
    color: colors.text,
    fontFamily: 'DM Sans Medium',
    fontSize: 14,
  },

  languageOptionTextSelected: {
    color: colors.primary,
    fontFamily: 'DM Sans Bold',
  },

  interestsGridModal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s2,
  },

  interestChipModal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.s3,
    paddingVertical: 8,
    borderRadius: radio.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },

  interestChipModalSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(79, 70, 229, 0.10)',
  },

  interestChipModalText: {
    color: colors.text,
    fontFamily: 'DM Sans Medium',
    fontSize: 12,
  },

    interestChipModalEmoji: {
    fontSize: 18,
  },

  interestChipModalTextSelected: {
    color: colors.primary,
    fontFamily: 'DM Sans Bold',
  },
});