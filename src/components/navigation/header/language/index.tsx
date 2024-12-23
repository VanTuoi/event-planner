import React, { memo } from "react";
import { Text, useTheme } from "react-native-paper";

const SelectLanguage = memo(() => {
    const { colors } = useTheme();

    return <Text style={{ color: colors.background, padding: 10 }}>Select Language</Text>;
});

export default SelectLanguage;
