import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import homeImage from "~/assets/images/home.png";
import { useEventKeeper } from "~/hook/home-keeper";
import { useSocket } from "~/hook/socket";
import { EventComponent } from "./event.item";

export const KeeperHomeScreen = memo(() => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const { events, isLoading, handleGetEventKeeper } = useEventKeeper();

    useSocket();

    const onRefresh = () => {
        handleGetEventKeeper();
    };

    const renderEmptyList = () => (
        <>
            <Image source={homeImage} style={styles.image} />
            <Text style={styles.title}>{isLoading ? t("homeKeeper.loading") : t("homeKeeper.noEvent")}</Text>
        </>
    );

    const renderList = () => (
        <>
            <Text style={styles.titleHaveEvent}>{t("homeKeeper.event")}</Text>
            <FlatList
                style={styles.list}
                showsVerticalScrollIndicator={false}
                data={events}
                keyExtractor={(item) => item.id.toString()}
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
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1
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
