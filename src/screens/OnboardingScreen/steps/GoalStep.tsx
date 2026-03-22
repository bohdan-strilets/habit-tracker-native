import { PrimaryButton } from '@components/PrimaryButton';
import {
  ONBOARDING_GOALS,
  type OnboardingGoalId,
} from '@constants/onboarding';
import { PRESS_SPRING } from '@constants/pressSpring';
import { useAppTheme } from '@theme';
import { onboardingGoalLabel } from '@utils/onboardingGoalLabel';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  createGoalCardStyles,
  createOnboardingScreenStyles,
} from '../OnboardingScreen.styles';

const STAGGER_MS = 65;
const ITEM_ENTRANCE_MS = 280;
const ITEM_OFFSET = 14;
const SELECTED_SCALE = 1.02;
const PRESS_SCALE = 0.96;

type GoalCardProps = {
  label: string;
  selected: boolean;
  index: number;
  onSelect: () => void;
};

const GoalCard = memo(function GoalCard({
  label,
  selected,
  index,
  onSelect,
}: GoalCardProps) {
  const { theme } = useAppTheme();
  const baseStyles = createGoalCardStyles(theme.colors);
  const pressScale = useSharedValue(1);
  const selectScale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(ITEM_OFFSET);

  useEffect(() => {
    opacity.value = 0;
    translateY.value = ITEM_OFFSET;
    const delay = index * STAGGER_MS;
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: ITEM_ENTRANCE_MS }),
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: ITEM_ENTRANCE_MS }),
    );
  }, [index, opacity, translateY]);

  useEffect(() => {
    selectScale.value = withSpring(
      selected ? SELECTED_SCALE : 1,
      PRESS_SPRING,
    );
  }, [selectScale, selected]);

  const runPressIn = () => {
    pressScale.value = withSpring(PRESS_SCALE, PRESS_SPRING);
  };

  const runPressOut = () => {
    pressScale.value = withSpring(1, PRESS_SPRING);
  };

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: pressScale.value * selectScale.value },
    ],
  }));

  return (
    <Pressable
      onPress={onSelect}
      onPressIn={runPressIn}
      onPressOut={runPressOut}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Animated.View
        style={[
          baseStyles.card,
          selected && baseStyles.cardSelected,
          cardStyle,
        ]}
      >
        <Text
          style={[
            baseStyles.cardLabel,
            selected && baseStyles.cardLabelSelected,
          ]}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
});

type GoalStepProps = {
  selectedGoalId: OnboardingGoalId | null;
  onSelectGoal: (id: OnboardingGoalId) => void;
  onFinish: () => void;
};

export const GoalStep = memo(function GoalStep({
  selectedGoalId,
  onSelectGoal,
  onFinish,
}: GoalStepProps) {
  const { t } = useTranslation();
  const { theme } = useAppTheme();
  const styles = createOnboardingScreenStyles(theme.colors);
  const canFinish = selectedGoalId !== null;

  return (
    <View style={styles.center}>
      <Text style={styles.title}>{t('onboarding.goalTitle')}</Text>
      <View style={styles.sectionSpacer} />
      {ONBOARDING_GOALS.map((g, index) => (
        <GoalCard
          key={g.id}
          index={index}
          label={onboardingGoalLabel(g.id, t)}
          selected={selectedGoalId === g.id}
          onSelect={() => onSelectGoal(g.id)}
        />
      ))}
      <View style={styles.sectionSpacer} />
      <PrimaryButton
        title={t('onboarding.finish')}
        onPress={onFinish}
        disabled={!canFinish}
      />
    </View>
  );
});
