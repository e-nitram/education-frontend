import { Box, Heading, Text } from '@chakra-ui/react';
import Image, { StaticImageData } from 'next/image';
import React, { FC } from 'react';

import { primary } from '@/theme';

import style from './index.module.css';
type IProps = {
  content: string;
  width?: string;
  height?: string;
  stepNumber: number;
  icon: StaticImageData;
  navModal?: boolean;
  navType?: string;
};
const Step: FC<IProps> = ({
  content,
  stepNumber,
  icon,
  navModal = false,
  width,
  height,
  navType,
}): JSX.Element => {
  return (
    <Box className={style.root} pt={primary.home.howItWorks.stepsPT}>
      <div className={style.iconWrapper}>
        <div
          className={
            navModal ? style.navStepIconContainer : style.stepIconContainer
          }
        >
          <Image
            style={{
              width: width ?? width,
              height: height ?? height,
            }}
            className={navModal ? style.stepIconsColor : ''}
            src={icon}
            alt='edu-user'
            width={0}
            height={0}
          />
        </div>
        <Heading
          fontFamily={primary.fonts.ED.primary}
          fontSize='22px'
          lineHeight='30px'
          fontWeight='semibold'
          pt={primary.home.howItWorks.stepHeadingPT}
          color={
            navModal && navType == 'primary'
              ? primary.colors.ED.primary
              : navModal && navType == 'secondry'
                ? primary.colors.ED.white
                : primary.colors.ED.primary
          }
        >
          {' '}
          Step {stepNumber}
        </Heading>
      </div>
      <Text
        pt={primary.home.howItWorks.textPT}
        fontFamily={primary.fonts.ED.primary}
        fontSize='16px'
        lineHeight='26px'
        fontWeight='normal'
        textAlign='center'
        color={
          navModal && navType == 'primary'
            ? primary.colors.ED.primary
            : navModal && navType == 'secondry'
              ? primary.colors.ED.white
              : primary.colors.ED.primary
        }
      >
        {content}
      </Text>
    </Box>
  );
};
export default Step;
