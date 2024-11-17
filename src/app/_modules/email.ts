'use server';

/**
 * Calls emailoversight API to check an email, which is passed as a string.
 * Docs: https://emailoversight.com/docs-api/
 * @param {string} email - the email being checked.
 * @return {Promise<boolean | null>} True if verified, false if invalid, null if there was no valid response.
 */
export async function checkEmail(email: string): Promise<boolean | null> {
  const body = {
    ListId: '169678',
    Email: email,
  };

  try {
    const res = await fetch(
      'https://api.emailoversight.com/api/EmailValidation',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          ApiToken: process.env.NEXT_PUBLIC_EMAIL_API as string,
        },
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();

    switch (data?.Result) {
      case 'Verified':
        return true;
      case 'Catch All':
        return true;
      case 'Role':
        return true;
      case 'Unknown':
        return true;
      default:
        return false;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to verify email', e);
    return null;
  }
}
