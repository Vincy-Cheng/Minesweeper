import { View } from 'react-native';
import React from 'react';
import { useAppSelector } from '../hooks';

import CustomText from './CustomText';

type Props = {};

const Timer = (props: Props) => {
  const { gameTime } = useAppSelector((state) => state.gameState);

  return (
    <View>
      <CustomText
        styleClass="text-lg"
        content={new Date(gameTime * 1000).toISOString().slice(11, 19)}
      />
    </View>
  );
};

export default Timer;
