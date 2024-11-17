import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, memo, useContext } from 'react';
import { Link } from 'react-scroll';

import Select from '@/components/Select';

import { AppContext } from '@/context/AppContext';

import { programNavLinks, subNavLinks } from '@/appConstants';
import closeSvg from '@/assets/icons/close.svg';
import MenuSvg from '@/assets/icons/menu.svg';
import { primary } from '@/theme';

import styles from '@/components/Navbar/index.module.css';

const { secondaryMenu, activeClass } = styles;

const CoursesForm = React.lazy(() => import('@/components/CourseCard'));

const NavDrawer = memo(() => {
  const [isMobile] = useMediaQuery(`(max-width: ${primary.breakpoints[1]})`);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { navType, programSlug } = useContext(AppContext);
  const { query, push, pathname } = useRouter();

  return (
    <Box>
      <Image
        onClick={onOpen}
        src={MenuSvg}
        alt='menu-icon'
        className={
          navType === 'tertiary' && isMobile
            ? secondaryMenu
            : navType == 'primary'
            ? ''
            : isMobile
            ? 'primary'
            : secondaryMenu
        }
      />
      <Drawer
        placement='right'
        size='xs'
        onClose={onClose}
        isOpen={isOpen}
        isFullHeight={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth='1px'
            background='ED.primary'
            minH='50%'
            overflow='auto'
          >
            <Box p='3' display='flex' justifyContent='flex-end'>
              <Image
                onClick={() => onClose()}
                src={closeSvg}
                width={19.09}
                height={19.09}
                style={{ filter: primary.filters.white }}
                alt='close-icon'
              />
            </Box>

            <Box py='2'>
              <Select
                options={programSlug?.map((p) => ({
                  title: p.title,
                  value: p.slug,
                }))}
                placeholder='Select interest'
                selectedOptions={{
                  title:
                    programSlug?.find((p) => p.slug === query.interest)
                      ?.title ?? '',
                }}
                onSelect={({ value }) => {
                  push(
                    `/${
                      query?.subject !== undefined
                        ? 'programs'
                        : 'area-of-interest'
                    }/${value}`,
                  );
                  onClose();
                }}
              />
            </Box>
            {pathname.includes('interest') || pathname.includes('subjects') ? (
              <>
                <Box>
                  <ScrollSpy onClose={onClose} />
                </Box>
              </>
            ) : null}
          </DrawerHeader>
          <DrawerBody>
            <React.Suspense fallback={<div>Loading...</div>}>
              <CoursesForm />
            </React.Suspense>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
});

NavDrawer.displayName = 'NavDrawer';

export default NavDrawer;

interface IProps {
  onClose: () => void;
}

export const ScrollSpy: FC<IProps> = ({ onClose }: IProps) => {
  const { query } = useRouter();
  const [isMobile] = useMediaQuery(`(max-width: ${primary.breakpoints[1]})`);
  return (
    <Box>
      {(query.interest != undefined ? subNavLinks : programNavLinks).map(
        ({ id, name }) => (
          <Link
            key={id}
            activeClass={activeClass}
            smooth
            spy
            offset={isMobile ? -60 : -120}
            to={id}
          >
            <Heading
              onClick={onClose}
              key={id}
              fontFamily={primary.fonts.ED.primary}
              lineHeight='30px'
              marginTop='16px'
              fontWeight='semibold'
              fontSize='22px'
              color={primary.colors.ED.fontColorWhite}
            >
              {name}
            </Heading>
          </Link>
        ),
      )}
    </Box>
  );
};
