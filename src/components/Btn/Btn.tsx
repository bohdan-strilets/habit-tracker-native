import { Button, ButtonProps } from 'react-native';

export type Props = ButtonProps;

export const Btn = ({ ...props }: Props) => {
  return <Button {...props} />;
};
