import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from '../components/CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { isTimeRunning } from '../store/GameStateSlice';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../hooks';
import { useColorScheme } from 'nativewind';
import { FontStyle } from '../enum';

type Props = {};

const RecordScreen = (props: Props) => {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView className="bg-white dark:bg-zinc-600 h-full px-2">
      <View className="flex flex-row items-center">
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
        <View className="flex-1 pr-[30px]">
          <CustomText
            content={'Record'}
            styleClass={'text-center text-xl dark:text-white'}
            fontStyle={FontStyle.IBM_Plex_Mono}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RecordScreen;
