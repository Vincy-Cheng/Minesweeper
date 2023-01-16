import { Pressable } from 'react-native';
import React from 'react';
import clsx from 'clsx';
import { ICell } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { BOMBS_NUM, GameMode } from '../enum';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { endGame, flagCell, handleCell } from '../store/GameStateSlice';
import CustomText from './CustomText';
import { useColorScheme } from 'nativewind';

const Cell = ({
  row,
  col,
  isBomb,
  isFlipped,
  isFlagged,
  value,
  isWarned
}: ICell) => {
  const { isGameOver, mode } = useAppSelector((state) => state.gameState);
  const dispatch = useAppDispatch();
  const { colorScheme } = useColorScheme();

  return (
    <Pressable
      disabled={isGameOver}
      onPress={() => {
        if (mode === GameMode.SHOVEL) {
          dispatch(handleCell({ row: row, col: col }));
        } else {
          dispatch(flagCell({ row: row, col: col }));
        }
      }}
      className={clsx(
        'w-9 h-9 border border-gray-400 justify-center items-center ',
        !isFlipped
          ? 'bg-slate-300 dark:bg-zinc-800'
          : isWarned
          ? 'bg-amber-300'
          : ''
      )}
    >
      {/* Check whether flag or not, Yes -> show red flag, No -> check flipped or not */}
      {isFlagged ? (
        <Fontisto name="flag" color="#ef4444" size={20} />
      ) : isFlipped ? (
        <CustomText
          content={isBomb ? '💣' : value}
          styleClass="dark:text-white"
        />
      ) : mode === GameMode.FLAG ? (
        <Fontisto
          name="flag"
          color={
            isFlagged
              ? '#ef4444'
              : colorScheme === 'dark'
              ? '#525252'
              : '#a3a3a3'
          }
          size={20}
        />
      ) : (
        <MaterialCommunityIcons
          name="shovel"
          color={colorScheme === 'dark' ? '#525252' : '#a3a3a3'}
          size={20}
        />
      )}
    </Pressable>
  );
};

export default Cell;
