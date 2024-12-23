import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { Event } from "~/types/event";
import { RootStackParamList } from "~/types/route";

export const EventComponent = ({ event }: { event: Event }) => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { colors } = useTheme();

    const totalGuests = event.entries.reduce((total, entry) => total + entry.totalIn, 0);

    return (
        <View style={[styles.container, { backgroundColor: colors.secondary }]}>
            <View style={styles.mainContent}>
                <Text style={[styles.title]}>{event.titleEvent}</Text>
                <View style={[styles.body]}>
                    <View style={[styles.bodyItem]}>
                        <Text style={[styles.bodyItemTitle, { color: colors.primaryContainer }]}>entries</Text>
                        <Text style={[styles.bodyItemContain, { color: colors.primary }]}>{event?.entries.length}</Text>
                    </View>
                    <View style={[styles.bodyItem]}>
                        <Text style={[styles.bodyItemTitle, { color: colors.primaryContainer }]}>Max participants</Text>
                        <Text style={[styles.bodyItemContain, { color: colors.primary }]}>
                            {event?.maxParticipants}
                        </Text>
                    </View>
                    <View style={[styles.bodyItem]}>
                        <Text style={[styles.bodyItemTitle, { color: colors.primaryContainer }]}>
                            Total participants
                        </Text>
                        <Text style={[styles.bodyItemContain, { color: colors.primary }]}>{totalGuests}</Text>
                    </View>
                </View>
                <View style={[styles.footer]}>
                    <View style={[styles.footerEntry]}>
                        {event.entries.slice(0, 4).map((entry, index) => (
                            <View
                                key={entry.id}
                                style={[
                                    styles.footerEntryItem,
                                    {
                                        backgroundColor: colors.primary,
                                        borderColor: colors.background,
                                        marginLeft: index > 0 ? -12 : 0
                                    }
                                ]}
                            >
                                {index === 3 && event.entries.length > 4 ? (
                                    <Text style={styles.footerEntryItemText}>+{event.entries.length - 4}</Text>
                                ) : (
                                    <Text style={styles.footerEntryItemText} />
                                )}
                            </View>
                        ))}
                    </View>

                    <Button
                        style={[styles.button]}
                        labelStyle={[styles.button]}
                        uppercase
                        mode="outlined"
                        onPress={() => navigation.navigate("keeper-event-detail", { event })}
                    >
                        see more
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 15,
        borderRadius: 12
    },
    mainContent: {
        flex: 1,
        height: 174,
        width: "100%",
        padding: 16,
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 20
    },
    title: {
        fontSize: 18,
        width: "100%",
        textAlign: "left",
        paddingBottom: 0,
        fontWeight: "bold"
    },
    body: {
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
    },
    footer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    footerEntry: {
        width: "auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    footerEntryItem: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 50,
        borderWidth: 2,
        marginLeft: 0,
        position: "relative"
    },
    footerEntryItemText: {
        position: "absolute",
        top: 5,
        left: 7,
        color: "#fff",
        textAlign: "center"
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 4,
        fontSize: 11
    },
    buttonLabel: {
        fontSize: 12
    }
});
