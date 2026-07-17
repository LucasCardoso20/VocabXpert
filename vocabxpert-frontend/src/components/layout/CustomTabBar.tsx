import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radio } from '../../theme/radio';
import { getShadow } from '../../theme/shadows';

const routeConfig: Record<
  string,
  { label: string; icon: keyof typeof Ionicons.glyphMap; activeIcon: keyof typeof Ionicons.glyphMap }
> = {
  index: { label: 'Vocabulário', icon: 'home-outline', activeIcon: 'home' },
  favorites: { label: 'Favoritos', icon: 'heart-outline', activeIcon: 'heart' },
  collections: { label: 'Coleções', icon: 'grid-outline', activeIcon: 'grid' },
  settings: { label: 'Configurações', icon: 'settings-outline', activeIcon: 'settings' },
};

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom + 12 }]}>
      <View style={[styles.inner, getShadow('sh3')]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const cfg = routeConfig[route.name];
          if (!cfg) return null;

          const onPress = () => {
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
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.8}
              style={styles.item}
            >
              {isFocused ? (
                <View style={styles.activePill}>
                  <Ionicons name={cfg.activeIcon} size={18} color="#fff" />
                  <Text style={styles.activeText}>{cfg.label}</Text>
                </View>
              ) : (
                <Ionicons name={cfg.icon} size={22} color={colors.light} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.s5,
    pointerEvents: 'box-none',
  },
  inner: {
    backgroundColor: colors.surface,
    borderRadius: radio.xl ?? 24,
    paddingHorizontal: spacing.s3,
    paddingVertical: spacing.s3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s2,
    backgroundColor: colors.primary,
    borderRadius: radio.full,
    paddingVertical: spacing.s2,
    paddingHorizontal: spacing.s4,
  },
  activeText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'DM Sans SemiBold',
  },
});