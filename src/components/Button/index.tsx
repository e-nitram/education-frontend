import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';
import React, { FC } from 'react';

interface CustomButtonProps {
  as?: React.ElementType;
}
type IProps = ButtonProps;

const Button: FC<IProps & CustomButtonProps> = ({ ...rest }) => {
  const buttonProps = rest as Omit<ButtonProps, keyof CustomButtonProps>;
  return <ChakraButton {...buttonProps} />;
};

export default Button;
