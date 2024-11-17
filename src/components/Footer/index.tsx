import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useContext } from 'react';

import { AppContext } from '@/context/AppContext';

import logoSvg from '@/assets/icons/logo.svg';

import style from './index.module.css';

const { firstSection, imgColor, divider, sectionWrapper } = style;

const Footer: FC = () => {
  const { programSlug } = useContext(AppContext);

  return (
    <Box
      bg='ED.primary'
      zIndex={50}
      color='ED.fontColorWhite'
      pt='42px'
      pb='6'
      pos='relative'
    >
      <Box className='primaryContainer'>
        <Flex className={firstSection} flexWrap='wrap'>
          <Image
            width={172}
            height={40}
            className={imgColor}
            alt='education-directory-logo'
            src={logoSvg}
          />
        </Flex>
        <Box className={divider} />
        <Box className={sectionWrapper}>
          <Stack rowGap='2'>
            <Text
              color='ED.fontColorWhite'
              fontFamily='ED.primary'
              fontWeight='600'
              fontSize='22px'
            >
              Areas of interest
            </Text>
            <Stack rowGap='2'>
              {programSlug?.length > 0 &&
                programSlug
                  .sort((a, b) => a.title.localeCompare(b.title)) // Sort the array alphabetically
                  .map((interest, idx) => (
                    <Link
                      href={`/area-of-interest/${interest.slug}`}
                      key={`footer-${interest.slug}-${idx}`}
                      style={{ textDecoration: 'none' }}
                      data-cy='area-of-interest-link'
                    >
                      <Text
                        color='ED.fontColorLotion'
                        key={`interest-${idx}`}
                        fontFamily='ED.primary'
                      >
                        {interest.title}
                      </Text>
                    </Link>
                  ))}
            </Stack>
          </Stack>

          <Stack rowGap='2'></Stack>

          <Stack rowGap='2'>
            <Text
              color='ED.fontColorWhite'
              fontFamily='ED.primary'
              fontWeight='600'
              fontSize='22px'
            >
              Legal information
            </Text>
            <Stack rowGap='2'>
              <Box></Box>
              <Link href='/privacy-policy' data-cy='privacy-policy-link'>
                <Text color='ED.fontColorLotion' fontFamily='ED.primary'>
                  Privacy Policy
                </Text>
              </Link>
              <Link
                href='/terms-and-conditions'
                data-cy='terms-and-conditions-link'
              >
                <Text color='ED.fontColorLotion' fontFamily='ED.primary'>
                  Terms of Use
                </Text>
              </Link>
              <Link href='/do-not-call' data-cy='do-not-call-link'>
                <Text color='ED.fontColorLotion' fontFamily='ED.primary'>
                  Do not sell my info
                </Text>
              </Link>

              <Text
                color='ED.fontColorWhite'
                fontFamily='ED.primary'
                fontWeight='600'
                fontSize='2xl'
              >
                Contact
              </Text>
              <a href='tel:8778355785' className={style.phoneClass}>
                (877) 835-5785
              </a>
            </Stack>
          </Stack>
        </Box>
        <Box className={divider} mb='26px' />
        <Box>
          <Text
            color='ED.fontColorLotion'
            fontFamily='ED.primary'
            fontSize='sm'
          >
            This is an offer for educational opportunities and not an offer for
            nor a guarantee of employment. Students should consult with a
            representative from the school they select to learn more about
            career opportunities in that field. Program outcomes vary according
            to each institution's specific program curriculum.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
