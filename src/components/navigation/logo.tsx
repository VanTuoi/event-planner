import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

const Logo = memo(() => {
    const { colors, fonts } = useTheme();

    return (
        <Text
            style={[
                styles.title,
                {
                    color: colors.background,
                    fontSize: fonts.titleLarge.fontSize,
                    fontFamily: fonts.titleLarge.fontFamily
                }
            ]}
        >
            Event Planner
        </Text>
    );
});

export default Logo;

const styles = StyleSheet.create({
    title: {
        textTransform: "uppercase",
        flex: 1,
        textAlign: "center",
        fontSize: 20
    }
});
