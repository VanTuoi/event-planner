import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { RootStackParamList } from "~/types/route";

export const AppHeaderSetting = memo(() => {
    const { colors, fonts } = useTheme();
    const navigation = useNavigation();

    const route = useRoute<RouteProp<RootStackParamList, "event-detail">>();

    const [event, setEvent] = useState(route.params?.event);

    useEffect(() => {
        if (route.params?.event) {
            setEvent(route.params.event);
        }
    }, [route.params?.event]);

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
                    {event?.titleEvent ?? "Event Planner"}
                </Text>
                <TouchableOpacity onPress={handleBackPress}>
                    <MaterialIcons name="close" size={28} color={colors.background} />
                </TouchableOpacity>
            </View>
        </View>
    );
});

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
        textAlign: "center",
        fontSize: 20
    }
});
