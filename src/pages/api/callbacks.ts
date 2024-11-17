export interface CallbackBody {
  callback_id?: number;
  submission_time?: string;
  method: string;
  path: string;
  body: string | null;
  response: string | null;
  session_id: number;
  event_type: string;
}

/**
 * Documents callback for suppliers by sending data to the Leads callback endpoint.
 * @param {CallbackBody} body - The data to be sent in the request body.
 * @return {Promise<CallbackBody | null>} The server response or undefined if there was an error .
 */
export async function submitCallback(
  body: CallbackBody,
): Promise<CallbackBody | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LEADS_URL}/callback`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to submit callback', e);
    return null;
  }
}

/**
 * Replaces existing callback for a supplier by sending callback data to the Leads callback endpoint.
 * @param {CallbackBody} body - The data to be sent in the request body.
 * @return {Promise<CallbackBody | null>} The server response or undefined if there was an error .
 */
export async function updateCallback(
  body: CallbackBody,
): Promise<CallbackBody | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LEADS_URL}/callback/${body.callback_id}/`,
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
    console.error('ERROR: failed to update callback', e);
    return null;
  }
}
