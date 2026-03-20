import { Platform, type ViewStyle } from 'react-native';
import { colors } from './colors';
import { space } from './spacing';

/** Merged into BottomTabBar root (after defaults) — keep transparent so blur shows through */
export const tabBarContainerStyle: ViewStyle = {
  backgroundColor: colors.background.transparent,
  borderTopWidth: 0,
  elevation: 0,
  ...(Platform.OS === 'ios' ? { shadowOpacity: 0 } : {}),
};

export const tabBarItemStyle: ViewStyle = {
  paddingTop: space.smPlus,
  paddingBottom: space.smPlus,
};

export const tabBarIconStyle: ViewStyle = {
  marginTop: 2,
};
