import React, { useState } from "react";
import { NativeSyntheticEvent, StyleSheet, Text, TextInputFocusEventData, View } from "react-native";
import { TextInput } from "react-native-paper";

interface InputPasswordProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    error?: string | undefined | boolean;
}

export const InputPassword: React.FC<InputPasswordProps> = ({ label, value, onChangeText, onBlur, error }) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    return (
        <View style={styles.container}>
            <TextInput
                label={label}
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                secureTextEntry={secureTextEntry}
                right={
                    <TextInput.Icon
                        icon={secureTextEntry ? "eye" : "eye-off"}
                        onPress={() => setSecureTextEntry(!secureTextEntry)}
                    />
                }
                mode="outlined"
                style={styles.input}
                error={!!error}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: 16, width: "100%" },
    input: { width: "100%" },
    errorText: { color: "red", fontSize: 12, marginTop: 4 }
});
