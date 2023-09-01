import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { CircularProgress } from "./src";

const App = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setProgress(0);
        }, 500);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <View style={styles.container}>
            <CircularProgress
                radius={150}
                trackWidth={30}
                inActiveTrackWidth={40}
                duration={2000}
                progress={progress}
            />
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
