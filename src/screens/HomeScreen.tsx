import { TouchableOpacity, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomText from '../components/CustomText';
import { NavigationScreenProp } from './props';
import { useAppDispatch } from '../hooks';
import { isTimeRunning } from '../store/GameStateSlice';

type HomeProps = {};

const HomeScreen = ({}: HomeProps) => {
  const navigation = useNavigation<NavigationScreenProp>();
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <SafeAreaView className=" justify-center items-center">
      {/* <View className=""> */}
      <CustomText content="Minesweeper" styleClass="text-3xl text-center" />

      <View className="flex flex-col space-y-4 pt-6">
        <TouchableOpacity
          className="bg-neutral-300 rounded-full p-2"
          onPress={() => {
            navigation.navigate('Game');
            dispatch(isTimeRunning(true));
          }}
        >
          <CustomText
            content={'New Game'}
            styleClass="text-center text-lg"
          ></CustomText>
        </TouchableOpacity>
        <TouchableOpacity className="bg-neutral-300 rounded-full p-2">
          <CustomText
            content={'Record'}
            styleClass="text-center text-lg"
          ></CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
