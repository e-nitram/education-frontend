'use server';

import { cookies } from 'next/headers';

import {
  CallbackBody,
  submitCallback,
  updateCallback,
} from '@/app/_modules/callbacks';
import { getSupplier } from '@/app/_modules/sessions';
import { Callback } from '@/app/_objects/callback';
import { PayoutType } from '@/app/_objects/payouttype';

/**
 * This function encapsulates the functionalities for running callbacks. This includes processing the data, posting data to Leads DB, submitting the request to the appropriate endpoint, and updating Leads DB with the response.
 *
 * @param type The type of triggering event.
 * @param revenue The raw value of the event.
 * @returns true if successful or false if failed.
 *
 * @POST Server logs document errors with fetch requests.
 */
export async function createCallback(
  event_type: keyof typeof Callback,
  revenue: number,
): Promise<boolean> {
  if (undefined == cookies().get('callbacks')) {
    return false;
  }

  const session_id = cookies().get('sessionId')?.value ?? '';
  const lead_id = cookies().get('leadId')?.value ?? '';
  const supplier_id = cookies().get('supplierId')?.value ?? '';

  if ('' == supplier_id) {
    return false;
  }

  const supplier = await getSupplier(supplier_id);

  if (null == supplier) {
    return false;
  }

  let path;

  switch (event_type) {
    case Callback.landing:
      path = supplier.landing_callback ?? '';
      break;
    case Callback.click:
      path = supplier.clickout_callback ?? '';
      break;
    case Callback.submission:
      path = supplier.submission_callback ?? '';
      break;
    default:
      return false;
  }

  if (null == path || undefined == path || 5 > path?.length) {
    return false;
  }

  path = path
    .replaceAll('replace_session_id', session_id.toString())
    .replaceAll('replace_lead_id', lead_id.toString())
    .replaceAll(
      'replace_value',
      processValue(
        event_type,
        supplier.payout_type,
        supplier.payout_amount,
        revenue,
      ).toString(),
    );

  let callback: CallbackBody | null = {
    method: supplier.callback_method ?? 'post',
    path: path,
    body: null,
    response: null,
    session_id: +session_id,
    event_type: event_type,
  };

  callback = await submitCallback(callback);

  if (null == callback) {
    return false;
  }

  try {
    const res =
      (await (
        await fetch(new URL(path), { method: callback?.method ?? 'get' })
      ).text()) ?? '';

    await updateCallback({ ...callback, response: res });

    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to callback supplier', e, callback);

    return false;
  }
}

/**
 * A utility function to process raw revenue into reportable revenue based upon business logic.
 *
 * @param event_type The type of triggering Callback event.
 * @param payout_type The type of payout.
 * @param payout_amount The corresponding ratio or value for the payout.
 * @param revenue The raw revenue from the event.
 * @returns The reportable revenue.
 */
function processValue(
  event_type: keyof typeof Callback,
  payout_type: keyof typeof PayoutType,
  payout_amount: number,
  revenue: number,
): number {
  switch (payout_type) {
    case PayoutType.cpc:
      if (Callback.landing == event_type) {
        return payout_amount;
      }
      return 0;
    case PayoutType.cpl:
      if (Callback.submission == event_type) {
        return payout_amount;
      }
      return 0;
    case PayoutType.cpu:
      if (Callback.landing == event_type) {
        return payout_amount;
      }
      return 0;
    case PayoutType.revshare:
      return payout_amount * revenue;
    default:
      return 0;
  }
}
