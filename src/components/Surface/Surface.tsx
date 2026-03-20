import { View } from 'react-native';
import type { SurfaceProps } from './Surface.types';
import { elevationStyles, styles } from './Surface.styles';

export const Surface = ({
  children,
  style,
  padding = 16,
  radius = 16,
  elevation = 1,
  background = '#fff',
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
