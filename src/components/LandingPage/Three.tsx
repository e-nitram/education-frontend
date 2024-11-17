import {
  Box,
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FC, useContext, useEffect, useRef, useState } from 'react';

import Loading from '@/components/Loading';

import { AppContext } from '@/context/AppContext';

import { getDeviceType } from '@/utils';
import { validateEmail } from '@/utils';

import styles from '../../pages/landing-page/index.module.css';
const { form_select, step_form, step_radio_btn, form_stack, radio_stack } =
  styles;

const Three: FC = (): JSX.Element => {
  const isTeachingRef = useRef<null | HTMLDivElement>(null);
  const isNurseRef = useRef<null | HTMLDivElement>(null);
  const isOnlineRef = useRef<null | HTMLDivElement>(null);
  const isComputerRef = useRef<null | HTMLDivElement>(null);
  const isUsCitizenRef = useRef<null | HTMLDivElement>(null);
  const isMilitaryRef = useRef<null | HTMLDivElement>(null);
  const isMilitaryAffiliationRef = useRef<null | HTMLDivElement>(null);
  const isEmailRef = useRef<null | HTMLDivElement>(null);
  const { stepsData, createLead, setStepsData } = useContext(AppContext);
  const [teachingCertificate, setTeachingCertificate] = useState('');
  const [validateFields, setValidateFields] = useState(false);
  const [currentlyANurse, setCurrentlyANurse] = useState('');
  const [yourClasses, setYourClasses] = useState('');
  const [hasComputer, sethasComputer] = useState('');
  const [usCitizen, setUsCitizen] = useState('');
  const [usMilitary, setUsMilitary] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false as boolean);
  const { teaching_certificate, nurse, us_citizen, email } = stepsData;
  let nextStep =
    teaching_certificate?.length > 0 &&
    nurse?.length > 0 &&
    us_citizen?.length > 0 &&
    isValidEmail
      ? true
      : false;

  useEffect(() => {
    isTeachingRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (teachingCertificate == '1') {
      setStepsData({ ...stepsData, teaching_certificate: 'Yes' });
    } else if (teachingCertificate == '2') {
      setStepsData({ ...stepsData, teaching_certificate: 'No' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teachingCertificate, setStepsData]);

  useEffect(() => {
    if (currentlyANurse === '1') {
      setStepsData({ ...stepsData, rn_license: 'LPN/LVN' });
    } else if (currentlyANurse === '2') {
      setStepsData({ ...stepsData, rn_license: 'RN' });
    } else if (currentlyANurse === '3') {
      setStepsData({ ...stepsData, rn_license: 'No' });
    }

    if (getDeviceType() === 'Desktop') {
      isNurseRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentlyANurse, setStepsData]);

  useEffect(() => {
    // Update the state for all devices
    if (yourClasses === '1') {
      setStepsData({
        ...stepsData,
        online_or_campus: 'Online',
        computer_internet_access: 'Yes',
      });
    } else if (yourClasses === '2') {
      setStepsData({
        ...stepsData,
        online_or_campus: 'Campus',
        computer_internet_access: 'No',
      });
    } else if (yourClasses === '3') {
      setStepsData({
        ...stepsData,
        online_or_campus: 'Either',
        computer_internet_access: 'Yes',
      });
    }

    // Execute scrollIntoView only for non-mobile screens
    if (getDeviceType() === 'Desktop') {
      isOnlineRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yourClasses, setStepsData]);

  useEffect(() => {
    if (hasComputer === '1') {
      setStepsData({ ...stepsData, computer_internet_access: 'Yes' });
    } else if (hasComputer === '2') {
      setStepsData({ ...stepsData, computer_internet_access: 'No' });
    }

    if (getDeviceType() === 'Desktop') {
      isComputerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasComputer, setStepsData]);

  useEffect(() => {
    if (usCitizen === '1') {
      setStepsData({ ...stepsData, us_citizen: 'Yes' });
    } else if (usCitizen === '2') {
      setStepsData({ ...stepsData, us_citizen: 'No' });
    }

    if (getDeviceType() === 'Desktop') {
      isMilitaryRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usCitizen, setStepsData]);

  useEffect(() => {
    if (usMilitary === '1') {
      setStepsData({ ...stepsData, military_status: 'Yes' });
    } else if (usMilitary === '2') {
      setStepsData({ ...stepsData, military_status: 'No' });
    }

    if (getDeviceType() === 'Desktop') {
      isMilitaryAffiliationRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usMilitary, setStepsData]);

  return (
    <Stack data-testid='whiteG-step-3'>
      <Box>
        <Stack ref={isTeachingRef} className={form_stack} mt='71'>
          <Box
            data-testid='teaching_certificate'
            textAlign='center'
            className={step_form}
          >
            <RadioGroup
              defaultValue={
                stepsData?.teaching_certificate == 'Yes' ? '1' : '2'
              }
              onChange={setTeachingCertificate}
            >
              <Box>
                <Image
                  src='https://educationdirectory.org/white_g/images/questions/12_teach.png?v=1'
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
                fontSize='1.25rem'
                fontWeight='600'
                fontFamily='IBM Plex Sans'
                color='ED.dark'
              >
                Do you have a teaching certificate?
              </Text>
              <Stack
                data-testid='options'
                id='teaching'
                spacing={5}
                direction='column'
                className={radio_stack}
              >
                <Radio
                  size='lg'
                  value='1'
                  id='teaching-yes'
                  className={step_radio_btn}
                >
                  Yes
                </Radio>
                <Radio
                  size='lg'
                  value='2'
                  id='teaching-no'
                  className={step_radio_btn}
                >
                  No
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Box
            data-testid='rn_license'
            ref={isNurseRef}
            textAlign='center'
            className={step_form}
          >
            <RadioGroup
              defaultValue={
                stepsData?.rn_license == 'LPN/LVN'
                  ? '1'
                  : stepsData?.rn_license == 'RN'
                    ? '2'
                    : stepsData?.rn_license == ''
                      ? ''
                      : '3'
              }
              onChange={setCurrentlyANurse}
            >
              <Box>
                <Image
                  src='https://educationdirectory.org/white_g/images/questions/13_nurse.png?v=1'
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
                fontSize='1.25rem'
                fontWeight='600'
                fontFamily='IBM Plex Sans'
                color='ED.dark'
              >
                Are you currently a nurse?
              </Text>
              <Stack
                data-testid='options'
                id='nursing'
                spacing={5}
                direction='column'
                className={radio_stack}
              >
                <Radio
                  size='lg'
                  value='1'
                  id='nursing-lpn'
                  className={step_radio_btn}
                >
                  Licensed Practical (LPN/LVN)
                </Radio>
                <Radio
                  size='lg'
                  value='2'
                  id='nursing-rn'
                  className={step_radio_btn}
                >
                  Registered Nurse (RN)
                </Radio>
                <Radio
                  size='lg'
                  value='3'
                  id='nursing-none'
                  className={step_radio_btn}
                >
                  No
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Box
            data-testid='learning_preference'
            ref={isOnlineRef}
            textAlign='center'
            className={step_form}
          >
            <RadioGroup
              defaultValue={
                stepsData?.online_or_campus == 'Online'
                  ? '1'
                  : stepsData?.online_or_campus == 'campus'
                    ? '2'
                    : stepsData?.online_or_campus == ''
                      ? ''
                      : '3'
              }
              onChange={setYourClasses}
            >
              <Box>
                <Image
                  src='https://educationdirectory.org/white_g/images/questions/14_online.png?v=1'
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
                fontSize='1.25rem'
                fontWeight='600'
                fontFamily='IBM Plex Sans'
                color='ED.dark'
              >
                Will you take your classes:
              </Text>
              <Stack
                data-testid='radio-labels'
                spacing={5}
                direction='column'
                className={radio_stack}
              >
                <Radio
                  size='lg'
                  value='1'
                  id='online'
                  className={step_radio_btn}
                >
                  Only Online
                </Radio>
                <Radio
                  size='lg'
                  value='2'
                  id='campus'
                  className={step_radio_btn}
                >
                  Only at a campus
                </Radio>
                <Radio
                  size='lg'
                  value='3'
                  id='either'
                  className={step_radio_btn}
                >
                  Either at a Campus or Online
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
          {stepsData.online_or_campus !== 'Campus' && (
            <Box
              data-testid='computer_internet_access'
              ref={isComputerRef}
              textAlign='center'
              className={step_form}
            >
              <RadioGroup
                defaultValue={
                  stepsData?.computer_internet_access == 'Yes' ? '1' : '2'
                }
                onChange={sethasComputer}
              >
                <Box>
                  <Image
                    src='https://educationdirectory.org/white_g/images/questions/15_computer.png?v=1'
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
                  fontSize='1.25rem'
                  fontWeight='600'
                  fontFamily='IBM Plex Sans'
                  color='ED.dark'
                >
                  Will you have access to a computer to take your courses?
                </Text>
                <Stack
                  data-testid='radio-labels'
                  id='computer'
                  spacing={5}
                  direction='column'
                  className={radio_stack}
                >
                  <Radio
                    size='lg'
                    value='1'
                    id='computer-yes'
                    className={step_radio_btn}
                  >
                    Yes
                  </Radio>
                  <Radio
                    size='lg'
                    value='2'
                    id='computer-no'
                    className={step_radio_btn}
                  >
                    No
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          )}
          <Box
            data-testid='us_citizen'
            ref={isUsCitizenRef}
            textAlign='center'
            className={step_form}
          >
            <RadioGroup
              defaultValue={stepsData?.us_citizen == 'Yes' ? '1' : '2'}
              onChange={setUsCitizen}
              id='citizen'
            >
              <Box>
                <Image
                  src='https://educationdirectory.org/white_g/images/questions/17_citizen.png?v=1'
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
                fontSize='1.25rem'
                fontWeight='600'
                fontFamily='IBM Plex Sans'
                color='ED.dark'
              >
                Are you a U.S. citizen?
              </Text>
              <Stack
                data-testid='radio-labels'
                spacing={5}
                direction='column'
                className={radio_stack}
              >
                <Radio
                  size='lg'
                  value='1'
                  id='computer-yes'
                  className={step_radio_btn}
                >
                  Yes
                </Radio>
                <Radio
                  size='lg'
                  value='2'
                  id='computer-no'
                  className={step_radio_btn}
                >
                  No
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
          <Box
            data-testid='military_status'
            ref={isMilitaryRef}
            textAlign='center'
            className={step_form}
          >
            <RadioGroup
              id='military'
              defaultValue={
                stepsData?.military?.military_status == 'Yes' ? '1' : '2'
              }
              onChange={(val) => {
                setUsMilitary(val);
                if (val === '1') {
                  setStepsData({
                    ...stepsData,
                    military: {
                      ...stepsData.military,
                      military_affiliation: 'Active Duty',
                    },
                  });
                } else {
                  setStepsData({
                    ...stepsData,
                    military: {
                      ...stepsData.military,
                      military_affiliation: 'None',
                    },
                  });
                }
              }}
            >
              <Box>
                <Image
                  src='https://educationdirectory.org/white_g/images/questions/19_military.png?v=1'
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
                fontSize='1.25rem'
                fontWeight='600'
                fontFamily='IBM Plex Sans'
                color='ED.dark'
              >
                Are you affiliated with the US Military?
              </Text>
              <Stack
                data-testid='radio-labels'
                spacing={5}
                direction='column'
                className={radio_stack}
              >
                <Radio
                  size='lg'
                  value='1'
                  id='military-yes'
                  className={step_radio_btn}
                >
                  Yes
                </Radio>
                <Radio
                  size='lg'
                  value='2'
                  id='military-no'
                  className={step_radio_btn}
                >
                  No
                </Radio>
              </Stack>
            </RadioGroup>
          </Box>
          {stepsData?.military?.military_status === 'Yes' ? (
            <Box
              ref={isMilitaryAffiliationRef}
              textAlign='center'
              className={step_form}
            >
              <RadioGroup defaultValue='2'>
                <Box>
                  <Image
                    src='https://educationdirectory.org/white_g/images/questions/19_military.png?v=1'
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
                  fontSize='1.25rem'
                  fontWeight='600'
                  fontFamily='IBM Plex Sans'
                  color='ED.dark'
                >
                  What is your U.S. Military affiliation?
                </Text>
                <Select
                  className={form_select}
                  id='military-affiliation'
                  onChange={(e) => {
                    isEmailRef.current?.scrollIntoView({ behavior: 'smooth' });
                    setStepsData({
                      ...stepsData,
                      military: {
                        ...stepsData.military,
                        military_affiliation: e.target.value,
                      },
                    });
                  }}
                >
                  <option disabled>Select Military Affiliation</option>
                  <option id='military-ad' value='Active Duty(AD)'>
                    Active Duty(AD)
                  </option>
                  <option id='military-res' value='Reserve'>
                    Selective Reserve(SR)
                  </option>
                  <option id='military-spouse' value='Military Spouse'>
                    Spouse of AD or SR
                  </option>
                  <option id='military-vet' value='Veteran'>
                    Veteran
                  </option>
                  <option id='military-ret' value='Retired'>
                    Retired
                  </option>
                </Select>
              </RadioGroup>
            </Box>
          ) : null}
          <Box
            data-testid='email'
            ref={isEmailRef}
            textAlign='center'
            className={step_form}
          >
            <Box>
              <Image
                src='https://educationdirectory.org/white_g/images/questions/22_email.png?v=1'
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
              data-testid='question'
              py='20px'
              fontSize='1.25rem'
              fontWeight='600'
              fontFamily='IBM Plex Sans'
              color='ED.dark'
            >
              What is your e-mail address?
            </Text>
            <Input
              type='email'
              id='email'
              placeholder='Enter your email'
              h='3.1rem'
              defaultValue={stepsData?.email}
              isInvalid={validateFields && !isValidEmail ? true : false}
              onChange={(e) => {
                setStepsData({ ...stepsData, email: e.target.value });
                setValidateFields(false);
              }}
            />
            <Text
              fontSize='xs'
              fontFamily='IBM Plex Sans'
              color='ED.dark'
              textAlign='end'
            >
              We respect your privacy
            </Text>
          </Box>

          <Box className={step_form}>
            <Button
              w='100%'
              data-testid='next'
              h='52px'
              _hover={{ background: 'ED.secondary' }}
              bg='ED.secondary'
              color='ED.dark'
              id='form-whiteg-step-3-fwd'
              onClick={async () => {
                setLoading(true);
                if (!nextStep) {
                  if (email.trim().length < 3) {
                    setIsValidEmail(false);
                    setValidateFields(true);
                    setLoading(false);
                  } else {
                    const isEmailvalid = await validateEmail(email);
                    setIsValidEmail(isEmailvalid);
                    nextStep = isEmailvalid;
                    setValidateFields(true);
                    setLoading(false);
                  }
                }
                if (!nextStep) return;
                await createLead();
                setStepsData({ ...stepsData, current: 4 });
                setLoading(false);
              }}
            >
              {loading ? (
                <Loading height='32px' color='white' />
              ) : (
                <>
                  {' '}
                  next <span>»</span>
                </>
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
              onClick={() => {
                setStepsData({ ...stepsData, current: 2 });
              }}
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

export default Three;
