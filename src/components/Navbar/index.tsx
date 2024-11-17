import { useMediaQuery } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

import { AppContext } from '@/context/AppContext';

import { navLinks, programNavLinks, subNavLinks } from '@/appConstants';
import leftChevron from '@/assets/icons/leftChevron.svg';
import logoSvg from '@/assets/icons/logo.svg';
import questionMark from '@/assets/icons/questionMark.svg';
import fetchDataFrom from '@/pages/api/fetchDataFrom';
import { primary } from '@/theme';
import { IHeros, ProgramSlug } from '@/typings';

import HowItWorks from './components/howItWorks';
import Schools from './components/Schools';
import Vocations from './components/vocations';
import WhyED from './components/whyED';
import Drawer from './drawer/drawer';
import Select from '../Select';

import style from './index.module.css';

type TProps = {
  showSubNav?: boolean;
  // navPrimary?: boolean;
  // thankyouHeader?: boolean;
  // interestedProgram?: boolean;
  programSlugs?: ProgramSlug;
};

const Navbar: FC<TProps> = (): JSX.Element => {
  const NavComponents: any = {
    '#why-education-directory': <WhyED navType='primary' />,
    '#how-it-works': <HowItWorks navType='primary' />,
    '#area-of-intrest': <Vocations navType='primary' />,
    '#schools': <Schools navType='primary' />,
  };
  const { currentPage } = useContext(AppContext);
  const [isMobile] = useMediaQuery(`(max-width: ${primary.breakpoints[1]})`);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [popUp, setPopUp] = useState({
    status: false,
    id: '',
  });
  const navPrimary =
    currentPage === 'areaOfInterest' || currentPage === 'programs';
  const linkHandler = (id: string) => {
    setPopUp({
      status: popUp.id == id ? !popUp.status : true,
      id: id,
    });
  };
  const handleClickOutside = () => {
    setPopUp({ status: false, id: '' });
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () =>
      document.removeEventListener('click', handleClickOutside, true);
  }, []);

  return (
    <>
      <header
        className={
          navPrimary
            ? style.primaryHeader
            : currentPage === 'thankyou'
            ? style.thankyouHeader
            : style.secondaryHeader
        }
      >
        <div className='container'>
          <nav className={style.navbar}>
            <div
              style={{
                padding: 0,
              }}
              className={style.navbar_logo}
            >
              <Link href='/'>
                <div
                  className={
                    navPrimary || currentPage === 'thankyou'
                      ? style.primaryLogoWrapper
                      : style.secondryLogoWrapper
                  }
                >
                  <Image
                    src={logoSvg}
                    loading='lazy'
                    fill
                    className={
                      navPrimary || (currentPage === 'thankyou' && !isMobile)
                        ? style.secondaryLogo
                        : currentPage === 'thankyou' && isMobile
                        ? style.thankYouMobileHeader
                        : ''
                    }
                    alt='Logo'
                  />
                </div>
              </Link>
            </div>
            <div className={style.navbar_links}>
              <div className={style.linkParent}>
                {currentPage !== 'interestedProgram' &&
                  navLinks.map(({ id, name }) => (
                    <li key={id} style={{ display: 'flex' }}>
                      <div
                        className={`hide-sm ${style.navbar_links_a} ${
                          navPrimary ? 'text-white' : 'text-primary'
                        }`}
                        onClick={() => linkHandler(id)}
                      >
                        {name}
                      </div>
                      {popUp.id === id && popUp.status == true && (
                        <div className={style.triangle}></div>
                      )}
                    </li>
                  ))}
              </div>

              {currentPage !== 'interestedProgram' &&
              currentPage === 'thankyou' ? (
                <div className={style.goBackContainer}>
                  <Image
                    src={leftChevron}
                    style={{ marginRight: '20px' }}
                    className={`hide-sm ${
                      currentPage === 'thankyou' ? 'text-white' : 'text-primary'
                    }`}
                    alt=''
                  />
                  <Link
                    // key={id}
                    className={`hide-sm ${
                      currentPage === 'thankyou' ? 'text-white' : 'text-primary'
                    }`}
                    href='results'
                  >
                    Go Back
                  </Link>
                </div>
              ) : null}

              <div
                className={
                  currentPage === 'interestedProgram'
                    ? style.rightContainer
                    : style.imageContainer
                }
              >
                {currentPage === 'interestedProgram' && (
                  <div className={style.IP_right_container}>
                    <div className={style.svgContainer}>
                      <sup>
                        <Image src={questionMark} alt='' />
                      </sup>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {popUp.id.length > 0 && popUp.status && (
              <div className={style.dropdownContaienr}>
                {popUp.id.length > 0 && NavComponents[popUp.id]}
              </div>
            )}
          </nav>
        </div>
        {navPrimary ? <SubNav /> : ''}
      </header>
      {showDrawer ? (
        <div className={style.navdrawerContainer}>
          <Drawer closeBtn={() => setShowDrawer(false)} />
        </div>
      ) : null}
    </>
  );
};

export default Navbar;

export const SubNav = () => {
  const router = useRouter();
  const { updateAppTitle } = useContext(AppContext);
  const [heros, setHeros] = useState<IHeros>();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const isProgram = router.pathname.includes('programs');
  const interest = router.query?.interest as string;

  useEffect(() => {
    fetchDataFrom('pages/?headers_only=True').then(async (heros) => {
      const data = await heros.json();
      setHeros(data);
    });
  }, []);

  useEffect(() => {
    if (heros && interest.length > 0) {
      const res = heros?.results.find(({ slug }) => slug === interest);
      if (res?.hero_heading != null) {
        setSelectedOption(res?.hero_heading);
        updateAppTitle(`${res?.hero_heading} - Education Directory`);
      }
    }
  }, [interest, heros, updateAppTitle]);

  return (
    <header className={`hide-sm ${style.subnav}`}>
      <div className='container flex justify-between'>
        <div className={style.linksWrapper}>
          <ul className={style.subnav_links}>
            {(isProgram ? programNavLinks : subNavLinks).map(({ id, name }) => (
              <ScrollLink
                key={id}
                activeClass={style.activeClass}
                smooth
                spy
                offset={-120}
                to={id}
              >
                <li className={style.lists}>{name}</li>
              </ScrollLink>
            ))}
          </ul>
        </div>

        <div className={style.selectWrapper}>
          {!isProgram ? (
            <Select
              options={
                heros?.results?.map(({ hero_heading, slug }) => {
                  return {
                    title: hero_heading,
                    value: slug,
                  };
                }) || []
              }
              placeholder='Select interest'
              selectedOptions={{ title: selectedOption }}
              onSelect={(route) => router.push(`/area-of-interest/${route}`)}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </header>
  );
};
