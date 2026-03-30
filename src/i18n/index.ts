import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import sr from '../locales/sr.json';
import ru from '../locales/ru.json';

export const supportedLanguages = ['en', 'sr', 'ru'] as const;
export type SupportedLanguage = typeof supportedLanguages[number];

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    sr: { translation: sr },
    ru: { translation: ru },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
