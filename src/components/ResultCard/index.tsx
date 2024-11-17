import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Grid,
  GridItem,
  Hide,
  Image as ChakraImage,
  Show,
  Text,
} from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useState } from 'react';

import { AppContext } from '@/context/AppContext';

import { SubmissionBody, submitSubmission } from '@/app/_modules/lead';
import { User } from '@/app/_modules/meta';
import { Callback } from '@/app/_objects/callback';
import { CANDIMAVEN_BASE_URL } from '@/appConstants';
import factorialIcon from '@/assets/icons/factorial.svg';
import {
  Answer,
  Program,
  Question,
  School,
} from '@/pages/api/getResultThankYouPages';
import { primary } from '@/theme';
import { InsertLeadResponse } from '@/typings';

import Card from '../Card';
import Select from '../Select';

interface IProps {
  school: School;
  submit: boolean;
  setIsSubmit: (val: boolean) => void;
  notIntrested: any;
  answer: (answers: Answer[]) => void;
}

export default function ResultCard({
  school,
  submit,
  setIsSubmit,
  notIntrested,
  answer,
}: IProps): JSX.Element {
  const { searchIdentifier, createCallback, stepsData } =
    useContext(AppContext);
  const [selectedProgram, setSelectedProgram] = useState<null | Program>(null);

  useEffect(() => {
    if (selectedProgram === null) {
      setSelectedProgram(school.programs[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitAll = useCallback(async () => {
    const body = {
      ...searchIdentifier,
      search_result_identifier:
        selectedProgram?.result_identifier ??
        school.programs[0].result_identifier,
      search_result_set_identifier:
        selectedProgram?.result_set_identifier ??
        school.programs[0].result_set_identifier,
      answers: school.answers,
    };

    const data = localStorage.getItem('leadRes') ?? '';
    const leadRes: InsertLeadResponse = JSON.parse(data);

    try {
      const offerResponse = await fetch(`${CANDIMAVEN_BASE_URL}/submit`, {
        method: 'POST',
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .catch((_err) => {
          return;
        });

      const offerResult = await offerResponse;

      if (false == offerResult.ok) {
        // eslint-disable-next-line no-console
        console.error(
          'ERROR: Result Card failed to submit',
          offerResponse,
          school,
        );
      }

      const submission: SubmissionBody = {
        lead_id: leadRes?.lead?.lead_id ?? -1,
        search_id: searchIdentifier.search_identifier,
        result_set:
          selectedProgram?.result_set_identifier ??
          school.programs[0].result_set_identifier,
        result_id:
          selectedProgram?.result_identifier ??
          school.programs[0].result_identifier,
        brand: school.brand_name,
        value: school.payout,
        status:
          true == offerResult[0].success
            ? 'accepted'
            : false == offerResult[0].success
              ? 'rejected'
              : 'submitted',
      };

      const _submissionPromise = submitSubmission(submission);

      if (true == offerResult[0].success) {
        window.dataLayer.push({
          event: 'purchase',
          ecommerce: {
            value: school.payout,
            currency: 'USD',
            items: {
              price: school.payout,
              quantity: 1,
              item_id: school.schoolid,
              item_name: school.brand_name,
              item_brand: 'results_offer',
            },
          },
        });

        createCallback(Callback.submission, school.payout);
      } else {
        window.dataLayer.push({
          event: 'rejection',
          ecommerce: {
            value: school.payout,
            currency: 'USD',
            items: {
              price: school.payout,
              quantity: 1,
              item_id: school.schoolid,
              item_name: school.brand_name,
              item_brand: 'results_offer',
            },
          },
        });
      }

      const capiBody: { value: number; item: string; user: User } = {
        value: true == offerResult[0].success ? school.payout : 0,
        item: school.brand_name,
        user: {
          agent: leadRes.session.browser_type,
          email: stepsData.email ?? leadRes.profile.email,
          phone: stepsData.phone ?? leadRes.profile.phone_primary,
          first: stepsData.first_name ?? leadRes.profile.first_name ?? '',
          last: stepsData.last_name ?? leadRes.profile.last_name ?? '',
          city: stepsData.city ?? leadRes.address.city,
          state: stepsData.state ?? leadRes.address.state,
          zip: stepsData.zip_code ?? leadRes.address.zip_code,
          ip: leadRes.session.client_ip,
        },
      };

      const _capiResponse = fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/utilities/capi/subscribe`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(capiBody),
        },
      );

      setIsSubmit(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('ERROR: Result Card failed to submit', e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (submit) {
      submitAll();
    }
  }, [submit, submitAll]);

  return (
    <Box
      data-testid='result-card'
      minH={['132px', '132px', '132px', '182px']}
      pt={['0px', '26px', '26px', '26px']}
      pos='relative'
      pl='0'
      w={['auto', '100%', '659px', '833px']}
      m={['0 0', '0 auto', '0 auto', '0 auto']}
    >
      <Box>
        <Card bgColor='white' h='100%'>
          <Grid
            templateColumns='repeat(12, 1fr)'
            gap='10px'
            p={['10px 16px', '10px 16px', '10px 16px', '16px 26px']}
          >
            <GridItem
              h='100%'
              alignContent='space-between'
              colSpan={[12, 12, 6, 5]}
            >
              <Box
                h='100%'
                style={{ backdropFilter: 'none' }}
                pos='relative'
                //  filter="blur(8px)"
                display='flex'
                flexDir={['row', 'row', 'column', 'column']}
                justifyContent='space-around'
                alignItems={['center', 'center', 'start', 'start']}
                backdropFilter={
                  null == school.questions || school.questions?.length > 0
                    ? 'blur(3px)'
                    : ''
                }
              >
                <Box>
                  <ChakraImage
                    maxW={['65px', '65px', '110px', '160px']}
                    maxH={['47px', '47px', '42px', '60px']}
                    src={school.logo}
                    alt=''
                  />
                </Box>
                <Text
                  pl={['17px', '17px', '0px', '0px']}
                  pr={['15px', '15px', '5px', '5px']}
                  fontFamily={primary.fonts.ED.primary}
                  fontSize={['18px', '18px', '18px', '22px']}
                  lineHeight={['24px', '24px', '24px', '28px']}
                  fontWeight='semibold'
                  color={primary.colors.ED.prussianBlue}
                >
                  {school.brand_name}
                </Text>
              </Box>
            </GridItem>
            <GridItem colSpan={[12, 12, 6, 7]}>
              <Box
                display='flex'
                flexDir='column'
                pos='relative'
                justifyContent='space-around'
                h='100%'
              >
                <Box>
                  <FormControl isRequired>
                    <Select
                      onSelect={({ value }) => {
                        setSelectedProgram(
                          school.programs.filter(
                            (program: Program) =>
                              program.result_identifier === value,
                          )[0],
                        );
                      }}
                      selectedOptions={{
                        title: selectedProgram?.name ?? school.programs[0].name,
                      }}
                      square
                      variant='dark'
                      bg={primary.colors.ED.lotion}
                      border={primary.colors.ED.dark}
                      placeholder='Select a Program'
                      options={school.programs?.map((program: Program) => ({
                        title: program.name,
                        value: program.result_identifier,
                      }))}
                      container={true}
                    />
                    {null == selectedProgram ? (
                      <FormHelperText>
                        Please select a program to continue.
                      </FormHelperText>
                    ) : (
                      <FormErrorMessage>
                        Selecting a program is required.
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
                <Hide breakpoint={`(max-width: ${primary.breakpoints[1]})`}>
                  <Box
                    display='flex'
                    justifyContent='flex-end'
                    pt='26px'
                    style={{ position: 'static', rowGap: '0' }}
                  >
                    <Text
                      fontSize={12}
                      fontFamily={primary.fonts.ED.primary}
                      fontWeight={400}
                      color={primary.colors.ED.dark}
                      lineHeight='22px'
                      onClick={() => notIntrested(school.schoolid)}
                    >
                      Not interested
                    </Text>
                  </Box>
                </Hide>
              </Box>
            </GridItem>
          </Grid>

          {school.questions?.map((question: Question) => {
            if ('HiddenField' != question.QuestionType) {
              return (
                <Box
                  key={question.QuestionDescription}
                  bg={primary.colors.ED.light}
                  px={['16px', '16px', '16px', '26px']}
                  py='6px'
                >
                  {
                    question?.QuestionType === 'DropDown' && (
                      <Select
                        bg={primary.colors.ED.white}
                        placeholder={question.QuestionLabel}
                        onSelect={({ label, value }) => {
                          const updatedAnswers = [...(school?.answers ?? [])];
                          const answerIndex = updatedAnswers.findIndex(
                            (answer) =>
                              answer.question_key ===
                              question.QuestionFieldName,
                          );

                          if (answerIndex !== -1) {
                            updatedAnswers[answerIndex] = {
                              question_key: question.QuestionFieldName,
                              question_value: value,
                              label: label,
                            };
                          } else {
                            updatedAnswers.push({
                              question_key: question.QuestionFieldName,
                              question_value: value,
                              label: label,
                            });
                          }

                          answer(updatedAnswers);
                        }}
                        selectedOptions={{
                          title:
                            null != school.answers && school.answers.length > 0
                              ? school.answers.find(
                                  (answer) =>
                                    answer.question_key ===
                                    question.QuestionFieldName,
                                )?.label ?? ''
                              : '',
                        }}
                        options={question.QuestionOptions?.map((opt: any) => ({
                          title: opt.OptionLabel,
                          value: opt.OptionValue,
                        }))}
                        icon={
                          null != school.answers &&
                          school.answers.length > 0 &&
                          school.answers.some(
                            (answer: Answer) =>
                              answer.question_key ===
                              question.QuestionFieldName,
                          )
                            ? school.answers.find(
                                (answer: Answer) =>
                                  answer.question_key ===
                                  question.QuestionFieldName,
                              )?.question_value?.length === 0
                              ? factorialIcon
                              : undefined
                            : factorialIcon
                        }
                        isInvalid={
                          null != school.answers &&
                          school.answers.length > 0 &&
                          school.answers.some(
                            (answer: Answer) =>
                              answer.question_key ===
                              question.QuestionFieldName,
                          )
                            ? school.answers.find(
                                (answer: Answer) =>
                                  answer.question_key ===
                                  question.QuestionFieldName,
                              )?.question_value?.length == 0
                            : true
                        }
                      />
                    )
                    // :
                  }
                </Box>
              );
            }
          })}
        </Card>

        <Show breakpoint={`(max-width: ${primary.breakpoints[1]})`}>
          <Box display='flex' justifyContent='space-between' mt='10px'>
            <Text
              fontSize={12}
              fontFamily={primary.fonts.ED.primary}
              fontWeight={400}
              color={primary.colors.ED.dark}
              lineHeight='22px'
              onClick={() => notIntrested(school.schoolid)}
            >
              Not interested
            </Text>
          </Box>
        </Show>
      </Box>
    </Box>
  );
}
