import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ControlPanel from '../components/ControlPanel';
import Board from '../components/Board';
import Feather from 'react-native-vector-icons/Feather';
import { useAppDispatch, useAppSelector } from '../hooks';
import { endGame, isTimeRunning } from '../store/GameStateSlice';
import useTimerCounter from '../hooks/useTimerCounter';
import { useColorScheme } from 'nativewind';

type Props = {};

const GameScreen = (props: Props) => {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const { isGameOver, isTimerRunning } = useAppSelector(
    (state) => state.gameState
  );
  const dispatch = useAppDispatch();
  const { startTimer, stopTimer } = useTimerCounter();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);
  useEffect(() => {
    if (isGameOver) {
      stopTimer();
      dispatch(endGame(true));
    } else {
      if (isTimerRunning) {
        startTimer();
        console.log('start');
      }
    }
  }, [isTimerRunning, isGameOver]);
  return (
    <SafeAreaView className="bg-white dark:bg-zinc-600 ">
      <View className="flex flex-row items-center justify-between px-4 bg-white dark:bg-zinc-600 ">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            dispatch(isTimeRunning(false));
            stopTimer();
          }}
        >
          <Feather
            name="menu"
            size={30}
            color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
          ></Feather>
        </TouchableOpacity>

        <ControlPanel />
      </View>
      <Board />
    </SafeAreaView>
  );
};

export default GameScreen;
