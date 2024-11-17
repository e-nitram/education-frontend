export const verifyingEmail = async (email: string) => {
  const body = {
    ListId: '169678',
    Email: email,
  };
  try {
    const res = await fetch(
      'https://api.emailoversight.com/api/EmailValidation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          ApiToken: 'e2e0ff4f-7530-4844-b538-00455534d621',
        },
        body: JSON.stringify(body),
      },
    );
    const data = await res.json();
    if (data?.Result === 'Verified' || data?.Result === 'Catch All') {
      return true;
    }

    return false;
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to validate email', email, error);
    return false;
  }
};
