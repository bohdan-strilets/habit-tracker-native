import type { OnboardingGoalId } from '@constants/onboarding';

export function isOnboardingGoalId(id: string): id is OnboardingGoalId {
  return id === 'build' || id === 'consistency' || id === 'focus';
}

/** Localized label for a saved onboarding goal id. */
export function onboardingGoalLabel(
  goalId: string,
  t: (key: string) => string,
): string {
  if (!isOnboardingGoalId(goalId)) return goalId;
  switch (goalId) {
    case 'build':
      return t('onboarding.goals.build');
    case 'consistency':
      return t('onboarding.goals.consistency');
    case 'focus':
      return t('onboarding.goals.focus');
  }
}
