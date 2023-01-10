import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispatch } from '../hooks';
import { BOARD_SIZE, BOMBS_NUM } from '../enum';
import { initBoard } from '../store/GameStateSlice';
import Timer from './Timer';

type Props = {};

const ControlPanel = (props: Props) => {
  const dispatch = useAppDispatch();
  return (
    <View className="flex-row items-center space-x-4">
      <View>
        <Timer />
      </View>
      <TouchableOpacity
        onPress={() => {
          dispatch(
            initBoard({
              width: BOARD_SIZE,
              height: BOARD_SIZE,
              bombs: BOMBS_NUM
            })
          );
        }}
      >
        <MaterialCommunityIcons
          name="restart"
          size={30}
        ></MaterialCommunityIcons>
      </TouchableOpacity>
    </View>
  );
};

export default ControlPanel;
