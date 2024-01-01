import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_STORAGE_KEY } from '../data/api';

const Page = () => {
  const [hasId, setHasId] = useState(false);

  useEffect(() => {
    const loadId = async () => {
      const id = await AsyncStorage.getItem(USER_STORAGE_KEY);

      if (!id) {
        const randomUserid = Math.random().toString(36);
        await AsyncStorage.setItem(USER_STORAGE_KEY, randomUserid);
      }
      setHasId(true);
    };

    loadId();
  }, []);

  if (hasId) {
    return <Redirect href='/(tabs)/Sets' />;
  } else {
    return <View />;
  }
};

export default Page;

const styles = StyleSheet.create({});
