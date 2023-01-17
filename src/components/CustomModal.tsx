import { View, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { closeReminder } from '../store/GameStateSlice';
import CustomText from './CustomText';
import { useColorScheme } from 'nativewind';
import { useAppSelector, useAppDispatch } from '../hooks';

type Props = {};

const CustomModal = (props: Props) => {
  const { colorScheme } = useColorScheme();
  const { statusMessage } = useAppSelector((state) => state.gameState);
  const dispatch = useAppDispatch();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={statusMessage !== ''}
      onRequestClose={() => {
        dispatch(closeReminder());
      }}
    >
      <View className="flex-1 justify-center items-center">
        <View
          className={
            'w-40 h-fit bg-white rounded-xl dark:bg-neutral-500 shadow dark:shadow-none'
          }
        >
          <TouchableOpacity className="ml-auto p-2 rounded-full">
            <EvilIcons
              name="close"
              size={20}
              onPress={() => {
                dispatch(closeReminder());
              }}
              className="rounded-full"
              color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
            />
          </TouchableOpacity>
          <View className="px-3 space-y-2 ">
            <CustomText
              styleClass="text-center text-xl dark:text-white"
              content={statusMessage ?? ''}
            />

            <CustomText
              content={'Close the modal and start a new Game!'}
              styleClass="text-center pb-4 text-neutral-600 dark:text-white"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
