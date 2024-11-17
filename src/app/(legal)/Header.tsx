import Image from 'next/image';
import Link from 'next/link';

import logo_b from '@/app/_components/logo_b.svg';
import logo_w from '@/app/_components/logo_w.svg';

export default function Header() {
  return (
    <>
      <div className='flex items-center bg-white py-4 pl-10 shadow-box lg:hidden'>
        <Link href='/' className='my-auto'>
          <Image
            src={logo_b}
            width={172}
            height={40}
            alt='EducationDirectory.net'
          />
        </Link>
      </div>
      <div className='hidden items-center justify-between bg-primary py-4 pl-10 shadow-box lg:flex lg:py-5 lg:pl-20 xl:pl-36'>
        <Link href='/' className=''>
          <Image
            src={logo_w}
            width={172}
            height={40}
            alt='EducationDirectory.net'
          />
        </Link>
      </div>
    </>
  );
}
