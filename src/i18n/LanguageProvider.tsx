import i18n from '@i18n/i18n';
import { useLanguageStore } from '@store/useLanguageStore';
import { type ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

type LanguageProviderProps = {
  children: ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const hydrateFromStorage = useLanguageStore((s) => s.hydrateFromStorage);
  const language = useLanguageStore((s) => s.language);
  const ready = useLanguageStore((s) => s.ready);

  useEffect(() => {
    void hydrateFromStorage();
  }, [hydrateFromStorage]);

  useEffect(() => {
    if (!ready) return;
    void i18n.changeLanguage(language);
  }, [language, ready]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
