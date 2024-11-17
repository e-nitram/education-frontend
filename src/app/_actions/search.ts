'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  getResults,
  School,
  SearchBody,
  SearchResponse,
  submitSearch,
} from '@/app/_modules/offers';

// const OFFERS_DELAY = 2000;

/**
 * Calculate estimated value of an exclusive offer.
 *
 * @param offer The exclusive offer for consideration.
 * @return the expected return in USD.
 */
function _estimateExclusive(offer: School) {
  const hitRate = 0.5;
  return offer.payout * hitRate;
}

/**
 * Calculate estimated value of a number of shared offers.
 *
 * @param offers An array of offers for consideration.
 * @return the expected return in USD.
 */
function _estimateShared(offers: School[]) {
  const hitRate = 0.3;

  const payout = offers
    .slice(0, 3)
    .reduce((acc, offer) => (acc += offer.payout), 0);

  return hitRate * payout;
}

/**
 * Perform logic to determine whether to show exclusive or shared offers.
 *
 * @param offers an array of offer objects being considered.
 *
 * Upon estimation of expected return for various options, redirects the client to the option with the greatest estimated return.
 * POST: Cookies contains a key/value pair for the stringified exclusive or shared results.
 */
function _compareOptions(offers: School[]) {
  const exclusives: School[] = [];
  const shared: School[] = [];
  let maxPayout = 0;

  offers.forEach((offer) => {
    if ('true' == offer.is_exclusive) {
      exclusives.push(offer);
      if (maxPayout < offer.payout) {
        maxPayout = offer.payout;
      }
    } else {
      shared.push(offer);
    }
  });

  // if (null == exclusive) {
  //   cookies().set('results_shared', JSON.stringify(shared));
  //   redirect('/results');
  // }

  // const exclusiveValue = estimateExclusive(exclusive);
  // store exclusive in cookies
  // const sharedValue = estimateShared(shared);
  // store shared in cookies

  // if (exclusiveValue > sharedValue) {
  //   cookies().set('results_exclusive', JSON.stringify(exclusive));
  //   redirect('/exclusive');
  // }

  cookies().set('results', JSON.stringify(offers));
  cookies().set('results_exclusive', JSON.stringify(exclusives));
  cookies().set('results_shared', JSON.stringify(shared));

  return redirect('/sharedresults');
}

/**
 * Converts raw data into a search body and submits a search to the appropriate service. Returns null if there is an error or there are no search results.
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

/**
 * Responsible for mapping data from Leads DB objects into Offers API Search Body.
 *
 * @param {Partial<UserData>} data
 * @return {SearchBody}
 */
