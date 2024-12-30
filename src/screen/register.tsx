import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";
import { Button, Snackbar, Text, useTheme } from "react-native-paper";
import * as Yup from "yup";
import registerImage from "~/assets/images/register.png";
import { InputPassword, InputText } from "~/components/inputs";
import { useRegister } from "~/hook/auth";
import { RootStackParamList } from "~/types/route";

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password too short").required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Confirm Password is required")
});

export const RegisterScreen: React.FC = memo(() => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { handleRegister, isLoading, error } = useRegister();
    const [visibleSnackbar, setVisibleSnackbar] = useState(false);

    useEffect(() => {
        if (error) {
            setVisibleSnackbar(true);
        }
    }, [error]);

    return (
        <Formik
            initialValues={{ email: "test@example.com", password: "123456", confirmPassword: "123456", name: "Alan" }}
            validationSchema={RegisterSchema}
            onSubmit={async (values) => {
                const isSuccess = await handleRegister(values.email, values.password, values.name);
                if (isSuccess?.statusCode === 200) {
                    navigation.navigate("login");
                }
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={[styles.container, { backgroundColor: colors.background }]}>
                    <View style={styles.mainContent}>
                        <Image source={registerImage} style={styles.image} />
                        <Text variant="headlineMedium" style={styles.title}>
                            {t("register.title")}
                        </Text>

                        <InputText
                            label={t("register.name")}
                            value={values.name}
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}
                            error={touched.name && errors.name}
                        />

                        <InputText
                            label={t("register.email")}
                            value={values.email}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            error={touched.email && errors.email}
                        />

                        <InputPassword
                            label={t("register.pwd")}
                            value={values.password}
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            error={touched.password && errors.password}
                        />

                        <InputPassword
                            label={t("register.rePsw")}
                            value={values.confirmPassword}
                            onChangeText={handleChange("confirmPassword")}
                            onBlur={handleBlur("confirmPassword")}
                            error={touched.confirmPassword && errors.confirmPassword}
                        />
                    </View>

                    <View style={styles.footer}>
                        <Button
                            mode="contained"
                            onPress={() => handleSubmit()}
                            style={styles.button}
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            {t("register.register")}
                        </Button>
                        <Button
                            mode="outlined"
                            onPress={() => navigation.navigate("login")}
                            style={styles.button}
                            disabled={isLoading}
                        >
                            {t("register.login")}
                        </Button>
                    </View>

                    <Snackbar
                        visible={visibleSnackbar}
                        onDismiss={() => setVisibleSnackbar(false)}
                        duration={Snackbar.DURATION_SHORT}
                    >
                        {error}
                    </Snackbar>
                </View>
            )}
        </Formik>
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
        padding: 16
    },
    footer: {
        padding: 16,
        width: "100%"
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        fontWeight: "bold",
        color: "#101010",
        textTransform: "uppercase"
    },
    image: {
        width: 141,
        height: 188,
        marginBottom: 24
    },
    button: {
        width: "100%",
        marginBottom: 8,
        borderRadius: 8
    }
});
