import { Formik } from "formik";
import React, { memo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
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

interface EventFormProps {
    initialValues?: EventCreate;
    onSubmit: (values: EventCreate) => void;
    onCancel?: () => void;
}

const EventForm: React.FC<EventFormProps> = ({
    initialValues = {
        titleEvent: "",
        venue: "",
        maxParticipants: "",
        alertPoint: "",
        numberOfEntries: ""
    },
    onSubmit,
    onCancel
}) => (
    <Formik initialValues={initialValues} validationSchema={EventSchema} onSubmit={onSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <ScrollView style={styles.formContainer}>
                <Text style={styles.title}>Create New Event</Text>
                <InputText
                    label="Event Title"
                    value={values.titleEvent}
                    onChangeText={handleChange("titleEvent")}
                    onBlur={handleBlur("titleEvent")}
                    error={touched.titleEvent && errors.titleEvent}
                />

                <InputText
                    label="Venue"
                    value={values.venue}
                    onChangeText={handleChange("venue")}
                    onBlur={handleBlur("venue")}
                    error={touched.venue && errors.venue}
                />

                <NumberInput
                    label="Max Participants"
                    value={values.maxParticipants}
                    onChangeText={handleChange("maxParticipants")}
                    onBlur={handleBlur("maxParticipants")}
                    error={touched.maxParticipants && errors.maxParticipants}
                />

                <NumberInput
                    label="Alert Point"
                    value={values.alertPoint}
                    onChangeText={handleChange("alertPoint")}
                    onBlur={handleBlur("alertPoint")}
                    error={touched.alertPoint && errors.alertPoint}
                />

                <NumberInput
                    label="Number of Entries"
                    value={values.numberOfEntries}
                    onChangeText={handleChange("numberOfEntries")}
                    onBlur={handleBlur("numberOfEntries")}
                    error={touched.numberOfEntries && errors.numberOfEntries}
                />

                <View style={styles.buttonsContainer}>
                    {onCancel && (
                        <Button mode="outlined" style={styles.button} onPress={onCancel}>
                            Cancel
                        </Button>
                    )}
                    <Button mode="contained" style={styles.button} onPress={() => handleSubmit()}>
                        Submit
                    </Button>
                </View>
            </ScrollView>
        )}
    </Formik>
);

export const MemoizedEventForm = memo(EventForm);

export { EventForm };

const styles = StyleSheet.create({
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
