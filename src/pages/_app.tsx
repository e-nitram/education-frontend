import { ChakraBaseProvider, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { Suspense } from 'react';

import Layout from '@/components/Layout';

import { AppContextProvider } from '@/context/AppContext';

import ConsolidatedScripts from '@/scripts/ConsolidatedScripts';
import { primary } from '@/theme';

import './_app.css';

const theme = extendTheme(primary);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraBaseProvider theme={theme}>
      <AppContextProvider>
        <Layout>
          <Suspense>
            <ConsolidatedScripts />
          </Suspense>
          <Component {...pageProps} />
        </Layout>
      </AppContextProvider>
    </ChakraBaseProvider>
  );
}

export default MyApp;
