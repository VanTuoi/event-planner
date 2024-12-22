import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Dialog, Portal, useTheme } from "react-native-paper";
import { EventCreate } from "~/types/event";
import { RootStackParamList } from "~/types/route";
import { UpdateEvent } from "./update";

export const EventSettingScreen = () => {
    const { colors } = useTheme();
    const route = useRoute<RouteProp<RootStackParamList, "event-detail">>();

    const [event, setEvent] = useState(route.params?.event);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (route.params?.event) {
            setEvent(route.params.event);
        }
    }, [route.params?.event]);

    const handleUpdate = (newEvent: EventCreate) => {
        console.log("newEvent", newEvent);
    };

    const handleDelete = () => {
        setVisible(true);
    };

    const handleConfirmDelete = () => {
        console.log("Event deleted");
        setVisible(false);
    };

    const handleCancelDelete = () => {
        setVisible(false);
    };

    const handleDownloadStatistics = () => {};

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.mainContent}>
                <Text style={styles.title}>EVENT SETTINGS</Text>
                <UpdateEvent
                    initialValuesToProps={event}
                    onSave={() => handleUpdate}
                    onDelete={handleDelete}
                    onDownloadStatistics={handleDownloadStatistics}
                />
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={handleCancelDelete} style={styles.dialog}>
                    <Dialog.Title style={styles.dialogTitle}>Confirm event deletion</Dialog.Title>
                    <Dialog.Actions style={styles.dialogActions}>
                        <Button style={styles.button} mode="outlined" onPress={handleCancelDelete}>
                            Cancel
                        </Button>
                        <Button mode="contained" style={styles.button} onPress={handleConfirmDelete}>
                            Confirm
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

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
