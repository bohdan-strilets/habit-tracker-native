import type { HeatmapDay } from '@/types/heatmapCalendar';

/** Max consecutive days where at least one habit was completed. */
export function computeBestStreak(days: readonly HeatmapDay[]): number {
  if (days.length === 0) return 0;
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  let maxStreak = 0;
  let current = 0;
  for (const d of sorted) {
    if (d.completed > 0) {
      current += 1;
      if (current > maxStreak) maxStreak = current;
    } else {
      current = 0;
    }
  }
  return maxStreak;
}

/** Sum(completed) / sum(total) across the given days. Returns 0 when nothing was due. */
export function computeCompletionRate(days: readonly HeatmapDay[]): number {
  let totalPossible = 0;
  let totalDone = 0;
  for (const d of days) {
    totalPossible += d.total;
    totalDone += d.completed;
  }
  if (totalPossible === 0) return 0;
  return totalDone / totalPossible;
}

export function computeTotalCompleted(days: readonly HeatmapDay[]): number {
  let sum = 0;
  for (const d of days) {
    sum += d.completed;
  }
  return sum;
}

/** Calendar-sorted slice of the last `n` days (inclusive). */
export function lastNDays(
  days: readonly HeatmapDay[],
  n: number,
): HeatmapDay[] {
  if (n <= 0 || days.length === 0) return [];
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  return sorted.slice(-Math.min(n, sorted.length));
}
