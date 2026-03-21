import { useAppTheme } from '@theme';
import { useMemo } from 'react';
import { Text, View } from 'react-native';

import { createSettingsPlaceholderStyles } from './SettingsPlaceholder.styles';

export const SettingsPlaceholder = () => {
  const { theme } = useAppTheme();
  const styles = useMemo(() => createSettingsPlaceholderStyles(theme), [theme]);

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.hint}>More options coming soon.</Text>
    </View>
  );
};
