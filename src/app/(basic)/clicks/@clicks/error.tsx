'use client';

import Link from 'next/link';

import SubHeader from '@/app/(basic)/clicks/@clicks/SubHeader';

export default function ClicksError() {
  return (
    <>
      <SubHeader />
      <Link
        href='/get-started'
        target='_blank'
        id='redirect-error-clicks'
        className='box-border flex whitespace-nowrap rounded-full bg-primary px-14 py-3 text-center font-sans text-18 font-bold text-white transition duration-500 ease-in-out hover:shadow-button md:ml-auto md:self-end md:px-11'
      >
        Get Started
      </Link>
    </>
  );
}
