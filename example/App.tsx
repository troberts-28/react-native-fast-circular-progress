import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Button } from "react-native";

import { ProgressRing, ProgressRingRef } from "./src";
import { Easing } from "react-native-reanimated";

const App = () => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            ref.current?.reset({startInPausedState: false});
        }, 1500);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const size = 126;

    const ref = useRef<ProgressRingRef>(null);

    return (
        <View style={styles.container}>
            <ProgressRing
                ref={ref}
                progress={80}
                size={size}
                trackWidth={size * 0.12}
                inActiveTrackWidth={size * 0.185}
                duration={1500}
                easing={Easing.linear}
                startInPausedState
            />
            <View style={{ flexDirection: "row", marginTop: 40 }}>
                <Button
                    title="Play"
                    onPress={() => {
                        ref.current?.play();
                    }}
                />
                <Button
                    title="Pause"
                    onPress={() => {
                        ref.current?.pause();
                    }}
                />
                <Button
                    title="Reset"
                    onPress={() => {
                        ref.current?.reset();
                    }}
                />
                <Button
                    title="Reset Paused"
                    onPress={() => {
                        ref.current?.reset({ startInPausedState: true });
                    }}
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