function convertToSearch(data: Partial<UserData>): SearchBody {
  // TODO: Determine whether to include UTMs and Session data from the data parameter or to fetch them from Leads DB
  const body: SearchBody = {
    accesskey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    prospect: {
      gender: data.gender ?? 'F',
      first_name: data.first_name ?? '',
      last_name: data.last_name ?? '',
      email: data.email ?? '',
      phone: data.phone ?? '',
      phone2: data.phone2 ?? '',
      address_line1: data.address_line1 ?? '',
      address_line2: data.address_line2 ?? '',
      city: data.city ?? '',
      state: data.state ?? '',
      zip_code: data.zip_code ?? '',
      computer_internet_access: data.computer_internet_access ?? '',
      age: data.age ?? '20',
      hsyear: data.hsyear ?? 2020,
      current_education_level: data.current_education_level ?? '',
      preferred_education_level: data.preferred_education_level ?? '',
      us_citizen: data.us_citizen ?? '',
      military: {
        military_status: data.military_status ?? '',
        military_affiliation: data.military_affiliation ?? '',
        relationship: data.relationship ?? '',
      },
      preferred_enrollment: data.preferred_enrollment ?? 0,
      online_or_campus: data.online_or_campus ?? '',
      ip: data.ip ?? '',
    },
    search: {
      areas_of_interest: data.areas_of_interest ?? [''],
      currently_enrolled_in_college: data.currently_enrolled_in_college ?? 'No',
      rn_license: data.rn_license ?? 'No',
      teaching_certificate: data.teaching_certificate ?? 'No',
      is_contacted_by_school: data.is_contacted_by_school ?? 'Yes',
      graduated_in_us: data.graduated_in_us ?? 'Yes',
      channel_name: 'web',
      ss1: data.ss1 ?? '',
      ss2: data.ss2 ?? '',
      ss3: data.ss3 ?? '',
      ss4: data.ss4 ?? '',
      web_url: data.web_url ?? '',
      webinitiatingurl: data.webinitiatingurl ?? '',
      traffic_trusted_form_url: data.traffic_trusted_form_url ?? '',
      traffic_jornaya_leadid: data.traffic_jornaya_leadid ?? '',
      traffic_trustedform_token: data.traffic_trustedform_token ?? '',
      traffic_category: data.traffic_category ?? '',
      supplier_jornaya_leadid: data.supplier_jornaya_leadid ?? '',
      supplier_trustedform_token: data.supplier_trustedform_token ?? '',
      supplier_trustedform_url: data.supplier_trustedform_url ?? '',
      time_to_call: data.time_to_call ?? '',
      callcenter: {
        cc_rep_id: 'NA',
        PublisherBrandName: 'NA',
        callid: '',
        sessionid: '',
        cc_inbound_transfer_company: '',
        cc_dba: '',
        cc_inbound_transfer_dba: '',
        cc_outbound_company: '',
      },
      test_flag: data.test_flag ?? 0,
      tcpa_text: data.tcpa_text ?? '',
    },
    other_info: {
      client_ids: data.client_ids ?? '',
      level_of_interest: data.level_of_interest ?? '',
      browser_user_agent: data.browser_user_agent ?? '',
      time_zone: data.time_zone ?? '',
      device_type: data.device_type ?? '',
      lead_unique_id: data.lead_unique_id ?? '',
      web_session_id: data.web_session_id ?? '',
      site_name: 'educationdirectory.net',
      landing_page: Array.isArray(data.utm_web_url)
        ? data.utm_web_url.shift()
        : data.utm_web_url ?? '/',
      supplier_campaign: Array.isArray(data.utm_campaign)
        ? data.utm_campaign.shift()
        : data.utm_campaign ?? 'web',
      utm_source: Array.isArray(data.utm_source)
        ? data.utm_source.shift()
        : data.utm_source ?? '',
      utm_medium: Array.isArray(data.utm_medium)
        ? data.utm_medium.shift()
        : data.utm_medium ?? '',
      utm_campaign: Array.isArray(data.utm_campaign)
        ? data.utm_campaign.shift()
        : data.utm_campaign ?? '',
      utm_content: Array.isArray(data.utm_content)
        ? data.utm_content.shift()
        : data.utm_content ?? '',
      utm_term: Array.isArray(data.utm_term)
        ? data.utm_term.shift()
        : data.utm_term ?? '',
      utm_supplier_id: Array.isArray(data.utm_supplier_id)
        ? data.utm_supplier_id.shift()
        : data.utm_supplier_id ?? '',
      utm_sub_id: Array.isArray(data.utm_sub_id)
        ? data.utm_sub_id.shift()
        : data.utm_sub_id ?? '',
      utm_ad_id: Array.isArray(data.utm_ad_id)
        ? data.utm_ad_id.shift()
        : data.utm_ad_id ?? '',
      utm_supplier: Array.isArray(data.utm_supplier)
        ? data.utm_supplier.shift()
        : data.utm_supplier ?? '',
      utm_web_url: Array.isArray(data.utm_web_url)
        ? data.utm_web_url.shift()
        : data.utm_web_url ?? '',
      utm_id: Array.isArray(data.utm_id)
        ? data.utm_id.shift()
        : data.utm_id ?? '',
      traffic_source_type: 'edu',
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
  let results = null;

  // await new Promise((resolve) => setTimeout(resolve, OFFERS_DELAY));
  results = await getResults(search);

  if (null == results) {
    // eslint-disable-next-line no-console
    console.error('ERROR: search initialization failed');
    return null;
  }

  // cookies().set('results', JSON.stringify(results));

  if (0 == results.length) {
    return results;
  }

  return redirect('/sharedresults');
}
