import i18n from '@i18n/i18n';
import { localeTagForAppLanguage } from '@i18n/localeTag';

import type { AppLanguage } from '@/types/Language';

function appLocaleTag(): string {
  return localeTagForAppLanguage(i18n.language as AppLanguage);
}

export const formatYyyyMmDdLong = (yyyyMmDd: string): string => {
  const [y, m, d] = yyyyMmDd.split('-').map(Number);
  if (!y || !m || !d) return yyyyMmDd;
  return new Date(y, m - 1, d).toLocaleDateString(appLocaleTag(), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatYyyyMmDdDateOnly = (yyyyMmDd: string): string => {
  const [y, m, d] = yyyyMmDd.split('-').map(Number);
  if (!y || !m || !d) return yyyyMmDd;
  return new Date(y, m - 1, d).toLocaleDateString(appLocaleTag(), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
