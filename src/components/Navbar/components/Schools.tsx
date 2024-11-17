import { Box, Button, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import ReactGA from 'react-ga';

import { cities } from '@/appConstants';
import chevronDown from '@/assets/icons/chevron-down.svg';
import chevronUp from '@/assets/icons/chevron-up.svg';
import tempImage from '@/assets/images/tempImage.png';
import { primary } from '@/theme';

import styles from './index.module.css';

const {
  masonryContainer,
  headingAndChevronWrapper,
  whyEDIcon,
  checkbox__wrapper,
  schoolBtn,
} = styles;
type IProps = {
  navType: string;
};
const Schools: React.FC<IProps> = ({ navType }) => {
  return <CitiesList navType={navType} />;
};
export default Schools;
const CitiesList: React.FC<IProps> = ({ navType }) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const handleToggle = (index: number) => {
    if (expanded === index) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  const handleGetStarted = () => {
    ReactGA.event({
      category: 'School',
      action: 'Get Started',
      label: 'School',
    });
  };
  return (
    <>
      <Box
        w='100%'
        bg={
          navType == 'primary'
            ? primary.colors.ED.white
            : primary.colors.ED.primary
        }
        borderRadius='6'
        p={['26px']}
        className={masonryContainer}
      >
        <Stack>
          {cities.map((city, idx) => {
            return (
              <Box key={`cities-${idx}-${city}`}>
                <Box className={headingAndChevronWrapper}>
                  <Text
                    onClick={() => handleToggle(idx)}
                    textTransform='capitalize'
                    fontFamily='IBM Plex Sans'
                    fontWeight='600'
                    fontSize={primary.fontSizes.subheaderFonts}
                    color={
                      navType == 'primary'
                        ? primary.colors.ED.primary
                        : primary.colors.ED.white
                    }
                  >
                    {city?.name}
                  </Text>
                  {expanded == idx ? (
                    <>
                      <Image
                        className={`${whyEDIcon} `}
                        src={chevronUp}
                        alt=''
                        onClick={() => handleToggle(idx)}
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        onClick={() => handleToggle(idx)}
                        // className={`${whyEDIcon} `}
                        src={chevronDown}
                        alt=''
                        style={{
                          filter:
                            navType == 'primary'
                              ? primary.filters.primary
                              : primary.filters.white,
                        }}
                      />
                    </>
                  )}
                </Box>
                {expanded == idx &&
                  city?.colleges.map((program: any, i: any) => {
                    return (
                      <>
                        <Link
                          // href={`../programs/${program.slug}`}
                          href='#'
                          key={`${program.slug}-${i}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Text
                            key={i}
                            color={
                              navType == 'primary'
                                ? primary.colors.ED.primary
                                : primary.colors.ED.white
                            }
                            fontFamily='IBM Plex Sans'
                            fontWeight='400'
                            fontSize='md'
                          >
                            {program}
                          </Text>
                        </Link>
                      </>
                    );
                  })}
              </Box>
            );
          })}
          <Box className={checkbox__wrapper}>
            <Image src={tempImage} alt='' />
            <a href='/get-started' target='_blank'>
              <Button
                color='ED.white'
                fontSize='xl'
                bg='ED.secondary'
                _hover={{ background: 'ED.secondary' }}
                className={`${schoolBtn} btn-secondry h-btn`}
                onClick={() => handleGetStarted()}
              >
                Get Started
              </Button>
            </a>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
