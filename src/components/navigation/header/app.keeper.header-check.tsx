import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { RootStackParamList } from "~/types/route";

export const KeeperAppHeaderCheck = () => {
    const { colors, fonts } = useTheme();
    const navigation = useNavigation();

    const route = useRoute<RouteProp<RootStackParamList, "keeper-check">>();

    const [entry, setEntry] = useState(route.params?.entry);

    useEffect(() => {
        if (route.params?.entry) {
            setEntry(route.params.entry);
        }
    }, [route.params?.entry]);

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.primary }]}>
            <View style={styles.topRow}>
                <View style={styles.placeholder} />
                <Text
                    style={[
                        styles.title,
                        {
                            color: colors.background,
                            fontSize: fonts.titleLarge.fontSize,
                            fontFamily: fonts.titleLarge.fontFamily
                        }
                    ]}
                >
                    {entry?.name ?? "Entry"}
                </Text>
                <TouchableOpacity onPress={handleBackPress}>
                    <MaterialIcons name="close" size={28} color={colors.background} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    placeholder: {
        width: 28
    },
    title: {
        flex: 1,
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: 20
    }
});
