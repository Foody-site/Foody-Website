import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { testAr, testEn } from "../public/locales";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        test: testAr,
      },
      en: {
        test: testEn,
      },
    },
    lng: "ar",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
