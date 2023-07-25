import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ControlPanel from '../components/ControlPanel';
import Board from '../components/Board';
import Feather from 'react-native-vector-icons/Feather';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  closeReminder,
  initBoard,
  isTimeRunning
} from '../store/GameStateSlice';
import useTimerCounter from '../hooks/useTimerCounter';
import { useColorScheme } from 'nativewind';
import clsx from 'clsx';
import CustomModal from '../components/CustomModal';
import { createBoard } from '../utils';
import { addRecord, clearRecord } from '../store/RecordSlice';
import CustomText from '../components/CustomText';
import { FontStyle } from '../enum';

type Props = {};

const GameScreen = (props: Props) => {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const {
    isGameOver,
    isTimerRunning,
    boardSize,
    bombs,
    gameTime,
    statusMessage,
    startTime
  } = useAppSelector((state) => state.gameState);
  const { boardSize: settingSize, bombs: settingBombs } = useAppSelector(
    (state) => state.setting
  );

  const dispatch = useAppDispatch();
  const { startTimer, stopTimer } = useTimerCounter();

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (isGameOver) {
      stopTimer();
      if (statusMessage !== '💥') {
        dispatch(
          addRecord({
            startDate: startTime,
            endDate: new Date().toISOString(),
            size: { ...boardSize },
            bombs: bombs,
            time: gameTime
          })
        );
        console.log('Record is added');
      }
    } else {
      if (isTimerRunning) {
        startTimer();
      }
    }
  }, [isGameOver]);

  useEffect(() => {
    if (loading === true) {
      setTimeout(() => {
        const newBoard = createBoard({
          width: boardSize?.width || settingSize.width,
          height: boardSize?.height || settingSize.height,
          bombs: bombs || settingBombs
        });
        dispatch(
          initBoard({
            width: boardSize?.width || settingSize.width,
            height: boardSize?.height || settingSize.height,
            bombs: bombs || settingBombs,
            board: newBoard
          })
        );
        setLoading(false);
      }, 100);
    }
  }, [loading]);

  return (
    <View className="bg-white dark:bg-zinc-600 ">
      {loading && (
        <View className="h-full items-center dark:bg-zinc-800 justify-center ">
          <ActivityIndicator size="large" color="#fbbf24" />
        </View>
      )}
      <View className={clsx('', { ['hidden']: loading })}>
        <CustomModal
          visible={statusMessage !== ''}
          closeAction={() => {
            dispatch(closeReminder());
          }}
          body={
            <>
              <CustomText
                styleClass="text-center text-xl dark:text-white"
                content={statusMessage ?? ''}
                fontStyle={FontStyle.IBM_Plex_Mono}
              />

              <CustomText
                content={'Close the modal and start a new Game!'}
                styleClass="text-center pb-4 text-neutral-600 dark:text-white"
                fontStyle={FontStyle.IBM_Plex_Mono}
              />
            </>
          }
        />
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
            />
          </TouchableOpacity>
          <ControlPanel setLoading={setLoading} />
        </View>
        <Board />
      </View>
    </View>
  );
};

export default GameScreen;
