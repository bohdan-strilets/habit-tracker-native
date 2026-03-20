import type { HabitCategoryId, HabitFrequency } from '../../types/Habit';

export type AddHabitFormMode = 'create' | 'edit';

export type AddHabitFormProps = {
  formMode?: AddHabitFormMode;
  title: string;
  onChangeTitle: (text: string) => void;
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
  selectedAccentHex: string;
  onSelectAccentHex: (hex: string) => void;
  categoryId: HabitCategoryId;
  onSelectCategory: (id: HabitCategoryId) => void;
  notes: string;
  onChangeNotes: (text: string) => void;
  frequency: HabitFrequency;
  onSelectFrequency: (f: HabitFrequency) => void;
  trackAsCount: boolean;
  onChangeTrackAsCount: (value: boolean) => void;
  targetStr: string;
  onChangeTargetStr: (text: string) => void;
  onSave: () => void;
  entrancePlayKey?: number | string;
};
