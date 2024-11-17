import { Box, Button, Stack, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';

import { AppContext } from '@/context/AppContext';

import { stepThree } from '@/appConstants';
import { primary } from '@/theme';

import Checkbox from '../Checkbox';
import Loading from '../Loading';

import styles from '@/components/Institutes/index.module.css';

const { interestsMasonryContainer, interestsMasonryItem } = styles;

const Three = () => {
  const [isValidate, setIsValidate] = useState(false);
  const { stepsData, setStepsData } = useContext(AppContext);
  const nextStep = stepsData?.areas_of_interest?.length !== 0;
  const [loading, setLoading] = useState(false);

  const handleClick = (item: any) => {
    if (item.value === 'selectall') {
      const { areas_of_interest } = stepsData;
      if (areas_of_interest.includes('selectall')) {
        setStepsData({
          ...stepsData,
          areas_of_interest: [],
        });
      } else {
        setStepsData({
          ...stepsData,
          areas_of_interest: [...stepThree.options.map((e) => e.value)],
        });
      }
    } else {
      if (stepsData.areas_of_interest.includes(item.value)) {
        setStepsData({
          ...stepsData,
          areas_of_interest: [
            ...stepsData.areas_of_interest.filter(
              (val: string) => val !== item.value && val !== 'selectall',
            ),
          ],
        });
      } else {
        stepsData.areas_of_interest.push(item.value);
        if (
          stepThree.options.length - 1 ===
          stepsData.areas_of_interest.length
        ) {
          stepsData.areas_of_interest.push('selectall');
          setStepsData({
            ...stepsData,
            areas_of_interest: stepsData.areas_of_interest,
          });
        } else {
          setStepsData({
            ...stepsData,
            areas_of_interest: stepsData.areas_of_interest,
          });
        }
      }
    }
    setIsValidate(false);
  };
  function sortByTitle(options: any[]) {
    const sortedOptions = [...options].sort((a, b) =>
      a.title.localeCompare(b.title),
    );
    const selectAllOption = sortedOptions.find(
      (option) => option.title === 'Select All',
    );
    return [
      selectAllOption,
      ...sortedOptions.filter((option) => option !== selectAllOption),
    ];
  }

  const options = sortByTitle(stepThree.options);

  return (
    <Stack
      className='step-wrapper'
      gap={['0', '0', 'unset', 'unset']}
      mt={['110px', '110px', '52px', '52px']}
      pb='22px'
    >
      <Text
        fontSize={['22px', '22px', '36px', '36px']}
        fontWeight='600'
        fontFamily='IBM Plex Sans'
        align='center'
        className='primaryContainer'
        lineHeight={['30px', '30px', '46px', '46px']}
        color='ED.primary'
        pb='16px'
      >
        {stepThree.heading}
      </Text>

      <Text
        fontSize='md'
        fontWeight={isValidate ? '500' : '400'}
        fontFamily='IBM Plex Sans'
        align='center'
        mt='0 !important'
        color={isValidate ? primary.colors.ED.danger : primary.colors.ED.dark}
      >
        {stepThree.subHeading}
      </Text>
      <Box
        pos='relative'
        h={['24rem', 'auto', 'auto', '24rem']}
        overflowY='auto'
        mt={[
          '26px !important',
          '26px !important',
          '26px !important',
          '52px !important',
        ]}
      >
        <Box maxW='100%' className={interestsMasonryContainer}>
          {options?.map((item, idx) => {
            return (
              <Box
                key={idx}
                className={interestsMasonryItem}
                w={['338px', '338px', '100%', '100%']}
              >
                <Checkbox
                  id={`${item.name}`}
                  bg={[
                    primary.colors.ED.white,
                    primary.colors.ED.white,
                    primary.colors.ED.light,
                    primary.colors.ED.light,
                  ]}
                  color={primary.colors.ED.primary}
                  h={primary.home.hero.card.optionBoxH}
                  clickHandler={() => {
                    handleClick(item);
                  }}
                  name={item?.title}
                  icon={item?.icon}
                  checked={
                    stepsData?.areas_of_interest?.includes(item?.value)
                      ? true
                      : false
                  }
                />
              </Box>
            );
          })}
        </Box>
      </Box>

      <Stack
        spacing='3'
        mt={['16px', '26px', '52px', '52px']}
        mb='22px !important'
        className='step-wrapper-footer'
      >
        <Button
          data-testid='step3-next-btn'
          id='form-get-started-step-3-fwd'
          bg='ED.primary'
          color='ED.white'
          borderRadius='26'
          w='290px'
          h='52px'
          fontFamily='IBM Plex Sans'
          fontSize='22px'
          lineHeight='30px'
          fontWeight='600'
          _hover={{ background: 'ED.primary' }}
          onClick={async () => {
            if (!nextStep) {
              setIsValidate(true);
              return;
            }
            setLoading(true);
            nextStep && setStepsData({ ...stepsData, current: 4 });
            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {loading ? <Loading height='32px' color='white' /> : 'Next step'}
        </Button>
        <Box
          id='form-get-started-step-3-back'
          fontSize='14px'
          lineHeight='26px'
          fontWeight='400'
          fontFamily='IBM Plex Sans'
          color='ED.fontColorLightGray'
          className='text-center'
          role='button'
          _hover={{ color: 'ED.fontColorDark', textDecoration: 'underLine' }}
          onClick={() => {
            stepsData.online_or_campus?.length > 0 &&
              setStepsData({ ...stepsData, current: 2 });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Previous step
        </Box>
      </Stack>
    </Stack>
  );
};

export default Three;
