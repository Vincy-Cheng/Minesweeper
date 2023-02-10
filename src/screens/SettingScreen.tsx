import {
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useColorScheme } from 'nativewind';
import CustomText from '../components/CustomText';
import BottomSheet from '../components/BottomSheet';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateSize } from '../store/SettingSlice';
import { FontStyle } from '../enum';

type Props = {};

const SettingScreen = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { colorScheme } = useColorScheme();
  const { boardSize } = useAppSelector((state) => state.setting);
  const [open, setOpen] = useState<{ width: boolean; height: boolean }>({
    width: false,
    height: false
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setOpen((prev) => {
          return { ...prev, width: false, height: false };
        });
      }}
    >
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
              content={'Setting'}
              styleClass={'text-center text-xl dark:text-white'}
              fontStyle={FontStyle.IBM_Plex_Mono}
            />
          </View>
        </View>
        <View className="px-2">
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
            {open.width ? (
              <View className="bg-white border border-black items-center justify-center rounded-xl p-2">
                <TextInput
                  className="text-lg leading-6"
                  editable={true}
                  numberOfLines={1}
                  maxLength={6}
                  keyboardType="numeric"
                  value={boardSize.width.toString()}
                  onChangeText={(width) => {
                    dispatch(
                      updateSize({
                        width: Number(width.replaceAll(/([^0-9])+/g, '')),
                        height: boardSize.height
                      })
                    );
                  }}
                  onFocus={() => {
                    setOpen((prev) => {
                      return { ...prev, height: false };
                    });
                  }}
                />
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  setOpen((prev) => {
                    return { ...prev, width: true };
                  });
                }}
              >
                <CustomText
                  content={boardSize.width}
                  styleClass="dark:text-white text-lg"
                  fontStyle={FontStyle.IBM_Plex_Mono}
                />
              </Pressable>
            )}
          </View>

          <View className="flex flex-row justify-between px-2 items-center">
            <CustomText
              content={'height'}
              styleClass="dark:text-white text-lg py-2"
              fontStyle={FontStyle.IBM_Plex_Mono}
            />
            {open.height ? (
              <View className="bg-white border border-black items-center justify-center rounded-xl py-1 px-2">
                <TextInput
                  className="text-lg leading-6"
                  editable={true}
                  numberOfLines={1}
                  maxLength={6}
                  keyboardType="numeric"
                  value={boardSize.height.toString()}
                  onChangeText={(height) => {
                    dispatch(
                      updateSize({
                        width: boardSize.width,
                        height: Number(height.replaceAll(/([^0-9])+/g, ''))
                      })
                    );
                  }}
                  onFocus={() => {
                    setOpen((prev) => {
                      return { ...prev, width: false };
                    });
                  }}
                />
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  setOpen((prev) => {
                    return { ...prev, height: true };
                  });
                }}
              >
                <CustomText
                  content={boardSize.height}
                  styleClass="dark:text-white text-lg"
                  fontStyle={FontStyle.IBM_Plex_Mono}
                />
              </Pressable>
            )}
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SettingScreen;
