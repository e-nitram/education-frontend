'use client';

import Link from 'next/link';
import { useState } from 'react';

import { submitRevenue } from '@/app/_modules/lead';

export default function CardButton({
  // color1,
  // color2,
  url,
  className,
  id,
  offer,
}: {
  color1: string;
  color2: string;
  url: string;
  className?: string;
  id?: string;
  offer: {
    brandName: string;
    revenue: number;
    destUrl: string;
  };
}) {
  const [_focus, setFocus] = useState(false);
  async function handleButtonClick() {
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
  }

  return (
    <>
      <Link
        href={url}
        target='_blank'
        onMouseOver={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
        id={id ?? 'click-mao-button'}
        // style={
        //   focus
        //     ? { backgroundColor: color2, color: color1 }
        //     : { backgroundColor: color1, color: color2 }
        // }
        className={className}
        onClick={handleButtonClick}
      >
        Find your program
      </Link>
    </>
  );
}
