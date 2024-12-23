import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { memo, useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Snackbar, Text, useTheme } from "react-native-paper";
import * as Yup from "yup";
import loginImage from "~/assets/images/login.png";
import { InputPassword, InputText } from "~/components/inputs";
import { useLogin } from "~/hook/auth/login";
import { RootStackParamList } from "~/types/route";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password too short").required("Password is required")
});

export const LoginScreen: React.FC = memo(() => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { colors } = useTheme();

    const { handleLogin, isLoading, error } = useLogin();
    const [visibleSnackbar, setVisibleSnackbar] = useState(false);

    useEffect(() => {
        if (error) {
            setVisibleSnackbar(true);
        }
    }, [error]);

    return (
        <Formik
            initialValues={{ email: "test@example.com", password: "123456" }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
                await handleLogin(values.email, values.password);
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={[styles.container, { backgroundColor: colors.background }]}>
                    <View style={styles.mainContent}>
                        <Image source={loginImage} style={styles.image} />
                        <Text variant="headlineMedium" style={styles.title}>
                            Welcome back
                        </Text>

                        <InputText
                            label="EMAIL"
                            value={values.email}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            error={touched.email && errors.email}
                        />

                        <InputPassword
                            label="PASSWORD"
                            value={values.password}
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            error={touched.password && errors.password}
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
                            Sign in
                        </Button>
                        <Button
                            mode="outlined"
                            onPress={() => navigation.navigate("register")}
                            style={styles.button}
                            disabled={isLoading}
                        >
                            Create new account
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
        width: 151,
        height: 157,
        marginBottom: 24
    },
    button: {
        width: "100%",
        marginBottom: 8,
        borderRadius: 8
    }
});
