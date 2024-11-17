import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import { useContext } from 'react';

import Footer from '@/components/Footer';
import NewNavbar from '@/components/NewNav';

import { AppContext } from '@/context/AppContext';

import './globals.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { appTitle } = useContext(AppContext);

  return (
    <Box mx='auto' my='0'>
      <Head>
        <title>{appTitle}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <NewNavbar />
      <Box>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
