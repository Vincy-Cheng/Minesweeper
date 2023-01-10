import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Board from './src/components/Board';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    // <SafeAreaView className="bg-white flex-1">
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </SafeAreaView>
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading ...</Text>} persistor={persistor}>
          <Board></Board>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
