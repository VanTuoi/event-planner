import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { Entry } from "~/types/event";

interface EntryComponentProps {
    entries: Entry;
    marginStyle?: ViewStyle;
}

export const EntryComponent = ({ entries, marginStyle }: EntryComponentProps) => {
    const { colors } = useTheme();

    const handleChangeStatus = (entrieId: string, status: string) => {
        console.log("entrieId", entrieId);
        console.log("status", status);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.secondary }, marginStyle]}>
            <View style={styles.mainContent}>
                <Text style={[styles.title]}>{entries?.name}</Text>
                <View style={[styles.body]}>
                    <View style={[styles.bodyItem]}>
                        <Text style={[styles.bodyItemTitle, { color: colors.primaryContainer }]}>total in</Text>
                        <Text style={[styles.bodyItemContain, { color: colors.primary }]}>{entries.totalIn}</Text>
                    </View>
                    <View style={[styles.bodyItem]}>
                        <Text style={[styles.bodyItemTitle, { color: colors.primaryContainer }]}>total out</Text>
                        <Text style={[styles.bodyItemContain, { color: colors.primary }]}>{entries.totalOut}</Text>
                    </View>
                </View>
                <View style={[styles.footer]}>
                    <Button
                        style={[styles.button, { backgroundColor: entries?.status === "open" ? "#40AA71" : "#CE5454" }]}
                        labelStyle={[styles.button]}
                        uppercase
                        onPress={() => handleChangeStatus(entries.id, entries?.status === "open" ? "closed" : "open")}
                        mode="text"
                    >
                        {entries?.status === "open" ? "Opened" : "Closed"}
                    </Button>
                    <View
                        style={[
                            styles.footerBox,
                            { backgroundColor: entries?.status === "open" ? "#40AA71" : "#CE5454" }
                        ]}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 180,
        marginBottom: 15,
        borderRadius: 12
    },
    title: {
        fontSize: 18,
        width: "100%",
        textAlign: "center",
        paddingBottom: 0,
        fontWeight: "bold"
    },
    mainContent: {
        flex: 1,
        width: "100%",
        padding: 16,
        paddingBottom: 6,
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 10
    },
    body: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        gap: 10
    },
    bodyItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    },
    bodyItemTitle: {
        fontSize: 12,
        textTransform: "uppercase",
        fontWeight: "heavy"
    },
    bodyItemContain: {
        fontSize: 18,
        fontWeight: "bold"
    },
    footer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    },
    footerBox: {
        marginTop: 6,
        height: 5,
        width: 58,
        borderRadius: 50
    },
    button: {
        color: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 4,
        height: 30,
        width: 132,
        paddingVertical: 3,
        fontSize: 11
    }
});
