import { useColorScheme } from 'nativewind';
import { TouchableOpacity } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ColorScheme } from '../enum';
import { useAppDispatch, useAppSelector } from '../hooks';
import { toggle } from '../store/ColorSchemeSlice';
type Props = {};

const DarkModeSwitch = (props: Props) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        toggleColorScheme();
        dispatch(toggle(colorScheme));
      }}
      className="rounded-full border-2 border-amber-100 bg-amber-300 dark:border-indigo-700 p-1 dark:bg-blue-900"
    >
      {colorScheme === ColorScheme.DARK ? (
        <Ionicons name="moon" size={30} color="#fcd34d"></Ionicons>
      ) : (
        <Feather name="sun" size={30} color="#ffffff"></Feather>
      )}
    </TouchableOpacity>
  );
};

export default DarkModeSwitch;
