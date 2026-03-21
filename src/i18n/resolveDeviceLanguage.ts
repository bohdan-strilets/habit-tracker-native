import * as Localization from 'expo-localization';

import type { AppLanguage } from '@/types/Language';

/**
 * Maps the device locale list to an app language (en / uk / pl).
 * Walks preferred locales in order; anything else falls back to English.
 */
export function resolveDeviceLanguage(): AppLanguage {
  const locales = Localization.getLocales();
  if (!locales?.length) {
    return 'en';
  }

  for (const loc of locales) {
    const code = (loc.languageCode ?? '').toLowerCase().trim();
    if (code === 'uk') return 'uk';
    if (code === 'pl') return 'pl';
    if (code === 'en') return 'en';
  }

  const tag = (locales[0]?.languageTag ?? '').toLowerCase();
  if (tag.startsWith('uk')) return 'uk';
  if (tag.startsWith('pl')) return 'pl';
  if (tag.startsWith('en')) return 'en';

  return 'en';
}
