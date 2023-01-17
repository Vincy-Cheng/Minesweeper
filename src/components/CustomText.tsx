import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import clsx from 'clsx';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

type CustomTextProps = {
  content: string | Number;
  styleClass?: string;
};

const CustomText = ({ content, styleClass }: CustomTextProps) => {
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
    <Text
      style={styles.text}
      onLayout={onLayoutRootView}
      className={clsx('', { [`${styleClass}`]: styleClass })}
    >
      {content.toString()}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'IBM_Plex_Mono'
  }
});
