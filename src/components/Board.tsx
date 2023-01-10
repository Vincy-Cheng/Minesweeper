import { View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cell from './Cell';
import { useAppDispatch, useAppSelector } from '../hooks';
import { handleCell, initBoard, timeCounter } from '../store/GameStateSlice';
import ControlPanel from './ControlPanel';
import { BOARD_SIZE, BOMBS_NUM } from '../enum';

type Props = {};

const Board = (props: Props) => {
  const { board, isGameOver } = useAppSelector((state) => state.gameState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      initBoard({ width: BOARD_SIZE, height: BOARD_SIZE, bombs: BOMBS_NUM })
    );
    if (!isGameOver) {
      const interval = setInterval(() => {
        dispatch(timeCounter());
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  const handlePress = (row: number, col: number) => {
    dispatch(handleCell({ row: row, col: col }));
  };

  return (
    <SafeAreaView>
      <View className="h-full justify-center items-center">
        <View>
          <ControlPanel></ControlPanel>
        </View>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} className="flex flex-row">
            {row.map((cell, cellIndex) => (
              <Cell
                {...cell}
                key={'cell-' + cellIndex}
                handlePress={handlePress}
              ></Cell>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Board;
