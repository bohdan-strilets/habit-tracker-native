import type { HomeListRow } from '@components/HomeHabitsList/HomeHabitsList.types';

import type { HomeScreenHabitSection } from '@/types/homeScreen';

export function flattenHomeHabitsSections(
  sections: HomeScreenHabitSection[],
): HomeListRow[] {
  const out: HomeListRow[] = [];
  sections.forEach((s, sectionIndex) => {
    out.push({
      kind: 'header',
      key: `section-${sectionIndex}-${s.title}`,
      title: s.title,
    });
    for (const habit of s.data) {
      out.push({ kind: 'habit', key: habit.id, habit });
    }
  });
  return out;
}
