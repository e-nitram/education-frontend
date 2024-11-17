import React from 'react';

export default function Loading() {
  return (
    <div className='relative mx-auto max-w-full bg-white'>
      <div className='primaryContainer relative'>
        <div className='py-11px grid h-20 grid-cols-3 gap-4 sm:h-20 sm:grid-cols-3 md:h-10 md:grid-cols-6 lg:h-10 lg:grid-cols-6'>
          {Array(6).map((_item: null, index: number) => (
            <div className='box relative h-full' key={`offer-${index}`}>
              <div>loading</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
