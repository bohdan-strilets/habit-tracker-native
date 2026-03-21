export type HomeScreenHeaderProps = {
  greeting: string;
  userName: string;
  dateLine: string;
  globalStreak: number;
  /** When false, streak badge is hidden (e.g. no habits yet). */
  showStreak?: boolean;
  onOutsidePress?: () => void;
};
