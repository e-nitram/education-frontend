import { Metadata } from 'next';

import SubjectsIndex from '@/app/(basic)/subjects/SubjectsIndex';

export function generateMetadata(): Metadata {
  return {
    title: 'Education Directory: Subject Not Found',
    description: 'Explore subjects of interest to find your program.',
  };
}

export default async function Page() {
  return (
    <main className='flex flex-col items-center justify-center bg-light px-4 pb-12 pt-3'>
      <h1 className='mb-4 text-center font-serif text-26 font-normal leading-snug text-primary md:text-lg lg:mb-6 lg:text-42 xl:mb-10 xl:text-xl'>
        Not Found!
      </h1>
      <p>
        We're sorry, but the subject page that you were searching for could not
        be found. Try one of the below subjects instead!
      </p>
      <SubjectsIndex />
    </main>
  );
}
