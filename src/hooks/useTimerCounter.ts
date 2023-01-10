import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { timeCounter } from '../store/GameStateSlice';

type Props = {};

const useTimerCounter = () => {
  const gameTime = useAppSelector((state) => state.gameState.gameTime);
  const [counter, setCounter] = useState<number>(gameTime || 0);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((second) => {
        dispatch(timeCounter());
        return second + 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return [counter, setCounter];
};

export default useTimerCounter;
