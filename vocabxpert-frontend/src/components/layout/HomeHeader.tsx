import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { radio } from '../../theme/radio';
import { getShadow } from '../../theme/shadows';

interface HomeHeaderProps {
  userName: string;
}

export default function HomeHeader({ userName }: HomeHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.left}>
        <View style={[styles.avatar, getShadow('sh1')]}>
          <Text style={styles.avatarEmoji}>👦</Text>
        </View>

        <View>
          <Text style={styles.hello}>Hello,</Text>
          <Text style={styles.name}>{userName}!</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.iconBtn, getShadow('sh1')]} activeOpacity={0.8}>
          <Ionicons name="notifications-outline" size={20} color={colors.muted} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.flagBtn, getShadow('sh1')]} activeOpacity={0.8}>
          <Text style={styles.flag}>🇺🇸</Text>
        </TouchableOpacity>
      </View>
    </View>
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
});