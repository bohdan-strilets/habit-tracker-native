import { Surface } from '../Surface';
import type { CardProps } from './Card.types';
import { styles } from './Card.styles';

const variantSurface = {
  default: { elevation: 2 as const, background: '#fff' },
  muted: { elevation: 1 as const, background: '#f8f9fa' },
};

export const Card = ({
  children,
  style,
  variant = 'default',
  padding = 16,
  radius = 20,
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
