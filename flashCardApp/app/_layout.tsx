import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const Layout = () => {
  const router = useRouter();
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
        options={{
          presentation: 'modal',
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name='close-outline'
                size={24}
                color={Colors.light.white}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name='(modals)/set/Create'
        options={{ presentation: 'modal', title: 'Create Card Set' }}
      />
    </Stack>
  );
};

export default Layout;
