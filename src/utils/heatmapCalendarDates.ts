/** Local calendar YYYY-MM-DD (no UTC shift). */
export function toLocalDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseLocalDateKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  const date = new Date(y, (m ?? 1) - 1, d ?? 1, 12, 0, 0, 0);
  return date;
}

export function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

export function addLocalDays(d: Date, delta: number): Date {
  const next = new Date(d);
  next.setDate(next.getDate() + delta);
  return next;
}

/** Monday = 0 … Sunday = 6 (row index in the heatmap). */
export function weekdayIndexMonday0(d: Date): number {
  const day = d.getDay();
  return day === 0 ? 6 : day - 1;
}

/** Start of the ISO week (Monday) for the local calendar day containing `d`. */
export function startOfLocalWeekMonday(d: Date): Date {
  const sod = startOfLocalDay(d);
  const idx = weekdayIndexMonday0(sod);
  return addLocalDays(sod, -idx);
}

export function endOfLocalWeekSunday(d: Date): Date {
  const mon = startOfLocalWeekMonday(d);
  return addLocalDays(mon, 6);
}
