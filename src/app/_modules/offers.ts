// Offers API: https://documenter.getpostman.com/view/18117470/Uze1w4eK

'use server';

export interface SearchBody {
  accesskey?: string;
  prospect: {
    gender: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    phone2: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    zip_code: string;
    computer_internet_access: string;
    age: string;
    hsyear: number;
    current_education_level: string;
    preferred_education_level: string;
    us_citizen: string;
    military: {
      military_status: string;
      military_affiliation: string;
      relationship: string;
    };
    preferred_enrollment: number;
    online_or_campus: string;
    ip: string;
  };
  search: {
    areas_of_interest: string[];
    currently_enrolled_in_college: string;
    rn_license: string;
    teaching_certificate: string;
    is_contacted_by_school: string;
    graduated_in_us: string;
    channel_name: string;
    ss1: string;
    ss2: string;
    ss3: string;
    ss4: string;
    web_url: string;
    webinitiatingurl: string;
    traffic_trusted_form_url: string;
    traffic_jornaya_leadid: string;
    traffic_trustedform_token: string;
    traffic_category: string;
    supplier_jornaya_leadid: string;
    supplier_trustedform_token: string;
    supplier_trustedform_url: string;
    time_to_call: string;
    callcenter: {
      cc_rep_id: string;
      PublisherBrandName: string;
      callid: string;
      sessionid: string;
      cc_inbound_transfer_company: string;
      cc_dba: string;
      cc_inbound_transfer_dba: string;
      cc_outbound_company: string;
    };
    test_flag: number;
    tcpa_text: string;
  };
  other_info: {
    client_ids: string;
    level_of_interest: string;
    browser_user_agent: string;
    time_zone: string;
    device_type: string;
    lead_unique_id: string;
    web_session_id: string;
    site_name: string;
    landing_page: string;
    supplier_campaign: string;
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_content: string;
    utm_term: string;
    utm_supplier_id: string;
    utm_sub_id: string;
    utm_ad_id: string;
    utm_supplier: string;
    utm_web_url: string;
    utm_id: string;
    traffic_source_type: string;
  };
}

export interface SearchResponse {
  accesskey?: string;
  search_identifier: string;
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
  messages: null | string;
}

interface ResultsRequest {
  search_identifier: string;
}

export interface School {
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
}

interface OffersProgram {
  result_set_identifier: string;
  result_identifier: string;
  brand_name: string;
  clientid: string;
  consent: string;
  degree_level: string;
  distance_miles: number;
  is_exclusive: 'true' | 'false';
  location: string;
  logo: string;
  online: boolean;
  payout: number;
  program: string;
  questions: Question[];
  result_type: string;
  school: string;
  schoolid: string;
  state: string;
}

export interface Question {
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
  QuestionType: 'DropDown' | 'TextBox' | 'HiddenField' | 'Radio';
  QuestionValue: string | null;
  Rules: string | null;
}

export interface Answer {
  question_key: string;
  question_value: string;
  label?: string;
}

export interface Program {
  name: string;
  result_identifier: string;
  result_set_identifier: string;
  degree_level: string;
}

/**
 * Posts data to the search endpoint of the Offers API.
 * PRE: body has been formatted and data have been validated.
 *
 * @param {SearchBody} data
 * @return {Promise<SearchResponse | null>} null if there are no results or an error in the request.
 */
