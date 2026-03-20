import { Keyboard, Text, View } from 'react-native';
import {
  HABIT_DETAILS_TIMELINE_DAYS,
  HABIT_TITLE_MAX_LENGTH,
} from '../../constants/habits';
import { space } from '../../theme';
import { Card } from '../Card';
import { FadeSlideIn } from '../FadeSlideIn';
import { PrimaryButton } from '../PrimaryButton';
import { Stack } from '../Stack';
import { TextField } from '../TextField';
import type { AddHabitFormProps } from './AddHabitForm.types';
import { styles } from './AddHabitForm.styles';

export const AddHabitForm = ({
  title,
  onChangeTitle,
  onSave,
  entrancePlayKey,
}: AddHabitFormProps) => {
  const trimmed = title.trim();
  const canSave = trimmed.length > 0;

  const handleSave = () => {
    if (!canSave) return;
    Keyboard.dismiss();
    onSave();
  };

  return (
    <View style={styles.root}>
      <FadeSlideIn index={0} playKey={entrancePlayKey}>
        <Card>
          <Text style={styles.headline}>New habit</Text>
          <Text style={styles.lead}>
            Pick a short, clear name. After you create it, open the card to see
            streak, completion, and mark progress for each day.
          </Text>

          <Stack spacing={space.mdPlus} padding={0}>
            <View>
              <Text style={styles.fieldLabel}>Habit name</Text>
              <TextField
                value={title}
                onChangeText={onChangeTitle}
                placeholder="e.g. Morning stretch, Read 10 minutes"
                accessibilityLabel="Habit name"
                maxLength={HABIT_TITLE_MAX_LENGTH}
                returnKeyType="done"
                onSubmitEditing={handleSave}
                autoCorrect
                autoCapitalize="sentences"
              />
              <Text style={styles.counter}>
                {title.length}/{HABIT_TITLE_MAX_LENGTH}
              </Text>
            </View>

            {!canSave && title.length === 0 ? (
              <Text style={styles.inlineHint}>
                Enter a name above, then tap Create habit.
              </Text>
            ) : null}

            <PrimaryButton
              title="Create habit"
              onPress={handleSave}
              disabled={!canSave}
            />
          </Stack>
        </Card>
      </FadeSlideIn>

      <FadeSlideIn index={1} playKey={entrancePlayKey}>
        <Card variant="muted">
          <Text style={styles.tipsTitle}>Quick tips</Text>
          <Text style={styles.tipLine}>
            • Tap a habit on the home list to open details, stats, and the{' '}
            {HABIT_DETAILS_TIMELINE_DAYS}-day timeline.
          </Text>
          <Text style={styles.tipLine}>
            • On the details screen, use &quot;Mark as completed&quot; for today.
            After you&apos;ve marked today, the button stays disabled until
            tomorrow.
          </Text>
          <Text style={[styles.tipLine, styles.tipLineLast]}>
            • Pick a name you&apos;ll recognize in the list — short phrases work
            best.
          </Text>
        </Card>
      </FadeSlideIn>
    </View>
  );
};
