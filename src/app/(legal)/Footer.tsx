import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <div className='flex flex-col justify-between gap-6 bg-primary px-9 pb-10 font-sans text-white lg:gap-10 lg:px-20 xl:px-36'>
        <div className='border-b'></div>
        <div className='flex flex-col gap-4 md:flex-row md:justify-between'>
          <div className='flex flex-col gap-4 lg:flex-row'>
            <h2 className='text-md font-semibold'>Legal information</h2>
            <Link className='text-sm font-normal' href='/privacy-policy'>
              Privacy Policy
            </Link>
            <Link className='text-sm font-normal' href='/terms-and-conditions'>
              Terms of Use
            </Link>
            <Link className='text-sm font-normal' href='/do-not-call'>
              Do not sell my info
            </Link>
          </div>
          <div className='flex flex-col gap-4 lg:flex-row'>
            <h2 className='text-md font-semibold'>Contact</h2>
            <Link className='text-sm' href='tel:8778355785'>
              (877) 835-5785
            </Link>
          </div>
        </div>
        <div className='border-b'></div>
        <div className='text-xs'>
          This is an offer for educational opportunities and not an offer for
          nor a guarantee of employment. Students should consult with a
          representative from the school they select to learn more about career
          opportunities in that field. Program outcomes vary according to each
          institution’s specific program curriculum.
        </div>
      </div>
    </>
  );
}
