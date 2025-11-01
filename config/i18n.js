import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import path from "path";
import { fileURLToPath } from "url";

// ES modules don't provide __dirname; derive it from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize i18n
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en", // default language
    preload: ["en", "am"], // load English and Amharic
    backend: {
      loadPath: path.join(__dirname, "../locales/{{lng}}/translation.json"),
    },
    detection: {
      order: ["querystring", "header"], // detect from URL or headers
      caches: false,
    },
    interpolation: {
      escapeValue: false, // not needed for Express JSON
    },
  });

export default i18next;
