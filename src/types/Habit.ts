export type Habit = {
  id: string;
  title: string;
  logs: { date: string; completed: boolean }[];
};
