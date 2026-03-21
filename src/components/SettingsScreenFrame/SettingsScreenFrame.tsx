import { ScreenBackground } from '@components/ScreenBackground';

import { settingsScreenFrameStyles as styles } from './SettingsScreenFrame.styles';
import type { SettingsScreenFrameProps } from './SettingsScreenFrame.types';

export const SettingsScreenFrame = ({ children }: SettingsScreenFrameProps) => (
  <ScreenBackground style={styles.screen}>{children}</ScreenBackground>
);
