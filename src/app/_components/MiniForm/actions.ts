'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  ConsentBody,
  createLead,
  LeadBody,
  ProfileBody,
  submitConsent,
  submitProfile,
  submitTokens,
  TokenBody,
} from '@/app/_modules/lead';
import { subscribeMeta, User } from '@/app/_modules/meta';
import { getSession } from '@/app/_modules/sessions';

/**
 * Translates inputs from the miniform into API calls to the Leads DB.
 * @param _previousState unused input from form action
 * @param formData structured object that contains valid form inputs. Function does return error message if any of the necessary fields missing or too short.
 * @returns error message with invalid data or initiates redirect to the /get-started path on success
 */
export async function submitForm(_previousState: any, formData: FormData) {
  ('use server');
  // Validate inputs
  const validation = await validateFormData(formData);

  if (null != validation) {
    return validation;
  }

  // Create Lead
  const session_id = cookies().get('sessionId')?.value ?? 0;

  const leadBody: LeadBody = {
    session_id: +session_id,
    external_lead_id: null,
  };

  // Get Session data from Leads DB
  const sessionPromise = getSession(+session_id);

  const leadPromise = createLead(leadBody);

  const [session, lead] = await Promise.all([sessionPromise, leadPromise]);

  const lead_id = lead?.lead_id ?? '0';
  cookies().set('leadId', lead_id as string);

  // Create Consent
  const currentDate = new Date();

  const consentBody: ConsentBody = {
    lead_id: +lead_id,
    tcpa_timestamp_traffic: currentDate.toISOString(),
    tcpa_timestamp_marketing: currentDate.toISOString(),
    tcpa_text_traffic: formData.get('leadid_tcpa_disclosure') as string,
    tcpa_timestamp_client: currentDate.toISOString(),
  };
  const consentPromise = submitConsent(consentBody);

  // Create Tokens
  const tokenBody: TokenBody = {
    lead_id: +lead_id,
    traffic_jornaya_lead_id:
      (formData.get('universal_leadid') as string) ??
      '7A2968D6-4C06-5B1E-CCCB-220FD8818179',
    traffic_trusted_form_url:
      (formData.get('xxTrustedFormCertUrl') as string) ??
      'https://cert.trustedform.com/2a002d38bd755ce616bc4d7c2bd2b7983ff3daee',
    traffic_trustedform_token:
      (formData.get('xxTrustedFormToken') as string)?.split('/').pop() ??
      'https://cert.trustedform.com/2a002d38bd755ce616bc4d7c2bd2b7983ff3daee',
  };
  const tokensPromise = submitTokens(tokenBody);

  // Create Meta subscribe object
  const user: User = {
    agent: session?.browser_type ?? null,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    first: formData.get('first_name') as string,
    last: formData.get('last_name') as string,
    ip: session?.client_ip ?? null,
  };

  // Create Profile
  const profileBody: ProfileBody = {
    lead_id: +lead_id,
    salutation: '',
    first_name: user.first,
    last_name: user.last,
    phone_primary: user.phone,
    phone_secondary: '',
    email: user.email,
  };
  const profile = await submitProfile(profileBody);
  cookies().set('profile', JSON.stringify(profile));

  const metaPromise = subscribeMeta(0, formData.get('subject') as string, user);

  const [_consent, _tokens, _meta] = await Promise.all([
    consentPromise,
    tokensPromise,
    metaPromise,
  ]);

  redirect('/get-started');
}

/**
 * Function parses submitted form data to confirm that fields are valid.
 *
 * @param formData
 * @returns error object with message and array of invalid fields
 */
async function validateFormData(formData: FormData) {
  const fields = [];
  const values = [];
  const development = 'true' == process.env.NEXT_PUBLIC_DEV;

  if (
    !development &&
    ((formData.get('universal_leadid') as string) ?? '').length < 5
  ) {
    fields.push('leadid');
    values.push(formData.get('universal_leadid') as string);
  }
  if (
    !development &&
    ((formData.get('xxTrustedFormCertUrl') as string) ?? '').length < 5
  ) {
    fields.push('xxTrustedFormCertUrl');
    values.push(formData.get('xxTrustedFormCertUrl') as string);
  }
  if (
    !development &&
    ((formData.get('xxTrustedFormToken') as string) ?? '').length < 5
  ) {
    fields.push('xxTrustedFormToken');
    values.push(formData.get('xxTrustedFormToken') as string);
  }
  if (((formData.get('first_name') as string) ?? '').length < 3) {
    fields.push('first_name');
    values.push(formData.get('first_name') as string);
  }
  if (((formData.get('last_name') as string) ?? '').length < 3) {
    fields.push('last_name');
    values.push(formData.get('last_name') as string);
  }
  if (((formData.get('phone') as string) ?? '').length != 10) {
    fields.push('phone');
    values.push(formData.get('phone') as string);
  }
  // if (!((await checkEmail((formData.get('email') as string) ?? '')) ?? false)) {
  if (((formData.get('email') as string) ?? '').length < 4) {
    fields.push('email');
    values.push(formData.get('email') as string);
  }
  if (fields.length > 0) {
    const cookieStore = cookies();
    const sessionId = cookieStore.get('sessionId');
    // eslint-disable-next-line no-console
    console.error(
      'ERROR: Failed to submit Miniform with: ',
      fields,
      values,
      'session: ',
      sessionId,
    );
    return { message: 'invalid data', details: fields };
  }
}
