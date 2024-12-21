import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Event } from "~/types/event";

type RootStackParamList = {
    "event-detail": { event: Event };
};

export const DetailScreen = () => {
    const { colors } = useTheme();
    const route = useRoute<RouteProp<RootStackParamList, "event-detail">>();

    const event = route.params?.event;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.mainContent}>
                <Text style={styles.titleHaveEvent}>EVENT STATISTICS</Text>
                {event ? (
                    <>
                        <Text>Title: {event.titleEvent}</Text>
                        <Text>Venue: {event.venue}</Text>
                        <Text>Max Participants: {event.maxParticipants}</Text>
                    </>
                ) : (
                    <Text>No event data available</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    mainContent: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        padding: 16
    },
    title: { fontSize: 24, marginBottom: 16, width: "100%", textAlign: "left" },
    titleHaveEvent: {
        width: "100%",
        fontSize: 30,
        paddingVertical: 20,
        paddingTop: 0,
        textTransform: "uppercase",
        textAlign: "left",
        fontWeight: "bold"
    }
});
