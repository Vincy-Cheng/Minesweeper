import { TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreenProp } from '../screens/props';
import Fontisto from 'react-native-vector-icons/Fontisto';

type Props = {};

const SettingButton = (props: Props) => {
  const navigation = useNavigation<NavigationScreenProp>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Setting');
      }}
    >
      <Fontisto name="player-settings" color={'#6b7280'} size={30} />
    </TouchableOpacity>
  );
};

export default SettingButton;
