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
  { hex: '#2E7D32', label: 'Forest' },
  { hex: '#1565C0', label: 'Ocean' },
  { hex: '#6A1B9A', label: 'Violet' },
  { hex: '#C62828', label: 'Ruby' },
  { hex: '#EF6C00', label: 'Amber' },
  { hex: '#00838F', label: 'Teal' },
  { hex: '#5D4037', label: 'Earth' },
  { hex: '#37474F', label: 'Slate' },
  { hex: '#AD1457', label: 'Rose' },
  { hex: '#F9A825', label: 'Gold' },
];

export const DEFAULT_HABIT_ACCENT_HEX = HABIT_ACCENT_PRESETS[0].hex;

export const HABIT_CATEGORY_OPTIONS: HabitCategoryOption[] = [
  { id: 'health', label: 'Health', emoji: '❤️' },
  { id: 'fitness', label: 'Fitness', emoji: '🏃' },
  { id: 'mindfulness', label: 'Mindfulness', emoji: '🧘' },
  { id: 'productivity', label: 'Productivity', emoji: '📋' },
  { id: 'social', label: 'Social', emoji: '🤝' },
  { id: 'learning', label: 'Learning', emoji: '📖' },
  { id: 'sleep', label: 'Sleep', emoji: '😴' },
  { id: 'finance', label: 'Finance', emoji: '💰' },
  { id: 'other', label: 'Other', emoji: '✨' },
];

export const DEFAULT_HABIT_CATEGORY: HabitCategoryId = 'other';

export const DEFAULT_COUNT_TARGET = '8';
