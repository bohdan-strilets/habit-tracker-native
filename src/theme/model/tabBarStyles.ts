import type { ColorPalette } from '@theme/types';
import { Platform, type ViewStyle } from 'react-native';

/** Центруємо іконку в комірці: дефолт RN використовує flex-start і візуально «піднімає» таби. */
export const tabBarItemStyle: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

export function getTabBarContainerStyle(colors: ColorPalette): ViewStyle {
  return {
    backgroundColor: colors.background.transparent,
    borderWidth: 0,
    borderTopWidth: 0,
    elevation: 0,
    ...(Platform.OS === 'ios' ? { shadowOpacity: 0 } : {}),
  };
}
