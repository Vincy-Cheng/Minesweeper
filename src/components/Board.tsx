import { View, PanResponder, Animated } from 'react-native';
import React, { useRef } from 'react';

import Cell from './Cell';
import { useAppDispatch, useAppSelector } from '../hooks';

import {
  HandlerStateChangeEvent,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  State
} from 'react-native-gesture-handler';

import { handlePan } from '../store/GameStateSlice';

type Props = {};

const Board = (props: Props) => {
  const dispatch = useAppDispatch();
  const { board, scaleNumber, panNumber, boardSize } = useAppSelector(
    (state) => state.gameState
  );

  const scale = useRef(new Animated.Value(scaleNumber || 1)).current;

  const maxWidth = boardSize.width * 36;
  const maxHeight = boardSize.height * 36;
  const pan = useRef<any>(
    new Animated.ValueXY({
      x: typeof panNumber.x === 'number' ? panNumber.x : 0,
      y: typeof panNumber.y === 'number' ? panNumber.y : 0
    })
  ).current;

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
    // if (nativeEvent.state === State.ACTIVE) {
    //   setPanEnabled(false);
    // }

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

  return (
    <View>
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
            <View className="h-full justify-center items-center">
              {board.map((row, rowIndex) => (
                <View key={rowIndex} className="flex flex-row">
                  {row.map((cell, cellIndex) => (
                    <Cell {...cell} key={'cell-' + cellIndex}></Cell>
                  ))}
                </View>
              ))}
            </View>
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </View>
  );
};

export default Board;
