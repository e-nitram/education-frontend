'use client';

import { useState } from 'react';

import { MAOOffer } from '@/app/_modules/mao';
import Banner from '@/app/(basic)/clicks/@thankyou/Banner';
import Offer from '@/app/(basic)/clicks/@thankyou/Offer';

export default function ThankYouModal({
  offers,
  banners,
}: {
  offers: MAOOffer[];
  banners: MAOOffer[];
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  if (null == offers) {
    return (
      <>
        <div>ThankYou</div>
        <dialog
          open={isOpen}
          className='fixed inset-1 z-50 h-[100svh] w-full items-center justify-center overflow-y-auto bg-transparent '
        >
          <div className='relative max-h-full w-full max-w-2xl p-4'>
            {/* <!-- Modal content --> */}
            <div className='relative rounded-lg bg-primary shadow-outset'>
              {/* <!-- Modal header --> */}
              <div className='flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600'>
                <div className='flex flex-col'>
                  <h2 className='m-auto font-serif text-xl font-semibold text-light'>
                    Thank you!
                  </h2>
                  <h3 className='m-auto font-sans text-sm text-light md:w-7/12'>
                    That's all submitted for you.
                  </h3>
                </div>
                <button
                  type='button'
                  className='ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                  data-modal-hide='default-modal'
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className='h-3 w-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                  >
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                    />
                  </svg>
                  <span className='sr-only'>Close modal</span>
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </>
    );
  }

  function alternateComponents(offers: MAOOffer[], banners: MAOOffer[]) {
    const numOffers = offers.length;
    const numBanners = banners.length;

    let o = 0;
    let b = 0;

    const cards = [];

    while (o < numOffers || b < numBanners) {
      for (let i = 0; i < 4 && o < numOffers; i++) {
        cards.push(<Offer key={`offer-${o}`} offer={offers[o]} />);
        o++;
      }

      if (b < numBanners) {
        cards.push(<Banner key={`banner-${b}`} offer={banners[b]} />);
        b++;
      }
    }

    return cards;
  }

  return (
    <>
      <div>ThankYou</div>
      <dialog
        open={isOpen}
        className='fixed inset-1 z-50 h-[100svh] w-full items-center justify-center overflow-y-auto bg-transparent '
      >
        <div className='relative max-h-full w-full p-4'>
          {/* <!-- Modal content --> */}
          <div className='relative rounded-lg bg-primary shadow-outset'>
            {/* <!-- Modal header --> */}
            <div className='flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600'>
              <div className='flex flex-col'>
                <h2 className='m-auto font-serif text-xl font-semibold text-light'>
                  Thank you!
                </h2>
                <h3 className='m-auto font-sans text-sm text-light md:w-7/12'>
                  That's all submitted for you, we've also found some really
                  great offers for you. Take a look!
                </h3>
              </div>
              <button
                type='button'
                className='ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-hide='default-modal'
                onClick={() => setIsOpen(false)}
              >
                <svg
                  className='h-3 w-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-5'>
              {alternateComponents(offers, banners)}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
