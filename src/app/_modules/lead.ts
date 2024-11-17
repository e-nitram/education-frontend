// 'use server';

export interface LeadBody {
  lead_id?: number;
  session_id: number;
  external_lead_id: string | null;
}

/**
 * Establishes a new lead for users by sending lead data to the Leads lead endpoint.
 * @param {LeadBody} body - The data to be sent in the request body.
 * @return {Promise<LeadBody | null>} The server response or undefined if there was an error .
 */
export async function createLead(body: LeadBody): Promise<LeadBody | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LEADS_URL}/lead/create-lead`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to create lead', e);
    return null;
  }
}

/**
 * Replaces existing data for a Lead by sending lead data to the Leads lead endpoint.
 * @param {LeadBody} body - The data to be sent in the request body.
 * @return {Promise<LeadBody | null>} The server response or undefined if there was an error .
 */
export async function updateLead(body: LeadBody): Promise<LeadBody | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LEADS_URL}/lead/${body.lead_id}`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to update lead', e);
    return null;
  }
}

export interface ProfileBody {
  profile_id?: number;
  lead_id: number;
  salutation: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_primary: string | null;
  phone_secondary: string | null;
  email: string | null;
}

/**
 * Establishes a new lead for users by sending lead data to the Leads lead endpoint.
 * @param {ProfileBody} body - The data to be sent in the request body.
 * @return {Promise<ProfileBody | null>} The server response or undefined if there was an error .
 */
export async function submitProfile(
  body: ProfileBody,
): Promise<ProfileBody | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LEADS_URL}/profile`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to submit profile', e);
    return null;
  }
}

/**
 * Replaces existing data for a Lead by sending lead data to the Leads lead endpoint.
 * @param {ProfileBody} body - The data to be sent in the request body.
 * @return {Promise<ProfileBody | null>} The server response or undefined if there was an error .
 */
export async function updateProfile(
  body: ProfileBody,
): Promise<ProfileBody | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LEADS_URL}/profile/${body.profile_id}/`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to update profile', e);
    return null;
  }
}

export interface ConsentBody {
  consent_id?: number;
  lead_id: number;
  tcpa_timestamp_traffic: string | null;
  tcpa_timestamp_marketing: string | null;
  tcpa_text_traffic: string | null;
  tcpa_timestamp_client: string | null;
}

/**
 * Documents consent for users by sending consent data to the Leads consent endpoint.
 * @param {LeadBody} body - The data to be sent in the request body.
 * @return {Promise<ConsentBody | null>} The server response or undefined if there was an error .
 */
export async function submitConsent(
  body: ConsentBody,
): Promise<ConsentBody | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LEADS_URL}/consent`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to submit consent', e);
    return null;
  }
}

/**
 * Replaces existing consent for a Lead by sending consent data to the Leads lead endpoint.
 * Often better to create new consent.
 * @param {LeadBody} body - The data to be sent in the request body.
 * @return {Promise<ConsentBody | null>} The server response or undefined if there was an error .
 */
export async function updateConsent(
  body: ConsentBody,
): Promise<ConsentBody | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LEADS_URL}/consent/${body.consent_id}/`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to update consent', e);
    return null;
  }
}

export interface AddressBody {
  address_id?: number;
  profile_id: number;
  address_line_one: string | null;
  address_line_two: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
}

/**
 * Submits a user's geographic location by sending address data to the Leads address endpoint.
 * @param {AddressBody} body - The data to be sent in the request body.
 * @return {Promise<AddressBody | null>} The server response or undefined if there was an error .
 */
export async function submitAddress(
  body: AddressBody,
): Promise<AddressBody | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LEADS_URL}/address`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to submit address', e);
    return null;
  }
}

/**
 * Replaces existing address for a Lead by sending address data to the Leads address endpoint.
 * @param {AddressBody} body - The data to be sent in the request body.
 * @return {Promise<AddressBody | null>} The server response or undefined if there was an error .
 */
export async function updateAddress(
  body: AddressBody,
): Promise<AddressBody | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LEADS_URL}/address/${body.address_id}/`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to update address', e);
    return null;
  }
}

