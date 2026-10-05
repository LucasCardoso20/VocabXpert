// src/data/onboardingData.ts

export const languages = [
  { id: 'pt', name: 'Português', flag: '🇧🇷' },
  { id: 'en', name: 'Inglês', flag: '🇺🇸' },
  { id: 'es', name: 'Espanhol', flag: '🇪🇸' },
  { id: 'it', name: 'Italiano', flag: '🇮🇹' },
  { id: 'fr', name: 'Francês', flag: '🇫🇷' },
  { id: 'de', name: 'Alemão', flag: '🇩🇪' },
  { id: 'jp', name: 'Japonês', flag: '🇯🇵' },
  { id: 'cn', name: 'Chinês', flag: '🇨🇳' },
];

export const levels = [
  {
    id: 'BEGINNER',
    label: 'levels.beginner.label',
    description: 'levels.beginner.description',
  },
  {
    id: 'INTERMEDIATE',
    label: 'levels.intermediate.label',
    description: 'levels.intermediate.description',
  },
  {
    id: 'ADVANCED',
    label: 'levels.advanced.label',
    description: 'levels.advanced.description',
  },
];

import { APP_INTERESTS } from './appData';

export const interests = APP_INTERESTS;