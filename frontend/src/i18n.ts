import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import de from './locales/de.json';

// Получаем язык из localStorage или берем язык браузера
const savedLanguage = localStorage.getItem('i18nextLng') || navigator.language.split('-')[0] || 'en';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            de: { translation: de },
        },
        lng: savedLanguage,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    });

export default i18n;
