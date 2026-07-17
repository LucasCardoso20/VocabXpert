import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { radio } from '../../../theme/radio';

export default function HomeHeader({ userName }: { userName: string }) {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <View style={styles.avatar}>
          <Text style={styles.avatarEmoji}>👩🏽‍🦱</Text>
        </View>
        <View>
          <Text style={styles.hello}>Hello,</Text>
          <Text style={styles.name}>{userName}!</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={20} color={colors.muted} />
        </Pressable>
        <Pressable style={styles.flagBtn}>
          <Text style={styles.flag}>🇺🇸</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.s5,
    paddingTop: spacing.s3,
    paddingBottom: spacing.s4,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: spacing.s3 },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#F5DEB3', alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 22 },
  hello: { fontSize: 13, color: colors.muted, fontFamily: 'DM Sans' },
  name: { fontSize: 18, color: colors.text, fontFamily: 'DM Sans Bold' },
  actions: { flexDirection: 'row', gap: spacing.s2 },
  iconBtn: {
    width: 40, height: 40, borderRadius: radio.full,
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
  },
  flagBtn: {
    width: 44, height: 44, borderRadius: radio.full,
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
  },
  flag: { fontSize: 20 },
});