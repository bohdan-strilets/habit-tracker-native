export type Log = {
  date: string;
  completed: boolean;
};

export type Habit = {
  id: string;
  title: string;
  logs: Log[];
  createdAt?: string;
};
