import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PRESS_SPRING } from '../../constants/pressSpring';
import { colors, gradients } from '../../theme';
import type { PrimaryButtonProps } from './PrimaryButton.types';
import { styles } from './PrimaryButton.styles';

export const PrimaryButton = ({
  title,
  onPress,
  disabled,
  loading,
  variant = 'primary',
}: PrimaryButtonProps) => {
  const scale = useSharedValue(1);
  const inactive = Boolean(disabled || loading);
  const isDanger = variant === 'danger';
  const showPrimaryFill = !isDanger && !inactive;

  useEffect(() => {
    if (inactive) {
      scale.value = 1;
    }
  }, [inactive, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const runPressIn = () => {
    if (inactive) return;
    scale.value = withSpring(0.97, PRESS_SPRING);
  };

  const runPressOut = () => {
    scale.value = withSpring(1, PRESS_SPRING);
  };

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={inactive}
      onPressIn={runPressIn}
      onPressOut={runPressOut}
      style={styles.pressable}
    >
      <Animated.View
        style={[
          styles.button,
          isDanger && styles.danger,
          inactive && (isDanger ? styles.disabledDanger : styles.disabled),
          animatedStyle,
        ]}
      >
        {showPrimaryFill ? (
          <LinearGradient
            colors={[...gradients.primaryButton]}
            locations={[...gradients.primaryButtonLocations]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        ) : null}
        {loading ? (
          <ActivityIndicator
            color={isDanger ? colors.semantic.danger : colors.text.inverse}
          />
        ) : (
          <Text
            style={[
              styles.text,
              isDanger && styles.textDanger,
              inactive && isDanger && styles.textDangerDisabled,
            ]}
          >
            {title}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
};
