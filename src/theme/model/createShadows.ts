import type { ThemeShadows } from '@theme/types';
import type { ViewStyle } from 'react-native';

export function createShadows(shadowColor: string): ThemeShadows {
  const elevationStyles: Record<0 | 1 | 2 | 3, ViewStyle> = {
    0: {},

    1: {
      shadowColor,
      shadowOpacity: 0.12,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 1,
    },

    2: {
      shadowColor,
      shadowOpacity: 0.16,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },

    3: {
      shadowColor,
      shadowOpacity: 0.22,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
      elevation: 6,
    },
  };

  const cardShadow: ViewStyle = {
    shadowColor,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  };

  const inputShadow: ViewStyle = {
    shadowColor,
    shadowOpacity: 0.14,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  };

  return { elevationStyles, cardShadow, inputShadow };
}

export function createShadowsLight(shadowColor: string): ThemeShadows {
  const elevationStyles: Record<0 | 1 | 2 | 3, ViewStyle> = {
    0: {},

    1: {
      shadowColor,
      shadowOpacity: 0.04,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 1,
    },

    2: {
      shadowColor,
      shadowOpacity: 0.06,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },

    3: {
      shadowColor,
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
      elevation: 6,
    },
  };

  const cardShadow: ViewStyle = {
    shadowColor,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  };

  const inputShadow: ViewStyle = {
    shadowColor,
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  };

  return { elevationStyles, cardShadow, inputShadow };
}
