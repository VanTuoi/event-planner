import { Formik } from "formik";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Dialog, Portal, useTheme } from "react-native-paper";
import * as Yup from "yup";
import { InputText, NumberInput } from "~/components/inputs";
import { EventCreate } from "~/types/event";

const EventSchema = Yup.object().shape({
    titleEvent: Yup.string().required("Event title is required"),
    venue: Yup.string().required("Venue is required"),
    maxParticipants: Yup.number()
        .min(1, "Max participants must be greater than 0")
        .required("Max participants is required"),
    alertPoint: Yup.number()
        .min(1, "Alert point must be greater than 0")
        .max(Yup.ref("maxParticipants"), "Alert point cannot be greater than max participants")
        .required("Alert point is required"),
    numberOfEntries: Yup.number()
        .min(1, "Number of entries must be greater than 0")
        .required("Number of entries is required")
});

interface CreateEventProps {
    modalVisible: boolean;
    setModalVisible: (status: boolean) => void;
    onCreateEvent: (event: EventCreate) => void;
}

export const CreateEvent: React.FC<CreateEventProps> = ({ modalVisible, setModalVisible, onCreateEvent }) => {
    const { colors } = useTheme();

    const handleSubmit = (values: EventCreate) => {
        onCreateEvent(values);
        setModalVisible(false);
    };

    return (
        <Portal>
            <Dialog
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                style={[styles.dialog, { backgroundColor: colors.background }]}
            >
                <Dialog.Content style={[styles.dialogContent]}>
                    <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
                        <Formik
                            initialValues={{
                                titleEvent: "",
                                venue: "",
                                maxParticipants: "",
                                alertPoint: "",
                                numberOfEntries: ""
                            }}
                            validationSchema={EventSchema}
                            onSubmit={handleSubmit}
                        >
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit: formikHandleSubmit,
                                values,
                                errors,
                                touched
                            }) => (
                                <ScrollView style={styles.formContainer}>
                                    <Text style={styles.title}>Create New Event</Text>
                                    <InputText
                                        backgroundColor={colors.secondaryContainer}
                                        label="Event Title"
                                        value={values.titleEvent}
                                        onChangeText={handleChange("titleEvent")}
                                        onBlur={handleBlur("titleEvent")}
                                        error={touched.titleEvent && errors.titleEvent}
                                    />

                                    <InputText
                                        backgroundColor={colors.secondaryContainer}
                                        label="Venue"
                                        value={values.venue}
                                        onChangeText={handleChange("venue")}
                                        onBlur={handleBlur("venue")}
                                        error={touched.venue && errors.venue}
                                    />

                                    <NumberInput
                                        backgroundColor={colors.secondaryContainer}
                                        label="Max Participants"
                                        value={values.maxParticipants}
                                        onChangeText={handleChange("maxParticipants")}
                                        onBlur={handleBlur("maxParticipants")}
                                        error={touched.maxParticipants && errors.maxParticipants}
                                    />

                                    <NumberInput
                                        backgroundColor={colors.secondaryContainer}
                                        label="Alert Point"
                                        value={values.alertPoint}
                                        onChangeText={handleChange("alertPoint")}
                                        onBlur={handleBlur("alertPoint")}
                                        error={touched.alertPoint && errors.alertPoint}
                                    />

                                    <NumberInput
                                        backgroundColor={colors.secondaryContainer}
                                        label="Number of Entries"
                                        value={values.numberOfEntries}
                                        onChangeText={handleChange("numberOfEntries")}
                                        onBlur={handleBlur("numberOfEntries")}
                                        error={touched.numberOfEntries && errors.numberOfEntries}
                                    />

                                    <View style={styles.buttonsContainer}>
                                        <Button
                                            mode="outlined"
                                            style={styles.button}
                                            onPress={() => setModalVisible(false)}
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            mode="contained"
                                            style={styles.button}
                                            onPress={() => formikHandleSubmit()}
                                        >
                                            Create
                                        </Button>
                                    </View>
                                </ScrollView>
                            )}
                        </Formik>
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    dialog: {
        borderRadius: 22
    },
    dialogContent: {
        height: 500
    },
    modalContainer: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 0
    },
    formContainer: {
        width: "100%",
        padding: 0
    },
    title: {
        fontSize: 20,
        textTransform: "uppercase",
        fontWeight: "bold",
        paddingTop: 8,
        paddingBottom: 20,
        textAlign: "center"
    },
    buttonsContainer: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        width: "48%",
        borderRadius: 8
    }
});
