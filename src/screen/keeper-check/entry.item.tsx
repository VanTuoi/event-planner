import { MaterialIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { Entry } from "~/types/event";

interface EntryComponentProps {
    entries: Entry;
    marginStyle?: ViewStyle;
}

const OpenIcon = (title: string) => () => (
    <View style={[styles.iconContainer]}>
        <MaterialIcons name="lock-open" size={30} color="white" />
        <Text style={styles.iconText}>{title}</Text>
    </View>
);

const CloseIcon = (title: string) => () => (
    <View style={[styles.iconContainer]}>
        <MaterialIcons name="lock" size={30} color="white" />
        <Text style={styles.iconText}>{title}</Text>
    </View>
);

export const EntryComponent = memo(({ entries, marginStyle }: EntryComponentProps) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const handleChangeStatus = (status: string) => {
        console.log("status", status);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.secondary }, marginStyle]}>
            <View style={styles.mainContent}>
                <View style={[styles.body]}>
                    <View style={[styles.bodyItem]}>
                        <Text style={[styles.bodyItemTitle, { color: colors.primaryContainer }]}>
                            {t("keeperDetail.totalIn")}
                        </Text>
                        <Text style={[styles.bodyItemContain, { color: colors.primary }]}>{entries.totalIn}</Text>
                    </View>
                    <View style={[styles.bodyItem]}>
                        <Text style={[styles.bodyItemTitle, { color: colors.primaryContainer }]}>
                            {t("keeperDetail.totalOut")}
                        </Text>
                        <Text style={[styles.bodyItemContain, { color: colors.primary }]}>{entries.totalOut}</Text>
                    </View>
                </View>
                <View style={[styles.action]}>
                    <IconButton
                        icon={
                            entries?.status === "open"
                                ? OpenIcon(t("keeperDetail.status.open"))
                                : CloseIcon(t("keeperDetail.status.close"))
                        }
                        onPress={() => handleChangeStatus(entries?.status === "open" ? "closed" : "open")}
                        style={[
                            styles.IconButton,
                            { backgroundColor: entries?.status === "open" ? "#40AA71" : "#CE5454" }
                        ]}
                    />
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 123,
        marginBottom: 15,
        borderRadius: 12
    },
    mainContent: {
        width: "100%",
        padding: 16,
        paddingBottom: 6,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        gap: 10
    },
    body: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        gap: 10
    },
    bodyItem: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    },
    bodyItemTitle: {
        fontSize: 12,
        textTransform: "uppercase",
        fontWeight: "bold"
    },
    bodyItemContain: {
        fontSize: 18,
        fontWeight: "bold"
    },
    action: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    IconButton: {
        borderRadius: 10,
        height: 80,
        width: "100%"
    },
    iconContainer: {
        flexDirection: "column",
        alignItems: "center"
    },
    iconText: {
        color: "white",
        fontWeight: "bold"
    }
});
