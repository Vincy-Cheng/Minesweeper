import { View, Text } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';

type HomeProps = {};

const HomeScreen = ({}: HomeProps) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <SafeAreaView className=" justify-center items-center">
      <View className="">
        <CustomText content="Minesweeper" styleClass="text-3xl text-center" />

        <View className="">
          <CustomButton
            text={'New Game'}
            buttonStyle="rounded-full bg-green-300"
            textStyle="text-center"
          />
          <CustomButton
            text={'Record'}
            buttonStyle="rounded-full bg-green-300"
            textStyle="text-center"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
