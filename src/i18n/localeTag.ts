import type { AppLanguage } from '@/types/Language';

/** BCP 47 locale for `Intl`, `toLocaleDateString`, etc. */
export function localeTagForAppLanguage(lang: AppLanguage): string {
  if (lang === 'uk') return 'uk-UA';
  if (lang === 'pl') return 'pl-PL';
  return 'en-US';
}
