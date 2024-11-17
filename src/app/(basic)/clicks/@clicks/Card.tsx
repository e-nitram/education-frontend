'use client';

import Image from 'next/image';
import Link from 'next/link';

import { createCallback } from '@/app/_actions/callback';
import { submitRevenue } from '@/app/_modules/lead';
import { Callback } from '@/app/_objects/callback';

import CardButton from './CardButton';
import campus from '../../../../assets/icons/campus.svg';
// import hybrid from '../../../assets/icons/onlineAndCampus.svg';
import medal from '../../../../assets/icons/medal.svg';
import online from '../../../../assets/icons/online.svg';

interface OfferProps {
  logo: string;
  schoolName: string;
  headline: string;
  rating: number;
  description: string;
  format: boolean;
  bullet: string;
  destURL: string;
  color1: string;
  color2: string;
  impURL: string;
  offer: {
    brandName: string;
    revenue: number;
    destUrl: string;
  };
  // showURL: string;
}

export default function ClickCard({
  logo,
  schoolName,
  headline,
  rating,
  description,
  format,
  bullet,
  destURL,
  color1,
  color2,
  offer,
  impURL, // showURL,
}: OfferProps) {
  async function handleClick() {
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
  return (
    <div>
      <div className='mx-auto my-3 grid w-full grid-cols-[min-content,1fr,min-content] rounded-lg bg-white px-4 py-3 shadow-outset md:p-0'>
        <div className='relative col-start-1 row-start-1 m-auto flex h-[47px] w-[65px] items-start justify-center object-contain align-middle  md:ml-5 lg:h-[42px] lg:w-[110px] xl:h-[56px] xl:w-[152px]'>
          <Link
            className='underline'
            target='_blank'
            id={`click-page-mao-${schoolName}`}
            href={destURL}
          >
            <Image
              src={logo}
              alt={schoolName}
              fill
              onClick={handleClick}
              className='relative m-auto flex max-h-[47px] max-w-[65px] justify-center object-contain align-middle lg:max-h-[42px] lg:max-w-[110px] xl:max-h-[56px] xl:max-w-[152px]'
            />
          </Link>
        </div>
        <div className='grow-1 col-start-1 row-start-2 flex md:hidden'></div>
        <div className='col-span-3 col-start-1 row-start-2 flex grow flex-col md:col-span-1 md:row-start-1 md:ml-5 md:mt-3 md:flex-col-reverse'>
          <div
            className='my-1.5 text-18 font-semibold xl:text-md'
            style={
              'primary' === color1 ? { color: '#2541b2' } : { color: color1 }
            }
          >
            {schoolName}
          </div>
          <div
            className='text-12 font-semibold uppercase'
            style={
              'primary' === color1 ? { color: '#2541b2' } : { color: color1 }
            }
          >
            {headline}
          </div>
        </div>
        <div className='col-start-3 row-start-1 my-auto flex flex-col items-center justify-end md:mr-5 md:items-end'>
          <div className='col-start-3 row-start-1 my-auto flex flex-col items-center justify-end md:items-end'>
            <span className='text-26 text-yellow-500'>
              {Array.from({ length: rating }).map((_, index) => (
                <span key={'star' + +index}>★</span>
              ))}
            </span>
            <span className='ml-2 hidden text-gray-600 xl:block'>
              {rating.toFixed(1)}/5.0 stars {/*({rating * 20} reviews)*/}
            </span>
          </div>
        </div>

        <div className='col-span-3 row-start-4 my-1.5 border-b border-dark border-opacity-30 md:mx-5'></div>

        <div
          onClick={handleClick}
          className='col-span-3 row-start-5 mx-5 mb-2.5 mt-1.5 hidden font-sans text-sm md:block'
        >
          {description}{' '}
          <Link
            className='underline'
            target='_blank'
            id={`click-page-mao-${schoolName}`}
            href={destURL}
          >
            read more
          </Link>
        </div>

        <div
          className='col-span-3 row-start-6 mb-1 flex flex-row justify-around text-12 md:hidden'
          style={
            'primary' === color1 ? { color: '#2541b2' } : { color: color1 }
          }
        >
          <div className='col-span-1 mr-1 flex flex-row font-sans'>
            <span className='font-bold'>&#10003;</span>{' '}
            {false === format ? 'In Person' : 'Online'}
          </div>
          <div className='col-span-2 mr-1 max-w-[60%] font-sans'>
            <span className='font-bold'>&#10003;</span> {bullet}
          </div>
        </div>

        <div className='col-span-3 row-start-7 flex items-center px-4 py-2 align-middle md:rounded-b-lg md:bg-dark md:bg-opacity-10 md:p-4 lg:py-3'>
          <div className='hidden align-middle lg:flex'>
            <div
              className='mr-1.5 flex h-8 w-8 items-center rounded-full border align-middle'
              style={
                'primary' === color1
                  ? { borderColor: '#2541b2' }
                  : { borderColor: color1 }
              }
            >
              <Image
                className='m-auto h-4 w-4 object-contain'
                src={false === format ? campus : online}
                alt='format'
              />
            </div>

            <p
              className='my-auto font-sans text-sm'
              style={
                'primary' === color1 ? { color: '#2541b2' } : { color: color1 }
              }
            >
              {false === format ? 'In Person' : 'Online'}
            </p>
          </div>
          <div className='ml-7 hidden align-middle lg:flex'>
            <div
              className='mr-1.5 flex h-8 w-8 items-center rounded-full border align-middle'
              style={
                'primary' === color1
                  ? { borderColor: '#2541b2' }
                  : { borderColor: color1 }
              }
            >
              <Image
                className='m-auto h-4 w-4 object-contain'
                src={medal}
                alt='winning'
              />
            </div>

            <p
              className='my-auto font-sans text-sm'
              style={
                'primary' === color1 ? { color: '#2541b2' } : { color: color1 }
              }
            >
              {bullet}
            </p>
          </div>
          <CardButton
            offer={offer}
            url={destURL}
            color1={color1}
            color2={color2}
            id={`click-page-mao-button-${schoolName}`}
            className='box-border flex whitespace-nowrap rounded-full bg-primary px-14 py-3 text-center font-sans text-18 font-bold text-white transition duration-500 ease-in-out hover:shadow-button md:ml-auto md:self-end md:px-11'
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={impURL}
            className='invisible hidden h-0 w-0'
            alt=''
            loading='lazy'
          />
        </div>
      </div>
    </div>
  );
}
