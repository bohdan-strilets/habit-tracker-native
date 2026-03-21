import { Surface } from '@components/Surface';
import { radii, space, useAppTheme } from '@theme';

import { styles } from './Card.styles';
import type { CardProps } from './Card.types';

export const Card = ({
  children,
  style,
  variant = 'default',
  padding = space.xl,
  radius = radii.xl,
}: CardProps) => {
  const { theme } = useAppTheme();

  const variantSurface = {
    default: {
      elevation: 2 as const,
      background: theme.colors.background.surface,
    },
    muted: {
      elevation: 1 as const,
      background: theme.colors.background.surfaceMuted,
    },
  };

  const v = variantSurface[variant];

  return (
    <Surface
      elevation={v.elevation}
      background={v.background}
      radius={radius}
      padding={padding}
      style={[styles.root, style]}
    >
      {children}
    </Surface>
  );
};
