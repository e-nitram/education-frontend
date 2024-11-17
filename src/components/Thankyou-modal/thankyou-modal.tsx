import {
  Box,
  Button,
  Heading,
  Hide,
  Icon,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalContent,
  ModalOverlay,
  Show,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

import Banner from '@/components/Banner';
import Card from '@/components/Card';

import { AppContext } from '@/context/AppContext';

import { submitRevenue } from '@/app/_modules/lead';
import { Callback } from '@/app/_objects/callback';
import locationIcon from '@/assets/icons/locationIcon.svg';
import Right from '@/assets/icons/right.png';
import banner from '@/assets/images/thankyou_banner.png';
import {
  getMAOBanners,
  getMAOExternal,
  getMAOOther,
  IMAOParams,
} from '@/pages/api/getMAO';
import { primary } from '@/theme';

interface Offer {
  brandName: string;
  blurbs: string[];
  imageUrl: string;
  destUrl: string;
  impressionUrl: string;
  revenue: string;
}

const ThankYouModal = ({ onClose, isOpen }: any) => {
  const [offers, setOffers] = useState<Offer[]>();
  const [chunksItems, setChunksItems] = useState<any[]>([]);
  const { createCallback } = useContext(AppContext);

  useEffect(() => {
    const leadResData = localStorage.getItem('leadRes');
    const leadRes = null !== leadResData ? JSON.parse(leadResData) : null;
    const stepsStateData = localStorage.getItem('stepsState');
    const stepsState =
      null !== stepsStateData ? JSON.parse(stepsStateData) : null;
    const areasOfInterest: string[] = stepsState.areas_of_interest;

    // The below structure maps areas of interest/concentrations based on values selected within forms
    // TODO: restructure to define specific requirements for areas, force value-mapping at the using component-level
    const mappedAreasOfStudy: {
      AreaOfStudy: string;
      Concentration: string;
    }[] = areasOfInterest.map((interest: string) => {
      switch (interest) {
        case 'Law & Criminal Justice':
          return {
            AreaOfStudy: 'Criminal Justice & Law Enforcement',
            Concentration: 'Criminal Justice & Law Enforcement',
          };
        case 'Criminal Justice & Legal':
          return {
            AreaOfStudy: 'Criminal Justice & Law Enforcement',
            Concentration: 'Criminal Justice & Law Enforcement',
          };
        case 'Art & Design':
          return {
            AreaOfStudy: 'Arts / Design / Fashion',
            Concentration: 'Design & Visual Communications',
          };
        case 'Liberal Arts':
          return {
            AreaOfStudy: 'General Studies / Undecided',
            Concentration: 'Liberal Arts',
          };
        case 'Nursing & Healthcare':
          return {
            AreaOfStudy: 'Health & Medical / Nursing',
            Concentration: 'Nurse Education',
          };
        case 'Healthcare':
          return {
            AreaOfStudy: 'Health & Medical / Nursing',
            Concentration: 'Nurse Education',
          };
        case 'Nursing':
          return {
            AreaOfStudy: 'Health & Medical / Nursing',
            Concentration: 'Nurse Education',
          };
        case 'Business':
          return { AreaOfStudy: 'Business', Concentration: 'Business' };
        case 'Psychology & Counseling':
          return {
            AreaOfStudy: 'Psychology & Social Work',
            Concentration: 'Counseling Psychology',
          };
        case 'Psychology':
          return {
            AreaOfStudy: 'Psychology & Social Work',
            Concentration: 'Counseling Psychology',
          };
        case 'Science & Engineering':
          return {
            AreaOfStudy: 'Computers & IT',
            Concentration: 'Engineering',
          };
        case 'Computers & Technology':
          return {
            AreaOfStudy: 'Computers & IT',
            Concentration: 'Computer Science',
          };
        case 'Technology':
          return {
            AreaOfStudy: 'Computers & IT',
            Concentration: 'Computer Science',
          };
        case 'Trade & Vo-Tech':
          return {
            AreaOfStudy: 'Trades & Careers',
            Concentration: 'Construction Management',
          };
        case 'Trade and Vocational':
          return {
            AreaOfStudy: 'Trades & Careers',
            Concentration: 'Construction Management',
          };
        case 'Education & Teaching':
          return {
            AreaOfStudy: 'Education & Teaching',
            Concentration: 'Education and Teaching',
          };
        case 'Education & Liberal Arts':
          return {
            AreaOfStudy: 'Education & Teaching',
            Concentration: 'Education and Teaching',
          };
        case 'Hospitality & Culinary Arts':
          return {
            AreaOfStudy: 'Culinary Arts & Hospitality',
            Concentration: 'Culinary Arts',
          };
        default:
          return { AreaOfStudy: 'Business', Concentration: 'Business' };
      }
    });

    const params: IMAOParams = {
      Device: leadRes.session.device_type,
      ClientIP: leadRes.session.ip ?? '8.192.0.0',
      ZipCode: stepsState.zip_code,
      State: stepsState.state,
      AreaOfStudy: '',
      Concentration: '',
      DegreeLevel: 'BACHELORS',
      HighSchoolGradYear: stepsState.hsyear,
      HighestEducationLevel:
        stepsState.current_education_level === 'GED'
          ? 'GED'
          : stepsState.current_education_level === 'High School Diploma'
            ? 'HIGH_SCHOOL'
            : stepsState.current_education_level ===
                  'Some College 1-10 Credits' ||
                stepsState.current_education_level ===
                  'Some College 11-30 Credits' ||
                stepsState.current_education_level ===
                  'Some College 31-60 Credits' ||
                stepsState.current_education_level === 'Some College'
              ? 'SOME_COLLEGE'
              : stepsState.current_education_level === 'Associates'
                ? 'ASSOCIATES_DEGREE'
                : stepsState.current_education_level === 'Bachelors'
                  ? 'BACHELORS_DEGREE'
                  : stepsState.current_education_level === 'Masters'
                    ? 'MASTERS_DEGREE'
                    : stepsState.current_education_level === 'Doctoral'
                      ? 'DOCTORAL_DEGREE'
                      : 'HIGH_SCHOOL',
      LearningPreference:
        stepsState.learning_preference === 'Online'
          ? 'ONLINE'
          : ['Campus', 'On Campus'].includes(stepsState.learning_preference)
            ? 'CAMPUS'
            : 'BOTH',
      MilitaryStatus:
        stepsState.military.military_status === 'Yes' ||
        stepsState.military_status === 'Yes'
          ? 'true'
          : 'false',
      RNDegree: ['Yes', 'RN', 'LPN/LVN'].includes(stepsState.rn_license)
        ? 'true'
        : stepsState.rn_license === 'No'
          ? 'false'
          : 'null',
      StartDate:
        stepsState.preferred_enrollment === 'Immediately'
          ? 'LESS_THAN_1_MONTH'
          : stepsState.preferred_enrollment === '1 - 3 Months'
            ? '1_TO_3_MONTHS'
            : stepsState.preferred_enrollment === '3 - 6 Months'
              ? '3_TO_6_MONTHS'
              : 'LESS_THAN_1_MONTH',
      USCitizen:
        stepsState.us_citizen === 'Yes'
          ? 'true'
          : stepsState.us_citizen === 'No'
            ? 'false'
            : 'null',
      City: stepsState.city,
    };

    async function fetchData() {
      try {
        const externalResults: Offer[] = [];
        const bannerResults: Offer[] = [];
        const otherResults: Offer[] = [];

        const promises = mappedAreasOfStudy.map(async (area) => {
          const currentParams = {
            ...params,
            AreaOfStudy: area.AreaOfStudy,
            Concentration: area.Concentration,
          };

          try {
            const data = await getMAOExternal(currentParams);
            externalResults.push(...data.items);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('ERROR: failed to get MAO External', error);
          }
        });

        try {
          const data = await getMAOBanners();
          bannerResults.push(...data.items);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('ERROR: failed to get MAO Banners', error);
        }

        try {
          const data = await getMAOOther();
          otherResults.push(...data.items);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('ERROR: failed to get MAO Other', error);
        }

        await Promise.allSettled(promises);
        const uniqueItems: Offer[] = bannerResults;

        uniqueItems.push(
          ...externalResults
            .filter(
              (item, index, self) =>
                self.findIndex((i) => i.brandName === item.brandName) === index,
            )
            .sort((a, b) => Number(b.revenue) - Number(a.revenue))
            .slice(0, 8),
        );

        uniqueItems.push(...otherResults);

        if (uniqueItems.length > 0) {
          const tempCards = uniqueItems.flatMap((item: Offer, index: number) =>
            index > 0 && index % 4 === 0 ? ['banner', item] : item,
          );

          setOffers(uniqueItems);
          setChunksItems(tempCards);
        } else {
          setOffers(undefined);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('ERROR: failed to get MAO offers', error);
        setOffers(undefined);
      }
    }

    fetchData();
    offers?.map((offer: Offer) => {
      if (null == offer.brandName) {
        return;
      }

      window.dataLayer = window.dataLayer ?? [];

      const existingItemIndex = window.dataLayer.findIndex(
        (item) => item.ecommerce?.items[0]?.item_name === offer.brandName,
      );
      if (existingItemIndex === -1) {
        window.dataLayer.push({
          event: 'add_to_cart',
          ecommerce: {
            currency: 'USD',
            value: offer.revenue,
            items: [
              {
                item_name: offer.brandName,
                item_id: offer.brandName,
                price: offer.revenue,
                item_brand: 'results_offer',
                quantity: 1,
              },
            ],
          },
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleButtonClick(item: Offer) {
    if (null == item.brandName) {
      return;
    }

    window.dataLayer = window.dataLayer ?? [];

    window.dataLayer.push({
      event: 'purchase',
      ecommerce: {
        currency: 'USD',
        value: item.revenue,
        items: [
          {
            item_name: item.brandName,
            item_id: item.brandName,
            price: item.revenue,
            item_brand: 'mao_click',
            quantity: 1,
          },
        ],
      },
    });

    const data = localStorage.getItem('leadRes');
    const leadRes = null == data ? {} : JSON.parse(data);
    const session = leadRes.session;

    const body = {
      session_id: session.session_id as number,
      brand_name: item.brandName,
      revenue: +item.revenue,
      path: item.destUrl,
    };

    const _res = await submitRevenue(body);

    await createCallback(Callback.click, +item.revenue);
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay boxShadow='2xl' bg={primary.colors.ED.white} />
      <ModalContent
        h='100%'
        maxW={[
          'calc(100% - 36px)',
          'calc(100% - 36px)',
          'calc(100% - 170px)',
          'calc(100% - 280px)',
        ]}
        bg={primary.colors.ED.primary}
      >
        <IconButton
          aria-label='Close modal'
          icon={<CloseIcon />}
          onClick={onClose}
          w={['60px', '60px', '80px', '80px']}
          h={['60px', '60px', '80px', '80px']}
          rounded='full'
          bg={primary.colors.ED.lotion}
          position='absolute'
          zIndex={99}
          top='-30px'
          right={['-15px', '-15px', '-30px', '-30px']}
        />

        <Box className='modal--container'>
          <Box className='modal--heading' px={['37px']}>
            <Heading
              className='h1 text-lotion'
              fontSize={['36px', '36px', '60px', '60px']}
              pt='16px'
              fontWeight='medium'
              fontFamily={primary.fonts.ED.secondary}
              lineHeight={['46px', '46px', '70px', '70px']}
            >
              Thank you!
            </Heading>
            <Text className='text-base text-lotion'>
              {offers && offers.length > 0
                ? `That's all submitted for you, we've also found some really
          great offers for you. Take a look!`
                : `That's all submitted for you. Let's see if there are any other great offers.`}
            </Text>
          </Box>

          <Box className='modal--cardContainer'>
            <SimpleGrid
              columns={[1, 1, 2, 2]}
              pb='68px'
              px='26px'
              spacing='16px'
            >
              {offers &&
                offers?.length > 0 &&
                chunksItems?.map((item: 'banner' | Offer, index: number) => (
                  <Box
                    key={`chunk-${index}`}
                    style={{ gridColumn: item === 'banner' ? '1 / -1' : '' }}
                  >
                    {item === 'banner' ? (
                      <>
                        <Box className='modal__banner--container'>
                          <Banner src={banner} quote>
                            <div className='quote__child__wrapper relative z-10'>
                              <div className='quote__content'>
                                <div className='modal__locationIcon'>
                                  <Hide
                                    breakpoint={`(max-width: ${primary.breakpoints[1]})`}
                                  >
                                    <Image src={locationIcon} alt='' />
                                  </Hide>
                                  <Heading className='h1 text-center text-light'>
                                    educationdirectory.net
                                  </Heading>
                                </div>
                              </div>
                            </div>
                          </Banner>
                        </Box>
                      </>
                    ) : (
                      <Card
                        w='100%'
                        minH='235px'
                        py='13px'
                        px={['16px', '16px', '26px', '26px']}
                        borderRadius='6px'
                      >
                        <Box
                          display='flex'
                          flexDir={['column', 'column', 'row', 'row']}
                          justifyContent='space-between'
                          alignItems='center'
                        >
                          <Image
                            src={item?.imageUrl}
                            alt={item.brandName}
                            width='164'
                            height='85'
                          />
                          <Text
                            // fontSize='28px'
                            lineHeight='33px'
                            fontWeight='medium'
                            py={['0px', '0px', '16px', '16px']}
                            textAlign={['center', 'center', 'start', 'start']}
                          >
                            {item.brandName}
                          </Text>
                        </Box>
                        <Box
                          display='flex'
                          w='100%'
                          pt='18px'
                          justifyContent='space-between'
                          flexDir={['column', 'column', 'row', 'row']}
                        >
                          <List
                            spacing={3}
                            maxW={['100%', '100%', '70%', '70%']}
                          >
                            {item?.blurbs != undefined &&
                              item?.blurbs != null &&
                              item.blurbs
                                .slice(0, 1)
                                .map((blurb: string | null, index: number) => {
                                  return (
                                    <ListItem
                                      pb='16px'
                                      display='flex'
                                      alignItems='center'
                                      key={index}
                                    >
                                      <ListIcon as={TickIcon} />
                                      <Text pl='2'>
                                        {null != blurb &&
                                          blurb
                                            .replace(/<\/?ul>|<\/?li>/g, '')
                                            .substring(0, 170)}
                                        {null != blurb && blurb.length > 170
                                          ? '...'
                                          : ''}
                                      </Text>
                                    </ListItem>
                                  );
                                })}
                          </List>
                          <Box
                            className='modal__next'
                            w={['100%', '100%', '94px', '94px']}
                            h={['auto', 'auto', '94px', '94px']}
                            pb='10px'
                          >
                            <Hide
                              breakpoint={`(max-width: ${primary.breakpoints[1]})`}
                            >
                              <Link
                                href={item.destUrl}
                                target='_blank'
                                id={`click-thankyou-mao-img-${index}-${item.brandName}`}
                                onClick={() => handleButtonClick(item)}
                              >
                                <Image src={Right} alt='right-icon' />
                              </Link>
                            </Hide>
                            <Show
                              breakpoint={`(max-width: ${primary.breakpoints[1]})`}
                            >
                              <Link
                                href={item.destUrl}
                                id={`click-thankyou-mao-button-${index}-${item.brandName}`}
                                target='_blank'
                              >
                                <Button
                                  bg='ED.primary'
                                  color='ED.white'
                                  borderRadius='26'
                                  h='52px'
                                  w='full'
                                  m='auto'
                                  display='block'
                                  // maxW={['214px', '214px', '290px', '290px']}
                                  fontSize='22px'
                                  lineHeight='30px'
                                  fontWeight='semibold'
                                  fontFamily='IBM Plex Sans'
                                  _hover={{ background: 'ED.secondary' }}
                                  onClick={() => handleButtonClick(item)}
                                >
                                  Get this offer
                                </Button>
                              </Link>
                            </Show>
                          </Box>
                        </Box>
                      </Card>
                    )}
                  </Box>
                ))}
            </SimpleGrid>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};
export default ThankYouModal;

export const CloseIcon = () => {
  return (
    <Icon
      xmlns='http://www.w3.org/2000/svg'
      width='45.255'
      height='45.255'
      viewBox='0 0 45.255 45.255'
    >
      <g
        id='Group_480'
        data-name='Group 480'
        transform='translate(-1259.372 -37.372)'
      >
        <rect
          id='Rectangle_476'
          data-name='Rectangle 476'
          width='56'
          height='8'
          rx='4'
          transform='translate(1265.029 37.373) rotate(45)'
          fill='#2541b2'
        />
        <rect
          id='Rectangle_477'
          data-name='Rectangle 477'
          width='56'
          height='8'
          rx='4'
          transform='translate(1259.373 76.97) rotate(-45)'
          fill='#2541b2'
        />
      </g>
    </Icon>
  );
};

export const TickIcon = () => {
  return (
    <Icon
      xmlns='http://www.w3.org/2000/svg'
      width='16.785'
      height='12.575'
      viewBox='0 0 16.785 12.575'
    >
      <path
        id='Path_174'
        data-name='Path 174'
        d='M9,16.2,5.5,12.7a.99.99,0,1,0-1.4,1.4l4.19,4.19a1,1,0,0,0,1.41,0L20.3,7.7a.99.99,0,0,0-1.4-1.4Z'
        transform='translate(-3.807 -6.007)'
        fill='#2541b2'
      />
    </Icon>
  );
};
