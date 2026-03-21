import { ScrollView } from 'react-native';

import { addHabitScreenScrollStyles as styles } from './AddHabitScreenScroll.styles';
import type { AddHabitScreenScrollProps } from './AddHabitScreenScroll.types';

export const AddHabitScreenScroll = ({
  children,
}: AddHabitScreenScrollProps) => (
  <ScrollView
    style={styles.scroll}
    contentContainerStyle={styles.scrollContent}
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}
  >
    {children}
  </ScrollView>
);
