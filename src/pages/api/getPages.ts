import { BASE_URL } from '@/appConstants';

export const getPages = () => {
  return fetch(`${BASE_URL}/api/pages/`, {
    method: 'GET',
  });
};
