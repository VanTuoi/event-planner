import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { NativeSyntheticEvent, StyleSheet, Text, TextInputFocusEventData, View } from "react-native";
import { IconButton, TextInput, useTheme } from "react-native-paper";

interface InputProps {
    label: string;
    value: string;
    backgroundColor?: string;
    onChangeText: (text: string) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    error?: string | boolean;
}

const AddIcon = () => <MaterialIcons name="add" size={24} color="white" />;
const RemoveIcon = () => <MaterialIcons name="remove" size={24} color="white" />;

export const NumberInput: React.FC<InputProps> = ({
    label,
    value,
    backgroundColor = "white",
    onChangeText,
    onBlur,
    error
}) => {
    const { colors } = useTheme();

    const handleIncrement = () => {
        const currentValue = parseInt(value, 10) || 0;
        onChangeText(String(currentValue + 1));
    };

    const handleDecrement = () => {
        const currentValue = parseInt(value, 10) || 0;
        if (currentValue > 1) {
            onChangeText(String(currentValue - 1));
        } else {
            onChangeText(String(1));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    label={label}
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    mode="outlined"
                    style={[styles.input, { backgroundColor }]}
                    error={!!error}
                    keyboardType="numeric"
                />
                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
            <View style={styles.buttonContainer}>
                <IconButton
                    icon={RemoveIcon}
                    style={[styles.button, { backgroundColor: colors.primary }]}
                    onPress={handleDecrement}
                />
                <IconButton
                    icon={AddIcon}
                    style={[styles.button, { backgroundColor: colors.primary }]}
                    onPress={handleIncrement}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        marginBottom: 4,
        width: "100%"
    },
    inputContainer: {
        flex: 1,
        marginRight: 5
    },
    input: {
        width: "100%"
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 4
    },
    buttonContainer: {
        flexDirection: "row"
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 0
    }
});
