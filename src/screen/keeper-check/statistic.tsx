import React, { memo, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import CustomProgressBar from "~/components/process-bar";
import { Event } from "~/types/event";

export const Statistic = memo(({ event }: { event: Event }) => {
    const { colors } = useTheme();

    const totalGuestsIn = useMemo(
        () => event.entries.reduce((total, entry) => total + entry.totalIn, 0),
        [event.entries]
    );

    const totalGuestsOut = useMemo(
        () => event.entries.reduce((total, entry) => total + entry.totalOut, 0),
        [event.entries]
    );

    const currentGuests = totalGuestsIn - totalGuestsOut;

    const totalOpenEntries = useMemo(
        () => event.entries.filter((entry) => entry.status === "open").length,
        [event.entries]
    );

    const totalCloseEntries = useMemo(
        () => event.entries.filter((entry) => entry.status === "close").length,
        [event.entries]
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.secondaryContainer }]}>
            <View style={[styles.mainContent]}>
                {event ? (
                    <>
                        <View style={[styles.process]}>
                            <Text style={[styles.processTitle]}>Current in</Text>
                            <Text style={[styles.processContain, { color: colors.primary }]}>
                                {currentGuests}/{event.maxParticipants}
                            </Text>
                        </View>
                        <CustomProgressBar progress={currentGuests / event.maxParticipants} color="#DDC523" />
                        <View style={[styles.body]}>
                            <View style={[styles.bodyItem]}>
                                <Text style={[styles.bodyItemTitle, { color: colors.primaryContainer }]}>Total in</Text>
                                <Text style={[styles.bodyItemContain, { color: colors.primary }]}>{totalGuestsIn}</Text>
                            </View>
                            <View style={[styles.bodyItem]}>
                                <Text style={[styles.bodyItemTitle, { color: colors.primaryContainer }]}>
                                    Total out
                                </Text>
                                <Text style={[styles.bodyItemContain, { color: colors.primary }]}>
                                    {totalGuestsOut}
                                </Text>
                            </View>
                            <View style={[styles.bodyItem]}>
                                <Text style={[styles.bodyItemTitle, { color: colors.primaryContainer }]}>
                                    opened entries
                                </Text>
                                <Text style={[styles.bodyItemContain, { color: colors.primary }]}>
                                    {totalOpenEntries}
                                </Text>
                            </View>
                            <View style={[styles.bodyItem]}>
                                <Text style={[styles.bodyItemTitle, { color: colors.primaryContainer }]}>
                                    close entries
                                </Text>
                                <Text style={[styles.bodyItemContain, { color: colors.primary }]}>
                                    {totalCloseEntries}
                                </Text>
                            </View>
                        </View>
                    </>
                ) : (
                    <Text>No event data available</Text>
                )}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        width: "100%"
    },
    mainContent: {
        padding: 8,
        height: 123,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 0
    },
    title: {
        width: "100%",
        fontSize: 30,
        paddingVertical: 20,
        paddingTop: 0,
        textTransform: "uppercase",
        textAlign: "left",
        fontWeight: "bold"
    },
    process: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    processTitle: {
        fontSize: 14,
        textTransform: "uppercase",
        fontWeight: 500
    },
    processContain: {
        fontSize: 14,
        fontWeight: "bold"
    },
    body: {
        marginTop: 8,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap"
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
    }
});
