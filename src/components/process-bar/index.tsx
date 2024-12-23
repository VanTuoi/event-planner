import React, { memo, useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface CustomProgressBarProps {
    progress: number;
    color: string;
    height?: number;
    duration?: number;
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = ({ progress, color, height = 10, duration = 500 }) => {
    const animatedProgress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedProgress, {
            toValue: progress,
            duration,
            useNativeDriver: false
        }).start();
    }, [progress, duration, animatedProgress]);

    const progressWidth = animatedProgress.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"]
    });

    return (
        <View style={styles.container}>
            <View style={[styles.backgroundBar, { height, borderRadius: height / 2 }]}>
                <Animated.View
                    style={[
                        styles.progressBar,
                        {
                            width: progressWidth,
                            backgroundColor: color,
                            borderRadius: height / 2
                        }
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 10
    },
    backgroundBar: {
        backgroundColor: "#e0e0e0",
        overflow: "hidden"
    },
    progressBar: {
        height: "100%"
    }
});

export default memo(CustomProgressBar);
