import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const AboutScreen: React.FC = () => (
    <View style={styles.container}>
        <Text style={styles.title}>About</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, marginBottom: 16 }
});
