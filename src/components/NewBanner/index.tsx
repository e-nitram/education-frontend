import { Box, Flex } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import styles from './index.module.css';

const { overlayCover, overlayCoverQuote } = styles;

type IProps = {
  height?: string | string[];
  isVideo?: boolean;
  isParallax?: boolean;
  src: string | undefined;
  type?: string;
  children?: ReactNode | ReactNode[];
};

interface DynamicKey {
  [key: string]: string;
}
const NewBanner: FC<IProps> = (props): JSX.Element => {
  const {
    height,
    isVideo = false,
    isParallax = false,
    children,
    src,
    type = 'hero',
  } = props;

  const overlayCoverClass: DynamicKey = {
    quote: overlayCoverQuote,
    hero: overlayCover,
  };

  return (
    <>
      <Flex h={height} w='100%' pos='relative'>
        <Box className={overlayCoverClass[type]} />
        {isVideo ? (
          <>
            <Box
              as='video'
              autoPlay
              muted
              playsInline
              src={src}
              w='inherit'
              h={height}
              pos={isParallax ? 'fixed' : 'unset'}
              objectFit='cover'
            />
            {children}
          </>
        ) : (
          <>
            <Box
              backgroundImage={`url(${src})`}
              backgroundAttachment={isParallax ? 'fixed' : 'unset'}
              backgroundPosition='center'
              backgroundRepeat='no-repeat'
              backgroundSize='cover'
              objectFit='cover'
              height={height}
              pos='absolute'
              width='100%'
            >
              {children}
            </Box>
          </>
        )}
      </Flex>
    </>
  );
};

export default NewBanner;
