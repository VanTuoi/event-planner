import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { memo } from "react";
import AppLayout from "~/layout/home-layout";
import KeeperAppLayout from "~/layout/keeper-layout";

import {
    AboutScreen,
    DetailScreen,
    EventSettingScreen,
    HomeScreen,
    KeeperCheckScreen,
    KeeperDetailScreen,
    KeeperHomeScreen,
    LoginScreen,
    RegisterScreen
} from "~/screen";
import { useAuthStore } from "~/store";
import { RootStackParamList } from "~/types/route";

const Stack = createNativeStackNavigator<RootStackParamList>();

const KeeperHomeScreenComponent = () => (
    <KeeperAppLayout>
        <KeeperHomeScreen />
    </KeeperAppLayout>
);

const KeeperDetailScreenComponent = () => (
    <KeeperAppLayout>
        <KeeperDetailScreen />
    </KeeperAppLayout>
);

const KeeperCheckScreenComponent = () => (
    <KeeperAppLayout>
        <KeeperCheckScreen />
    </KeeperAppLayout>
);

const HomeScreenComponent = () => (
    <AppLayout>
        <HomeScreen />
    </AppLayout>
);

const DetailScreenComponent = () => (
    <AppLayout>
        <DetailScreen />
    </AppLayout>
);

const SettingEventScreenComponent = () => (
    <AppLayout>
        <EventSettingScreen />
    </AppLayout>
);

const AboutScreenComponent = () => (
    <AppLayout>
        <AboutScreen />
    </AppLayout>
);

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={RegisterScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const HomeLayout = () => (
    <Stack.Navigator screenOptions={{ animation: "fade_from_bottom" }}>
        <Stack.Screen name="home" component={HomeScreenComponent} options={{ title: "Home", headerShown: false }} />
        <Stack.Screen
            name="event-detail"
            component={DetailScreenComponent}
            options={{ title: "Event Detail", headerShown: false }}
        />
        <Stack.Screen
            name="event-setting"
            component={SettingEventScreenComponent}
            options={{ title: "Event Detail", headerShown: false }}
        />
        <Stack.Screen name="about" component={AboutScreenComponent} options={{ title: "About", headerShown: false }} />
    </Stack.Navigator>
);

const KeeperLayout = () => (
    <Stack.Navigator screenOptions={{ animation: "fade_from_bottom" }}>
        <Stack.Screen
            name="home"
            component={KeeperHomeScreenComponent}
            options={{ title: "Keeper Home", headerShown: false }}
        />
        <Stack.Screen
            name="keeper-event-detail"
            component={KeeperDetailScreenComponent}
            options={{ title: "Event Detail", headerShown: false }}
        />
        <Stack.Screen
            name="keeper-check"
            component={KeeperCheckScreenComponent}
            options={{ title: "Check", headerShown: false }}
        />
        <Stack.Screen name="about" component={AboutScreenComponent} options={{ title: "About", headerShown: false }} />
    </Stack.Navigator>
);

const AppNavigation = memo(() => {
    const { user } = useAuthStore();

    const getStackScreen = () => {
        if (!user) {
            return <Stack.Screen name="authStack" component={AuthStack} options={{ headerShown: false }} />;
        }

        if (user.role === "admin") {
            return <Stack.Screen name="homeLayout" component={HomeLayout} options={{ headerShown: false }} />;
        }

        return <Stack.Screen name="keeperStack" component={KeeperLayout} options={{ headerShown: false }} />;
    };

    return (
        <Stack.Navigator
            screenOptions={{
                animation: user ? "slide_from_right" : "slide_from_left"
            }}
        >
            {getStackScreen()}
        </Stack.Navigator>
    );
});

export default AppNavigation;
