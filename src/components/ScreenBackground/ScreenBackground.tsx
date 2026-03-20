import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import { gradients } from '../../theme';

type ScreenBackgroundProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export const ScreenBackground = ({
  children,
  style,
}: ScreenBackgroundProps) => (
  <LinearGradient
    colors={[...gradients.screen]}
    locations={[...gradients.screenLocations]}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    style={[styles.root, style]}
  >
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
