import Image from 'next/image';
import Link from 'next/link';

import logo_w from '@/app/_components/logo_w.svg';

export default function Footer() {
  const aois = [
    { slug: 'art-design', show: 'Art & Design' },
    { slug: 'business', show: 'Business' },
    { slug: 'comp-tech', show: 'Computers & Technology' },
    { slug: 'education', show: 'Education' },
    { slug: 'law', show: 'Law & Criminal Justice' },
    { slug: 'liberal-arts', show: 'Liberal Arts' },
    { slug: 'healthcare', show: 'Nursing & Healthcare' },
    { slug: 'psychology', show: 'Psychology & Counseling' },
    { slug: 'trades', show: 'Trades & Vocational' },
  ];
  const occupations = [
    'Wind turbine service technicians',
    'Nurse practitioners',
    'Solar photovoltaic installers',
    'Occupational therapy assistants',
    'Statisticians',
    'Home health and personal care aids',
    'Physical therapist assistants',
    'Medical and health services managers',
  ];

  return (
    <>
      <div className='flex flex-col justify-between gap-6 bg-primary px-9 py-10 font-sans text-white lg:gap-10 lg:px-20 xl:px-36'>
        <div className='flex flex-col gap-6 md:flex-row md:items-start'>
          <Image
            className='hidden xl:block'
            src={logo_w}
            width={260}
            height={60}
            alt='EducationDirectory.net'
          />
          <Image
            className='block xl:hidden'
            src={logo_w}
            width={172}
            height={40}
            alt='EducationDirectory.net'
          />
        </div>
        <div className='border-b'></div>
        <div className='flex flex-col gap-4 lg:flex-row lg:justify-between'>
          <div className='flex flex-col gap-4'>
            <h2 className='text-md font-semibold'>Areas of Interest</h2>
            {aois.map((area, index) => {
              return (
                <div key={'aoi' + index}>
                  <Link
                    className='text-sm font-normal'
                    href={`/area-of-interest/${area.slug}`}
                  >
                    {area.show}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className='flex flex-col gap-4'>
            <h2 className='text-md font-semibold'>
              Fastest growing occupations
              <sup className='text-10 font-normal'>1</sup>
            </h2>
            {occupations.map((occupation, index) => {
              return (
                <div key={occupation + index}>
                  <p className='text-sm font-normal' key={index}>
                    {occupation}
                  </p>
                </div>
              );
            })}
            <p>Wind turbine service technicians</p>
          </div>
          <div className='flex flex-col gap-4'>
            <h2 className='text-md font-semibold'>Legal information</h2>
            <Link className='text-sm font-normal' href='/privacy-policy'>
              Privacy Policy
            </Link>
            <Link className='text-sm font-normal' href='/terms-and-conditions'>
              Terms of Use
            </Link>
            <Link className='text-sm font-normal' href='/do-not-call'>
              Do not sell my info
            </Link>
            <p className='max-w-[400px] text-sm'>
              (1) Occupational Outlook Handbook. Fastest Growing Occupations.
              (2021, April 9). Retrieved May 26, 2021 from{' '}
              <Link href='https://www.bls.gov/ooh/fastest-growing.htm'>
                https://www.bls.gov/ooh/fastest-growing.htm
              </Link>
            </p>
            <h2 className='text-md font-semibold'>Contact</h2>
            <Link className='text-sm' href='tel:8778355785'>
              (877) 835-5785
            </Link>
          </div>
        </div>
        <div className='border-b'></div>
        <div className='text-xs'>
          This is an offer for educational opportunities and not an offer for
          nor a guarantee of employment. Students should consult with a
          representative from the school they select to learn more about career
          opportunities in that field. Program outcomes vary according to each
          institution’s specific program curriculum.
        </div>
      </div>
    </>
  );
}
