import { AddHabitForm } from '../components/AddHabitForm';
import { AddHabitScreenFrame } from '../components/AddHabitScreenFrame';
import { AddHabitScreenScroll } from '../components/AddHabitScreenScroll';
import { useEditHabitScreen } from '../hooks/useEditHabitScreen';

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
          onSave={submitUpdate}
          entrancePlayKey={entranceKey}
        />
      </AddHabitScreenScroll>
    </AddHabitScreenFrame>
  );
};
