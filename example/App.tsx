import React, { useEffect, useRef } from "react";

import { View, StyleSheet, Button } from "react-native";
import { Easing } from "react-native-reanimated";

import { ProgressRing } from "../src";
import type { ProgressRingRef } from "../src";

const App = () => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            ref.current?.reset({ startInPausedState: false });
        }, 1500);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const size = 250;

    const ref = useRef<ProgressRingRef>(null);

    return (
        <View style={styles.container}>
            <ProgressRing
                ref={ref}
                // duration={1500}
                // easing={Easing.linear}
                duration={3000}
                easing={Easing.inOut(Easing.quad)}
                inActiveTrackWidth={size * 0.185}
                progress={120}
                size={size}
                startInPausedState
                trackColor={[
                    {
                        value: 0,
                        color: "#CA4046",
                    },
                    {
                        value: 50,
                        color: "#F79825",
                    },
                    {
                        value: 90,
                        color: "#F79825",
                    },
                    {
                        value: 100,
                        color: "#22C68D",
                    },
                ]}
                trackWidth={size * 0.12}
            />
            <View style={{ flexDirection: "row", marginTop: 40 }}>
                <Button
                    onPress={() => {
                        ref.current?.play();
                    }}
                    title="Play"
                />
                <Button
                    onPress={() => {
                        ref.current?.pause();
                    }}
                    title="Pause"
                />
                <Button
                    onPress={() => {
                        ref.current?.reset();
                    }}
                    title="Reset"
                />
                <Button
                    onPress={() => {
                        ref.current?.reset({ startInPausedState: true });
                    }}
                    title="Reset Paused"
                />
            </View>
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
