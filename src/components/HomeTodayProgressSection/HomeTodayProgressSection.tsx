import { ProgressBar } from '@components/ProgressBar';
import { useAppTheme } from '@theme';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text } from 'react-native';

import { createHomeTodayProgressSectionStyles } from './HomeTodayProgressSection.styles';
import type { HomeTodayProgressSectionProps } from './HomeTodayProgressSection.types';

export const HomeTodayProgressSection = ({
  progress,
  completedCount,
  total,
  onOutsidePress,
}: HomeTodayProgressSectionProps) => {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createHomeTodayProgressSectionStyles(theme),
    [theme],
  );

  return (
    <Pressable
      style={({ pressed }) => [
        styles.progressSection,
        onOutsidePress && pressed && { opacity: 0.96 },
      ]}
      onPress={onOutsidePress}
      disabled={!onOutsidePress}
    >
      <Text style={styles.progressTitle}>{t('home.progressTitle')}</Text>
      <ProgressBar
        progress={progress}
        accessibilityLabel={t('home.progressA11y', {
          completed: completedCount,
          total,
        })}
      />
      <Text style={styles.progressSummary}>
        {t('home.progressSummary', {
          completed: completedCount,
          total,
        })}
      </Text>
    </Pressable>
  );
};
