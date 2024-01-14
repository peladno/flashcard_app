import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Card, getLearnCards } from '@/data/api';
import { defaultStyles } from '@/constants/Styles';

const Learn = () => {
  const { id, limit } = useLocalSearchParams<{ id: string; limit: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [textHidden, setTextHidden] = useState(false);
  const [correctCards, setCorrectCards] = useState(0);
  const [wrongCards, setWrongCards] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const cards = await getLearnCards(id!, limit!);
        setCards(cards);
      } catch (error) {
        console.log(error);
      }
    };
    loadCards();
  }, []);

  const showAnswer = () => {};
  const nextCard = async (correct: boolean) => {};
  return (
    <View style={defaultStyles.container}>
      {!showResult && cards.length > 0 && (
        <View>
          <Text style={defaultStyles.header}>
            {currentIndex + 1} / {cards.length}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Learn;
