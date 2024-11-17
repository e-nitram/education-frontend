import Image from 'next/image';
import Link from 'next/link';

import logo_w from '@/app/_components/logo_w.svg';

export default function Header() {
  return (
    <>
      <div className='flex justify-between bg-primary py-4 pl-10 lg:py-5 lg:pl-20 xl:pl-36'>
        <Link href='/' className=''>
          <Image
            src={logo_w}
            width={172}
            height={40}
            alt='EducationDirectory.net'
          />
        </Link>

        {/* <button className='my-auto mr-10 flex items-center text-white'>
          <svg
            className='h-4 w-6 fill-current'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
          </svg>
        </button> */}
      </div>
    </>
  );
}
