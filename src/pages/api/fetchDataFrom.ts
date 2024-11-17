import { BASE_URL } from '@/appConstants';

export default async function fetchDataFrom(from: string) {
  const res = await fetch(`${BASE_URL}/api/${from}`, {
    method: 'GET',
  });

  return res;
}
