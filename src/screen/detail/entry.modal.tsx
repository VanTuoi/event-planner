import React, { memo, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, IconButton, Modal, Portal, Snackbar, TextInput, useTheme } from "react-native-paper";
import { DoorKeeper } from "~/types/event";
import { truncateText } from "~/utils";

interface EntryModalProps {
    error: string | null;
    visible: boolean;
    isLoadingUpdate: boolean;
    isLoadingDelete: boolean;
    isLoadingDeleteEntry: boolean;
    onClose: () => void;
    onAddKeeper: (id: string, email: string) => void;
    onRemoveKeeper: (keeperId: string) => void;
    handleDeleteEntry: () => void;
    doorKeepers: DoorKeeper[];
}

export const EntryModal = memo(
    ({
        error,
        visible,
        isLoadingUpdate,
        isLoadingDelete,
        isLoadingDeleteEntry,
        onClose,
        onAddKeeper,
        onRemoveKeeper,
        doorKeepers,
        handleDeleteEntry
    }: EntryModalProps) => {
        const { colors } = useTheme();
        const [visibleSnackbar, setVisibleSnackbar] = useState(false);
        const [keeperId, setKeeperId] = useState("");
        const [keeperEmail, setKeeperEmail] = useState("");

        const handleAddKeeper = () => {
            if (!keeperId.trim() && !keeperEmail.trim()) {
                return;
            }

            onAddKeeper(keeperId, keeperEmail);
            setKeeperId("");
            setKeeperEmail("");
        };

        useEffect(() => {
            if (error) {
                setVisibleSnackbar(true);
            }
        }, [error]);

        return (
            <Portal>
                <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Entry Config</Text>
                        <IconButton
                            icon="close"
                            size={24}
                            onPress={onClose}
                            style={styles.closeButton}
                            iconColor={colors.primary}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            mode="outlined"
                            style={styles.input}
                            placeholder="Door keeper’s id"
                            value={keeperId}
                            onChangeText={setKeeperId}
                        />
                        <TextInput
                            mode="outlined"
                            style={styles.input}
                            placeholder="Door keeper’s email"
                            value={keeperEmail}
                            onChangeText={setKeeperEmail}
                        />
                        <Button
                            loading={isLoadingUpdate}
                            disabled={isLoadingUpdate}
                            mode="contained"
                            style={styles.button}
                            labelStyle={[styles.buttonLabel]}
                            onPress={handleAddKeeper}
                        >
                            Add keeper
                        </Button>
                    </View>
                    <Text style={styles.subTitle}>Keeper(s)</Text>
                    {doorKeepers.map((keeper) => (
                        <View key={keeper.id} style={[styles.keeperRow, { borderColor: colors.primaryContainer }]}>
                            <View style={[styles.keeperRowTitle]}>
                                <Text style={[styles.keeperRowName, { color: colors.primaryContainer }]}>
                                    {truncateText(keeper.name, 20)} ({truncateText(keeper.id, 10)})
                                </Text>
                                <Text style={[styles.keeperRowEmail]}>{truncateText(keeper.email, 25)}</Text>
                            </View>
                            <IconButton
                                loading={isLoadingDelete}
                                disabled={isLoadingDelete}
                                icon="trash-can-outline"
                                onPress={() => onRemoveKeeper(keeper.id)}
                                style={[styles.iconButton, { marginLeft: 16 }]}
                                iconColor={colors.error}
                            />
                        </View>
                    ))}
                    {doorKeepers.length === 0 ? <Text style={styles.subTitleNoGateKeeper}> No keeper yet</Text> : null}
                    <Button
                        mode="outlined"
                        loading={isLoadingDeleteEntry}
                        disabled={isLoadingDeleteEntry}
                        style={[styles.buttonDelete, { borderColor: colors.error }]}
                        labelStyle={[styles.buttonDeleteLabel, { color: colors.error }]}
                        onPress={handleDeleteEntry}
                    >
                        Delete entry
                    </Button>
                </Modal>
                <Snackbar
                    visible={visibleSnackbar}
                    onDismiss={() => setVisibleSnackbar(false)}
                    duration={Snackbar.DURATION_SHORT}
                >
                    {error}
                </Snackbar>
            </Portal>
        );
    }
);

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "white",
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    title: {
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
        textAlign: "center",
        flex: 1
    },
    closeButton: {
        position: "absolute",
        top: -20,
        right: -20
    },
    inputContainer: {
        marginBottom: 20
    },
    input: {
        borderRadius: 8,
        padding: 0,
        marginBottom: 10
    },
    button: {
        borderRadius: 8,
        padding: 5
    },
    buttonLabel: {
        fontSize: 16
    },
    subTitle: {
        textTransform: "uppercase",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    subTitleNoGateKeeper: {
        width: "100%",
        textAlign: "center"
    },
    iconButton: {
        color: "red"
    },
    keeperRow: {
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 10,
        paddingVertical: 3,
        marginBottom: 10
    },
    keeperRowTitle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    keeperRowName: {
        fontSize: 14,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    keeperRowEmail: {
        fontSize: 16,
        fontWeight: "400"
    },
    buttonDelete: {
        borderWidth: 2,
        marginTop: 30,
        borderRadius: 8,
        padding: 5
    },
    buttonDeleteLabel: {
        fontSize: 16
    }
});
