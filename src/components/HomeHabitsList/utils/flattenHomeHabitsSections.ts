import type { HomeScreenHabitSection } from '../../../types/homeScreen';
import type { HomeListRow } from '../HomeHabitsList.types';

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
