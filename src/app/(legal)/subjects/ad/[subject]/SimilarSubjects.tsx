import { getRelatedSubjects, SubjectHeader } from '@/app/_modules/subjectPages';
import SubjectCard from '@/app/(legal)/subjects/ad/[subject]/Card';

export default async function SimilarSubjects({ area }: { area: string }) {
  const subjects = await getRelatedSubjects(area);

  if (null == subjects) {
    return (
      <>
        <h2 className='font-serif text-xl font-medium text-primary'>
          Similar Subjects
        </h2>
        <div className='flex flex-col items-center justify-evenly gap-4 lg:flex-row lg:flex-wrap'>
          <h2 className='font-sans text-md font-semibold uppercase text-primary'>
            Coming Soon!
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className='font-serif text-xl font-medium text-primary'>
        Similar Subjects
      </h2>
      <div className='flex flex-col items-center justify-evenly gap-4 lg:flex-row lg:flex-wrap'>
        {subjects.map((subject: SubjectHeader, index: number) => (
          <SubjectCard
            key={index}
            title={subject.section_1_heading}
            text={subject.section_1_text}
            image={subject.section_1_image.asset}
            imageAlt={subject.section_1_image_alt}
            slug={subject.slug}
          />
        ))}
      </div>
    </>
  );
}
