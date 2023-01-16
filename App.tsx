import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import { RootStackParamList } from './src/screens/props';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import RecordScreen from './src/screens/RecordScreen';
import * as SplashScreen from 'expo-splash-screen';
import CustomText from './src/components/CustomText';
import Navigation from './src/layout/Navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate
          loading={<CustomText content={'Loading ...'} />}
          persistor={persistor}
        >
          <Navigation />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
