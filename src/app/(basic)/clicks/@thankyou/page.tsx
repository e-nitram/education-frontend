import { cookies } from 'next/headers';

import { initialFetch } from '@/app/(basic)/clicks/@thankyou/actions';
import ThankYouModal from '@/app/(basic)/clicks/@thankyou/ThankYou';

export default async function ThankYouPage() {
  const isSubmitted = cookies().get('submission')?.value;

  if ('true' != isSubmitted) {
    return <></>;
  }

  const data = await initialFetch();

  return (
    <>
      <ThankYouModal offers={data.offers} banners={data.banners} />
    </>
  );
}
