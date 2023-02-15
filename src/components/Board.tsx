import { View, PanResponder, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import Cell from './Cell';
import { useAppDispatch, useAppSelector } from '../hooks';

import {
  HandlerStateChangeEvent,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  State,
  LongPressGestureHandler,
  LongPressGestureHandlerEventPayload
} from 'react-native-gesture-handler';

import { handleCell, handlePan } from '../store/GameStateSlice';
import { GameMode } from '../enum';

type Props = {};

const Board = (props: Props) => {
  const dispatch = useAppDispatch();
  const { board, scaleNumber, panNumber, boardSize, mode } = useAppSelector(
    (state) => state.gameState
  );

  // const [gestureEnable, setGestureEnable] = useState<{
  //   panEnable: boolean;
  //   pinchEnable: boolean;
  //   longPressEnable: boolean;
  // }>({ panEnable: true, pinchEnable: true, longPressEnable: true });

  const scale = useRef(new Animated.Value(scaleNumber || 1)).current;

  const maxWidth = boardSize.width * 36;
  const maxHeight = boardSize.height * 36;
  const pan = useRef<any>(
    new Animated.ValueXY({
      x: typeof panNumber.x === 'number' ? panNumber.x : 0,
      y: typeof panNumber.y === 'number' ? panNumber.y : 0
    })
  ).current;

  // Pan Gesture
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
      onPanResponderRelease: (e, gesture) => {
        pan.flattenOffset();
        let tempXY: { x: number; y: number } = {
          ...JSON.parse(JSON.stringify(pan))
        };
        if (tempXY.x > maxWidth / 4) {
          tempXY.x = maxWidth / 4;
        } else if (tempXY.x < -maxWidth / 4) {
          tempXY.x = -maxWidth / 4;
        }

        if (tempXY.y > maxHeight / 4) {
          tempXY.y = maxHeight / 4;
        } else if (tempXY.y < -maxHeight / 4) {
          tempXY.y = -maxHeight / 4;
        }

        pan.setValue({ ...tempXY });
        dispatch(handlePan({ scale: scaleNumber, pan: { ...tempXY } }));
      }
    })
  ).current;

  // Pinch Gesture
  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale }
      }
    ],
    { useNativeDriver: true }
  );

  const handlePinchStateChange = ({
    nativeEvent
  }: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>) => {
    // disable pan when pinch-zoom

    // when scale < 1, reset scale back to original (1)
    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true
        }).start();
        Animated.spring(pan.x, {
          toValue: panNumber.x,
          useNativeDriver: true
        }).start();
        Animated.spring(pan.y, {
          toValue: panNumber.y,
          useNativeDriver: true
        }).start();
        dispatch(handlePan({ scale: 1, pan: panNumber }));
        // setPanEnabled(true);
      } else if (nScale > 3) {
        Animated.spring(scale, {
          toValue: 3,
          useNativeDriver: true
        }).start();
        Animated.spring(pan.x, {
          toValue: panNumber.x,
          useNativeDriver: true
        }).start();
        Animated.spring(pan.y, {
          toValue: panNumber.y,
          useNativeDriver: true
        }).start();
        dispatch(handlePan({ scale: 3, pan: panNumber }));
        // setPanEnabled(true);
      } else {
        dispatch(handlePan({ scale: nScale, pan: panNumber }));
      }
    }
  };

  // Long Press Gesture
  const onLongPress = (
    event: HandlerStateChangeEvent<LongPressGestureHandlerEventPayload>,
    rowIndex: number,
    colIndex: number
  ) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      dispatch(handleCell({ row: rowIndex, col: colIndex }));
    }
  };

  return (
    <View className="h-full justify-center items-center">
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
        <PinchGestureHandler
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={handlePinchStateChange}
        >
          <Animated.View
            style={{
              transform: [
                { scale },
                { translateX: pan.x },
                { translateY: pan.y }
              ]
            }}
          >
            {board.map((row, rowIndex) => (
              <View key={rowIndex} className="flex flex-row">
                {row.map((cell, cellIndex) => (
                  <LongPressGestureHandler
                    onHandlerStateChange={(event) => {
                      onLongPress(event, rowIndex, cellIndex);
                    }}
                    minDurationMs={500}
                    key={'cell-' + cellIndex}
                    enabled={mode === GameMode.FLAG}
                  >
                    <View className="cell">
                      <Cell {...cell} />
                    </View>
                  </LongPressGestureHandler>
                ))}
              </View>
            ))}
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </View>
  );
};

export default Board;
