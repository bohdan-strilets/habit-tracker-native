import type { LocalDateParts } from '../../types/LocalDate';
import {
  ISO_LOCAL_DATE_PATTERN,
  LOCAL_DATE_DOT_PATTERN,
  LOCAL_DATE_SLASH_PATTERN,
} from '../regex/datePatterns';

const pad2 = (n: number): string => String(n).padStart(2, '0');

export const parseLocalDateParts = (dateStr: string): LocalDateParts | null => {
  const trimmed = dateStr.trim();

  const dotMatch = LOCAL_DATE_DOT_PATTERN.exec(trimmed);
  if (dotMatch) {
    const day = Number(dotMatch[1]);
    const month = Number(dotMatch[2]);
    const year = Number(dotMatch[3]);
    if (
      !Number.isFinite(year) ||
      !Number.isFinite(month) ||
      !Number.isFinite(day)
    )
      return null;
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;
    return { year, month, day };
  }

  const slashMatch = LOCAL_DATE_SLASH_PATTERN.exec(trimmed);
  if (slashMatch) {
    const a = Number(slashMatch[1]);
    const b = Number(slashMatch[2]);
    const year = Number(slashMatch[3]);
    if (!Number.isFinite(year) || !Number.isFinite(a) || !Number.isFinite(b))
      return null;

    let day: number;
    let month: number;
    if (a > 12) {
      day = a;
      month = b;
    } else if (b > 12) {
      month = a;
      day = b;
    } else {
      // Assume day-first (common outside US)
      day = a;
      month = b;
    }
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;
    return { year, month, day };
  }

  const isoMatch = ISO_LOCAL_DATE_PATTERN.exec(trimmed);
  if (isoMatch) {
    const year = Number(isoMatch[1]);
    const month = Number(isoMatch[2]);
    const day = Number(isoMatch[3]);

    if (
      !Number.isFinite(year) ||
      !Number.isFinite(month) ||
      !Number.isFinite(day)
    )
      return null;

    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;

    return { year, month, day };
  }

  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return null;

  const year = parsed.getFullYear();
  const month = parsed.getMonth() + 1;
  const day = parsed.getDate();

  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;

  return { year, month, day };
};

export const partsToLocalDate = (parts: LocalDateParts): Date =>
  new Date(parts.year, parts.month - 1, parts.day, 0, 0, 0, 0);

export const dateToLocalParts = (date: Date): LocalDateParts => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
});

export const localPartsToYyyyMmDd = (parts: LocalDateParts): string =>
  `${parts.year}-${pad2(parts.month)}-${pad2(parts.day)}`;

export const toTodayYyyyMmDd = (): string =>
  localPartsToYyyyMmDd(dateToLocalParts(new Date()));

export const normalizeToYyyyMmDd = (dateStr: string): string | null => {
  const parts = parseLocalDateParts(dateStr);
  if (!parts) return null;
  return localPartsToYyyyMmDd(parts);
};
