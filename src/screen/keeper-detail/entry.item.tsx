import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useAuthStore } from "~/store";
import { Entry, Event } from "~/types/event";
import { RootStackParamList } from "~/types/route";

interface EntryComponentProps {
    entries: Entry;
    event: Event | undefined;
    marginStyle?: ViewStyle;
}

export const EntryComponent = memo(({ entries, event, marginStyle }: EntryComponentProps) => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const { user } = useAuthStore();

    const [haveAuthority, setHaveAuthority] = useState<boolean>(false);

    useEffect(() => {
        const hasPermission = entries.doorKeepers?.some((item) => item.id === user?.id);
        setHaveAuthority(hasPermission ?? false);
    }, [entries, user]);

    const handlePress = () => {
        if (haveAuthority) {
            navigation.navigate("keeper-check", { event, entry: entries });
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={[styles.container, { backgroundColor: colors.secondary }, marginStyle]}>
                <View style={styles.mainContent}>
                    <Text style={[styles.title]}>{entries?.name}</Text>
                    <View style={[styles.body]}>
                        <View style={[styles.bodyItem]}>
                            <Text style={[styles.bodyItemTitle, { color: colors.primaryContainer }]}>
                                {t("keeperDetail.totalIn")}
                            </Text>
                            <Text style={[styles.bodyItemContain, { color: colors.primary }]}>{entries.totalIn}</Text>
                        </View>
                        <View style={[styles.bodyItem]}>
                            <Text style={[styles.bodyItemTitle, { color: colors.primaryContainer }]}>
                                {t("keeperDetail.totalOut")}
                            </Text>
                            <Text style={[styles.bodyItemContain, { color: colors.primary }]}>{entries.totalOut}</Text>
                        </View>
                    </View>
                    <View style={[styles.footer]}>
                        <Button
                            style={[
                                styles.button,
                                { backgroundColor: entries?.status === "open" ? "#40AA71" : "#CE5454" }
                            ]}
                            labelStyle={[styles.button]}
                            uppercase
                            disabled={!haveAuthority}
                            mode="text"
                        >
                            {entries?.status === "open"
                                ? t("keeperDetail.status.open")
                                : t("keeperDetail.status.close")}
                        </Button>
                        <View
                            style={[
                                styles.footerBox,
                                { backgroundColor: entries?.status === "open" ? "#40AA71" : "#CE5454" }
                            ]}
                        />
                    </View>
                </View>
                {!haveAuthority && (
                    <View style={styles.overlay}>
                        <Text style={styles.overlayText}>{t("keeperDetail.noAccess")}</Text>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 180,
        marginBottom: 15,
        borderRadius: 12,
        position: "relative",
        overflow: "hidden"
    },
    title: {
        fontSize: 18,
        width: "100%",
        textAlign: "center",
        paddingBottom: 0,
        fontWeight: "bold"
    },
    mainContent: {
        flex: 1,
        width: "100%",
        padding: 16,
        paddingBottom: 6,
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 10
    },
    body: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        gap: 10
    },
    bodyItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    },
    bodyItemTitle: {
        fontSize: 12,
        textTransform: "uppercase",
        fontWeight: "heavy"
    },
    bodyItemContain: {
        fontSize: 18,
        fontWeight: "bold"
    },
    footer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    },
    footerBox: {
        marginTop: 6,
        height: 5,
        width: 58,
        borderRadius: 50
    },
    button: {
        color: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 4,
        height: 30,
        width: 132,
        paddingVertical: 3,
        fontSize: 11
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1
    },
    overlayText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    }
});
