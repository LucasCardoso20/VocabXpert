// src/theme/shadows.ts

import { Platform } from 'react-native';

// Função auxiliar para aplicar sombras de forma consistente
// CSS box-shadow: offset-x offset-y blur-radius spread-radius color
// RN shadow: shadowOffset, shadowOpacity, shadowRadius, shadowColor (iOS) + elevation (Android)
export const getShadow = (shadowKey: 'sh1' | 'sh2' | 'sh3' | 'shSheet' | 'shPrimary') => {
  switch (shadowKey) {
    case 'sh1':
      return Platform.select({
        ios: {
          shadowColor: 'rgba(13,27,66,0.06)',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
        },
        android: {
          elevation: 2, // Aproximação para Android
        },
      });
    case 'sh2':
      return Platform.select({
        ios: {
          shadowColor: 'rgba(13,27,66,0.08)',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 16,
        },
        android: {
          elevation: 4,
        },
      });
    case 'sh3':
      return Platform.select({
        ios: {
          shadowColor: 'rgba(13,27,66,0.12)',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 32,
        },
        android: {
          elevation: 8,
        },
      });
    case 'shSheet':
      return Platform.select({
        ios: {
          shadowColor: 'rgba(13,27,66,0.14)',
          shadowOffset: { width: 0, height: -8 }, // Sombra para cima
          shadowOpacity: 0.14,
          shadowRadius: 40,
        },
        android: {
          elevation: 10, // Aproximação para Android
        },
      });
    case 'shPrimary': // Box-shadow do btn-primary
      return Platform.select({
        ios: {
          shadowColor: 'rgba(37,99,235,0.30)',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.30,
          shadowRadius: 20,
        },
        android: {
          elevation: 8,
        },
      });
    default:
      return {};
  }
};