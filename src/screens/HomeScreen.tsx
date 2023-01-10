import { View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomText from '../components/CustomText';

type HomeProps = {};

const HomeScreen = ({}: HomeProps) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <SafeAreaView className=" justify-center items-center">
      <View>
        <CustomText content="Minesweeper" styleClass="text-3xl" />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
