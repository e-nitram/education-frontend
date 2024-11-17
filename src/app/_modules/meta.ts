/**
 * API Docs: https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api
 * Event names: https://www.facebook.com/business/help/402791146561655?id=1205376682832142
 */

import { createHash } from 'crypto';
import { cookies } from 'next/headers';

/**
 * Normalizes the input data and create a SHA256 hash from a string.
 *
 * @param {string} data string to calculate the hashcode
 * @return {string} hashcode from the input
 */
function hash(data: string): string {
  return createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

export interface User {
  agent: string | null;
  email: string;
  phone: string;
  first: string;
  last: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  ip: string | null;
}

export interface MetaResponse {
  events_received: number;
  messages: string[];
  fbtrace_id: string;
}

/**
 * Submits Subscribe event to the Meta API
 *
 * @param {number} value of the item
 * @param {string} item name or id of the item
 * @param {User} user the data collected from the MiniForm.
 * @return {Promise<null | MetaResponse>}
 */
export async function subscribeMeta(value: number, item: string, user: User) {
  const endpoint = `https://graph.facebook.com/${process.env.NEXT_PUBLIC_META_API_VERSION}/${process.env.NEXT_PUBLIC_META_PIXEL_ID}/events?access_token=${process.env.NEXT_PUBLIC_META_TOKEN}`;

  const fbp = cookies().get('_fbp')?.value;
  const fbc = cookies().get('_fbc')?.value;

  const body = {
    data: [
      {
        event_name: 'Subscribe',
        event_time: Math.floor(+Date.parse(new Date().toISOString()) / 1000),
        event_source_url: 'educationdirectory.net',
        action_source: 'website',
        user_data: {
          client_user_agent: user.agent ?? 'unknown',
          em: hash(user.email ?? ''),
          ph: hash('1' + user.phone ?? ''),
          fn: hash(user.first ?? ''),
          ln: hash(user.last ?? ''),
          ct: hash(user.city ?? ''),
          st: hash(user.state ?? ''),
          zp: hash(user.zip ?? ''),
          country: hash(user.country ?? ''),
          client_ip_address: user.ip ?? null,
          fbc: fbc,
          fbp: fbp,
        },
        custom_data: {
          value: value,
          currency: 'usd',
          contents: [
            {
              id: item,
              quantity: 1,
              item_price: value,
            },
          ],
        },
        opt_out: false,
      },
    ],
  };

  try {
    const res = await fetch(endpoint, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const response: Promise<MetaResponse> = await res.json();

    return response;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to send CAPI subscription', e);
    return null;
  }
}

/**
 * Submits Subscribe event to the Meta API
 *
 * @param {number} value of the item
 * @param {string} item name or id of the item
 * @param {User} user the data collected from the MiniForm.
 * @return {Promise<null | MetaResponse>}
 */
export async function searchMeta(user: User) {
  const endpoint = `https://graph.facebook.com/${process.env.NEXT_PUBLIC_META_API_VERSION}/${process.env.NEXT_PUBLIC_META_PIXEL_ID}/events?access_token=${process.env.NEXT_PUBLIC_META_TOKEN}`;

  const fbp = cookies().get('_fbp')?.value;
  const fbc = cookies().get('_fbc')?.value;

  const body = {
    data: [
      {
        event_name: 'Search',
        event_time: Math.floor(+Date.parse(new Date().toISOString()) / 1000),
        event_source_url: 'educationdirectory.net',
        action_source: 'website',
        user_data: {
          client_user_agent: user.agent ?? 'unknown',
          em: hash(user.email ?? ''),
          ph: hash('1' + user.phone ?? ''),
          fn: hash(user.first ?? ''),
          ln: hash(user.last ?? ''),
          ct: hash(user.city ?? ''),
          st: hash(user.state ?? ''),
          zp: hash(user.zip ?? ''),
          country: hash(user.country ?? ''),
          client_ip_address: user.ip ?? null,
          fbc: fbc,
          fbp: fbp,
        },
        opt_out: false,
      },
    ],
  };

  try {
    const res = await fetch(endpoint, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const response: Promise<MetaResponse> = await res.json();

    return response;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to send CAPI search', e);
    return null;
  }
}

/**
 * Submits Subscribe event to the Meta API
 *
 * @param {number} value of the item
 * @param {string} item name or id of the item
 * @param {User} user the data collected from the MiniForm.
 * @return {Promise<null | MetaResponse>}
 */
export async function leadMeta(user: User) {
  const endpoint = `https://graph.facebook.com/${process.env.NEXT_PUBLIC_META_API_VERSION}/${process.env.NEXT_PUBLIC_META_PIXEL_ID}/events?access_token=${process.env.NEXT_PUBLIC_META_TOKEN}`;

  const fbp = cookies().get('_fbp')?.value;
  const fbc = cookies().get('_fbc')?.value;

  const body = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(+Date.parse(new Date().toISOString()) / 1000),
        event_source_url: 'educationdirectory.net',
        action_source: 'website',
        user_data: {
          client_user_agent: user.agent ?? 'unknown',
          em: hash(user.email ?? ''),
          ph: hash('1' + user.phone ?? ''),
          fn: hash(user.first ?? ''),
          ln: hash(user.last ?? ''),
          ct: hash(user.city ?? ''),
          st: hash(user.state ?? ''),
          zp: hash(user.zip ?? ''),
          country: hash(user.country ?? ''),
          client_ip_address: user.ip ?? null,
          fbc: fbc,
          fbp: fbp,
        },
        opt_out: false,
      },
    ],
  };

  try {
    const res = await fetch(endpoint, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const response: Promise<MetaResponse> = await res.json();

    return response;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to send CAPI lead', e);
    return null;
  }
}
