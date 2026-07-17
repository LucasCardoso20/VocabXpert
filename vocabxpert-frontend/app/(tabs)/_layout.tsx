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
          title: 'Vocabulário',
          headerShown: true,
          header: () => <HomeHeader userName="Juliana" />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          title: 'Coleções',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
        }}
      />
    </Tabs>
  );
}