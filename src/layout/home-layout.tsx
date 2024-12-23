import { useNavigation } from "@react-navigation/native";
import React, { JSX, memo, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { AppHeader, AppHeaderDetailEvent, AppHeaderSetting } from "~/components/navigation/header";

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const theme = useTheme();
    const navigation = useNavigation();
    const [currentHeader, setCurrentHeader] = useState<JSX.Element | null>(<AppHeader />);

    useEffect(() => {
        const unsubscribe = navigation.addListener("state", () => {
            const state = navigation.getState();
            if (state) {
                const currentScreen = state.routes[state.index]?.name;

                switch (currentScreen) {
                    case "event-detail":
                        setCurrentHeader(<AppHeaderDetailEvent />);
                        break;
                    case "event-setting":
                        setCurrentHeader(<AppHeaderSetting />);
                        break;
                    default:
                        setCurrentHeader(<AppHeader />);
                        break;
                }
            }
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            {currentHeader}
            <View style={[styles.contentContainer, { backgroundColor: theme.colors.background }]}>{children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
        marginTop: 0,
        overflow: "hidden",
        paddingTop: 15
    }
});

export default memo(AppLayout);
