import { View, Text } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameScreen from '../screens/GameScreen';
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from '../screens/props';
import RecordScreen from '../screens/RecordScreen';
import { useAppSelector } from '../hooks';
import { useColorScheme } from 'nativewind';
import SettingScreen from '../screens/SettingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const { mode } = useAppSelector((state) => state.colorScheme);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  useLayoutEffect(() => {
    if (mode !== colorScheme) {
      toggleColorScheme();
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Record"
          component={RecordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
