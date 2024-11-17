import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import logo_w from '@/app/_components/logo_w.svg';
import { Markdown } from '@/app/_components/Markdown';
import { MarkdownFooter } from '@/app/_components/MarkdownFooter';
import MiniForm from '@/app/_components/MiniForm/MiniForm';
import { getSubjectPage, getSubjectsIndex } from '@/app/_modules/subjectPages';

type Params = {
  params: { subject: string };
};

export async function generateStaticParams() {
  const subjects = await getSubjectsIndex();

  const slugs = subjects
    ?.map((subject) => {
      return {
        subject: subject.slug,
      };
    })
    .filter((subject) => undefined != subject);

  return slugs ?? [];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const subject = await getSubjectPage(params.subject);

  if (null == subject) {
    notFound();
  }

  return {
    title: subject.section_1_heading,
    description: subject.section_1_text,
    alternates: {
      canonical: `https://educationdirectory.net/subjects/${subject.slug}`,
    },
  };
}

export default async function Page({ params }: Params) {
  const subject = await getSubjectPage(params.subject);

  if (null == subject) {
    notFound();
  }

  return (
    <>
      <main className='bg-[#F5F5F5]'>
        <div
          className='relative flex min-h-[95vh] flex-col items-center justify-evenly gap-4 px-6 py-4 lg:flex-row'
          style={{
            backgroundImage: `url(${subject.section_1_image.asset})`,
            backgroundSize: 'cover',
          }}
        >
          <div className='absolute left-0 top-0 h-full w-full bg-primary opacity-50'></div>
          <div className='z-10 flex flex-col justify-center lg:w-1/2'>
            <h1 className='text-left font-serif text-48 font-medium leading-tight text-[#F5F5F5] lg:text-xl'>
              {subject.section_1_heading}
            </h1>
            <h2 className='py-4 text-left font-sans text-sm text-[#F5F5F5]'>
              {subject.section_1_text}
            </h2>
          </div>
          <div className='z-10'>
            <MiniForm
              key='miniform-1'
              subject={`ad-${subject.slug}`}
              tcpa={{
                text: subject.form_tcpa,
                checkbox: subject.form_tcpa_checkbox,
                precheck: subject.form_tcpa_precheck,
              }}
            />
          </div>
        </div>

        {null !== subject.section_2_heading && (
          <div className='relative flex min-h-[95vh] flex-col items-center justify-evenly gap-4 px-6 py-4 lg:flex-row'>
            <div className='flex flex-col justify-center lg:w-1/2'>
              <h2 className='py-4 text-left font-serif text-48 font-medium leading-tight text-[#2541B2] lg:text-xl'>
                {subject.section_2_heading}
              </h2>
              <Markdown source={subject.section_2_text} />
            </div>
            <MiniForm
              key='miniform-2'
              subject={`ad-${subject.slug}`}
              tcpa={{
                text: subject.form_tcpa,
                checkbox: subject.form_tcpa_checkbox,
                precheck: subject.form_tcpa_precheck,
              }}
              styling={{
                bg: 'primary',
                text: 'white',
                buttonBg: 'secondary',
                buttonText: 'lotion',
                tcpa: 'white',
              }}
            />
          </div>
        )}
        {null !== subject.section_3_heading && (
          <div className='relative flex min-h-[95vh] flex-col items-center justify-evenly gap-4 px-6 py-4 lg:flex-row-reverse'>
            <div className='flex flex-col justify-center lg:w-1/2'>
              <h2 className='py-4 text-left font-serif text-48 font-medium leading-tight text-[#2541B2] lg:text-xl'>
                {subject.section_3_heading}
              </h2>
              <Markdown source={subject.section_3_text} />
            </div>
            {null != subject.section_3_image && (
              <Image
                width={500}
                height={800}
                src={subject.section_3_image.asset}
                alt={subject.section_3_image_alt ?? ''}
                className='shadow-box'
              />
            )}
          </div>
        )}
        {null !== subject.section_4_heading && (
          <div className='relative flex min-h-[95vh] flex-col items-center justify-evenly gap-4 px-6 py-4 lg:flex-row'>
            <div className='flex flex-col justify-center lg:w-1/2'>
              <h2 className='py-4 text-left font-serif text-48 font-medium leading-tight text-[#2541B2] lg:text-xl'>
                {subject.section_4_heading}
              </h2>
              <Markdown source={subject.section_4_text} />
            </div>
            {null != subject.section_4_image && (
              <Image
                width={500}
                height={800}
                src={subject.section_4_image.asset}
                alt={subject.section_4_image_alt ?? ''}
                className='shadow-box'
              />
            )}
          </div>
        )}
        {null !== subject.section_5_heading && (
          <div className='relative flex min-h-[95vh] flex-col items-center justify-evenly gap-4 px-6 py-2 lg:flex-row-reverse'>
            <div className='flex flex-col justify-center lg:w-1/2'>
              <h2 className='py-4 text-left font-serif text-48 font-medium leading-tight text-[#2541B2] lg:text-xl'>
                {subject.section_5_heading}
              </h2>
              <Markdown source={subject.section_5_text} />
            </div>
            {null != subject.section_5_image && (
              <Image
                width={500}
                height={800}
                src={subject.section_5_image.asset}
                alt={subject.section_5_image_alt ?? ''}
                className='shadow-box'
              />
            )}
          </div>
        )}
        {null != subject.section_6_heading && (
          <div className='flex min-h-[95vh] flex-col items-center justify-evenly gap-4 bg-secondary'>
            <h2 className='py-4 text-left font-serif text-48 font-medium text-[#2541B2] lg:text-xl'>
              {subject.section_6_heading}
            </h2>
            <MiniForm
              key='miniform-3'
              subject={`ad-${subject.slug}`}
              tcpa={{
                text: subject.form_tcpa,
                checkbox: subject.form_tcpa_checkbox,
                precheck: subject.form_tcpa_precheck,
              }}
              styling={{
                bg: 'secondary',
                text: 'primary',
                buttonBg: 'primary',
                buttonText: 'lotion',
                tcpa: 'lotion',
              }}
            />
          </div>
        )}
        {null !== subject.section_7_heading && (
          <div className='relative flex min-h-[95vh] flex-col items-center justify-evenly gap-4 px-6 py-4 lg:flex-row'>
            <div className='lg:w-1/2'>
              <h2 className='py-4 text-left font-serif text-48 font-medium leading-tight text-[#2541B2] lg:text-xl'>
                {subject.section_7_heading}
              </h2>
              <Markdown source={subject.section_7_text_1} />
            </div>
            <Markdown source={subject.section_7_text_2} />
          </div>
        )}
        {null !== subject.quote_text && null !== subject.quote_image && (
          <div
            className='relative flex min-h-[95vh] flex-col items-center justify-evenly gap-4 px-6 py-4 lg:flex-row-reverse'
            style={{
              backgroundImage: `url(${subject.quote_image.asset})`,
              backgroundSize: 'cover',
            }}
          >
            <div className='absolute left-0 top-0 h-full w-full bg-primary opacity-50'></div>
            <div className='z-10'>
              <h1 className='text-center font-sans text-lg font-semibold text-[#F5F5F5]'>
                {subject.quote_text}
              </h1>
              <h2 className='text-center font-sans text-xs text-[#F5F5F5] lg:text-md'>
                {subject.quote_source}
              </h2>
            </div>
          </div>
        )}
        {null !== subject.quote_text && null == subject.quote_image && (
          <div className='relative flex min-h-[95vh] flex-col items-center justify-evenly gap-4 px-6 py-4 lg:flex-row-reverse'>
            <div className='absolute left-0 top-0 h-full w-full bg-primary opacity-50'></div>
            <div className='z-10'>
              <h1 className='text-center font-sans text-lg font-semibold text-white'>
                {subject.quote_text}
              </h1>
              <h2 className='text-center text-md font-semibold text-white'>
                {subject.quote_source}
              </h2>
            </div>
          </div>
        )}
        {null !== subject.section_9_heading && (
          <div className='relative flex min-h-[95vh] flex-col items-center justify-evenly gap-4 px-6 py-4 lg:flex-row-reverse'>
            <MiniForm
              key='miniform-4'
              subject={`ad-${subject.slug}`}
              tcpa={{
                text: subject.form_tcpa,
                checkbox: subject.form_tcpa_checkbox,
                precheck: subject.form_tcpa_precheck,
              }}
              styling={{
                bg: 'white',
                text: 'primary',
                buttonBg: 'secondary',
                buttonText: 'lotion',
                tcpa: 'black',
              }}
            />
            <h1 className='text-center text-lg font-semibold text-primary lg:text-xl'>
              {subject.section_9_heading}
            </h1>
          </div>
        )}
        {/* <div className='flex min-h-[95vh] flex-col items-center justify-evenly gap-4 px-6 lg:px-24'>
          <SimilarSubjects area={subject.area_of_interest_fk ?? ''} />
        </div>
        <div className='flex min-h-[95vh] flex-col items-center justify-evenly gap-4'>
          <SubjectsIndex />
        </div> */}
      </main>

      {/* Footer */}
      <div className='flex flex-col justify-between gap-6 bg-primary px-9 pb-6 pt-10 font-sans text-white md:flex-row lg:gap-10 lg:px-20 xl:px-36'>
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
        <MarkdownFooter source={subject.footer_legal} className='text-white' />
      </div>
    </>
  );
}
