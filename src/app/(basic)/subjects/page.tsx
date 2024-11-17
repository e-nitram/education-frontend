import { Metadata } from 'next';

import SubjectsIndex from '@/app/(basic)/subjects/SubjectsIndex';

export function generateMetadata(): Metadata {
  return {
    title: 'Education Directory: Subjects',
    description: 'Explore subjects of interest to find your program.',
    alternates: {
      canonical: 'https://educationdirectory.net/subjects',
    },
  };
}

export default async function Page() {
  return (
    <main className='flex flex-col items-center justify-center bg-light px-4 pb-12 pt-3'>
      <SubjectsIndex />
    </main>
  );
}
