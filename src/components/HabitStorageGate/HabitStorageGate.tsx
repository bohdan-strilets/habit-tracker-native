import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHabit } from '../../hooks/useHabit';
import { useAppTheme } from '../../theme';
import { PrimaryButton } from '../PrimaryButton';
import {
  createHabitStorageGateStyles,
  habitStorageGateGradientFill,
} from './HabitStorageGate.styles';
import type { HabitStorageGateProps } from './HabitStorageGate.types';

export const HabitStorageGate = ({ children }: HabitStorageGateProps) => {
  const { isLoading, hydrationError, retryHydration } = useHabit();
  const { theme } = useAppTheme();
  const styles = useMemo(
    () => createHabitStorageGateStyles(theme.colors),
    [theme.colors],
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.gateRoot} edges={['top', 'bottom']}>
        <LinearGradient
          colors={[...theme.gradients.surfaceWash]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={habitStorageGateGradientFill}
        />
        <View style={styles.gate} accessibilityLabel="Loading saved habits">
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      </SafeAreaView>
    );
  }

  if (hydrationError) {
    return (
      <SafeAreaView style={styles.gateRoot} edges={['top', 'bottom']}>
        <LinearGradient
          colors={[...theme.gradients.surfaceWash]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={habitStorageGateGradientFill}
        />
        <View style={styles.gate}>
          <Text style={styles.errorTitle}>Couldn&apos;t load saved habits</Text>
          <Text style={styles.errorBody}>{hydrationError}</Text>
          <PrimaryButton title="Try again" onPress={retryHydration} />
        </View>
      </SafeAreaView>
    );
  }

  return children;
};
