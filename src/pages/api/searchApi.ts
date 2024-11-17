import { ACCESS_KEY, APP_DATA, CANDIMAVEN_BASE_URL } from '@/appConstants';
import { ISearchBody, ISearchResponse, TBoolean } from '@/typings';

// Prepare search body
export function prepareSearchBody(state: any, type = 'getstarted') {
  const queryParams = localStorage.getItem('queryParams');
  const storedQueryParams = queryParams !== null ? JSON.parse(queryParams) : {};

  const {
    email,
    gender,
    first_name,
    last_name,
    address_line1,
    zip_code,
    computer_internet_access,
    hsyear,
    us_citizen,
    preferred_enrollment,
    online_or_campus,
    rn_license,
    military,
    phone,
    tcpa,
    teaching_certificate,
    current_education_level,
    currently_enrolled_in_college,
    areas_of_interest,
    channel_name: channelNameFromState,
    preferred_education_level,
    military_affiliation,
    is_contacted_by_school,
    city,
    state: State,
  } = state;

  // Query parameters
  const {
    ss1 = null,
    ss2 = null,
    ss3 = null,
    ss4 = null,
    channel_name,
    browser_user_agent,
    time_zone,
    device_type: device_type_from_params = null,
    web_session_id: web_session_id_from_params,
    site_name: site_name_from_params,
    utm_source = null,
    utm_medium = null,
    utm_campaign = null,
    utm_id = null,
    utm_sub_id = null,
    utm_term = null,
    utm_content = null,
    utm_supplier_id = null,
  } = storedQueryParams;

  // Get Session details from local storage and set in body
  const leadFromLS = localStorage.getItem('leadRes');
  const storedLeadDetails = leadFromLS != null ? JSON.parse(leadFromLS) : {};

  const { session } = storedLeadDetails;

  const {
    client_ip,
    session_id,
    web_session_id,
    device_type,
    web_url,
    utm_data,
  } = session;

  const web_params = null != web_url ? new URL(web_url).searchParams : null;
  const web_ss1 = web_params?.get('ss1'),
    web_ss2 = web_params?.get('ss2'),
    web_ss3 = web_params?.get('ss3'),
    web_ss4 = web_params?.get('ss4'),
    web_utm_campaign = web_params?.get('utm_campaign'),
    web_utm_sub_id = web_params?.get('utm_sub_id'),
    web_utm_term = web_params?.get('utm_term'),
    web_utm_content = web_params?.get('utm_content'),
    web_utm_supplier_id = web_params?.get('utm_supplier_id'),
    web_utm_id = web_params?.get('utm_id'),
    web_utm_medium = web_params?.get('utm_medium'),
    web_utm_source = web_params?.get('utm_source');

  // Get Scripts data from local storage and set in body
  const scriptsFromLS = localStorage.getItem('trustedForm');
  const storedScriptsData =
    scriptsFromLS != null ? JSON.parse(scriptsFromLS) : {};

  const {
    supplier_jornaya_leadid,
    supplier_trustedform_token,
    supplier_trustedform_url,
    traffic_jornaya_leadid,
    traffic_trustedform_token,
    traffic_trusted_form_url,
  }: {
    supplier_jornaya_leadid: string;
    supplier_trustedform_token: string;
    supplier_trustedform_url: string;
    traffic_jornaya_leadid: string;
    traffic_trustedform_token: string;
    traffic_trusted_form_url: string;
  } = storedScriptsData;

  const age = state.age;

  const body: ISearchBody = {
    accesskey: ACCESS_KEY as string,
    prospect: {
      gender: gender === 'Male' ? 'M' : 'F',
      first_name,
      last_name,
      email,
      phone,
      phone2: '',
      address_line1: address_line1,
      address_line2: '',
      city,
      state: State,
      zip_code,
      computer_internet_access: computer_internet_access as TBoolean,
      age: `${age}`,
      hsyear: hsyear,
      current_education_level: current_education_level,
      preferred_education_level: preferred_education_level,
      us_citizen: us_citizen as TBoolean,
      military: {
        military_status: military.military_status,
        military_affiliation: military_affiliation ?? 'air force',
        relationship: '',
      },
      preferred_enrollment: +preferred_enrollment,
      online_or_campus,
      ip: client_ip,
    },
    search: {
      areas_of_interest,
      currently_enrolled_in_college: currently_enrolled_in_college ?? 'No',
      can_complete_enrollment: 'No',
      rn_license: rn_license ?? ('No' as TBoolean),
      teaching_certificate: teaching_certificate ?? 'No',
      is_contacted_by_school: 'Yes',
      graduated_in_us: 'Yes',
      channel_name: channelNameFromState ?? channel_name ?? 'Web',
      ss1: web_ss1 ?? ss1,
      ss2: web_ss2 ?? ss2,
      ss3: web_ss3 ?? ss3,
      ss4: web_ss4 ?? ss4,
      web_url: web_url.length > 0 ? web_url : APP_DATA.URL,
      webinitiatingurl: APP_DATA.URL,
      traffic_trusted_form_url:
        'true' == process.env.NEXT_PUBLIC_DEV
          ? 'https://cert.trustedform.com/2a002d38bd755ce616bc4d7c2bd2b7983ff3daee'
          : traffic_trusted_form_url,
      traffic_jornaya_leadid:
        'true' == process.env.NEXT_PUBLIC_DEV
          ? '7A2968D6-4C06-5B1E-CCCB-220FD8818179'
          : traffic_jornaya_leadid,
      traffic_trustedform_token:
        'true' == process.env.NEXT_PUBLIC_DEV
          ? 'https://cert.trustedform.com/2a002d38bd755ce616bc4d7c2bd2b7983ff3daee'
          : traffic_trustedform_token,
      traffic_category: 'education',
      supplier_jornaya_leadid:
        'true' == process.env.NEXT_PUBLIC_DEV
          ? 'test'
          : supplier_jornaya_leadid,
      supplier_trustedform_token:
        'true' == process.env.NEXT_PUBLIC_DEV
          ? 'test'
          : supplier_trustedform_token,
      supplier_trustedform_url:
        'true' == process.env.NEXT_PUBLIC_DEV
          ? 'test'
          : supplier_trustedform_url,
      time_to_call: '',
      callcenter: {
        cc_rep_id: 'NA',
        PublisherBrandName: 'NA',
        callid: '',
        sessionid: session_id,
        cc_inbound_transfer_company: '',
        cc_dba: '',
        cc_inbound_transfer_dba: '',
        cc_outbound_company: '',
      },
      test_flag: 0,
      tcpa_text: tcpa,
    },
    other_info: {
      client_ids: '',
      level_of_interest: '',
      browser_user_agent: browser_user_agent,
      time_zone: time_zone,
      device_type:
        device_type_from_params?.length > 0
          ? device_type_from_params
          : device_type,
      lead_unique_id: '',
      web_session_id:
        web_session_id_from_params?.length > 0
          ? web_session_id_from_params
          : web_session_id,
      site_name:
        site_name_from_params?.length > 0
          ? site_name_from_params
          : web_url?.length > 0
            ? web_url
            : ('edu' as string),
      landing_page: web_url?.length > 0 ? web_url : '/',
      supplier_campaign: web_utm_campaign ?? utm_campaign ?? 'web',
      utm_source:
        web_utm_source ??
        utm_data?.utm_source ??
        (Array.isArray(utm_source) ? utm_source.pop() : utm_source) ??
        '',
      utm_medium:
        web_utm_medium ??
        utm_data?.utm_medium ??
        (Array.isArray(utm_medium) ? utm_medium.shift() : utm_medium) ??
        '',
      utm_campaign:
        web_utm_campaign ?? utm_data?.utm_campaign ?? utm_campaign ?? '',
      utm_content: web_utm_content ?? utm_content ?? '',
      utm_term: web_utm_term ?? utm_data?.utm_term ?? utm_term ?? '',
      utm_supplier_id:
        web_utm_supplier_id ??
        utm_data?.utm_supplier_id ??
        utm_supplier_id ??
        '',
      utm_sub_id: web_utm_sub_id ?? utm_data?.utm_sub_id ?? utm_sub_id ?? '',
      utm_ad_id: utm_data?.utm_ad_id ?? web_utm_content ?? utm_content ?? '',
      utm_supplier:
        web_utm_supplier_id ?? utm_data?.utm_supplier ?? utm_supplier_id ?? '',
      utm_web_url: web_url ?? utm_data?.utm_web_url ?? '',
      traffic_source_type: 'edu',
      utm_id: web_utm_id ?? utm_data?.utm_id ?? utm_id ?? '',
    },
  };
  return body;
}

// Search Api
export async function postSearchRequest(
  body: ISearchBody,
): Promise<ISearchResponse> {
  try {
    const response = await fetch(`${CANDIMAVEN_BASE_URL}/search`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error: status code ${response.status}`);
    }
    const data = (await response.json()) as ISearchResponse;
    return data;
  } catch (err: unknown) {
    return {
      error: `An error occurred: ${err}`,
      accesskey: '',
      search_identifier: '',
    };
  }
}
