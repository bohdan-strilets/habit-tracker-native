import { ScreenBackground } from '@components/ScreenBackground';
import type { OnboardingGoalId, OnboardingUserProfile } from '@constants/onboarding';
import { useOnboardingProfileStore } from '@store/useOnboardingProfileStore';
import { saveOnboardingProfile } from '@utils/onboardingStorage';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OnboardingProgressDots } from './OnboardingProgressDots';
import { GoalStep } from './steps/GoalStep';
import { NameStep } from './steps/NameStep';
import { WelcomeStep } from './steps/WelcomeStep';

const TRANSITION_MS = 280;
const EASING = Easing.out(Easing.cubic);

type OnboardingScreenProps = {
  onComplete: () => void;
};

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const setProfile = useOnboardingProfileStore((s) => s.setProfile);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [goalId, setGoalId] = useState<OnboardingGoalId | null>(null);

  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(20);

  const busy = useRef(false);
  const didIntro = useRef(false);
  /** Avoid runOnJS from withTiming callbacks — it can crash on Hermes/Android with Reanimated 4. */
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (didIntro.current) return;
    didIntro.current = true;
    opacity.value = withTiming(1, {
      duration: TRANSITION_MS,
      easing: EASING,
    });
    translateY.value = withTiming(0, {
      duration: TRANSITION_MS,
      easing: EASING,
    });
  }, [opacity, translateY]);

  const advanceStep = useCallback(
    (next: number) => {
      setStep(next);
      translateY.value = 0;
      translateX.value = 20;
      opacity.value = 0;
      opacity.value = withTiming(1, {
        duration: TRANSITION_MS,
        easing: EASING,
      });
      translateX.value = withTiming(0, {
        duration: TRANSITION_MS,
        easing: EASING,
      });
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      transitionTimeoutRef.current = setTimeout(() => {
        busy.current = false;
        transitionTimeoutRef.current = null;
      }, TRANSITION_MS);
    },
    [opacity, translateX, translateY],
  );

  const goNext = useCallback(() => {
    if (busy.current || step >= 2) return;
    busy.current = true;
    const next = step + 1;
    translateX.value = withTiming(-20, {
      duration: TRANSITION_MS,
      easing: EASING,
    });
    opacity.value = withTiming(0, {
      duration: TRANSITION_MS,
      easing: EASING,
    });
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      advanceStep(next);
      transitionTimeoutRef.current = null;
    }, TRANSITION_MS);
  }, [advanceStep, opacity, step, translateX]);

  const finish = useCallback(async () => {
    if (!goalId) return;
    const profile: OnboardingUserProfile = {
      name: name.trim(),
      goalId,
      completedAt: new Date().toISOString(),
    };
    await saveOnboardingProfile(profile);
    setProfile(profile);
    onComplete();
  }, [goalId, name, onComplete, setProfile]);

  const animatedStepStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const stepBody = useMemo(() => {
    switch (step) {
      case 0:
        return <WelcomeStep onContinue={goNext} />;
      case 1:
        return (
          <NameStep
            name={name}
            onChangeName={setName}
            onContinue={goNext}
          />
        );
      case 2:
        return (
          <GoalStep
            selectedGoalId={goalId}
            onSelectGoal={setGoalId}
            onFinish={finish}
          />
        );
      default:
        return null;
    }
  }, [finish, goNext, goalId, name, step]);

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <OnboardingProgressDots step={step} total={3} />
        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={[styles.stepWrap, animatedStepStyle]}>
              {stepBody}
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  keyboard: { flex: 1 },
  scroll: { flexGrow: 1 },
  stepWrap: { flex: 1, minHeight: 420 },
});
