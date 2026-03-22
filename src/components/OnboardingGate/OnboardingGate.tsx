import {
  createHabitStorageGateStyles,
  habitStorageGateGradientFill,
} from '@components/HabitStorageGate/HabitStorageGate.styles';
import { OnboardingScreen } from '@screens';
import { useOnboardingProfileStore } from '@store/useOnboardingProfileStore';
import { useAppTheme } from '@theme';
import { loadOnboardingProfile } from '@utils/onboardingStorage';
import { LinearGradient } from 'expo-linear-gradient';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type OnboardingGateProps = {
  children: ReactNode;
};

export function OnboardingGate({ children }: OnboardingGateProps) {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const setProfile = useOnboardingProfileStore((s) => s.setProfile);
  const styles = useMemo(
    () => createHabitStorageGateStyles(theme.colors),
    [theme.colors],
  );
  const [phase, setPhase] = useState<'loading' | 'onboarding' | 'done'>(
    'loading',
  );

  useEffect(() => {
    void (async () => {
      const existing = await loadOnboardingProfile();
      setProfile(existing);
      setPhase(existing ? 'done' : 'onboarding');
    })();
  }, [setProfile]);

  if (phase === 'loading') {
    return (
      <SafeAreaView style={styles.gateRoot} edges={['top', 'bottom']}>
        <LinearGradient
          colors={[...theme.gradients.surfaceWash]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={habitStorageGateGradientFill}
        />
        <View style={styles.gate} accessibilityLabel={t('common.loading')}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      </SafeAreaView>
    );
  }

  if (phase === 'onboarding') {
    return <OnboardingScreen onComplete={() => setPhase('done')} />;
  }

  return children;
}
