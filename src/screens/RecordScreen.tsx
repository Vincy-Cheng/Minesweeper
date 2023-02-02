import { View } from 'react-native';
import React from 'react';
import CustomText from '../components/CustomText';

type Props = {};

const RecordScreen = (props: Props) => {
  return (
    <View>
      <View>
        <CustomText content={'Records'}></CustomText>
      </View>
    </View>
  );
};

export default RecordScreen;
