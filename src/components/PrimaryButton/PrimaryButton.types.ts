export type PrimaryButtonVariant = 'primary' | 'danger';

export type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: PrimaryButtonVariant;
};
