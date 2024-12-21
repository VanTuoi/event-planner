import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Button, Modal, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface IProps {
    modalVisible: boolean;
    setModalVisible: (v: boolean) => void;
    addNew: (newReview: { id: number; title: string; star: number }) => void;
}

const CreateModal: React.FC<IProps> = ({ modalVisible, setModalVisible, addNew }) => {
    const [title, setTitle] = useState<string>("");
    const [star, setStar] = useState<number>(0);

    const randomInteger = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

    const handleSubmit = () => {
        if (!title) {
            Alert.alert("Invalid information", "Content cannot be empty");
            return;
        }

        if (!star) {
            Alert.alert("Invalid information", "Rating cannot be empty ");
            return;
        }

        addNew({
            id: randomInteger(2, 2000000),
            title,
            star
        });

        setModalVisible(false);
        setStar(0);
        setTitle("");
    };

    return (
        <Modal animationType="slide" transparent visible={modalVisible}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 25 }}>Create a review</Text>
                    <AntDesign
                        onPress={() => {
                            setModalVisible(false);
                            setTitle("");
                            setStar(0);
                        }}
                        name="close"
                        size={24}
                        color="black"
                    />
                </View>

                <View>
                    <View style={styles.groupInput}>
                        <Text style={styles.text}>Content</Text>
                        <TextInput value={title} style={styles.input} onChangeText={(v) => setTitle(v)} />
                    </View>
                    <View>
                        <Text style={styles.text}>Rating</Text>
                        <TextInput
                            keyboardType="numeric"
                            style={styles.input}
                            value={String(star)}
                            onChangeText={(v) => setStar(Number(v))}
                        />
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Button title="Add" onPress={handleSubmit} />
                </View>
            </View>
        </Modal>
    );
};

export default CreateModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingVertical: 10,
        marginBottom: 20
    },
    groupInput: {
        marginBottom: 15
    },
    text: {
        fontSize: 20,
        fontWeight: "400"
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        marginVertical: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    }
});
