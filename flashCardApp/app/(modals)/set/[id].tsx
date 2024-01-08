import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Set, addToFavorites, getSet } from '@/data/api';
import { defaultStyles } from '@/constants/Styles';
import { BottomButton } from '@/components/Button';

const Page = () => {
  const [set, setSet] = useState<Set>();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const loadSet = async () => {
      try {
        const data = await getSet(id);
        setSet(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadSet();
  }, []);

  const onAddFav = async () => {
    await addToFavorites(id);
    router.push('/(tabs)/Sets');
  };

  return (
    <View style={defaultStyles.container}>
      {set && (
        <View
          style={{ alignItems: 'flex-start', padding: 16, gap: 10, flex: 1 }}
        >
          <Text style={styles.header}>{set.title}</Text>
          <Text style={{ color: '#666' }}>{set.cards}</Text>
          {set?.image && (
            <Image
              source={{ uri: set.image.url }}
              style={{ width: '100%', height: 250, marginTop: 16 }}
              resizeMode='contain'
            />
          )}
          <Text>{set.description}</Text>
          <Text style={{ color: '#666' }}>Created by: {set.creator} </Text>
        </View>
      )}

      <View style={{ alignItems: 'center' }}>
        <BottomButton onPress={onAddFav} text='Add to Favorites' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Page;
