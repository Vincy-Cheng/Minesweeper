import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useColorScheme } from 'nativewind';
import CustomText from '../components/CustomText';
import BottomSheet from '../components/BottomSheet';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateBombs, updateSize } from '../store/SettingSlice';
import { FontStyle } from '../enum';
import CustomTextInput from '../components/CustomTextInput';

type Props = {};

const SettingScreen = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { colorScheme } = useColorScheme();
  const { boardSize, bombs } = useAppSelector((state) => state.setting);
  const [open, setOpen] = useState<{
    width: boolean;
    height: boolean;
    bombs: boolean;
  }>({
    width: false,
    height: false,
    bombs: false
  });

  const changeSize = (size: { width: number; height: number }) => {
    dispatch(
      updateSize({
        width: size.width,
        height: size.height
      })
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setOpen((prev) => {
          return { ...prev, width: false, height: false, bombs: false };
        });
      }}
    >
      <SafeAreaView className="relative dark:bg-zinc-800 h-full px-2">
        <View className="absolute -left-10 -bottom-2">
          <FontAwesome5 name="bomb" size={300} color={'#a1a1aa80'} />
        </View>

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
              content={'Setting'}
              styleClass={'text-center text-xl dark:text-white'}
              fontStyle={FontStyle.IBM_Plex_Mono}
            />
          </View>
        </View>
        <View className="px-2 pt-6 border-b border-b-zinc-400">
          <CustomText
            content={'Board size:'}
            styleClass="text-xl dark:text-white"
            fontStyle={FontStyle.IBM_Plex_Mono_Bold}
          />
        </View>
        <View className="space-y-4 pt-4">
          <View className="flex flex-row justify-between px-2 items-center">
            <CustomText
              content={'width'}
              styleClass="dark:text-white text-lg py-2"
              fontStyle={FontStyle.IBM_Plex_Mono}
            />
            <CustomTextInput
              enable={open.width}
              value={boardSize.width.toString()}
              onChange={(text: string) => {
                changeSize({
                  width: Number(text.replaceAll(/([^0-9])+/g, '')),
                  height: boardSize.height
                });
              }}
              onFocus={() => {
                setOpen((prev) => {
                  return { ...prev, height: false, bombs: false };
                });
              }}
              onBlur={() => {
                setOpen((prev) => {
                  return { ...prev, width: true };
                });
              }}
            />
          </View>

          <View className="flex flex-row justify-between px-2 items-center">
            <CustomText
              content={'height'}
              styleClass="dark:text-white text-lg py-2"
              fontStyle={FontStyle.IBM_Plex_Mono}
            />
            <CustomTextInput
              enable={open.height}
              value={boardSize.height.toString()}
              onChange={(text: string) => {
                changeSize({
                  width: boardSize.width,
                  height: Number(text.replaceAll(/([^0-9])+/g, ''))
                });
              }}
              onFocus={() => {
                setOpen((prev) => {
                  return { ...prev, width: false, bombs: false };
                });
              }}
              onBlur={() => {
                setOpen((prev) => {
                  return { ...prev, height: true };
                });
              }}
            />
          </View>
        </View>

        <View className="px-2 pt-6 border-b border-b-zinc-400">
          <CustomText
            content={'Bombs:'}
            styleClass="text-xl dark:text-white"
            fontStyle={FontStyle.IBM_Plex_Mono_Bold}
          />
        </View>
        <View className="flex flex-row justify-between px-2 items-center">
          <CustomText
            content={'Bombs number'}
            styleClass="dark:text-white text-lg py-2"
            fontStyle={FontStyle.IBM_Plex_Mono}
          />
          <CustomTextInput
            enable={open.bombs}
            value={bombs.toString()}
            onChange={(text: string) => {
              dispatch(updateBombs(Number(text.replaceAll(/([^0-9])+/g, ''))));
            }}
            onFocus={() => {
              setOpen((prev) => {
                return { ...prev, height: false, width: false };
              });
            }}
            onBlur={() => {
              setOpen((prev) => {
                return { ...prev, bombs: true };
              });
            }}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SettingScreen;
