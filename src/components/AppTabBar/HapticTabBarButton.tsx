import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { Platform, StyleSheet } from 'react-native';

const centered = StyleSheet.create({
  pressable: {
    flex: 1,
    justifyContent: 'center',
  },
});

export function HapticTabBarButton(props: BottomTabBarButtonProps) {
  const { onPress, style, ...rest } = props;

  return (
    <PlatformPressable
      {...rest}
      style={[style, centered.pressable]}
      onPress={(e) => {
        if (Platform.OS === 'ios') {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPress?.(e);
      }}
    />
  );
}
