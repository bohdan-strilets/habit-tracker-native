import { PrimaryButton } from '@components/PrimaryButton';
import { TextField } from '@components/TextField';
import { useAppTheme } from '@theme';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { createOnboardingScreenStyles } from '../OnboardingScreen.styles';

type NameStepProps = {
  name: string;
  onChangeName: (v: string) => void;
  onContinue: () => void;
};

export const NameStep = memo(function NameStep({
  name,
  onChangeName,
  onContinue,
}: NameStepProps) {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const styles = createOnboardingScreenStyles(theme.colors);

  const trimmed = name.trim();
  const canContinue = trimmed.length > 0;

  return (
    <View style={styles.center}>
      <Text style={styles.title}>{t('onboarding.nameTitle')}</Text>
      <TextField
        value={name}
        onChangeText={onChangeName}
        placeholder={t('onboarding.namePlaceholder')}
        autoCapitalize="words"
        autoCorrect
        returnKeyType="next"
        onSubmitEditing={canContinue ? onContinue : undefined}
        accessibilityLabel={t('onboarding.nameA11y')}
      />
      <View style={styles.sectionSpacer} />
      <PrimaryButton
        title={t('common.continue')}
        onPress={onContinue}
        disabled={!canContinue}
      />
    </View>
  );
});
