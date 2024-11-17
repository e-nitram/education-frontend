import { NextApiRequest, NextApiResponse } from 'next';

import { APP_DATA } from '@/appConstants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Handle POST request for autocomplete suggestions
  if (req.method == 'POST') {
    const { input } = req.body;
    const params = new URLSearchParams();
    params.append('input', input);
    params.append('components', 'country:us');
    params.append('key', `${APP_DATA.variables.GOOGLE_API_KEY}`);

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params.toString()}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.statusText}`);
      }
      const data = await response.json();

      return res.status(200).json(data?.predictions);
    } catch (err: unknown) {
      return res.status(400).json(null);
    }
  }
  // Handle GET request to retrieve place details
  if (req.method == 'GET') {
    const place_id = req.query?.place_id as string;
    const params = new URLSearchParams();
    params.append('place_id', place_id);
    params.append('fields', 'name,address_components,formatted_address');
    params.append('key', `${APP_DATA.variables.GOOGLE_API_KEY}`);

    const url = `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.statusText}`);
      }
      const data = await response.json();

      return res.status(200).json(data?.result);
    } catch (err: unknown) {
      return res.status(400).json(null);
    }
  }
}
