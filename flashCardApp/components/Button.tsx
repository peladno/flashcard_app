import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { ReactNode, Ref, forwardRef } from 'react';
import { defaultStyles } from '@/constants/Styles';

type buttonProps = {
  onPress?: () => void;
  text: string;
  size?: 'small';
};

export const BottomButton = ({ onPress, text }: buttonProps) => {
  return (
    <TouchableOpacity style={defaultStyles.bottomButton} onPress={onPress}>
      <Text style={defaultStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const Button = forwardRef<TouchableOpacity, buttonProps>(
  ({ onPress, text, size }, ref: Ref<TouchableOpacity>) => {
    const buttonStyles = {
      ...defaultStyles.button,
      ...(size === 'small' && styles.smallButton),
    };

    return (
      <TouchableOpacity ref={ref} onPress={onPress} style={buttonStyles}>
        <Text style={defaultStyles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  smallButton: {
    paddingVertical: 6,
  },
});
