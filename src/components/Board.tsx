import { Animated, ScrollView, View, PanResponder } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Cell from './Cell';
import { useAppSelector } from '../hooks';

type Props = {};

const Board = (props: Props) => {
  const { board } = useAppSelector((state) => state.gameState);
  const pan = useRef<any>(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }]
      }}
      {...panResponder.panHandlers}
    >
      <View
        className="h-full justify-center items-center"
        onResponderMove={(event) => {
          console.log(event.nativeEvent);
        }}
      >
        {board.map((row, rowIndex) => (
          <View key={rowIndex} className="flex flex-row">
            {row.map((cell, cellIndex) => (
              <Cell {...cell} key={'cell-' + cellIndex}></Cell>
            ))}
          </View>
        ))}
      </View>
    </Animated.View>
  );
};

export default Board;
