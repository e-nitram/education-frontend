import { Box, BoxProps } from '@chakra-ui/react';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';

import defaultCheckbox from '@/assets/icons/checkbox.svg';
import checkboxCheckedSvg from '@/assets/icons/checked.svg';
import defaultWhiteCheckbox from '@/assets/icons/whiteCheckbox.svg';

import styles from './index.module.css';

interface CheckboxProps {
  as?: React.ElementType;
}
interface IProps extends BoxProps {
  selectedProgram?: boolean | undefined;
  changeHandler?: (checked: boolean) => void;
  round?: boolean;
  bordered?: boolean;
  white?: boolean;
}
const TermsCheckbox: FC<IProps & CheckboxProps> = ({
  changeHandler,
  selectedProgram = false,
  round = false,
  bordered = false,
  white = false,
  ...rest
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (selectedProgram) setChecked(true);
  }, [selectedProgram]);

  const handleChange = () => {
    setChecked(!checked);
    if (changeHandler) changeHandler(!checked);
  };

  return (
    <Box
      data-testid='tcpa_disclosure_checkbox'
      className={round ? styles.roundedCheckbox : styles.checkbox}
      onClick={handleChange}
      {...rest}
    >
      {checked ? (
        <Image
          loading='lazy'
          src={checkboxCheckedSvg}
          className={round ? styles.roundedImgClass : ''}
          alt='edu-checkbox'
          style={{ maxWidth: 'inherit' }}
        />
      ) : (
        <Image
          loading='lazy'
          src={white ? defaultWhiteCheckbox : defaultCheckbox}
          className={round ? styles.roundedImgClass : ''}
          alt='edu-checkbox'
          style={{
            maxWidth: 'inherit',
            ...(bordered
              ? { border: '1px solid rgba(22,22,22,0.25)', borderRadius: '4px' }
              : {}),
          }}
        />
      )}
    </Box>
  );
};

export default TermsCheckbox;
