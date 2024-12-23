import { useNavigation } from "@react-navigation/native";
import React, { JSX, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { AppHeader } from "~/components/navigation/header";
import { KeeperAppHeaderCheck } from "~/components/navigation/header/app.keeper.header-check";
import { KeeperAppHeaderDetailEvent } from "~/components/navigation/header/app.keeper.header-detail-event";

interface AppLayoutProps {
    children: React.ReactNode;
}

const KeeperAppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const theme = useTheme();
    const navigation = useNavigation();
    const [currentHeader, setCurrentHeader] = useState<JSX.Element | null>(<AppHeader />);

    useEffect(() => {
        const unsubscribe = navigation.addListener("state", () => {
            const state = navigation.getState();
            if (state) {
                const currentScreen = state.routes[state.index]?.name;

                switch (currentScreen) {
                    case "keeper-event-detail":
                        setCurrentHeader(<KeeperAppHeaderDetailEvent />);
                        break;
                    case "keeper-check":
                        setCurrentHeader(<KeeperAppHeaderCheck />);
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

export default KeeperAppLayout;
