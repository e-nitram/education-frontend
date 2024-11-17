import { Box, Button, Checkbox, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';

import Loading from '@/components/Loading';

import { AppContext } from '@/context/AppContext';

import { intrestedSubjectArea } from '@/appConstants';
import updateLead from '@/pages/api/leads/update';

import styles from '../../pages/landing-page/index.module.css';
const { step_form, step_form_checkbox, step_form_checkbox_box, form_stack } =
  styles;

const Four: FC = (): JSX.Element => {
  const { setStepsData, stepsData, leadData } = useContext(AppContext);
  const isTeachingRef = useRef<null | HTMLDivElement>(null);
  const [leadUpdating, setLeadUpdating] = useState(false);

  const handleSelectAll = () => {
    const updatedInterests: string[] = intrestedSubjectArea.map((e) => e.value);
    setStepsData({ ...stepsData, areas_of_interest: updatedInterests });
  };

  const handleDeSelectAll = () => {
    setStepsData({ ...stepsData, areas_of_interest: [] });
  };

  /**
   * Checks if all items in `interestedSubjectArea` are included in `stepsData.areas_of_interest`.
   * @return {boolean} Returns `true` if all items in `interestedSubjectArea` are included in `stepsData.areas_of_interest`, otherwise `false`.
   */
  const areAllSelected = (): boolean => {
    const selectedValues = intrestedSubjectArea.map((item) => item.value);
    return selectedValues.every((value) =>
      stepsData.areas_of_interest.includes(value),
    );
  };

  const handleCheckboxClick = async (item: string) => {
    let updatedInterests: string[] = stepsData.areas_of_interest;

    if (updatedInterests.includes(item)) {
      const newCheckItems = updatedInterests?.filter((i: string) => i !== item);
      updatedInterests = [...newCheckItems];
    } else {
      updatedInterests.push(item);
    }
    const teaching_certificate = updatedInterests?.includes(
      'Education & Liberal Arts',
    )
      ? 'Yes'
      : 'No';
    const rn_license = updatedInterests?.includes('Nursing') ? 'Yes' : 'No';

    setStepsData({
      ...stepsData,
      areas_of_interest: updatedInterests,
      teaching_certificate,
      rn_license,
    });
  };

  useEffect(() => {
    isTeachingRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <Stack data-testid='whiteG-step-4' ref={isTeachingRef}>
      <Box>
        <Stack className={form_stack} mt='71'>
          <Box textAlign='center' className={step_form}>
            <Box>
              <Image
                src='https://educationdirectory.org/white_g/images/questions/23_rank.png?v=1'
                loading='lazy'
                width='48'
                height='48'
                sizes='100%'
                style={{ margin: 'auto' }}
                className={styles.imgIconClass}
                alt='icon'
              />
            </Box>
            <Text
              py='20px'
              data-testid='question'
              fontSize='1.25rem'
              fontWeight='600'
              fontFamily='IBM Plex Sans'
              color='ED.dark'
            >
              Select Subject Areas:
            </Text>
            <Box textAlign='left' py='4'>
              {areAllSelected() ? (
                <Button
                  data-testid='selectAll'
                  _hover={{ background: 'ED.primary' }}
                  bg='ED.primary'
                  color='ED.white'
                  onClick={handleDeSelectAll}
                >
                  Deselect All
                </Button>
              ) : (
                <Button
                  data-testid='selectAll'
                  _hover={{ background: 'ED.primary' }}
                  bg='ED.primary'
                  color='ED.white'
                  onClick={handleSelectAll}
                >
                  Select All
                </Button>
              )}
            </Box>

            <Stack data-testid='checkboxs' spacing={5} direction='column'>
              {intrestedSubjectArea?.map((item, index) => {
                return (
                  <Checkbox
                    key={item.title + +index}
                    id={`area_${item.title}`}
                    size='lg'
                    iconSize='2rem'
                    className={step_form_checkbox}
                    name={item.value}
                    isChecked={
                      stepsData.areas_of_interest.includes(item.value)
                        ? true
                        : false
                    }
                    onChange={() => handleCheckboxClick(item.value)}
                  >
                    <Box className={step_form_checkbox_box}>
                      <Box textAlign='left'>{item.title}</Box>
                      {stepsData.areas_of_interest?.find(
                        (i: string) => i === item.value,
                      ) != null ? (
                        <Box color='ED.primary' bg='ED.brightGray' px='10px'>
                          deselect
                        </Box>
                      ) : null}
                    </Box>
                  </Checkbox>
                );
              })}
            </Stack>
          </Box>

          <Box className={step_form}>
            <Button
              data-testid='next'
              w='100%'
              h='52px'
              _hover={{ background: 'ED.primary' }}
              bg='ED.primary'
              color='ED.white'
              id='form-whiteg-step-4-fwd'
              onClick={async () => {
                setLeadUpdating(true);
                const locl = localStorage.getItem('leadRes');
                const localparse = locl !== null ? JSON.parse(locl) : leadData;
                const sortedInterests = stepsData.areas_of_interest?.sort();
                await updateLead(
                  'qualification',
                  localparse?.qualification?.qualification_id,
                  {
                    level_of_interest: sortedInterests,
                  },
                );
                setStepsData({ ...stepsData, current: 5 });
                setLeadUpdating(false);
              }}
            >
              {leadUpdating ? (
                <Loading height='32px' color='white' />
              ) : (
                'Continue'
              )}
            </Button>
            <Box
              mt='20px'
              fontSize='xs'
              fontWeight='400'
              fontFamily='IBM Plex Sans'
              color='ED.primary'
              textAlign='left'
              role='button'
              _hover={{
                color: 'ED.fontColorDark',
                textDecoration: 'underLine',
              }}
              onClick={() => setStepsData({ ...stepsData, current: 3 })}
            >
              <span>«</span> Back
            </Box>
          </Box>
          <Box className={step_form}>
            <Text
              fontSize='s'
              fontWeight='400'
              fontFamily='IBM Plex Sans'
              color='ED.lightGray'
            >
              Education Directory is dedicated to connecting you with schools
              and degrees to meet your education goals & objectives. We will
              connect you with admissions representatives who will discuss
              programs of your choosing.
            </Text>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Four;
