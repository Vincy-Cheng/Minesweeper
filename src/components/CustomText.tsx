import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type CustomTextProps = {
  content: string | Number;
  className?: string;
};

const CustomText = ({ content, className }: CustomTextProps) => {
  return (
    <Text style={styles.text} className={className}>
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
