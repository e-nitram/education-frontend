import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Link as ScrollLink } from 'react-scroll';

import Card from '@/components/Card';
import Checkbox from '@/components/Checkbox';

import { AppContext } from '@/context/AppContext';

import { programNavLinks, stepOne, subNavLinks } from '@/appConstants';
import closeIcon from '@/assets/icons/close.svg';

import Select from '../../Select';

import styles from './index.module.css';

interface IProps {
  closeBtn: () => void;
}
const Drawer = ({ closeBtn }: IProps) => {
  const router = useRouter();
  const { stepsData, setStepsData } = useContext(AppContext);

  const isProgram = router.pathname.includes('programs');

  return (
    <div className={styles.drawerContainer}>
      <div className={styles.drawerTopContainer}>
        <div className={styles.drawercloseBtn}>
          <Image
            onClick={closeBtn}
            className={styles.drawerCloseIcon}
            src={closeIcon}
            alt=''
            width={20}
            height={20}
          />
        </div>
        <div className={styles.selectWrapper}>
          {!isProgram ? (
            <Select
              options={[
                {
                  title: 'heros?.hero_heading',
                  value: 'heros?.slug',
                },
              ]}
              // options={heros?.map(({ hero_heading, slug }) => {
              //   return {
              //     title: hero_heading,
              //     value: slug,
              //   };
              // })}
              placeholder='Select interest'
              onSelect={() => 'selected'} //   selectedOptions={{ title: selectedOption }}
              //   onSelect={(route) => router.push(`/area-of-interest/${route}`)}
            />
          ) : (
            ''
          )}
        </div>
        <div className={styles.linksWrapper}>
          <ul className={styles.subnav_links}>
            {(isProgram ? programNavLinks : subNavLinks).map(({ id, name }) => (
              <ScrollLink
                key={id}
                activeClass={styles.activeClass}
                smooth
                spy
                offset={-120}
                to={id}
              >
                <li className={styles.lists}>{name}</li>
              </ScrollLink>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ width: '100%' }}>
        <Card>
          <div className='p-5'>
            <h4 className='h4 py-3 text-center text-primary'>
              {stepOne.heading}
            </h4>
            {stepOne.options.map((item, i) => (
              <div key={i} className='checkbox__wrapper'>
                <Checkbox
                  clickHandler={() =>
                    setStepsData({
                      ...stepsData,
                      online_or_campus: item.value,
                    })
                  }
                  name={item.title}
                  icon={item.icon}
                  checked={
                    stepsData.online_or_campus === item.value ? true : false
                  }
                />
              </div>
            ))}
            <div className='checkbox__wrapper'>
              <Button
                bg='ED.secondary'
                color='ED.white'
                className='btn-secondry h-btn'
                _hover={{ background: 'ED.secondary' }}
                onClick={() =>
                  stepsData.online_or_campus.length > 0 &&
                  setStepsData({ ...stepsData, current: 2 })
                }
              >
                Get Started
              </Button>
            </div>
            <p className='text-center text-xs text-dark'>
              Usually takes less than 3 minutes to get results
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Drawer;
