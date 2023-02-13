import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '../components/CustomText';
import { NavigationScreenProp } from './props';
import { useAppDispatch, useAppSelector } from '../hooks';
import { FontStyle } from '../enum';
import { isTimeRunning, initBoard } from '../store/GameStateSlice';
import DarkModeSwitch from '../components/DarkModeSwitch';
import SettingButton from '../components/SettingButton';
import { createBoard } from '../utils';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type HomeProps = {};

const HomeScreen = ({}: HomeProps) => {
  const navigation = useNavigation<NavigationScreenProp>();
  const { board, isGameOver } = useAppSelector((state) => state.gameState);
  const { boardSize, bombs } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView className="h-full items-center dark:bg-zinc-800 ">
      <View className="absolute -left-10 -bottom-2">
        <FontAwesome5 name="bomb" size={300} color={'#a1a1aa80'} />
      </View>
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
                const newBoard = createBoard({
                  width: boardSize?.width || 10,
                  height: boardSize?.height || 10,
                  bombs: bombs || 10
                });
                dispatch(
                  initBoard({
                    width: boardSize?.width || 10,
                    height: boardSize?.height || 10,
                    bombs: bombs || 10,
                    board: newBoard
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
              const newBoard = createBoard({
                width: boardSize?.width || 10,
                height: boardSize?.height || 10,
                bombs: bombs || 10
              });
              dispatch(
                initBoard({
                  width: boardSize?.width || 10,
                  height: boardSize?.height || 10,
                  bombs: bombs || 10,
                  board: newBoard
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
