import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link, Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import 'react-native-url-polyfill/auto';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.light.primary },
        headerTintColor: Colors.light.white,
        tabBarActiveTintColor: Colors.light.primary,
      }}
    >
      <Tabs.Screen
        name='Sets'
        options={{
          title: 'My Sets',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='home-outline' color={color} size={size} />
          ),
          headerRight: () => (
            <Link href={'/'} asChild>
              <TouchableOpacity style={{ marginRight: 10 }}>
                <Ionicons
                  name='add-outline'
                  size={30}
                  color={Colors.light.white}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='Search'
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='search-outline' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='Profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='person-outline' color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
