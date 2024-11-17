import {
  Box,
  Button,
  Hide,
  Stack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '@/context/AppContext';

import emailSvg from '@/assets/icons/email.svg';
import factorialSvg from '@/assets/icons/factorial.svg';
import homeSvg from '@/assets/icons/home.svg';
import mobileSvg from '@/assets/icons/mobile.svg';
import wifiSvg from '@/assets/icons/wifi.svg';
import updateLead from '@/pages/api/leads/update';
import { primary } from '@/theme';
import { validateEmail } from '@/utils';
import { validatePhone, validatePhoneNumber } from '@/utils/fieldvalidation';

import AddressAutocomplete from '../AutoComplete/Places';
import Input from '../Input';
import Loading from '../Loading';
import Select from '../Select';

const Five = () => {
  const { stepsData, setStepsData, updateStepsState, createLead, leadData } =
    useContext(AppContext);
  const [isMobile] = useMediaQuery(`(max-width: ${primary.breakpoints[1]})`);
  const [validateFields, setValidateFields] = useState(false);
  const [, setAddress] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false as boolean);
  const [loading, setLoading] = useState(false);
  const { email, phone, address_line1, computer_internet_access } = stepsData;

  useEffect(() => {
    setAddress(address_line1);
  }, [address_line1]);

  const handleAddressSelect = (address: string, zipCode: string) => {
    updateStepsState({
      address_line1: address,
      zip_code: zipCode,
    });
  };

  async function clickHandler() {
    {
      setLoading(true);
      if (email.trim().length < 3) {
        setIsValidEmail(false);
        setValidateFields(true);
        setLoading(false);
        return;
      }

      const isEmailvalid: boolean = await validateEmail(email);
      setIsValidEmail(isEmailvalid);

      const validfields =
        email.length > 2 &&
        isEmailvalid &&
        phone.length === 10 &&
        address_line1.length > 0 &&
        computer_internet_access.length > 0
          ? true
          : false;

      if (!validfields) {
        setLoading(false);
        setValidateFields(true);
        return;
      }

      if (leadData.lead === undefined) {
        await createLead();
      } else {
        const {
          address_line1,
          city,
          state,
          zip_code,
          computer_internet_access,
        } = stepsData;

        try {
          await Promise.all([
            updateLead('address', leadData.address.address_id, {
              address_line_one: address_line1,
              city,
              state,
              zip_code,
            }),
            updateLead(
              'qualification',
              leadData.qualification.qualification_id,
              {
                computer_internet_access,
              },
            ),
          ]);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error updating leads:', error);
        }
      }
      setStepsData({ ...stepsData, current: 6 });
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  return (
    <Stack
      data-testid='step5'
      className='step-wrapper'
      mt={['120px', '150px', '26px', '52px']}
    >
      <Text
        fontSize={['22px', '22px', '36px', '36px']}
        lineHeight={['30px', '30px', '46px', '46px']}
        fontWeight='600'
        fontFamily='IBM Plex Sans'
        align='center'
        color='ED.primary'
        pb='0.75'
        pt='2px'
      >
        Contact details
      </Text>
      <Hide breakpoint={`(max-width: ${primary.breakpoints[1]})`}>
        <Text
          fontSize='md'
          fontWeight='400'
          fontFamily='IBM Plex Sans'
          align='center'
          mt='0 !important'
          color='ED.dark'
        >
          Please answer all the questions
        </Text>
      </Hide>
      <Box
        mt={[
          '16px !important',
          '16px !important',
          '52px !important',
          '52px !important',
        ]}
        className='step-wrapper-body'
        w={['100%', '390px', '390px', '390px']}
      >
        <Input
          icon={validateFields && !isValidEmail ? factorialSvg : emailSvg}
          type='email'
          id='email'
          bg={isMobile ? primary.colors.ED.white : primary.colors.ED.light}
          value={email}
          placeholder='Email Address'
          isInvalid={validateFields && !isValidEmail ? true : false}
          onChange={(e) => {
            setStepsData({ ...stepsData, email: e.target.value });
            setValidateFields(false);
          }}
        />
        <Box
          mt='4'

          // className='row' flexDirection={isMobile ? 'column' : 'row'}
        >
          <Input
            bg={isMobile ? primary.colors.ED.white : primary.colors.ED.light}
            icon={
              validateFields && stepsData.phone.length !== 10
                ? factorialSvg
                : mobileSvg
            }
            id='phone'
            type='tel'
            value={validatePhone(stepsData.phone)}
            placeholder='Phone number'
            maxLength={14}
            isInvalid={
              validateFields &&
              !validatePhoneNumber(stepsData.phone) &&
              stepsData.phone.length !== 10
                ? true
                : false
            }
            onChange={(e) => {
              const phoneValue = e.target.value.replace(/[^+\d]+/g, '');
              setStepsData({
                ...stepsData,
                phone: phoneValue,
              });
            }}
          />
        </Box>
        <Box my='4' data-testid='places'>
          <AddressAutocomplete
            onSelectAddress={handleAddressSelect}
            invalid={validateFields && stepsData.address_line1.length < 1}
            icon={homeSvg}
            placeholder='Enter your address'
            bg={isMobile ? primary.colors.ED.white : primary.colors.ED.light}
            onChange={() => 'changeAddress'}
            value={stepsData.address_line1}
          />
        </Box>
        <Select
          icon={wifiSvg}
          isInvalid={
            validateFields && computer_internet_access.length == 0
              ? true
              : false
          }
          bg={isMobile ? primary.colors.ED.white : primary.colors.ED.light}
          placeholder='Do you have access to the internet?'
          selectedOptions={{
            title: computer_internet_access,
          }}
          options={[
            { title: 'Yes', value: 'Yes' },
            { title: 'No', value: 'No' },
          ]}
          onSelect={({ value }) =>
            setStepsData({
              ...stepsData,
              computer_internet_access: value,
            })
          }
        />
      </Box>
      <Stack
        spacing='3'
        mt={[
          '26px !important',
          '52px !important',
          '52px !important',
          '52px !important',
        ]}
        mb='22px'
        className='step-wrapper-footer'
      >
        <Button
          data-testid='step5-next-btn'
          id='form-get-started-step-5-fwd'
          bg='ED.primary'
          color='ED.white'
          borderRadius='26'
          w='290px'
          h='52px'
          fontFamily='IBM Plex Sans'
          fontSize='xl'
          fontWeight='600'
          _hover={{ background: 'ED.primary' }}
          className={`${loading && 'cursor-disabled'}`}
          onClick={clickHandler}
        >
          {loading ? <Loading height='32px' color='white' /> : 'Next step'}
        </Button>
        <Box
          id='form-get-started-step-5-back'
          fontSize='xs'
          fontWeight='400'
          fontFamily='IBM Plex Sans'
          color='ED.fontColorLightGray'
          className='text-center'
          role='button'
          _hover={{ color: 'ED.fontColorDark', textDecoration: 'underLine' }}
          onClick={() => {
            setStepsData({ ...stepsData, current: 4 });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Previous step
        </Box>
      </Stack>
    </Stack>
  );
};

export default Five;
