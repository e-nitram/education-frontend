import {
  Box,
  Button,
  Container,
  Hide,
  Show,
  Stack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';

import { AppContext } from '@/context/AppContext';

import { stepOne } from '@/appConstants';
import scholarshipSvg from '@/assets/icons/scholarship.svg';
import { primary } from '@/theme';

import Checkbox from '../Checkbox';
import Loading from '../Loading';
import Select from '../Select';

const One = () => {
  const [loading, setLoading] = useState(false);
  const { stepsData, setStepsData } = useContext(AppContext);
  const [validateFields, setValidateFields] = useState(false);
  const [xl] = useMediaQuery(`(max-width: ${primary.breakpoints[3]})`);

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
            I’d Like my Classes{' '}
          </Text>

          <Text
            fontSize='16px'
            lineHeight='26px'
            fontWeight='400'
            fontFamily='IBM Plex Sans'
            align='center'
            mt='0 !important'
            color={
              validateFields && stepsData.online_or_campus.length < 1
                ? primary.colors.ED.danger
                : 'ED.dark'
            }
          >
            Select one answer
          </Text>
          <Box mt='68px !important' className='step-wrapper-body'>
            {stepOne.options.map((item, i) => (
              <Box
                key={i}
                h='100%'
                p='0.3rem 0'
                m='auto'
                w={primary.home.hero.card.optionsW}
              >
                <Checkbox
                  h={primary.home.hero.card.optionBoxH}
                  clickHandler={() =>
                    setStepsData({
                      ...stepsData,
                      online_or_campus: item.value,
                    })
                  }
                  id={`location-${item.value}`}
                  name={item.title}
                  icon={item.icon}
                  checked={
                    stepsData.online_or_campus === item.value ? true : false
                  }
                  data-testid={`cy-${item.value}`}
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
                I’d Like my Classes
              </Text>
              {/* {stepTwo.options.map((item, i) => ( */}
              <Box
                // h='100%'
                p='0.3rem 0'
                m='auto'
                // w={primary.home.hero.card.optionsW}
              >
                <Select
                  isInvalid={
                    validateFields && stepsData.online_or_campus.length < 1
                      ? true
                      : false
                  }
                  h={xl ? '66px' : '52px'}
                  onSelect={({ value }) =>
                    setStepsData({
                      ...stepsData,
                      online_or_campus: value,
                    })
                  }
                  bg={primary.colors.ED.lotion}
                  icon={scholarshipSvg}
                  placeholder='Select one Answer'
                  selectedOptions={{
                    title:
                      stepOne.options.find(
                        (option) => option.value === stepsData.online_or_campus,
                      )?.title ?? '',
                  }}
                  options={stepOne.options}
                  data-testid='cy-location'
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
            '0px !important',
            '0px !important',
            '52px !important',
            '104px !important',
          ]}
          mb='22px'
          className='step-wrapper-footer'
        >
          <Button
            bg='ED.primary'
            id='form-get-started-step-1-fwd'
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
              if (stepsData.online_or_campus.length < 1) {
                setValidateFields(true);
                setLoading(false);
                return;
              }
              stepsData.preferred_enrollment?.length > 0 &&
                setStepsData({ ...stepsData, current: 2 });
              setLoading(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {loading ? <Loading height='32px' color='white' /> : 'Next step'}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default React.memo(One);
