import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { RootStackParamList } from "~/types/route";
import CreateModal from "./create.modal";

interface IReview {
    id: number;
    title: string;
    star: number;
}

export const HomeScreen = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { colors, fonts } = useTheme();

    const [reviews, setReviews] = useState<IReview[]>([
        { id: 1, title: "React Native", star: 5 },
        { id: 2, title: "React", star: 5 }
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const addNew = (item: { id: number; title: string; star: number }) => {
        setReviews([...reviews, item]);
    };

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.contentContainer}>
                <Text
                    style={[
                        styles.title,
                        { fontFamily: fonts.titleLarge.fontFamily, fontSize: fonts.headlineMedium.fontSize }
                    ]}
                >
                    Review list:
                </Text>
                <View style={styles.iconContainer}>
                    <AntDesign onPress={() => setModalVisible(true)} name="plussquareo" size={40} color="orange" />
                </View>
                <FlatList
                    data={reviews}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("review-detail", item)}>
                            <View style={[styles.reviewItem, { backgroundColor: colors.background }]}>
                                <Text>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
                    }
                />
            </View>
            <CreateModal modalVisible={modalVisible} setModalVisible={setModalVisible} addNew={addNew} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        flex: 1
    },
    title: {
        fontSize: 30,
        padding: 10
    },
    iconContainer: {
        alignItems: "center",
        marginBottom: 20
    },
    reviewItem: {
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 15
    }
});
