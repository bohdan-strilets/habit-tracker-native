import { Pressable, Text, ActivityIndicator } from 'react-native';
import type { PrimaryButtonProps } from './PrimaryButton.types';
import { styles } from './PrimaryButton.styles';

export const PrimaryButton = ({
  title,
  onPress,
  disabled,
  loading,
}: PrimaryButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
};
