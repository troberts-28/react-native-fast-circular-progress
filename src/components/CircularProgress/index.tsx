import React, { useEffect, forwardRef } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
    Easing,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

export interface CircularProgressProps {
    radius: number;
    strokeWidth: number;
    inActiveStrokeWidth: number;
    duration: number;
    progress: number;
}

const CircularProgress = forwardRef(
    (
        {
            radius,
            strokeWidth,
            inActiveStrokeWidth,
            duration,
            progress,
        }: CircularProgressProps,
        ref
    ) => {
        const adjustedProgress = Math.min(Math.max(progress, 0), 1);

        const animatedProgress = useSharedValue(0);
        const angle = useSharedValue(-Math.PI / 2);

        useEffect(() => {
            animatedProgress.value = withTiming(adjustedProgress, {
                duration,
                easing: Easing.inOut(Easing.quad),
            });

            // map progress [0, 1] to angle [-π/2, 3π/2]
            angle.value = withTiming(
                -Math.PI / 2 + 2 * Math.PI * adjustedProgress,
                {
                    duration,
                    easing: Easing.inOut(Easing.quad),
                }
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [adjustedProgress]);

        const rightHalfActiveTrackAnimatedStyle = useAnimatedStyle(() => {
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
        });

        const leftHalfActiveTrackAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: animatedProgress.value > 0.5 ? 1 : 0,
                transform: [
                    {
                        rotate:
                            animatedProgress.value > 0.5
                                ? `${
                                      (animatedProgress.value - 0.5) * 360 - 180
                                  }deg`
                                : "0deg",
                    },
                ],
            };
        });

        const rightHalfActiveTrackMaskAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: animatedProgress.value < 0.5 ? 1 : 0,
            };
        });

        const startTipAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: animatedProgress.value > 0 ? 1 : 0,
            };
        });

        const endTipAnimatedStyle = useAnimatedStyle(() => {
            const middleTrackRadius = radius - strokeWidth / 1.5;
            const x = middleTrackRadius * Math.cos(angle.value);
            const y = middleTrackRadius * Math.sin(angle.value);
            return {
                opacity: animatedProgress.value > 0 ? 1 : 0,
                transform: [
                    { translateX: x + radius - strokeWidth / 2 },
                    { translateY: y + radius - strokeWidth / 2 },
                ],
            };
        });

        const ringPadding = (inActiveStrokeWidth - strokeWidth) / 2;
        const activeRingRadius = radius - ringPadding;

        return (
            <View
                style={{
                    width: radius * 2,
                    height: radius * 2,
                    position: "relative",
                }}>
                {/* InActive Track */}
                <View
                    style={{
                        position: "absolute",
                        width: radius * 2,
                        height: radius * 2,
                        borderRadius: radius,
                        borderWidth: inActiveStrokeWidth,
                        borderColor: "#ddd",
                        zIndex: 0,
                    }}
                />

                {/* Right half of active track */}
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            top: ringPadding,
                            left: ringPadding,
                            width: activeRingRadius * 2,
                            height: activeRingRadius * 2,
                            alignItems: "flex-end",
                            zIndex: 2,
                        },
                        rightHalfActiveTrackAnimatedStyle,
                    ]}>
                    <View
                        style={{
                            width: activeRingRadius,
                            height: activeRingRadius * 2,
                            borderTopRightRadius: activeRingRadius,
                            borderBottomRightRadius: activeRingRadius,
                            backgroundColor: "tomato",
                        }}
                    />
                </Animated.View>
                {/* Mask for right half of active track */}
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: radius,
                            height: radius * 2,
                            borderTopLeftRadius: radius,
                            borderBottomLeftRadius: radius,
                            backgroundColor: "#ddd",
                            zIndex: 2,
                        },
                        rightHalfActiveTrackMaskAnimatedStyle,
                    ]}
                />
                {/* Left half of active track */}
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            top: ringPadding,
                            left: ringPadding,
                            width: activeRingRadius * 2,
                            height: activeRingRadius * 2,
                            zIndex: 2,
                        },
                        leftHalfActiveTrackAnimatedStyle,
                    ]}>
                    <View
                        style={{
                            width: activeRingRadius,
                            height: activeRingRadius * 2,
                            borderTopLeftRadius: activeRingRadius,
                            borderBottomLeftRadius: activeRingRadius,
                            backgroundColor: "tomato",
                        }}
                    />
                </Animated.View>

                {/* Circle at the start for rounded edge */}
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            width: strokeWidth,
                            height: strokeWidth,
                            borderRadius: strokeWidth / 2,
                            top: ringPadding,
                            left: radius - strokeWidth / 2,
                            backgroundColor: "tomato",
                            zIndex: 2,
                        },
                        startTipAnimatedStyle,
                    ]}
                />

                {/* Circle at the end for rounded edge */}
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            width: strokeWidth,
                            height: strokeWidth,
                            borderRadius: strokeWidth / 2,
                            backgroundColor: "tomato",
                            zIndex: 2,
                        },
                        endTipAnimatedStyle,
                    ]}
                />

                {/* Circle to show the inner inactive track */}
                <View
                    style={{
                        position: "absolute",
                        top: inActiveStrokeWidth - ringPadding,
                        left: inActiveStrokeWidth - ringPadding,
                        width: (radius - inActiveStrokeWidth + ringPadding) * 2,
                        height:
                            (radius - inActiveStrokeWidth + ringPadding) * 2,
                        borderRadius:
                            radius - inActiveStrokeWidth + ringPadding,
                        backgroundColor: "#ddd",
                        zIndex: 3,
                    }}
                />
                {/* Circle to hide the center of the ring */}
                <View
                    style={{
                        position: "absolute",
                        top: inActiveStrokeWidth,
                        left: inActiveStrokeWidth,
                        width: (radius - inActiveStrokeWidth) * 2,
                        height: (radius - inActiveStrokeWidth) * 2,
                        borderRadius: radius - inActiveStrokeWidth,
                        backgroundColor: "white",
                        zIndex: 3,
                    }}
                />
            </View>
        );
    }
);

export default React.memo(CircularProgress);
