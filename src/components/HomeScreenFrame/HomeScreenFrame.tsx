import { ScreenBackground } from '@components/ScreenBackground';

import { homeScreenFrameStyles as styles } from './HomeScreenFrame.styles';
import type { HomeScreenFrameProps } from './HomeScreenFrame.types';

export const HomeScreenFrame = ({ children }: HomeScreenFrameProps) => (
  <ScreenBackground style={styles.screen}>{children}</ScreenBackground>
);
