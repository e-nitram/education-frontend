import { LEADS_URL } from '@/appConstants';

const updateLead = async (of: string, id: any, data: any) => {
  try {
    const res = await fetch(`${LEADS_URL}/${of}/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to update lead in pages router', e);
    return e;
  }
};

export default updateLead;
