import { View, TextInput, Pressable } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { FontStyle } from '../enum';

type CustomTextInputProps = {
  enable: boolean;
  value: string;
  onChange: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
};

const CustomTextInput = ({
  enable,
  value,
  onChange,
  onFocus,
  onBlur
}: CustomTextInputProps) => {
  return (
    <>
      {enable ? (
        <View className=" border border-zinc-400 items-center justify-center rounded-xl p-2 ">
          <TextInput
            className="text-lg leading-6 text-zinc-700 dark:text-white"
            editable={true}
            numberOfLines={1}
            maxLength={6}
            keyboardType="numeric"
            value={value}
            onChangeText={onChange}
            onFocus={onFocus}
          />
        </View>
      ) : (
        <Pressable onPress={onBlur}>
          <CustomText
            content={value}
            styleClass="dark:text-white text-lg"
            fontStyle={FontStyle.IBM_Plex_Mono}
          />
        </Pressable>
      )}
    </>
  );
};

export default CustomTextInput;
