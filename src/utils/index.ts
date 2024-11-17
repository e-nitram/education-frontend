export const getDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
    navigator.userAgent,
  )
    ? 'Mobile'
    : 'Desktop';

export const getUrl = () => window.location.href;

export const getCurrentPage = () => {
  const url = new URL(getUrl());
  return url.pathname;
};

export const getClientIP = async () => {
  try {
    const response = await fetch('https://geolocation-db.com/json/');
    if (!response.ok) {
      return null;
    }
    const ip = await response.json();
    return ip?.IPv4;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to get client ip', error);
    return null;
  }
};

export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters

  if (cleaned.length === 10) {
    // Format as (XXX) XXX-XXXX
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
    )}`;
  }

  // Return the original phone number if it doesn't match the expected format
  return phoneNumber;
};
export const formattedPhoneNumberFunc = (phoneNumber: string) =>
  phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

export const openInNewTab = (path = '/landing-page/1') => {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.target = '_blank';
  a.href = path;
  a.click();
  document.body.removeChild(a);
};

export function validateEmailWithRegex(email: string): boolean {
  // Regular expression for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export const validateEmail = async (email: string) => {
  try {
    if (validateEmailWithRegex(email)) {
      const isEmailvalid = await fetch('/api/verifyEmail', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => data?.isValidEmail);
      return isEmailvalid;
    } else {
      return false;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to validate email', email, err);
    return false;
  }
};

export const getCityState = async (zip_code: string) => {
  try {
    const res = await fetch(`https://api.zippopotam.us/us/${zip_code}`);
    const data = await res.json();

    return {
      city: data['places']?.length > 0 ? data['places'][0]['place name'] : '',
      state:
        data['places']?.length > 0
          ? data['places'][0]['state abbreviation']
          : '',
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to get city state', zip_code, err);
    return {
      city: '',
      state: '',
    };
  }
};

export function containsAlphabets(text: string): boolean {
  const alphabetsRegex = /[A-Za-z]/;
  return alphabetsRegex.test(text);
}

export function calculateAge(input: string) {
  // Check if the input is a full year (e.g., "1997")
  if (input.length === 4 && !isNaN(Number(input))) {
    const currentYear = new Date().getFullYear();
    const birthYear = Number(input);
    return currentYear - birthYear;
  } else {
    // If the input is just the age (e.g., "26")
    // Convert the input to a number and return it
    return isNaN(Number(input)) ? '' : Number(input);
  }
}

export function normalizeUsCitizen(input: string | boolean) {
  if (typeof input === 'boolean') {
    return input; // Return the boolean value as it is
  } else if (typeof input === 'string') {
    // Normalize the string value to boolean
    const lowerCaseInput = input.toLowerCase();
    if (lowerCaseInput === 'yes') {
      return true;
    } else if (lowerCaseInput === 'no') {
      return false;
    }
  }

  // Return null if the input is neither a boolean nor a valid string
  return null;
}
