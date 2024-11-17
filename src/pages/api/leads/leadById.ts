import { LEADS_URL } from '@/appConstants';

type Lead = {
  lead_id: number;
  external_lead_id: number | null;
  session_id: number;
  web_url: string | null;
};

type LeadStatus = {
  lead_status_id: number;
  lead_id: number;
  api_response_json: {
    status: string | null;
    message: string | null;
  };
  original_status: string | null;
  current_status: string | null;
  status_update_timestamp: string | null;
  reject_reason: string | null;
  type: string | null;
};

type Session = {
  session_id: number;
  ip: string;
  web_url: string;
  traffic_brand_name: string;
  traffic_source_detail: string;
  traffic_source_type: string;
  web_access_key: string;
  web_session_id: string;
  landing_page: string;
  device_type: string;
  session_start_time: string;
  session_end_time: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  utm_supplier_id: string | null;
  utm_sub_id: string | null;
  utm_ad_id: string | null;
  utm_id: string | null;
};

type Consent = {
  consent_id: number;
  lead_id: number;
  tcpa_timestamp_traffic: string | null;
  tcpa_timestamp_marketing: string | null;
  tcpa_text_traffic: string | null;
  tcpa_timestamp_client: string | null;
};

type ThirdPartyToken = {
  third_party_tokens_id: number;
  lead_id: number;
  traffic_jornaya_lead_id: string | null;
  traffic_trusted_form_url: string | null;
  traffic_trustedform_token: string | null;
};

type Profile = {
  profile_id: number;
  lead_id: number;
  salutation: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_primary: string | null;
  phone_secondary: string | null;
  email: string | null;
};

type Address = {
  address_id: number;
  profile_id: number;
  address_line_one: string | null;
  address_line_two: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
};

type ProfileCriteria = {
  profile_criteria_id: number;
  profile_id: number | null;
  lead_id: number;
  age: number | null;
  gender: string | null;
  is_us_citizen: boolean | null;
  is_us_military: boolean | null;
  military_status: string | null;
  military_branch: string | null;
  high_school_graduation_year: number | null;
};

type Qualification = {
  qualification_id: number;
  profile_id: number;
  lead_id: number;
  enrollment_timeline: string | null;
  current_edu_level: string | null;
  preferred_edu_level: string | null;
  learning_preference: string;
  is_graduated_in_us: boolean | null;
  computer_internet_access: string | null;
  level_of_interest: string | null;
  time_of_day: string | null;
  previously_contacted: boolean | null;
  rn_license: boolean | null;
  teaching_certificate: boolean | null;
};

type LeadObject = {
  lead: Lead;
  leadStatus: LeadStatus;
  session: Session;
  consent: Consent;
  thirdPartyToken: ThirdPartyToken;
  profile: Profile;
  address: Address;
  profileCriteria: ProfileCriteria;
  qualification: Qualification;
};

export async function getLeadById(id: number): Promise<LeadObject | null> {
  try {
    const res = await fetch(`${LEADS_URL}/lead/${id}`);
    const data = await res.json();
    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to fetch lead data', e);
    return null;
  }
}
