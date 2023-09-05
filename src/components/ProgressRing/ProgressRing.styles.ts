/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleSheet } from "react-native";

import { TrackColorType } from ".";

export interface CustomProgressRingStyles {
    theme: "light" | "dark";
    size: number;
    trackWidth: number;
    inActiveTrackWidth: number;
    trackColor?: string | TrackColorType[];
    inActiveTrackColor?: string;
    backgroundColor?: string;
    clockwise?: boolean;
    rotateStartPointBy?: number;
    containerStyle?: any;
}

const COLORS = {
    light: {
        track: "#10B981",
        inactiveTrack: "#dddddd",
        background: "#ffffff",
    },
    dark: {
        track: "#6EE7B7",
        inactiveTrack: "#808080",
        background: "#000000",
    },
};

export const generateStyles = ({
    theme,
    size,
    trackWidth,
    inActiveTrackWidth,
    trackColor,
    inActiveTrackColor,
    backgroundColor,
    clockwise,
    rotateStartPointBy,
    containerStyle,
}: CustomProgressRingStyles) => {
    const radius = size / 2;
    const ringPadding = (inActiveTrackWidth - trackWidth) / 2;
    const activeRingRadius = radius - ringPadding;
    const innerActiveRingRadius = radius - inActiveTrackWidth + ringPadding;

    const initialTrackColor =
        typeof trackColor === "string" || trackColor === undefined
            ? trackColor
            : trackColor[0].color;

    return StyleSheet.create({
        container: {
            width: size,
            height: size,
            position: "relative",
            transform: [
                { scaleX: clockwise ? 1 : -1 },
                { rotate: `${rotateStartPointBy}deg` },
            ],
            overflow: "hidden",
            ...containerStyle,
        },
        inActiveTrack: {
            position: "absolute",
            width: size,
            height: size,
            borderRadius: radius,
            borderWidth: inActiveTrackWidth,
            borderColor: inActiveTrackColor ?? COLORS[theme].inactiveTrack,
            overflow: "hidden",
            zIndex: 0,
        },
        activeTrackRightHalfContainer: {
            position: "absolute",
            top: ringPadding,
            left: ringPadding,
            width: activeRingRadius * 2,
            height: activeRingRadius * 2,
            alignItems: "flex-end",
            zIndex: 1,
        },
        activeTrackRightHalf: {
            width: activeRingRadius,
            height: activeRingRadius * 2,
            borderTopRightRadius: activeRingRadius,
            borderBottomRightRadius: activeRingRadius,
            backgroundColor: initialTrackColor ?? COLORS[theme].track,
            overflow: "hidden",
        },
        activeTrackMaskRightHalf: {
            position: "absolute",
            top: 0,
            left: 0,
            width: radius,
            height: size,
            borderTopLeftRadius: radius,
            borderBottomLeftRadius: radius,
            backgroundColor: inActiveTrackColor ?? COLORS[theme].inactiveTrack,
            overflow: "hidden",
            zIndex: 2,
        },
        activeTrackLeftHalfContainer: {
            position: "absolute",
            top: ringPadding,
            left: ringPadding,
            width: activeRingRadius * 2,
            height: activeRingRadius * 2,
            zIndex: 1,
        },
        activeTrackLeftHalf: {
            width: activeRingRadius,
            height: activeRingRadius * 2,
            borderTopLeftRadius: activeRingRadius,
            borderBottomLeftRadius: activeRingRadius,
            backgroundColor: initialTrackColor ?? COLORS[theme].track,
            overflow: "hidden",
        },
        roundedTipStart: {
            position: "absolute",
            width: trackWidth,
            height: trackWidth,
            borderRadius: trackWidth / 2,
            top: ringPadding,
            left: radius - trackWidth / 2,
            backgroundColor: initialTrackColor ?? COLORS[theme].track,
            opacity: 0,
            overflow: "hidden",
            zIndex: 2,
        },
        roundedTipEnd: {
            position: "absolute",
            width: trackWidth,
            height: trackWidth,
            borderRadius: trackWidth / 2,
            backgroundColor: initialTrackColor ?? COLORS[theme].track,
            opacity: 0,
            overflow: "hidden",
            zIndex: 2,
        },
        inActiveTrackInnerOverlay: {
            position: "absolute",
            top: inActiveTrackWidth - ringPadding,
            left: inActiveTrackWidth - ringPadding,
            width: innerActiveRingRadius * 2,
            height: innerActiveRingRadius * 2,
            borderRadius: innerActiveRingRadius,
            backgroundColor: inActiveTrackColor ?? COLORS[theme].inactiveTrack,
            overflow: "hidden",
            zIndex: 3,
        },
        innerRingMask: {
            position: "absolute",
            top: inActiveTrackWidth,
            left: inActiveTrackWidth,
            width: (radius - inActiveTrackWidth) * 2,
            height: (radius - inActiveTrackWidth) * 2,
            borderRadius: radius - inActiveTrackWidth,
            backgroundColor: backgroundColor ?? COLORS[theme].background,
            overflow: "hidden",
            zIndex: 4,
        },
    });
};
