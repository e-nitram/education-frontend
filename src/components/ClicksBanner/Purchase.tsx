'use client';
import { useEffect } from 'react';

export default function PurchaseEvent(offer: {
  revenue: number;
  brandName: string;
}) {
  useEffect(() => {
    window.dataLayer = window.dataLayer ?? [];
    if (null == offer.brandName) {
      return;
    }

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
  });
  return <></>;
}
