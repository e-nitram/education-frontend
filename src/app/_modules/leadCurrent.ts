/**
 * This module manages communication with the Lead Current API. The Lead Current API facilitates searches and submissions for offers.
 *
 * Postman API documentation: https://documenter.getpostman.com/view/2449900/SWLiaRir?version=latest
 */
'use server';

import { createClient } from '@supabase/supabase-js';

export interface PingBody {
  accesskey?: string;
  search_result_identifier: string;
  answers: Answer[];
}

export interface PingResponse {
  ping_passed: boolean;
  ping_score: string;
  ping_messages: string;
}

/**
 * Responsible for submitting valid data to the ping API. Not responsible for data validation.
 *
 * @param data
 * @return
 */
export async function submitPing(data: PingBody): Promise<PingResponse | null> {
  const body = {
    ...data,
    accesskey: process.env.NEXT_PUBLIC_LEADCURRENT_KEY,
  };

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const start = new Date().toISOString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LEADCURRENT_BASE_URL}/ping/`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    );
    const end = new Date().toISOString();

    const _supabaseRequest = await supabase
      .from('external_api_requests')
      .insert([
        {
          api_name: 'leadcurrent_ping',
          request_string: JSON.stringify(body),
          server_time: start,
        },
      ]);

    const data = await response.json();

    const _supabaseResponse = await supabase
      .from('external_api_responses')
      .insert([
        {
          api_name: 'leadcurrent_ping',
          response_string: JSON.stringify(data),
          server_time: end,
        },
      ]);

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error('ERROR: Received bad status posting ping to LC', response);
      return null;
    }

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to post ping to LC', data, error);
    return null;
  }
}

export interface SearchBody {
  accesskey?: string;
  prospect: {
    gender: 'M' | 'F' | 'Other';
    firstname: string;
    lastname: string;
    email: string;
    phone1: string;
    phone2: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
    internet: string;
    dob: string;
    hsgradyr: number;
    edulevel:
      | 'No High School Diploma or GED'
      | 'GED'
      | 'High School Diploma'
      | 'Some College 1-10 Credits'
      | 'Some College 11-30 Credits'
      | 'Some College 31-60 Credits'
      | 'Associates'
      | 'Bachelors'
      | 'Masters'
      | 'Doctoral';
    military: {
      status: 'Yes' | 'No';
      branch:
        | 'Marines'
        | 'Army National Guard'
        | 'Navy'
        | 'Army'
        | 'Coast Guard'
        | 'Air National Guard'
        | 'Air Force';
      relationship:
        | 'Other'
        | 'Spouse'
        | 'Self'
        | 'Friend'
        | 'Parent'
        | 'Partner'
        | 'Child'
        | 'Grandparent';
    };
    timeframe_months: number;
    ipaddress: string;
  };
  search: {
    areas_of_interest: (
      | 'Art & Design'
      | 'Business'
      | 'Computers & Technology'
      | 'Criminal Justice'
      | 'Culinary'
      | 'Education & Teaching'
      | 'Entertainment'
      | 'Health & Wellness'
      | 'Hospitality'
      | 'Language'
      | 'Legal & Paralegal'
      | 'Liberal Arts'
      | 'Massage And Physical Therapy'
      | 'Nursing'
      | 'Psychology And Counseling'
      | 'Religious Studies'
      | 'Science & Engineering'
      | 'Trade & Vo-Tech'
    )[];
    traffic_source_code: string;
    traffic_url: string;
    traffic_category:
      | 'Education'
      | 'Financial Aid'
      | 'Jobs or Careers'
      | 'Military'
      | 'Other'
      | 'Program Specific'
      | 'Scholarship';
    traffic_creative: string;
    traffic_leadid_token: string;
    traffic_trustedform_token: string;
    searchtype: 'WEB' | 'CALLCENTER';
    website: {
      search_url: string;
    };
    callcenter: {
      agent: string;
      brand: string;
      callid: string;
      sessionid: string;
      inbound_partner: string;
    };
    uleadid: string;
    trustedform_token: string;
    trustedform_url: string;
    trackingtoken: string;
  };
}

export interface SearchResponse {
  accesskey?: string;
  search_identifier: string;
}

/**
 * Responsible for submitting valid data to the search API. Not responsible for data validation.
 *
 * @param data
 * @return
 */
export async function submitSearch(
  data: SearchBody,
): Promise<SearchResponse | null> {
  const body = {
    ...data,
    accesskey: process.env.NEXT_PUBLIC_LEADCURRENT_KEY,
  };

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const start = new Date().toISOString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LEADCURRENT_BASE_URL}/search/`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    );
    const end = new Date().toISOString();

    const _supabaseRequest = await supabase
      .from('external_api_requests')
      .insert([
        {
          api_name: 'leadcurrent_search',
          request_string: JSON.stringify(body),
          server_time: start,
        },
      ]);

    const data = await response.json();

    const _supabaseResponse = await supabase
      .from('external_api_responses')
      .insert([
        {
          api_name: 'leadcurrent_search',
          response_string: JSON.stringify(data),
          server_time: end,
        },
      ]);

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error(
        'ERROR: Received bad status posting search to LC',
        response,
      );
      return null;
    }

    const answer = {
      search_identifier: data.search_identifier,
    };

    return answer;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to post search to LC', data, error);
    return null;
  }
}

