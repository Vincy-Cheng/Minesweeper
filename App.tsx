import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { RootStackParamList } from './src/screens/props';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import RecordScreen from './src/screens/RecordScreen';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import CustomText from './src/components/CustomText';

const Stack = createNativeStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    IBM_Plex_Mono: require('./assets/fonts/IBM_Plex_Mono/IBMPlexMono-Regular.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View>
        <CustomText content={'Loading ...'} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate
          loading={<CustomText content={'Loading ...'} />}
          persistor={persistor}
        >
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home">
                {() => <HomeScreen onLayout={onLayoutRootView}></HomeScreen>}
              </Stack.Screen>
              <Stack.Screen name="Game" component={GameScreen} />
              <Stack.Screen name="Record" component={RecordScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
