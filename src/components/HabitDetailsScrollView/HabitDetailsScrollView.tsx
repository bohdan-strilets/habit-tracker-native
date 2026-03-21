import { ScrollView } from 'react-native';

import { habitDetailsScrollViewStyles as styles } from './HabitDetailsScrollView.styles';
import type { HabitDetailsScrollViewProps } from './HabitDetailsScrollView.types';

export const HabitDetailsScrollView = ({
  children,
}: HabitDetailsScrollViewProps) => (
  <ScrollView
    style={styles.scroll}
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
    {children}
  </ScrollView>
);
