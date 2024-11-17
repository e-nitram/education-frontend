import { LEADS_URL } from '@/appConstants';
import { calculateAge, getUrl, normalizeUsCitizen } from '@/utils';

const getBody = (data: any) => {
  const getQueryParamsFromLS = localStorage.getItem('queryParams');
  const queryParamsDataFromLS =
    getQueryParamsFromLS !== null ? JSON.parse(getQueryParamsFromLS) : {}; // Get query params from LocalStorage
  const { external_lead_id } = queryParamsDataFromLS;

  const thirdPartyTokenFromLS = localStorage.getItem('trustedForm'); // Get scripts data from LocalStorage
  const {
    traffic_trusted_form_url = '',
    traffic_trustedform_token = '',
    traffic_jornaya_leadid = '',
  } = thirdPartyTokenFromLS != null ? JSON.parse(thirdPartyTokenFromLS) : {};

  const { session, state } = data;
  const {
    online_or_campus,
    preferred_enrollment,
    is_graduated_in_us,
    computer_internet_access,
    current_education_level,
    areas_of_interest,
    teaching_certificate,
    rn_license,
    gender,
    military,
    hsyear,
    city,
    state: State,
    zip_code,
    address_line1,
    email,
    phone,
    first_name = null,
    last_name = null,
    tcpa = null,
  } = state;
  areas_of_interest?.filter((val: string) => val !== 'selectall');
  areas_of_interest?.sort();
  const age = calculateAge(state.age);
  const us_citizen = normalizeUsCitizen(state.us_citizen);

  return {
    lead: {
      session_id: session?.session_id,
      external_lead_id: external_lead_id ?? null,
      web_url: getUrl(),
    },
    leadStatus: {
      api_response_json: {
        status: null,
        message: null,
      },
      original_status: null,
      current_status: null,
      status_update_timestamp: null,
      reject_reason: null,
      type: null,
    },
    session: session,
    consent: {
      tcpa_timestamp_traffic: new Date().toISOString(),
      tcpa_timestamp_marketing: null,
      tcpa_text_traffic: tcpa,
      tcpa_timestamp_client: null,
    },
    thirdPartyToken: {
      traffic_jornaya_lead_id:
        traffic_jornaya_leadid ?? '7A2968D6-4C06-5B1E-CCCB-220FD8818179',
      traffic_trusted_form_url:
        traffic_trusted_form_url ??
        'https://cert.trustedform.com/2a002d38bd755ce616bc4d7c2bd2b7983ff3daee',
      traffic_trustedform_token:
        traffic_trustedform_token ??
        'https://cert.trustedform.com/2a002d38bd755ce616bc4d7c2bd2b7983ff3daee',
    },
    profile: {
      salutation: null,
      first_name: first_name,
      last_name: last_name,
      phone_primary: phone ?? null,
      phone_secondary: null,
      email: email ?? null,
    },
    address: {
      address_line_one: address_line1 ?? null,
      address_line_two: null,
      city: city ?? null,
      state: State ?? null,
      zip_code: zip_code ?? null,
    },
    profileCriteria: {
      age: +age ?? null,
      gender: gender ?? null,
      is_us_citizen: us_citizen ?? null,
      is_us_military: military?.military_status === 'Yes' ? true : false,
      military_status: military?.military_affiliation ?? null,
      military_branch: null,
      high_school_graduation_year: hsyear,
    },
    qualification: {
      enrollment_timeline: preferred_enrollment ?? null,
      current_edu_level: current_education_level ?? null,
      preferred_edu_level: null,
      learning_preference: online_or_campus ?? null,
      is_graduated_in_us: is_graduated_in_us ?? null,
      computer_internet_access: computer_internet_access ?? null,
      level_of_interest: areas_of_interest ?? null,
      time_of_day: null,
      previously_contacted: null,
      teaching_certificate: teaching_certificate ?? 'No',
      rn_license: rn_license ?? 'No',
    },
  };
};

const insertLead = async (data: any) => {
  const body = getBody(data);
  try {
    const res = await fetch(`${LEADS_URL}/lead`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to insert lead', data, e);
    return;
  }
};

export default insertLead;
