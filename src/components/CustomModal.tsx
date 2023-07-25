import { View, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { closeReminder } from '../store/GameStateSlice';
import { useColorScheme } from 'nativewind';
import { useAppSelector, useAppDispatch } from '../hooks';

type CustomModalProps = {
  body: JSX.Element;
  visible: boolean;
  closeAction: () => void;
};

const CustomModal = ({ body, visible, closeAction }: CustomModalProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        closeAction();
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
                closeAction();
              }}
              className="rounded-full"
              color={colorScheme === 'dark' ? '#ffffff' : '#000000'}
            />
          </TouchableOpacity>
          <View className="px-3 space-y-2 modal-body pb-1">{body}</View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
