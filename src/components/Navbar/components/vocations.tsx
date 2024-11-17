import { Box, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { FC, useContext } from 'react';

import { AppContext } from '@/context/AppContext';

import { primary } from '@/theme';

type IProps = {
  onClose?: () => void;
  navType: string;
};

const Vocations: FC<IProps> = (props) => {
  const { onClose } = props;
  const { navType } = props;
  const { programSlug } = useContext(AppContext);

  return (
    <>
      <Box
        bg={
          navType == 'primary'
            ? primary.colors.ED.white
            : primary.colors.ED.primary
        }
        w='100%'
        borderRadius='6'
        className='primaryContainer'
        p={['26px']}
      >
        <VStack alignItems='flex-start' my='0px'>
          {programSlug.length > 0 &&
            programSlug?.map((item) => (
              <Link
                key={item.slug}
                style={{ margin: '0' }}
                href={`/area-of-interest/${item.slug}`}
                onClick={() => onClose && onClose()}
              >
                <Text
                  key={item.slug}
                  mb='16px'
                  textTransform='capitalize'
                  fontFamily='IBM Plex Sans'
                  fontWeight='600'
                  fontSize={primary.fontSizes.subheaderFonts}
                  lineHeight='30px'
                  color={
                    navType == 'primary'
                      ? primary.colors.ED.primary
                      : primary.colors.ED.white
                  }
                >
                  {item.title}
                </Text>
              </Link>
            ))}
        </VStack>
      </Box>
    </>
  );
};
export default Vocations;
