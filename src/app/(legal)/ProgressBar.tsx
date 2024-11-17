import Image from 'next/image';
import { useEffect,useState} from 'react';

import ProgressBarTick from '@/assets/icons/ProgressIcon.svg';

type ProgressBarProps = {
  totalSteps: number;
  currentStep: number;
};
const MobileProgressBar: React.FC<{
  currentStep: number;
  totalSteps: number;
}> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className='mx-auto my-4 flex items-center'>
      <div className='mx-4 h-4 w-[90vw] rounded-lg bg-[#ebebeb]'>
        <div
          className='h-full rounded-lg bg-primary transition-all duration-500 ease-in-out'
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};
const ProgressBar: React.FC<ProgressBarProps> = ({ totalSteps, currentStep }) => {
 const [isMobile, setIsMobile] = useState<boolean>(false);

 useEffect(() => {
   const handleResize = () => {
     setIsMobile(window.innerWidth <= 768);
   };

   handleResize(); 
   window.addEventListener('resize', handleResize);

   return () => {
     window.removeEventListener('resize', handleResize);
   };
 }, []);

  function renderProgressBar() {
    if (isMobile) {
      return (
        <MobileProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      );
    } else {
      const progressBarSegments = [...Array(totalSteps)].map((_, index) => (
        <div key={index} className='relative'>
          {index === currentStep - 1 && (
            <Image
              src={ProgressBarTick}
              alt={`Step ${index + 1}`}
              className='absolute top-1/2 z-10 ml-4 h-10 w-10 -translate-y-1/2'
            />
          )}
          <div
            className={
              index < currentStep && index !== currentStep - 1
                ? 'ease h-[16px] w-[111px] flex-1 rounded-lg bg-primary transition-all duration-700'
                : index === currentStep - 1
                ? 'ease h-[16px] w-[111px] flex-1 rounded-lg bg-gradient-to-r from-primary from-20% via-[#ebebeb] via-45% to-[#ebebeb] transition-all duration-700'
                : 'ease h-[16px] w-[111px] flex-1 rounded-lg bg-[#ebebeb] transition-all duration-700'
            }
          />
        </div>
      ));

      return (
        <div className='mx-auto my-[1rem] flex w-[390px] items-center gap-[10px]'>
          {progressBarSegments}
        </div>
      );
    }
  }

  return (
    <>
      <p className='text-center text-sm font-semibold text-primary'>
        Step {currentStep} of {totalSteps}
      </p>
      <div className='grid place-items-center'>
        <div className='pr-[350px]'>{renderProgressBar()}</div>
        <div className='mt-4 flex flex-col items-center'></div>
      </div>
    </>
  );
};

export default ProgressBar;
