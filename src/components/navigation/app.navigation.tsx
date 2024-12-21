import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AppLayout from "~/layout";
import { AboutScreen, DetailScreen, HomeScreen, LoginScreen, RegisterScreen } from "~/screen";
import { useAuthStore } from "~/store";
import { RootStackParamList } from "~/types/route";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={RegisterScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
);

const HomeLayout = () => (
    <AppLayout>
        <Stack.Navigator screenOptions={{ animation: "fade_from_bottom" }}>
            <Stack.Screen name="home" component={HomeScreen} options={{ title: "Home", headerShown: false }} />
            <Stack.Screen
                name="review-detail"
                component={DetailScreen}
                options={{ title: "Detail Review", headerShown: false }}
            />
            <Stack.Screen name="about" component={AboutScreen} options={{ title: "About", headerShown: false }} />
        </Stack.Navigator>
    </AppLayout>
);

const AppNavigation = () => {
    const { isLoggedIn } = useAuthStore();

    return (
        <Stack.Navigator screenOptions={{ animation: isLoggedIn ? "slide_from_right" : "slide_from_left" }}>
            {isLoggedIn ? (
                <Stack.Screen name="homeLayout" component={HomeLayout} options={{ headerShown: false }} />
            ) : (
                <Stack.Screen name="authStack" component={AuthStack} options={{ headerShown: false }} />
            )}
        </Stack.Navigator>
    );
};

export default AppNavigation;
