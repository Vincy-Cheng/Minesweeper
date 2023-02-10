import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '../components/CustomText';
import { NavigationScreenProp } from './props';
import { useAppDispatch, useAppSelector } from '../hooks';
import { BOARD_SIZE, BOMBS_NUM, FontStyle } from '../enum';
import { isTimeRunning, initBoard } from '../store/GameStateSlice';
import DarkModeSwitch from '../components/DarkModeSwitch';
import SettingButton from '../components/SettingButton';

type HomeProps = {};

const HomeScreen = ({}: HomeProps) => {
  const navigation = useNavigation<NavigationScreenProp>();
  const { board, isGameOver } = useAppSelector((state) => state.gameState);
  const { boardSize, bombs } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView className="h-full items-center dark:bg-zinc-800 ">
      <View className="w-full flex flex-row items-center px-2 justify-between">
        <DarkModeSwitch />

        <CustomText
          content="Minesweeper"
          styleClass="text-3xl text-center dark:text-white"
          fontStyle={FontStyle.IBM_Plex_Mono}
        />

        <SettingButton />
      </View>

      <View className="flex flex-col space-y-4 pt-6">
        {board.length > 0 && !isGameOver ? (
          <View className="space-y-4">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Game');
                dispatch(isTimeRunning(true));
              }}
              className="bg-neutral-300 rounded-full p-2"
            >
              <CustomText
                content={'Back to Game'}
                styleClass="text-center text-lg"
                fontStyle={FontStyle.IBM_Plex_Mono}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                dispatch(
                  initBoard({
                    width: boardSize?.width || BOARD_SIZE,
                    height: boardSize?.height || BOARD_SIZE,
                    bombs: bombs || BOMBS_NUM
                  })
                );
                navigation.navigate('Game');
              }}
              className="bg-neutral-300 rounded-full p-2"
            >
              <CustomText
                content={'Start New Game'}
                styleClass="text-center text-lg"
                fontStyle={FontStyle.IBM_Plex_Mono}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              dispatch(
                initBoard({
                  width: boardSize?.width || BOARD_SIZE,
                  height: boardSize?.height || BOARD_SIZE,
                  bombs: bombs || BOMBS_NUM
                })
              );
              navigation.navigate('Game');
            }}
            className="bg-neutral-300 rounded-full p-2"
          >
            <CustomText
              content={'New Game'}
              styleClass="text-center text-lg"
              fontStyle={FontStyle.IBM_Plex_Mono}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          className="bg-neutral-300 rounded-full p-2"
          onPress={() => {
            navigation.navigate('Record');
          }}
        >
          <CustomText
            content={'Record'}
            styleClass="text-center text-lg"
            fontStyle={FontStyle.IBM_Plex_Mono}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
