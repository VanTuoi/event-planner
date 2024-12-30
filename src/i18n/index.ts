import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./locales/en_US/translation.json";
import translationFr from "./locales/fr-FR/translation.json";
import translationVi from "./locales/vi-VN/translation.json";

const resources = {
    "vi-VN": { translation: translationVi },
    "en-US": { translation: translationEn },
    "fr-FR": { translation: translationFr }
};

export const initI18n = async () => {
    let savedLanguage = await AsyncStorage.getItem("language");

    if (!savedLanguage) {
        const locales = Localization.getLocales();
        savedLanguage = locales.length > 0 ? locales[0].languageTag : "en-US";
    }

    i18n.use(initReactI18next).init({
        compatibilityJSON: "v4",
        resources,
        lng: savedLanguage,
        fallbackLng: "en-US",
        interpolation: {
            escapeValue: false
        }
    });
};
