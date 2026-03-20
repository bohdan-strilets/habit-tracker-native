import { ScreenBackground } from '../ScreenBackground';
import { habitDetailsScreenFrameStyles as styles } from './HabitDetailsScreenFrame.styles';
import type { HabitDetailsScreenFrameProps } from './HabitDetailsScreenFrame.types';

export const HabitDetailsScreenFrame = ({
  children,
}: HabitDetailsScreenFrameProps) => (
  <ScreenBackground style={styles.screen}>{children}</ScreenBackground>
);
