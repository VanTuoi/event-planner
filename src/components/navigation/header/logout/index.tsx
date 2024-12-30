import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Button, useTheme } from "react-native-paper";
import { useLogout } from "~/hook/auth";
import { useAuthStore } from "~/store";

const Logout = memo(() => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const { logout } = useAuthStore();
    const { handleLogout, isLoading } = useLogout();

    const handlePress = async () => {
        const response = await handleLogout();
        if (response.statusText === "OK") {
            logout();
        }
    };

    return (
        <Button
            disabled={isLoading}
            loading={isLoading}
            mode="contained"
            onPress={handlePress}
            style={{
                width: "100%",
                backgroundColor: colors.background,
                borderColor: colors.primary,
                borderWidth: 2,
                borderRadius: 8
            }}
            labelStyle={{
                color: colors.primary,
                fontSize: 16
            }}
        >
            {t("nav.logout")}
        </Button>
    );
});

export default Logout;
