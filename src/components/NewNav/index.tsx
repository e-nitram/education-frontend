import {
  Box,
  Flex,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  // Show,
  Stack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import { Link as ScrollLink } from 'react-scroll';

import { AppContext } from '@/context/AppContext';

import { programNavLinks, subNavLinks } from '@/appConstants';
import LogoSvg from '@/assets/icons/logo.svg';
import { primary } from '@/theme';

import HowItWorks from '../Navbar/components/howItWorks';
import Vocations from '../Navbar/components/vocations';
import WhyED from '../Navbar/components/whyED';
import NavDrawer from '../Navbar/drawer/navDrawer';
import Select from '../Select';

import styles from '../Navbar/index.module.css';

const { activeClass, lists, subnav_links, secondaryLogo } = styles;

const Navbar: FC = () => {
  const { navType } = useContext(AppContext);
  const [isMobile] = useMediaQuery(`(max-width: ${primary.breakpoints[1]})`);
  const [isTablet] = useMediaQuery(`(max-width: ${primary.breakpoints[2]})`);
  const router = useRouter();

  return (
    <Stack
      pos={router.pathname.includes('landing-page') ? 'relative' : 'fixed'}
      top='0'
      gap='0'
      w='100%'
      zIndex={100}
      boxShadow={`0px 3px 6px ${primary.shadows.secondary}`}
    >
      <Flex
        flex='1'
        bg={
          navType === 'primary'
            ? 'ED.white'
            : navType === 'tertiary' && isMobile
            ? 'ED.primary'
            : `${isMobile ? 'ED.white' : 'ED.primary'}`
        }
      >
        <Flex
          className='primaryContainer'
          flex='1'
          height={
            navType === 'primary'
              ? ['60px', '60px', '80px', '80px']
              : navType === 'tertiary'
              ? ['60px', '60px', '80px', '80px']
              : isMobile
              ? '60px'
              : '50px'
          }
          alignItems='center'
          justifyContent='space-between'
        >
          <Link href='/'>
            <Image
              src={LogoSvg}
              alt='brand-logo'
              width={143.1}
              height={33.5}
              className={
                navType === 'tertiary' && isMobile
                  ? secondaryLogo
                  : navType == 'primary'
                  ? ''
                  : isMobile
                  ? 'primary'
                  : secondaryLogo
              }
            />
          </Link>
          {navType == 'tertiary' && !isMobile ? (
            <>
              <Flex columnGap='0' color='ED.white'>
                {/* <Image src={leftChevron} alt='left-chevron' /> */}
                {/* <Link href={'/'}>
                                        Go Back
                                    </Link> */}
              </Flex>
            </>
          ) : (
            <>
              {isTablet ? (
                <NavDrawer />
              ) : (
                <>
                  <Flex
                    columnGap='26px'
                    fontFamily='IBM Plex Sans'
                    fontWeight='500'
                    fontSize='sm'
                    color={navType == 'primary' ? 'ED.primary' : 'ED.white'}
                  >
                    <Popover
                      placement='bottom-start'
                      trigger='hover'
                      arrowSize={30}
                      arrowShadowColor={
                        navType == 'primary'
                          ? primary.colors.ED.white
                          : primary.colors.ED.primary
                      }
                    >
                      <PopoverTrigger>
                        <Text role='button'>Why Education Directory?</Text>
                      </PopoverTrigger>
                      <PopoverContent
                        w='792px'
                        m='0 auto'
                        border='none'
                        boxShadow='xl'
                        _focusVisible={{ outline: 'none' }}
                        inset={
                          navType == 'primary'
                            ? '35px 0px auto auto'
                            : '20px 0px auto auto'
                        }
                      >
                        <PopoverArrow
                          bg={
                            navType == 'primary'
                              ? primary.colors.ED.white
                              : primary.colors.ED.primary
                          }
                        />
                        <WhyED navType={navType} />
                      </PopoverContent>
                    </Popover>

                    <Popover
                      placement='bottom'
                      trigger='hover'
                      arrowSize={30}
                      arrowShadowColor={
                        navType == 'primary'
                          ? primary.colors.ED.white
                          : primary.colors.ED.primary
                      }
                    >
                      <PopoverTrigger>
                        <Text role='button'>How it works</Text>
                      </PopoverTrigger>

                      <PopoverContent
                        inset={
                          navType == 'primary'
                            ? '35px 70px auto auto'
                            : '20px 70px auto auto'
                        }
                        w='100%'
                        border='none'
                        boxShadow='xl'
                        _focusVisible={{ outline: 'none' }}
                      >
                        <PopoverArrow
                          bg={
                            navType == 'primary'
                              ? primary.colors.ED.white
                              : primary.colors.ED.primary
                          }
                          marginLeft='70px'
                        />
                        <Box>
                          <HowItWorks navType={navType} />
                        </Box>
                      </PopoverContent>
                    </Popover>
                    <Popover
                      placement='bottom'
                      trigger='hover'
                      arrowSize={30}
                      arrowShadowColor={
                        navType == 'primary'
                          ? primary.colors.ED.white
                          : primary.colors.ED.primary
                      }
                    >
                      {({ onClose }) => (
                        <>
                          <PopoverTrigger>
                            <Text role='button'>Vocations</Text>
                          </PopoverTrigger>
                          <PopoverContent
                            w='313px'
                            inset={
                              navType == 'primary'
                                ? '35px 50px auto auto'
                                : '20px 50px auto auto'
                            }
                            m='0 auto'
                            border='none'
                            boxShadow='xl'
                            _focusVisible={{ outline: 'none' }}
                          >
                            <PopoverArrow
                              bg={
                                navType == 'primary'
                                  ? primary.colors.ED.white
                                  : primary.colors.ED.primary
                              }
                              marginLeft='50px'
                            />
                            <Box>
                              <Vocations onClose={onClose} navType={navType} />
                            </Box>
                          </PopoverContent>
                        </>
                      )}
                    </Popover>
                  </Flex>
                </>
              )}
            </>
          )}
        </Flex>
      </Flex>
      {/* <Show above='550px'>{showSubNav && <NewSubNav />}</Show> */}
    </Stack>
  );
};

export default Navbar;

export const NewSubNav = () => {
  const router = useRouter();
  const isProgram = router.pathname.includes('subjects');
  const { programSlug } = useContext(AppContext);

  return (
    <Flex bg='ED.white' mt='0 !important'>
      <Flex
        className='primaryContainer'
        flex='1'
        h='70px'
        alignItems='center'
        justifyContent='space-between'
      >
        <List display='flex' className={subnav_links}>
          {(isProgram ? programNavLinks : subNavLinks).map(({ id, name }) => (
            <ScrollLink
              key={id}
              activeClass={activeClass}
              smooth
              spy
              offset={-120}
              to={id}
            >
              <ListItem className={lists}>{name}</ListItem>
            </ScrollLink>
          ))}
        </List>
        <Box w='287px'>
          <Select
            options={programSlug?.map((p) => ({
              title: p.title,
              value: p.slug,
            }))}
            placeholder='Select interest'
            selectedOptions={{
              title:
                programSlug?.find((p) => p.slug === router.query.interest)
                  ?.title ?? '',
            }}
            onSelect={({ value }) => router.push(`/area-of-interest/${value}`)}
          />
        </Box>
      </Flex>
    </Flex>
  );
};
