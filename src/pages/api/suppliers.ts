import { PayoutType } from '@/app/_objects/payouttype';

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
 * Get supplier info from the Leads supplier endpoint.
 * @param {string} id - The id for the supplier.
 * @return {Promise<SupplierBody | null>} The server response or undefined if there was an error .
 */
export async function getSupplier(id: string): Promise<SupplierBody | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_LEADS_URL}/callback/${id}/`,
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
    console.error('ERROR: failed to get callback', e);
    return null;
  }
}
