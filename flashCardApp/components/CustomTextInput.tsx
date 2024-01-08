// CustomTextInput.tsx
import React, { FC } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  ...restProps
}: CustomTextInputProps) => {
  return (
    <TextInput
      style={[defaultStyles.input, restProps.style]}
      placeholderTextColor={Colors.light.lightGrey2}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      {...restProps}
    />
  );
};

export default CustomTextInput;
