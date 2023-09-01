import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Button } from "react-native";

import { CircularProgress, CircularProgressRef } from "./src";

const App = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setProgress(80);
        }, 1500);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    const size = 120;

    const ref = useRef<CircularProgressRef>(null);

    return (
        <View style={styles.container}>
            <CircularProgress
                ref={ref}
                progress={80}
                size={size}
                trackWidth={size * 0.12}
                inActiveTrackWidth={size * 0.185}
                duration={3000}
                startInPausedState
                // startInPausedState={startInPausedState}
                // tintColorSecondary={
                //     progress < 100
                //         ? customColors.secondary["500"]
                //         : customColors.success["400"]
                // }
            />
            <View style={{ flexDirection: "row" }}>
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
