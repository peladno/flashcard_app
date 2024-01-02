import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Set, getSet } from '@/data/api';

const Page = () => {
  const [set, setSet] = useState<Set>();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const loadSet = async () => {
      const data = await getSet(id);
      console.log(data);

      setSet(data);
    };

    loadSet();
  }, []);

  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default Page;
