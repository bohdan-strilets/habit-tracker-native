export type HomeScreenHeaderProps = {
  greeting: string;
  userName: string;
  /** Onboarding “main focus” line; omitted when not set. */
  focusLine?: string;
  dateLine: string;
  globalStreak: number;
  /** When false, streak badge is hidden (e.g. no habits yet). */
  showStreak?: boolean;
  onOutsidePress?: () => void;
};
