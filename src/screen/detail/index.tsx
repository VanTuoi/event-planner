import { RouteProp, useRoute } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useEventStore } from "~/store";
import { RootStackParamList } from "~/types/route";
import { EntryComponent } from "./entry.item";
import { Statistic } from "./statistic";

export const DetailScreen = memo(() => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const { events } = useEventStore();
    const route = useRoute<RouteProp<RootStackParamList, "event-detail">>();

    const [event, setEvent] = useState(route.params?.event);

    useEffect(() => {
        if (route.params?.event) {
            setEvent(events.find((item) => item.id === route.params?.event.id));
        }
    }, [events, route]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.mainContent}>
                <Text style={styles.titleHaveEvent}>{t("detail.eventStatistics")}</Text>
                {event ? <Statistic event={event} /> : <Text>{t("detail.noEventStatistics")}</Text>}
                <Text style={styles.titleHaveEvent}>{t("detail.entry")}</Text>
                {!event && <Text>{t("detail.noEntry")}</Text>}
                {event && (
                    <FlatList
                        contentContainerStyle={{ flexGrow: 1 }}
                        style={styles.list}
                        showsVerticalScrollIndicator={false}
                        data={event?.entries}
                        extraData={event}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => (
                            <EntryComponent
                                eventId={event?.id}
                                entries={item}
                                marginStyle={index % 2 === 0 ? { marginRight: 8 } : { marginLeft: 8 }}
                            />
                        )}
                        numColumns={2}
                    />
                )}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 12
    },
    mainContent: {
        flex: 1,
        width: "100%",
        padding: 16,
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 20
    },
    title: { fontSize: 24, marginBottom: 16, width: "100%", textAlign: "left" },
    titleHaveEvent: {
        width: "100%",
        fontSize: 30,
        paddingVertical: 0,
        paddingTop: 0,
        textTransform: "uppercase",
        textAlign: "left",
        fontWeight: "bold"
    },
    list: {
        width: "100%",
        flex: 1,
        gap: 18
    },
    entryContainer: {
        flex: 1,
        marginBottom: 15,
        marginRight: 15
    }
});
