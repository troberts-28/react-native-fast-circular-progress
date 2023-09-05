/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    EasingFunction,
    EasingFunctionFactory,
    SharedValue,
    runOnJS,
    withDelay,
    withTiming,
} from "react-native-reanimated";

export const animateProgressWorklet = (variables: {
    animatedProgress: SharedValue<number>;
    previousProgress: SharedValue<number>;
    animationInProgress: SharedValue<boolean>;
    angle: SharedValue<number>;
    adjustedProgress: number;
    duration: number;
    easing: EasingFunction | EasingFunctionFactory;
    delay: number;
    onAnimationComplete?: () => void;
}) => {
    "worklet";

    const {
        animatedProgress,
        previousProgress,
        animationInProgress,
        angle,
        adjustedProgress,
        duration,
        easing,
        delay,
        onAnimationComplete,
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
