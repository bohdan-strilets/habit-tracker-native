import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '../../theme';
import { screenBackgroundStyles as styles } from './ScreenBackground.styles';
import type { ScreenBackgroundProps } from './ScreenBackground.types';

export const ScreenBackground = ({
  children,
  style,
}: ScreenBackgroundProps) => {
  const { theme } = useAppTheme();

  return (
    <LinearGradient
      colors={[...theme.gradients.screen]}
      locations={[...theme.gradients.screenLocations]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[styles.root, style]}
    >
      {children}
    </LinearGradient>
  );
};
