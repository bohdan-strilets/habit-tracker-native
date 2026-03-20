import type { ReactNode } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHabit } from '../../hooks/useHabit';
import { PrimaryButton } from '../PrimaryButton';
import { styles } from './HabitStorageGate.styles';

const LOADING_COLOR = '#4CAF50';

export type HabitStorageGateProps = {
  children: ReactNode;
};

export const HabitStorageGate = ({ children }: HabitStorageGateProps) => {
  const { isLoading, hydrationError, retryHydration } = useHabit();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.gateRoot} edges={['top', 'bottom']}>
        <View style={styles.gate} accessibilityLabel="Loading saved habits">
          <ActivityIndicator size="large" color={LOADING_COLOR} />
        </View>
      </SafeAreaView>
    );
  }

  if (hydrationError) {
    return (
      <SafeAreaView style={styles.gateRoot} edges={['top', 'bottom']}>
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
