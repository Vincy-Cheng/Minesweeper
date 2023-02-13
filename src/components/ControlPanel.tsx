import { TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useAppDispatch, useAppSelector } from '../hooks';
import { GameMode } from '../enum';
import { changeGameMode, initBoard } from '../store/GameStateSlice';
import Timer from './Timer';
import { useColorScheme } from 'nativewind';
import BombCounter from './BombCounter';
import { createBoard } from '../utils';

type Props = {};

const ControlPanel = (props: Props) => {
  const mode = useAppSelector((state) => state.gameState.mode);
  const { colorScheme } = useColorScheme();
  const { boardSize, bombs } = useAppSelector((state) => state.gameState);
  const { boardSize: settingSize, bombs: settingBombs } = useAppSelector(
    (state) => state.setting
  );
  const dispatch = useAppDispatch();
  return (
    <View className="flex-row items-center space-x-4 p-2 z-50">
      <BombCounter />
      <Text className="dark:text-white">|</Text>
      <View>
        <Timer />
      </View>

      <TouchableOpacity
        onPress={() => {
          const newBoard = createBoard({
            width: boardSize?.width || settingSize.width,
            height: boardSize?.height || settingSize.height,
            bombs: bombs || settingBombs
          });
          dispatch(
            initBoard({
              width: boardSize?.width || settingSize.width,
              height: boardSize?.height || settingSize.height,
              bombs: bombs || settingBombs,
              board: newBoard
            })
          );
        }}
      >
        <MaterialCommunityIcons
          name="restart"
          size={30}
          color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
        ></MaterialCommunityIcons>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(
            changeGameMode({
              mode: mode === GameMode.FLAG ? GameMode.SHOVEL : GameMode.FLAG
            })
          );
        }}
      >
        {mode === GameMode.FLAG ? (
          <Fontisto name="flag" size={30} color="#ef4444" />
        ) : (
          <MaterialCommunityIcons name="shovel" size={30} color="#a3a3a3" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ControlPanel;
