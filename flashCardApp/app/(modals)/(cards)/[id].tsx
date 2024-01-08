import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Card, deleteSet, getCardsForSet } from '@/data/api';
import { defaultStyles } from '@/constants/Styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import CustomTextInput from '@/components/CustomTextInput';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [info, setInfo] = useState({
    question: '',
    answer: '',
  });

  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    const loadCards = async () => {
      const data = await getCardsForSet(id);
      setCards(data);
    };
    loadCards();
  }, [id]);

  const onAddCard = async () => {};
  const onDeleteSet = async () => {
    deleteSet(id);
    router.back();
  };
  return (
    <View
      style={[defaultStyles.container, { marginTop: 20, marginHorizontal: 20 }]}
    >
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={onDeleteSet}>
              <Ionicons
                name='trash-outline'
                size={24}
                color={Colors.light.white}
                children
              />
            </TouchableOpacity>
          ),
        }}
      />
      <CustomTextInput
        placeholder={'Question'}
        value={info.question}
        onChangeText={(text) => setInfo({ ...info, question: text })}
      />
      <CustomTextInput
        placeholder={'Answer'}
        value={info.question}
        onChangeText={(text) => setInfo({ ...info, answer: text })}
      />
    </View>
  );
};

export default Page;
