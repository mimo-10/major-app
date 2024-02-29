/** @format */

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { en, fr, ar } from "./translations/index.js";

const resources = {
	en: {
		translation: en,
	},
	fr: {
		translation: fr,
	},
	ar: {
		translation: ar,
	},
};

i18next.use(initReactI18next).init({
	lng: "en",
	fallbackLng: "en",
	// debug: true,
	resources,
	compatibilityJSON: "v3",
});

export default i18next;
