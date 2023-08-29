import React, { useState, useEffect, forwardRef } from "react";
import { View, Animated, Easing } from "react-native";

export interface CircularProgressRef {
    reset: (options?: { animated?: boolean }) => void;
    setValue: (value: number, options?: { animated?: boolean }) => void;
}

export interface CircularProgressProps {
    radius: number;
    strokeWidth: number;
    duration: number;
    progress: number;
}

const CircularProgress = forwardRef<CircularProgressRef, CircularProgressProps>(
    ({ radius, strokeWidth, duration, progress }, ref): React.ReactElement => {
        const [animatedValue] = useState(new Animated.Value(0));
        const [endX, setEndX] = useState(0);
        const [endY, setEndY] = useState(0);

        const circleDiameter = radius * 2;
        const containerSize = circleDiameter + strokeWidth * 2;

        useEffect(() => {
            const listener = animatedValue.addListener(({ value }) => {
                const angle = (value * 360 * Math.PI) / 180;
                setEndX(radius * Math.cos(angle - Math.PI / 2));
                setEndY(radius * Math.sin(angle - Math.PI / 2));
            });

            Animated.timing(animatedValue, {
                toValue: progress,
                duration,
                easing: Easing.linear,
                useNativeDriver: true,
            }).start();

            return () => {
                animatedValue.removeListener(listener);
            };
        }, [progress, animatedValue, radius, duration]);

        const rotation = animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"],
        });

        return (
            <View
                style={{
                    width: containerSize,
                    height: containerSize,
                    position: "relative",
                }}>
                {/* Background Circle */}
                <View
                    style={{
                        position: "absolute",
                        width: circleDiameter,
                        height: circleDiameter,
                        borderRadius: radius,
                        backgroundColor: "#ddd",
                        top: strokeWidth,
                        left: strokeWidth,
                    }}
                />

                {/* Foreground Circle */}
                <Animated.View
                    style={{
                        position: "absolute",
                        width: circleDiameter,
                        height: circleDiameter,
                        borderRadius: radius,
                        backgroundColor: "transparent",
                        transform: [{ rotate: rotation }],
                        zIndex: 1,
                        top: strokeWidth,
                        left: strokeWidth,
                        borderTopColor: "transparent",
                        borderLeftColor: "transparent",
                        borderBottomColor: "transparent",
                        borderRightColor: "#f00",
                        borderWidth: radius,
                    }}
                />

                {/* Circle at the end for rounded edge */}
                <View
                    style={{
                        position: "absolute",
                        width: strokeWidth,
                        height: strokeWidth,
                        borderRadius: strokeWidth / 2,
                        backgroundColor: "#f00",
                        top: radius + endY - strokeWidth / 2 + strokeWidth,
                        left: radius + endX - strokeWidth / 2 + strokeWidth,
                    }}
                />
            </View>
        );
    }
);

export default React.memo(CircularProgress);
