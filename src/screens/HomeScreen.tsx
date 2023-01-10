import { View, Text, Button } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export type HomeProps = {
  onLayout: () => Promise<void>;
};

const HomeScreen = ({ onLayout }: HomeProps) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container} onLayout={onLayout}>
        <Text style={{ fontFamily: 'IBM_Plex_Mono' }}>MineSweeper</Text>
      </View>

      <Button title="Game Start"></Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {}
});
export default HomeScreen;
