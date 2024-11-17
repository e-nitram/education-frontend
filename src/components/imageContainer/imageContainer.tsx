import { useMediaQuery } from '@chakra-ui/media-query';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';

import { primary } from '@/theme';

const ImageContainer = ({ imageUrl }: any) => {
  const [isMobile] = useMediaQuery(`(max-width: ${primary.breakpoints[1]})`);
  const marginTopOnMobile = isMobile ? '42px' : '0px';
  const marginLeftOnMobile = '0px';
  const { imageContainers } = primary;
  return (
    <Box
      width={imageContainers.areasOfInterestW}
      height={imageContainers.areasOfInterestH}
      borderRadius='md'
      overflow='hidden'
      boxShadow='base'
      mt={marginTopOnMobile}
      ml={marginLeftOnMobile}
    >
      <Box position='relative' width='100%' height='100%'>
        <Image
          src={imageUrl}
          alt='Image'
          loading='lazy'
          sizes='100%'
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </Box>
    </Box>
  );
};

export default ImageContainer;
