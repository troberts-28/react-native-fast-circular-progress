import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { CircularProgress } from "./src";

const App = () => {
    const [progress, setProgress] = useState(0);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setProgress((prev) => {
    //             if (prev >= 1) {
    //                 clearInterval(interval);
    //                 return 1;
    //             }
    //             return prev + 0.01;
    //         });
    //     }, 50);
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);

    return (
        <View style={styles.container}>
            <CircularProgress
                radius={50}
                strokeWidth={10}
                duration={5000}
                progress={1}
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
