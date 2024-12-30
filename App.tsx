/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable global-require */
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigation from "~/components/navigation/app.navigation";
import { initI18n } from "~/i18n";
import { AppTheme } from "~/theme/theme";

SplashScreen.preventAutoHideAsync();

const App = () => {
    const [fontsLoaded] = useFonts({
        "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Light": require("./src/assets/fonts/Roboto-Light.ttf"),
        "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf")
    });

    const [isI18nReady, setI18nReady] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            await initI18n();
            setI18nReady(true);
            SplashScreen.hideAsync();
        };
        initialize();
    }, []);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    if (!isI18nReady) {
        return null;
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <SafeAreaView style={{ flex: 1 }}>
                <PaperProvider theme={AppTheme}>
                    <NavigationContainer>
                        <GestureHandlerRootView>
                            <AppNavigation />
                        </GestureHandlerRootView>
                    </NavigationContainer>
                </PaperProvider>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default App;
