import { EmptyState } from '@components/EmptyState';
import { HomeHabitsList } from '@components/HomeHabitsList';
import { HomeScreenFrame } from '@components/HomeScreenFrame';
import { HomeScreenHeader } from '@components/HomeScreenHeader';
import { HomeTodayProgressSection } from '@components/HomeTodayProgressSection';
import { useHomeScreen } from '@hooks/useHomeScreen';
import { useHomeSwipe } from '@hooks/useHomeSwipe';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { NestableScrollContainer } from 'react-native-draggable-flatlist';

export const HomeScreen = () => {
  const { t } = useTranslation();

  const {
    userName,
    greeting,
    dateLine,
    globalStreak,
    habits,
    sections,
    progress,
    completedCount,
    total,
    onToggleDone,
    onOpenDetails,
    onEditHabit,
    onCreateFirstHabit,
    onDeleteHabit,
    onReorderActiveHabits,
  } = useHomeScreen();

  const { dismissOpenSwipe } = useHomeSwipe();

  const hasHabits = habits.length > 0;

  const onOpenDetailsDismissSwipe = (id: string) => {
    dismissOpenSwipe();
    onOpenDetails(id);
  };

  return (
    <HomeScreenFrame>
      <NestableScrollContainer
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={dismissOpenSwipe}
      >
        <HomeScreenHeader
          greeting={greeting}
          userName={userName}
          dateLine={dateLine}
          globalStreak={globalStreak}
          showStreak={hasHabits}
          onOutsidePress={dismissOpenSwipe}
        />
        {hasHabits ? (
          <>
            <HomeTodayProgressSection
              progress={progress}
              completedCount={completedCount}
              total={total}
              onOutsidePress={dismissOpenSwipe}
            />
            <HomeHabitsList
              sections={sections}
              habitsSnapshot={habits}
              onOpenDetails={onOpenDetailsDismissSwipe}
              onEditHabit={onEditHabit}
              onToggleDone={onToggleDone}
              onDeleteHabit={onDeleteHabit}
              onReorderActiveHabits={onReorderActiveHabits}
            />
          </>
        ) : (
          <View style={styles.emptyRegion}>
            <EmptyState
              title={t('home.emptyTitle')}
              subtitle={t('home.emptySubtitle')}
              buttonLabel={t('home.emptyButton')}
              onPress={onCreateFirstHabit}
            />
          </View>
        )}
      </NestableScrollContainer>
    </HomeScreenFrame>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  emptyRegion: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 32,
  },
});
