import {
  Box,
  Button,
  Flex,
  Heading,
  Hide,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  Show,
  Stack,
  Text,
  UnorderedList,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import * as ReactSelect from 'react-select';

import AddressAutocomplete from '@/components/AutoComplete/Places';
import Loading from '@/components/Loading';
import ThankYouModal from '@/components/Thankyou-modal/thankyou-modal';

import { AppContext } from '@/context/AppContext';

import {
  generateAgeYears,
  Image_Quality,
  stepOne,
  stepThree,
  stepTwo,
} from '@/appConstants';
import { stepFour } from '@/appConstants';
import checkIcon from '@/assets/icons/tick.svg';
import { Answer, getResults } from '@/pages/api/getResultThankYouPages';
import { postSearchRequest, prepareSearchBody } from '@/pages/api/searchApi';
import { submitOffers } from '@/services/submitOffers';
import { primary } from '@/theme';
import { IAnswers, ISearchResponse, School, StepData } from '@/typings';
import {
  containsAlphabets,
  formattedPhoneNumberFunc,
  validateEmailWithRegex,
} from '@/utils';
import { validatePhone } from '@/utils/fieldvalidation';

import fetchDataFrom from '../api/fetchDataFrom';
import accountBalnaceIcon from '../../assets/logo/account_balance_black_24dp.svg';
import groupIcon from '../../assets/logo/Group 39.svg';
import locationIcon from '../../assets/logo/location_on_black_24dp.svg';
import verifiedIcon from '../../assets/logo/verified_user_black_24dp.svg';
import wifiIcon from '../../assets/logo/wifi_black_24dp.svg';
import TermsCheckbox from '../../components/TermsCheckbox';

import style from './index.module.css';

const {
  badge_list,
  badge_list_item,
  badge_item,
  white_btn,
  uni_form,
  uni_form_header,
  uni_form_fields,
  uni_form_terms,
} = style;

interface SelectedOptions {
  label: string;
  value: string;
}

type IProps = {
  school: School | null;
  error: null | string;
};

interface Question {
  IsVisible: boolean;
  QuestionDescription: string | null;
  QuestionFieldName: string;
  QuestionLabel: string;
  QuestionNotes: string | null;
  QuestionOptions: {
    OptionLabel: string;
    OptionValue: string;
  }[];
  QuestionRequired: boolean;
  QuestionType: 'DropDown' | 'TextBox' | 'HiddenField';
  QuestionValue: string | null;
  Rules: string | null;
}

interface Program {
  name: string;
  result_identifier: string;
  result_set_identifier: string;
  degree_level: string;
}

const Page: FC<IProps> = ({ school, error }): JSX.Element => {
  const {
    updateNavType,
    deviceType,
    updateFooterText,
    searchIdentifier,
    setSearchIdentifier,
    stepsData,
    updateStepsState,
    createLead,
  } = useContext(AppContext);
  const [isMobile] = useMediaQuery(`(max-width: ${primary.breakpoints[1]})`);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [validateForm, setValidateForm] = useState(false as boolean);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [acceptingStudentData, setAcceptingStudentData] = useState({
    terms_and_condition: true,
  });
  const [leadId, setLeadId] = useState<null | string>(null);

  useEffect(() => updateNavType('tertiary'), [updateNavType]);

  useEffect(() => {
    if (
      school?.footer_text !== undefined &&
      school?.footer_text !== null &&
      school?.footer_text !== ''
    ) {
      updateFooterText(school.footer_text);
    }
  }, [school, updateFooterText]);

  useEffect(() => {
    if (stepsData.areas_of_interest.length > 0) {
      const defaultOptions = stepThree?.options
        ?.filter((option) =>
          stepsData.areas_of_interest.some(
            (interest) => option.value === interest,
          ),
        )
        ?.map((opt) => ({ value: opt.value, label: opt.title }));
      setSelectedOptions(defaultOptions);
    }

    return () => {
      setSelectedOptions([]);
    };
  }, [stepsData.areas_of_interest]);

  const {
    first_name,
    last_name,
    email,
    current_education_level,
    preferred_enrollment,
    hsyear,
    phone,
    zip_code,
    address_line1,
    online_or_campus,
    currently_enrolled_in_college,
    areas_of_interest,
    computer_internet_access,
    gender,
    age,
    us_citizen,
    military,
  }: StepData = stepsData;

  const badge =
    'Online' === school?.school_type
      ? [
          {
            icon: wifiIcon,
            name: `${school?.school_type}`,
          },
          {
            icon: verifiedIcon,
            name: `${(school?.is_private as boolean) ? 'Private' : 'Public'}`,
          },
          {
            icon: accountBalnaceIcon,
            name: `${
              (school?.is_non_profit as boolean) ? 'Non-Profit' : 'For-Profit'
            }`,
          },
        ]
      : [
          {
            icon: wifiIcon,
            name: `${school?.school_type}`,
          },
          {
            icon: locationIcon,
            name: `${school?.city}`,
          },
          {
            icon: verifiedIcon,
            name: `${(school?.is_private as boolean) ? 'Private' : 'Public'}`,
          },
          {
            icon: accountBalnaceIcon,
            name: `${
              (school?.is_non_profit as boolean) ? 'Non-Profit' : 'For-Profit'
            }`,
          },
        ];

  // Validate Form fields
  const isEnabled = useMemo(() => {
    return (
      first_name.length > 0 &&
      last_name.length > 0 &&
      email.length > 0 &&
      isEmailValid &&
      current_education_level.length > 0 &&
      hsyear.length > 0 &&
      preferred_enrollment.length > 0 &&
      phone.length > 0 &&
      zip_code.length > 0 &&
      online_or_campus.length > 0 &&
      computer_internet_access.length > 0 &&
      currently_enrolled_in_college.length > 0 &&
      areas_of_interest.length > 0 &&
      gender.length > 0 &&
      age.length > 0 &&
      military?.military_status?.length > 0 &&
      us_citizen.length > 0 &&
      address_line1.length > 0 &&
      acceptingStudentData?.terms_and_condition
    );
  }, [
    acceptingStudentData?.terms_and_condition,
    address_line1.length,
    age.length,
    areas_of_interest.length,
    computer_internet_access.length,
    current_education_level.length,
    currently_enrolled_in_college.length,
    email.length,
    first_name.length,
    gender.length,
    hsyear.length,
    isEmailValid,
    last_name.length,
    military?.military_status?.length,
    online_or_campus.length,
    phone.length,
    preferred_enrollment.length,
    us_citizen.length,
    zip_code.length,
  ]);

  useEffect(() => {
    function checkLeadId() {
      const leadid_token = document.getElementById(
        'leadid_token',
      ) as HTMLInputElement;

      if ('' !== leadid_token?.value) {
        setLeadId(leadid_token?.value);
        clearInterval(interval);
      }
    }

    // Set the interval inside the useEffect
    const interval = setInterval(checkLeadId, 200);

    // Clear the interval when the component unmounts or when leadId changes
    return () => {
      clearInterval(interval);
    };
  }, [leadId]);

  const getInfoHandler = async () => {
    setLoading(true);
    setIsEmailValid(
      stepsData.email.trim().length > 1
        ? validateEmailWithRegex(stepsData.email)
        : false,
    );

    if (!isEnabled) {
      setValidateForm(true);
      setLoading(false);
      return;
    }
    const searchBody = prepareSearchBody(stepsData);
    const [, searchIdentifier] = await Promise.all([
      createLead(),
      postSearchRequest(searchBody),
    ]);

    // Get Trusted Form scripts data from DOM
    const formToken = (
      document.getElementById('xxTrustedFormToken_0') as HTMLInputElement
    )?.value
      ?.split('/')
      .pop();
    const traffic_trustedform_token = formToken ?? '';
    const formCert = (
      document.getElementById('xxTrustedFormCertUrl_0') as HTMLInputElement
    )?.value;
    const traffic_trusted_form_url = formCert;

    const traffic_jornaya_leadid = leadId;

    // Pull existing Trusted Form data from localstorage
    const scriptsFromLS = localStorage.getItem('trustedForm');
    const storedScriptsData =
      scriptsFromLS != null ? JSON.parse(scriptsFromLS) : {};

    // Override traffic values
    const trustedForm = {
      ...storedScriptsData,
      traffic_jornaya_leadid:
        traffic_jornaya_leadid ?? '7A2968D6-4C06-5B1E-CCCB-220FD8818179',
      traffic_trustedform_token:
        traffic_trustedform_token ??
        'https://cert.trustedform.com/2a002d38bd755ce616bc4d7c2bd2b7983ff3daee',
      traffic_trusted_form_url:
        traffic_trusted_form_url ??
        'https://cert.trustedform.com/2a002d38bd755ce616bc4d7c2bd2b7983ff3daee',
    };

    localStorage.setItem('trustedForm', JSON.stringify(trustedForm));

    setSearchIdentifier(searchIdentifier as ISearchResponse);

    localStorage.setItem('searchIdentifier', JSON.stringify(searchIdentifier));

    // Get Results from Results
    const results = await getResults({
      search_identifier: searchIdentifier?.search_identifier,
    });

    const matchedSchool = results?.find(
      (result) => result.brand_name === school?.name,
    );

    if (matchedSchool?.is_exclusive === 'true') {
      handleOffersSubmission(matchedSchool);
      onOpen();
    } else if (matchedSchool?.is_exclusive === 'false') {
      handleOffersSubmission(matchedSchool);
      localStorage.setItem('submittedSchoolId', matchedSchool.schoolid);
      router.push('/results');
    } else {
      router.push('/results');
    }

    setLoading(false);
  };

  const handleOffersSubmission = (matchedSchool: {
    brand_name: string;
    clientid: string;
    consent: string;
    is_exclusive: 'true' | 'false';
    location: string;
    logo: string;
    online: boolean;
    payout: number;
    questions?: Question[];
    answers?: Answer[];
    result_type: string;
    school: string;
    schoolid: string;
    state: string;
    programs: Program[];
    status?: boolean;
  }) => {
    const offerSubmissionPayload = {
      ...searchIdentifier,
      search_result_identifier: matchedSchool.programs[0]?.result_identifier,
      search_result_set_identifier:
        matchedSchool.programs[0].result_set_identifier,
      answers: answerQuestions(matchedSchool.questions ?? []),
    };
    submitOffers(offerSubmissionPayload);
  };

  const answerQuestions = (questions: Question[]) => {
    let answers: IAnswers[] = [];

    if (questions !== null) {
      answers = questions?.map((question) => ({
        question_key: question.QuestionFieldName,
        question_value:
          question?.QuestionOptions !== null
            ? question?.QuestionOptions[0]?.OptionValue
            : '',
      }));
    }
    return answers;
  };

  const handleAddressSelect = (address: string, zipCode: string) =>
    updateStepsState({
      address_line1: address,
      zip_code: zipCode,
    });

  const handleInterestSelect = (
    selectedOptionsProp: ReactSelect.MultiValue<SelectedOptions>,
  ) => {
    {
      if (
        selectedOptionsProp.length > 0 &&
        selectedOptionsProp?.some((option) => option.value === 'selectall')
      ) {
        updateStepsState({
          areas_of_interest: stepThree?.options
            ?.filter((option) => option.value !== 'selectall')
            ?.map(({ value }) => value),
        });
      } else {
        updateStepsState({
          areas_of_interest: selectedOptionsProp?.map(({ value }) => value),
        });
      }
    }
  };

  const closeThankYouModal = () => {
    onClose();
    router.push('/clicks');
  };
  const isTcpa_text_edp: boolean =
    school?.tcpa_text_edp !== undefined
      ? containsAlphabets(school?.tcpa_text_edp)
      : false;

  return school !== null ? (
    <>
      <Stack className='primaryContainer' pt={['60px', '80px', '80px', '80px']}>
        <Flex
          className={`${deviceType === 'Mobile' ? 'true' : 'false'}`}
          gap={['28px', '28px', '121px', '121px']}
          pt='26px'
          pb={['92px', '92px', '165px', '165px']}
          direction={`${deviceType === 'Mobile' ? 'column' : 'row'}`}
        >
          <Box width={`${deviceType === 'Mobile' ? '100%' : '50%'}`}>
            <Image
              loading='lazy'
              quality={Image_Quality}
              src={school?.logo}
              alt='logo'
              width={500}
              height={240}
              style={{ display: 'inline-block' }}
            />
            <Text
              mt='26px'
              fontSize='36px'
              fontFamily='IBM Plex Sans'
              fontWeight='600'
              color='ED.navyBlue'
            >
              {school.name}
            </Text>
            <Hide breakpoint={`(max-width: ${primary.breakpoints[1]})`}>
              <Box mt='26px'>
                <Text
                  fontSize='16px'
                  fontFamily='IBM Plex Sans'
                  fontWeight='400'
                  color='ED.dark'
                >
                  {school.description}
                </Text>
              </Box>
            </Hide>
            <Box mt='26px'>
              <UnorderedList className={badge_list}>
                {badge?.map((item, index) => {
                  return (
                    <ListItem key={item.name} className={badge_list_item}>
                      <Box className={badge_item}>
                        <Image
                          key={`${index}`}
                          loading='lazy'
                          quality={Image_Quality}
                          src={item.icon}
                          alt={item.icon}
                          style={{ display: 'inline-block' }}
                          // className={edu_star_icon}
                        />
                        <Box>
                          <Text
                            fontSize='12px'
                            fontFamily='IBM Plex Sans'
                            fontWeight='400'
                            color='ED.dark'
                          >
                            {item.name}
                          </Text>
                        </Box>
                      </Box>
                    </ListItem>
                  );
                })}
              </UnorderedList>
            </Box>
            <Hide breakpoint={`(max-width: ${primary.breakpoints[1]})`}>
              <Box mt='42px'>
                <Box>
                  <List>
                    {school.offers
                      ?.sort((a: any, b: any) => a.order - b.order)
                      .map((feature: any, index: number) => {
                        if ('.' === feature.description) {
                          return (
                            <ListItem
                              key={`${feature.title}-${index}`}
                              mt='28px'
                              fontSize='22px' // Increased font size to 22px for elements with a placeholder '.'
                              fontFamily='IBM Plex Sans'
                              fontWeight='600'
                              color='ED.navyBlue'
                            >
                              {feature.title}
                            </ListItem>
                          );
                        }
                        return (
                          <ListItem
                            key={`${feature.title}-${index}`}
                            mt='28px'
                            fontSize='16px'
                            fontFamily='IBM Plex Sans'
                            fontWeight='600'
                            color='ED.navyBlue'
                          >
                            <Flex gap='2' align='center'>
                              <Image
                                key={`${feature.icon}`}
                                loading='lazy'
                                quality={Image_Quality}
                                src={feature?.icon}
                                alt='icon'
                                width='30'
                                height='30'
                                style={{ display: 'inline-block' }}
                              />
                              {feature.title}
                            </Flex>
                            <Box pl='34px'>
                              <List>
                                <ListItem
                                  mt='11px'
                                  fontSize='16px'
                                  fontFamily='IBM Plex Sans'
                                  fontWeight='400'
                                  color='ED.dark'
                                >
                                  {feature.description}
                                </ListItem>
                              </List>
                            </Box>
                          </ListItem>
                        );
                      })}
                  </List>
                </Box>
              </Box>
            </Hide>
          </Box>
          <Box width={`${deviceType === 'Mobile' ? '100%' : '50%'}`}>
            <form>
              <Box>
                <Button
                  className={white_btn}
                  bg='ED.white'
                  h='54px'
                  _hover={{ background: 'ED.white' }}
                >
                  <Image
                    loading='lazy'
                    quality={Image_Quality}
                    src={groupIcon}
                    alt='icon'
                    style={{ display: 'inline-block' }}
                  />
                  <Text
                    fontSize='16px'
                    fontFamily='IBM Plex Sans'
                    fontWeight='600'
                    color='ED.navyBlue'
                  >
                    {school?.student_acceptance}
                  </Text>
                </Button>
              </Box>
              {(school?.accepting_candidates as boolean) && (
                <Box mt='16px'>
                  <Stack>
                    <Box minH='796px' w='100%' className={uni_form}>
                      <Box className={uni_form_header} bg='ED.navyBlue'>
                        <Image
                          loading='lazy'
                          quality={Image_Quality}
                          src={groupIcon}
                          alt='icon'
                          style={{ display: 'inline-block' }}
                        />
                        <Text
                          fontSize='22px'
                          fontFamily='IBM Plex Sans'
                          fontWeight='600'
                          color='ED.white'
                        >
                          Accepting students now
                        </Text>
                      </Box>
                      <Box p={['17px', '17px', '26px', '26px']}>
                        <Stack
                          h={['100%', '100%', '366px', '366px']}
                          w='100%'
                          pb='10'
                          gap='4'
                          className={uni_form_fields}
                        >
                          <Flex
                            gap='4'
                            flexDir={['column', 'column', 'row', 'row']}
                            px='2.5'
                            pt='2'
                          >
                            <InputGroup>
                              <Input
                                placeholder='First name'
                                bg='ED.white'
                                data-testid='first_name'
                                h='52px'
                                _placeholder={{
                                  color: 'ED.lightGray',
                                  fontSize: '14px',
                                  fontWeight: '400',
                                }}
                                _invalid={{
                                  border: `1px solid ${primary.colors.ED.valencia}`,
                                }}
                                color='ED.primary'
                                border={
                                  stepsData.first_name.length > 2
                                    ? `1px solid ${primary.colors.ED.primary}`
                                    : 'unset'
                                }
                                fontSize='16px'
                                fontFamily='IBM Plex Sans'
                                fontWeight='600'
                                value={stepsData.first_name}
                                isInvalid={
                                  validateForm &&
                                  stepsData.first_name.length <= 3
                                }
                                onChange={(e) =>
                                  updateStepsState({
                                    first_name: e.target.value,
                                  })
                                }
                              />
                              <InputRightElement h='100%' pr='3'>
                                {stepsData.first_name.length > 3 ? (
                                  <Image src={checkIcon} alt='checkIcon' />
                                ) : null}
                              </InputRightElement>
                            </InputGroup>

                            <InputGroup>
                              <Input
                                placeholder='Last name'
                                bg='ED.white'
                                data-testid='last_name'
                                h='52px'
                                _invalid={{
                                  border: `1px solid ${primary.colors.ED.valencia}`,
                                }}
                                _placeholder={{
                                  color: 'ED.lightGray',
                                  fontSize: '14px',
                                  fontWeight: '400',
                                }}
                                border={
                                  stepsData.last_name.length > 2
                                    ? `1px solid ${primary.colors.ED.primary}`
                                    : 'unset'
                                }
                                color='ED.primary'
                                fontSize='16px'
                                fontFamily='IBM Plex Sans'
                                fontWeight='600'
                                isInvalid={
                                  validateForm &&
                                  stepsData.last_name.length <= 3
                                }
                                value={stepsData.last_name}
                                onChange={(e) =>
                                  updateStepsState({
                                    last_name: e.target.value,
                                  })
                                }
                              />
                              <InputRightElement h='100%' pr='3'>
                                {stepsData.last_name.length > 3 ? (
                                  <Image src={checkIcon} alt='checkIcon' />
                                ) : null}
                              </InputRightElement>
                            </InputGroup>
                          </Flex>
                          <Box px='2.5'>
                            <InputGroup>
                              <Input
                                placeholder='Email'
                                bg='ED.white'
                                type='email'
                                h='52px'
                                _invalid={{
                                  border: `1px solid ${primary.colors.ED.valencia}`,
                                }}
                                _placeholder={{
                                  color: 'ED.lightGray',
                                  fontSize: '14px',
                                  fontWeight: '400',
                                }}
                                onBlur={async () => {
                                  setIsEmailValid(
                                    stepsData.email.trim()?.length > 1
                                      ? validateEmailWithRegex(stepsData.email)
                                      : false,
                                  );
                                }}
                                border={
                                  stepsData.email.length > 3 && isEmailValid
                                    ? `1px solid ${primary.colors.ED.primary}`
                                    : 'unset'
                                }
                                color='ED.primary'
                                isInvalid={validateForm && !isEmailValid}
                                fontSize='16px'
                                fontFamily='IBM Plex Sans'
                                fontWeight='600'
                                value={stepsData.email}
                                onChange={(e) => {
                                  updateStepsState({
                                    email: e.target.value,
                                  });
                                }}
                              />
                              <InputRightElement h='100%' pr='3'>
                                {stepsData.email.length > 1 && isEmailValid ? (
                                  <Image src={checkIcon} alt='checkIcon' />
                                ) : null}
                              </InputRightElement>
                            </InputGroup>
                          </Box>
                          <Box px='2.5'>
                            <Select
                              placeholder={stepFour?.dropDown[0]?.placeholder}
                              bg='ED.white'
                              data-testid='current_education_level'
                              h='52px'
                              _placeholder={{
                                color: 'ED.lightGray',
                                fontSize: '14px',
                                fontWeight: '400',
                              }}
                              border={
                                stepsData.current_education_level.length > 0
                                  ? `1px solid ${primary.colors.ED.primary}`
                                  : 'unset'
                              }
                              value={stepsData.current_education_level}
                              color={
                                stepsData.current_education_level.length > 0
                                  ? 'ED.primary'
                                  : 'ED.lightGray'
                              }
                              fontWeight={
                                stepsData.current_education_level.length > 0
                                  ? 500
                                  : 400
                              }
                              fontSize={
                                stepsData.current_education_level.length > 0
                                  ? '16px'
                                  : '14px'
                              }
                              lineHeight='22px'
                              _invalid={{
                                border: `1px solid ${primary.colors.ED.valencia}`,
                              }}
                              isInvalid={
                                validateForm &&
                                stepsData.current_education_level.length < 1
                              }
                              fontFamily='IBM Plex Sans'
                              onChange={(e) =>
                                updateStepsState({
                                  current_education_level: e.target.value,
                                })
                              }
                            >
                              {stepFour?.dropDown[0]?.options.map((item) => {
                                return (
                                  <option key={item.value} value={item.value}>
                                    {item.title}
                                  </option>
                                );
                              })}
                            </Select>
                          </Box>
                          <Box px='2.5'>
                            <Select
                              data-testid='hsyear'
                              placeholder={stepFour?.dropDown[1]?.placeholder}
                              color={
                                stepsData.hsyear.length < 1
                                  ? 'ED.lightGray'
                                  : validateForm && stepsData.hsyear.length < 1
                                    ? 'ED.danger'
                                    : 'ED.primary'
                              }
                              isInvalid={
                                validateForm && stepsData.hsyear.length < 1
                              }
                              _invalid={{
                                border: `1px solid ${primary.colors.ED.valencia}`,
                              }}
                              border={
                                stepsData.hsyear.length > 0
                                  ? `1px solid ${primary.colors.ED.primary}`
                                  : 'unset'
                              }
                              onChange={(e) =>
                                updateStepsState({
                                  hsyear: e.target.value,
                                })
                              }
                              value={stepsData.hsyear}
                              bg='ED.white'
                              h='52px'
                              _placeholder={{
                                color: 'ED.lightGray',
                                fontSize: '14px',
                                fontWeight: '400',
                              }}
                              fontSize={
                                stepsData.hsyear.length > 0 ? '16px' : '14px'
                              }
                              fontWeight={
                                stepsData.hsyear.length > 0 ? 500 : 400
                              }
                              fontFamily='IBM Plex Sans'
                            >
                              {stepFour?.dropDown[1]?.options.map((item) => {
                                return (
                                  <option key={item.value} value={item.value}>
                                    {item.title}
                                  </option>
                                );
                              })}
                            </Select>
                          </Box>

                          <Box px='2.5'>
                            <Select
                              placeholder='Preferred Start Date'
                              bg='ED.white'
                              h='52px'
                              border={
                                stepsData.preferred_enrollment.length > 0
                                  ? `1px solid ${primary.colors.ED.primary}`
                                  : 'unset'
                              }
                              color={
                                stepsData.preferred_enrollment.length < 1
                                  ? 'ED.lightGray'
                                  : validateForm &&
                                      stepsData.preferred_enrollment.length < 1
                                    ? 'ED.danger'
                                    : 'ED.primary'
                              }
                              fontFamily='IBM Plex Sans'
                              _placeholder={{
                                color: '#888888',
                                opacity: 0.5,
                                fontSize: '14px',
                                fontWeight: '400',
                                lineHeight: '22px',
                              }}
                              _invalid={{
                                border: `1px solid ${primary.colors.ED.valencia}`,
                              }}
                              _selected={{
                                color: 'ED.primary',
                                fontSize: '16px',
                                fontWeight: '600',
                              }}
                              fontSize={
                                stepsData.preferred_enrollment.length > 0
                                  ? '16px'
                                  : '14px'
                              }
                              fontWeight={
                                stepsData.preferred_enrollment.length > 0
                                  ? 500
                                  : 400
                              }
                              defaultValue={stepsData.preferred_enrollment}
                              isInvalid={
                                validateForm &&
                                stepsData.preferred_enrollment.length < 1
                              }
                              onChange={(e) =>
                                updateStepsState({
                                  preferred_enrollment: e.target?.value,
                                })
                              }
                            >
                              {stepTwo?.options?.map((item) => {
                                return (
                                  <option key={item.value} value={item.value}>
                                    {item.title}
                                  </option>
                                );
                              })}
                            </Select>
                          </Box>
                          <Flex
                            gap='4'
                            px='2.5'
                            flexDir={['column', 'column', 'row', 'row']}
                          >
                            <InputGroup>
                              <Input
                                placeholder='Phone number'
                                bg='ED.white'
                                h='52px'
                                data-testid='phone'
                                border={
                                  stepsData.phone.length > 9
                                    ? `1px solid ${primary.colors.ED.primary}`
                                    : 'unset'
                                }
                                _placeholder={{
                                  color: 'ED.lightGray',
                                  fontSize: '14px',
                                  fontWeight: '400',
                                }}
                                _invalid={{
                                  border: `1px solid ${primary.colors.ED.valencia}`,
                                }}
                                color='ED.primary'
                                fontSize='16px'
                                type='tel'
                                maxLength={14}
                                fontFamily='IBM Plex Sans'
                                fontWeight='600'
                                isInvalid={
                                  validateForm && stepsData.phone.length !== 10
                                }
                                value={validatePhone(stepsData.phone)}
                                onChange={(e) =>
                                  updateStepsState({
                                    phone: e.target.value?.replace(
                                      /[^+\d]+/g,
                                      '',
                                    ),
                                  })
                                }
                              />
                              <InputRightElement h='100%' pr='3'>
                                {stepsData.phone.length > 9 ? (
                                  <Image src={checkIcon} alt='checkIcon' />
                                ) : null}
                              </InputRightElement>
                            </InputGroup>
                          </Flex>
                          <Box px='2.5' pb='1'>
                            <AddressAutocomplete
                              onSelectAddress={handleAddressSelect}
                              placeholder='Street address'
                              isSchool
                              invalid={
                                validateForm &&
                                stepsData.address_line1?.length < 1
                              }
                              bg={primary.colors.ED.white}
                              value={stepsData.address_line1}
                              isWhiteG
                              variant='dark'
                            />
                          </Box>

                          <Box px='2.5'>
                            <Select
                              data-testid='online_or_campus'
                              placeholder='I’d Like my Classes'
                              color={
                                stepsData.online_or_campus.length < 1
                                  ? 'ED.lightGray'
                                  : validateForm &&
                                      stepsData.online_or_campus.length < 1
                                    ? 'ED.danger'
                                    : 'ED.primary'
                              }
                              isInvalid={
                                validateForm &&
                                stepsData.online_or_campus.length < 1
                              }
                              _invalid={{
                                border: `1px solid ${primary.colors.ED.valencia}`,
                              }}
                              border={
                                stepsData.online_or_campus.length > 0
                                  ? `1px solid ${primary.colors.ED.primary}`
                                  : 'unset'
                              }
                              onChange={(e) =>
                                updateStepsState({
                                  online_or_campus: e.target.value,
                                })
                              }
                              value={stepsData.online_or_campus}
                              bg='ED.white'
                              h='52px'
                              _placeholder={{
                                color: 'ED.lightGray',
                                fontSize: '14px',
                                fontWeight: '400',
                              }}
                              fontSize={
                                stepsData.online_or_campus.length > 0
                                  ? '16px'
                                  : '14px'
                              }
                              fontWeight={
                                stepsData.online_or_campus.length > 0
                                  ? 500
                                  : 400
                              }
                              fontFamily='IBM Plex Sans'
                            >
                              {stepOne?.options.map((item) => {
                                return (
                                  <option key={item.value} value={item.value}>
                                    {item.title}
                                  </option>
                                );
                              })}
                            </Select>
                          </Box>

                          {/* Area of Interests */}
                          <Box px='2.5'>
                            <ReactSelect.default
                              placeholder='Which areas of study are you interested in?'
                              isMulti
                              value={selectedOptions}
                              menuPortalTarget={
                                typeof window !== 'undefined'
                                  ? document.body
                                  : undefined
                              }
                              menuPosition='fixed'
                              defaultValue={selectedOptions}
                              styles={{
                                control: (style) => ({
                                  ...style,
                                  fontSize:
                                    stepsData.areas_of_interest.length > 0
                                      ? '16px'
                                      : '14px',
                                  border: !validateForm
                                    ? 'none'
                                    : stepsData.areas_of_interest.length < 1
                                      ? `1px solid ${primary.colors.ED.danger}`
                                      : `1px solid ${primary.colors.ED.primary}`,
                                  minHeight: '52px',
                                  borderColor:
                                    validateForm &&
                                    stepsData.areas_of_interest.length < 1
                                      ? primary.colors.ED.danger
                                      : primary.colors.ED.primary,
                                  ':hover': {
                                    borderColor:
                                      stepsData.areas_of_interest.length < 1
                                        ? primary.colors.ED.danger
                                        : primary.colors.ED.primary,
                                  },
                                }),
                                singleValue: (style) => ({
                                  ...style,
                                  color:
                                    stepsData.areas_of_interest.length < 1
                                      ? 'ED.lightGray'
                                      : validateForm &&
                                          stepsData.areas_of_interest.length < 1
                                        ? 'ED.danger'
                                        : 'ED.primary',
                                }),
                                menuPortal: (provided) => ({
                                  ...provided,
                                  zIndex: 90,
                                }),
                                menu: (provided) => ({
                                  ...provided,
                                  zIndex: 90,
                                }),
                              }}
                              components={{
                                IndicatorSeparator: null,
                              }}
                              onChange={(props) => handleInterestSelect(props)}
                              className='basic-multi-select'
                              options={stepThree?.options.map(
                                ({ title, value }) => ({ label: title, value }),
                              )}
                            />
                          </Box>

                          {/* Currently Enrolled */}
                          <Box px='2.5'>
                            <Select
                              data-testid='currently_enrolled_in_college'
                              placeholder={stepFour.dropDown[2].placeholder}
                              color={
                                stepsData.currently_enrolled_in_college.length <
                                1
                                  ? 'ED.lightGray'
                                  : validateForm &&
                                      stepsData.currently_enrolled_in_college
                                        .length < 1
                                    ? 'ED.danger'
                                    : 'ED.primary'
                              }
                              isInvalid={
                                validateForm &&
                                stepsData.currently_enrolled_in_college.length <
                                  1
                              }
                              _invalid={{
                                border: `1px solid ${primary.colors.ED.valencia}`,
                              }}
                              value={stepsData.currently_enrolled_in_college}
                              border={
                                stepsData.currently_enrolled_in_college.length >
                                0
                                  ? `1px solid ${primary.colors.ED.primary}`
                                  : 'unset'
                              }
                              onChange={(e) =>
                                updateStepsState({
                                  currently_enrolled_in_college: e.target.value,
                                })
                              }
                              bg='ED.white'
                              h='52px'
                              _placeholder={{
                                color: 'ED.lightGray',
                                fontSize: '14px',
                                fontWeight: '400',
                              }}
                              fontSize={
                                stepsData.currently_enrolled_in_college.length >
                                0
                                  ? '16px'
                                  : '14px'
                              }
                              fontWeight={
                                stepsData.currently_enrolled_in_college.length >
                                0
                                  ? 500
                                  : 400
                              }
                              fontFamily='IBM Plex Sans'
                            >
                              {stepFour.dropDown[2]?.options.map((item) => {
                                return (
                                  <option key={item.value} value={item.value}>
                                    {item.title}
                                  </option>
                                );
                              })}
                            </Select>
                          </Box>

                          {/* Computer Internet Access */}
                          <Box px='2.5'>
                            <Select
                              data-testid='computer_internet_access'
                              placeholder='Do you have access to the internet?'
                              color={
                                stepsData.computer_internet_access.length < 1
                                  ? 'ED.lightGray'
                                  : validateForm &&
                                      stepsData.computer_internet_access
                                        .length < 1
                                    ? 'ED.danger'
                                    : 'ED.primary'
                              }
                              isInvalid={
                                validateForm &&
                                stepsData.computer_internet_access.length < 1
                              }
                              _invalid={{
                                border: `1px solid ${primary.colors.ED.valencia}`,
                              }}
                              value={stepsData.computer_internet_access}
                              border={
                                stepsData.computer_internet_access.length > 0
                                  ? `1px solid ${primary.colors.ED.primary}`
                                  : 'unset'
                              }
                              onChange={(e) =>
                                updateStepsState({
                                  computer_internet_access: e.target.value,
                                })
                              }
                              bg='ED.white'
                              h='52px'
                              _placeholder={{
                                color: 'ED.lightGray',
                                fontSize: '14px',
                                fontWeight: '400',
                              }}
                              fontSize={
                                stepsData.computer_internet_access.length > 0
                                  ? '16px'
                                  : '14px'
                              }
                              fontWeight={
                                stepsData.computer_internet_access.length > 0
                                  ? 500
                                  : 400
                              }
                              fontFamily='IBM Plex Sans'
                            >
                              {[
                                { title: 'Yes', value: 'Yes' },
                                { title: 'No', value: 'No' },
                              ]?.map((item) => {
                                return (
                                  <option key={item.value} value={item.value}>
                                    {item.title}
                                  </option>
                                );
                              })}
                            </Select>
                          </Box>

                          {/* Multi  Columns */}
                          <Flex
                            gap='4'
                            flexDir={['column', 'column', 'row', 'row']}
                            px='2.5'
                            pt='2'
                          >
                            {/* Gender */}
                            <Box w='100%'>
                              <Select
                                data-testid='gender'
                                placeholder='Your gender'
                                color={
                                  stepsData.gender.length < 1
                                    ? 'ED.lightGray'
                                    : validateForm &&
                                        stepsData.gender.length < 1
                                      ? 'ED.danger'
                                      : 'ED.primary'
                                }
                                isInvalid={
                                  validateForm && stepsData.gender.length < 1
                                }
                                _invalid={{
                                  border: `1px solid ${primary.colors.ED.valencia}`,
                                }}
                                border={
                                  stepsData.gender.length > 0
                                    ? `1px solid ${primary.colors.ED.primary}`
                                    : 'unset'
                                }
                                onChange={(e) =>
                                  updateStepsState({
                                    gender: e.target.value,
                                  })
                                }
                                bg='ED.white'
                                h='52px'
                                _placeholder={{
                                  color: 'ED.lightGray',
                                  fontSize: '14px',
                                  fontWeight: '400',
                                }}
                                value={gender}
                                fontSize={
                                  stepsData.gender.length > 0 ? '16px' : '14px'
                                }
                                fontWeight={
                                  stepsData.gender.length > 0 ? 500 : 400
                                }
                                fontFamily='IBM Plex Sans'
                              >
                                {[
                                  { title: 'Male', value: 'Male' },
                                  { title: 'Female', value: 'Female' },
                                ]?.map((item) => {
                                  return (
                                    <option key={item.value} value={item.value}>
                                      {item.title}
                                    </option>
                                  );
                                })}
                              </Select>
                            </Box>

                            {/* Birth Year  */}
                            <Box w='100%'>
                              <Select
                                data-testid='age'
                                placeholder='Year of birth'
                                color={
                                  stepsData.age.length < 1
                                    ? 'ED.lightGray'
                                    : validateForm && stepsData.age.length < 1
                                      ? 'ED.danger'
                                      : 'ED.primary'
                                }
                                isInvalid={
                                  validateForm && stepsData.age.length < 1
                                }
                                _invalid={{
                                  border: `1px solid ${primary.colors.ED.valencia}`,
                                }}
                                value={age}
                                border={
                                  stepsData.age.length > 0
                                    ? `1px solid ${primary.colors.ED.primary}`
                                    : 'unset'
                                }
                                onChange={(e) =>
                                  updateStepsState({
                                    age: e.target.value,
                                  })
                                }
                                bg='ED.white'
                                h='52px'
                                _placeholder={{
                                  color: 'ED.lightGray',
                                  fontSize: '14px',
                                  fontWeight: '400',
                                }}
                                fontSize={
                                  stepsData.age.length > 0 ? '16px' : '14px'
                                }
                                fontWeight={
                                  stepsData.age.length > 0 ? 500 : 400
                                }
                                fontFamily='IBM Plex Sans'
                              >
                                {generateAgeYears()?.map((item) => {
                                  return (
                                    <option key={item.value} value={item.value}>
                                      {item.title}
                                    </option>
                                  );
                                })}
                              </Select>
                            </Box>
                          </Flex>

                          {/* US Citizen */}
                          <Box px='2.5'>
                            <Select
                              data-testid='us_citizen'
                              placeholder='Are you a US citizen?'
                              color={
                                stepsData.us_citizen.length < 1
                                  ? 'ED.lightGray'
                                  : validateForm &&
                                      stepsData.us_citizen.length < 1
                                    ? 'ED.danger'
                                    : 'ED.primary'
                              }
                              isInvalid={
                                validateForm && stepsData.us_citizen.length < 1
                              }
                              _invalid={{
                                border: `1px solid ${primary.colors.ED.valencia}`,
                              }}
                              value={stepsData.us_citizen}
                              border={
                                stepsData.us_citizen.length > 0
                                  ? `1px solid ${primary.colors.ED.primary}`
                                  : 'unset'
                              }
                              onChange={(e) =>
                                updateStepsState({
                                  us_citizen: e.target.value,
                                })
                              }
                              bg='ED.white'
                              h='52px'
                              _placeholder={{
                                color: 'ED.lightGray',
                                fontSize: '14px',
                                fontWeight: '400',
                              }}
                              fontSize={
                                stepsData.us_citizen.length > 0
                                  ? '16px'
                                  : '14px'
                              }
                              fontWeight={
                                stepsData.us_citizen.length > 0 ? 500 : 400
                              }
                              fontFamily='IBM Plex Sans'
                            >
                              {[
                                { title: 'Yes', value: 'Yes' },
                                { title: 'No', value: 'No' },
                              ]?.map((item) => {
                                return (
                                  <option key={item.value} value={item.value}>
                                    {item.title}
                                  </option>
                                );
                              })}
                            </Select>
                          </Box>

                          {/* US Miltary */}
                          <Box px='2.5'>
                            <Select
                              data-testid='military_status'
                              placeholder='Are you associated with the US Military?'
                              color={
                                stepsData.military.military_status.length < 1
                                  ? 'ED.lightGray'
                                  : validateForm &&
                                      stepsData.military.military_status
                                        .length < 1
                                    ? 'ED.danger'
                                    : 'ED.primary'
                              }
                              isInvalid={
                                validateForm &&
                                stepsData.military.military_status.length < 1
                              }
                              _invalid={{
                                border: `1px solid ${primary.colors.ED.valencia}`,
                              }}
                              border={
                                stepsData.military.military_status.length > 0
                                  ? `1px solid ${primary.colors.ED.primary}`
                                  : 'unset'
                              }
                              value={stepsData.military.military_status}
                              onChange={(e) =>
                                updateStepsState({
                                  military: {
                                    ...stepsData.military,
                                    military_status: e.target.value,
                                    military_affiliation:
                                      e.target.value === 'Yes' ? '' : 'None',
                                  },
                                })
                              }
                              bg='ED.white'
                              h='52px'
                              _placeholder={{
                                color: 'ED.lightGray',
                                fontSize: '14px',
                                fontWeight: '400',
                              }}
                              fontSize={
                                stepsData.military.military_status.length > 0
                                  ? '16px'
                                  : '14px'
                              }
                              fontWeight={
                                stepsData.military.military_status.length > 0
                                  ? 500
                                  : 400
                              }
                              fontFamily='IBM Plex Sans'
                            >
                              {[
                                { title: 'Yes', value: 'Yes' },
                                { title: 'No', value: 'No' },
                              ]?.map((item) => {
                                return (
                                  <option key={item.value} value={item.value}>
                                    {item.title}
                                  </option>
                                );
                              })}
                            </Select>
                          </Box>
                        </Stack>

                        <Box
                          data-testid='infoHandler'
                          mt={isTcpa_text_edp ? '16px' : ''}
                          px='2.5'
                        >
                          {isTcpa_text_edp ? (
                            <Box className={uni_form_terms}>
                              <TermsCheckbox
                                id='leadid_tcpa_disclosure'
                                changeHandler={(check) => {
                                  setAcceptingStudentData({
                                    ...acceptingStudentData,
                                    terms_and_condition: check,
                                  });
                                }}
                              />
                              <label htmlFor='leadid_tcpa_disclosure'>
                                <Text
                                  fontSize='14px'
                                  fontFamily='IBM Plex Sans'
                                  fontWeight='400'
                                  color='ED.dark'
                                >
                                  {school?.tcpa_text_edp}
                                </Text>
                              </label>
                            </Box>
                          ) : (
                            <Box data-testid='hide'></Box>
                          )}
                          <Button
                            bg='ED.dullSecondary'
                            color='ED.white'
                            borderRadius='26'
                            w='100%'
                            h='52px'
                            fontFamily='IBM Plex Sans'
                            fontSize='xl'
                            onClick={getInfoHandler}
                            fontWeight='600'
                            _hover={{ background: 'ED.dullSecondary' }}
                            my='16px'
                            id={`form-submit-school-${school.name}`}
                            isDisabled={!isEnabled}
                            className={`${!isEnabled && 'cursor-disabled'}`}
                          >
                            {loading ? (
                              <Loading height='32px' color='white' />
                            ) : (
                              'Get info'
                            )}
                          </Button>
                          <Text className='text-sm text-dark' px='2.5'>
                            {school?.tcpa_text_school
                              ?.replace(
                                '<phone>',
                                `${formattedPhoneNumberFunc(stepsData.phone)}`,
                              )
                              .replace('. Privacy policy.', ' ')}
                          </Text>

                          <Popover placement={isMobile ? 'top' : 'top-start'}>
                            <PopoverTrigger>
                              <Text
                                className='text-sm text-dark'
                                px='2.5'
                                pt='2.5'
                              >
                                * Click Here for Important Disclosures{' '}
                              </Text>
                            </PopoverTrigger>
                            <PopoverContent
                              maxH='400px'
                              overflowY='scroll'
                              w={isMobile ? undefined : '500px'}
                            >
                              <PopoverArrow />
                              <PopoverBody>
                                <Box whiteSpace='pre-wrap'>
                                  {school.important_disclosure}
                                </Box>
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </Box>
                      </Box>
                    </Box>
                    <Show breakpoint={`(max-width: ${primary.breakpoints[1]})`}>
                      <Box mt='26px'>
                        <Text
                          fontSize='16px'
                          fontFamily='IBM Plex Sans'
                          fontWeight='400'
                          color='ED.dark'
                        >
                          {school.description}
                        </Text>
                      </Box>
                    </Show>
                    <Show breakpoint={`(max-width: ${primary.breakpoints[1]})`}>
                      <Box mt='42px'>
                        <Text
                          fontSize='22px'
                          fontFamily='IBM Plex Sans'
                          fontWeight='600'
                          color='ED.navyBlue'
                        >
                          {school.name}
                        </Text>
                        <Box>
                          <List>
                            {school.offers
                              ?.sort((a: any, b: any) => a.order - b.order)
                              .map((item: any) => {
                                if ('.' === item.description) {
                                  return (
                                    <ListItem
                                      key={`${item.title}`}
                                      mt='28px'
                                      fontSize='22px'
                                      fontFamily='IBM Plex Sans'
                                      fontWeight='600'
                                      color='ED.navyBlue'
                                    >
                                      <Flex gap='2' align='center'>
                                        {item.title}
                                      </Flex>
                                    </ListItem>
                                  );
                                }
                                return (
                                  <ListItem
                                    key={`${item.title}`}
                                    mt='28px'
                                    fontSize='16px'
                                    fontFamily='IBM Plex Sans'
                                    fontWeight='600'
                                    color='ED.navyBlue'
                                  >
                                    <Flex gap='2' align='center'>
                                      <Image
                                        key={`${item.icon}`}
                                        loading='lazy'
                                        quality={Image_Quality}
                                        src={item?.icon}
                                        alt='icon'
                                        width='30'
                                        height='30'
                                        style={{ display: 'inline-block' }}
                                      />
                                      {item.title}
                                    </Flex>
                                    <Box pl='34px'>
                                      <List>
                                        <ListItem
                                          mt='11px'
                                          fontSize='16px'
                                          fontFamily='IBM Plex Sans'
                                          fontWeight='400'
                                          color='ED.dark'
                                        >
                                          {item.description}
                                        </ListItem>
                                      </List>
                                    </Box>
                                  </ListItem>
                                );
                              })}
                          </List>
                        </Box>
                      </Box>
                    </Show>
                  </Stack>
                </Box>
              )}
              <input
                id='leadid_token'
                name='universal_leadid'
                type='hidden'
                value=''
              />
            </form>
          </Box>
        </Flex>
        {isOpen && (
          <Box className='primaryContainer' pos='relative'>
            <ThankYouModal isOpen={isOpen} onClose={closeThankYouModal} />
          </Box>
        )}
      </Stack>
    </>
  ) : (
    <Box
      pt={['60px', '60px', '80px', '80px']}
      h='100dvh'
      className='primaryContainer'
    >
      <Heading
        size='md'
        textAlign='center'
        h='100%'
        alignItems='center'
        display='flex'
        justifyContent='center'
        m='auto'
      >
        Error: {error}
      </Heading>
    </Box>
  );
};

type IParams = {
  params: {
    school: string;
  };
};
export async function getStaticProps({ params }: IParams) {
  try {
    const { school } = params;
    const res = await fetchDataFrom(`schools/${school}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        `Oops! Something went wrong while fetching the schools. It seems that the information for ${school} couldn't be found. Please check the school name and try again`,
      );
    }

    return {
      props: {
        school: data,
        error: null,
      },
      revalidate: 10, // In seconds
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to get school static props', err);
    const error = err as Error;
    return {
      props: {
        error: error.message,
        school: null,
      },
    };
  }
}

export async function getStaticPaths() {
  const res = await fetchDataFrom('schools/');
  const schools = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = await schools?.map((school: { slug: string }) => ({
    params: { school: school?.slug },
  }));

  return { paths, fallback: 'blocking' };
}

export default Page;
