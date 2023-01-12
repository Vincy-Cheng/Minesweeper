import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { timeCounter, isTimeRunning } from '../store/GameStateSlice';

type Props = {};

const useTimerCounter = () => {
  const [counter, setCounter] = useState<NodeJS.Timer | null>(null);

  const dispatch = useAppDispatch();

  const startTimer = () => {
    if (!counter) {
      setCounter(
        setInterval(() => {
          dispatch(timeCounter());
          // console.log(new Date().toTimeString());
        }, 1000)
      );
    }
  };

  const stopTimer = () => {
    if (counter) {
      clearInterval(counter);
      setCounter(null);
      dispatch(isTimeRunning(false));
    }
  };

  return {
    counter,
    startTimer: () => startTimer(),
    stopTimer: () => stopTimer()
  };
};

export default useTimerCounter;
