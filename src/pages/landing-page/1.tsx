import { Box, Button, Select, Stack, Text } from '@chakra-ui/react';
import { FC, Suspense, useContext, useEffect } from 'react';

import CustomProgressBar from '@/components/ProgressBar';

import { AppContext } from '@/context/AppContext';

import { stepFour } from '@/appConstants';

import Five from '../../components/LandingPage/Five';
import Four from '../../components/LandingPage/Four';
import Three from '../../components/LandingPage/Three';
import Two from '../../components/LandingPage/Two';

import styles from './index.module.css';

const { form_btn, form_select, form_btn_first } = styles;

const WhiteG: FC = (): JSX.Element => {
  const { stepsData, setStepsData } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const openNewTab = async (edLevel: string) => {
    setStepsData({
      ...stepsData,
      current_education_level: edLevel,
      current: 2,
    });
  };
  return (
    <>
      <Suspense fallback={<></>}>
        <Stack>
          <Box>
            {stepsData?.current > 1 && (
              <CustomProgressBar
                width={(stepsData.current / 5) * 100}
                height={8}
                color='#f4b51e'
                type='secondary'
              />
            )}
            <form>
              {stepsData?.current === 1 && (
                <>
                  <Box p='4' mt='71'>
                    <Text
                      py='10px'
                      fontSize='34px'
                      fontWeight='600'
                      fontFamily='IBM Plex Sans'
                      textAlign='center'
                      color='ED.dark'
                    >
                      It only takes 60 seconds to see schools!
                    </Text>
                    <Text
                      p='10px'
                      fontSize='16px'
                      fontWeight='400'
                      fontFamily='IBM Plex Sans'
                      textAlign='center'
                      color='ED.dark'
                    >
                      Want to Go Back to School? Those unemployed or who make
                      less than $80k a year may qualify for a grant worth up to
                      $7,395* to go back to school.
                    </Text>
                  </Box>
                  <Box className={form_btn_first}>
                    <Text
                      fontSize='16px'
                      fontWeight='600'
                      fontFamily='IBM Plex Sans'
                      textAlign='center'
                      color='ED.dark'
                    >
                      Your highest Degree:{' '}
                    </Text>
                    <Box className='' p='20px'>
                      {/* <a href='/landing-page/1' target='_blank'> */}
                      <Button
                        onClick={() => openNewTab('GED')}
                        className={form_btn}
                        _hover={{ background: 'ED.secondary' }}
                        bg='ED.primary'
                        color='ED.white'
                        id='form-whiteg-step-1-fwd-GED'
                      >
                        G.E.D <span>»</span>
                      </Button>
                      {/* </a> */}
                      {/* <a href='/landing-page/1' target='_blank'> */}
                      <Button
                        onClick={() => openNewTab('High School Diploma')}
                        className={form_btn}
                        _hover={{ background: 'ED.secondary' }}
                        bg='ED.primary'
                        color='ED.white'
                        id='form-whiteg-step-1-fwd-HS'
                      >
                        High School Diploma <span>»</span>
                      </Button>
                      {/* </a> */}
                      {/* <a target='_blank' href='/landing-page/1'> */}
                      <Button
                        onClick={() => openNewTab('Bachelors')}
                        className={form_btn}
                        _hover={{ background: 'ED.secondary' }}
                        bg='ED.primary'
                        color='ED.white'
                        id='form-whiteg-step-1-fwd-Bach'
                      >
                        Bachelor <span>»</span>
                      </Button>
                      {/* </a> */}
                      <Select
                        onChange={(e) => openNewTab(e.target.value)}
                        className={form_select}
                        placeholder='Highest level of education'
                        id='form-whiteg-step-1-dropdown'
                      >
                        {stepFour.dropDown[0].options.map((item, index) => (
                          <option key={item.title + +index} value={item.value}>
                            {item.title}
                          </option>
                        ))}
                      </Select>
                    </Box>
                  </Box>
                  <Box>
                    <Text
                      p='10px'
                      fontSize='14px'
                      fontWeight='500'
                      fontFamily='IBM Plex Sans'
                      color='ED.lightGray'
                    >
                      Education Directory is dedicated to connecting you with
                      schools and degrees to meet your education goals &
                      objectives. We will connect you with admissions
                      representatives who will discuss programs of your
                      choosing.
                    </Text>
                  </Box>
                </>
              )}
              {stepsData?.current === 2 && <Two />}
              {stepsData?.current === 3 && <Three />}
              {stepsData?.current === 4 && <Four />}
              {stepsData?.current === 5 && <Five />}
              <input
                id='leadid_token'
                name='universal_leadid'
                type='hidden'
                value=''
              />
            </form>
          </Box>
        </Stack>
        {stepsData?.current === 1 && (
          <div className='bg-primary p-3 text-xs text-white'>
            <p>
              Grant disclaimer: *For the 2024-25 award year (July 1, 2024, to June 30, 2025), the Federal Pell Grant is an annual award up to
              $7,395 and is typically awarded only to undergraduate students who
              display exceptional financial need and have not earned a
              bachelor's, graduate, or professional degree. Certain eligibility
              restrictions may apply. A Federal Pell Grant, unlike a loan, does
              not have to be repaid, except under certain circumstances. Source:{' '}
              <span>
                <a href='https://studentaid.gov/understand-aid/types/grants/pell'>
                  https://studentaid.gov/understand-aid/types/grants/pell
                </a>
              </span>
            </p>
          </div>
        )}
      </Suspense>
    </>
  );
};

export default WhiteG;
