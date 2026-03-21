import { HABIT_CATEGORY_OPTIONS } from '@constants/habitFormOptions';

import type { HabitCategoryId } from '@/types/Habit';

export function getHabitCategoryLabel(id: HabitCategoryId | undefined): string {
  if (!id) return '';
  return HABIT_CATEGORY_OPTIONS.find((c) => c.id === id)?.label ?? '';
}
