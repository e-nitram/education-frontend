import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import ReactGA from 'react-ga';

import Step from '@/components/Step';

import { howItWorksData } from '@/appConstants';
import { primary } from '@/theme';

type IProps = {
  navType: string;
};
const HowItWorks: React.FC<IProps> = ({ navType }) => {
  const handleGetStarted = () => {
    ReactGA.event({
      category: 'How it works',
      action: 'Get Started',
      label: 'How it works',
    });
  };

  const router = useRouter();

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
      >
        <VStack p='25px 41px 63px 41px'>
          <Text
            fontFamily='IBM Plex Sans'
            fontWeight='500'
            fontSize='32px'
            lineHeight='44px'
            color={
              navType == 'primary'
                ? primary.colors.ED.primary
                : primary.colors.ED.white
            }
          >
            3 Easy Steps to get matched
          </Text>
          <Flex justifyContent='space-between' flexWrap='wrap'>
            {howItWorksData.map(({ id, content, icon, stepNumber }) => (
              <Step
                navModal={true}
                key={id}
                stepNumber={stepNumber}
                content={content}
                icon={icon}
                navType={navType}
              />
            ))}
            <Box m='auto' w='30%' marginTop='70px'>
              <a href='/get-started' target='_blank'>
                <Button
                  bg='ED.secondary'
                  color='ED.white'
                  className='btn-secondry h-btn'
                  _hover={{ background: 'ED.secondary' }}
                  borderRadius='50'
                  boxShadow='3px 3px 15px #00000050'
                  minH='52px'
                  onClick={() => {
                    handleGetStarted();
                    router.push('/get-started');
                  }}
                >
                  Get Started
                </Button>
              </a>
            </Box>
          </Flex>
        </VStack>
      </Box>
    </>
  );
};
export default HowItWorks;
