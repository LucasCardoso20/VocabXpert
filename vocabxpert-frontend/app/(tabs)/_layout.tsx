import React from 'react';
import { Tabs } from 'expo-router';

import CustomTabBar from '@/src/components/layout/CustomTabBar';
import HomeHeader from '@/src/components/layout/HomeHeader';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          headerShown: true,
          header: () => <HomeHeader />,
        }}
      />

      <Tabs.Screen
        name="study"
        options={{
          title: 'Estudar',
        }}
      />

      <Tabs.Screen
        name="reviews"
        options={{
          title: 'Revisões',
        }}
      />

      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progresso',
        }}
      />
    </Tabs>
  );
}