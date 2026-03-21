import type { HabitCategoryId } from '@/types/Habit';
import type { HabitAccentPreset, HabitCategoryOption } from '@/types/habitForm';

export const DEFAULT_HABIT_ICON = '✨';

export const HABIT_ICON_PRESETS = [
  '✨',
  '🏃',
  '💧',
  '📚',
  '🧘',
  '💪',
  '😴',
  '🥗',
  '🎯',
  '💼',
  '🎨',
  '🎵',
  '🌿',
  '☀️',
  '🚶',
  '🧠',
  '✍️',
  '💊',
  '🦷',
  '🧹',
  '📵',
  '💰',
  '❤️',
  '🤝',
] as const;

export const HABIT_ACCENT_PRESETS: HabitAccentPreset[] = [
  { hex: '#2E7D32', labelKey: 'forest' },
  { hex: '#1565C0', labelKey: 'ocean' },
  { hex: '#6A1B9A', labelKey: 'violet' },
  { hex: '#C62828', labelKey: 'ruby' },
  { hex: '#EF6C00', labelKey: 'amber' },
  { hex: '#00838F', labelKey: 'teal' },
  { hex: '#5D4037', labelKey: 'earth' },
  { hex: '#37474F', labelKey: 'slate' },
  { hex: '#AD1457', labelKey: 'rose' },
  { hex: '#F9A825', labelKey: 'gold' },
];

export const DEFAULT_HABIT_ACCENT_HEX = HABIT_ACCENT_PRESETS[0].hex;

export const HABIT_CATEGORY_OPTIONS: HabitCategoryOption[] = [
  { id: 'health', emoji: '❤️' },
  { id: 'fitness', emoji: '🏃' },
  { id: 'mindfulness', emoji: '🧘' },
  { id: 'productivity', emoji: '📋' },
  { id: 'social', emoji: '🤝' },
  { id: 'learning', emoji: '📖' },
  { id: 'sleep', emoji: '😴' },
  { id: 'finance', emoji: '💰' },
  { id: 'other', emoji: '✨' },
];

export const DEFAULT_HABIT_CATEGORY: HabitCategoryId = 'other';

export const DEFAULT_COUNT_TARGET = '8';
