import React from 'react';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next'; // Importe o hook useTranslation

import CustomTabBar from '@/src/components/layout/CustomTabBar';
import HomeHeader from '@/src/components/layout/HomeHeader';

export default function TabsLayout() {
  const { t } = useTranslation(); // Inicialize o hook de tradução

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
          title: t('tabs.home'), // Usando a chave de tradução
          headerShown: true,
          header: () => <HomeHeader />,
        }}
      />

      <Tabs.Screen
        name="study"
        options={{
          title: t('tabs.study'), // Usando a chave de tradução
        }}
      />

      <Tabs.Screen
        name="reviews"
        options={{
          title: t('tabs.reviews'), // Usando a chave de tradução
        }}
      />

      <Tabs.Screen
        name="progress"
        options={{
          title: t('tabs.progress'), // Usando a chave de tradução
        }}
      />
    </Tabs>
  );
}