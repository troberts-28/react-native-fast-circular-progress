import React, {
    useEffect,
    forwardRef,
    useMemo,
    useImperativeHandle,
} from "react";
import { View } from "react-native";
import Animated, {
    Easing,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    EasingFunction,
    EasingFunctionFactory,
    withDelay,
    runOnJS,
    interpolateColor,
} from "react-native-reanimated";

import { generateStyles } from "./CircularProgress.styles";

export type TrackColorType = {
    value: number;
    color: string;
};

export interface CircularProgressRef {
    reset: (options?: { startInPausedState?: boolean }) => void;
}

export interface CircularProgressProps {
    progress: number; // between zero and 100
    initialValue?: number; // useful if using as a countdown timer
    duration?: number;
    delay?: number;
    startInPausedState?: boolean;
    onAnimationComplete?: () => void;
    easing?: EasingFunction | EasingFunctionFactory;
    clockwise?: boolean;
    rotateStartPointBy?: number;
    radius?: number;
    trackWidth?: number;
    inActiveTrackWidth?: number;
    useRoundedTip?: boolean;
    theme?: "light" | "dark";
    trackColor?: string | TrackColorType[];
    inActiveTrackColor?: string;
    backgroundColor?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    containerStyle?: any;
}

const CircularProgress = forwardRef(
    (
        {
            progress,
            initialValue = 0,
            duration = 500,
            delay = 0,
            startInPausedState = false,
            onAnimationComplete,
            easing = Easing.inOut(Easing.quad),
            clockwise = true,
            rotateStartPointBy = 0,
            radius = 150,
            trackWidth = 30,
            inActiveTrackWidth = 40,
            useRoundedTip = true,
            theme = "light",
            trackColor,
            inActiveTrackColor,
            backgroundColor,
            containerStyle,
        }: CircularProgressProps,
        ref
    ) => {
        const styles = useMemo(
            () =>
                generateStyles({
                    theme,
                    radius,
                    trackWidth,
                    inActiveTrackWidth,
                    trackColor,
                    inActiveTrackColor,
                    backgroundColor,
                    clockwise,
                    rotateStartPointBy,
                    containerStyle,
                }),
            [
                backgroundColor,
                clockwise,
                containerStyle,
                inActiveTrackColor,
                inActiveTrackWidth,
                radius,
                rotateStartPointBy,
                theme,
                trackColor,
                trackWidth,
            ]
        );

        // avoid invalid progress inputs
        const adjustedProgress = Math.min(Math.max(progress / 100, 0), 1);

        const animatedProgress = useSharedValue(
            Math.min(Math.max(initialValue / 100, 0), 1)
        );
        const paused = useSharedValue(startInPausedState);
        const angle = useSharedValue(-Math.PI / 2);

        useEffect(() => {
            //animate progress value whenever it changes
            animatedProgress.value = withDelay(
                delay,
                withTiming(
                    adjustedProgress,
                    {
                        duration,
                        easing,
                    },
                    (isFinished) => {
                        if (isFinished && onAnimationComplete) {
                            runOnJS(onAnimationComplete)();
                        }
                    }
                )
            );

            // map progress [0, 1] to angle [-π/2, 3π/2]
            angle.value = withTiming(
                -Math.PI / 2 + 2 * Math.PI * adjustedProgress,
                {
                    duration,
                    easing,
                }
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [adjustedProgress]);

        useImperativeHandle(ref, () => ({
            reset: (options?: { startInPausedState?: boolean }) => {
                paused.value =
                    options?.startInPausedState ?? startInPausedState ?? false;
                animatedProgress.value = initialValue;
            },
        }));

        const animatedTrackColors = useMemo(() => {
            if (typeof trackColor !== "string" && trackColor !== undefined) {
                const sortedTrackColors = trackColor.sort(
                    (a, b) => a.value - b.value
                );
                return {
                    values: sortedTrackColors.map((item) => item.value),
                    colors: sortedTrackColors.map((item) => item.color),
                };
            }
        }, [trackColor]);

        const trackAnimatedColorStyle = useAnimatedStyle(() => {
            if (!animatedTrackColors) {
                return {};
            }

            return {
                backgroundColor: interpolateColor(
                    animatedProgress.value * 100,
                    animatedTrackColors?.values,
                    animatedTrackColors?.colors
                ),
            };
        });

        const activeTrackRightHalfContainerAnimatedStyle = useAnimatedStyle(
            () => {
                return {
                    opacity: animatedProgress.value > 0 ? 1 : 0,
                    transform: [
                        {
                            rotate: `${
                                animatedProgress.value <= 0.5
                                    ? animatedProgress.value * 360 - 180
                                    : 0
                            }deg`,
                        },
                    ],
                };
            }
        );

        const activeTrackLeftHalfContainerAnimatedStyle = useAnimatedStyle(
            () => {
                return {
                    opacity: animatedProgress.value > 0.5 ? 1 : 0,
                    transform: [
                        {
                            rotate:
                                animatedProgress.value > 0.5
                                    ? `${
                                          (animatedProgress.value - 0.5) * 360 -
                                          180
                                      }deg`
                                    : "0deg",
                        },
                    ],
                };
            }
        );

        // used to mask the side of the active track that goes beyond 0 degrees
        // when the progress is less than 50%
        const activeTrackRightHalfMaskAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: animatedProgress.value < 0.5 ? 1 : 0,
            };
        });

        const startTipAnimatedStyle = useAnimatedStyle(() => {
            if (!useRoundedTip) {
                return {};
            }

            return {
                opacity: animatedProgress.value > 0 ? 1 : 0,
            };
        });

        const endTipAnimatedStyle = useAnimatedStyle(() => {
            if (!useRoundedTip) {
                return {};
            }

            const middleTrackRadius = radius - trackWidth / 1.5;
            const x = middleTrackRadius * Math.cos(angle.value);
            const y = middleTrackRadius * Math.sin(angle.value);
            return {
                opacity: animatedProgress.value > 0 ? 1 : 0,
                transform: [
                    { translateX: x + radius - trackWidth / 2 },
                    { translateY: y + radius - trackWidth / 2 },
                ],
            };
        });

        return (
            <View style={styles.container}>
                {/* InActive Track */}
                <View style={styles.inActiveTrack} />

                {/* Right half of active track */}
                <Animated.View
                    style={[
                        styles.activeTrackRightHalfContainer,
                        activeTrackRightHalfContainerAnimatedStyle,
                    ]}>
                    <Animated.View
                        style={[
                            styles.activeTrackRightHalf,
                            trackAnimatedColorStyle,
                        ]}
                    />
                </Animated.View>

                {/* Mask for right half of active track */}
                <Animated.View
                    style={[
                        styles.activeTrackMaskRightHalf,
                        activeTrackRightHalfMaskAnimatedStyle,
                    ]}
                />

                {/* Left half of active track */}
                <Animated.View
                    style={[
                        styles.activeTrackLeftHalfContainer,
                        activeTrackLeftHalfContainerAnimatedStyle,
                    ]}>
                    <Animated.View
                        style={[
                            styles.activeTrackLeftHalf,
                            trackAnimatedColorStyle,
                        ]}
                    />
                </Animated.View>

                {/* Circle at the start for rounded edge */}
                {useRoundedTip ? (
                    <Animated.View
                        style={[
                            styles.roundedTipStart,
                            startTipAnimatedStyle,
                            trackAnimatedColorStyle,
                        ]}
                    />
                ) : null}

                {/* Circle at the end for rounded edge */}
                {useRoundedTip ? (
                    <Animated.View
                        style={[
                            styles.roundedTipEnd,
                            endTipAnimatedStyle,
                            trackAnimatedColorStyle,
                        ]}
                    />
                ) : null}

                {/* Circle to show the inner inactive track */}
                <View style={styles.inActiveTrackInnerOverlay} />

                {/* Circle to hide the center of the ring */}
                <View style={styles.innerRingMask} />
            </View>
        );
    }
);

export default React.memo(CircularProgress);
