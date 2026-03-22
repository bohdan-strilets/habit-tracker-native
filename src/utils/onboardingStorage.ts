import {
  ONBOARDING_STORAGE_KEY,
  type OnboardingUserProfile,
} from '@constants/onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadOnboardingProfile(): Promise<OnboardingUserProfile | null> {
  try {
    const raw = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OnboardingUserProfile;
    if (
      typeof parsed?.name === 'string' &&
      typeof parsed?.goalId === 'string' &&
      typeof parsed?.completedAt === 'string'
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export async function saveOnboardingProfile(
  profile: OnboardingUserProfile,
): Promise<void> {
  await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(profile));
}
