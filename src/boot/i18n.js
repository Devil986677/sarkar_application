import { createI18n } from 'vue-i18n';
import en from 'src/i18n/en';
import np from 'src/i18n/np';

const messages = { en, np };


const savedLanguage = localStorage.getItem("language") || "en";

const i18n = createI18n({
  locale: savedLanguage,
  fallbackLocale: 'en',
  messages,
});

export default ({ app }) => {
  app.use(i18n);
};

export { i18n };
