import { View, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  withDecay,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { clamp, withBouncing } from "react-native-redash";

import { Card, Cards, CARD_WIDTH, CARD_HEIGHT } from "../components";

interface GestureProps {
  width: number;
  height: number;
}

export const PanGesture = ({ width, height }: GestureProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const boundX = width - CARD_WIDTH;
  const boundY = height - CARD_HEIGHT;

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { offsetX: number, offsetY: number }>({
    onStart: (_, context) => {
      context.offsetX = translateX.value;
      context.offsetY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = clamp(context.offsetX + event?.translationX, 0, boundX);
      translateY.value = clamp(context.offsetY + event?.translationY, 0, boundY);
    },
    onEnd: (event) => {
      // translateX.value = withDecay({
      //   velocity: event.velocityX,
      //   clamp: [0, boundX]
      // })
      //   translateY.value = withDecay({
      //     velocity: event.velocityY,
      //     clamp: [0, boundY]
      //   })
      translateX.value = withBouncing(
        withDecay({ velocity: event.velocityX }), 0, boundX
      );
      translateY.value = withBouncing(
        withDecay({ velocity: event.velocityY }), 0, boundY
      );
    },
  });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value }
    ]
  }));
  return (
    <View style={styles.container}>
      <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View {...{ style }}>
          <Card card={Cards.Card1} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});