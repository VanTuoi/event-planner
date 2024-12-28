import React, { memo, useState } from "react";
import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import homeImage from "~/assets/images/home.png";
import { useEvent } from "~/hook/home/event";
import { useSocket } from "~/hook/socket";
import { useEventStore } from "~/store";
import { CreateEvent } from "./create";
import { EventComponent } from "./event.item";

export const HomeScreen = memo(() => {
    const { colors } = useTheme();
    const { isLoading, handleGetEvent } = useEvent();
    const { events } = useEventStore();
    const [modalVisible, setModalVisible] = useState(false);

    useSocket();

    const onRefresh = () => {
        handleGetEvent();
    };

    const renderEmptyList = () => (
        <ScrollView
            contentContainerStyle={styles.emptyContainer}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} colors={[colors.primary]} />}
        >
            <Image source={homeImage} style={styles.image} />
            <Text style={styles.title}>{isLoading ? "Loading..." : "No events yet"}</Text>
        </ScrollView>
    );

    const renderList = () => (
        <>
            <Text style={styles.titleHaveEvent}>Events</Text>
            <FlatList
                style={styles.list}
                showsVerticalScrollIndicator={false}
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <EventComponent event={item} />}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} colors={[colors.primary]} />
                }
            />
        </>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.mainContent}>{events && events.length === 0 ? renderEmptyList() : renderList()}</View>
            <View style={styles.footer}>
                <Button mode="contained" style={styles.button} onPress={() => setModalVisible(true)}>
                    Create new event
                </Button>
            </View>
            <CreateEvent modalVisible={modalVisible} setModalVisible={(status) => setModalVisible(status)} />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    emptyContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    mainContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 16
    },
    list: {
        width: "100%",
        gap: 18
    },
    footer: {
        padding: 16,
        width: "100%"
    },
    button: {
        width: "100%",
        justifyContent: "center",
        paddingVertical: 4,
        marginBottom: 8,
        borderRadius: 12
    },
    title: {
        fontSize: 20,
        textTransform: "uppercase",
        paddingTop: 0,
        fontWeight: "bold",
        color: "#C4C4C4"
    },
    titleHaveEvent: {
        width: "100%",
        fontSize: 30,
        paddingVertical: 20,
        paddingTop: 0,
        textTransform: "uppercase",
        textAlign: "left",
        fontWeight: "bold"
    },
    image: {
        width: 239,
        height: 118,
        marginBottom: 24
    }
});
