import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import clsx from 'clsx';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { FontStyle } from '../enum';

SplashScreen.preventAutoHideAsync();
type CustomTextProps = {
  content: string | Number;
  styleClass?: string;
  viewStyle?: string;
  fontStyle: FontStyle;
};

const CustomText = ({
  content,
  styleClass,
  viewStyle,
  fontStyle
}: CustomTextProps) => {
  const [fontsLoaded] = useFonts({
    IBM_Plex_Mono: require('../../assets/fonts/IBM_Plex_Mono/IBMPlexMono-Regular.ttf'),
    IBM_Plex_Mono_Italic: require('../../assets/fonts/IBM_Plex_Mono/IBMPlexMono-Italic.ttf'),
    IBM_Plex_Mono_Bold: require('../../assets/fonts/IBM_Plex_Mono/IBMPlexMono-Bold.ttf'),
    IBM_Plex_Mono_Bold_Italic: require('../../assets/fonts/IBM_Plex_Mono/IBMPlexMono-BoldItalic.ttf'),
    IBM_Plex_Mono_Thin: require('../../assets/fonts/IBM_Plex_Mono/IBMPlexMono-Thin.ttf'),
    IBM_Plex_Mono_Thin_Italic: require('../../assets/fonts/IBM_Plex_Mono/IBMPlexMono-ThinItalic.ttf')
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const fontStyleMatching = (style: FontStyle) => {
    switch (style) {
      case FontStyle.IBM_Plex_Mono_Bold:
        return styles.Bold;
      case FontStyle.IBM_Plex_Mono_Bold_Italic:
        return styles.BoldItalic;
      case FontStyle.IBM_Plex_Mono_Italic:
        return styles.Italic;
      case FontStyle.IBM_Plex_Mono_Thin:
        return styles.Thin;
      case FontStyle.IBM_Plex_Mono_Thin_Italic:
        return styles.ThinItalic;
      default:
        return styles.Regular;
    }
  };

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      onLayout={onLayoutRootView}
      className={clsx('', { [`${viewStyle}`]: viewStyle })}
    >
      <Text
        style={fontStyleMatching(fontStyle)}
        className={clsx('', { [`${styleClass}`]: styleClass })}
      >
        {content.toString()}
      </Text>
    </View>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  Regular: {
    fontFamily: 'IBM_Plex_Mono'
  },
  Italic: {
    fontFamily: 'IBM_Plex_Mono_Italic'
  },
  Thin: {
    fontFamily: 'IBM_Plex_Mono_Thin'
  },
  ThinItalic: {
    fontFamily: 'IBM_Plex_Mono_Thin_Italic'
  },
  Bold: {
    fontFamily: 'IBM_Plex_Mono_Bold'
  },
  BoldItalic: {
    fontFamily: 'IBM_Plex_Mono_Bold_Italic'
  }
});
