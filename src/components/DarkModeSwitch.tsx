import { useColorScheme } from 'nativewind';
import { TouchableOpacity } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
type Props = {};

const DarkModeSwitch = (props: Props) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <TouchableOpacity
      onPress={toggleColorScheme}
      className="rounded-full border-2 border-amber-100 bg-amber-300 dark:border-indigo-700 p-1 dark:bg-blue-900"
    >
      {colorScheme === 'dark' ? (
        <Ionicons name="moon" size={30} color="#fcd34d"></Ionicons>
      ) : (
        <Feather name="sun" size={30} color="#ffffff"></Feather>
      )}
    </TouchableOpacity>
  );
};

export default DarkModeSwitch;
