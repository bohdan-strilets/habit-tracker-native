export type HabitKind = 'boolean' | 'count';

export type HabitCategoryId =
  | 'health'
  | 'fitness'
  | 'mindfulness'
  | 'productivity'
  | 'social'
  | 'learning'
  | 'sleep'
  | 'finance'
  | 'other';

export type HabitFrequency = 'daily' | 'weekly';

export type Log = {
  date: string;
  completed: boolean;
  progress?: number;
};

export type Habit = {
  id: string;
  title: string;
  logs: Log[];
  createdAt?: string;
  icon?: string;
  accentColor?: string;
  category?: HabitCategoryId;
  notes?: string;
  frequency?: HabitFrequency;
  kind?: HabitKind;
  target?: number;
};
