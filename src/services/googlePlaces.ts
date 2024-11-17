export const getPlacesSuggestions = async (input: string) => {
  try {
    const response = await fetch('/api/google/places', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to get places suggestions', error);
    return error;
  }
};

export const getPlaceDetails = async (place_id: string) => {
  try {
    const params = new URLSearchParams();
    params.append('place_id', place_id);
    const response = await fetch(`/api/google/places?${params.toString()}`);

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to get places details', error);
    return error;
  }
};
