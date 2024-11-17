'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  getResults,
  School,
  SearchBody,
  SearchResponse,
  submitSearch,
} from '@/app/_modules/leadCurrent';

/**
 * Converts raw data into a search body and submits a search to the appropriate service. Returns null if there is an error or there are no search results.
 *
 * @param {Partial<UserData>} data
 * @return {Promise<null | SearchResponse>}
 *
 * POST: Cookies contains the search result identifier if successful
 */
export async function initiateSearch(
  data: Partial<UserData>,
): Promise<null | SearchResponse> {
  const body = convertToSearch(data);

  const response = await submitSearch(body);

  if (null == response) {
    return null;
  }

  cookies().set('search', JSON.stringify(response.search_identifier));
  return response;
}

/**
 * Responsible for mapping data from Partial<UserData> to the shape for Lead Current SearchBody.
 *
 * @param {Partial<UserData>} data
 * @return {SearchBody}
 */
function convertToSearch(data: Partial<UserData>): SearchBody {
  const body: SearchBody = {
    prospect: {
      gender:
        data.gender === 'M' || data.gender === 'Other' ? data.gender : 'F',
      firstname: data.first_name ?? '',
      lastname: data.last_name ?? '',
      email: data.email ?? '',
      phone1: data.phone ?? '',
      phone2: data.phone2 ?? '',
      street1: data.address_line1 ?? '',
      street2: data.address_line2 ?? '',
      city: data.city ?? '',
      state: data.state ?? '',
      zip: data.zip_code ?? '',
      internet: data.computer_internet_access ?? '',
      dob:
        null != data.age
          ? new Date(new Date().getFullYear() - +data.age, 0, 1).toISOString()
          : '2000-01-01T11:25:22.895Z',

      hsgradyr: data.hsyear ?? 2020,
      edulevel:
        data.current_education_level === 'No High School Diploma or GED' ||
        data.current_education_level === 'GED' ||
        data.current_education_level === 'High School Diploma' ||
        data.current_education_level === 'Some College 1-10 Credits' ||
        data.current_education_level === 'Some College 11-30 Credits' ||
        data.current_education_level === 'Some College 31-60 Credits' ||
        data.current_education_level === 'Associates' ||
        data.current_education_level === 'Bachelors' ||
        data.current_education_level === 'Masters' ||
        data.current_education_level === 'Doctoral'
          ? data.current_education_level
          : 'High School Diploma',
      military: {
        status:
          data.military_status === 'Yes' || data.military_status === 'No'
            ? data.military_status
            : 'No',
        branch:
          data.military_affiliation === 'Marines' ||
          data.military_affiliation === 'Army National Guard' ||
          data.military_affiliation === 'Navy' ||
          data.military_affiliation === 'Army' ||
          data.military_affiliation === 'Coast Guard' ||
          data.military_affiliation === 'Air National Guard' ||
          data.military_affiliation === 'Air Force'
            ? data.military_affiliation
            : 'Marines',
        relationship:
          data.relationship === 'Other' ||
          data.relationship === 'Spouse' ||
          data.relationship === 'Self' ||
          data.relationship === 'Friend' ||
          data.relationship === 'Parent' ||
          data.relationship === 'Partner' ||
          data.relationship === 'Child' ||
          data.relationship === 'Grandparent'
            ? data.relationship
            : 'Other',
      },
      timeframe_months: data.preferred_enrollment ?? 0,
      ipaddress: data.ip ?? '',
    },
    search: {
      areas_of_interest: (
        (data.areas_of_interest?.filter((interest) =>
          [
            'Art & Design',
            'Business',
            'Computers & Technology',
            'Criminal Justice',
            'Culinary',
            'Education & Teaching',
            'Entertainment',
            'Health & Wellness',
            'Hospitality',
            'Language',
            'Legal & Paralegal',
            'Liberal Arts',
            'Massage And Physical Therapy',
            'Nursing',
            'Psychology And Counseling',
            'Religious Studies',
            'Science & Engineering',
            'Trade & Vo-Tech',
          ].includes(interest),
        ) || [
          'Business',
        ]) as unknown as SearchBody['search']['areas_of_interest'][]
      ).flat(),
      traffic_source_code: data.utm_medium ?? '',
      traffic_url: data.utm_web_url ?? 'educationdirectory.net',
      traffic_category:
        data.utm_medium === 'Education' ||
        data.utm_medium === 'Financial Aid' ||
        data.utm_medium === 'Jobs or Careers' ||
        data.utm_medium === 'Military' ||
        data.utm_medium === 'Other' ||
        data.utm_medium === 'Program Specific' ||
        data.utm_medium === 'Scholarship'
          ? data.utm_medium
          : 'Education',
      traffic_creative: data.utm_id ?? '7A2968D6-4C06-5B1E-CCCB-220FD8818179',
      traffic_leadid_token:
        data.traffic_jornaya_leadid ??
        'https://cert.trustedform.com/2a002d38bd755ce616bc4d7c2bd2b7983ff3daee',
      traffic_trustedform_token:
        data.traffic_trustedform_token ??
        'https://cert.trustedform.com/2a002d38bd755ce616bc4d7c2bd2b7983ff3daee',
      searchtype: 'WEB',
      website: {
        search_url: data.utm_web_url ?? 'educationdirectory.net',
      },
      callcenter: {
        agent: '',
        brand: '',
        callid: '',
        sessionid: '',
        inbound_partner: '',
      },
      uleadid: data.traffic_jornaya_leadid ?? '',
      trustedform_token: data.traffic_trustedform_token ?? '',
      trustedform_url: data.traffic_trusted_form_url ?? '',
      trackingtoken: data.utm_supplier_id ?? '',
    },
  };

  return body;
}

/**
 * Initiates a search with the appropriate service.
 *
 * @param {SearchResponse} search
 * @return {Promise<School[] | null>}
 */
export async function initializeResults(
  search: SearchResponse,
): Promise<School[] | null> {
  const results = await getResults(search);

  if (null == results) {
    // eslint-disable-next-line no-console
    console.error('ERROR: lc search initialization failed');
    return null;
  }

  if (0 == results.length) {
    return results;
  }

  return redirect('/sharedresults');
}

export interface UserData {
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
  military_status: string;
  military_affiliation: string;
  relationship: string;
  preferred_enrollment: number;
  online_or_campus: string;
  ip: string;
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
  test_flag: number;
  tcpa_text: string;
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
}
