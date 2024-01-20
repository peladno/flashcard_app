import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { Card, getLearnCards, saveLearning } from '@/data/api';
import { defaultStyles } from '@/constants/Styles';
import LearnCard from '@/components/LearnCard';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BottomButton, Button } from '@/components/Button';

const Learn = () => {
  const { id, limit } = useLocalSearchParams<{ id: string; limit: string }>();
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [textHidden, setTextHidden] = useState(false);
  const [correctCards, setCorrectCards] = useState(0);
  const [wrongCards, setWrongCards] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const rotate = useSharedValue(0);

  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
    return {
      transform: [
        { rotateY: withTiming(`${rotateValue}deg`, { duration: 600 }) },
      ],
    };
  });

  const backAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
    return {
      transform: [
        { rotateY: withTiming(`${rotateValue}deg`, { duration: 600 }) },
      ],
    };
  });

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

  const onShowAnswer = () => {
    rotate.value = 1;
    setShowFront(false);
  };
  const nextCard = async (correct: boolean) => {
    if (currentIndex < cards.length - 1) {
      correct
        ? setCorrectCards(correctCards + 1)
        : setWrongCards(wrongCards + 1);
      rotate.value = 0;
      setTextHidden(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setTextHidden(false);
      }, 400);
    } else {
      setShowResult(true);
      // Save the use rprogress
      const correctResult = correctCards + (correct ? 1 : 0);
      const wrongResult = wrongCards + (correct ? 0 : 1);
      saveLearning(id, +limit, correctResult, wrongResult);
      setCorrectCards(correctResult);
      setWrongCards(wrongResult);
    }
    setShowFront(true);
  };

  return (
    <View style={defaultStyles.container}>
      {showResult && (
        <View style={styles.container}>
          <Text style={styles.resultText}>
            {correctCards} correct, {wrongCards} wrong
          </Text>
          <Link href={'/(tabs)/Sets'} asChild>
            <BottomButton text='End session' />
          </Link>
        </View>
      )}
      {!showResult && cards.length > 0 && (
        <>
          <Text style={defaultStyles.header}>
            {currentIndex + 1} / {cards.length}
          </Text>
          <View style={styles.container}>
            <Animated.View style={[styles.frontCard, frontAnimatedStyles]}>
              <LearnCard
                card={cards[currentIndex]}
                isFront={true}
                textHidden={textHidden}
              />
            </Animated.View>
            <Animated.View style={[styles.backCard, backAnimatedStyles]}>
              <LearnCard card={cards[currentIndex]} isFront={false} />
            </Animated.View>
            {showFront && (
              <BottomButton onPress={onShowAnswer} text='Show answer' />
            )}
            {!showFront && (
              <View style={styles.bottomView}>
                <Button onPress={() => nextCard(true)} text='Correct' />
                <Button onPress={() => nextCard(false)} text='Wrong' />
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default Learn;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 100,
    flex: 1,
  },
  frontCard: { position: 'absolute', backfaceVisibility: 'hidden' },
  backCard: {
    backfaceVisibility: 'hidden',
  },
  bottomView: {
    position: 'absolute',
    bottom: 40,
    width: 300,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
