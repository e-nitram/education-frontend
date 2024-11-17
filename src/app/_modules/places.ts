'use server';

import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

// Partial definition of recommendation
export type PlaceRecommendation = {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
  };
  secondary_text: string;
  terms: {
    offset: number;
    value: string;
  }[];
};

/**
 * Gets places autocomplete recommendations by sending a request to the Google Places API. Establishes a new UUIDV4 Session Token if one does not currently exist, which reduces costs from the API. This cookie should be consumed upon places selection.
 *
 * External API: https://developers.google.com/maps/documentation/places/web-service/autocomplete
 *
 * @param input Search string to be used in the query.
 * @returns Returns null if no response or error, otherwise returns an array of recommendations from the Google Places API.
 */
export async function getPlacesSuggestions(
  input: string,
): Promise<null | PlaceRecommendation[]> {
  const session_id = cookies().get('placesSession')?.value ?? uuidv4();
  cookies().set('placesSession', session_id);

  const params = new URLSearchParams();
  params.append('input', input);
  params.append('components', 'country:us');
  params.append('sessiontoken', session_id);
  params.append('types', 'address');
  params.append('key', process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '');

  const inputParams = params.toString();
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${inputParams}`;

  try {
    const res = await fetch(url, {
      method: 'get',
    });

    const data = await res.json();

    return data.predictions;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to get place suggestions', e);
    return null;
  }
}

// Partial definition of details.
export type PlaceDetails = {
  result: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
  };
};

/**
 * Gets place details by sending a request to the Google Place Details API. If the selection is successful, it also consumes the Google Places Session Token from cookies.
 *
 * External API: https://developers.google.com/maps/documentation/places/web-service/details#PlaceDetailsRequests
 *
 * @param id
 * @returns
 */
export async function getPlacesDetails(
  id: string,
): Promise<null | PlaceDetails> {
  const session_id = cookies().get('placesSession')?.value ?? uuidv4();

  const params = new URLSearchParams();
  params.append('place_id', id);
  params.append('fields', 'address_components');
  params.append('sessiontoken', session_id);
  params.append('key', process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '');

  const inputParams = params.toString();
  const url = `https://maps.googleapis.com/maps/api/place/details/json?${inputParams}`;
  try {
    const res = await fetch(url, {
      method: 'get',
    });

    if (res.ok) {
      cookies().delete('placesSession');
    }

    const data = await res.json();

    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to get place details', e);
    return null;
  }
}
