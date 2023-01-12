import { View } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cell from './Cell';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  handleCell,
  initBoard,
  timeCounter,
  isTimeRunning
} from '../store/GameStateSlice';
import ControlPanel from './ControlPanel';
import { BOARD_SIZE, BOMBS_NUM } from '../enum';
import useTimerCounter from '../hooks/useTimerCounter';

type Props = {};

const Board = (props: Props) => {
  const { board } = useAppSelector((state) => state.gameState);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!(board.length > 0)) {
      dispatch(
        initBoard({ width: BOARD_SIZE, height: BOARD_SIZE, bombs: BOMBS_NUM })
      );
    }
  }, []);

  return (
    <View className="h-full justify-center items-center">
      {board.map((row, rowIndex) => (
        <View key={rowIndex} className="flex flex-row">
          {row.map((cell, cellIndex) => (
            <Cell
              {...cell}
              key={'cell-' + cellIndex}
              // handlePress={handlePress}
            ></Cell>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Board;
