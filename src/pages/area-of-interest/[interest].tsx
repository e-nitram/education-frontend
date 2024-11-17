import {
  Box,
  Container,
  Flex,
  Heading,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  startTransition,
  Suspense,
  useContext,
  useEffect,
  useState,
} from 'react';

import Card from '@/components/Card';
import Careers from '@/components/Careers';
import CoursesForm from '@/components/CourseCard';
import ProgramsForm from '@/components/Form';
import StepFiveForm from '@/components/Form/StepForm';
import ImageContainer from '@/components/imageContainer/imageContainer';
import Institutes from '@/components/Institutes';
import AOICard from '@/components/NewAOICard';
import NewBanner from '@/components/NewBanner';

import { AppContext } from '@/context/AppContext';

const ClicksBannner = dynamic(() => import('@/components/ClicksBanner'), {
  ssr: false,
});

import logoSvg from '@/assets/icons/logo.svg';
import { getMAOInternal, Offer } from '@/pages/api/getMAO';
import { primary } from '@/theme';
import { IHero, IInterest, IPage } from '@/typings';

import fetchDataFrom from '../api/fetchDataFrom';

import style from './index.module.css';

const { overview } = style;

type IProps = {
  interest: IPage;
  hero: IHero;
  error: string | null;
  offers: Offer[];
};

