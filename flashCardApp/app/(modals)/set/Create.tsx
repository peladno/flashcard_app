import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { addToFavorites, createSet } from '@/data/api';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';
import { BottomButton, Button } from '@/components/Button';
import * as ImagePicker from 'expo-image-picker';
import CustomTextInput from '@/components/CustomTextInput';

const Create = () => {
  const router = useRouter();
  const [info, setInfo] = useState({
    title: '',
    description: '',
    private: true,
    image: null as any,
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      setInfo({ ...info, image: result.assets[0].base64 });
    }
  };

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
        <CustomTextInput
          placeholder='Title'
          value={info.title}
          onChangeText={(text) => setInfo({ ...info, title: text })}
        />
        <CustomTextInput
          placeholder='Description'
          value={info.description}
          onChangeText={(text) => setInfo({ ...info, description: text })}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 8,
          }}
        >
          <Switch
            ios_backgroundColor='#3e3e3e'
            value={info.private}
            onValueChange={(value) => setInfo({ ...info, private: value })}
          />
          <Text style={{ marginLeft: 8 }}>Private</Text>
        </View>
        <Button onPress={pickImage} text='Select Image' />
        {info.image && (
          <Image
            style={{ width: '100%', height: 250 }}
            resizeMode='contain'
            source={{ uri: `data:image/jpge;base64,${info.image}` }}
          />
        )}
      </View>
      <View style={{ alignItems: 'center' }}>
        <BottomButton onPress={onCreateSet} text='CreateSet' />
      </View>
    </>
  );
};

export default Create;
