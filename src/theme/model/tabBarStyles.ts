import { Platform, type ViewStyle } from 'react-native';
import { space } from '../tokens';
import type { ColorPalette } from '../types';

export const tabBarItemStyle: ViewStyle = {
  paddingTop: space.smPlus,
  paddingBottom: space.smPlus,
};

export const tabBarIconStyle: ViewStyle = {
  marginTop: 2,
};

export function getTabBarContainerStyle(colors: ColorPalette): ViewStyle {
  return {
    backgroundColor: colors.background.transparent,
    borderTopWidth: 0,
    elevation: 0,
    ...(Platform.OS === 'ios' ? { shadowOpacity: 0 } : {}),
  };
}
