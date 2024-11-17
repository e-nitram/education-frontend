import { Box, BoxProps } from '@chakra-ui/react';
import Image, { StaticImageData } from 'next/image';
import React, { FC } from 'react';

import factorialSvg from '@/assets/icons/factorial.svg';

import styles from './index.module.css';

interface InputProps {
  as?: React.ElementType;
}
interface IProps extends BoxProps {
  type: 'email' | 'number' | 'text' | 'tel';
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: StaticImageData;
  value?: string;
  endIcon?: StaticImageData;
  onBlur?: () => void;
  isInvalid?: boolean;
  isEmail?: boolean;
  maxLength?: number;
  ref?: any;
}

const Input: FC<IProps & InputProps> = (props): JSX.Element => {
  const { inputWithIcon, inputText, invalidClass } = styles;
  const {
    type,
    placeholder,
    icon,
    value,
    onChange,
    endIcon,
    onBlur,
    isInvalid = false,
    bg,
    color,
    maxLength,
    ref,
    ...rest
  } = props;

  return (
    <Box className={inputWithIcon} {...rest}>
      <Box className={styles.iconWrapper}>
        <Image
          src={isInvalid ? factorialSvg : icon}
          loading='lazy'
          width='0'
          height='0'
          sizes='100%'
          className={styles.imgIconClass}
          alt={placeholder}
        />
      </Box>
      <input
        ref={ref}
        className={`${inputText} ${isInvalid ? invalidClass : ''}`}
        type={type}
        autoComplete='on'
        value={value}
        maxLength={maxLength !== undefined ? maxLength : 1000}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        onBlur={onBlur}
        style={{
          border: `${isInvalid ? '1px solid red' : 'none'}`,
          background: bg !== undefined ? `${bg}` : 'var(--light)',
          color:
            color !== undefined
              ? `${color}`
              : isInvalid
              ? 'red'
              : 'var(--primary)',
        }}
      />
      {endIcon ? (
        <Box className={styles.endIconWrapper}>
          <Image
            src={endIcon}
            loading='lazy'
            width='0'
            height='0'
            sizes='100%'
            className={styles.imgIconClass}
            alt={placeholder}
          />
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};

export default Input;
