import { GOOGLE_API_KEY } from '@/appConstants';

export const getZipCodeData = async (zipCode: string) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&sensor=true&key=${GOOGLE_API_KEY}`,
    );
    return await res.json();
  } catch {
    return 'Error in Zip Code API';
  }
};
