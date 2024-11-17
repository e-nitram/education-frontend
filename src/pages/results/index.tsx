import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  Hide,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import ResultCard from '@/components/ResultCard';

import { AppContext } from '@/context/AppContext';

import { schoolsList, thanksPolicy } from '@/appConstants';
import { primary } from '@/theme';
import { formattedPhoneNumberFunc } from '@/utils';

import { Answer, getResults, School } from '../api/getResultThankYouPages';
import ThankYouModal from '../../components/Thankyou-modal/thankyou-modal';

import styles from './index.module.css';

const { cardLoading, termCondition } = styles;

const ThankYou = (): JSX.Element => {
  const router = useRouter();
  const {
    updateCurrentPage,
    stepsData,
    setStepsData,
    updateNavType,
    searchIdentifier,
    setSearchIdentifier,
  } = useContext(AppContext);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [searchResults, setSearchResults] = useState<School[]>([]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  const [notIntrested, setNotIntersted] = useState<string[]>([]);
  const [policyString, setPolicyString] = useState(thanksPolicy);
  const [searchTill, setSearchTill] = useState(3);
  const [listingSchools, setListingSchools] = useState<School[]>();
  const [disabled, setDisabled] = useState(true);
  const [remaining, setRemaining] = useState(0);
  const [hasResults, setHasResults] = useState(false);

  useEffect(() => {
    setRemaining(searchResults?.length - notIntrested.length);
  }, [notIntrested.length, searchResults?.length]);

  useEffect(() => {
    setHasResults(searchResults?.length > 0 && remaining > 0 ? true : false);
  }, [remaining, searchResults?.length]);

  const [statement, setStatement] = useState(
    'Please wait while we find the best matches for you',
  );
  const [counter, setCounter] = useState(0);
  const statements = [
    'Please wait while we find the best matches for you',
    "Don't Put Your Life On Hold To Get An Education.",
    'A brighter future is steps away.',
    'Find your school. Use your experience to get ahead faster.',
    'We are searching top schools in your area to find the best offers for you!',
  ];

  useEffect(() => {
    setStepsData({ ...stepsData, current: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateNavType('tertiary');
    updateCurrentPage('thankyou');
  }, [updateCurrentPage, updateNavType]);

  const getSearchResults = useCallback(async () => {
    if (fetchCount > 15 || remaining > 3) {
      return;
    }

    try {
      let search_identifier = searchIdentifier.search_identifier;

      if (0 == search_identifier.length) {
        const lssearch_data = JSON.parse(
          localStorage.getItem('searchIdentifier') as string,
        );

        search_identifier = lssearch_data.search_identifier;

        setSearchIdentifier(lssearch_data);
      }

      const res = await getResults({
        search_identifier: search_identifier,
      });

      if (res !== null) {
        setSearchResults(res);
      }

      const delay = fetchCount < 5 ? 1000 : 2000;
      setTimeout(() => {
        setFetchCount((old) => old + 1);
      }, delay);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('ERROR: failed to run search results callback', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCount]);

  const rotate = useCallback(() => {
    const index = counter + 1;
    setStatement(statements[index % statements.length]);
    setCounter(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statements]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      if (fetchCount > 15 || remaining > 3) {
        clearTimeout(intervalID);
        return;
      }
      rotate();
    }, 1 * 2500);
    return () => clearInterval(intervalID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotate]);

  useEffect(() => {
    if (!showModal) {
      getSearchResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCount]);

  useEffect(() => {
    const submittedSchoolIdFromLS = localStorage.getItem('submittedSchoolId');
    if (submittedSchoolIdFromLS !== null) {
      const submittedSchoolId = JSON.parse(
        JSON.stringify(submittedSchoolIdFromLS),
      );
      startTransition(() =>
        setNotIntersted((prev) => [...prev, submittedSchoolId]),
      );
    }
  }, []);

  useEffect(() => {
    const copy = searchResults
      ?.slice(0, searchTill)
      ?.filter((result) => !notIntrested.includes(result.schoolid));

    copy.forEach((school) => {
      const oldAnswers =
        listingSchools?.find(
          (oldSchool) => oldSchool.schoolid == school.schoolid,
        )?.answers ?? [];
      const newAnswers = school.answers ?? [];

      school.answers = [...oldAnswers, ...newAnswers];

      if (null == school.brand_name) {
        return;
      }

      window.dataLayer = window.dataLayer ?? [];

      const existingItemIndex = window.dataLayer.findIndex(
        (item) => item.ecommerce?.items[0]?.item_name === school.brand_name,
      );

      if (existingItemIndex == -1) {
        window.dataLayer.push({
          event: 'add_to_cart',
          ecommerce: {
            currency: 'USD',
            value: school.payout,
            items: [
              {
                item_id: school.schoolid,
                item_name: school.brand_name,
                price: school.payout,
                item_brand: 'results_offer',
                quantity: 1,
              },
            ],
          },
        });
      }
    });

    setListingSchools(copy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notIntrested, searchResults, searchTill]);

  const updateAnswers = useCallback(
    (updatedAnswers: Answer[], schoolid: string) => {
      setListingSchools((prevListingSchools) => {
        if (prevListingSchools == null) {
          return;
        }

        return prevListingSchools.map((prevSchool) => {
          if (prevSchool.schoolid === schoolid) {
            prevSchool = {
              ...prevSchool,
              answers: updatedAnswers,
            };
          }
          return prevSchool;
        });
      });
    },
    [],
  );

  useEffect(() => {
    const universityNames = listingSchools?.map((r) => r?.brand_name);
    const formattedUniversityNames = universityNames?.join(', ') ?? '';
    const formattedPhoneNumber = formattedPhoneNumberFunc(stepsData.phone);
    const updatedPolicyString = thanksPolicy
      .replaceAll('universityNames', formattedUniversityNames)
      .replaceAll(
        'phone number(s),',
        `phone number(s) ${formattedPhoneNumber}, `,
      );

    setPolicyString(updatedPolicyString);
  }, [listingSchools, stepsData.phone]);

  useEffect(() => {
    if (searchResults?.length === 0 && remaining == 0 && fetchCount >= 2) {
      setShowModal(true);
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults, remaining, fetchCount]);

  const setIsSubmitCallback = useCallback(
    (val: boolean) => setIsSubmit(val),
    [],
  );

  const closeThankYouModal = () => {
    onClose();
    router.push('clicks');
  };

  useEffect(() => {
    let pendingAnswers = false;

    listingSchools?.forEach((school) => {
      if (null != school.questions) {
        school.questions.forEach((question) => {
          if (null == school.answers) {
            pendingAnswers = true;
          } else {
            if (
              undefined ==
              school.answers.find((answer) => {
                return question.QuestionFieldName == answer.question_key;
              })
            ) {
              pendingAnswers = true;
            }
          }
        });
      }
    });

    setDisabled(!(listingSchools && acceptTerms));
  }, [acceptTerms, listingSchools]);

  return (
    <Box mt={['60px', '60px', '80px', '80px']}>
      <Grid
        templateColumns={[
          'repeat(1, 1fr)',
          'repeat(1, 1fr)',
          'repeat(12, 1fr)',
          'repeat(12, 1fr)',
        ]}
      >
        <GridItem
          colSpan={5}
          pt={['0px', '0px', '28px', '28px']}
          pb={['13px', '13px', '26px', '85px']}
          bg={[
            primary.colors.ED.lotion,
            primary.colors.ED.lotion,
            primary.colors.ED.lotion,
            primary.colors.ED.white,
          ]}
          className='primaryContainer'
          pr='37px'
          display='flex'
          justifyContent='center'
          alignItems='center'
          h='100%'
        >
          <Box>
            <Heading
              pt={['16px', '16px', '0px', '0px']}
              fontFamily={primary.fonts.ED.secondary}
              fontSize={['26px', '26px', '42px', '60px']}
              fontWeight={['semibold', 'semibold', 'medium', 'medium']}
              color={primary.colors.ED.primary}
              lineHeight={['38px', '38px', '55px', '70px']}
              textAlign={['center', 'left', 'left', 'left']}
            >
              {hasResults
                ? `Submit requests for these ${listingSchools?.length} schools`
                : remaining === 0
                  ? statement
                  : statement}
            </Heading>
            {hasResults && (
              <>
                <Hide breakpoint={`(max-width: ${primary.breakpoints[1]})`}>
                  <Text
                    pt='26px'
                    fontFamily={primary.fonts.ED.primary}
                    fontSize='16px'
                    fontWeight='normal'
                    lineHeight='26px'
                    color={primary.colors.ED.dark}
                  >
                    Select the schools you prefer and they’ll be in touch to
                    help continue on your journey and to start meeting your
                    goals!
                  </Text>
                  <Text
                    pt='26px'
                    fontFamily={primary.fonts.ED.primary}
                    fontSize='16px'
                    fontWeight='normal'
                    lineHeight='26px'
                    color={primary.colors.ED.dark}
                  ></Text>
                  <Divider my='20px' />
                  {schoolsList?.map((school) => (
                    <UnorderedList display='none' key={school.id}>
                      <ListItem
                        pb='16px'
                        fontSize='14px'
                        lineHeight='20px'
                        fontWeight='bold'
                        color={primary.colors.ED.primary}
                      >
                        {school.title}
                      </ListItem>
                    </UnorderedList>
                  ))}
                </Hide>
              </>
            )}
          </Box>
        </GridItem>
        <GridItem
          w='100%'
          bg={[
            primary.colors.ED.lotion,
            primary.colors.ED.lotion,
            primary.colors.ED.light,
            primary.colors.ED.light,
          ]}
          colSpan={7}
          className='primaryContainer'
          pt={['0px', '0px', '28px', '28px']}
          pb='85px'
        >
          <Box>
            <Box
              display='flex'
              flexDir='column'
              pb='26px'
              minH={['100%', '100%', '473px', '550px']}
            >
              {searchResults?.length < 0 && fetchCount < 2 ? (
                <div className={cardLoading}>Loading...</div>
              ) : (
                <>
                  {listingSchools?.map((result, index) => (
                    <ResultCard
                      key={result.schoolid}
                      school={result}
                      submit={isSubmit}
                      setIsSubmit={setIsSubmitCallback}
                      notIntrested={(schoolid: string) => {
                        notIntrested.push(schoolid);
                        setNotIntersted([...notIntrested]);
                        if (searchResults.length > searchTill) {
                          setSearchTill((pre) => pre + 1);
                        }
                        window.dataLayer = window.dataLayer ?? [];
                        window.dataLayer.push({
                          event: 'remove_from_cart',
                          ecommerce: {
                            currency: 'USD',
                            value: result.payout,
                            items: [
                              {
                                item_id: result.schoolid,
                                item_name: result.brand_name,
                                index: index,
                                price: result.payout,
                                item_brand: 'results_offer',
                                quantity: 1,
                              },
                            ],
                          },
                        });
                      }}
                      answer={(updatedAnswers: Answer[]) =>
                        updateAnswers(updatedAnswers, result.schoolid)
                      }
                    />
                  ))}
                  {searchResults?.length < 3 && fetchCount < 2 && (
                    <Box className={cardLoading}>Searching...</Box>
                  )}
                </>
              )}
            </Box>
            {!!hasResults && (
              <>
                <Box
                  className={termCondition}
                  bg='transparent'
                  h='100%'
                  py='10px'
                  w={['100%', '100%', '659px', '832px']}
                  m='auto'
                >
                  <div className='flex flex-row gap-2 py-4'>
                    <div className='align-center inline-flex'>
                      <label
                        className='relative flex cursor-pointer items-center rounded-full p-3'
                        htmlFor='customStyle'
                      >
                        <input
                          type='checkbox'
                          className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-lg border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-dark before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-primary checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                          id='leadid_tcpa_disclosure_results'
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
                    {/* <input id='tcpa_checkbox' type='checkbox' required defaultChecked /> */}
                    <label
                      htmlFor='leadid_tcpa_disclosure_results'
                      className='relative cursor-pointer font-sans text-12'
                    >
                      {policyString}
                    </label>
                  </div>
                </Box>
                <Box
                  className='thankyou__submitRequest'
                  mt='16px'
                  maxW={['100%', '100%', '659px', '832px']}
                  m='auto'
                >
                  <button
                    className={`btn-primary thankyou__submitBtn  w-btn  h-btn h4 text-white
                     ${disabled ? 'cursor-disabled' : ''}`}
                    disabled={disabled}
                    style={{ opacity: disabled ? '0.5' : '1' }}
                    id='lead-submit-results'
                    onClick={async () => {
                      setIsSubmit(true);
                      setShowModal(true);
                      onOpen();
                    }}
                  >
                    Submit
                  </button>
                  <input
                    id='leadid_token'
                    name='universal_leadid'
                    type='hidden'
                    value=''
                  />
                </Box>
              </>
            )}
          </Box>
        </GridItem>
      </Grid>

      {isOpen && (
        <Box className='primaryContainer' pos='relative'>
          <ThankYouModal isOpen={isOpen} onClose={closeThankYouModal} />
        </Box>
      )}
    </Box>
  );
};

export default ThankYou;
