'use server';

import { redirect } from 'next/navigation';

export interface UserBody {
  'First Name': string;
  'Last Name': string;
  Phone: string;
  Email: string;
  State: string;
}

export interface ZapierResponse {
  attempt: string | null;
  id: string | null;
  request_id: string | null;
  status: string | null;
}

/**
 * Establishes a new lead for users by sending lead data to the Leads lead endpoint.
 * @param {UserBody} body - The data to be sent in the request body.
 * @return {Promise<ZapierResponse | null>} The server response or undefined if there was an error .
 */
export async function submitUser(
  body: UserBody,
): Promise<ZapierResponse | null> {
  try {
    const res = await fetch(
      'https://hooks.zapier.com/hooks/catch/14452648/36isbtt/',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    const result = await res.json();
    return result;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Zapier Submission Error with: ', body, e);
    return null;
  }
}

/**
 * Translates inputs from the DNC form into a Zapier hook.
 *
 * @param _previousState unused input from form action
 * @param formData structured object that contains valid form inputs. Function does return error message if any of the necessary fields missing or too short.
 * @returns error message with invalid data or initiates redirect to the /get-started path on success
 */
export async function submitForm(
  _previousState: any,
  formData: FormData,
): Promise<{ message: 'invalid data'; details: string[] } | null> {
  const validation = validateFormData(formData);

  if (null != validation) {
    return validation;
  }

  const userBody: UserBody = {
    'First Name': formData.get('first name') as string,
    'Last Name': formData.get('last name') as string,
    Phone: formData.get('phone') as string,
    Email: formData.get('email') as string,
    State: formData.get('state') as string,
  };
  const _user = await submitUser(userBody);

  redirect('/get-started');
}

/**
 * Validates form data to ensure that vields are populated.
 *
 * @param formData
 * @returns error object with message and array of invalid fields
 */
function validateFormData(formData: FormData) {
  const fields = [];
  const values = [];

  if (((formData.get('first name') as string) ?? '').length < 3) {
    fields.push('first name');
    values.push(formData.get('first name') as string);
  }
  if (((formData.get('last name') as string) ?? '').length < 3) {
    fields.push('last name');
    values.push(formData.get('last name') as string);
  }
  if (((formData.get('phone') as string) ?? '').length != 10) {
    fields.push('phone');
    values.push(formData.get('phone') as string);
  }
  if (((formData.get('email') as string) ?? '').length < 4) {
    fields.push('email');
    values.push(formData.get('email') as string);
  }
  if (((formData.get('state') as string) ?? '').length < 2) {
    fields.push('state');
    values.push(formData.get('state') as string);
  }
  if (fields.length > 0) {
    // eslint-disable-next-line no-console
    console.error('ERROR: DNC Submission Error with: ', fields, values);
  }
}
