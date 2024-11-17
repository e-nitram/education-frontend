import { Box, SimpleGrid } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useContext } from 'react';

import AddToCart from '@/components/ClicksBanner/AddToCart';
import Loading from '@/components/ClicksBanner/loading';

import { AppContext } from '@/context/AppContext';

import { submitRevenue } from '@/app/_modules/lead';
import { Callback } from '@/app/_objects/callback';
import { Offer } from '@/pages/api/getMAO';

export default function ClicksBanner({ items }: { items: Offer[] }) {
  const { createCallback } = useContext(AppContext);
  if (null == items || undefined == items || 0 === items?.length) {
    return <Loading />;
  }
  async function handleClick(offer: {
    brandName: string;
    revenue: number;
    destUrl: string;
  }) {
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

    createCallback(Callback.click, offer.revenue);
  }

  return (
    <Box bg='ED.white' maxW='100%' m='auto' pos='relative'>
      <Box className='primaryContainer' pos='relative'>
        <SimpleGrid
          columns={[3, 3, 6, 6]}
          height={['200px', '200px', '100px', '100px']}
          spacing={['20px', '20px', '120px', '120px']}
          alignItems='center'
          py='11px'
        >
          {items?.map((offer: Offer, index: number) => (
            <div key={offer.brandName + +index}>
              <AddToCart {...offer} />
              <div>
                <a
                  href={`${offer.destUrl}`}
                  id={`click-banner-mao-${offer.brandName}`}
                  target='_blank'
                  onClick={(_e) => handleClick(offer)}
                >
                  <Image
                    src={offer.imageUrl}
                    loading='lazy'
                    width={120}
                    height={70}
                    alt={offer.brandName}
                    className='h-auto w-auto'
                  />
                </a>
              </div>
            </div>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
