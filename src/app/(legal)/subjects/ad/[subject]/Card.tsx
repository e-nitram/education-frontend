import Image from 'next/image';
import Link from 'next/link';

type SubjectCardProps = {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  slug: string;
};

export default function SubjectCard({
  title,
  text,
  image,
  imageAlt,
  slug,
}: SubjectCardProps) {
  return (
    <div className='w-full rounded-lg border bg-white shadow-outset lg:w-96 '>
      <div className='h-300 flex w-full flex-col items-center'>
        <div className='relative h-64 w-full rounded-lg'>
          <Image
            src={image}
            alt={imageAlt}
            fill
            className='rounded-lg object-cover'
          />
        </div>
        <div className='itmes-center flex flex-col gap-4 px-4 pb-10 pt-6'>
          <h2 className='font-sans text-md font-semibold uppercase text-primary'>
            {title}
          </h2>
          <p className='font-sans text-sm text-dark'>
            {text.slice(0, 200) + '...'}
          </p>
          <Link
            href={`/subjects/${slug}`}
            className='max-w-sm rounded-full border-2 border-primary px-9 py-3 text-md font-semibold text-primary'
          >
            View Program
          </Link>
        </div>
      </div>
    </div>
  );
}
