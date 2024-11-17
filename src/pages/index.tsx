import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  startTransition,
  Suspense,
  useContext,
  useEffect,
  useState,
} from 'react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Checkbox from '@/components/Checkbox';
import ClicksBannner from '@/components/ClicksBanner';
import Loading from '@/components/Loading';
import AOICard from '@/components/NewAOICard';
import NewBanner from '@/components/NewBanner';
import Step from '@/components/Step';

import { AppContext } from '@/context/AppContext';

import {
  APP_DATA,
  howItWorksData,
  Image_Quality,
  stepOne,
} from '@/appConstants';
import scholarshipSvg from '@/assets/icons/scholarship.svg';
import starSvg from '@/assets/icons/star.svg';
import { getMAOInternal, Offer } from '@/pages/api/getMAO';
import { primary } from '@/theme';
import { IHero, IHomePage, IInterest, IResults } from '@/typings';

import fetchDataFrom from './api/fetchDataFrom';
import Select from '../components/Select';

import style from './index.module.css';

const { edu_star_icon } = style;

type IProps = {
  homePage: IHomePage;
  hero: IHero;
  interests: IInterest;
  error: null | string;
  pageData: any;
  ip: string;
  offers: Offer[];
};

const Home: NextPage<IProps> = ({ interests, pageData, hero, offers }) => {
  const {
    updateAppTitle,
    stepsData,
    setStepsData,
    updateShowSubNav,
    programSlug,
    updateNavType,
    deviceType,
  } = useContext(AppContext);
  const [interestsData, setInterestsData] = useState<IInterest>(interests);
  const [error, setError] = useState<Error | null>(null);
  const [currentCount, setCurrentCount] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [logoAndQoute, setLogoAndQoute] = useState({} as any);
  const [heroBanner, setHeroBanner] = useState<IHero>();
  const [, setIsHeightExceeded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const limit = width < 1920 ? 600 : 750; // Adjust the limit as needed

      startTransition(() => {
        setIsHeightExceeded(height > limit);
      });
    };

    handleResize(); // Initial measurement

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    startTransition(() => {
      updateNavType('primary');
      updateShowSubNav(false);
      updateAppTitle('Education Directory Home Page');
      setLogoAndQoute(pageData);
    });
  }, [pageData, updateAppTitle, updateShowSubNav, updateNavType]);

  useEffect(() => {
    startTransition(() => {
      setHeroBanner(hero);
    });
  }, [hero]);

  const [isMobile] = useMediaQuery(`(max-width: ${primary.breakpoints[1]})`);

  const seeMorHandler = () => {
    setLoading(true);
    setCurrentCount(currentCount + 5);

    fetchDataFrom(`pages/?headers_only=True&limit=5&offset=${currentCount}`)
      .then(async (heross) => {
        const data = await heross.json();
        const joined = interests?.results?.concat(data?.results) as IResults[];
        if (interestsData.results?.length !== 0)
          setInterestsData({ ...interestsData, results: joined });
        setLoading(false);
      })
      .catch((err) => setError(err));
  };
  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }
  const { fontSizes, home, fonts } = primary;
  const step = stepsData.online_or_campus.length > 0 ? 2 : 1;
  return (
    <Suspense fallback={<></>}>
      <Stack pt={['60px', '60px', '80px', '80px']} id='why-education-directory'>
        <Box>
          <NewBanner
            isVideo={heroBanner?.hero_video !== null ? true : false}
            isParallax={false}
            src={heroBanner?.hero_video ?? heroBanner?.hero_image?.asset}
            height={[
              '100dvh',
              '100dvh',
              'calc(100dvh - 180px)',
              'calc(100dvh - 180px)',
            ]}
          >
            {isMobile ? (
              <Box
                pos='absolute'
                display='flex'
                justifyContent='space-between'
                zIndex='10'
                w='inherit'
                alignItems='center'
                h='100%'
                overflowY='auto'
              >
                <SimpleGrid
                  columns={1}
                  gap={[10, 30, 50, 50]}
                  justifyItems='center'
                  className='primaryContainer'
                >
                  <Box>
                    <Box>
                      <Text
                        color='ED.fontColorWhite'
                        fontFamily='ED.secondary'
                        fontSize='48px'
                        fontWeight='500'
                        lineHeight={primary.fontSizes.headingsLH}
                        className='text-center-sm'
                      >
                        {heroBanner?.hero_heading}
                      </Text>
                    </Box>
                  </Box>
                  <Box w='100%'>
                    <Stack left='0' right='0' bottom='42px'>
                      <Box w='100%' m='0 auto 16px'>
                        <Select
                          h='48px'
                          icon={scholarshipSvg}
                          placeholder='Online or on Campus'
                          selectedOptions={{
                            title:
                              stepOne.options?.find(
                                (opt) =>
                                  opt.value == stepsData.online_or_campus,
                              )?.title ?? '',
                          }}
                          options={stepOne.options}
                          onSelect={({ value }) =>
                            setStepsData({
                              ...stepsData,
                              online_or_campus: value,
                            })
                          }
                        />
                      </Box>
                      <Box w='100%' m='0 auto 0px auto !important'>
                        <a href='/get-started' target='_blank'>
                          <Button
                            bg='ED.secondary'
                            color='ED.white'
                            borderRadius='26'
                            h='52px'
                            fontSize={home.hero.card.btnFont}
                            lineHeight={home.hero.card.btnLH}
                            className='btn-secondry'
                            fontWeight='semibold'
                            fontFamily='IBM Plex Sans'
                            _hover={{ background: 'ED.secondary' }}
                            onClick={() => {
                              setLoading(true);
                              setStepsData({ ...stepsData, current: step });
                              setTimeout(function () {
                                window.location.href = `${APP_DATA.URL}/clicks`;
                              }, 2000);
                              setLoading(false);
                            }}
                          >
                            Get Started
                          </Button>
                        </a>
                      </Box>
                      <Text
                        align='center'
                        color='ED.white'
                        fontFamily='IBM Plex Sans'
                        fontSize='12px'
                        lineHeight='22px'
                        fontWeight='normal'
                        mt='16px'
                      >
                        Usually takes less than 3 minutes to get results
                      </Text>
                    </Stack>
                  </Box>
                </SimpleGrid>
              </Box>
            ) : (
              <>
                <Box
                  pos='absolute'
                  display='flex'
                  justifyContent='space-between'
                  zIndex='1'
                  w='inherit'
                  alignItems='center'
                  h={['100%', '100%', '100%', '100%']}
                >
                  <SimpleGrid
                    columns={[1, 1, 2, 2, 2]}
                    gap={50}
                    className='primaryContainer'
                    h='100%'
                    overflowY='auto'
                  >
                    <Box m='auto'>
                      <Text
                        color='ED.fontColorWhite'
                        fontFamily={primary.fonts.ED.secondary}
                        lineHeight={primary.fontSizes.headingsLH}
                        fontWeight='medium'
                        fontSize={primary.fontSizes.titleFonts}
                      >
                        {heroBanner?.hero_heading}
                      </Text>
                      <Text
                        fontSize={primary.fontSizes.paragraphFont}
                        fontWeight='normal'
                        lineHeight={primary.fontSizes.paragraphLineHeight}
                        fontFamily='ED.primary'
                        color='ED.fontColorLight'
                        pt={['26px', '26px', '26px', '42px']}
                        className='hide-sm'
                      >
                        {heroBanner?.hero_text + '*'}
                      </Text>
                    </Box>
                    <Box
                      ml={['0', '0', 'auto', 'auto']}
                      my='auto'
                      className='hide-sm'
                    >
                      <Box w={primary.cardSizes.w}>
                        <Card>
                          <Box pt={home.hero.card.pt} pb={home.hero.card.pb}>
                            <Text
                              fontSize={primary.fontSizes.subheaderFont}
                              fontWeight='semibold'
                              align='center'
                              color='ED.fontColorPrimary'
                              lineHeight={primary.fontSizes.subheaderLH}
                              fontFamily={primary.fonts.ED.primary}
                              pb={home.hero.card.contentPB}
                            >
                              {stepOne.heading}
                            </Text>
                            {stepOne.options.map((item, i) => (
                              <Box
                                key={`stepOne-options${i}`}
                                maxW={home.hero.card.optionsW}
                                m='auto'
                                h='100%'
                                pt={i > 0 ? '16px' : '0px'}
                              >
                                <Checkbox
                                  color={primary.colors.ED.primary}
                                  clickHandler={() =>
                                    setStepsData({
                                      ...stepsData,
                                      online_or_campus: item.value,
                                    })
                                  }
                                  h={home.hero.card.optionBoxH}
                                  name={item.title}
                                  icon={item.icon}
                                  checked={
                                    stepsData.online_or_campus === item.value
                                      ? true
                                      : false
                                  }
                                />
                              </Box>
                            ))}
                            <Box
                              m='auto'
                              maxW={home.hero.card.btnBoxW}
                              pt={home.hero.card.btnBoxPT}
                            >
                              <a
                                data-testid='get-Btn'
                                target='_blank'
                                href='/get-started'
                              >
                                <Button
                                  data-testid='get-started-btn'
                                  bg='ED.secondary'
                                  color='ED.white'
                                  borderRadius='50'
                                  minH={home.hero.card.btnH}
                                  w='100%'
                                  fontSize={fontSizes.btnFont}
                                  lineHeight={fontSizes.btnLH}
                                  fontFamily='IBM Plex Sans'
                                  className={` ${
                                    loading ? 'cursor-disabled' : ''
                                  } `}
                                  _hover={{ background: 'ED.secondary' }}
                                  onClick={() => {
                                    setLoading(true);
                                    setStepsData({
                                      ...stepsData,
                                      current: step,
                                    });
                                    setTimeout(function () {
                                      window.location.href = `${APP_DATA.URL}/clicks`;
                                    }, 2000);
                                    setLoading(false);
                                  }}
                                >
                                  {loading ? (
                                    <Loading height='32px' color='white' />
                                  ) : (
                                    'Get Started'
                                  )}
                                </Button>
                              </a>
                            </Box>
                            <Text
                              pt={home.hero.card.smallTextPT}
                              align='center'
                              color='ED.fontColorDark'
                              fontWeight='normal'
                              fontFamily={primary.fonts.ED.primary}
                              fontSize={primary.fontSizes.smallText}
                            >
                              Usually takes less than 3 minutes to get results
                            </Text>
                          </Box>
                        </Card>
                      </Box>
                    </Box>
                  </SimpleGrid>
                </Box>
              </>
            )}
          </NewBanner>
        </Box>
        <Box bg='ED.white' mt='0 !important' pos='relative'>
          {/* Offer Banner Section */}
          <ClicksBannner items={offers} />
          {/* How it works section */}
          <Stack
            bg='ED.lotion'
            pt={home.howItWorks.pt}
            pb={home.howItWorks.pb}
            id='how-it-works'
            align='center'
            justify='center'
          >
            <Box>
              <Heading
                textAlign='center'
                color='ED.fontColorPrimary'
                fontFamily={fonts.ED.secondary}
                fontSize={fontSizes.fixedtitleFont}
                lineHeight={fontSizes.fixedtitleLH}
                fontWeight='medium'
              >
                How it works
              </Heading>
              <Flex
                className='primaryContainer'
                flexBasis='30%'
                alignItems='center'
                flexWrap='wrap'
                justifyContent='space-evenly'
              >
                {howItWorksData?.map(
                  ({ content, icon, stepNumber, width, height }, i) => (
                    <Step
                      key={`HIW-${i}`}
                      stepNumber={stepNumber}
                      content={content}
                      width={width}
                      height={height}
                      icon={icon}
                    />
                  ),
                )}
              </Flex>
            </Box>
          </Stack>
          {/* Quote Banner Section */}
          {stepsData.current == 1 || stepsData.current == 0 ? (
            <Box mb='0'>
              <NewBanner
                isVideo={logoAndQoute?.quote_video == null ? false : true}
                isParallax={false}
                type='quote'
                height='calc(100dvh - 60px)'
                src={
                  logoAndQoute?.quote_video == null
                    ? logoAndQoute?.quote_bg_image?.asset
                    : logoAndQoute?.quote_video
                }
              >
                <Stack pos='relative' className='quote__child__wrapper z-10'>
                  <Box
                    maxW='386px'
                    textAlign='center'
                    className='quote__content'
                  >
                    <Flex gap='5px' alignItems='center' justifyContent='center'>
                      {[0, 1, 2, 3, 4]?.map((star, i) => (
                        <Image
                          key={`edu-${i}`}
                          loading='lazy'
                          quality={Image_Quality}
                          src={starSvg}
                          alt={`edu-${star}`}
                          style={{ display: 'inline-block' }}
                          className={edu_star_icon}
                        />
                      ))}
                    </Flex>
                    <Text
                      fontSize='36px'
                      color='ED.fontColorLight'
                      fontFamily='IBM Plex Sans'
                      align='center'
                      fontWeight='600'
                      lineHeight='46px'
                      pt={primary.home.quoteBanner.titlePT}
                      pb={primary.home.quoteBanner.titlePB}
                    >
                      <q>{logoAndQoute?.quote_text}</q>
                    </Text>
                    <a href='/get-started' target='_blank'>
                      <Button
                        bg='ED.secondary'
                        color='ED.white'
                        borderRadius='26'
                        boxShadow='3px 3px 15px #00000050'
                        minH='52px'
                        w='290px'
                        className='btn-secondry'
                        fontSize='22px'
                        lineHeight='30px'
                        fontWeight='semibold'
                        fontFamily='IBM Plex Sans'
                        _hover={{ background: 'ED.secondary' }}
                        // onClick={() => openInNewTab('/get-started')}
                      >
                        Get Started
                      </Button>
                    </a>
                  </Box>
                </Stack>
              </NewBanner>
            </Box>
          ) : null}
          {stepsData.current == 1 || stepsData.current == 0 ? (
            <Box
              pt={primary.home.aoiCards.pt}
              pb={primary.home.aoiCards.pb}
              bg={[
                primary.colors.ED.light,
                primary.colors.ED.light,
                primary.colors.ED.lotion,
                primary.colors.ED.lotion,
              ]}
              id='area-of-intrest'
            >
              <AOICard
                header={true}
                headerTitle='Areas of Interest'
                loading={loading}
                data={programSlug}
                device={deviceType}
                onClick={seeMorHandler}
                currentCount={currentCount}
              />
            </Box>
          ) : null}
          {/** TODO: Add New Subjects Index */}
        </Box>
        <div className='flex flex-col justify-between bg-primary px-6 pt-4 font-sans font-sans text-xs text-lotion md:px-16 lg:px-20 xl:px-36'>
          <p>
            {' '}
            <sup>*</sup>
            Career Outlook: Education Pays, 2022", US Bureau of Labor and
            Statistics, 22 April 2024,
            <Link
              target='_blank'
              href='https://www.bls.gov/careeroutlook/2023/data-on-display/education-pays.htm'
            >
              https://www.bls.gov/careeroutlook/2023/data-on-display/education-pays.htm
            </Link>
          </p>
          <p>
            <sup>1</sup>
            "Occupational Outlook Handbook: Legal Occupations”, US Bureau of
            Labor and Statistics, 2 October 2023,
            <Link target='_blank' href='https://bls.gov/ooh/legal/home.htm'>
              https://bls.gov/ooh/legal/home.htm
            </Link>
          </p>
          <p>
            <sup>2</sup>“Occupational Outlook Handbook: Healthcare Occupations”,
            US Bureau of Labor and Statistics, 2 October 2023,
            <Link
              target='_blank'
              href='https://www.bls.gov/ooh/healthcare/home.htm'
            >
              https://www.bls.gov/ooh/healthcare/home.htm
            </Link>
          </p>
        </div>
      </Stack>
    </Suspense>
  );
};

