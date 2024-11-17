import { Box, BoxProps, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React, { FC } from 'react';

import tickSvg from '@/assets/icons/tick.svg';
import { primary } from '@/theme';

import style from './index.module.css';

interface IProps extends BoxProps {
  readonly name: string;
  readonly icon: any;
  readonly checked?: boolean;
  readonly clickHandler?: () => void;
}
interface CheckBoxProps {
  as?: React.ElementType;
}

const Checkbox: FC<IProps & CheckBoxProps> = ({
  clickHandler,
  checked = false,
  icon,
  name,
  ...rest
}): JSX.Element => {
  const { fontSizes } = primary;
  return (
    <Box
      onClick={clickHandler}
      data-testid='checkbox'
      bg={primary.colors.ED.light}
      {...rest}
      className={checked ? style.activeCheckbox : style.defaultCheckbox}
    >
      <Box className='relative pl-1 pr-3'>
        <Box className={checked ? style.activeIcon : style.defaultIcon}>
          <Text className={style.defaultIconWrapper}>
            <Image
              src={checked ? tickSvg : icon}
              width='0'
              height='0'
              sizes='100%'
              className={style.defaultImgClass}
              alt='edu-icon'
            />
          </Text>
        </Box>
      </Box>
      <Box
        data-testid='checkbox-text'
        className='text-base'
        fontSize={fontSizes.paragraphFont}
        lineHeight={fontSizes.paragraphLineHeight}
      >
        {name}
      </Box>
    </Box>
  );
};

export default Checkbox;
