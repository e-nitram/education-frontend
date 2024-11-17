import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Img } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

import { primary } from '@/theme';

import style from './index.module.css';

type ProgramSlug = {
  slug: string;
  text: string;
  image: string;
  title: string;
};

type IProps = {
  header?: boolean;
  headerTitle?: string;
  loading?: boolean;
  data: ProgramSlug[];
  currentCount?: number;
  onClick?: () => void;
  device: string;
};

const AOICard: FC<IProps> = ({
  header = false,
  headerTitle,
  data,
}): JSX.Element => {
  const { cardImg, img } = style;
  const { home, fontSizes, aoi } = primary;

  return (
    <Box className='primaryContainer'>
      {header && (
        <Heading
          maxW={aoi.cardsSection.titleW}
          m='auto'
          textAlign='center'
          fontWeight='500'
          fontSize={fontSizes.titleFontMobile}
          lineHeight={fontSizes.headingsLH}
          color='ED.fontColorPrimary'
          fontFamily='ED.secondary'
        >
          {headerTitle}
        </Heading>
      )}

      <SimpleGrid
        columns={[1, 2, 3, 3]}
        spacingX='16px'
        rowGap={['26px', '26px', '26px', '26px']}
        pt={home.aoiCards.cardsPT}
      >
        {data.length !== 0 &&
          data?.map(
            ({ slug, text, image, title }: ProgramSlug, index: number) => (
              <Box
                key={`card-${slug}-${index}`}
                w='auto'
                bg={primary.colors.ED.white}
                boxShadow='0px 3px 6px #00000029'
                borderRadius='8px'
              >
                <Link href={`/area-of-interest/${slug}`}>
                  <Box h={home.aoiCards.imgH} className={cardImg}>
                    <Img
                      src={image}
                      width='0'
                      loading='lazy'
                      sizes='100%'
                      className={img}
                      alt={text}
                    />
                  </Box>
                  <Box p={home.aoiCards.contentP} fontFamily='IBM Plex Sans'>
                    <Text
                      color='ED.fontColorPrimary'
                      textTransform='uppercase'
                      fontWeight='semibold'
                      fontFamily={primary.fonts.ED.primary}
                      lineHeight='30px'
                      fontSize='22px'
                    >
                      {title}
                    </Text>
                    <Text
                      noOfLines={[5, 5, 4, 3]}
                      fontSize='16px'
                      pt={home.aoiCards.descPT}
                      fontWeight='normal'
                      fontFamily={primary.fonts.ED.primary}
                      color={primary.colors.ED.dark}
                    >
                      {text}
                    </Text>
                  </Box>
                </Link>
              </Box>
            ),
          )}
      </SimpleGrid>
    </Box>
  );
};

export default AOICard;
