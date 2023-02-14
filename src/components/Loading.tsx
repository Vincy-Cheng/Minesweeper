import { View } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import { FontStyle } from '../enum';

type LoadingProps = {
  finishedCells: number;
  totalCells: number;
};

const Loading = ({ finishedCells, totalCells }: LoadingProps) => {
  return (
    <View>
      <CustomText
        content={(finishedCells / totalCells) * 100 + '%'}
        fontStyle={FontStyle.IBM_Plex_Mono}
      />
    </View>
  );
};

export default Loading;