export async function submitSearch(
  data: SearchBody,
): Promise<SearchResponse | null> {
  const body = {
    ...data,
    accesskey: process.env.NEXT_PUBLIC_ACCESS_KEY,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CANDIMAVEN_BASE_URL}/search`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error('ERROR: Received bad status posting search', response);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to post search', data, error);
    return null;
  }
}

/**
 * Uses the callback function of the Offers API to get search results. API returns an array of programs. Restructures this array into an object that relates programs under their school.
 *
 * @param {ResultsRequest} data
 * @returns {Promise<School[] | null>} null if there are no results or an error in the request.
 */
export async function getResults(
  data: ResultsRequest,
): Promise<School[] | null> {
  const body = {
    accesskey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    search_identifier: data.search_identifier,
    // search_identifier: 'MTI0ODY1MjY=',
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CANDIMAVEN_BASE_URL}/results`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error('ERROR: Received bad status fetching results', response);
      return null;
    }

    const programs = await response.json();

    const schools: School[] = [];

    programs.forEach((program: OffersProgram) => {
      const schoolId = program.schoolid;
      const inSchools = schools.findIndex(
        (school) => school.schoolid === schoolId,
      );

      if (0 <= inSchools) {
        // If the school already exists, add the program to its programs array
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
          is_exclusive: program.is_exclusive,
          location: program.location,
          logo: program.logo,
          online: program.online,
          payout: program.payout,
          questions: program.questions,
          answers: answers,
          result_type: program.result_type,
          school: program.school,
          schoolid: program.schoolid,
          state: program.state,
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

    schools.sort((a, b) => b.payout - a.payout); // should be redundant with Offers API ordering

    return schools;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to get search results', error);
    return null;
  }
}

/**
 * Polls the Offers API to get search results and updates the existing schools with new programs. Serves as a mutator to modify the object passed by reference.
 *
 * @param {ResultsRequest} data - The request data for fetching search results.
 * @param {School[]} previous - The array of schools from previous results.
 * @returns {Promise<void | null>} Returns null if there was an error and there is no data to return, otherwise mutates the object passed by reference.
 */
export async function pollResults(
  data: ResultsRequest,
  previous: School[],
): Promise<void | null> {
  const body = {
    accesskey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    search_identifier: data.search_identifier,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CANDIMAVEN_BASE_URL}/results`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error('ERROR: Received bad status polling results', response);
      return null;
    }

    const programs = await response.json();

    programs.forEach((program: OffersProgram) => {
      const schoolId = program.schoolid;
      const inSchools = previous.findIndex(
        (school) => school.schoolid === schoolId,
      );

      if (0 <= inSchools) {
        const programId = program.program;
        const inPrograms = previous[inSchools].programs.findIndex(
          (program) => programId == program.name,
        );

        if (0 > inPrograms) {
          previous[inSchools].programs.push({
            name: program.program,
            result_identifier: program.result_identifier,
            result_set_identifier: program.result_set_identifier,
            degree_level: program.degree_level,
          });
        }
      } else {
        // Check for hidden questions and answer them by default
        const answers = answerHiddenQuestions(program);

        // Otherwise create a new school and add the program to the programs array
        previous.push({
          brand_name: program.brand_name,
          clientid: program.clientid,
          consent: program.consent,
          is_exclusive: program.is_exclusive,
          location: program.location,
          logo: program.logo,
          online: program.online,
          payout: program.payout,
          questions: program.questions,
          answers: answers,
          result_type: program.result_type,
          school: program.school,
          schoolid: program.schoolid,
          state: program.state,
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

    previous.sort((a, b) => b.payout - a.payout); // should be redundant with Offers API ordering

    return;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to poll search results', error);
    return null;
  }
}

/**
 * Extracts hidden questions' answers from a program.
 *
 * @param {OffersProgram} program - The program object containing questions.
 * @returns {Answer[]} - An array of answers to hidden questions.
 */
function answerHiddenQuestions(program: OffersProgram): Answer[] {
  const answers: Answer[] = [];

  if (program.questions !== null) {
    program.questions.forEach((question) => {
      if (!question.IsVisible) {
        answers.push({
          question_key: question.QuestionFieldName,
          question_value: question.QuestionValue ?? '',
        });
      }
    });
  }

  return answers;
}

/**
 * Posts data to the submit endpoint of the Offers API.
 * PRE: body has been formatted and data have been validated.
 *
 * @param {SubmitBody} data
 * @return {Promise<SubmitResponse | null>} null if there are no results or an error in the request.
 */
export async function submitOffer(
  data: SubmitBody,
): Promise<SubmitResponse | null> {
  const body = {
    ...data,
    accesskey: process.env.NEXT_PUBLIC_ACCESS_KEY,
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CANDIMAVEN_BASE_URL}/submit`,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error('ERROR: Received bad status posting submission', response);
      return null;
    }

    return response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to submit offer', error);
    return null;
  }
}
