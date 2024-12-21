import React from "react";
import { NativeSyntheticEvent, StyleSheet, Text, TextInputFocusEventData, View } from "react-native";
import { TextInput } from "react-native-paper";

interface InputProps {
    label: string;
    value: string;
    backgroundColor?: string;
    onChangeText: (text: string) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    error?: string | boolean;
    keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}

export const InputText: React.FC<InputProps> = ({
    label,
    value,
    backgroundColor = "white",
    onChangeText,
    onBlur,
    error,
    keyboardType
}) => (
    <View style={styles.container}>
        <TextInput
            label={label}
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            mode="outlined"
            style={[styles.input, { backgroundColor }]}
            error={!!error}
            keyboardType={keyboardType}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
);

const styles = StyleSheet.create({
    container: { marginBottom: 16, width: "100%" },
    input: { width: "100%" },
    errorText: { color: "red", fontSize: 12, marginTop: 4 }
});
