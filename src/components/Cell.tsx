import { View, Text, Pressable } from 'react-native';
import React from 'react';
import clsx from 'clsx';
import { ICell } from '../types';
import { useAppSelector } from '../hooks';

interface CellProps extends ICell {
  handlePress: (row: number, col: number) => void;
}

const Cell = ({
  row,
  col,
  isBomb,
  isFlipped,
  value,
  handlePress
}: CellProps) => {
  const { isGameOver } = useAppSelector((state) => state.gameState);
  return (
    <Pressable
      disabled={isGameOver}
      onPress={() => {
        handlePress(row, col);
      }}
      // className=" w-9 h-9 border border-gray-400 justify-center items-center"
      className={clsx(
        'w-9 h-9 border border-gray-400 justify-center items-center',
        { ['bg-slate-300']: !isFlipped }
        // isFlipped ? ' ' : 'bg-slate-300'
      )}
    >
      {/* <Text className="text-lg">💣</Text> */}
      <Text>{isFlipped && (isBomb ? '💣' : value)}</Text>
    </Pressable>
  );
};

export default Cell;
