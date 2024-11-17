import { Box, Stack, Text } from '@chakra-ui/react';
import { startTransition, Suspense, useContext, useEffect } from 'react';

import ClicksBannner from '@/components/ClicksBanner';
import Five from '@/components/GetStarted/Five';
import Four from '@/components/GetStarted/Four';
import One from '@/components/GetStarted/One';
import Six from '@/components/GetStarted/Six';
import Three from '@/components/GetStarted/Three';
import Two from '@/components/GetStarted/Two';
import ProgressBar from '@/components/Progress';
import CustomProgressBar from '@/components/ProgressBar';
import Step from '@/components/Step';

import { AppContext } from '@/context/AppContext';

import { howItWorksData } from '@/appConstants';
import { getMAOInternal, Offer } from '@/pages/api/getMAO';
import { getLeadById } from '@/pages/api/leads/leadById';

type IProps = {
  offers: Offer[];
};

export default function GetStarted({ offers }: IProps): JSX.Element {
  const {
    updateNavType,
    stepsData,
    setStepsData,
    updateShowSubNav,
    deviceType,
  } = useContext(AppContext);

  useEffect(() => {
    startTransition(() => {
      updateNavType('primary');
      updateShowSubNav(false);
    });
  }, [updateNavType, updateShowSubNav]);

  useEffect(() => {
    async function checkLead() {
      try {
        const leadId = document.cookie
          .split('; ')
          .find((row) => row.startsWith('leadId='))
          ?.split('=')[1];

        if (null != leadId) {
          const leadData = await getLeadById(+leadId);
          startTransition(() => {
            setStepsData({
              ...stepsData,
              first_name: leadData?.profile?.first_name ?? '',
              last_name: leadData?.profile?.last_name ?? '',
              email: leadData?.profile?.email ?? '',
              phone: leadData?.profile?.phone_primary ?? '',
              address_line1: leadData?.address?.address_line_one ?? '',
              city: leadData?.address?.city ?? '',
              state: leadData?.address?.state ?? '',
              zip_code: leadData?.address?.zip_code ?? '',
            });
          });
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('ERROR: Failed to request lead data from get-started', e);
      }
    }

    checkLead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<></>}>
      <Box
        bg={['ED.light', 'ED.lotion', 'ED.lotion', 'ED.lotion']}
        pt={['60px', '82px', '80px', '100px']}
        minH={['calc(100dvh + 120px)', '100dvh', '100dvh', '100dvh']}
      >
        {deviceType == 'Mobile' ? (
          <Box pos='relative'>
            <Box
              pos={['fixed', 'fixed', 'relative', 'relative']}
              zIndex={90}
              w='100%'
              bg='ED.white'
              px='40px'
              pt='16px'
              pb='3px'
            >
              <Text
                color='ED.primary'
                fontFamily='IBM Plex Sans'
                fontSize='14px'
                lineHeight='26px'
                fontWeight='600'
                textAlign='center'
                // pb='10px'
              >
                YOUR PROGRESS
              </Text>
              <CustomProgressBar
                height={16}
                width={((stepsData.current - 1) / 6) * 100}
                color='#2541b2'
                type='primary'
              />
            </Box>
          </Box>
        ) : (
          <Box pt={['0px', '0px', '55px', '72px']}>
            <ProgressBar width={((stepsData.current - 1) / 6) * 100} />
          </Box>
        )}
        <form>
          {stepsData.current === 1 && <One />}
          {stepsData.current === 2 && <Two />}
          {stepsData.current === 3 && <Three />}
          {stepsData.current === 4 && <Four />}
          {stepsData.current === 5 && <Five />}
          {stepsData.current === 6 && <Six />}
          <input
            id='leadid_token'
            name='universal_leadid'
            type='hidden'
            value=''
          />
        </form>
      </Box>

      {/* Logos Section */}
      <Box className='logos' pos='relative'>
        <ClicksBannner items={offers} />
      </Box>

      {/* How it works section */}
      <Stack className='step_wrapper' id='how-it-works'>
        <Box>
          <Text
            align='center'
            color='ED.fontColorPrimary'
            fontFamily='IBM Plex Serif'
            fontSize='6xl'
            fontWeight='600'
          >
            How it works
          </Text>
          <Box className='child_wrapper'>
            {howItWorksData?.map(({ id, content, icon, stepNumber }) => (
              <Step
                key={id}
                stepNumber={stepNumber}
                content={content}
                icon={icon}
              />
            ))}
          </Box>
        </Box>
      </Stack>
    </Suspense>
  );
}

export async function getStaticProps() {
  try {
    const offersData = await getMAOInternal();
    const offers = offersData?.items.slice(0, 6);

    return {
      props: {
        offers,
      },
      revalidate: 10,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to load MAO data ', err);
    return {
      props: {
        offers: [],
      },
    };
  }
}
