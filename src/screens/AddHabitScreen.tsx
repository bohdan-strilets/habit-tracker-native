import { AddHabitForm } from '@components/AddHabitForm';
import { AddHabitScreenFrame } from '@components/AddHabitScreenFrame';
import { AddHabitScreenScroll } from '@components/AddHabitScreenScroll';
import { useAddHabitScreen } from '@hooks/useAddHabitScreen';

export const AddHabitScreen = () => {
  const {
    title,
    setTitle,
    selectedIcon,
    setSelectedIcon,
    selectedAccentHex,
    setSelectedAccentHex,
    categoryId,
    setCategoryId,
    notes,
    setNotes,
    frequency,
    setFrequency,
    trackAsCount,
    setTrackAsCount,
    targetStr,
    setTargetStr,
    entranceKey,
    submitNewHabit,
    reminderEnabled,
    changeReminderEnabled,
    reminderFields,
    addReminderTime,
    removeReminderTime,
    changeReminderHourStr,
    changeReminderMinuteStr,
    blurReminderHour,
    blurReminderMinute,
    reminderWeekdays,
    toggleReminderWeekday,
  } = useAddHabitScreen();

  return (
    <AddHabitScreenFrame>
      <AddHabitScreenScroll>
        <AddHabitForm
          title={title}
          onChangeTitle={setTitle}
          selectedIcon={selectedIcon}
          onSelectIcon={setSelectedIcon}
          selectedAccentHex={selectedAccentHex}
          onSelectAccentHex={setSelectedAccentHex}
          categoryId={categoryId}
          onSelectCategory={setCategoryId}
          notes={notes}
          onChangeNotes={setNotes}
          frequency={frequency}
          onSelectFrequency={setFrequency}
          trackAsCount={trackAsCount}
          onChangeTrackAsCount={setTrackAsCount}
          targetStr={targetStr}
          onChangeTargetStr={setTargetStr}
          reminderEnabled={reminderEnabled}
          onChangeReminderEnabled={changeReminderEnabled}
          reminderFields={reminderFields}
          onAddReminderTime={addReminderTime}
          onRemoveReminderTime={removeReminderTime}
          onChangeReminderHourStr={changeReminderHourStr}
          onChangeReminderMinuteStr={changeReminderMinuteStr}
          onBlurReminderHour={blurReminderHour}
          onBlurReminderMinute={blurReminderMinute}
          reminderWeekdays={reminderWeekdays}
          onToggleReminderWeekday={toggleReminderWeekday}
          onSave={submitNewHabit}
          entrancePlayKey={entranceKey}
        />
      </AddHabitScreenScroll>
    </AddHabitScreenFrame>
  );
};
