import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useProfile } from '@/src/contexts/ProfileContext';
import {
  createLearningLanguage,
  deleteLearningLanguage,
  updateLearningLanguage,
  type LearningLanguage,
  type TargetLevel,
} from '@/src/services/profileService';
import { colors } from '@/src/theme/colors';
import { radio } from '@/src/theme/radio';
import { spacing } from '@/src/theme/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const { t } = useTranslation(); // Inicialize o hook de tradução

const AVAILABLE_LANGUAGES = [
  { code: 'en', nameKey: t('languagesScreen.languageNames.en'), flag: '🇺🇸' },
  { code: 'es', nameKey: t('languagesScreen.languageNames.es'), flag: '🇪🇸' },
  { code: 'fr', nameKey: t('languagesScreen.languageNames.fr'), flag: '🇫🇷' },
  { code: 'it', nameKey: t('languagesScreen.languageNames.it'), flag: '🇮🇹' },
  { code: 'de', nameKey: t('languagesScreen.languageNames.de'), flag: '🇩🇪' },
  { code: 'ja', nameKey: t('languagesScreen.languageNames.ja'), flag: '🇯🇵' },
  { code: 'ko', nameKey: t('languagesScreen.languageNames.ko'), flag: '🇰🇷' },
  { code: 'zh', nameKey: t('languagesScreen.languageNames.zh'), flag: '🇨🇳' },
];

const LEVEL_OPTIONS: Array<{
  value: TargetLevel;
  labelKey: string;
  descriptionKey: string;
}> = [
  {
    value: 'BEGINNER',
    labelKey: t('languagesScreen.levels.beginner.label'),
    descriptionKey: t('languagesScreen.levels.beginner.description'),
  },
  {
    value: 'INTERMEDIATE',
    labelKey: t('languagesScreen.levels.intermediate.label'),
    descriptionKey: t('languagesScreen.levels.intermediate.description'),
  },
  {
    value: 'ADVANCED',
    labelKey: t('languagesScreen.levels.advanced.label'),
    descriptionKey: t('languagesScreen.levels.advanced.description'),
  },
];

function getLanguageData(code: string) {
  return (
    AVAILABLE_LANGUAGES.find((language) => language.code === code) ?? {
      code,
      nameKey: null as string | null,
      flag: '🌐',
    }
  );
}

function getLanguageName(
  t: (key: string, options?: Record<string, unknown>) => string,
  languageData: ReturnType<typeof getLanguageData>
) {
  return languageData.nameKey
    ? t(languageData.nameKey)
    : languageData.code.toUpperCase();
}

function getLevelLabel(
  t: (key: string, options?: Record<string, unknown>) => string,
  level: TargetLevel
) {
  return (
    LEVEL_OPTIONS.find((option) => option.value === level)?.labelKey
      ? t(LEVEL_OPTIONS.find((option) => option.value === level)!.labelKey)
      : level
  );
}

