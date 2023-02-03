import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useColorScheme } from 'nativewind';
import CustomText from '../components/CustomText';

type Props = {};

const SettingScreen = (props: Props) => {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView className="bg-white dark:bg-zinc-600 h-full">
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Feather
            name="menu"
            size={30}
            color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
          />
        </TouchableOpacity>
        <CustomText
          content={'Setting'}
          styleClass={'text-center text-xl dark:text-white'}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;
