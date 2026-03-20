import { View } from 'react-native';
import { colors, radii, space } from '../../theme';
import type { SurfaceProps } from './Surface.types';
import { elevationStyles, styles } from './Surface.styles';

export const Surface = ({
  children,
  style,
  padding = space.xl,
  radius = radii.lg,
  elevation = 1,
  background = colors.background.surface,
}: SurfaceProps) => {
  return (
    <View
      style={[
        styles.base,
        {
          padding,
          borderRadius: radius,
          backgroundColor: background,
        },
        elevationStyles[elevation],
        style,
      ]}
    >
      {children}
    </View>
  );
};
