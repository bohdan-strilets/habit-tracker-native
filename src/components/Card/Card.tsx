import { colors, radii, space } from '../../theme';
import { Surface } from '../Surface';
import type { CardProps } from './Card.types';
import { styles } from './Card.styles';

const variantSurface = {
  default: { elevation: 2 as const, background: colors.background.surface },
  muted: { elevation: 1 as const, background: colors.background.surfaceMuted },
};

export const Card = ({
  children,
  style,
  variant = 'default',
  padding = space.xl,
  radius = radii.xl,
}: CardProps) => {
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
