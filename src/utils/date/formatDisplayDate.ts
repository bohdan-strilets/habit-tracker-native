import { APP_LOCALE } from '@constants/locale';

export const formatYyyyMmDdLong = (yyyyMmDd: string): string => {
  const [y, m, d] = yyyyMmDd.split('-').map(Number);
  if (!y || !m || !d) return yyyyMmDd;
  return new Date(y, m - 1, d).toLocaleDateString(APP_LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const formatYyyyMmDdDateOnly = (yyyyMmDd: string): string => {
  const [y, m, d] = yyyyMmDd.split('-').map(Number);
  if (!y || !m || !d) return yyyyMmDd;
  return new Date(y, m - 1, d).toLocaleDateString(APP_LOCALE, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
