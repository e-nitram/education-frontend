import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

import { primary } from '@/theme';
import { ICareer } from '@/typings';

const Careers: FC<ICareer> = (props) => {
  const {
    careers_heading,
    careers_first_sub_heading,
    careers_first_sub_heading_text,
    careers_list,
    careers_second_sub_heading,
    careers_text,
    careers_second_sub_heading_text,
  } = props;

  const { colors, fontSizes, fonts, careers } = primary;
  return (
    <Box id='careers' className='primaryContainer' pt={careers.pt} pb='110px'>
      <SimpleGrid columns={[1, 1, 2, 2]}>
        <Box>
          <Heading
            fontSize={fontSizes.titleFonts}
            fontFamily={fonts.ED.secondary}
            color={colors.ED.primary}
            fontWeight='medium'
            lineHeight={fontSizes.headingsLH}
          >
            {careers_heading}
          </Heading>
        </Box>
      </SimpleGrid>
      <SimpleGrid columns={careers.cols} spacing={careers.spacing}>
        <Box maxW={['100%', '100%', '591px', '811px']} w='100%'>
          <Text
            fontSize='16px'
            fontFamily={fonts.ED.primary}
            color={colors.ED.dark}
            fontWeight='normal'
            pt={['16px', '16px', '16px', '26px']}
            lineHeight='26px'
          >
            {careers_text}
          </Text>
          <Heading
            fontSize='22px'
            fontFamily={fonts.ED.primary}
            color={colors.ED.primary}
            fontWeight='semibold'
            mt={['42px', '42px', '26px', '26px']}
            lineHeight='30px'
          >
            {careers_first_sub_heading}
          </Heading>
          <Text
            fontSize='16px'
            fontFamily={fonts.ED.primary}
            color={colors.ED.dark}
            fontWeight='normal'
            pt='16px'
            lineHeight='26px'
          >
            {careers_first_sub_heading_text}
          </Text>
          <Heading
            fontSize='22px'
            fontFamily={fonts.ED.primary}
            color={colors.ED.primary}
            fontWeight='semibold'
            lineHeight='30px'
            mt={['42px', '42px', '26px', '26px']}
          >
            {careers_second_sub_heading}
          </Heading>
          <Text
            fontSize='16px'
            fontFamily={fonts.ED.primary}
            color={colors.ED.dark}
            fontWeight='normal'
            pt='16px'
            lineHeight='26px'
          >
            {careers_second_sub_heading_text}
          </Text>
        </Box>
        <Box className='flex-end' mt={careers.lists.mt}>
          <ul className='career__lists__wrapper'>
            {careers_list?.split(/;/)?.map((name: string, id: number) => (
              <li key={name + id} className='ml-5 text-primary'>
                <Text
                  fontSize='16px'
                  fontFamily={fonts.ED.primary}
                  color={colors.ED.primary}
                  fontWeight='normal'
                  pt='26px'
                  lineHeight='26px'
                >
                  {name}{' '}
                </Text>
              </li>
            ))}
          </ul>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Careers;
