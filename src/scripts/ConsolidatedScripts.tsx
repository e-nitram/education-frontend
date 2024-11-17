'use client';

import { Suspense } from 'react';

import { ClarityScript } from '@/scripts/Clarity';
import GoogleTagManager from '@/scripts/GoogleTagManager';

export default function ConsolidatedScripts() {
  return (
    <>
      <Suspense>
        <ClarityScript />
        <GoogleTagManager />
      </Suspense>
    </>
  );
}
