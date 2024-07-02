/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    runOnJS,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import type {
    EasingFunction,
    EasingFunctionFactory,
    SharedValue} from "react-native-reanimated";

export const animateProgressWorklet = (variables: {
    adjustedProgress: number;
    angle: SharedValue<number>;
    animatedProgress: SharedValue<number>;
    animationInProgress: SharedValue<boolean>;
    delay: number;
    duration: number;
    easing: EasingFunction | EasingFunctionFactory;
    onAnimationComplete?: () => void;
    previousProgress: SharedValue<number>;
}) => {
    "worklet";

    const {
        adjustedProgress,
        angle,
        animatedProgress,
        animationInProgress,
        delay,
        duration,
        easing,
        onAnimationComplete,
        previousProgress,
    } = variables;

    if (animatedProgress.value === adjustedProgress) {
        return;
    }

    const adjustedDuration =
        adjustedProgress - previousProgress.value != 0
            ? Math.abs(
                  (adjustedProgress - animatedProgress.value) /
                      (adjustedProgress - previousProgress.value)
              ) * duration
            : duration;

    animationInProgress.value = true;

    animatedProgress.value = withDelay(
        delay,
        withTiming(
            adjustedProgress,
            {
                duration: adjustedDuration,
                easing,
            },
            (isFinished) => {
                if (isFinished) {
                    animationInProgress.value = false;
                    previousProgress.value = animatedProgress.value;
                    if (onAnimationComplete) {
                        runOnJS(onAnimationComplete)();
                    }
                }
            }
        )
    );

    angle.value = withDelay(
        delay,
        withTiming(-Math.PI / 2 + 2 * Math.PI * adjustedProgress, {
            duration: adjustedDuration,
            easing,
        })
    );
};
