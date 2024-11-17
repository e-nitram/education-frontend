import { cookies } from 'next/headers';
import Link from 'next/link';

import { getMAOInternal, Offer } from '@/pages/api/getMAO';

import AddToCart from './AddToCart';
import ClickCard from './Card';
import SubHeader from './SubHeader';

export default async function ClicksPage() {
  const data = await getMAOInternal();

  let session_id: string | null = null;
  let supplier_id: string | null = null;
  let count: number = 0;

  while (null == session_id && count < 5) {
    session_id = cookies().get('sessionId')?.value ?? 'null';
    supplier_id = cookies().get('supplierId')?.value ?? 'null';
    await new Promise((resolve) => setTimeout(resolve, 100));
    count++;
  }

  if (null == data) {
    return (
      <Link
        href='/get-started'
        target='_blank'
        id='redirect-error-clicks'
        className='box-border flex whitespace-nowrap rounded-full bg-primary px-14 py-3 text-center font-sans text-18 font-bold text-white transition duration-500 ease-in-out hover:shadow-button md:ml-auto md:self-end md:px-11'
      >
        Get Started
      </Link>
    );
  }

  const items = data.items.slice(0, 6);

  return (
    <main className='flex flex-col items-center justify-center bg-light pb-12'>
      <SubHeader />
      <div className='mx-9 gap-3 md:mx-0 md:w-4/5 lg:w-3/5 lg:gap-4 xl:w-1/2 xl:gap-6'>
        {items.map((offer: Offer, index: number) => {
          return (
            <div key={`${index}${offer.brandName}`}>
              <AddToCart {...offer} />
              <ClickCard
                logo={offer.imageUrl}
                schoolName={offer.brandName}
                headline={offer.headline}
                rating={5}
                description={offer.blurbs[0]}
                format={'In Person' === offer.blurbs[1] ? false : true}
                bullet={offer.blurbs[2]}
                destURL={offer.destUrl
                  .replace(/ /g, '%20')
                  .replace('replace_utm_supplier_id', supplier_id ?? 'none')
                  .replace('replace_session_id', session_id ?? 'none')}
                color1={'' === offer.blurbs[4] ? 'primary' : offer.blurbs[4]}
                color2={'' === offer.blurbs[5] ? 'secondary' : offer.blurbs[5]}
                impURL={offer.impressionUrl}
                offer={{
                  brandName: offer.brandName,
                  revenue: offer.revenue,
                  destUrl: offer.destUrl,
                }}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
