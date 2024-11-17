import { Heading } from '@chakra-ui/react';

import { primary } from '@/theme';

const MyComponent = ({ heading }: any) => {
  const { colors, fonts, fontSizes } = primary;

  return (
    <Heading
      fontFamily={fonts.ED.secondary}
      fontWeight={500}
      fontSize={fontSizes.titleFonts}
      lineHeight={fontSizes.headingsLH}
      textAlign='left'
      color={colors.ED.primary}
    >
      {heading}
    </Heading>
  );
};

export default MyComponent;
