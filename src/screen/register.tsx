import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { RootStackParamList } from "~/types/route";

export const RegisterScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng ký</Text>
            <Button icon="login" mode="contained" onPress={() => navigation.navigate("login")}>
                Login
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, marginBottom: 16 }
});