export default function LanguagesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation(); // Inicialize o hook de tradução

  const {
    profile,
    activeLanguage,
    isLoadingProfile,
    refreshProfile,
    changeActiveLanguage,
  } = useProfile();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] =
    useState<LearningLanguage | null>(null);

  const [selectedLanguageCode, setSelectedLanguageCode] = useState('');
  const [selectedLevel, setSelectedLevel] =
    useState<TargetLevel>('BEGINNER');

  const [makeActiveAfterCreate, setMakeActiveAfterCreate] = useState(true);

  const [isSaving, setIsSaving] = useState(false);
  const [changingLanguageId, setChangingLanguageId] = useState<string | null>(
    null
  );

  const availableToAdd = useMemo(() => {
    const currentCodes = new Set(
      (profile?.languages ?? []).map((language) => language.language)
    );

    return AVAILABLE_LANGUAGES.filter(
      (language) => !currentCodes.has(language.code)
    );
  }, [profile?.languages]);

  function openAddModal() {
    setSelectedLanguageCode(availableToAdd[0]?.code ?? '');
    setSelectedLevel('BEGINNER');
    setMakeActiveAfterCreate(true);
    setIsAddModalOpen(true);
  }

  async function handleActivate(languageId: string) {
    if (languageId === activeLanguage?.id) {
      return;
    }

    try {
      setChangingLanguageId(languageId);

      await changeActiveLanguage(languageId);
    } catch (error: any) {
      console.error(
        '[LanguagesScreen] activate error:',
        error?.response?.data ?? error?.message ?? error
      );

      Alert.alert(
        t('languagesScreen.alerts.activateErrorTitle'),
        t('languagesScreen.alerts.activateErrorMessage')
      );
    } finally {
      setChangingLanguageId(null);
    }
  }

  async function handleCreateLanguage() {
    if (!selectedLanguageCode) {
      Alert.alert(
        t('languagesScreen.alerts.selectLanguageTitle'),
        t('languagesScreen.alerts.selectLanguageMessage')
      );
      return;
    }

    try {
      setIsSaving(true);

      await createLearningLanguage({
        language: selectedLanguageCode,
        level: selectedLevel,
        makeActive: makeActiveAfterCreate,
      });

      await refreshProfile();

      setIsAddModalOpen(false);
    } catch (error: any) {
      console.error(
        '[LanguagesScreen] create error:',
        error?.response?.data ?? error?.message ?? error
      );

      const apiError = error?.response?.data?.error;

      if (apiError === 'LANGUAGE_ALREADY_EXISTS') {
        Alert.alert(
          t('languagesScreen.alerts.alreadyAddedTitle'),
          t('languagesScreen.alerts.alreadyAddedMessage')
        );
        return;
      }

      Alert.alert(
        t('languagesScreen.alerts.addErrorTitle'),
        t('languagesScreen.alerts.addErrorMessage')
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpdateLevel(level: TargetLevel) {
    if (!editingLanguage) {
      return;
    }

    try {
      setIsSaving(true);

      await updateLearningLanguage(editingLanguage.id, { level });

      await refreshProfile();

      setEditingLanguage(null);
    } catch (error: any) {
      console.error(
        '[LanguagesScreen] update level error:',
        error?.response?.data ?? error?.message ?? error
      );

      Alert.alert(
        t('languagesScreen.alerts.updateErrorTitle'),
        t('languagesScreen.alerts.updateErrorMessage')
      );
    } finally {
      setIsSaving(false);
    }
  }

  function confirmDelete(language: LearningLanguage) {
    const languageData = getLanguageData(language.language);
    const isActive = language.id === activeLanguage?.id;

    /* ... aqui falta o restante da função no seu trecho original —
       provavelmente um Alert.alert de confirmação de exclusão com
       botões de cancelar/excluir, e a chamada para deletar o idioma.
       Me manda essa parte que eu completo com as chaves de tradução. */
  }

  if (isLoadingProfile || !profile) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>{t('languagesScreen.loading')}</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={styles.title}>{t('languagesScreen.title')}</Text>

          <Text style={styles.subtitle}>
            {t('languagesScreen.subtitle')}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons
              name="language-outline"
              size={21}
              color={colors.primary}
            />
          </View>

          <Text style={styles.infoText}>
            {t('languagesScreen.infoText')}
          </Text>
        </View>

        <View style={styles.languagesList}>
          {profile.languages.map((language) => {
            const languageData = getLanguageData(language.language);
            const isActive = language.id === activeLanguage?.id;
            const isBusy = changingLanguageId === language.id;

            return (
              <View
                key={language.id}
                style={[styles.languageCard, isActive && styles.activeCard]}
              >
                <View style={styles.languageHeader}>
                  <View style={styles.languageIdentity}>
                    <Text style={styles.flag}>{languageData.flag}</Text>

                    <View style={styles.languageTexts}>
                      <Text style={styles.languageName}>
                        {getLanguageName(t, languageData)}
                      </Text>

                      <Text style={styles.languageMeta}>
                        {getLevelLabel(t, language.level)} ·{' '}
                        {t('languagesScreen.listsCount', {
                          count: language.listCount,
                        })}
                      </Text>
                    </View>
                  </View>

                  {isActive && (
                    <View style={styles.activeBadge}>
                      <Ionicons
                        name="checkmark-circle"
                        size={14}
                        color={colors.primary}
                      />

                      <Text style={styles.activeBadgeText}>{t('languagesScreen.activeBadge')}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.languageActions}>
                  {!isActive && (
                    <TouchableOpacity
                      style={styles.activateButton}
                      activeOpacity={0.8}
                      disabled={Boolean(changingLanguageId)}
                      onPress={() => void handleActivate(language.id)}
                    >
                      {isBusy ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                      ) : (
                        <>
                          <Ionicons
                            name="play-outline"
                            size={16}
                            color="#FFFFFF"
                          />

                          <Text style={styles.activateButtonText}>
                            {t('languagesScreen.activateButton')}
                          </Text>
                        </>
                      )}
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={styles.secondaryButton}
                    activeOpacity={0.8}
                    disabled={Boolean(changingLanguageId)}
                    onPress={() => setEditingLanguage(language)}
                  >
                    <Ionicons
                      name="school-outline"
                      size={17}
                      color={colors.primary}
                    />

                    <Text style={styles.secondaryButtonText}>{t('languagesScreen.levelButton')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    activeOpacity={0.8}
                    disabled={Boolean(changingLanguageId)}
                    onPress={() => confirmDelete(language)}
                  >
                    {isBusy ? (
                      <ActivityIndicator size="small" color={colors.danger} />
                    ) : (
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color={colors.danger}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={[
            styles.addButton,
            availableToAdd.length === 0 && styles.disabledButton,
          ]}
          activeOpacity={0.8}
          disabled={availableToAdd.length === 0}
          onPress={openAddModal}
        >
          <Ionicons name="add-circle-outline" size={21} color={colors.primary} />

          <Text style={styles.addButtonText}>{t('languagesScreen.addLanguage')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileButton}
          activeOpacity={0.8}
          onPress={() => router.push('/profile')}
        >
          <Ionicons name="person-outline" size={19} color={colors.muted} />

          <Text style={styles.profileButtonText}>{t('languagesScreen.goToProfile')}</Text>

          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.muted}
          />
        </TouchableOpacity>
      </ScrollView>

      {/* Modal: adicionar idioma */}
      <Modal
        visible={isAddModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsAddModalOpen(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => !isSaving && setIsAddModalOpen(false)}
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
  <ScrollView
    style={styles.modalScroll}
    contentContainerStyle={styles.modalScrollContent}
    showsVerticalScrollIndicator={false}
    bounces={false}
  >
    <View style={styles.modalHeader}>
      <View>
        <Text style={styles.modalTitle}>{t('languagesScreen.addLanguage')}</Text>

        <Text style={styles.modalSubtitle}>
          {t('languagesScreen.addModal.subtitle')}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.closeButton}
        disabled={isSaving}
        onPress={() => setIsAddModalOpen(false)}
      >
        <Ionicons name="close" size={20} color={colors.muted} />
      </TouchableOpacity>
    </View>

    <Text style={styles.fieldLabel}>{t('languagesScreen.addModal.languageLabel')}</Text>

    <View style={styles.optionsWrap}>
      {availableToAdd.map((language) => {
        const selected = language.code === selectedLanguageCode;

        return (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageOption,
              selected && styles.languageOptionSelected,
            ]}
            activeOpacity={0.8}
            disabled={isSaving}
            onPress={() => setSelectedLanguageCode(language.code)}
          >
            <Text style={styles.optionFlag}>{language.flag}</Text>

            <Text
              style={[
                styles.languageOptionText,
                selected && styles.languageOptionTextSelected,
              ]}
            >
              {t(language.nameKey)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>

    <Text style={styles.fieldLabel}>{t('languagesScreen.addModal.levelLabel')}</Text>

    <View style={styles.levelOptions}>
      {LEVEL_OPTIONS.map((option) => {
        const selected = option.value === selectedLevel;

        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.levelOption,
              selected && styles.levelOptionSelected,
            ]}
            activeOpacity={0.8}
            disabled={isSaving}
            onPress={() => setSelectedLevel(option.value)}
          >
            <View style={styles.levelOptionTextArea}>
              <Text
                style={[
                  styles.levelOptionTitle,
                  selected && styles.levelOptionTitleSelected,
                ]}
              >
                {t(option.labelKey)}
              </Text>

              <Text style={styles.levelOptionDescription}>
                {t(option.descriptionKey)}
              </Text>
            </View>

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
    </View>

    <View style={styles.switchRow}>
      <View style={styles.switchTextArea}>
        <Text style={styles.switchTitle}>{t('languagesScreen.addModal.useNowTitle')}</Text>

        <Text style={styles.switchDescription}>
          {t('languagesScreen.addModal.useNowDescription')}
        </Text>
      </View>

      <Switch
        value={makeActiveAfterCreate}
        onValueChange={setMakeActiveAfterCreate}
        disabled={isSaving}
        trackColor={{
          false: colors.border,
          true: `${colors.primary}88`,
        }}
        thumbColor={
          makeActiveAfterCreate ? colors.primary : colors.surface
        }
      />
    </View>

    <TouchableOpacity
      style={[
        styles.primaryButton,
        (!selectedLanguageCode || isSaving) && styles.disabledButton,
      ]}
      activeOpacity={0.8}
      disabled={!selectedLanguageCode || isSaving}
      onPress={() => void handleCreateLanguage()}
    >
      {isSaving ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <>
          <Ionicons name="add-outline" size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>
            {t('languagesScreen.addLanguage')}
          </Text>
        </>
      )}
    </TouchableOpacity>
  </ScrollView>
</Pressable>
        </Pressable>
      </Modal>

      {/* Modal: alterar nível */}
      <Modal
        visible={Boolean(editingLanguage)}
        transparent
        animationType="fade"
        onRequestClose={() => !isSaving && setEditingLanguage(null)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => !isSaving && setEditingLanguage(null)}
        >
          <Pressable style={styles.modalCard} onPress={() => undefined}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  {t('languagesScreen.editModal.title', {
                    name: editingLanguage
                      ? getLanguageName(t, getLanguageData(editingLanguage.language))
                      : '',
                  })}
                </Text>

                <Text style={styles.modalSubtitle}>
                  {t('languagesScreen.editModal.subtitle')}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                disabled={isSaving}
                onPress={() => setEditingLanguage(null)}
              >
                <Ionicons name="close" size={20} color={colors.muted} />
              </TouchableOpacity>
            </View>

            <View style={styles.levelOptions}>
              {LEVEL_OPTIONS.map((option) => {
                const selected = editingLanguage?.level === option.value;

                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.levelOption,
                      selected && styles.levelOptionSelected,
                    ]}
                    activeOpacity={0.8}
                    disabled={isSaving || selected}
                    onPress={() => void handleUpdateLevel(option.value)}
                  >
                    <View style={styles.levelOptionTextArea}>
                      <Text
                        style={[
                          styles.levelOptionTitle,
                          selected && styles.levelOptionTitleSelected,
                        ]}
                      >
                        {t(option.labelKey)}
                      </Text>

                      <Text style={styles.levelOptionDescription}>
                        {t(option.descriptionKey)}
                      </Text>
                    </View>

                    {isSaving && !selected ? (
                      <ActivityIndicator size="small" color={colors.primary} />
                    ) : selected ? (
                      <Ionicons
                        name="checkmark-circle"
                        size={21}
                        color={colors.primary}
                      />
                    ) : (
                      <Ionicons
                        name="chevron-forward"
                        size={19}
                        color={colors.muted}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
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
    paddingBottom: spacing.s6,
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

  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s3,
    padding: spacing.s3,
    borderRadius: radio.md,
    backgroundColor: 'rgba(79, 70, 229, 0.09)',
  },

  infoIcon: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radio.full,
    backgroundColor: colors.surface,
  },

  infoText: {
    flex: 1,
    color: colors.text,
    fontFamily: 'DM Sans',
    fontSize: 12,
    lineHeight: 18,
  },

  languagesList: {
    gap: spacing.s3,
  },

  languageCard: {
    padding: spacing.s4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radio.lg,
    backgroundColor: colors.surface,
  },

  activeCard: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },

  languageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.s2,
  },

  languageIdentity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s3,
  },

  flag: {
    fontSize: 28,
  },

  languageTexts: {
    flex: 1,
  },

  languageName: {
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 17,
  },

  languageMeta: {
    marginTop: 2,
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 12,
  },

  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: radio.full,
    backgroundColor: 'rgba(79, 70, 229, 0.10)',
  },

  activeBadgeText: {
    color: colors.primary,
    fontFamily: 'DM Sans SemiBold',
    fontSize: 11,
  },

  languageActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s2,
    marginTop: spacing.s4,
  },

  activateButton: {
    minHeight: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: spacing.s3,
    borderRadius: radio.full,
    backgroundColor: colors.primary,
  },

  activateButtonText: {
    color: '#FFFFFF',
    fontFamily: 'DM Sans SemiBold',
    fontSize: 13,
  },

  secondaryButton: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: spacing.s3,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radio.full,
  },

  secondaryButtonText: {
    color: colors.primary,
    fontFamily: 'DM Sans SemiBold',
    fontSize: 13,
  },

  deleteButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.25)',
    borderRadius: radio.full,
    backgroundColor: 'rgba(220, 38, 38, 0.06)',
  },

  addButton: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
    paddingHorizontal: spacing.s4,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    borderRadius: radio.full,
  },

  addButtonText: {
    color: colors.primary,
    fontFamily: 'DM Sans SemiBold',
    fontSize: 15,
  },

  profileButton: {
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

  profileButtonText: {
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
},

modalScroll: {
  flexShrink: 1,
},

modalScrollContent: {
  paddingHorizontal: spacing.s5,
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

  fieldLabel: {
    marginTop: spacing.s3,
    marginBottom: spacing.s2,
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 14,
  },

  optionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s2,
  },

  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.s3,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radio.full,
    backgroundColor: colors.surface,
  },

  languageOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(79, 70, 229, 0.10)',
  },

  optionFlag: {
    fontSize: 18,
  },

  languageOptionText: {
    color: colors.text,
    fontFamily: 'DM Sans Medium',
    fontSize: 12,
  },

  languageOptionTextSelected: {
    color: colors.primary,
    fontFamily: 'DM Sans Bold',
  },

  levelOptions: {
    gap: spacing.s2,
  },

  levelOption: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s3,
    padding: spacing.s3,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radio.md,
    backgroundColor: colors.surface,
  },

  levelOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(79, 70, 229, 0.07)',
  },

  levelOptionTextArea: {
    flex: 1,
  },

  levelOptionTitle: {
    color: colors.text,
    fontFamily: 'DM Sans SemiBold',
    fontSize: 14,
  },

  levelOptionTitleSelected: {
    color: colors.primary,
    fontFamily: 'DM Sans Bold',
  },

  levelOptionDescription: {
    marginTop: 2,
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 11,
    lineHeight: 15,
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s3,
    marginTop: spacing.s4,
    marginBottom: spacing.s4,
  },

  switchTextArea: {
    flex: 1,
  },

  switchTitle: {
    color: colors.text,
    fontFamily: 'DM Sans SemiBold',
    fontSize: 14,
  },

  switchDescription: {
    marginTop: 2,
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 11,
    lineHeight: 15,
  },

  primaryButton: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
    borderRadius: radio.full,
    backgroundColor: colors.primary,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontFamily: 'DM Sans SemiBold',
    fontSize: 15,
  },

  disabledButton: {
    opacity: 0.5,
  },
});