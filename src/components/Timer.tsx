import { View } from 'react-native';
import React from 'react';
import { useAppSelector } from '../hooks';

import CustomText from './CustomText';

type Props = {};

const Timer = (props: Props) => {
  const { gameTime } = useAppSelector((state) => state.gameState);

  return (
    <CustomText
      styleClass="text-lg dark:text-white"
      content={new Date(gameTime * 1000).toISOString().slice(11, 19)}
    />
  );
};

export default Timer;