export async function getStaticProps() {
  try {
    const interestsRes = await fetchDataFrom('pages/?headers_only=True');
    const interestsData: IInterest = await interestsRes.json();
    const interests = await interestsData?.results?.map((item: IResults) => {
      return {
        slug: item.slug,
        title: item.hero_heading,
        text: item.hero_text,
        image: item.hero_image,
      };
    });
    // Sort the data array by title
    const sortedData = interests.sort(
      (a: { title: string }, b: { title: string }) =>
        a.title.localeCompare(b.title),
    );
    const res = await fetchDataFrom('home/');
    const data = await res.json();
    const heroRes = await fetchDataFrom(`heros/${data[0]?.hero}/`);
    const heroData = await heroRes.json();
    const offersData = await getMAOInternal();
    const offers = offersData?.items.slice(0, 6);

    if (!res.ok) {
      throw new Error(`Failed to fetch pages, received status ${res?.status}`);
    }
    if (!heroRes.ok) {
      throw new Error(
        `Failed to fetch hero, received status ${heroRes?.status}`,
      );
    }

    return {
      props: {
        pageData: data[0],
        interests: sortedData,
        hero: heroData,
        error: null,
        offers: offers,
      },
      revalidate: 10, // In seconds
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to load AOIs ', error);
    return {
      props: {
        interests: [],
        pageData: null,
        heroData: null,
        offers: [],
      },
    };
  }
}

export default Home;
