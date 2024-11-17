import { LEADS_URL } from '@/appConstants';

const getBody = () => {
  if ('true' == process.env.NEXT_PUBLIC_DEV) {
    return {
      external_lead_id: null,
      web_url: 'test',
    };
  } else {
    return {
      external_lead_id: null,
      web_url: 'educationdirectory.net',
    };
  }
};

const createLead = async (sessionRes: any) => {
  const body = getBody();
  try {
    const res = await fetch(`${LEADS_URL}/lead/create-lead`, {
      method: 'post',
      body: JSON.stringify({ ...body, session_id: sessionRes.session_id }),
    });
    return res;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: failed to create lead in pages router', e);
    return e;
  }
};

export default createLead;
