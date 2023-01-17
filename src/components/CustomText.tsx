import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import clsx from 'clsx';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
// import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();
type CustomTextProps = {
  content: string | Number;
  styleClass?: string;
  viewStyle?: string;
};

const CustomText = ({ content, styleClass, viewStyle }: CustomTextProps) => {
  const [fontsLoaded] = useFonts({
    IBM_Plex_Mono: require('../../assets/fonts/IBM_Plex_Mono/IBMPlexMono-Regular.ttf')
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
    <View
      onLayout={onLayoutRootView}
      className={clsx('', { [`${viewStyle}`]: viewStyle })}
    >
      <Text
        style={styles.text}
        className={clsx('', { [`${styleClass}`]: styleClass })}
      >
        {content.toString()}
      </Text>
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'IBM_Plex_Mono'
  }
});
