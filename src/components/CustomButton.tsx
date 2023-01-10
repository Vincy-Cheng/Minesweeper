import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { clsx } from 'clsx';

type Props = {
  text: string;
  textStyle?: string;
  buttonStyle?: string;
};

const CustomButton = ({ text, textStyle, buttonStyle }: Props) => {
  return (
    <TouchableOpacity className={clsx('', { [`${buttonStyle}`]: buttonStyle })}>
      <CustomText content={text} styleClass={textStyle}></CustomText>
    </TouchableOpacity>
  );
};

export default CustomButton;
