import {
  Box,
  Icon,
  IconProps,
  ListIcon,
  ListItem,
  Text,
  UnorderedList,
  useMediaQuery,
} from '@chakra-ui/react';
import Image from 'next/image';
import React, { FC, useState } from 'react';

import { Image_Quality } from '@/appConstants';
import { primary } from '@/theme';

import StarRating from '../RatingStar';
import chevronDown from '../../assets/icons/chevron-down.svg';
import chevronUp from '../../assets/icons/chevron-up.svg';
import online from '../../assets/icons/online.svg';
import topProvider from '../../assets/icons/top-provider.svg';
import writeReview from '../../assets/icons/write-review.svg';

interface IProps {
  item: any;
  number: number;
}

const InterestedProgramsCard: FC<IProps> = ({ item, number }) => {
  const [isMobile] = useMediaQuery(`(max-width: ${primary.breakpoints[1]})`);
  const [showOptions, setShowOptions] = useState<number | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);

  const showHandler = (id: number) => {
    id == showOptions ? setToggle(!toggle) : setToggle(true);
    setShowOptions(id);
  };
  return (
    <Box className='ip-card-container'>
      <Text fontWeight='bold' className='ip-card-counter'>
        {number + 1}
      </Text>
      <Box className='ip-card-inner-container'>
        <Box
          className='ip-card-upper'
          py='16px'
          p={['16px', '16px', '16px 0px 16px 26px', '16px 0px 16px 26px']}
        >
          <div>
            <Image
              src={item.school_logo}
              width={isMobile ? 100 : 170}
              quality={Image_Quality}
              height={isMobile ? 50 : 72}
              alt=''
            />
          </div>
          <Box
            className='ip-card-paragraph'
            m='auto'
            mt='2rem'
            ml='inherit'
            pl='23px'
          >
            <Text
              className='text-base text-dark'
              fontSize='16px'
              fontWeight='normal'
              fontFamily={primary.fonts.ED.primary}
              lineHeight='26px'
            >
              {item.description}
            </Text>

            <div
              onClick={() => showHandler(number)}
              className='ip__chevron_container '
            >
              <Text
                className='pointer modal__program_specialties text-base text-dark'
                fontSize='16px'
                lineHeight='26px'
                fontWeight={showOptions == number && toggle ? 'bold' : 'medium'}
              >
                Program Specialties
              </Text>
              <Image
                src={showOptions == number && toggle ? chevronUp : chevronDown}
                quality={Image_Quality}
                alt=''
              />
            </div>
            {showOptions == number && toggle ? (
              <Box className='ip-card-Programlist'>
                <UnorderedList>
                  {item.program_specialist?.map(
                    (
                      itm:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | React.ReactFragment
                        | React.ReactPortal
                        | null
                        | undefined,
                      i: React.Key | null | undefined,
                    ) => (
                      <ListItem
                        key={i}
                        color={item.primary_colour_pixel}
                        className='align-item-base gap-15 modal__program_specialties flex text-base text-dark'
                        style={{ lineHeight: 2 }}
                      >
                        <ListIcon
                          as={TickIcon}
                          color={item.primary_colour_pixel}
                        />
                        <p className='w-full'>{itm}</p>
                      </ListItem>
                    ),
                  )}
                </UnorderedList>
              </Box>
            ) : null}
          </Box>
          <Box
            className='ip-card-rating'
            m={['auto 10px', 'auto 26px', '43px auto', '43px auto']}
            display='flex'
            justifyContent='end'
          >
            <Box>
              <Text className='text-base text-dark' textAlign='center'>
                OUR RATING
              </Text>
              <StarRating rating={Number(item.star_rating[0])} />
            </Box>
          </Box>
        </Box>
        <div className='ip-card-lower'>
          <Box
            className='ip-fecilities'
            py={['22px', '22px', '22px', '22px']}
            maxW='65%'
          >
            <div>
              <Image src={online} alt='' />
              <Text className='text-base text-dark'>{item.location}</Text>
            </div>
            <Box justifyContent='center'>
              <Image src={topProvider} alt='' />
              <Text className='text-base text-dark'>{item.comment_1}</Text>
            </Box>

            <Box justifyContent='center'>
              <Image src={writeReview} alt='' />
              <Text className='text-base text-dark'>
                People review {item.school_name} Highly
              </Text>
            </Box>
          </Box>
          <Box
            id='ip-visit-btn'
            className='ip-visit-btn text-base text-dark'
            bg={item.primary_colour_pixel}
          >
            <a
              href={item.website}
              target='_blank'
              className='text-decoration-none text-dark'
              rel='noreferrer'
              style={{ color: item.secondary_color_pixel }}
            >
              Visit Site {'>'}
            </a>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default InterestedProgramsCard;

const TickIcon = (
  props: JSX.IntrinsicAttributes &
    Omit<
      React.SVGProps<SVGSVGElement>,
      'translate' | 'as' | keyof IconProps
    > & { htmlTranslate?: 'yes' | 'no' | undefined } & IconProps & {
      as?: 'svg' | undefined;
    },
) => (
  <Icon viewBox='0 0 16.785 12.575' {...props}>
    <path
      id='Path_174'
      data-name='Path 174'
      d='M9,16.2,5.5,12.7a.99.99,0,1,0-1.4,1.4l4.19,4.19a1,1,0,0,0,1.41,0L20.3,7.7a.99.99,0,0,0-1.4-1.4Z'
      transform='translate(-3.807 -6.007)'
      fill='currentColor'
    />
  </Icon>
);
