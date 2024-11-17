import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import Session from '@/app/_components/Session';
import ConsolidatedScripts from '@/scripts/ConsolidatedScripts';
import GoogleNoScript from '@/scripts/GoogleNoScript';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export const metadata: Metadata = {
  title: 'Education Directory',
  description: 'Connecting you to education opportunities',
  icons: '/favicon.png',
  alternates: {
    canonical: 'https://educationdirectory.net/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Suspense>
        <ConsolidatedScripts />
      </Suspense>
      <body className={inter.className}>
        <Suspense>
          <Session />
        </Suspense>
        {children}
        <Suspense>
          <GoogleNoScript />
        </Suspense>
      </body>
    </html>
  );
}
