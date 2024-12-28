import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { memo, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useCheckDecrement, useCheckIncrement } from "~/hook/home-keeper";
import { useAuthStore, useEventStore } from "~/store";
import { DoorKeeper, Entry } from "~/types/event";
import { RootStackParamList } from "~/types/route";
import { EntryComponent } from "./entry.item";
import { Statistic } from "./statistic";

export const KeeperCheckScreen = memo(() => {
    const { colors } = useTheme();
    const { user } = useAuthStore();
    const { events } = useEventStore();
    const route = useRoute<RouteProp<RootStackParamList, "keeper-check">>();
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const [event, setEvent] = useState(route.params?.event);
    const [entry, setEntry] = useState(route.params?.entry);

    const totalGuestsIn = useMemo(
        () => event?.entries.reduce((total: number, entryItem: Entry) => total + entryItem.totalIn, 0),
        [event?.entries]
    );

    const totalGuestsOut = useMemo(
        () => event?.entries.reduce((total: number, entryItem: Entry) => total + entryItem.totalOut, 0),
        [event?.entries]
    );

    const { handleIncrement, isLoading: isLoadingIncrement } = useCheckIncrement();
    const { handleDecrement, isLoading: isLoadingDecrement } = useCheckDecrement();

    useEffect(() => {
        const hasPermission = entry.doorKeepers?.some((item: DoorKeeper) => item.id === user?.id);
        if (!hasPermission) {
            navigation.navigate("keeper-home");
        }
    }, [entry, user, navigation]);

    useEffect(() => {
        if (route.params?.event) {
            setEvent(events.find((item) => item.id === route.params?.event.id));
        }
        if (route.params?.entry && event) {
            setEntry(event.entries.find((item: Entry) => item.id === route.params?.entry.id));
        }
    }, [events, event, route]);

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
                    onPress={() => handleDecrement(event.id, entry.id)}
                    disabled={totalGuestsIn <= totalGuestsOut}
                    loading={isLoadingDecrement}
                    mode="contained"
                    labelStyle={styles.buttonLabel}
                    style={[styles.button, { backgroundColor: totalGuestsIn > totalGuestsOut ? "#CE5454" : "gray" }]}
                >
                    -1
                </Button>
                <Button
                    disabled={entry.status === "close"}
                    onPress={() => handleIncrement(event.id, entry.id)}
                    loading={isLoadingIncrement}
                    mode="contained"
                    labelStyle={styles.buttonLabel}
                    style={[styles.button, { backgroundColor: entry.status === "open" ? colors.primary : "gray" }]}
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
