// src/theme/typography.ts

import { useFonts } from 'expo-font';

export const useAppFonts = () => {
  const [fontsLoaded] = useFonts({
    'DM Sans': require('../../assets/fonts/DMSans-Regular.ttf'),
    'DM Sans Medium': require('../../assets/fonts/DMSans-Medium.ttf'),
    'DM Sans SemiBold': require('../../assets/fonts/DMSans-SemiBold.ttf'),
    'DM Sans Bold': require('../../assets/fonts/DMSans-Bold.ttf'),
  });
  return fontsLoaded;
};