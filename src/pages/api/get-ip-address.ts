import { NextApiRequest, NextApiResponse } from 'next';

interface IResponse {
  country_code: string;
  country_name: string;
  city: string;
  postal: string;
  latitude: number;
  longitude: number;
  IPv4: number;
  state: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch('https://geolocation-db.com/json/');

  if (!response.ok) {
    throw new Error(`Error! status: ${response.text()}`);
  }

  const findMyIp: IResponse = await response.json();
  return res.status(200).json(findMyIp.IPv4);
}
