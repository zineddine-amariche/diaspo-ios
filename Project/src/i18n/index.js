import "intl-pluralrules";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en/en.json";
import fr from "./fr/fr.json";

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
};

i18n.use(initReactI18next).init({
  // compatibilityJSON: 'v3',
  resources,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export default i18n;
