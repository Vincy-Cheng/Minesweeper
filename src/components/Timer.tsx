import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { timeCounter } from '../store/GameStateSlice';
import useTimerCounter from '../hooks/useTimerCounter';

type Props = {};

const Timer = (props: Props) => {
  const { gameTime } = useAppSelector((state) => state.gameState);

  return (
    <View>
      <Text className="text-lg">
        {new Date(gameTime * 1000).toISOString().slice(11, 19)}
      </Text>
    </View>
  );
};

export default Timer;
