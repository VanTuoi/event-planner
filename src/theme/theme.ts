import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const AppTheme = {
    ...DefaultTheme,
    roundness: 8,
    colors: {
        ...DefaultTheme.colors,
        primary: "#274D76",
        primaryContainer: "#4B4B4B",
        secondary: "#E9EDF1",
        secondaryContainer: "#EAEEF2",
        accent: "#03dac4",
        body: "#101010",
        background: "#ffffff",
        surface: "#f6f6f6",
        onSurface: "#101010",
        placeholder: "#6b6b6b",
        success: "#4caf50",
        error: "#f44336"
    },
    fonts: {
        ...DefaultTheme.fonts,
        displayLarge: {
            fontFamily: "Roboto-Bold",
            fontWeight: "700" as const,
            fontSize: 57,
            lineHeight: 64,
            letterSpacing: -0.25
        },
        displayMedium: {
            fontFamily: "Roboto-Bold",
            fontWeight: "700" as const,
            fontSize: 45,
            lineHeight: 52,
            letterSpacing: 0
        },
        displaySmall: {
            fontFamily: "Roboto-Bold",
            fontWeight: "700" as const,
            fontSize: 36,
            lineHeight: 44,
            letterSpacing: 0
        },
        headlineLarge: {
            fontFamily: "Roboto-Regular",
            fontWeight: "400" as const,
            fontSize: 32,
            lineHeight: 40,
            letterSpacing: 0
        },
        headlineMedium: {
            fontFamily: "Roboto-Regular",
            fontWeight: "400" as const,
            fontSize: 28,
            lineHeight: 36,
            letterSpacing: 0
        },
        headlineSmall: {
            fontFamily: "Roboto-Regular",
            fontWeight: "400" as const,
            fontSize: 24,
            lineHeight: 32,
            letterSpacing: 0
        },
        titleLarge: {
            fontFamily: "Roboto-Medium",
            fontWeight: "500" as const,
            fontSize: 22,
            lineHeight: 28,
            letterSpacing: 0
        },
        titleMedium: {
            fontFamily: "Roboto-Medium",
            fontWeight: "500" as const,
            fontSize: 16,
            lineHeight: 24,
            letterSpacing: 0.15
        },
        titleSmall: {
            fontFamily: "Roboto-Medium",
            fontWeight: "500" as const,
            fontSize: 14,
            lineHeight: 20,
            letterSpacing: 0.1
        },
        bodyLarge: {
            fontFamily: "Roboto-Regular",
            fontWeight: "400" as const,
            fontSize: 16,
            lineHeight: 24,
            letterSpacing: 0.5
        },
        bodyMedium: {
            fontFamily: "Roboto-Regular",
            fontWeight: "400" as const,
            fontSize: 14,
            lineHeight: 20,
            letterSpacing: 0.25
        },
        bodySmall: {
            fontFamily: "Roboto-Regular",
            fontWeight: "400" as const,
            fontSize: 12,
            lineHeight: 16,
            letterSpacing: 0.4
        },
        labelLarge: {
            fontFamily: "Roboto-Medium",
            fontWeight: "500" as const,
            fontSize: 14,
            lineHeight: 20,
            letterSpacing: 0.1
        },
        labelMedium: {
            fontFamily: "Roboto-Medium",
            fontWeight: "500" as const,
            fontSize: 12,
            lineHeight: 16,
            letterSpacing: 0.5
        },
        labelSmall: {
            fontFamily: "Roboto-Medium",
            fontWeight: "500" as const,
            fontSize: 11,
            lineHeight: 16,
            letterSpacing: 0.5
        }
    },
    textInput: {
        labelStyle: {
            fontWeight: "bold" as const
        }
    }
};
