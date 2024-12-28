import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useEventStore } from "~/store";
import { RootStackParamList } from "~/types/route";

export const KeeperAppHeaderDetailEvent = memo(() => {
    const { colors, fonts } = useTheme();
    const { events } = useEventStore();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, "event-detail">>();

    const [event, setEvent] = useState(route.params?.event);

    useEffect(() => {
        if (route.params?.event) {
            setEvent(events.find((item) => item.id === route.params?.event.id));
        }
    }, [events, route]);

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.primary }]}>
            <View style={styles.topRow}>
                <TouchableOpacity onPress={handleBackPress}>
                    <MaterialIcons name="arrow-back" size={28} color={colors.background} />
                </TouchableOpacity>
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
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: 20
    }
});