const Interest: NextPage<IProps> = ({
  interest,
  hero,
  error,
  offers,
}): JSX.Element => {
  const router = useRouter();
  const {
    updateAppTitle,
    updateNavType,
    updateShowSubNav,
    programSlug,
    deviceType,
  } = useContext(AppContext);
  const [interests, setInterests] = useState<IInterest>();
  const [heroState, setHeroState] = useState<IHero>();
  const [currentCount, setCurrentCount] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    startTransition(() => {
      updateNavType('secondry');
      updateShowSubNav(true);
    });
    fetchDataFrom('pages/?headers_only=True&limit=5').then(async (res) => {
      const data: IInterest = await res.json();
      startTransition(() => {
        setInterests(data);
      });
    });
  }, [updateNavType, updateShowSubNav]);

  useEffect(() => {
    startTransition(() => {
      setHeroState(hero);
      updateAppTitle(`${hero?.hero_heading} - Education Directory`);
    });

    // Unset state on unmounting
    () => {
      startTransition(() => {
        setHeroState(undefined);
      });
    };
  }, [hero, updateAppTitle]);

  const seeMorHandler = () => {
    setLoading(true);
    setCurrentCount(currentCount + 5);

    fetchDataFrom(
      `pages/?headers_only=True&limit=5&offset=${currentCount}`,
    ).then(async (heross) => {
      const data = await heross.json();
      const joined = interests?.results.concat(data?.results);
      if (joined && interests) setInterests({ ...interests, results: joined });
      setLoading(false);
    });
  };
  const { colors, fontSizes, fonts, layout, aoi, cardSizes } = primary;
  return (
    <Suspense fallback={<></>}>
      <Box w='100%' h='100%'>
        {error === null ? (
          <main className='lg:-[pt-120px] min-h-[100dvh] pt-[60px] md:pt-[50px]'>
            <NewBanner
              height='100dvh'
              isVideo={heroState?.hero_video != null ? true : false}
              isParallax
              src={heroState?.hero_video ?? heroState?.hero_image?.asset}
            >
              <div className='primaryContainer z-10 grid h-[calc(100vh-120px)] grid-cols-1 p-4 pt-10 lg:grid-cols-2'>
                <div className='center z-10 flex flex-col gap-4 lg:order-1'>
                  <h1 className='font-serif text-48 font-medium leading-tight text-white lg:text-xl'>
                    {hero?.hero_heading}
                  </h1>
                  <h2 className='hidden font-serif text-sm leading-tight text-white md:block'>
                    {hero?.hero_text}
                  </h2>
                </div>
                <div className='center z-10 lg:order-2'>
                  <ProgramsForm textColorBlack={false} />
                </div>
              </div>
            </NewBanner>

            <Box
              className='relative bg-lotion'
              zIndex={10}
              pt={primary.aoi.overview.pt}
            >
              {/* Overview Section */}
              <div id='overview'>
                <SimpleGrid
                  pb={aoi.overview.pb}
                  columns={[1, 1, 2, 2]}
                  justifyContent='space-between'
                  className='primaryContainer'
                  justifyItems={['center', 'center', 'flex-end', 'flex-end']}
                  spacing='42px'
                >
                  <Box>
                    <Text
                      color='ED.fontColorPrimary'
                      fontFamily={fonts.ED.secondary}
                      fontSize={fontSizes.titleFonts}
                      fontWeight='medium'
                      lineHeight={fontSizes.headingsLH}
                    >
                      {interest?.overview_heading}
                    </Text>
                    {interest?.overview_text
                      ?.split(/\n/)
                      ?.map((str: string, id: number) =>
                        str.length > 0 ? (
                          <Text
                            key={`o-l-${id}`}
                            fontSize='16px'
                            pt={aoi.overview.textPt}
                            fontFamily={fonts.ED.primary}
                            fontWeight='normal'
                            color={primary.colors.ED.dark}
                            lineHeight='26px'
                          >
                            {str}
                          </Text>
                        ) : null,
                      )}
                  </Box>
                  <Box w={['100%', '100%', 'auto', 'auto']}>
                    <Box w={aoi.overview.card.w}>
                      <Card>
                        <Box py={aoi.overview.card.py}>
                          <Heading
                            fontFamily={fonts.ED.primary}
                            fontSize={aoi.overview.card.titleFont}
                            lineHeight={aoi.overview.card.titleLH}
                            fontWeight='semibold'
                            className='h4 text-center text-primary'
                          >
                            {programSlug?.find(
                              (p) => p.slug === router.query.interest,
                            )?.title + ' Courses'}
                          </Heading>
                          <CoursesForm />
                        </Box>
                      </Card>
                    </Box>
                    <Flex m='0 auto' pt='53px' justify='center'>
                      <Image
                        src={logoSvg}
                        width='0'
                        height='0'
                        loading='lazy'
                        alt='edu-logo'
                      />
                    </Flex>
                  </Box>
                </SimpleGrid>

                <ClicksBannner items={offers} />
              </div>

              {/* Degrees section */}
              <Box pt={primary.aoi.degrees.pt} id='degrees'>
                <Flex
                  className={`primaryContainer ${overview}`}
                  justify='center'
                  alignItems='center'
                  justifyContent='space-between'
                  columnGap='8'
                >
                  <Box className='col pr-3'>
                    <Heading
                      color='ED.fontColorPrimary'
                      fontFamily={primary.fonts.ED.secondary}
                      fontSize={primary.fontSizes.titleFonts}
                      fontWeight='medium'
                      lineHeight={primary.fontSizes.headingsLH}
                    >
                      {interest?.degrees_can_study_heading
                        .split('&')
                        ?.map((str: string, i: number) => (
                          <>
                            {str}
                            {i == 0 &&
                              interest?.degrees_can_study_heading.includes(
                                '&',
                              ) &&
                              '&'}{' '}
                            <br />
                          </>
                        ))}
                    </Heading>
                    <Text
                      pt={['26px', '26px', '16px', '26px']}
                      fontFamily={primary.fonts.ED.primary}
                      fontSize='16px'
                      color={primary.colors.ED.dark}
                      fontWeight='normal'
                      lineHeight='26px'
                    >
                      {interest?.degrees_can_study_text}
                    </Text>
                    <Box className='text-base' pt='26px'>
                      <Text
                        fontFamily={primary.fonts.ED.primary}
                        fontSize='16px'
                        color={primary.colors.ED.dark}
                        fontWeight='normal'
                        pt='16px'
                        lineHeight='26px'
                      >
                        Some example degrees include:
                      </Text>
                      <UnorderedList>
                        {interest?.degrees_list
                          .split(/;/)
                          ?.map((str: string, id: number) =>
                            str.length > 0 ? (
                              <ListItem
                                key={`str + ${id}`}
                                fontFamily={primary.fonts.ED.primary}
                                fontSize='16px'
                                color={primary.colors.ED.primary}
                                fontWeight='normal'
                                lineHeight='26px'
                                mt='16px'
                              >
                                {str}
                              </ListItem>
                            ) : null,
                          )}
                      </UnorderedList>
                    </Box>
                  </Box>
                  <Box className='col' pos='relative'>
                    <ImageContainer imageUrl={interest?.degrees_image.asset} />
                    <Text
                      pt='16px'
                      fontSize='14px'
                      float='right'
                      lineHeight='26px'
                      fontWeight='normal'
                      fontFamily={primary.fonts.ED.primary}
                    >
                      {/* {interest?.degrees_image.name} */}
                    </Text>
                  </Box>
                </Flex>
              </Box>

              {/* Requirements section */}
              <Box minH='768px' id='requirements' pt={aoi.requirements.pt}>
                <Flex
                  className={`primaryContainer ${overview}`}
                  justify='center'
                  justifyContent='space-between'
                  alignItems='center'
                  flexDir='row-reverse'
                  columnGap='8'
                >
                  <div className='col pr-3'>
                    <Heading
                      color='ED.fontColorPrimary'
                      fontFamily={fonts.ED.secondary}
                      fontSize={fontSizes.titleFonts}
                      fontWeight='medium'
                      lineHeight={fontSizes.headingsLH}
                    >
                      {interest?.requirements_heading}
                    </Heading>
                    <Text
                      pt={aoi.degrees.descPT}
                      fontFamily={fonts.ED.primary}
                      fontSize='16px'
                      color={colors.ED.dark}
                      fontWeight='normal'
                      lineHeight='26px'
                    >
                      {interest?.requirements_text}
                    </Text>
                    <Box className='text-base' pt='16px'>
                      <UnorderedList pt='16px'>
                        {interest?.requirements_list
                          .split(/;/)
                          ?.map((str: string, id: number) =>
                            str.length > 0 ? (
                              <ListItem
                                key={`req-l-${id}`}
                                fontFamily={fonts.ED.primary}
                                fontSize='16px'
                                color={colors.ED.primary}
                                fontWeight='normal'
                                lineHeight='26px'
                                mt='16px'
                              >
                                {str}
                              </ListItem>
                            ) : null,
                          )}
                      </UnorderedList>
                    </Box>
                  </div>
                  <div className=' col'>
                    <ImageContainer
                      imageUrl={interest?.requirements_image.asset}
                    />

                    <Text
                      pt='16px'
                      fontSize='14px'
                      lineHeight='26px'
                      fontWeight='normal'
                      fontFamily={primary.fonts.ED.primary}
                    >
                      {/* {interest?.requirements_image.name} */}
                    </Text>
                  </div>
                </Flex>
              </Box>

              {/* Experience section */}
              <Box
                minH='768px'
                pt={aoi.experience.pt}
                pb={aoi.experience.pb}
                id='experience'
              >
                <Flex
                  className={`primaryContainer ${overview}`}
                  justify='center'
                  justifyContent='space-between'
                  alignItems='center'
                  columnGap='8'
                >
                  <Box w={layout.sectionW} columnGap={8} className='col'>
                    <Heading
                      color='ED.fontColorPrimary'
                      fontFamily={primary.fonts.ED.secondary}
                      fontSize={primary.fontSizes.titleFonts}
                      fontWeight='medium'
                      lineHeight={fontSizes.headingsLH}
                    >
                      {interest?.experience_heading}
                    </Heading>
                    <Text
                      pt='26px'
                      fontFamily={primary.fonts.ED.primary}
                      fontSize='16px'
                      color={primary.colors.ED.dark}
                      fontWeight='normal'
                      lineHeight='26px'
                    >
                      {interest?.experience_text}
                    </Text>
                    <div className='pt-3 text-base'>
                      <UnorderedList className='pt-3'>
                        {interest?.experience_list
                          .split(/;\r?\n/)
                          ?.map((str: string, id: number) =>
                            str.length > 0 ? (
                              <ListItem
                                key={`exp-l-${id}`}
                                fontFamily={primary.fonts.ED.primary}
                                fontSize='16px'
                                color={primary.colors.ED.primary}
                                fontWeight='normal'
                                lineHeight='26px'
                                mt='16px'
                              >
                                {str}
                              </ListItem>
                            ) : null,
                          )}
                      </UnorderedList>
                    </div>
                  </Box>
                  <Box className='col'>
                    <ImageContainer
                      imageUrl={interest?.experience_image?.asset}
                    />
                    <Text
                      className='text-sm'
                      pt='16px'
                      fontSize='14px'
                      lineHeight='26px'
                      fontWeight='normal'
                      fontFamily={primary.fonts.ED.primary}
                    >
                      {/* {interest?.experience_image?.name} */}
                    </Text>
                  </Box>
                </Flex>
              </Box>

              {/* Find Degree Program */}
              <Box
                alignContent='center'
                py={aoi.degreeProgram.pt}
                justifyContent='center'
                className='bg-white'
              >
                <Flex align='center' justify='center'>
                  <div>
                    <div className='degree__program'>
                      <Text
                        color='ED.fontColorPrimary'
                        fontFamily={fonts.ED.secondary}
                        fontSize={fontSizes.titleFonts}
                        fontWeight='medium'
                        lineHeight={fontSizes.headingsLH}
                        className='text-center'
                      >
                        Find your degree program today
                      </Text>
                      <Box mt='42px' w={cardSizes.w}>
                        <Card>
                          <Box py={aoi.overview.card.py}>
                            <Heading
                              fontFamily={fonts.ED.primary}
                              fontSize={aoi.overview.card.titleFont}
                              lineHeight={aoi.overview.card.titleLH}
                              fontWeight='semibold'
                              className='h4 text-center text-primary'
                            >
                              {programSlug?.find(
                                (p) => p.slug === router.query.interest,
                              )?.title + ' Courses'}
                            </Heading>
                            <CoursesForm />
                          </Box>
                        </Card>
                      </Box>
                    </div>
                  </div>
                </Flex>
              </Box>

              {/* Careers section */}
              <Careers
                careers_first_sub_heading={interest?.careers_first_sub_heading}
                careers_first_sub_heading_text={
                  interest?.careers_first_sub_heading_text
                }
                careers_heading={interest?.careers_heading}
                careers_list={interest?.careers_list}
                careers_second_sub_heading={
                  interest?.careers_second_sub_heading
                }
                careers_second_sub_heading_text={
                  interest?.careers_second_sub_heading_text
                }
                careers_text={interest?.careers_text}
              />

              {/* Quote Banner Section */}
              <Box>
                <NewBanner
                  isVideo={interest?.quote_video != null ? true : false}
                  isParallax={false}
                  type='quote'
                  src={
                    interest?.quote_video != null
                      ? interest.quote_video
                      : interest?.quote_bg_image?.asset?.length > 0
                        ? interest.quote_bg_image.asset
                        : ''
                  }
                  height='calc(100dvh - 60px)'
                >
                  <Box
                    pos='absolute'
                    top='0'
                    zIndex='10'
                    className='quote__child__wrapper'
                  >
                    <Container maxW={primary.breakpoints[3]}>
                      <div className='w-50'>
                        <Heading
                          fontFamily={fonts.ED.primary}
                          fontSize='36px'
                          lineHeight='46px'
                          fontWeight='semibold'
                          className='h3 text-center text-light'
                        >
                          {interest?.quote_text}
                        </Heading>
                        <Box
                          className='center'
                          pt={['16px', '16px', '16px', '26px']}
                        >
                          <p className='text-sm text-white'>
                            {interest?.quote_footer}
                          </p>
                        </Box>
                      </div>
                    </Container>
                  </Box>
                </NewBanner>
              </Box>

              <div id='get-started'>
                <Box
                  className='bg-white'
                  py={['68px', '68px', '151px', '180px']}
                >
                  <div className='container'>
                    <div className='degree__program'>
                      <Text
                        color='ED.fontColorPrimary'
                        fontFamily='IBM Plex Serif'
                        fontSize={`${
                          ['Mobile', 'Tablet'].includes(deviceType)
                            ? '4xl'
                            : '6xl'
                        }`}
                        fontWeight={`${
                          ['Mobile', 'Tablet'].includes(deviceType)
                            ? '600'
                            : '500'
                        }`}
                        className='text-center'
                      >
                        Take your first step
                      </Text>
                      <StepFiveForm />
                    </div>
                  </div>
                </Box>
              </div>

              {/* Area of interests */}
              <Box
                className='bg-lotion'
                id='area-of-interest'
                my={['68px', '68px', '110px', '110px']}
              >
                <AOICard
                  header={true}
                  headerTitle='Areas of Interest'
                  loading={loading}
                  data={programSlug}
                  // data={allPrograms}
                  device={deviceType}
                  onClick={seeMorHandler}
                  currentCount={currentCount}
                />
              </Box>
              <br />
              {/* Instituates */}
              <Box
                className='bg-lotion'
                py={primary.aoi.degrees.mt}
                bg={primary.colors.ED.light}
              >
                <Institutes />
              </Box>

              {/* Footer section */}
              {/* <Footer areaOfInterest={interests} /> */}
            </Box>
          </main>
        ) : (
          <Box
            className='primaryContainer'
            pt={['60px', '60px', '120px', '120px']}
          >
            Sorry, that Area of Interest cannot be found.
          </Box>
        )}
      </Box>
    </Suspense>
  );
};

type IParams = {
  params: {
    interest: string;
  };
};

export async function getStaticProps({ params }: IParams) {
  try {
    const { interest } = params;

    const res = await fetchDataFrom(`pages/${interest}/`);
    const data = await res.json();

    const heroRes = await fetchDataFrom(`heros/${data?.hero}/`);
    const heroData = await heroRes.json();

    const offersData = await getMAOInternal();
    const offers = offersData?.items.slice(0, 6);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch pages, received status ${res?.statusText}`,
        { cause: interest },
      );
    }

    if (!heroRes.ok) {
      throw new Error(
        `Failed to fetch hero, received status ${heroRes?.status},`,
        { cause: heroRes },
      );
    }

    return {
      props: {
        interest: data,
        hero: heroData,
        error: null,
        offers: offers,
      },
      revalidate: 10, // In seconds
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to load Area ', err);
    return {
      props: {
        // error: `message: ${error.message}, cause: ${error.cause}`,
        offers: [],
      },
    };
  }
}

export async function getStaticPaths() {
  const res = await fetchDataFrom('pages/');
  const interests = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = await interests?.results?.map((interest: { slug: string }) => ({
    params: { interest: interest?.slug },
  }));

  return { paths, fallback: 'blocking' };
}

export default Interest;
