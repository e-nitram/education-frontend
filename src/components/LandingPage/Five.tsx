import { Box, Button, Flex, Input, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useRef, useState } from 'react';

import AddressAutocomplete from '@/components/AutoComplete/Places';
import Loading from '@/components/Loading';

import { AppContext } from '@/context/AppContext';

import { User } from '@/app/_modules/meta';
import updateLead from '@/pages/api/leads/update';
import { postSearchRequest, prepareSearchBody } from '@/pages/api/searchApi';
import { primary } from '@/theme';
import { ISearchResponse } from '@/typings';
import { validatePhone } from '@/utils/fieldvalidation';

import styles from '../../pages/landing-page/index.module.css';

const { step_form, form_stack } = styles;

declare const LeadiD: {
  token: string;
};

const Five: FC = (): JSX.Element => {
  const isTeachingRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    isTeachingRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { stepsData, setStepsData, setSearchIdentifier, leadData } =
    useContext(AppContext);
  const { first_name, last_name, address_line1, phone } = stepsData;
  const [loading, setLoading] = useState(false);
  const [validateFields, setValidateFields] = useState(false);
  const [leadId, setLeadId] = useState<null | string>(null);

  useEffect(() => {
    try {
      setLeadId(LeadiD.token);
    } catch (_e) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LeadiD ?? null]);

  useEffect(() => {
    if (0 != (leadData?.session?.session_id ?? 0) % 2) {
      setAcceptTerms(true);
    }
  }, [leadData?.session?.session_id]);

  const clickHandler = async () => {
    if (null == leadId) {
      try {
        setLeadId(LeadiD.token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      } catch (_e) {
        /* empty */
      }
    }

    setLoading(true);
    const nextStep =
      (null != leadId || 'true' == process.env.NEXT_PUBLIC_DEV) &&
      first_name.length >= 3 &&
      last_name.length >= 3 &&
      address_line1.length > 1 &&
      phone.length === 10
        ? true
        : false;
    if (!nextStep) {
      setValidateFields(true);
      setLoading(false);
      return;
    }
    try {
      const locl = localStorage.getItem('leadRes');

      const localparse = locl !== null ? JSON.parse(locl) : '';

      const third_party_tokens_id =
        leadData?.thirdPartyToken?.third_party_tokens_id ??
        localparse?.thirdPartyToken?.third_party_tokens_id;

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

      await updateLead('third-party-token', third_party_tokens_id, {
        traffic_trusted_form_url: traffic_trusted_form_url,
        traffic_trustedform_token: traffic_trustedform_token,
      });

      await updateLead('profile', localparse?.profile?.profile_id, {
        first_name: stepsData.first_name,
        last_name: stepsData.last_name,
        phone_primary: stepsData.phone,
      });

      await updateLead('consent', localparse?.consent?.consent_id, {
        tcpa_text_traffic: stepsData?.tcpa,
        tcpa_timestamp_traffic: new Date().toISOString(),
      });
      const searchBody = prepareSearchBody(stepsData, 'landing-page');
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

      ref.current && ref.current?.click();
      setTimeout(() => {
        setLoading(false);
        router.push('/results');
      }, 1000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('ERROR: failed to submit landing-page/1 search', error);
      setLoading(false);
      return error;
    }
  };

  const handleAddressSelect = (address: string, zipCode: string) => {
    setStepsData({ ...stepsData, address_line1: address, zip_code: zipCode });
  };

  return (
    <Stack data-testid='whiteG-step-5' ref={isTeachingRef}>
      <Box>
        <Stack className={form_stack} mt='71'>
          <Box textAlign='center' className={step_form}>
            <Box mt='4'>
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
            <Stack rowGap='4'>
              <Stack>
                <Text
                  data-testid='label'
                  fontSize='1.25rem'
                  fontWeight='600'
                  fontFamily='IBM Plex Sans'
                  textAlign='start'
                  color='ED.dark'
                >
                  First Name
                </Text>
                <Input
                  data-testid='first_name'
                  type='text'
                  id='first_name'
                  placeholder='First name'
                  h='3.1rem'
                  defaultValue={stepsData?.first_name}
                  onChange={(e) =>
                    setStepsData({ ...stepsData, first_name: e.target.value })
                  }
                  isInvalid={
                    validateFields && first_name.length < 3 ? true : false
                  }
                />
              </Stack>
              <Stack>
                <Text
                  data-testid='label'
                  fontSize='1.25rem'
                  fontWeight='600'
                  fontFamily='IBM Plex Sans'
                  textAlign='start'
                  color='ED.dark'
                >
                  Last Name
                </Text>
                <Input
                  data-testid='last_name'
                  type='text'
                  id='last_name'
                  placeholder='Last name'
                  h='3.1rem'
                  defaultValue={stepsData?.last_name}
                  onChange={(e) =>
                    setStepsData({ ...stepsData, last_name: e.target.value })
                  }
                  isInvalid={
                    validateFields && last_name.length < 3 ? true : false
                  }
                />
              </Stack>

              <Stack>
                <Text
                  data-testid='label'
                  fontSize='1.25rem'
                  fontWeight='600'
                  fontFamily='IBM Plex Sans'
                  textAlign='start'
                  color='ED.dark'
                >
                  Address
                </Text>

                <AddressAutocomplete
                  data-testid='label'
                  onSelectAddress={handleAddressSelect}
                  invalid={validateFields && stepsData.address_line1.length < 1}
                  variant='dark'
                  isWhiteG
                  placeholder='Your Address'
                  bg={primary.colors.ED.white}
                  value={stepsData.address_line1}
                />
              </Stack>

              <Stack>
                <Text
                  data-testid='label'
                  fontSize='1.25rem'
                  fontWeight='600'
                  fontFamily='IBM Plex Sans'
                  textAlign='start'
                  color='ED.dark'
                >
                  Primary Phone
                </Text>
                <Input
                  type='tel'
                  inputMode='numeric'
                  id='phone'
                  h='3.1rem'
                  maxLength={14}
                  value={validatePhone(stepsData.phone)}
                  placeholder='Phone number'
                  isInvalid={validateFields && phone.length !== 10}
                  onChange={(e) =>
                    setStepsData({
                      ...stepsData,
                      phone: e.target.value.replace(/[^+\d]+/g, ''),
                    })
                  }
                />
              </Stack>
              <Flex fontSize='12px'>
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
                          id='leadid_tcpa_disclosure_form1'
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
                      <input type='hidden' id='leadid_tcpa_disclosure_form1' />
                    </>
                  )}
                  <label
                    htmlFor='leadid_tcpa_disclosure_form1'
                    className='relative cursor-pointer text-left font-sans text-10'
                  >
                    {stepsData?.tcpa}
                  </label>
                </div>
              </Flex>
            </Stack>
          </Box>

          <Box className={step_form}>
            <Button
              data-testid='show_schools'
              w='100%'
              h='52px'
              _hover={{ background: 'ED.primary' }}
              bg='ED.primary'
              color='ED.white'
              id='submit-form-whiteg'
              // className={`${!nextStep && 'cursor-disabled'}`}
              onClick={clickHandler}
              isDisabled={!acceptTerms}
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
              onClick={() => setStepsData({ ...stepsData, current: 4 })}
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

export default Five;
