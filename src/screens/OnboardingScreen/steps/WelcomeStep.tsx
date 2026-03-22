import { PrimaryButton } from '@components/PrimaryButton';
import { useAppTheme } from '@theme';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { createOnboardingScreenStyles } from '../OnboardingScreen.styles';

type WelcomeStepProps = {
  onContinue: () => void;
};

export const WelcomeStep = memo(function WelcomeStep({
  onContinue,
}: WelcomeStepProps) {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const styles = createOnboardingScreenStyles(theme.colors);

  return (
    <View style={styles.center}>
      <Text style={styles.title}>{t('onboarding.welcomeTitle')}</Text>
      <Text style={styles.subtitle}>{t('onboarding.welcomeSubtitle')}</Text>
      <PrimaryButton title={t('onboarding.getStarted')} onPress={onContinue} />
    </View>
  );
});
