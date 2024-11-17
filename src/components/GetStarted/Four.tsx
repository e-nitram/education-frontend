/* eslint-disable @typescript-eslint/indent */
import { Box, Button, Stack, Text, useMediaQuery } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '@/context/AppContext';

import { stepFour } from '@/appConstants';
import scholarshipSvg from '@/assets/icons/scholarship.svg';
import { primary } from '@/theme';

import Loading from '../Loading';
import Select from '../Select';

import style from './index.module.css';

const { step_wrapper_body } = style;

interface OptionType {
  title: string;
  value: string;
}

const Four = () => {
  const { stepsData, setStepsData, deviceType } = useContext(AppContext);
  const [isValidate, setIsValidate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setSelectedLicience] = useState('');
  const [isMobile] = useMediaQuery(`(max-width: ${primary.breakpoints[1]})`);
  const { current_education_level, hsyear, rn_license } = stepsData;

  const licienceFields = ['Nursing', 'Education & Teaching'];

  useEffect(() => {
    return () => {
      setIsValidate(false);
    };
  }, []);

  const data: any = stepsData;
  const showLicenses: boolean = data.areas_of_interest.some((areas: string) =>
    licienceFields.includes(areas),
  );

  const disabled =
    current_education_level?.length > 0 &&
    hsyear?.length > 0 &&
    (showLicenses ? rn_license.length > 0 : true)
      ? false
      : true;

  const isEducation: boolean = data.areas_of_interest.includes(
    'Education & Teaching',
  );
  const isNursing: boolean = data.areas_of_interest.includes('Nursing');

  return (
    <Stack className='step-wrapper' mt={['110px', '110px', '26px', '52px']}>
      <Text
        fontSize={`${deviceType === 'Mobile' ? '3xl' : '4xl'}`}
        fontWeight='600'
        fontFamily='IBM Plex Sans'
        align='center'
        color='ED.primary'
        pb={['0px', '16px', '16px', '16px']}
      >
        {stepFour.heading}
      </Text>
      <Text
        fontSize='md'
        fontWeight='400'
        fontFamily='IBM Plex Sans'
        align='center'
        mt='0 !important'
        color='ED.dark'
      >
        {stepFour.subHeading}
      </Text>
      <Box
        mt={[
          '16px !important',
          '52px !important',
          '52px !important',
          '52px !important',
        ]}
        className={step_wrapper_body}
      >
        {stepFour.dropDown.map((obj, i) => (
          <div className='select-wrapper' key={`st-${i}`}>
            {obj.key == 'license' ? (
              (data.areas_of_interest?.some((interest: string) =>
                licienceFields.includes(interest),
              ) as boolean) ? (
                <>
                  <Text
                    fontSize='md'
                    fontWeight='500'
                    mb='2'
                    textAlign='center'
                  >
                    Select license
                  </Text>
                  <Select
                    h='48px'
                    bg={
                      isMobile
                        ? primary.colors.ED.white
                        : primary.colors.ED.light
                    }
                    icon={scholarshipSvg}
                    placeholder={obj.placeholder}
                    isInvalid={
                      isValidate
                        ? data.teaching_certificate.length > 0 &&
                          data.rn_license.length > 0
                          ? false
                          : true
                        : false
                    }
                    selectedOptions={{
                      title:
                        stepsData.rn_license == 'Yes' &&
                        stepsData.teaching_certificate == 'Yes'
                          ? 'Both'
                          : stepsData.rn_license == 'Yes' &&
                              stepsData.teaching_certificate == 'No'
                            ? 'RN License'
                            : stepsData.rn_license == 'No' &&
                                stepsData.teaching_certificate == 'Yes'
                              ? 'Teaching Certificate'
                              : stepsData.rn_license == 'No' &&
                                  stepsData.teaching_certificate == 'No' &&
                                  isNursing &&
                                  isEducation
                                ? 'None'
                                : 'No',
                    }}
                    options={
                      [
                        isNursing && {
                          title: 'RN License',
                          value: 'RN License',
                        },
                        isEducation && {
                          title: 'Teaching Certificate',
                          value: 'Teaching Certificate',
                        },
                        isNursing &&
                          isEducation && { title: 'Both', value: 'Both' },
                        {
                          title: isNursing && isEducation ? 'None' : 'No',
                          value: isNursing && isEducation ? 'None' : 'No',
                        },
                      ].filter(Boolean) as OptionType[]
                    }
                    onSelect={({ value }) => {
                      if (value === '')
                        setStepsData({
                          ...stepsData,
                          teaching_certificate: '',
                          rn_license: '',
                        });
                      if (value === 'No')
                        setStepsData({
                          ...stepsData,
                          teaching_certificate: 'No',
                          rn_license: 'No',
                        });
                      if (value === 'None')
                        setStepsData({
                          ...stepsData,
                          teaching_certificate: 'No',
                          rn_license: 'No',
                        });
                      if (value === 'Both')
                        setStepsData({
                          ...stepsData,
                          teaching_certificate: 'Yes',
                          rn_license: 'Yes',
                        });
                      if (value === 'RN License')
                        setStepsData({
                          ...stepsData,
                          teaching_certificate: 'No',
                          rn_license: 'Yes',
                        });
                      if (value === 'Teaching Certificate')
                        setStepsData({
                          ...stepsData,
                          teaching_certificate: 'Yes',
                          rn_license: 'No',
                        });
                      setSelectedLicience(value);
                    }}
                  />
                </>
              ) : null
            ) : (
              <>
                <h3 style={{ textAlign: 'center' }}>{obj.placeholder}</h3>
                <Select
                  icon={scholarshipSvg}
                  bg={
                    isMobile ? primary.colors.ED.white : primary.colors.ED.light
                  }
                  placeholder={obj.placeholder}
                  selectedOptions={{
                    title: data[obj.key],
                  }}
                  isInvalid={
                    isValidate
                      ? data[obj.key].length > 0
                        ? false
                        : true
                      : false
                  }
                  options={obj.options}
                  onSelect={({ value }) =>
                    setStepsData({ ...stepsData, [obj.key]: value })
                  }
                />
              </>
            )}
          </div>
        ))}
      </Box>
      <Stack
        spacing='3'
        mb={['10%', '10%', '10%', '2%']}
        className='step-wrapper-footer'
      >
        <Button
          data-testid='step4-next-btn'
          id='form-get-started-step-4-fwd'
          bg='ED.primary'
          color='ED.white'
          borderRadius='26'
          w='290px'
          h='52px'
          fontFamily='IBM Plex Sans'
          fontSize='xl'
          fontWeight='600'
          _hover={{ background: 'ED.primary' }}
          className={`${loading ? 'cursor-disabled' : ''}`}
          onClick={async () => {
            if (disabled) {
              setIsValidate(true);
              return;
            }
            setLoading(true);
            setStepsData({ ...stepsData, current: 3 });
            !disabled &&
              setStepsData({
                ...stepsData,
                areas_of_interest: [
                  ...stepsData.areas_of_interest.filter(
                    (val: string) => val !== 'selectall',
                  ),
                ],
                current: 5,
              });
            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {loading ? <Loading height='32px' color='white' /> : 'Next step'}
        </Button>
        <Box
          id='form-get-started-step-4-back'
          fontSize='xs'
          fontWeight='400'
          fontFamily='IBM Plex Sans'
          color='ED.fontColorLightGray'
          className='text-center'
          role='button'
          _hover={{ color: 'ED.fontColorDark', textDecoration: 'underLine' }}
          onClick={() => {
            setStepsData({ ...stepsData, current: 3 });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Previous step
        </Box>
      </Stack>
    </Stack>
  );
};

export default Four;
