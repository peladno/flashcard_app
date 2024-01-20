import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Progress, Set, getUserLearnings } from '@/data/api';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { FlatList } from 'react-native-gesture-handler';

const Profile = () => {
  const [sets, setSets] = useState<
    {
      set: Set;
      score: number;
      cards_correct: number;
      cards_wrong: number;
      id: string;
      xata: any;
    }[]
  >([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const data = await getUserLearnings();
    setSets(data);
  };

  const renderSetRow: ListRenderItem<Progress> = ({ item }) => {
    return (
      <View style={styles.setRow}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>{item.set.title}</Text>
            <Text style={{ color: Colors.light.darkGrey }}>
              Score: {item.score.toFixed(2)},{' '}
              {item.xata.createdAt.substring(0, 10)}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>{sets.length} sessions</Text>
      <FlatList
        data={sets}
        renderItem={renderSetRow}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={loadProgress} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  setRow: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.lightGrey,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Profile;
