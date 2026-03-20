import { useEffect } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PRESS_SPRING } from '../../constants/pressSpring';
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
        {loading ? (
          <ActivityIndicator color={isDanger ? '#c62828' : '#fff'} />
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
