import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FC, useContext, useEffect, useRef, useState } from 'react';

import { AppContext } from '@/context/AppContext';

import { generateYears, stepTwo } from '@/appConstants';
import scholarship from '@/assets/images/1_school.png';
import newSchool from '@/assets/images/2_new.png';
import child from '@/assets/images/5_age.png';
import graduate from '@/assets/images/7_graduate.png';
import enroll from '@/assets/images/8_enroll.png';
import { getDeviceType } from '@/utils';

import styles from '../../pages/landing-page/index.module.css';

const { form_select, step_form, step_radio_btn, form_stack } = styles;
const numbers: any = [];
for (let i = 15; i <= 65; i++) {
  numbers.push({ title: i, value: i });
}

const Two: FC = (): JSX.Element => {
  const inSchoolRef = useRef<null | HTMLDivElement>(null);
  const schoolToAttendRef = useRef<null | HTMLDivElement>(null);
  const hsyearRef = useRef<null | HTMLDivElement>(null);
  const enrolledInSchooRef = useRef<null | HTMLDivElement>(null);
  const { stepsData, setStepsData } = useContext(AppContext);
  const [inSchool, setInSchool] = useState('');
  const [schoolToAttend, setSchoolToAttend] = useState('');

  useEffect(() => {
    if (inSchool === '1') {
      setStepsData({ ...stepsData, currently_enrolled_in_college: 'Yes' });
    } else if (inSchool === '2') {
      setStepsData({
        ...stepsData,
        currently_enrolled_in_college: 'No',
        school_to_attend: '',
      });
    }

    if (getDeviceType() === 'Desktop') {
      if (inSchool === '1') {
        inSchoolRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (inSchool === '2') {
        window.scrollBy(100, 0);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inSchool, setStepsData]);

  useEffect(() => {
    if (schoolToAttend === '1') {
      setStepsData({ ...stepsData, school_to_attend: 'Yes' });
    } else if (schoolToAttend === '2') {
      setStepsData({ ...stepsData, school_to_attend: 'No' });
    }

    if (getDeviceType() === 'Desktop') {
      if (schoolToAttend === '1') {
        schoolToAttendRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolToAttend, setStepsData]);

  return (
    <Stack data-testid='whiteG-step-2'>
      <Box>
        <Stack className={form_stack} mt='71'>
          <Box textAlign='center' className={step_form}>
            <RadioGroup
              defaultValue={
                stepsData.currently_enrolled_in_college == 'Yes' ? '1' : '2'
              }
              id='in-school'
              onChange={setInSchool}
            >
              <Box>
                <Image
                  src={scholarship}
                  loading='lazy'
                  width='0'
                  height='0'
                  style={{ margin: 'auto' }}
                  className={styles.imgIconClass}
                  alt='icon'
                />
              </Box>
              <Text
                py='20px'
                fontSize='1.25rem'
                fontWeight='600'
                fontFamily='IBM Plex Sans'
                color='ED.dark'
              >
                Are you currently in school?
              </Text>
              <Stack spacing={5} direction='column'>
                <Radio
                  size='lg'
                  value='1'
                  id='in-school-yes'
                  className={step_radio_btn}
                >
                  Yes
                </Radio>
                <Radio
                  size='lg'
                  value='2'
                  id='in-school-no'
                  className={step_radio_btn}
                >
                  No
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
          {stepsData.currently_enrolled_in_college == 'Yes' && (
            <Box ref={inSchoolRef} textAlign='center' className={step_form}>
              <RadioGroup
                defaultValue={stepsData.school_to_attend == 'Yes' ? '1' : '2'}
                onChange={setSchoolToAttend}
                id='searching'
              >
                <Box>
                  <Image
                    src={newSchool}
                    loading='lazy'
                    width='0'
                    height='0'
                    sizes='100%'
                    style={{ margin: 'auto' }}
                    className={styles.imgIconClass}
                    alt='icon'
                  />
                </Box>
                <Text
                  py='20px'
                  fontSize='1.25rem'
                  fontWeight='600'
                  fontFamily='IBM Plex Sans'
                  color='ED.dark'
                >
                  Are you looking for a new school to attend?
                </Text>
                <Stack spacing={5} direction='column'>
                  <Radio
                    size='lg'
                    value='1'
                    id='searching-yes'
                    className={step_radio_btn}
                  >
                    Yes
                  </Radio>
                  <Radio
                    size='lg'
                    value='2'
                    id='searching-no'
                    className={step_radio_btn}
                  >
                    No
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}
          <Box
            data-testid='age'
            ref={schoolToAttendRef}
            textAlign='center'
            className={step_form}
          >
            <Box>
              <Image
                src={child}
                loading='lazy'
                width='0'
                height='0'
                sizes='100%'
                style={{ margin: 'auto' }}
                className={styles.imgIconClass}
                alt='icon'
              />
            </Box>
            <Text
              py='20px'
              fontSize='1.25rem'
              fontWeight='600'
              fontFamily='IBM Plex Sans'
              color='ED.dark'
            >
              How old are you?
            </Text>
            <Select
              data-testid='age-select'
              id='age'
              className={`${form_select}`}
              onChange={(e) => {
                setStepsData({ ...stepsData, age: e.target.value });

                if (getDeviceType() === 'Desktop') {
                  hsyearRef.current?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              defaultValue={stepsData?.age}
            >
              {numbers?.map((item: any, index: number) => (
                <option key={item.title + +index} value={item.value}>
                  {item.title}
                </option>
              ))}
            </Select>
          </Box>
          <Box
            data-testid='hsyear'
            ref={hsyearRef}
            textAlign='center'
            className={step_form}
          >
            <Box>
              <Image
                src={graduate}
                loading='lazy'
                width='0'
                height='0'
                sizes='100%'
                style={{ margin: 'auto' }}
                className={styles.imgIconClass}
                alt='icon'
              />
            </Box>
            <Text
              data-testid='question'
              py='20px'
              fontSize='1.25rem'
              fontWeight='600'
              fontFamily='IBM Plex Sans'
              color='ED.dark'
            >
              What year did you graduate from high school or complete your GED?
            </Text>
            <Select
              data-testid='hsyear-select'
              id='hsyear'
              className={form_select}
              onChange={(e) => {
                setStepsData({ ...stepsData, hsyear: e.target.value });

                if (getDeviceType() === 'Desktop') {
                  enrolledInSchooRef.current?.scrollIntoView({
                    behavior: 'smooth',
                  });
                }
              }}
              defaultValue={stepsData?.hsyear}
            >
              {generateYears()?.map((item, index) => (
                <option key={item.title + +index} value={item.value}>
                  {item.title}
                </option>
              ))}
            </Select>
          </Box>
          <Box
            data-testid='preferred_enrollment'
            ref={enrolledInSchooRef}
            textAlign='center'
            className={step_form}
          >
            <Box>
              <Image
                src={enroll}
                loading='lazy'
                width='0'
                height='0'
                sizes='100%'
                style={{ margin: 'auto' }}
                className={styles.imgIconClass}
                alt='icon'
              />
            </Box>
            <Text
              py='20px'
              fontSize='1.25rem'
              fontWeight='600'
              fontFamily='IBM Plex Sans'
              color='ED.dark'
            >
              When do you plan to enroll in school?
            </Text>
            <Select
              data-testid='preferred_enrollment-select'
              className={form_select}
              id='timeline'
              onChange={(e) => {
                setStepsData({
                  ...stepsData,
                  preferred_enrollment: e.target.value,
                });
              }}
              defaultValue={stepsData?.preferred_enrollment}
            >
              {stepTwo.options?.map((item, index) => (
                <option key={item.title + +index} value={item.value}>
                  {item.title}
                </option>
              ))}
            </Select>
          </Box>
          <Box className={step_form}>
            <Button
              data-testid='next-step'
              w='100%'
              h='52px'
              _hover={{ background: 'ED.secondary' }}
              bg='ED.secondary'
              color='ED.dark'
              onClick={() => setStepsData({ ...stepsData, current: 3 })}
              id='form-whiteg-step-2-fwd'
            >
              next <span>»</span>
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
              onClick={() => setStepsData({ ...stepsData, current: 1 })}
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

export default Two;
