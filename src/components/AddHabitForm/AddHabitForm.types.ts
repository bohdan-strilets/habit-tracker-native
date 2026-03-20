export type AddHabitFormProps = {
  title: string;
  onChangeTitle: (text: string) => void;
  onSave: () => void;
  /** Bump to replay entrance animations (e.g. on screen focus). */
  entrancePlayKey?: number;
};
