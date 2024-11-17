import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { email } = JSON.parse(req.body);
    const body = {
      ListId: '169678',
      Email: email,
    };

    try {
      const response = await fetch(
        'https://api.emailoversight.com/api/EmailValidation',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ApiToken: 'e2e0ff4f-7530-4844-b538-00455534d621',
          },
          body: JSON.stringify(body),
        },
      );

      // if (!response.ok) {
      //   throw new Error(`Error! status: ${await response.text()}`);
      // }

      const data = await response.json();

      let isValidEmail = false;

      if (data?.Result === 'Verified' || data?.Result === 'Catch All') {
        isValidEmail = true;
      }

      const ResultExist = 'Result' in data;

      if (!ResultExist) {
        isValidEmail = true;
      }

      return res.status(200).json({ isValidEmail }); // Return response with isValidEmail as true or false
    } catch (error: any) {
      return res.status(500).json({ error: error?.message }); // Return an error response to client if an exception was caught
    }
  }
}
