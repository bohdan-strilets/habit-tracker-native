export const ONBOARDING_STORAGE_KEY = '@habit-tracker/onboarding-profile';

export type OnboardingUserProfile = {
  name: string;
  goalId: string;
  completedAt: string;
};

export const ONBOARDING_GOALS = [
  { id: 'build' },
  { id: 'consistency' },
  { id: 'focus' },
] as const;

export type OnboardingGoalId = (typeof ONBOARDING_GOALS)[number]['id'];
