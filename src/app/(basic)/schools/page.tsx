import { Metadata } from 'next';
import Link from 'next/link';

interface School {
  name: string;
  description: string;
  logo: string;
  slug: string;
  school_type: string;
}

export const metadata: Metadata = {
  title: 'Education Directory Schools',
  description: 'Available schools.',
  icons: '/favicon.png',
  alternates: {
    canonical: 'https://educationdirectory.net/schools',
  },
};

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schools`);

  if (!res.ok) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to fetch results', res);
  }

  return res.json();
}

export default async function Page() {
  const schools = await getData();

  return (
    <main className='flex flex-col items-center justify-center bg-light px-4 pb-12 pt-3'>
      <h1 className='mb-4 text-center font-serif text-26 font-normal leading-snug text-primary md:text-lg lg:mb-6 lg:text-42 xl:mb-10 xl:text-xl'>
        Colleges & Universities
      </h1>
      <div className='mx-9 flex flex-col gap-4 md:mx-0 md:w-4/5 lg:w-3/5 lg:gap-4 xl:w-1/2 xl:gap-6'>
        <div className='my-2 flex flex-col gap-3'>
          <h2 className='mb-4 font-sans text-md font-semibold uppercase leading-snug text-primary'>
            Online
          </h2>
          {schools
            .filter((school: School) => 'Online' === school.school_type)
            .map((school: School, index: number) => {
              return (
                <div key={school.slug + +index}>
                  <Link href={`/schools/${school.slug}`}>
                    <h3 className='text-sm font-semibold leading-snug text-dark'>
                      {school.name}
                    </h3>
                  </Link>
                </div>
              );
            })}
        </div>

        <div className='my-2 flex flex-col gap-3'>
          <h2 className='mb-4 font-sans text-md font-semibold uppercase leading-snug text-primary'>
            On Campus
          </h2>
          {schools
            .filter((school: School) => 'On Campus' === school.school_type)
            .map((school: School, index: number) => {
              return (
                <div key={school.slug + +index}>
                  <Link href={`/schools/${school.slug}`}>
                    <h3 className='text-sm font-semibold leading-snug text-dark'>
                      {school.name}
                    </h3>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}
