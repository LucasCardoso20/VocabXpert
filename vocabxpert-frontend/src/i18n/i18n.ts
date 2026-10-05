// src/i18n/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization'; // Para detectar o idioma do dispositivo
import { I18nManager } from 'react-native'; // Para RTL (Right-to-Left) se necessário

// Importe seus arquivos de tradução aqui
// Certifique-se de que estes arquivos existam em src/i18n/locales/
import en from './locales/en.json';
import pt from './locales/pt.json';

// Os recursos de tradução
const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
};

// Detecta o idioma do dispositivo
const languageDetector = {
  type: 'languageDetector' as const,
  async: true, // Define como assíncrono
  detect: (callback: (lang: string) => void) => {
    // Expo Localization retorna o idioma preferido do usuário
    // Pega o primeiro idioma da lista, ou 'en' como fallback
    const locale = Localization.getLocales()[0]?.languageCode;
    callback(locale || 'en'); // Fallback para 'en' se não detectar
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector) // Usa o detector de idioma personalizado
  .use(initReactI18next) // Passa a instância do i18n para react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Idioma padrão caso o detectado não esteja disponível
    debug: __DEV__, // Ativa o debug em ambiente de desenvolvimento
    interpolation: {
      escapeValue: false, // React já escapa os valores por padrão
    },
    // Removido compatibilityJSON: 'v3' pois não é mais necessário e causava erro de tipo
    // O i18next v23+ geralmente não precisa disso ou usa 'v4'
  });

// Função para mudar o idioma dinamicamente
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
};

export default i18n;