/**
 * Responsible for submitting valid data to the transfers API. Not responsible for data validation.
 *
 * @param data
 * @return
 */
export async function submitTransfer(
  data: TransferBody,
): Promise<TransferResponse | null> {
  const body = {
    ...data,
    accesskey: process.env.NEXT_PUBLIC_LEADCURRENT_KEY,
  };

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const start = new Date().toISOString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LEADCURRENT_BASE_URL}/transfers/`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    );
    const end = new Date().toISOString();

    const _supabaseRequest = await supabase
      .from('external_api_requests')
      .insert([
        {
          api_name: 'leadcurrent_search',
          request_string: JSON.stringify(body),
          server_time: start,
        },
      ]);

    const data = await response.json();

    const _supabaseResponse = await supabase
      .from('external_api_responses')
      .insert([
        {
          api_name: 'leadcurrent_search',
          response_string: JSON.stringify(data),
          server_time: end,
        },
      ]);

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error(
        'ERROR: Received bad status posting transfers to LC',
        response,
      );
      return null;
    }

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to post transfers to LC', data, error);
    return null;
  }
}

export interface TransferBody {
  accesskey?: string;
  search_identifier: string;
  search_result_identifier: string;
  answers: Answer[];
}

export interface Answer {
  question_key: string;
  question_value: string;
}

export interface TransferResponse {
  Advisors: Advisor[];
  CustomScript: string;
  TransferPhone: string;
  AdvisorFieldName: string;
}

export interface Advisor {
  AdvisorName: string;
  AdvisorId: string;
  AdvisorFirstName: string | null;
  AdvisorLastName: string | null;
  AdvisorDescription: string | null;
  AdvisorEmail: string | null;
}

export interface ResultsBody {
  accesskey?: string;
  search_identifier: string;
}

export interface ResultsResponse {
  result_sets: ResultSet[];
}

export interface ResultSet {
  result_set_identifier: string;
  results: Result[];
}

export interface Result {
  result_set_identifier: string;
  result_identifier: string;
  distance_miles: number;
  degree_level: string;
  result_type: string;
  is_exclusive: boolean;
  payout: string;
  online: boolean;
  school: string;
  logo: string;
  brand_name: string;
  program: string;
  schoolid: string;
  clientid: string;
  consent: string;
  questions: Question[];
}

export interface Question {
  QuestionLabel: string;
  QuestionFieldName: string;
  QuestionType: 'DropDown' | 'TextBox' | 'HiddenField' | 'Radio';
  QuestionOptions: Option[];
  QuestionRequired: boolean;
  QuestionDescription: string;
  QuestionValue: null | string;
  IsVisible: boolean;
  QuestionNotes: string;
  Rules: null;
}

export interface Option {
  OptionLabel: string;
  OptionValue: string;
}

/**
 * Responsible for submitting valid data to the results API. Not responsible for data validation.
 *
 * @param data
 * @return
 */
export async function getResults(data: ResultsBody): Promise<School[] | null> {
  const body = {
    ...data,
    accesskey: process.env.NEXT_PUBLIC_LEADCURRENT_KEY,
  };

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const start = new Date().toISOString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LEADCURRENT_BASE_URL}/results/`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    );
    const end = new Date().toISOString();

    const _supabaseRequest = await supabase
      .from('external_api_requests')
      .insert([
        {
          api_name: 'leadcurrent_results',
          request_string: JSON.stringify(body),
          server_time: start,
        },
      ]);

    const programs = await response.json();

    const _supabaseResponse = await supabase
      .from('external_api_responses')
      .insert([
        {
          api_name: 'leadcurrent_results',
          response_string: JSON.stringify(programs),
          server_time: end,
        },
      ]);

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error(
        'ERROR: Received bad status posting results from LC',
        response,
      );
      return null;
    }

    const schools: School[] = [];

    programs.forEach((program: Result) => {
      const schoolId = program.schoolid;
      const inSchools = schools.findIndex(
        (school) => school.schoolid === schoolId,
      );

      if (0 <= inSchools) {
        schools[inSchools].programs.push({
          name: program.program,
          result_identifier: program.result_identifier,
          result_set_identifier: program.result_set_identifier,
          degree_level: program.degree_level,
        });
      } else {
        // Check for hidden questions and answer them by default
        const answers = answerHiddenQuestions(program);

        // Otherwise create a new school and add the program to the programs array
        schools.push({
          brand_name: program.brand_name,
          clientid: program.clientid,
          consent: program.consent,
          is_exclusive: program.is_exclusive ? 'true' : 'false',
          logo: program.logo,
          online: program.online,
          payout: program.payout,
          location: '',
          questions: program.questions,
          answers: answers,
          result_type: program.result_type,
          school: program.school,
          schoolid: program.schoolid,
          state: '',
          programs: [
            {
              name: program.program,
              result_identifier: program.result_identifier,
              result_set_identifier: program.result_set_identifier,
              degree_level: program.degree_level,
            },
          ],
        });
      }
    });

    return schools;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to post results from LC', data, error);
    return null;
  }
}

