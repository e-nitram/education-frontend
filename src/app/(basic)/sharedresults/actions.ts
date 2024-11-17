'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  ConsentBody,
  SubmissionBody,
  submitConsent,
  submitSubmission,
  submitTokens,
  TokenBody,
} from '@/app/_modules/lead';
// import { SubmitBody, submitOffer } from '@/app/_modules/offers';
import { SubmitBody, submitOffer } from '@/app/_modules/leadCurrent';

/**
 *
 * @param _previousState
 * @param formData
 */
export async function submitOffers(_previousState: any, formData: FormData) {
  const lead_id = cookies().get('leadId')?.value ?? 1;

  const currentDate = new Date();

  const consentBody: ConsentBody = {
    lead_id: +lead_id,
    tcpa_timestamp_traffic: currentDate.toISOString(),
    tcpa_timestamp_marketing: currentDate.toISOString(),
    tcpa_text_traffic: formData.get('leadid_tcpa_disclosure') as string,
    tcpa_timestamp_client: currentDate.toISOString(),
  };
  const _consent = await submitConsent(consentBody);

  const tokenBody: TokenBody = {
    lead_id: +lead_id,
    traffic_jornaya_lead_id:
      (formData.get('leadid_token') as string) ??
      '7A2968D6-4C06-5B1E-CCCB-220FD8818179',
    traffic_trusted_form_url:
      (formData.get('xxTrustedFormCertUrl') as string) ??
      'https://cert.trustedform.com/2a002d38bd755ce616bc4d7c2bd2b7983ff3daee',
    traffic_trustedform_token:
      (formData.get('xxTrustedFormToken') as string)?.split('/').pop() ??
      'https://cert.trustedform.com/2a002d38bd755ce616bc4d7c2bd2b7983ff3daee',
  };
  const _tokens = await submitTokens(tokenBody);

  // const searchData = cookies().get('search');
  // const search: SearchResponse = JSON.parse(searchData?.value ?? '');
  const search = {
    search_identifier: (formData.get('search-id') as string) ?? 'search_id',
  };

  const programEntries = Array.from(formData.entries()).filter(([key]) =>
    key.startsWith('program-'),
  );

  const promises = programEntries.map(async ([key, value]) => {
    const index = key.split('-').pop();

    const parsedResult = (value as string).split('::');

    const questionEntries = Array.from(formData.entries()).filter(([key]) =>
      key.startsWith(`question-${index}`),
    );

    const answers = questionEntries.map(([_key, value]) => {
      const parsedAnswer = (value as string).split('::');
      return {
        question_key: parsedAnswer[0],
        question_value: parsedAnswer[1],
        label: parsedAnswer[2],
      };
    });

    const submitBody: SubmitBody = {
      search_identifier: search.search_identifier,
      search_result_identifier: parsedResult[1],
      search_result_set_identifier: parsedResult[0],
      answers: answers,
    };

    const submission: SubmissionBody = {
      lead_id: +lead_id,
      search_id: search.search_identifier,
      result_set: parsedResult[0],
      result_id: parsedResult[1],
      brand: (formData.get(`brand_name-${index}`) as string) ?? '',
      value: +(formData.get(`payout-${index}`) as string) ?? 0,
      status: 'submitted',
    };

    const submitResponse = submitOffer(submitBody);
    const submissionResponse = submitSubmission(submission);

    return Promise.allSettled([submitResponse, submissionResponse]);
  });

  await Promise.allSettled(promises);

  cookies().set('submission', 'true');
  redirect('/clicks');
}
