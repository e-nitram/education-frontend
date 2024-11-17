import React, { useEffect, useRef, useState } from 'react';

import { INITIAL_COUNT, STATUS } from '@/appConstants';

type CallbackFunction = () => void;

export default function CountdownApp() {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STOPPED);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  useEffect(() => {
    setStatus(STATUS.STARTED);
  }, []);

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null,
  );
  return (
    <div>
      <div className='text-xs'>
        {twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
      </div>
    </div>
  );
}

function useInterval(callback: any, delay: any) {
  const savedCallback = useRef<CallbackFunction | undefined>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
const twoDigits = (num: number) => String(num).padStart(2, '0');
