import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { Button, Dialog, Portal, useTheme } from "react-native-paper";
import { useDeleteEvent } from "~/hook/event-config";
import { useEventStore } from "~/store";
import { RootStackParamList } from "~/types/route";
import { UpdateEvent } from "./update";

export const EventSettingScreen = memo(() => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const { events } = useEventStore();
    const route = useRoute<RouteProp<RootStackParamList, "event-detail">>();
    const navigation: NavigationProp<RootStackParamList> = useNavigation();

    const [event, setEvent] = useState(route.params?.event);
    const [visible, setVisible] = useState(false);

    const { handleDeleteEvent, isLoading } = useDeleteEvent();

    useEffect(() => {
        if (route.params?.event) {
            setEvent(events.find((item) => item.id === route.params?.event.id));
        }
    }, [events, route]);

    const handleDelete = () => {
        setVisible(true);
    };

    const handleConfirmDelete = async () => {
        if (event?.id) {
            const status = await handleDeleteEvent(event.id);
            if (status.statusCode === 200) {
                setVisible(false);
                navigation.navigate("home");
            }
        }
    };

    const handleCancelDelete = () => {
        setVisible(false);
    };

    const handleDownloadStatistics = () => {};

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.mainContent}>
                <Text style={styles.title}>{t("detail.setting.title")}</Text>
                <UpdateEvent
                    initialValuesToProps={event}
                    onDelete={handleDelete}
                    onDownloadStatistics={handleDownloadStatistics}
                />
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={handleCancelDelete} style={styles.dialog}>
                    <Dialog.Title style={styles.dialogTitle}>{t("detail.setting.confirmEventDeletion")}</Dialog.Title>
                    <Dialog.Actions style={styles.dialogActions}>
                        <Button style={styles.button} mode="outlined" onPress={handleCancelDelete}>
                            {t("detail.setting.cancel")}
                        </Button>
                        <Button
                            mode="contained"
                            style={styles.button}
                            onPress={handleConfirmDelete}
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            {t("detail.setting.confirm")}
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
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
    title: {
        width: "100%",
        fontSize: 30,
        paddingVertical: 0,
        paddingTop: 0,
        textTransform: "uppercase",
        textAlign: "left",
        fontWeight: "bold"
    },
    dialog: {
        borderRadius: 16,
        backgroundColor: "white"
    },
    dialogTitle: {
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 20
    },
    dialogActions: {
        justifyContent: "center"
    },
    button: {
        borderRadius: 12,
        width: "50%"
    }
});
