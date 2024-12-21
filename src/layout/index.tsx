import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import AppHeader from "~/components/navigation/app.header";

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const theme = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
            <AppHeader />
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

export default AppLayout;
