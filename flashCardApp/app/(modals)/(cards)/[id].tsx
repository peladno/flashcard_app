import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Card, createCard, deleteSet, getCardsForSet } from '@/data/api';
import { defaultStyles } from '@/constants/Styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import CustomTextInput from '@/components/CustomTextInput';
import { Button } from '@/components/Button';

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

  const renderCard: ListRenderItem<Card> = ({ item }) => (
    <View
      key={item.id}
      style={{
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.light.darkGrey,
        borderRadius: 20,
        backgroundColor: Colors.light.white,
      }}
    >
      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
        Question: {item.question}
      </Text>
      <Text style={{ fontSize: 12 }}>Answer: {item.answer}</Text>
    </View>
  );

  const onAddCard = async () => {
    const newCard = await createCard({ set: id, ...info });
    setCards([...cards, newCard]);
    setInfo({ question: '', answer: '' });
  };

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
        value={info.answer}
        onChangeText={(text) => setInfo({ ...info, answer: text })}
      />
      <Button onPress={onAddCard} text='Add Card' />
      <View style={{ marginTop: 29 }}>
        <FlatList data={cards} renderItem={renderCard} />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
