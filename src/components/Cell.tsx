import { View, Text, Pressable } from 'react-native';
import React from 'react';
import clsx from 'clsx';
import { ICell } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { BOMBS_NUM, GameMode } from '../enum';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { endGame, flagCell, handleCell } from '../store/GameStateSlice';
import { gameStatus } from '../utils/gameStatus';
// interface CellProps extends ICell {
//   handlePress: (row: number, col: number) => void;
// }

const Cell = ({ row, col, isBomb, isFlipped, isFlagged, value }: ICell) => {
  const { isGameOver, mode, board } = useAppSelector(
    (state) => state.gameState
  );
  const dispatch = useAppDispatch();

  return (
    <Pressable
      disabled={isGameOver}
      onPress={() => {
        if (mode === GameMode.SHOVEL) {
          dispatch(handleCell({ row: row, col: col }));
        } else {
          dispatch(flagCell({ row: row, col: col }));
        }
        // const isWin = gameStatus(board, BOMBS_NUM, mode);

        // if (isWin) {
        //   alert('You found all the bombs!');
        //   dispatch(endGame(isWin));
        // } else {
        //   console.log('continue');
        // }
      }}
      // className=" w-9 h-9 border border-gray-400 justify-center items-center"
      className={clsx(
        'w-9 h-9 border border-gray-400 justify-center items-center',
        { ['bg-slate-300']: !isFlipped }
      )}
    >
      {/* Check whether flag or not, Yes -> show red flag, No -> check flipped or not */}
      {isFlagged ? (
        <Fontisto name="flag" color="#ef4444" size={20} />
      ) : isFlipped ? (
        <Text>{isBomb ? '💣' : value}</Text>
      ) : mode === GameMode.FLAG ? (
        <Fontisto
          name="flag"
          color={isFlagged ? '#ef4444' : '#a3a3a3'}
          size={20}
        />
      ) : (
        <MaterialCommunityIcons name="shovel" color={'#a3a3a3'} size={20} />
      )}
    </Pressable>
  );
};

export default Cell;
