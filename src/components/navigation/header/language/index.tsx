import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";
import { Menu, Text, useTheme } from "react-native-paper";
import England from "~/assets/images/en.png";
import France from "~/assets/images/fr.png";
import VietNam from "~/assets/images/vi.png";

const flags = [
    { component: VietNam, lang: "vi-VN", name: "Việt Nam" },
    { component: England, lang: "en-US", name: "English" },
    { component: France, lang: "fr-FR", name: "Français" }
];

const SelectLanguage = memo(() => {
    const { colors } = useTheme();
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;

    useEffect(() => {
        const loadLanguage = async () => {
            const savedLanguage = await AsyncStorage.getItem("language");
            if (savedLanguage) {
                i18n.changeLanguage(savedLanguage);
            }
        };
        loadLanguage();
    }, [i18n]);

    const changeLanguage = async (lang: string) => {
        await AsyncStorage.setItem("language", lang);
        i18n.changeLanguage(lang);
    };

    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    return (
        <View style={[styles.container]}>
            <View style={[styles.mainContent]}>
                <Text style={[styles.title, { color: colors.background }]}>{t("nav.changeLanguage")}</Text>
                <View style={[styles.buttonContainer, { backgroundColor: colors.background }]}>
                    <View style={[styles.containerImage]}>
                        <Image
                            source={flags.find((item) => item.lang === currentLanguage)?.component}
                            style={styles.flag}
                        />
                        <Text style={[styles.flagName, { color: colors.primary }]}>
                            {flags.find((item) => item.lang === currentLanguage)?.name || currentLanguage}
                        </Text>
                    </View>
                    <Menu
                        theme={{ colors: { primary: "green" } }}
                        style={[
                            styles.menuChangeLanguage,
                            { backgroundColor: colors.background, borderColor: colors.primary }
                        ]}
                        visible={visible}
                        mode="flat"
                        onDismiss={closeMenu}
                        anchor={
                            <MaterialIcons
                                name="keyboard-arrow-down"
                                size={28}
                                color={colors.primary}
                                onPress={openMenu}
                            />
                        }
                    >
                        {flags
                            .filter((item) => item.lang !== currentLanguage)
                            .map((item, index) => (
                                <Menu.Item
                                    key={item.lang}
                                    style={[
                                        styles.menuItem,
                                        index === 0 && styles.firstItem,
                                        index === flags.length - 2 && styles.lastItem,
                                        { backgroundColor: colors.background }
                                    ]}
                                    onPress={() => changeLanguage(item.lang)}
                                    title={
                                        <View style={[styles.containerImage]}>
                                            <Image source={item.component} style={styles.flag} />
                                            <Text style={[styles.flagName, { color: colors.primary }]}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    }
                                />
                            ))}
                    </Menu>
                </View>
            </View>
        </View>
    );
});

export default SelectLanguage;

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    mainContent: {
        width: "100%",
        paddingVertical: 12,
        justifyContent: "space-between",
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column"
    },
    title: {
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 10
    },
    buttonContainer: {
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    containerImage: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    flag: {
        height: 35,
        width: 35
    },
    flagName: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "600"
    },
    menuChangeLanguage: {
        marginTop: 90,
        borderWidth: 1,
        borderRadius: 8
    },
    menuItem: {
        paddingVertical: 20
    },
    firstItem: {
        marginTop: -8,
        paddingTop: 25,
        paddingBottom: 30,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8
    },
    lastItem: {
        marginBottom: -8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8
    }
});
