import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector"
import enLng from "./en/en.json"

const resources = {
    en: {
        translation: enLng
    }
}

export default i18n
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    })
