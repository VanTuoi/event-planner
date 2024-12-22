import React from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal } from "react-native-paper";
import { EventForm } from "~/components/form";
import { EventCreate } from "~/types/event";

interface CreateEventDialogProps {
    visible: boolean;
    onClose: (status: boolean) => void;
    onCreate: (event: EventCreate) => void;
}

export const CreateEventDialog: React.FC<CreateEventDialogProps> = ({ visible, onClose, onCreate }) => {
    const handleSubmit = (values: EventCreate) => {
        onCreate(values);
        onClose(false);
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={() => onClose(false)} style={styles.dialog}>
                <Dialog.Content>
                    <EventForm onSubmit={handleSubmit} onCancel={() => onClose(false)} />
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    dialog: {
        borderRadius: 22,
        height: 500
    }
});
