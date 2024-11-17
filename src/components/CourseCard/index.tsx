import { Box, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react';

import { AppContext } from '@/context/AppContext';

import { stepFour } from '@/appConstants';
import scholarshipSvg from '@/assets/icons/scholarship.svg';
import { primary } from '@/theme';
import { openInNewTab } from '@/utils';

import Select from '../Select';

const CoursesForm: FC = () => {
  const { stepsData, setStepsData, programSlug } = useContext(AppContext);
  const router = useRouter();
  const [isDisabled] = useState(false as boolean);
  const [, setIsOptionChange] = useState(false as boolean);
  const [validateFields, setValidateFields] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    title: '',
  });

  const getStartedHandler = async () => {
    // if (isOptionChange == false) {
    //   await setStepsData({ ...stepsData, areas_of_interest: [router.query.interest] });
    // };
    const isNextStepEnabled =
      stepsData.areas_of_interest.length > 0 &&
      stepsData.current_education_level.length > 0 &&
      stepsData.hsyear.length > 0;
    if (isNextStepEnabled) {
      openInNewTab('/get-started');
      return;
    }
    setValidateFields(true);
  };

  const data: any = stepsData;

  useEffect(() => {
    // Reset the form validation state
    setValidateFields(false);
  }, [router]);

  useEffect(() => {
    const selectedOption = programSlug?.find(
      (p) => p.slug === stepsData?.areas_of_interest[0],
    )?.title;
    if (selectedOption !== undefined)
      setSelectedOption({ title: selectedOption });
  }, [programSlug, router, stepsData?.areas_of_interest]);
  return (
    <>
      <Box
        pt={primary.cardSizes.pt}
        m='auto'
        w={primary.aoi.overview.card.formW}
      >
        <Box w='100%'>
          <Select
            h='48px'
            icon={scholarshipSvg}
            onSelect={({ value }) => {
              setStepsData({ ...stepsData, areas_of_interest: [value] });
              setIsOptionChange(true);
              const selectedOption =
                programSlug?.find((p) => p.slug === value)?.title ?? '';
              setSelectedOption({ title: selectedOption });
            }}
            isInvalid={
              validateFields &&
              stepsData.areas_of_interest?.filter((item) => item !== '')
                ?.length == 0
            }
            placeholder='Select interest'
            selectedOptions={selectedOption}
            options={programSlug?.map((p) => ({
              title: p.title,
              value: p.slug,
            }))}
          />
        </Box>

        {stepFour.dropDown.slice(0, 2)?.map((obj, i) => (
          <Box pt={['16px', '16px', '14px', '14px']} key={`st-${i}`}>
            <Select
              h='48px'
              icon={scholarshipSvg}
              isInvalid={validateFields && stepsData[obj.key]?.length == 0}
              placeholder={obj.placeholder}
              selectedOptions={{
                title: data[obj.key],
              }}
              options={obj.options}
              onSelect={({ value }) => {
                setStepsData({ ...stepsData, [obj.key]: value });
              }}
            />
          </Box>
        ))}

        <Box className='margin-auto' pt={primary.cardSizes.pt}>
          {/* <a href="/get-started" target='_blank'> */}
          <Button
            bg='ED.secondary'
            color='ED.white'
            borderRadius='26'
            h='52px'
            w='100%'
            m='auto'
            display='block'
            maxW={['214px', '214px', '290px', '290px']}
            fontSize='22px'
            lineHeight='30px'
            fontWeight='semibold'
            fontFamily='IBM Plex Sans'
            _hover={{ background: 'ED.secondary' }}
            onClick={() => getStartedHandler()}
            disabled={isDisabled}
            className={`${isDisabled && 'cursor-disabled'}`}
          >
            Get Started
          </Button>
          {/* </a> */}
        </Box>
        <Text
          className='text-center text-dark'
          fontSize='12px'
          lineHeight='22px'
          fontWeight='normal'
          pt={['10px', '10px', '11px', '11px']}
        >
          Usually takes less than 3 minutes to get results
        </Text>
      </Box>
    </>
  );
};

export default CoursesForm;
