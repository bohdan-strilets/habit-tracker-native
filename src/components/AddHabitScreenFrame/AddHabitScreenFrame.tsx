import { ScreenBackground } from '@components/ScreenBackground';

import { addHabitScreenFrameStyles as styles } from './AddHabitScreenFrame.styles';
import type { AddHabitScreenFrameProps } from './AddHabitScreenFrame.types';

export const AddHabitScreenFrame = ({ children }: AddHabitScreenFrameProps) => (
  <ScreenBackground style={styles.screen}>{children}</ScreenBackground>
);
