import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { Button, useTheme } from "react-native-paper";
import {
    useChangeStatusEntryEvent,
    useDeleteEntryEvent,
    useDeleteKeeperEvent,
    useUpdateKeeperEvent
} from "~/hook/event-config";
import { Entry } from "~/types/event";
import { EntryModal } from "./entry.modal";

interface EntryComponentProps {
    eventId: string;
    entries: Entry;
    marginStyle?: ViewStyle;
}

export const EntryComponent = memo(({ eventId, entries, marginStyle }: EntryComponentProps) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const { error: errorUpdate, isLoading: isLoadingUpdate, handleUpdateKeeperEvent } = useUpdateKeeperEvent();
    const { error: errorDelete, isLoading: isLoadingDelete, handleDeleteKeeperEvent } = useDeleteKeeperEvent();
    const { error: errorDeleteEntry, isLoading: isLoadingDeleteEntry, handleDeleteEntryEvent } = useDeleteEntryEvent();
    const { isLoading: isLoadingChangeStatusEntry, handleChangeStatusEntryEvent } = useChangeStatusEntryEvent();

    const handleChangeStatus = async (status: "open" | "close") => {
        await handleChangeStatusEntryEvent(entries.id, status);
    };

    const handleDeleteEntry = async () => {
        await handleDeleteEntryEvent(entries.id);
    };

    const handleAddKeeper = async (id: string, email: string) => {
        await handleUpdateKeeperEvent(eventId, id, email);
    };

    const handleRemoveKeeper = async (keeperId: string) => {
        await handleDeleteKeeperEvent(keeperId, entries?.id);
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={[styles.container, { backgroundColor: colors.secondary }, marginStyle]}>
                    <View style={styles.mainContent}>
                        <Text style={[styles.title]}>{entries?.name}</Text>
                        <View style={[styles.body]}>
                            <View style={[styles.bodyItem]}>
                                <Text style={[styles.bodyItemTitle, { color: colors.primaryContainer }]}>
                                    {t("detail.totalIn")}
                                </Text>
                                <Text style={[styles.bodyItemContain, { color: colors.primary }]}>
                                    {entries.totalIn}
                                </Text>
                            </View>
                            <View style={[styles.bodyItem]}>
                                <Text style={[styles.bodyItemTitle, { color: colors.primaryContainer }]}>
                                    {t("detail.totalOut")}
                                </Text>
                                <Text style={[styles.bodyItemContain, { color: colors.primary }]}>
                                    {entries.totalOut}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.footer]}>
                            <Button
                                loading={isLoadingChangeStatusEntry}
                                disabled={isLoadingChangeStatusEntry}
                                style={[
                                    styles.button,
                                    { backgroundColor: entries?.status === "open" ? "#40AA71" : "#CE5454" }
                                ]}
                                labelStyle={[styles.button]}
                                uppercase
                                onPress={() => handleChangeStatus(entries?.status === "open" ? "close" : "open")}
                                mode="text"
                            >
                                {entries?.status === "open" ? t("detail.status.open") : t("detail.status.close")}
                            </Button>
                            <View
                                style={[
                                    styles.footerBox,
                                    { backgroundColor: entries?.status === "open" ? "#40AA71" : "#CE5454" }
                                ]}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <EntryModal
                error={errorUpdate || errorDelete || errorDeleteEntry}
                isLoadingUpdate={isLoadingUpdate}
                isLoadingDelete={isLoadingDelete}
                isLoadingDeleteEntry={isLoadingDeleteEntry}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                handleDeleteEntry={handleDeleteEntry}
                onAddKeeper={handleAddKeeper}
                onRemoveKeeper={handleRemoveKeeper}
                doorKeepers={entries.doorKeepers}
            />
        </>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 180,
        marginBottom: 15,
        borderRadius: 12
    },
    title: {
        fontSize: 18,
        width: "100%",
        textAlign: "center",
        paddingBottom: 0,
        fontWeight: "bold"
    },
    mainContent: {
        flex: 1,
        width: "100%",
        padding: 16,
        paddingBottom: 6,
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 10
    },
    body: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        gap: 10
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    },
    footerBox: {
        marginTop: 6,
        height: 5,
        width: 58,
        borderRadius: 50
    },
    button: {
        color: "#fff",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        height: 30,
        paddingVertical: 3,
        fontSize: 11
    }
});
