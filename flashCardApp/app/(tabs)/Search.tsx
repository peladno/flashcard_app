import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Set, getSets } from '@/data/api';
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import { transformImage } from '@xata.io/client';

const Search = () => {
  const [set, setSets] = useState<Set[]>([]);
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSets();
  }, []);

  const loadSets = async () => {
    try {
      const data = await getSets();
      if (data) {
        setSets(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderSetRow: ListRenderItem<Set> = ({ item }) => {
    return (
      <Link href={`/(modals)/set/${item.id}`} asChild>
        <TouchableOpacity style={styles.setRow}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {item.image ? (
              <Image
                source={{
                  uri: transformImage(item.image.url, {
                    width: 100,
                    height: 100,
                  }),
                }}
                style={styles.image}
              />
            ) : (
              <View style={styles.image} />
            )}

            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.rowSubtitle}>{item.cards} cards</Text>
            </View>

            <Ionicons
              name='chevron-forward-outline'
              size={24}
              color={Colors.light.lightGrey2}
            />
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <FlatList
        data={set}
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
    padding: 16,
    backgroundColor: Colors.light.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.lightGrey,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  rowSubtitle: { color: Colors.light.darkGrey },
  image: { width: 50, height: 50, borderRadius: 7 },
});

export default Search;
