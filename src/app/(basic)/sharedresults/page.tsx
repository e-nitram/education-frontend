'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ProfileBody } from '@/app/_modules/lead';
// import { getResults, School } from '@/app/_modules/offers';
import { getResults, School } from '@/app/_modules/leadCurrent';
import ResultsForm from '@/app/(basic)/sharedresults/ResultsForm';

export default async function SharedResults() {
  let data = cookies().get('search');

  if (null == data) {
    // eslint-disable-next-line no-console
    console.error('ERROR: tried to load shared search without data');
    redirect('/clicks');
  }

  const searchID = JSON.parse(data.value);

  const offers: School[] | null = await getResults({
    search_identifier: searchID,
  });

  if (null == offers) {
    // eslint-disable-next-line no-console
    console.error('ERROR: tried to load results without data');
    redirect('/clicks');
  }

  data = cookies().get('profile');

  let phoneNumber = '7608675309';

  if (null != data && null != data.value) {
    const profile: ProfileBody = JSON.parse(data.value);
    phoneNumber = profile.phone_primary ?? '7608675309';
  }

  return (
    <>
      <main className='flex flex-col items-stretch justify-center bg-light px-4 pb-12 pt-4 lg:flex-row lg:p-0'>
        <div className='flex flex-col px-10 py-3 lg:w-5/12 lg:content-center lg:gap-6 lg:bg-white lg:py-12 lg:pl-32 lg:pr-28'>
          <div className='m-auto flex flex-col lg:gap-12'>
            <h1 className='text-center font-serif text-26 font-normal leading-snug text-primary md:text-lg lg:text-42 xl:text-xl'>
              Your Matches
            </h1>
            <h2 className='hidden font-sans leading-normal lg:block lg:text-18'>
              Select these matches to be contacted by a representative, continue
              your journey, and meet your goals!
            </h2>
          </div>
        </div>
        <div className='bg-light lg:w-7/12 lg:items-center lg:px-4 lg:py-12 lg:pl-28 lg:pr-32'>
          <ResultsForm
            phoneNumber={phoneNumber}
            initialOffers={offers}
            search={searchID}
          />
        </div>
      </main>
    </>
  );
}
