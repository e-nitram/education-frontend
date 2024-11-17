import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useContext } from 'react';

import { AppContext } from '@/context/AppContext';

import { primary } from '@/theme';

import styles from './index.module.css';

const { masonryContainer, masonryItem } = styles;

const Institutes = () => {
  const { uniList } = useContext(AppContext);

  // Sort the categories based on two factors: alphabetical order and amount of content
  const sortedCategories = Object.keys(uniList).sort((a, b) => {
    // Sort alphabetically
    if (a < b) return -1;
    if (a > b) return 1;

    // If titles are the same, sort by the number of subjects in each category
    return uniList[b].length - uniList[a].length;
  });

  return (
    <Stack className='primaryContainer' spacing={[4, 6, 8]}>
      <Heading
        maxW={['inherit', 'inherit', '624px', '811px']}
        m='auto'
        textAlign='center'
        fontWeight='500'
        fontSize={primary.fontSizes.titleFontMobile}
        color='ED.fontColorPrimary'
        fontFamily='ED.secondary'
      >
        Areas of Interests & Subjects
      </Heading>
      <Box maxW='100%' className={masonryContainer}>
        {sortedCategories.map((category, idx) => (
          <Box key={idx} className={masonryItem}>
            <Text
              color='ED.fontColorPrimary'
              fontFamily={primary.fonts.ED.primary}
              fontWeight='600'
              fontSize='22px'
              textTransform='uppercase'
              mb={['16px', '16px', '16px', '22px']}
              lineHeight='30px'
            >
              {category.replace(' Careers', '')}
            </Text>
            {uniList[category]?.map((subject: any, i: number) => (
              <Link
                href={`../subjects/${subject.slug}`}
                key={`${subject.slug}-${i}`}
                style={{ textDecoration: 'none' }}
              >
                <Text
                  key={i}
                  color='ED.fontColorDark'
                  fontSize='16px'
                  fontFamily={primary.fonts.ED.primary}
                  fontWeight='medium'
                  mb='10px'
                  lineHeight='26px'
                >
                  {subject.title}
                </Text>
              </Link>
            ))}
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default Institutes;
