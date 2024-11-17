import { Box, Button, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import { startTransition, useContext, useEffect, useState } from 'react';

import InterestedProgramsCard from '@/components/interestedPrograms/Card';
import AOICard from '@/components/NewAOICard';

import { AppContext } from '@/context/AppContext';

import { interestedProgramsData } from '@/appConstants';
import { primary } from '@/theme';
import { IInterest, IResults } from '@/typings';

import fetchDataFrom from './api/fetchDataFrom';

const NotFound: NextPage = ({ interests }: any) => {
  const [, setError] = useState<Error | null>(null);
  const [interestsData, setInterestsData] = useState<IInterest>(
    interests?.data,
  );
  const [currentCount, setCurrentCount] = useState<number>(5);
  const [, setLoading] = useState<boolean>(false);
  const { deviceType } = useContext(AppContext);

  useEffect(() => {
    const sortedInterests = interests?.data?.sort(
      (a: { title: string }, b: { title: string }) =>
        a.title.localeCompare(b.title),
    );
    startTransition(() => setInterestsData(sortedInterests));
  }, [interests]);

  const seeMorHandler = () => {
    setLoading(true);
    setCurrentCount(currentCount + 5);

    fetchDataFrom(`pages/?headers_only=True&limit=5&offset=${currentCount}`)
      .then(async (heross) => {
        const data = await heross.json();
        const joined = data?.results?.concat(data?.results) as IResults[];
        setInterestsData({ ...interestsData, results: joined });
        setLoading(false);
      })
      .catch((err) => setError(err));
  };

  const { colors } = primary;
  return (
    <>
      <Box pos='relative' mt='50px' py='10px' className='primaryContainer'>
        <Box py={['68px', '68px', '64px', '64px']}>
          <Text
            fontFamily={primary.fonts.ED.primary}
            fontSize={primary.fontSizes.subHeader404}
            fontWeight='semibold'
            textAlign={['center', 'center', 'start', 'start']}
            lineHeight={primary.fontSizes.subHeader404LH}
          >
            404 ERROR
          </Text>
          <SimpleGrid
            columns={[1, 1, 2, 2]}
            h='100%'
            className='bg-white'
            spacing={50}
            alignItems='center'
            justifyItems={['center', 'center', 'end', 'end']}
          >
            <Box w='100%'>
              <Heading
                fontFamily={primary.fonts.ED.secondary}
                fontSize={primary.fontSizes.title404Font}
                fontWeight={['semibold', 'semibold', 'medium', 'medium']}
                color={colors.ED.primary}
                textAlign={['center', 'center', 'start', 'start']}
                lineHeight={primary.fontSizes.title404LH}
                pr={['0px', '0px', '20', '20']}
              >
                Feeling a bit lost? Let us help.
              </Heading>
            </Box>
            <Box>
              <SimpleGrid
                columns={[1, 1, 2, 2]}
                w='100%'
                spacing='26px'
                justifyItems='center'
              >
                <Box>
                  <Button
                    fontFamily={primary.fonts.ED.primary}
                    fontSize={primary.fontSizes.paragraphFont}
                    lineHeight={primary.fontSizes.paragraphLineHeight}
                    fontWeight='medium'
                    color={colors.ED.lotion}
                    bg='ED.secondary'
                    py='22px'
                    minH='64px'
                    minW='290px'
                    borderRadius='100px'
                    _hover={{ background: 'ED.secondary' }}
                    px='75px'
                  >
                    Discover Programs
                  </Button>
                </Box>
                <Box w='100%'>
                  <Button
                    fontFamily={primary.fonts.ED.primary}
                    fontSize={primary.fontSizes.paragraphFont}
                    fontWeight='medium'
                    color={colors.ED.lotion}
                    bg='ED.primary'
                    minH='64px'
                    py='22px'
                    minW='290px'
                    borderRadius='100px'
                    _hover={{ background: 'ED.primary' }}
                    px='75px'
                    lineHeight={primary.fontSizes.paragraphLineHeight}
                  >
                    Go Back Home {'>'}
                  </Button>
                </Box>
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      {/* Interested Programs Card */}
      <Box
        className='primaryContainer'
        bg={primary.colors.ED.brightGray}
        py='64px'
      >
        {interestedProgramsData?.map((item, i) => (
          <InterestedProgramsCard key={i} item={item} number={i} />
        ))}
      </Box>

      {/* Area of interests  */}
      <Box
        pt={['68px', '68px', '64px', '64px']}
        pb={primary.home.aoiCards.pb}
        bg={[
          primary.colors.ED.secondary,
          primary.colors.ED.secondary,
          primary.colors.ED.secondary,
          primary.colors.ED.secondary,
        ]}
        id='area-of-intrest'
      >
        <AOICard
          header={false}
          data={interests?.data}
          device={deviceType}
          onClick={seeMorHandler}
          currentCount={currentCount}
        />
      </Box>
    </>
  );
};

export default NotFound;

export const getStaticProps: GetStaticProps = async () => {
  const interests = await fetchDataFrom('pages/?headers_only=True').then(
    async (heros) => {
      const heroResponse = await heros.json();
      const pages = heroResponse?.results?.map((item: IResults) => {
        return {
          slug: item.slug,
          title: item.hero_heading,
          text: item.hero_text,
          image: item.hero_image,
        };
      });
      return {
        response: heroResponse,
        data: pages,
      };
    },
  );

  return {
    props: {
      interests,
    },
    revalidate: 20, // In seconds
  };
};
