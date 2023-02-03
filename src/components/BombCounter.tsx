import { View, Text } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { useAppSelector } from '../hooks';
import { flaggedCell } from '../utils';
import { BOMBS_NUM } from '../enum';

type Props = {};

const BombCounter = (props: Props) => {
  const { board, bombs } = useAppSelector((state) => state.gameState);
  const foundBombs = flaggedCell(board);

  return (
    <View className="flex-row items-center space-x-2">
      <Text>💣</Text>

      <CustomText
        content={bombs || BOMBS_NUM - foundBombs}
        styleClass="text-lg dark:text-white"
        viewStyle="pl-2"
      />
    </View>
  );
};

export default BombCounter;
