import {
  Box,
  Button,
  Container,
  Hide,
  Show,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';

import { AppContext } from '@/context/AppContext';

import { stepTwo } from '@/appConstants';
import scholarshipSvg from '@/assets/icons/scholarship.svg';
import { primary } from '@/theme';

import Checkbox from '../Checkbox';
import Loading from '../Loading';
import CustomSelect from '../Select';

export interface CurrentStatus {
  width: number;
  completed: number;
  isForward: boolean;
}

const Two = () => {
  const { stepsData, setStepsData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <Stack className='step-wrapper'>
        <Hide breakpoint={`(max-width: ${primary.breakpoints[1]})`}>
          <Text
            fontSize={['22px', '22px', '36px', '36px']}
            lineHeight={['30px', '30px', '46px', '46px']}
            fontWeight='600'
            fontFamily='IBM Plex Sans'
            align='center'
            color='ED.primary'
            pb='16px'
          >
            {stepTwo.heading}
          </Text>

          <Text
            fontSize='16px'
            lineHeight='26px'
            fontWeight='400'
            fontFamily='IBM Plex Sans'
            align='center'
            mt='0 !important'
            color='ED.dark'
          >
            {stepTwo.subHeading}
          </Text>
          <Box mt='68px !important' className='step-wrapper-body'>
            {stepTwo.options?.map((item, i) => (
              <Box
                key={i}
                h='100%'
                p='0.3rem 0'
                m='auto'
                w={primary.home.hero.card.optionsW}
              >
                <Checkbox
                  bgColor='ED.white'
                  h={primary.home.hero.card.optionBoxH}
                  clickHandler={() =>
                    setStepsData({
                      ...stepsData,
                      preferred_enrollment: item.value,
                    })
                  }
                  id={item.title}
                  name={item.title}
                  icon={item.icon}
                  checked={
                    stepsData.preferred_enrollment === item.value ? true : false
                  }
                />
              </Box>
            ))}
          </Box>
        </Hide>

        <Show breakpoint={`(max-width: ${primary.breakpoints[1]})`}>
          <Box
            h='calc(100dvh - 210px)'
            m='auto'
            display='flex'
            alignItems='center'
          >
            <Box>
              <Text
                fontSize={['22px', '22px', '36px', '36px']}
                lineHeight={['30px', '30px', '46px', '46px']}
                fontWeight='600'
                fontFamily='IBM Plex Sans'
                align='center'
                color='ED.primary'
                pb='16px'
              >
                {stepTwo.heading}
              </Text>
              <Box
                h='100%'
                p='0.3rem 0'
                m='auto'
                w={primary.home.hero.card.optionsW}
              >
                <CustomSelect
                  h='48px'
                  isInvalid={
                    stepsData.preferred_enrollment.length < 1 ? true : false
                  }
                  onSelect={({ value }) =>
                    setStepsData({
                      ...stepsData,
                      preferred_enrollment: value,
                    })
                  }
                  selectedOptions={{
                    title:
                      stepTwo.options?.find(
                        (option) =>
                          option.value === stepsData.preferred_enrollment,
                      )?.title ?? '',
                  }}
                  bg={primary.colors.ED.white}
                  icon={scholarshipSvg}
                  placeholder='Select one Answer'
                  options={stepTwo.options}
                />
              </Box>
            </Box>
            {/* ))} */}
          </Box>
        </Show>
        <Stack
          spacing='3'
          mx='auto'
          mt={[
            '16px !important',
            '0px !important',
            '52px !important',
            '104px !important',
          ]}
          mb='22px'
          className='step-wrapper-footer'
        >
          <Button
            data-testid='next-step-btn'
            id='form-get-started-step-2-fwd'
            bg='ED.primary'
            color='ED.white'
            borderRadius='26'
            w='290px'
            h='52px'
            fontFamily='IBM Plex Sans'
            fontSize='22px'
            lineHeight='30px'
            fontWeight='600'
            _hover={{ background: 'ED.primary' }}
            className={`${loading && 'cursor-disabled'}`}
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              stepsData.preferred_enrollment.length > 0 &&
                setStepsData({ ...stepsData, current: 3 });
              setLoading(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {loading ? <Loading height='32px' color='white' /> : 'Next step'}
          </Button>
          <Box
            id='form-get-started-step-2-back'
            fontSize='14px'
            lineHeight='26px'
            fontWeight='400'
            fontFamily='IBM Plex Sans'
            color='ED.fontColorLightGray'
            className='text-center'
            role='button'
            _hover={{ color: 'ED.fontColorDark', textDecoration: 'underLine' }}
            onClick={() => {
              setStepsData({ ...stepsData, current: 1 });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Previous step
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

export default React.memo(Two);
