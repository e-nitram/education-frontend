import { v4 as uuidv4 } from 'uuid';

import { LEADS_URL } from '@/appConstants';
import { getClientIP, getDeviceType } from '@/utils';

/**
 * Responsible for parsing the body of the POST request to the /session endpoint on Leads DB.
 *
 * @returns structured object for JSON parsing with the message request.
 */
export const getBody = async () => {
  const ip = await getClientIP();
  const web_session_id =
    JSON.parse(localStorage.getItem('web_session_id') ?? '{}') ?? uuidv4();
  const queryParams = JSON.parse(localStorage.getItem('queryParams') ?? '{}');

  const {
    utm_medium = null,
    utm_source = null,
    utm_content = null,
    utm_campaign = null,
    utm_term = null,
    utm_supplier_id = null,
    utm_sub_id = null,
    utm_ad_id = null,
    utm_id = null,
  } = queryParams;

  return {
    client_ip: ip ?? '8.192.0.0',
    web_url: window.location.href,
    device_type: getDeviceType(),
    web_session_id: web_session_id,
    browser_type: window.navigator.userAgent,
    is_test: 'true' == process.env.NEXT_PUBLIC_DEV ? true : false,
    referer_url: document.referrer,
    utm_data:
      null != utm_supplier_id
        ? {
            source: utm_source,
            medium: utm_medium,
            campaign: utm_campaign,
            content: utm_content,
            term: utm_term,
            supplier_id: utm_supplier_id,
            sub_id: utm_sub_id,
            utm_id: utm_id ?? utm_ad_id,
          }
        : null,
  };
};

/**
 *Sends a POST request to the /session endpoint on Leads DB to log the start of a new user session.
 *
 * @returns raw request response or null if there's an error.
 */
const startSession = async () => {
  const body = await getBody();
  try {
    const res = await fetch(`${LEADS_URL}/session/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Page router failed to initiate a session', e);
    return;
  }
};

export default startSession;
