import Image from 'next/image';

import { MAOOffer } from '@/app/_modules/mao';

export default function Offer({ offer }: { offer: MAOOffer }) {
  return (
    <div className='flex flex-col gap-4 rounded-lg bg-white px-4 py-3 text-primary shadow-outset'>
      <div className='flex flex-row gap-4'>
        <div className='relative h-[47px] w-[65px] items-start justify-center object-contain align-middle lg:h-[42px] lg:w-[110px] xl:h-[56px] xl:w-[152px]'>
          <Image src={offer.imageUrl} alt={offer.brandName} fill />
        </div>
        <h3 className='py-1.5 text-18 font-semibold xl:text-md'>
          {offer.brandName}
        </h3>
      </div>
      <div className='flex-cols space-between flex'>
        <ul className='flex-auto'>
          {offer.blurbs.slice(0, 1).map((bullet, bindex) => (
            <li
              key={`${offer.brandName}-${bindex}`}
              className='font-sans text-sm'
            >
              {bullet}
            </li>
          ))}
        </ul>
        <button className='hidden flex-none md:block'>{'>'}</button>
      </div>
      <button className='box-border flex w-full whitespace-nowrap rounded-full bg-primary px-14 py-3 text-center font-sans text-18 font-bold text-white transition duration-500 ease-in-out hover:shadow-button md:ml-auto md:hidden md:self-end md:px-11'>
        Get this offer
      </button>
    </div>
  );
}
