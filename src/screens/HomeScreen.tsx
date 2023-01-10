import { View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomText from '../components/CustomText';

export type HomeProps = {
  onLayout: () => Promise<void>;
};

const HomeScreen = ({ onLayout }: HomeProps) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <SafeAreaView className=" justify-center items-center">
      <View onLayout={onLayout}>
        <CustomText content="Minesweeper" />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
