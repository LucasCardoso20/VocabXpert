import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../theme/colors';
import { radio } from '../../theme/radio';
import { spacing } from '../../theme/spacing';
import { getShadow } from '../../theme/shadows';

type TabConfig = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
};

const routeConfig: Record<string, TabConfig> = {
  index: {
    label: 'Início',
    icon: 'home-outline',
    activeIcon: 'home',
  },

  study: {
    label: 'Estudar',
    icon: 'play-circle-outline',
    activeIcon: 'play-circle',
  },

  reviews: {
    label: 'Revisões',
    icon: 'calendar-outline',
    activeIcon: 'calendar',
  },

  progress: {
    label: 'Progresso',
    icon: 'stats-chart-outline',
    activeIcon: 'stats-chart',
  },
};

export default function CustomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom + 10 }]}>
      <View style={[styles.bar, getShadow('sh3')]}>
        {state.routes.map((route, index) => {
          const config = routeConfig[route.name];

          /**
           * Segurança extra: se por acidente uma rota que não pertence
           * ao menu estiver registrada no navigator, ela não aparece.
           */
          if (!config) {
            return null;
          }

          const isFocused = state.index === index;

          const handlePress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              style={styles.tab}
              onPress={handlePress}
              accessibilityRole="button"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={config.label}
            >
              <View
                style={[
                  styles.iconContainer,
                  isFocused && styles.iconContainerActive,
                ]}
              >
                <Ionicons
                  name={isFocused ? config.activeIcon : config.icon}
                  size={20}
                  color={isFocused ? '#FFFFFF' : colors.light}
                />
              </View>

              <Text
                style={[
                  styles.label,
                  isFocused && styles.labelActive,
                ]}
                numberOfLines={1}
              >
                {config.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    paddingHorizontal: spacing.s4,
    pointerEvents: 'box-none',
  },

  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.s2,
    paddingVertical: spacing.s2,
    borderRadius: radio.xl ?? 24,
    backgroundColor: colors.surface,
  },

  tab: {
    flex: 1,
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconContainer: {
    width: 34,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radio.full,
  },

  iconContainerActive: {
    backgroundColor: colors.primary,
    borderRadius: radio.full,
  },

  label: {
    marginTop: 3,
    color: colors.light,
    fontFamily: 'DM Sans Medium',
    fontSize: 10,
  },

  labelActive: {
    color: colors.primary,
    fontFamily: 'DM Sans Bold',
  },
});