import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { addToFavorites, createSet } from '@/data/api';
import Button from '@/components/Button';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

const Create = () => {
  const router = useRouter();
  const [info, setInfo] = useState({
    title: '',
    description: '',
    private: true,
    image: null,
  });

  const pickImage = async () => {};

  const onCreateSet = async () => {
    try {
      const newSet = await createSet(info);
      await addToFavorites(newSet.id);
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <View
        style={[
          defaultStyles.container,
          { marginTop: 20, marginHorizontal: 16 },
        ]}
      >
        <TextInput
          style={defaultStyles.input}
          placeholderTextColor={Colors.light.lightGrey2}
          placeholder='Title'
          value={info.title}
          onChangeText={(text) => setInfo({ ...info, title: text })}
        />
        <TextInput
          style={defaultStyles.input}
          placeholderTextColor={Colors.light.lightGrey2}
          placeholder='Description'
          value={info.description}
          onChangeText={(text) => setInfo({ ...info, description: text })}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Button onPress={onCreateSet} text='CreateSet' />
      </View>
    </>
  );
};

export default Create;
