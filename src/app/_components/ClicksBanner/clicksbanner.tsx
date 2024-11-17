'use client'; // TODO: Refactor to static content in a server component

import Image from 'next/image';
import React, { startTransition, useEffect, useState } from 'react';

import { createCallback } from '@/app/_actions/callback';
import { submitRevenue } from '@/app/_modules/lead';
import { Callback } from '@/app/_objects/callback';
import { getMAOInternal, Offer } from '@/pages/api/getMAO';

import Loading from './loading';

export default function ClicksBanner() {
  const [items, setItems] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const offersData = await getMAOInternal();
        const offers = (offersData?.items ?? []).slice(0, 6);
        startTransition(() => {
          setItems(offers);
          setLoading(false);
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('ERROR: Failed to load MAO data in banner', err);
        startTransition(() => setLoading(false));
      }
    }

    fetchData();
  }, []);

  async function handleClick(offer: Offer) {
    if (null == offer.brandName) {
      return;
    }
    window.dataLayer = window.dataLayer ?? [];

    window.dataLayer.push({
      event: 'purchase',
      ecommerce: {
        currency: 'USD',
        value: offer.revenue,
        items: [
          {
            item_name: offer.brandName,
            item_id: offer.brandName,
            price: offer.revenue,
            item_brand: 'mao_click',
            quantity: 1,
          },
        ],
      },
    });

    const data = localStorage.getItem('leadRes');
    const leadRes = null == data ? {} : JSON.parse(data);
    const session = leadRes.session;

    const body = {
      session_id: session.session_id,
      brand_name: offer.brandName,
      revenue: offer.revenue,
      path: offer.destUrl,
    };

    const _res = await submitRevenue(body);

    await createCallback(Callback.click, offer.revenue);
  }

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className='relative mx-auto max-w-full bg-white'>
      <div className='primaryContainer relative'>
        <div className='py-11px grid h-20 grid-cols-3 gap-4 pl-14 sm:h-20 sm:grid-cols-3 md:h-10 md:grid-cols-6 lg:h-10 lg:grid-cols-6'>
          {items?.map((offer: Offer, index: number) => (
            <div
              key={`offer-${index}`}
              onClick={() => handleClick(offer)}
              className='box relative h-full'
            >
              <a
                href={`${offer.destUrl}`}
                id={`click-banner-mao-${offer.brandName}`}
                target='_blank'
              >
                <Image
                  src={offer.imageUrl}
                  loading='lazy'
                  alt={offer.brandName}
                  className='h-15 w-15 max-h-full max-w-full object-contain'
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
