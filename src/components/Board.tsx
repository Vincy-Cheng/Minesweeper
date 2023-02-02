import { Animated, ScrollView, View, PanResponder } from 'react-native';
import React, {
  createRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';

import Cell from './Cell';
import { useAppDispatch, useAppSelector } from '../hooks';

import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  State
} from 'react-native-gesture-handler';
import { handlePan } from '../store/GameStateSlice';

type Props = {};

const Board = (props: Props) => {
  const dispatch = useAppDispatch();
  const { board, scaleNumber, panNumber } = useAppSelector(
    (state) => state.gameState
  );

  const scale = useRef(new Animated.Value(scaleNumber || 1)).current;

  const pinchRef = createRef();
  const panRef = createRef();

  const [panEnabled, setPanEnabled] = useState<boolean>(true);
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
      onPanResponderRelease: () => {
        pan.flattenOffset();
        dispatch(
          handlePan({
            scale: scaleNumber,
            pan: { x: pan.x._value, y: pan.y._value }
          })
        );
        console.log(pan, 'leave');
      },
      onPanResponderEnd: () => {
        console.log(pan, 'end');
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
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(false);
    }

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
        setPanEnabled(true);
      } else {
        dispatch(handlePan({ scale: nScale, pan: panNumber }));
      }
    }
  };

  return (
    <View>
      <PanGestureHandler
        ref={panRef}
        simultaneousHandlers={[pinchRef]}
        enabled={panEnabled}
        failOffsetX={[-1000, 1000]}
        shouldCancelWhenOutside
      >
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }]
          }}
          {...panResponder.panHandlers}
        >
          <PinchGestureHandler
            ref={pinchRef}
            onGestureEvent={onPinchEvent}
            simultaneousHandlers={[panRef]}
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
      </PanGestureHandler>
    </View>
  );
};

export default Board;
