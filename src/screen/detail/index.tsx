import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "~/types/route";

const styles = StyleSheet.create({
    review: {
        fontSize: 30
    },
    reviewText: {
        fontSize: 25,
        padding: 15
    }
});

export const DetailScreen: React.FC = () => {
    const route: RouteProp<RootStackParamList, "review-detail"> = useRoute();

    return (
        <View>
            <Text style={styles.reviewText}>Id: {route.params?.id}</Text>
            <Text style={styles.reviewText}>Title: {route.params?.title}</Text>
            <Text style={styles.reviewText}>Rating: {route.params?.star}</Text>
        </View>
    );
};
