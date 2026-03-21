import { AddHabitForm } from '@components/AddHabitForm';
import { AddHabitScreenFrame } from '@components/AddHabitScreenFrame';
import { AddHabitScreenScroll } from '@components/AddHabitScreenScroll';
import { useEditHabitScreen } from '@hooks/useEditHabitScreen';

export const EditHabitScreen = () => {
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
    submitUpdate,
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
  } = useEditHabitScreen();

  return (
    <AddHabitScreenFrame>
      <AddHabitScreenScroll>
        <AddHabitForm
          formMode="edit"
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
          onSave={submitUpdate}
          entrancePlayKey={entranceKey}
        />
      </AddHabitScreenScroll>
    </AddHabitScreenFrame>
  );
};
