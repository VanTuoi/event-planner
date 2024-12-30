import { Formik } from "formik";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Snackbar, useTheme } from "react-native-paper";
import * as Yup from "yup";
import { InputText, NumberInput } from "~/components/inputs";
import { useUpdateEvent } from "~/hook/home";
import { Event, EventCreate } from "~/types/event";

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

interface UpdateEventProps {
    initialValuesToProps: Event | undefined;
    onDownloadStatistics: () => void;
    onDelete: () => void;
}

const UpdateEvent: React.FC<UpdateEventProps> = ({ onDelete, onDownloadStatistics, initialValuesToProps }) => {
    const { colors } = useTheme();
    const { t } = useTranslation();
    const { handleUpdateEvent, isLoading, error } = useUpdateEvent();

    const [visibleSnackbar, setVisibleSnackbar] = useState(false);

    useEffect(() => {
        if (error) {
            setVisibleSnackbar(true);
        }
    }, [error]);

    const handleSubmit = async (values: EventCreate) => {
        if (initialValuesToProps) {
            await handleUpdateEvent(
                initialValuesToProps?.id,
                values.titleEvent,
                values.venue,
                values.maxParticipants,
                values.alertPoint,
                values.numberOfEntries
            );
        }
    };

    const [initialValues, setInitialValues] = useState<EventCreate>();

    useEffect(() => {
        if (initialValuesToProps) {
            setInitialValues({
                titleEvent: initialValuesToProps.titleEvent,
                venue: initialValuesToProps.venue,
                maxParticipants: String(initialValuesToProps.maxParticipants),
                alertPoint: String(initialValuesToProps.alertPoint),
                numberOfEntries: String(initialValuesToProps.entries.length)
            });
        }
    }, [initialValuesToProps]);

    return (
        <View style={[styles.container]}>
            <Formik
                initialValues={
                    initialValues || {
                        titleEvent: "",
                        venue: "",
                        maxParticipants: "",
                        alertPoint: "",
                        numberOfEntries: ""
                    }
                }
                enableReinitialize
                validationSchema={EventSchema}
                onSubmit={handleSubmit}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit: formikHandleSubmit,
                    values,
                    errors,
                    touched,
                    isValid,
                    isSubmitting,
                    dirty
                }) => (
                    <ScrollView style={styles.formContainer}>
                        <View style={styles.formFields}>
                            <InputText
                                backgroundColor={colors.secondaryContainer}
                                label={t("detail.setting.event.eventTitle")}
                                value={values.titleEvent}
                                onChangeText={handleChange("titleEvent")}
                                onBlur={handleBlur("titleEvent")}
                                error={touched.titleEvent && errors.titleEvent}
                            />

                            <InputText
                                backgroundColor={colors.secondaryContainer}
                                label={t("detail.setting.event.venue")}
                                value={values.venue}
                                onChangeText={handleChange("venue")}
                                onBlur={handleBlur("venue")}
                                error={touched.venue && errors.venue}
                            />

                            <NumberInput
                                backgroundColor={colors.secondaryContainer}
                                label={t("detail.setting.event.maxParticipants")}
                                value={values.maxParticipants}
                                onChangeText={handleChange("maxParticipants")}
                                onBlur={handleBlur("maxParticipants")}
                                error={touched.maxParticipants && errors.maxParticipants}
                            />

                            <NumberInput
                                backgroundColor={colors.secondaryContainer}
                                label={t("detail.setting.event.alertPoint")}
                                value={values.alertPoint}
                                onChangeText={handleChange("alertPoint")}
                                onBlur={handleBlur("alertPoint")}
                                error={touched.alertPoint && errors.alertPoint}
                            />

                            <NumberInput
                                backgroundColor={colors.secondaryContainer}
                                label={t("detail.setting.event.numberOfEntries")}
                                value={values.numberOfEntries}
                                onChangeText={handleChange("numberOfEntries")}
                                onBlur={handleBlur("numberOfEntries")}
                                error={touched.numberOfEntries && errors.numberOfEntries}
                            />
                        </View>

                        <View style={styles.buttonsContainer}>
                            <Button
                                disabled={!(isValid && dirty && !isSubmitting) || isLoading}
                                loading={isSubmitting || isLoading}
                                mode="contained"
                                labelStyle={[{ fontSize: 16 }]}
                                style={[styles.button]}
                                onPress={() => formikHandleSubmit()}
                            >
                                {t("detail.setting.event.saveChanges")}
                            </Button>
                            <Button
                                mode="outlined"
                                labelStyle={[{ color: colors.background, fontSize: 16 }]}
                                style={[
                                    styles.button,
                                    { backgroundColor: "#40AA71", borderColor: "#40AA71", borderWidth: 2 }
                                ]}
                                onPress={() => onDownloadStatistics()}
                            >
                                {t("detail.setting.event.download")}
                            </Button>
                            <Button
                                mode="outlined"
                                labelStyle={[{ color: colors.error, fontSize: 16 }]}
                                style={[styles.button, { borderColor: colors.error, borderWidth: 2 }]}
                                onPress={() => onDelete()}
                            >
                                {t("detail.setting.event.delete")}
                            </Button>
                        </View>
                    </ScrollView>
                )}
            </Formik>
            <Snackbar
                visible={visibleSnackbar}
                onDismiss={() => setVisibleSnackbar(false)}
                duration={Snackbar.DURATION_SHORT}
            >
                {error}
            </Snackbar>
        </View>
    );
};

export const MemoizedUpdateEvent = memo(UpdateEvent);

export { UpdateEvent };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 0
    },
    formContainer: {
        position: "relative",
        width: "100%",
        flex: 1,
        padding: 0
    },
    formFields: {
        flex: 1
    },
    buttonsContainer: {
        marginTop: 100,
        gap: 15,
        flexDirection: "column",
        justifyContent: "flex-end",
        width: "100%"
    },
    button: {
        width: "100%",
        paddingVertical: 4,
        borderRadius: 8
    }
});
