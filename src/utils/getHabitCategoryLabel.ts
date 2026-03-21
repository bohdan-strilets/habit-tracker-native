import i18n from '@i18n/i18n';

import type { HabitCategoryId } from '@/types/Habit';

export function getHabitCategoryLabel(id: HabitCategoryId | undefined): string {
  if (!id) return '';
  return i18n.t(`habitForm.categories.${id}`);
}
