import {
  Box,
  Button,
  Hide,
  Stack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { AppContext } from '@/context/AppContext';

import { User } from '@/app/_modules/meta';
import { generateAgeYears } from '@/appConstants';
import browseSvg from '@/assets/icons/browse.svg';
import calendarSvg from '@/assets/icons/calendar.svg';
import factorialSvg from '@/assets/icons/factorial.svg';
import medalSvg from '@/assets/icons/medal.svg';
import userSvg from '@/assets/icons/user.svg';
import updateLead from '@/pages/api/leads/update';
import { postSearchRequest, prepareSearchBody } from '@/pages/api/searchApi';
import { primary } from '@/theme';
import { ISearchResponse } from '@/typings';

import Input from '../Input';
import Loading from '../Loading';
import Select from '../Select';

declare const LeadiD: {
  token: string;
};

const Six = () => {
  const router = useRouter();
  const { stepsData, setStepsData, setSearchIdentifier, deviceType, leadData } =
    useContext(AppContext);
  const [isMobile] = useMediaQuery(`(max-width: ${primary.breakpoints[1]})`);
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [validateFields] = useState(false);
  const { first_name, last_name, us_citizen, military } = stepsData;
  const [leadId, setLeadId] = useState<null | string>(null);
  const ref = useRef<HTMLInputElement>(null);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    try {
      setLeadId(LeadiD.token);
    } catch (_e) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LeadiD]);

  useEffect(() => {
    if (0 != (leadData?.session?.session_id ?? 0) % 2) {
      setAcceptTerms(true);
    }
  }, [leadData?.session?.session_id]);

  const clickHandler = async () => {
    if (null == leadId) {
      setLeadId(LeadiD.token);
    }

    // if (disabled || (null == leadId && 'true' != process.env.NEXT_PUBLIC_DEV)) {
    //   setValidateFields(true);
    //   // eslint-disable-next-line no-console
    //   console.error('ERROR: submit clicked with invalid state', {
    //     disabled: disabled,
    //     leadId: leadId,
    //   });
    //   return;
    // }
    setLoading(true);

    // Get Trusted Form scripts data from DOM
    const formToken = (
      document.getElementById('xxTrustedFormToken_0') as HTMLInputElement
    )?.value
      ?.split('/')
      .pop();
    const traffic_trustedform_token =
      formToken ??
      'https://cert.trustedform.com/2a002d38bd755ce616bc4d7c2bd2b7983ff3daee';
    const formCert = (
      document.getElementById('xxTrustedFormCertUrl_0') as HTMLInputElement
    )?.value;
    const traffic_trusted_form_url =
      formCert ??
      'https://cert.trustedform.com/2a002d38bd755ce616bc4d7c2bd2b7983ff3daee';

    const traffic_jornaya_leadid =
      leadId ?? '7A2968D6-4C06-5B1E-CCCB-220FD8818179';

    // Pull existing Trusted Form data from localstorage
    const scriptsFromLS = localStorage.getItem('trustedForm');
    const storedScriptsData =
      scriptsFromLS != null ? JSON.parse(scriptsFromLS) : {};

    // Override traffic values
    const trustedForm = {
      ...storedScriptsData,
      traffic_jornaya_leadid: traffic_jornaya_leadid,
      traffic_trustedform_token: traffic_trustedform_token,
      traffic_trusted_form_url: traffic_trusted_form_url,
    };

    localStorage.setItem('trustedForm', JSON.stringify(trustedForm));

    const locl = localStorage.getItem('leadRes');
    const localparse = locl !== null ? JSON.parse(locl) : '';
    const profile_criteria_id =
      leadData?.profileCriteria?.profile_criteria_id ??
      localparse.profileCriteria?.profile_criteria_id;
    const profile_id =
      leadData?.profile?.profile_id ?? localparse.profile?.profile_id;
    const age = currentYear - +stepsData.age;
    const newProfile = updateLead('profile', profile_id, {
      first_name: stepsData.first_name,
      last_name: stepsData.last_name,
      phone_primary: stepsData.phone,
    });
    const newCriteria = updateLead('profile-Criteria', profile_criteria_id, {
      gender: stepsData.gender,
      age,
      profile_id,
      is_us_citizen: stepsData.us_citizen === 'Yes',
      is_us_military: stepsData?.military?.military_status === 'Yes',
      military_status: stepsData?.military?.military_affiliation,
    });
    //  Update consent object of current lead
    const consent_id =
      leadData?.consent?.consent_id ?? localparse.consent?.consent_id;
    const newConsent = updateLead('consent', consent_id, {
      tcpa_text_traffic: stepsData.tcpa,
    });

    await Promise.all([newProfile, newCriteria, newConsent]);

    try {
      // handle search api request
      const searchBody = prepareSearchBody(stepsData);
      const searchIdentifier = (await postSearchRequest(
        searchBody,
      )) as ISearchResponse;
      setSearchIdentifier(searchIdentifier);
      localStorage.setItem(
        'searchIdentifier',
        JSON.stringify(searchIdentifier),
      );

      const capiBody: { user: User } = {
        user: {
          agent: leadData.session.browser_type,
          email: stepsData.email ?? leadData.profile.email,
          phone: stepsData.phone ?? leadData.profile.phone_primary,
          first: stepsData.first_name ?? leadData.profile.first_name ?? '',
          last: stepsData.last_name ?? leadData.profile.last_name ?? '',
          city: stepsData.city ?? leadData.address.city,
          state: stepsData.state ?? leadData.address.state,
          zip: stepsData.zip_code ?? leadData.address.zip_code,
          ip: leadData.session.client_ip,
        },
      };

      const _capiResponse = fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/utilities/capi/search`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(capiBody),
        },
      );

      const _capiResponse0 = fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/utilities/capi/lead`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(capiBody),
        },
      );

      setLoading(false);
      setStepsData({
        ...stepsData,
        searchIdentifier: searchIdentifier.search_identifier,
      });
      ref.current && ref.current.click();
      router.push('/results');
      setTimeout(() => {
        setStepsData({ ...stepsData, current: 1 });
      }, 1000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('ERROR, get-started search submission failed', error);
      setLoading(false);
      return error;
    }
  };

  return (
    <Stack
      data-testid='step-6'
      className='step-wrapper '
      mt={['120px', '120px', '0px', '0px']}
      pb={['50px', '100px', '100px', '100px']}
    >
      <Text
        fontSize={['22px', '22px', '36px', '36px']}
        lineHeight={['30px', '30px', '46px', '46px']}
        fontWeight='600'
        fontFamily='IBM Plex Sans'
        align='center'
        color='ED.primary'
        pb='0.75'
        pt='2px'
      >
        About you
      </Text>
      <Hide breakpoint={`(max-width: ${primary.breakpoints[1]})`}>
        <Text
          fontSize='md'
          fontWeight='400'
          fontFamily='IBM Plex Sans'
          align='center'
          mt='0 !important'
          color='ED.dark'
        >
          Please answer all the questions
        </Text>
      </Hide>
      <Box
        h='100%'
        mt={[
          '16px !important',
          '16px !important',
          '52px !important',
          '52px !important',
        ]}
        className='step-wrapper-body'
        // maxW='390px'
        w={['100%', '390px !important', '390px !important', '390px !important']}
      >
        <Box className='row' flexDirection={isMobile ? 'column' : 'row'}>
          <Input
            data-testid='first_name'
            id='first_name'
            bg={isMobile ? primary.colors.ED.white : primary.colors.ED.light}
            icon={
              validateFields && stepsData.first_name.length < 3
                ? factorialSvg
                : userSvg
            }
            type='text'
            value={first_name}
            isInvalid={
              validateFields && stepsData.first_name.length < 3 ? true : false
            }
            placeholder='First Name'
            onChange={(e) =>
              setStepsData({ ...stepsData, first_name: e.target.value })
            }
          />
          <Box mt={['10px', '0']}>
            <Input
              data-testid='last_name'
              id='last_name'
              bg={isMobile ? primary.colors.ED.white : primary.colors.ED.light}
              icon={
                validateFields && stepsData.last_name.length < 3
                  ? factorialSvg
                  : userSvg
              }
              type='text'
              isInvalid={validateFields && stepsData.last_name.length < 3}
              value={last_name}
              placeholder='Last Name'
              onChange={(e) =>
                setStepsData({ ...stepsData, last_name: e.target.value })
              }
            />
          </Box>
        </Box>
        <Box mt='2' className='row' flexDirection={isMobile ? 'column' : 'row'}>
          <Box w='100%' mt={['10px', '0']}>
            <Text fontSize='md' fontWeight='500' mb='2' textAlign='center'>
              Year of birth
            </Text>
            <Select
              bg={isMobile ? primary.colors.ED.white : primary.colors.ED.light}
              icon={
                validateFields && stepsData.age.length < 1
                  ? factorialSvg
                  : calendarSvg
              }
              placeholder='Year of birth'
              isInvalid={validateFields && stepsData.age.length < 1}
              selectedOptions={{
                title: (currentYear - +stepsData.age).toString(),
              }}
              options={generateAgeYears()}
              onSelect={({ value }) =>
                setStepsData({
                  ...stepsData,
                  age: (currentYear - +value).toString(),
                })
              }
            />
          </Box>
        </Box>
        <Box my='4'>
          <Text fontSize='md' fontWeight='500' mb='2' textAlign='center'>
            Are you a US citizen?
          </Text>
          <Select
            bg={isMobile ? primary.colors.ED.white : primary.colors.ED.light}
            icon={
              validateFields && stepsData.us_citizen.length < 1
                ? factorialSvg
                : browseSvg
            }
            selectedOptions={{
              title: us_citizen,
            }}
            placeholder='Are you a US citizen?'
            isInvalid={validateFields && stepsData.us_citizen.length < 1}
            options={[
              { title: 'Yes', value: 'Yes' },
              { title: 'No', value: 'No' },
            ]}
            onSelect={({ value }) =>
              setStepsData({ ...stepsData, us_citizen: value })
            }
          />
        </Box>
        <Text fontSize='md' fontWeight='500' mb='2' textAlign='center'>
          Are you associated with the US Military?
        </Text>
        <Select
          bg={isMobile ? primary.colors.ED.white : primary.colors.ED.light}
          icon={
            validateFields && stepsData.military.military_status.length < 1
              ? factorialSvg
              : medalSvg
          }
          placeholder='Are you associated with the US Military?'
          selectedOptions={{
            title: stepsData.military.military_status,
          }}
          isInvalid={
            validateFields && stepsData.military.military_status.length < 1
          }
          options={[
            { title: 'Yes', value: 'Yes' },
            { title: 'No', value: 'No' },
          ]}
          onSelect={({ value }) =>
            setStepsData({
              ...stepsData,
              military: {
                ...stepsData.military,
                military_status: value,
                military_affiliation: value === 'Yes' ? '' : 'None',
              },
            })
          }
        />
        {stepsData?.military?.military_status == 'Yes' ? (
          <Box my='4'>
            <Select
              bg={isMobile ? primary.colors.ED.white : primary.colors.ED.light}
              icon={
                validateFields &&
                stepsData.military.military_affiliation.length < 1
                  ? factorialSvg
                  : medalSvg
              }
              selectedOptions={{
                title: military.military_affiliation,
              }}
              placeholder='What is your U.S. Military affiliation?'
              isInvalid={
                validateFields &&
                stepsData.military.military_affiliation.length < 1
              }
              options={[
                { title: 'Active Duty(AD)', value: 'Active Duty(AD)' },
                { title: 'Selective Reserve(SR)', value: 'Reserve' },
                { title: 'Spouse of AD or SR', value: 'Military Spouse' },
                { title: 'Veteran', value: 'Veteran' },
                { title: 'Retired', value: 'Retired' },
              ]}
              onSelect={({ value }) =>
                setStepsData({
                  ...stepsData,
                  military: {
                    ...stepsData.military,
                    military_affiliation: value,
                  },
                })
              }
            />
          </Box>
        ) : null}
        <Box
          my='4'
          w={`${deviceType === 'Mobile' ? '360px' : '400px'}`}
          className={isMobile ? 'step-wrapper-body' : ''}
        >
          <div className='flex flex-row gap-2 py-4'>
            {0 == (leadData?.session?.session_id ?? 0) % 2 ? (
              <div className='align-center inline-flex'>
                <label
                  className='relative flex cursor-pointer items-center rounded-full p-3'
                  htmlFor='customStyle'
                >
                  <input
                    type='checkbox'
                    className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-lg border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-dark before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-primary checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                    id='leadid_tcpa_disclosure_getstarted'
                    required
                    onClick={() => setAcceptTerms(!acceptTerms)}
                  />
                  <span className='pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-3.5 w-3.5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      stroke='currentColor'
                      strokeWidth='1'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </span>
                </label>
              </div>
            ) : (
              <>
                <input type='hidden' id='leadid_tcpa_disclosure_getstarted' />
              </>
            )}
            <label
              htmlFor='leadid_tcpa_disclosure_getstarted'
              className='relative cursor-pointer text-left font-sans text-10'
            >
              {stepsData?.tcpa}
            </label>
          </div>
        </Box>
      </Box>
      <Stack
        spacing='3'
        mt={['16px', '0px', '52px !important', '52px !important']}
        mb='22px'
        className='step-wrapper-footer'
      >
        <Button
          data-testid='step6-next-btn'
          id='submit-form-getstarted'
          bg='ED.primary'
          color='ED.white'
          borderRadius='26'
          w='290px'
          h='52px'
          fontFamily='IBM Plex Sans'
          fontSize='xl'
          fontWeight='600'
          _hover={{ background: 'ED.primary' }}
          className={`btn-secondry h4 ${
            !acceptTerms || loading ? 'cursor-disabled' : ''
          } `}
          isDisabled={!acceptTerms}
          onClick={clickHandler}
        >
          {loading ? (
            <Loading height='32px' color='white' />
          ) : 0 == (leadData?.session?.session_id ?? 0) % 2 ? (
            'Get Results'
          ) : (
            'Agree and Continue'
          )}
        </Button>
        <Box
          id='form-get-started-step-6-back'
          fontSize='xs'
          fontWeight='400'
          fontFamily='IBM Plex Sans'
          color='ED.fontColorLightGray'
          className='text-center'
          role='button'
          _hover={{ color: 'ED.fontColorDark', textDecoration: 'underLine' }}
          onClick={() => {
            setStepsData({ ...stepsData, current: 5 });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Previous step
        </Box>
      </Stack>
    </Stack>
  );
};

export default Six;
