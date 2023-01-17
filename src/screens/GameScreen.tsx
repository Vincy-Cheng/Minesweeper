import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ControlPanel from '../components/ControlPanel';
import Board from '../components/Board';
import Feather from 'react-native-vector-icons/Feather';
import { useAppDispatch, useAppSelector } from '../hooks';
import { closeReminder, isTimeRunning } from '../store/GameStateSlice';
import useTimerCounter from '../hooks/useTimerCounter';
import { useColorScheme } from 'nativewind';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CustomText from '../components/CustomText';

type Props = {};

const GameScreen = (props: Props) => {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const { isGameOver, isTimerRunning, statusMessage } = useAppSelector(
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
    } else {
      if (isTimerRunning) {
        startTimer();
      }
    }
  }, [isTimerRunning, isGameOver]);
  return (
    <View className="bg-white dark:bg-zinc-600 ">
      <Modal
        animationType="slide"
        transparent={true}
        visible={statusMessage !== ''}
      >
        <View className="flex-1 justify-center items-center">
          <View
            className={
              'w-40 h-fit bg-white rounded-xl dark:bg-neutral-500 shadow dark:shadow-none'
            }
          >
            <TouchableOpacity className="ml-auto p-2">
              <EvilIcons
                name="close"
                size={20}
                onPress={() => {
                  dispatch(closeReminder());
                }}
                color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
              />
            </TouchableOpacity>
            <View className="px-3 space-y-2 ">
              <View>
                <CustomText
                  styleClass="text-center text-xl dark:text-white"
                  content={statusMessage ?? ''}
                />
              </View>
              <View>
                <CustomText
                  content={'Close the modal and start a new Game!'}
                  styleClass="text-center pb-4 text-neutral-600 dark:text-white"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <View className="pt-12 flex flex-row items-center justify-between px-4 z-50 bg-white dark:bg-zinc-600 ">
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
    </View>
  );
};

export default GameScreen;
