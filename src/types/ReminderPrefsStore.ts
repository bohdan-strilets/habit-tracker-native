export type ReminderPrefsState = {
  allDisabled: boolean;
  unifiedEnabled: boolean;
  unifiedHour: number;
  unifiedMinute: number;
};

export type ReminderPrefsStore = ReminderPrefsState & {
  setAllDisabled: (value: boolean) => void;
  setUnifiedEnabled: (value: boolean) => void;
  setUnifiedTime: (hour: number, minute: number) => void;
};
