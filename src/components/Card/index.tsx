import { Box, BoxProps } from '@chakra-ui/react';
import React, { FC } from 'react';

import style from './index.module.css';

interface IProps extends BoxProps {
  bgColor?: string;
}
interface CardProps {
  as?: React.ElementType;
}

const Card: FC<IProps & CardProps> = ({
  children,
  bgColor = 'white',
  ...rest
}): JSX.Element => {
  return (
    <Box {...rest} className={`bg-${bgColor} ${style.card}`}>
      {children}
    </Box>
  );
};

export default Card;
