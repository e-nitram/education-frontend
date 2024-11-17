import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import tick from '@/assets/icons/tick.svg';
import { primary } from '@/theme';

import style from './index.module.css';

type IProps = {
  navType: string;
};
const WhyED: FC<IProps> = ({ navType }): JSX.Element => {
  const points = [
    {
      text: 'Both online colleges and campus school locations available',
      id: '2',
    },
    { text: 'Several short-course and certificate level options', id: '9' },
    {
      text: 'Undergraduate and graduate degrees in thousands of different programs',
      id: '89',
    },
  ];
  return (
    <>
      <Box
        w='100%'
        p={6}
        bg={
          navType == 'primary'
            ? primary.colors.ED.white
            : primary.colors.ED.primary
        }
        className='primaryContainer'
        borderRadius='6'
      >
        <Flex gap='5'>
          <Box
            w='50%'
            display='flex'
            alignItems='center'
            flexDir='column'
            gap={4}
          >
            <Text
              fontFamily='IBM Plex Sans'
              fontWeight='500'
              fontSize='32px'
              color={
                navType == 'primary'
                  ? primary.colors.ED.primary
                  : primary.colors.ED.white
              }
            >
              Education Directory helps you gather information on and get
              connected with your future school
            </Text>
            <Text
              fontFamily='IBM Plex Sans'
              fontWeight='normal'
              fontSize='16px'
              lineHeight='26px'
              color={
                navType == 'primary'
                  ? primary.colors.ED.primary
                  : primary.colors.ED.white
              }
            >
              Whether you’re looking for a local trade school, trying to advance
              your career, get a better education to help you meet future goals
              and challenges, start your journey here.
            </Text>
          </Box>
          <Box
            w='50%'
            display='flex'
            alignItems='center'
            flexDir='column'
            gap={4}
            p={12}
            borderLeft={`1px solid ${
              navType == 'primary'
                ? primary.colors.ED.primary
                : primary.colors.ED.white
            }`}
          >
            {points.map((item) => (
              <Box
                key={item.id}
                className={style.whyEDPoints}
                alignItems='top'
                gap='13px'
              >
                <Image
                  style={{
                    filter:
                      navType == 'primary'
                        ? primary.filters.primary
                        : primary.filters.white,
                    height: '13px',
                    width: '18px',
                  }}
                  src={tick}
                  alt=''
                />
                <Text
                  color={
                    navType == 'primary'
                      ? primary.colors.ED.primary
                      : primary.colors.ED.white
                  }
                  fontFamily='IBM Plex Sans'
                  fontWeight='600'
                  fontSize='16px'
                >
                  {item.text}
                </Text>
              </Box>
            ))}
          </Box>
        </Flex>
      </Box>
    </>
    //     : <>
    //       <div className={style.whyEDContainer}>
    //         <div className={style.whyEdLeft}>
    //           <h3 className={`${style.WhyEDheading} text-white`}>
    //             Education Directory helps match you with Education institutions
    //           </h3>
    //           <p className='text-sm text-light'>
    //             Combine creativity with technological origination and development of a
    //             project from start to finish. Art programs can use interactive tools
    //             to create art through technology, to share through digital media or
    //             for business purposes such as marketing and branding.
    //           </p>
    //         </div>
    //         <div className={style.whyEDRight}>
    //           {points.map((item) => (
    //             <div key={item} className={style.whyEDPoints}>
    //               <Image className={style.whyEDIcon} src={tick} alt='' />
    //               <p className='text-base text-white'>
    //                 Here’s a really good thing about Education Directory
    //               </p>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </>
    //   }
    // </>
  );
};
export default WhyED;
