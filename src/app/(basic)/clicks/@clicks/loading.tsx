import ClickCard from './Card';
import SubHeader from './SubHeader';

interface Offer {
  brandName: string;
  headline: string;
  blurbs: string[];
  imageUrl: string;
  destUrl: string;
  impressionUrl: string;
  trackingURL: string;
  displayUrl: string;
}

export default async function ClicksPage() {
  return (
    <main className='flex flex-col items-center justify-center bg-light pb-12'>
      <SubHeader />
      <div className='mb-7 mt-6 hidden w-1/2 justify-between font-sans text-xs font-medium lg:flex'>
        <div className='font-sans text-xs font-medium'>Show top schools</div>
        <div>Sort by rating</div>
      </div>
      <div className='mx-9 gap-3 md:mx-0 md:w-4/5 lg:w-3/5 lg:gap-4 xl:w-1/2 xl:gap-6'>
        {Array(2).map((offer: Offer, index: number) => {
          return (
            <>
              <ClickCard
                key={index}
                logo={offer.imageUrl}
                schoolName={offer.brandName}
                headline={offer.headline}
                rating={5}
                description={offer.blurbs[0]}
                format={'In Person' === offer.blurbs[1] ? false : true}
                bullet={offer.blurbs[2]}
                destURL={offer.destUrl.replace(/ /g, '%20')}
                color1={'' === offer.blurbs[4] ? 'primary' : offer.blurbs[4]}
                color2={'' === offer.blurbs[5] ? 'secondary' : offer.blurbs[5]}
                impURL={offer.impressionUrl}
                offer={{
                  brandName: '',
                  revenue: 0,
                  destUrl: '',
                }}
              />
            </>
          );
        })}
      </div>
    </main>
  );
}
