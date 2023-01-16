import { TouchableOpacity, View, Text, Pressable } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomText from '../components/CustomText';
import { NavigationScreenProp } from './props';
import { useAppDispatch, useAppSelector } from '../hooks';
import { BOARD_SIZE, BOMBS_NUM } from '../enum';
import { isTimeRunning, initBoard } from '../store/GameStateSlice';
import DarkModeSwitch from '../components/DarkModeSwitch';

type HomeProps = {};

const HomeScreen = ({}: HomeProps) => {
  const navigation = useNavigation<NavigationScreenProp>();
  const { board, isGameOver } = useAppSelector((state) => state.gameState);
  const { mode } = useAppSelector((state) => state.colorScheme);
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <SafeAreaView className="h-full items-center dark:bg-zinc-800 ">
      <View className="flex-row items-center px-2">
        <CustomText
          content="Minesweeper"
          styleClass="text-3xl text-center dark:text-white flex-1"
        />
        <DarkModeSwitch></DarkModeSwitch>
      </View>

      <View className="flex flex-col space-y-4 pt-6">
        {board.length > 0 && !isGameOver ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Game');
              dispatch(isTimeRunning(true));
            }}
            className="bg-neutral-300 rounded-full p-2"
          >
            <CustomText
              content={'Back to Game'}
              styleClass="text-center text-lg"
            ></CustomText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              dispatch(
                initBoard({
                  width: BOARD_SIZE,
                  height: BOARD_SIZE,
                  bombs: BOMBS_NUM
                })
              );
              navigation.navigate('Game');
            }}
            className="bg-neutral-300 rounded-full p-2"
          >
            <CustomText
              content={'New Game'}
              styleClass="text-center text-lg"
            ></CustomText>
          </TouchableOpacity>
        )}

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