export interface QualificationBody {
  qualification_id?: number;
  profile_id: number;
  lead_id: number;
  enrollment_timeline: string | null;
  current_edu_level: string | null;
  preferred_edu_level: string | null;
  learning_preference: string | null;
  is_graduated_in_us: string | null;
  computer_internet_access: string | null;
  level_of_interest: string | null;
  time_of_day: string | null;
  previously_contacted: boolean;
  rn_license: string | null;
  teaching_certificate: string | null;
}

/**
 * Submits user data to the Leads qualifications endpoint.
 * @param {QualificationBody} body - The data to be sent in the request body.
 * @return {Promise<QualificationBody | null>} The server response or undefined if there was an error .
 */
export async function submitQualifications(
  body: QualificationBody,
): Promise<QualificationBody | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LEADS_URL}/qualification`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to submit qualifications', e);
    return null;
  }
}

/**
 * Replaces existing responses for user responses by submitted data to the Leads qualifications endpoint.
 * @param {ConsentBody} body - The data to be sent in the request body.
 * @return {Promise<QualificationBody | null>} The server response or undefined if there was an error .
 */
export async function updateQualifications(
  body: ConsentBody,
): Promise<QualificationBody | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LEADS_URL}/consent/${body.consent_id}/`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to update qualifications', e);
    return null;
  }
}

export interface TokenBody {
  third_party_tokens_id?: number;
  lead_id: number;
  traffic_jornaya_lead_id: string | null;
  traffic_trusted_form_url: string | null;
  traffic_trustedform_token: string | null;
}

/**
 * Establishes new tokens for form validation by sending token data the Leads token endpoint.
 * @param {TokenBody} body - The data to be sent in the request body.
 * @return {Promise<TokenBody | null>} The server response or undefined if there was an error .
 */
export async function submitTokens(body: TokenBody): Promise<TokenBody | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LEADS_URL}/third-party-token`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to submit tokens', e);
    return null;
  }
}

/**
 * Replaces existing tokens for a form by sending token data to the Leads token endpoint.
 * Often better to create new tokens.
 * @param {TokenBody} body - The data to be sent in the request body.
 * @return {Promise<TokenBody | null>} The server response or undefined if there was an error .
 */
export async function updateTokens(body: TokenBody): Promise<TokenBody | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LEADS_URL}/third-party-token/${body.third_party_tokens_id}/`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to update tokens', e);
    return null;
  }
}

export interface SubmissionBody {
  submission_id?: number;
  lead_id: number;
  search_id: string;
  result_set: string;
  result_id: string;
  brand: string;
  value: number;
  status: string | null;
  status_timestamp?: string | null;
}

/**
 * Establishes new submission for form validation by sending token data the Leads token endpoint.
 * @param {SubmissionBody} body - The data to be sent in the request body.
 * @return {Promise<SubmissionBody | null>} The server response or undefined if there was an error .
 */
export async function submitSubmission(
  body: SubmissionBody,
): Promise<SubmissionBody | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LEADS_URL}/submission`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to submit submission', e);
    return null;
  }
}

/**
 * Replaces existing submission for a form by sending token data to the Leads token endpoint.
 * Often better to create new submission.
 * @param {SubmissionBody} body - The data to be sent in the request body.
 * @return {Promise<SubmissionBody | null>} The server response or undefined if there was an error .
 */
export async function updateSubmission(
  body: SubmissionBody,
): Promise<SubmissionBody | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LEADS_URL}/submission/${body.submission_id}/`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to update submission', e);
    return null;
  }
}

export interface RevenueBody {
  revenue_id?: number;
  session_id: number;
  brand_name: string;
  revenue: number;
  path: string;
  event_time?: string | null;
}

/**
 * Establishes new revenue for form validation by sending token data the Leads token endpoint.
 * @param {RevenueBody} body - The data to be sent in the request body.
 * @return {Promise<RevenueBody | null>} The server response or undefined if there was an error .
 */
export async function submitRevenue(
  body: RevenueBody,
): Promise<RevenueBody | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LEADS_URL}/revenue`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to submit revenue', e);
    return null;
  }
}

/**
 * Replaces existing revenue for a form by sending token data to the Leads token endpoint.
 * Often better to create new revenue.
 * @param {RevenueBody} body - The data to be sent in the request body.
 * @return {Promise<RevenueBody | null>} The server response or undefined if there was an error .
 */
export async function updateRevenue(
  body: RevenueBody,
): Promise<RevenueBody | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LEADS_URL}/revenue/${body.revenue_id}/`,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to update revenue', e);
    return null;
  }
}
