import { View } from 'react-native';
import { radii, space, useAppTheme } from '../../theme';
import type { SurfaceProps } from './Surface.types';
import { styles } from './Surface.styles';

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
