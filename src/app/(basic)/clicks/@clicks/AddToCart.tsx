'use client';

import { useEffect } from 'react';

import { Offer } from '@/pages/api/getMAO';

export default function AddToCart(offer: Offer) {
  useEffect(() => {
    window.dataLayer = window.dataLayer ?? [];
    if (null == offer.brandName) {
      return;
    }

    const existingItemIndex = window.dataLayer.findIndex(
      (item) => item.ecommerce?.items[0]?.item_name === offer.brandName,
    );

    if (-1 == existingItemIndex) {
      window.dataLayer.push({
        event: 'add_to_cart',
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
    }
  }, [offer.brandName, offer.revenue]);
  return <></>;
}
