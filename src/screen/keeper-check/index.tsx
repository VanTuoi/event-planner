import { RouteProp, useRoute } from "@react-navigation/native";
import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { RootStackParamList } from "~/types/route";
import { EntryComponent } from "./entry.item";
import { Statistic } from "./statistic";

export const KeeperCheckScreen = memo(() => {
    const { colors } = useTheme();
    const route = useRoute<RouteProp<RootStackParamList, "keeper-check">>();

    const event = route.params?.event;
    const entry = route.params?.entry;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.mainContent}>
                <Text style={styles.titleHaveEvent}>EVENT STATISTICS</Text>
                {event ? <Statistic event={event} /> : <Text>No event data available</Text>}
                <Text style={styles.titleHaveEvent}>ENTRY STATISTICS</Text>
                {!event && <Text>No entries data available</Text>}
                <EntryComponent entries={entry} />
            </View>
            <View style={styles.action}>
                <Button
                    mode="contained"
                    labelStyle={styles.buttonLabel}
                    style={[styles.button, { backgroundColor: "#CE5454" }]}
                >
                    -1
                </Button>
                <Button
                    mode="contained"
                    labelStyle={styles.buttonLabel}
                    style={[styles.button, { backgroundColor: colors.primary }]}
                >
                    +1
                </Button>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 12,
        padding: 16
    },
    mainContent: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 20
    },
    titleHaveEvent: {
        width: "100%",
        fontSize: 30,
        paddingVertical: 0,
        paddingTop: 0,
        textTransform: "uppercase",
        textAlign: "left",
        fontWeight: "bold"
    },
    action: {
        marginBottom: 16,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10
    },
    button: {
        flex: 1,
        height: 100,
        paddingVertical: 25,
        borderRadius: 8
    },
    buttonLabel: {
        fontSize: 24,
        lineHeight: 24,
        fontWeight: "bold"
    }
});
