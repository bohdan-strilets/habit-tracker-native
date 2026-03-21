import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import pl from './locales/pl';
import uk from './locales/uk';
import { resolveDeviceLanguage } from './resolveDeviceLanguage';

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    uk: { translation: uk },
    pl: { translation: pl },
  },
  lng: resolveDeviceLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v4',
});

export default i18n;
