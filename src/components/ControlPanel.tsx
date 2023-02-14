import { TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useAppDispatch, useAppSelector } from '../hooks';
import { GameMode } from '../enum';
import { changeGameMode } from '../store/GameStateSlice';
import Timer from './Timer';
import { useColorScheme } from 'nativewind';
import BombCounter from './BombCounter';

type ControlPanelProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ControlPanel = ({ setLoading }: ControlPanelProps) => {
  const mode = useAppSelector((state) => state.gameState.mode);
  const { colorScheme } = useColorScheme();
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
          setLoading(true);
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
