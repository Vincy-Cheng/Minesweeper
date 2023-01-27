import { Animated, ScrollView, View, PanResponder } from 'react-native';
import React, {
  createRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';

import Cell from './Cell';
import { useAppSelector } from '../hooks';

import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  State
} from 'react-native-gesture-handler';

type Props = {};

const Board = (props: Props) => {
  const { board } = useAppSelector((state) => state.gameState);
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const pinchRef = createRef();
  const panRef = createRef();

  const [panEnabled, setPanEnabled] = useState<boolean>(true);
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

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale }
      }
    ],
    { useNativeDriver: true }
  );

  // const onPanEvent = Animated.event(
  //   [
  //     {
  //       // nativeEvent: {
  //       //   translationX: translateX,
  //       //   translationY: translateY
  //       // }
  //     }
  //   ],
  //   { useNativeDriver: false }
  // );

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
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true
        }).start();

        setPanEnabled(true);
      }
    }
  };

  return (
    <View>
      <PanGestureHandler
        // onGestureEvent={onPanEvent}
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
                transform: [{ scale }, { translateX }, { translateY }]
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
    // <>
    //   <PanGestureHandler
    //     onGestureEvent={onPanGestureEvent}
    //     onHandlerStateChange={handlePinchStateChange}
    //   >
    //     <Animated.View
    //       style={{
    //         transform: [
    //           { translateX: translateX },
    //           { translateY: translateY },
    //           { perspective: 1 },
    //           { scale: scale }
    //         ]
    //       }}
    //       // {...panResponder.panHandlers}

    //       // resizeMode="contain"
    //     >
    //       <View
    //         className="h-full justify-center items-center"
    //         // onResponderMove={(event) => {
    //         //   console.log(event.nativeEvent);
    //         // }}
    //       >
    //         {board.map((row, rowIndex) => (
    //           <View key={rowIndex} className="flex flex-row">
    //             {row.map((cell, cellIndex) => (
    //               <Cell
    //                 {...cell}
    //                 key={'cell-' + cellIndex}
    //                 panEnabled={false}
    //               ></Cell>
    //             ))}
    //           </View>
    //         ))}
    //       </View>
    //     </Animated.View>
    //   </PanGestureHandler>
    // </>
  );
};

export default Board;
