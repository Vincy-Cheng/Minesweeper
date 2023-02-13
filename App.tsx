import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import CustomText from './src/components/CustomText';
import Navigation from './src/layout/Navigation';
import { FontStyle } from './src/enum';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { View } from 'react-native';
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    IBM_Plex_Mono: require('./assets/fonts/IBM_Plex_Mono/IBMPlexMono-Regular.ttf'),
    IBM_Plex_Mono_Italic: require('./assets/fonts/IBM_Plex_Mono/IBMPlexMono-Italic.ttf'),
    IBM_Plex_Mono_Bold: require('./assets/fonts/IBM_Plex_Mono/IBMPlexMono-Bold.ttf'),
    IBM_Plex_Mono_Bold_Italic: require('./assets/fonts/IBM_Plex_Mono/IBMPlexMono-BoldItalic.ttf'),
    IBM_Plex_Mono_Thin: require('./assets/fonts/IBM_Plex_Mono/IBMPlexMono-Thin.ttf'),
    IBM_Plex_Mono_Thin_Italic: require('./assets/fonts/IBM_Plex_Mono/IBMPlexMono-ThinItalic.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View onLayout={onLayoutRootView} className="h-full">
        <Provider store={store}>
          <PersistGate
            loading={
              <View onLayout={onLayoutRootView}>
                <CustomText
                  content={'Loading ...'}
                  fontStyle={FontStyle.IBM_Plex_Mono}
                />
              </View>
            }
            persistor={persistor}
          >
            <Navigation />
          </PersistGate>
        </Provider>
      </View>
    </SafeAreaProvider>
  );
}
