import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import SelectLanguage from "./language";
import Logout from "./logout";

export const AppHeader = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const heightAnim = useRef(new Animated.Value(60)).current;
    const { colors, fonts } = useTheme();

    const toggleHeader = () => {
        if (isExpanded) {
            Animated.timing(heightAnim, {
                toValue: 60,
                duration: 300,
                useNativeDriver: false
            }).start(() => setIsExpanded(false));
        } else {
            Animated.timing(heightAnim, {
                toValue: 200,
                duration: 300,
                useNativeDriver: false
            }).start(() => setIsExpanded(true));
        }
    };

    return (
        <Animated.View style={[styles.container, { height: heightAnim, backgroundColor: colors.primary }]}>
            <View style={styles.topRow}>
                <TouchableOpacity onPress={toggleHeader}>
                    <MaterialIcons name="menu" size={28} color={colors.background} />
                </TouchableOpacity>
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
            </View>
            {isExpanded === true ? (
                <View style={styles.hiddenContent}>
                    <Logout />
                    <SelectLanguage />
                </View>
            ) : null}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        overflow: "hidden"
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: 20
    },
    hiddenContent: {
        padding: 10
    },
    logoutButton: {
        fontSize: 16
    }
});