export interface School {
  brand_name: string;
  clientid: string;
  consent: string;
  is_exclusive: 'true' | 'false';
  location: string;
  logo: string;
  online: boolean;
  payout: string;
  questions?: Question[];
  answers?: Answer[];
  result_type: string;
  school: string;
  schoolid: string;
  state: string;
  programs: Program[];
  status?: boolean;
}

export interface Program {
  name: string;
  result_identifier: string;
  result_set_identifier: string;
  degree_level: string;
}

export interface SubmitBody {
  accesskey?: string;
  search_identifier: string;
  search_result_identifier: string;
  search_result_set_identifier: string;
  answers: Answer[];
}

export interface SubmitResponse {
  submission_result_identifier: string;
  success: boolean;
  messages: null | string[];
}

/**
 * Responsible for submitting valid data to the submit API. Not responsible for data validation.
 *
 * @param data
 * @return
 */
export async function submitOffer(
  data: SubmitBody,
): Promise<SubmitResponse | null> {
  const body = {
    ...data,
    accesskey: process.env.NEXT_PUBLIC_LEADCURRENT_KEY,
  };

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    const start = new Date().toISOString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LEADCURRENT_BASE_URL}/submit/`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    );
    const end = new Date().toISOString();

    const _supabaseRequest = await supabase
      .from('external_api_requests')
      .insert([
        {
          api_name: 'leadcurrent_submit',
          request_string: JSON.stringify(body),
          server_time: start,
        },
      ]);

    const data = await response.json();

    const _supabaseResponse = await supabase
      .from('external_api_responses')
      .insert([
        {
          api_name: 'leadcurrent_submit',
          response_string: JSON.stringify(data),
          server_time: end,
        },
      ]);

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error(
        'ERROR: Received bad status posting submission to LC',
        response,
      );
      return null;
    }

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to post submission to LC', data, error);
    return null;
  }
}

/**
 * Extracts hidden questions' answers from a program.
 *
 * @param {Result} program - The program object containing questions.
 * @returns {Answer[]} - An array of answers to hidden questions.
 */
function answerHiddenQuestions(program: Result): Answer[] {
  const answers: Answer[] = [];

  if (program.questions !== null) {
    program.questions.forEach((question: Question) => {
      if (false == question.IsVisible) {
        answers.push({
          question_key: question.QuestionFieldName,
          question_value: question.QuestionValue ?? '',
        });
      }
    });
  }

  return answers;
}
