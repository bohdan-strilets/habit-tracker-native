import { radii, space, useAppTheme } from '@theme';
import { View } from 'react-native';

import { styles } from './Surface.styles';
import type { SurfaceProps } from './Surface.types';

export const Surface = ({
  children,
  style,
  padding = space.xl,
  radius = radii.lg,
  elevation = 1,
  background,
}: SurfaceProps) => {
  const { theme } = useAppTheme();
  const bg = background ?? theme.colors.background.surface;

  return (
    <View
      style={[
        styles.base,
        {
          padding,
          borderRadius: radius,
          backgroundColor: bg,
        },
        theme.shadows.elevationStyles[elevation],
        style,
      ]}
    >
      {children}
    </View>
  );
};
