import {
  View,
  Text,
  TouchableOpacity,
  ListRenderItem,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Set, getMySets } from '@/data/api';
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Button } from '@/components/Button';

type setsType = {
  id: string;
  set: Set;
  canEdit: boolean;
};
const Sets = () => {
  const [sets, setSets] = useState<setsType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const loadSets = async () => {
    const data = await getMySets();
    setSets(data);
  };

  useEffect(() => {
    loadSets();
  }, []);

  const renderSetRow: ListRenderItem<setsType> = ({
    item: { set, canEdit },
  }) => (
    <View style={styles.setRow}>
      <Text style={styles.rowTitle}>{set.title}</Text>
      <Link href={`/(learn)/${set.id}?limit=10`} asChild>
        <Button text='Quiz' onPress={() => {}} size='small' />
      </Link>
      {canEdit && (
        <Link href={`/(modals)/(cards)/${set.id}`} asChild>
          <Button text='Edit' onPress={() => {}} size='small' />
        </Link>
      )}
    </View>
  );

  return (
    <View style={defaultStyles.container}>
      {!sets.length && (
        <Link href={'/(tabs)/Search'}>
          <TouchableOpacity>
            <Text
              style={{ textAlign: 'center', padding: 20, color: '#3f3f3f' }}
            >
              Add your first set!
            </Text>
          </TouchableOpacity>
        </Link>
      )}
      <FlatList
        data={sets}
        renderItem={renderSetRow}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={loadSets} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  setRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 8,
    padding: 16,
    backgroundColor: Colors.light.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.lightGrey,
    alignItems: 'center',
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  rowSubtitle: { color: Colors.light.darkGrey },
  image: { width: 50, height: 50, borderRadius: 7 },
});

export default Sets;
