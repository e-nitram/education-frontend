import { Box, Flex, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

import { ProgressBar } from '@/assets/icons';
import ProgressBarTick from '@/assets/icons/ProgressIcon.svg';

import style from './index.module.css';

interface IProps {
  width: any;
  height: number;
  color: string;
  type: string;
}

const {
  progress_container,
  progress_forground,
  iconProgress,
  progressStep__applyColor,
  progress_tick_icon,
} = style;

const ProgressBarNew = ({ width, height, color, type }: IProps) => {
  return (
    <>
      <Stack w='100%' className={progress_container}>
        <Flex className='progress_background'>
          <Box
            w='100%'
            h={`${height}px`}
            borderRadius='8px'
            bg='ED.brightGray'
            mr='8px'
            className='progress_tile'
          ></Box>
        </Flex>
        <Flex
          mt='0 !important'
          className={progress_forground}
          style={{ width: `${width}%` }}
        >
          <Box
            minW='100%'
            h={`${height}px`}
            borderRadius='8px'
            bg={`ED.${type}`}
            mr='8px'
            className='progress_tile'
          ></Box>
        </Flex>
        <Flex
          style={{ width: `${width}%` }}
          mt='0 !important'
          justifyContent='flex-end'
          className={progressStep__applyColor}
        >
          {type === 'primary' ? (
            <>
              <Image
                src={ProgressBarTick}
                alt=''
                className={progress_tick_icon}
              />
            </>
          ) : (
            <>
              <Box className={iconProgress}>
                <ProgressBar colour={`${color}`} />
              </Box>
            </>
          )}
        </Flex>
      </Stack>
    </>
  );
};

export default ProgressBarNew;
