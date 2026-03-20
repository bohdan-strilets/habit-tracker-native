import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHabit } from '../../hooks/useHabit';
import { colors, gradients } from '../../theme';
import { PrimaryButton } from '../PrimaryButton';
import { styles } from './HabitStorageGate.styles';

export type HabitStorageGateProps = {
  children: ReactNode;
};

export const HabitStorageGate = ({ children }: HabitStorageGateProps) => {
  const { isLoading, hydrationError, retryHydration } = useHabit();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.gateRoot} edges={['top', 'bottom']}>
        <LinearGradient
          colors={[...gradients.surfaceWash]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.gate} accessibilityLabel="Loading saved habits">
          <ActivityIndicator size="large" color={colors.primary.main} />
        </View>
      </SafeAreaView>
    );
  }

  if (hydrationError) {
    return (
      <SafeAreaView style={styles.gateRoot} edges={['top', 'bottom']}>
        <LinearGradient
          colors={[...gradients.surfaceWash]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
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
