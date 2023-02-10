import { Pressable } from 'react-native';
import React from 'react';
import clsx from 'clsx';
import { ICell } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { FontStyle, GameMode } from '../enum';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { flagCell, handleCell } from '../store/GameStateSlice';
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

  const textColor = (bombNumber: number) => {
    switch (bombNumber) {
      case 1:
        return 'text-blue-500';
      case 2:
        return 'text-green-400';
      case 3:
        return 'text-red-400';
      case 4:
        return 'text-purple-400';
      case 5:
        return 'text-sky-300';
      case 6:
        return 'text-orange-500';
      case 7:
        return 'text-pink-900';
      case 8:
        return 'text-black';
      default:
        return 'dark:text-white';
    }
  };

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
          content={isBomb ? '💥' : value}
          styleClass={textColor(value)}
          fontStyle={FontStyle.IBM_Plex_Mono}
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
