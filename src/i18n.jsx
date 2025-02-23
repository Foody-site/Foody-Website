import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // ربط i18next بـ React
  .init({
    resources: {},
    lng: "en", // اللغة الافتراضية
    fallbackLng: "en", // لو اللغة مش متاحة استخدم الإنجليزية
    interpolation: {
      escapeValue: false, // منع هروب القيم (HTML injection)
    },
  });

export default i18n;
