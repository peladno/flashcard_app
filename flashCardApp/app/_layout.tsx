import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.light.primary },
        headerTintColor: Colors.light.white,
      }}
    >
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen
        name='(modals)/set/[id]'
        options={{ presentation: 'modal', title: '' }}
      />
    </Stack>
  );
};

export default Layout;
