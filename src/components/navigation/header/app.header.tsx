import { MaterialIcons } from "@expo/vector-icons";
import React, { memo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useAuthStore } from "~/store";
import Logo from "../logo";
import SelectLanguage from "./language";
import Logout from "./logout";

const heightNavigation = 270;

export const AppHeader = memo(() => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const { user } = useAuthStore();

    const [isExpanded, setIsExpanded] = useState(false);
    const heightAnim = useRef(new Animated.Value(60)).current;

    const toggleHeader = () => {
        if (isExpanded) {
            Animated.timing(heightAnim, {
                toValue: 60,
                duration: 300,
                useNativeDriver: false
            }).start(() => setIsExpanded(false));
        } else {
            Animated.timing(heightAnim, {
                toValue: heightNavigation,
                duration: 300,
                useNativeDriver: false
            }).start(() => setIsExpanded(true));
        }
    };

    return (
        <Animated.View style={[styles.container, { height: heightAnim, backgroundColor: colors.primary }]}>
            <View style={styles.topRow}>
                <TouchableOpacity onPress={toggleHeader}>
                    <MaterialIcons name={isExpanded ? "close" : "menu"} size={28} color={colors.background} />
                </TouchableOpacity>
                <Logo />
            </View>
            {isExpanded === true ? (
                <View style={styles.hiddenContent}>
                    <Logout />
                    <SelectLanguage />
                    <Text style={[styles.welcome, { color: colors.background }]}>
                        {t("nav.welcome")} {user?.name}
                    </Text>
                </View>
            ) : null}
        </Animated.View>
    );
});

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
        textTransform: "uppercase",
        flex: 1,
        textAlign: "center",
        fontSize: 20
    },
    hiddenContent: {
        alignItems: "center",
        padding: 10,
        display: "flex",
        flexDirection: "column"
    },
    welcome: {
        width: "100%",
        textAlign: "right",
        fontSize: 14,
        fontWeight: "bold"
    }
});
