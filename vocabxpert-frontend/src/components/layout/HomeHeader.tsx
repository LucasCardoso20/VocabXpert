import React, { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProfile } from '@/src/contexts/ProfileContext';
import { getShadow } from '@/src/theme/shadows';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';

const languageFlags: Record<string, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷',
  it: '🇮🇹',
  de: '🇩🇪',
  pt: '🇧🇷',
  ja: '🇯🇵',
  ko: '🇰🇷',
  zh: '🇨🇳',
};

const languageNames: Record<string, string> = {
  en: 'Inglês',
  es: 'Espanhol',
  fr: 'Francês',
  it: 'Italiano',
  de: 'Alemão',
  pt: 'Português',
  ja: 'Japonês',
  ko: 'Coreano',
  zh: 'Chinês',
};

function getFlag(languageCode?: string) {
  if (!languageCode) {
    return '🌐';
  }

  return languageFlags[languageCode.toLowerCase()] ?? '🌐';
}

function getLanguageName(languageCode?: string) {
  if (!languageCode) {
    return 'Idioma';
  }

  const normalizedCode = languageCode.toLowerCase();

  return languageNames[normalizedCode] ?? normalizedCode.toUpperCase();
}

export default function HomeHeader() {
  const insets = useSafeAreaInsets();

  const {
    profile,
    activeLanguage,
    isLoadingProfile,
    changeActiveLanguage,
  } = useProfile();

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [changingLanguageId, setChangingLanguageId] = useState<string | null>(
    null
  );

  const userName = profile?.displayName?.trim() || 'Usuário';

  async function handleChangeLanguage(languageId: string) {
    if (languageId === activeLanguage?.id) {
      setIsLanguageModalOpen(false);
      return;
    }

    try {
      setChangingLanguageId(languageId);

      await changeActiveLanguage(languageId);

      setIsLanguageModalOpen(false);
    } catch (error: any) {
      console.error(
        'Erro ao alterar idioma ativo:',
        error?.response?.data || error?.message
      );
    } finally {
      setChangingLanguageId(null);
    }
  }

  return (
    <>
      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
        <View style={styles.left}>
          <View style={[styles.avatar, getShadow('sh1')]}>
            <Text style={styles.avatarEmoji}>👦</Text>
          </View>

          <View>
            <Text style={styles.hello}>Hello,</Text>

            <Text style={styles.name} numberOfLines={1}>
              {isLoadingProfile ? 'Carregando...' : `${userName}!`}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.iconBtn, getShadow('sh1')]}
            activeOpacity={0.8}
          >
            <Ionicons
              name="notifications-outline"
              size={20}
              color={colors.muted}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.flagBtn, getShadow('sh1')]}
            activeOpacity={0.8}
            onPress={() => setIsLanguageModalOpen(true)}
            disabled={!profile || profile.languages.length === 0}
          >
            <Text style={styles.flag}>
              {isLoadingProfile ? '⌛' : getFlag(activeLanguage?.language)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isLanguageModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsLanguageModalOpen(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setIsLanguageModalOpen(false)}
        >
          <Pressable style={styles.modalCard} onPress={() => undefined}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Idioma de estudo</Text>
                <Text style={styles.modalSubtitle}>
                  Escolha o contexto atual
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setIsLanguageModalOpen(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={20} color={colors.muted} />
              </TouchableOpacity>
            </View>

            {profile?.languages.map((language) => {
              const isActive = language.id === activeLanguage?.id;
              const isChanging = language.id === changingLanguageId;

              return (
                <TouchableOpacity
                  key={language.id}
                  style={[
                    styles.languageItem,
                    isActive && styles.languageItemActive,
                  ]}
                  activeOpacity={0.8}
                  disabled={Boolean(changingLanguageId)}
                  onPress={() => void handleChangeLanguage(language.id)}
                >
                  <Text style={styles.languageFlag}>
                    {getFlag(language.language)}
                  </Text>

                  <View style={styles.languageTextArea}>
                    <Text style={styles.languageName}>
                      {getLanguageName(language.language)}
                    </Text>

                    <Text style={styles.languageLevel}>
                      {language.level}
                    </Text>
                  </View>

                  {isChanging ? (
                    <ActivityIndicator size="small" color={colors.primary} />
                  ) : isActive ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color={colors.primary}
                    />
                  ) : (
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={colors.muted}
                    />
                  )}
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={styles.manageButton}
              activeOpacity={0.8}
              onPress={() => {
                setIsLanguageModalOpen(false);

                /**
                 * Aqui entrará a futura rota/tela de Perfil.
                 * Não navegamos ainda porque ela ainda não foi criada.
                 */
              }}
            >
              <Ionicons
                name="settings-outline"
                size={18}
                color={colors.primary}
              />

              <Text style={styles.manageButtonText}>
                Gerenciar idiomas
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.s5,
    paddingBottom: spacing.s4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s3,
    flex: 1,
    paddingRight: spacing.s2,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5DEB3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarEmoji: {
    fontSize: 22,
  },

  hello: {
    fontSize: 13,
    color: colors.muted,
    fontFamily: 'DM Sans',
  },

  name: {
    fontSize: 18,
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    letterSpacing: -0.3,
    maxWidth: 160,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s2,
  },

  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  flagBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  flag: {
    fontSize: 20,
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(20, 20, 20, 0.36)',
  },

  modalCard: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.s5,
    paddingTop: spacing.s5,
    paddingBottom: spacing.s5,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.s4,
  },

  modalTitle: {
    color: colors.text,
    fontFamily: 'DM Sans Bold',
    fontSize: 20,
  },

  modalSubtitle: {
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 13,
    marginTop: 2,
  },

  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  languageItem: {
    minHeight: 64,
    borderRadius: 16,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.s3,
    marginBottom: spacing.s2,
    flexDirection: 'row',
    alignItems: 'center',
  },

  languageItemActive: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },

  languageFlag: {
    fontSize: 24,
    marginRight: spacing.s3,
  },

  languageTextArea: {
    flex: 1,
  },

  languageName: {
    color: colors.text,
    fontFamily: 'DM Sans SemiBold',
    fontSize: 15,
  },

  languageLevel: {
    color: colors.muted,
    fontFamily: 'DM Sans',
    fontSize: 12,
    marginTop: 2,
  },

  manageButton: {
    minHeight: 48,
    marginTop: spacing.s2,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
    backgroundColor: 'rgba(77, 116, 255, 0.10)',
  },

  manageButtonText: {
    color: colors.primary,
    fontFamily: 'DM Sans SemiBold',
    fontSize: 14,
  },
});