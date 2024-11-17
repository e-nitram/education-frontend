'use server';

import { cookies } from 'next/headers';

import { PayoutType } from '@/app/_objects/payouttype';

export interface SessionBody {
  session_id?: number;
  client_ip: string | null;
  web_url: string;
  device_type: string | null;
  web_session_id: string | null;
  browser_type: string | null;
  is_test: boolean;
  session_start_time?: string;
  utm_data?: UTMBody | null;
  supplier_data?: SupplierBody | null;
  referer_url?: string | null;
}

export interface UTMBody {
  id?: number;
  utm_id: string | null;
  source: string;
  medium: string;
  campaign: string | null;
  sub_id: string | null;
  term: string | null;
  content: string | null;
  supplier_id: string;
}

export interface SupplierBody {
  supplier_id: string;
  name: string;
  contacts: string | null;
  payout_type: keyof typeof PayoutType;
  payout_amount: number;
  landing_callback: string | null;
  clickout_callback: string | null;
  submission_callback: string | null;
  callback_method: 'post' | 'get' | null;
}

/**
 * Establishes a new session for users by sending session data to the Leads session endpoint. Adds the session_id to cookies.
 *
 * @param {SessionBody} body - The data to be sent in the request body.
 * @return {Promise<SessionBody | null>} The server response or null if there was an error.
 */
export async function startSession(
  body: SessionBody,
): Promise<SessionBody | null> {
  const oldSessionId = cookies().get('sessionId') as any;
  if (undefined != oldSessionId) {
    const session = getSession(oldSessionId.value);
    return session;
  }

  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_LEADS_URL}/session/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    const session = data;

    cookies().set('sessionId', session?.session_id as string, {
      expires: Date.now() + 10 * 60 * 1000,
    });
    cookies().set('supplierId', session?.utm_data.supplier_id as string);
    if (null !== session.supplier_data?.landing_callback) {
      cookies().set('callbacks', 'true');

      res = await fetch(`${process.env.NEXT_PUBLIC_LEADS_URL}/session/`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    }
    return session;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to initialize session from App router: ', e);
    return null;
  }
}

/**
 * Retrieve session entry based on session_id.
 *
 * @param {number} session_id The unique identifier.
 * @return {Promise<null | SessionBody>}
 */
export async function getSession(
  session_id: number,
): Promise<null | SessionBody> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LEADS_URL}/session/${session_id}`,
      { method: 'get' },
    );

    const data = await res.json();

    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`ERROR: failed to get session with id ${session_id}`, e);
    return null;
  }
}

/**
 * Get supplier info from the Leads supplier endpoint.
 * @param {string} id - The id for the supplier.
 * @return {Promise<SupplierBody | null>} The server response or undefined if there was an error .
 */
export async function getSupplier(id: string): Promise<SupplierBody | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LEADS_URL}/supplier/${id}/`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to get supplier', e);
    return null;
  }
}
