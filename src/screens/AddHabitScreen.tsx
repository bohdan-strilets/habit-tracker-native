import { AddHabitForm } from '../components/AddHabitForm';
import { AddHabitScreenFrame } from '../components/AddHabitScreenFrame';
import { AddHabitScreenScroll } from '../components/AddHabitScreenScroll';
import { useAddHabitScreen } from '../hooks/useAddHabitScreen';

export const AddHabitScreen = () => {
  const { title, setTitle, entranceKey, submitNewHabit } = useAddHabitScreen();

  return (
    <AddHabitScreenFrame>
      <AddHabitScreenScroll>
        <AddHabitForm
          title={title}
          onChangeTitle={setTitle}
          onSave={submitNewHabit}
          entrancePlayKey={entranceKey}
        />
      </AddHabitScreenScroll>
    </AddHabitScreenFrame>
  );
};
