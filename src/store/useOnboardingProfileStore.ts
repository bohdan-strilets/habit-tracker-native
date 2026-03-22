import type { OnboardingUserProfile } from '@constants/onboarding';
import { create } from 'zustand';

type OnboardingProfileStore = {
  profile: OnboardingUserProfile | null;
  setProfile: (profile: OnboardingUserProfile | null) => void;
};

export const useOnboardingProfileStore = create<OnboardingProfileStore>(
  (set) => ({
    profile: null,
    setProfile: (profile) => set({ profile }),
  }),
);
