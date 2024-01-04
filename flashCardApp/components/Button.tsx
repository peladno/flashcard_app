import { View, Text, TouchableOpacity } from 'react-native';
import React, { ReactNode } from 'react';
import { defaultStyles } from '@/constants/Styles';

type buttontype = {
  onPress: () => void;
  text: string;
};

const Button = ({ onPress, text }: buttontype) => {
  return (
    <TouchableOpacity style={defaultStyles.bottomButton} onPress={onPress}>
      <Text style={defaultStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
