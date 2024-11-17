import Link from 'next/link';

import { getSubjectsIndex, SubjectHeader } from '@/app/_modules/subjectPages';

type Area = {
  name: string;
  slug: string;
  id: number;
  subjects: SubjectHeader[];
};

export default async function SubjectsIndex() {
  const subjects = await getSubjectsIndex();

  if (null == subjects) {
    return (
      <main className='flex flex-col items-center justify-center bg-light px-4 pb-12 pt-3'>
        <h1 className='mb-4 text-center font-serif text-26 font-normal leading-snug text-primary md:text-lg lg:mb-6 lg:text-42 xl:mb-10 xl:text-xl'>
          Subject Areas Coming Soon
        </h1>
        <div className='mx-9 flex flex-col gap-4 md:mx-0 md:w-4/5 lg:w-3/5 lg:gap-4 xl:w-1/2 xl:gap-6'></div>
      </main>
    );
  }

  // Group subjects by their area of interest
  const areas: Record<string, Area> = {};

  subjects.forEach((subject) => {
    const area = subject.area_of_interest;

    if (null == area) {
      if (null == areas[0]) {
        areas['Unclassified'] = {
          name: 'Unclassified',
          id: 0,
          slug: 'Unclassified',
          subjects: [],
        };
      }

      areas['Unclassified'].subjects.push(subject);
    }

    if (null != area) {
      if (null == areas[area.id]) {
        areas[area.id] = {
          name: area.name,
          id: area.id,
          slug: area.slug,
          subjects: [],
        };
      }

      areas[area.id].subjects.push(subject);
    }
  });

  return (
    <>
      <h1 className='mb-4 text-center font-serif text-26 font-normal leading-snug text-primary md:text-lg lg:mb-6 lg:text-42 xl:mb-10 xl:text-xl'>
        Subject Areas
      </h1>
      <div className='mx-9 grid grid-cols-1 gap-4 md:mx-0 md:w-4/5 md:grid-cols-2 lg:w-3/5 lg:grid-cols-3 lg:gap-4 xl:w-1/2 xl:grid-cols-4 xl:gap-6'>
        {Object.values(areas).map((area, outi) => (
          <div key={area.slug + +outi}>
            <Link href={`/area-of-interest/${area.slug}`}>
              <h2 className='mb-4 font-sans text-md font-semibold uppercase leading-snug text-primary'>
                {area.name}
                {/* Area of Interest */}
              </h2>
            </Link>
            {area.subjects.map((subject, ini) => (
              <div key={`${area.slug}-${subject.slug}-${outi}-${ini}`}>
                <Link href={`/subjects/${subject.slug}`}>
                  <h3 className='font-sans text-sm font-semibold leading-snug text-dark'>
                    {subject.section_1_heading}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
