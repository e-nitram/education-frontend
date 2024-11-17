import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import AddressAutocomplete from '@/components/AutoComplete/Places';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import Select from '@/components/Select';

import { AppContext } from '@/context/AppContext';

import emailSvg from '@/assets/icons/email.svg';
import homeSvg from '@/assets/icons/home.svg';
import mobileSvg from '@/assets/icons/mobile.svg';
import wifiSvg from '@/assets/icons/wifi.svg';
import { primary } from '@/theme';
import { openInNewTab, validateEmail } from '@/utils';
import { validatePhone, validatePhoneNumber } from '@/utils/fieldvalidation';

const StepFiveForm = () => {
  const router = useRouter();
  const { stepsData, setStepsData, updateStepsState } = useContext(AppContext);
  const [validateFields, setValidateFields] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setFieldsValidated] = useState(false);

  const { email, phone, zip_code, address_line1, computer_internet_access } =
    stepsData;

  const handleAddressSelect = useCallback(
    (address: string, zipCode: string) => {
      setValidateFields(false);
      updateStepsState({
        address_line1: address,
        zip_code: zipCode,
      });
    },
    [updateStepsState],
  );

  const validateFormFields = async () => {
    setIsLoading(true);
    setValidateFields(true);
    const isEmailvalid: boolean =
      email.length > 0 ? await validateEmail(email) : false;
    setIsValidEmail(isEmailvalid);
    setIsLoading(false);

    const validateFieldsData =
      email.length > 0 &&
      isEmailvalid &&
      phone.length === 10 &&
      zip_code.length === 5 &&
      address_line1.length > 0 &&
      computer_internet_access.length > 0;
    if (validateFieldsData) {
      openInNewTab('/get-started');
    }
    setFieldsValidated(validateFieldsData);
  };

  useEffect(() => {
    setValidateFields(false);
    setFieldsValidated(false);
  }, [router]);

  return (
    <Box
      className='overview__card__wrapper'
      pt={['42px', '42px', '42px', '44px']}
    >
      <Box m='auto' w={['100%', '100%', '390px', '397px']}>
        <Box>
          <Input
            icon={emailSvg}
            value={stepsData.email}
            type='email'
            placeholder='Email Address'
            isInvalid={validateFields && !isValidEmail}
            onChange={(e) => {
              setValidateFields(false);
              setStepsData({
                ...stepsData,
                email: e.target.value,
              });
            }}
          />
        </Box>
        {/* <div className='aoi__form__multiCols'> */}
        <div className='my-4'>
          <Input
            icon={mobileSvg}
            type='tel'
            maxLength={14}
            value={validatePhone(stepsData.phone)}
            placeholder='Phone number'
            isInvalid={
              validateFields &&
              !validatePhoneNumber(stepsData.phone) &&
              stepsData.phone.length !== 10
                ? true
                : false
            }
            onChange={(e) => {
              setValidateFields(false);
              setStepsData({
                ...stepsData,
                phone: e.target.value.replace(/[^+\d]+/g, ''),
              });
            }}
          />
        </div>

        <div className='my-4'>
          <AddressAutocomplete
            onSelectAddress={handleAddressSelect}
            invalid={validateFields && stepsData.address_line1?.length < 1}
            icon={homeSvg}
            placeholder='Enter your address'
            bg={primary.colors.ED.light}
            onChange={() => 'change hand address'}
            value={stepsData.address_line1}
          />
        </div>
        <Box mt='16px'>
          <Select
            icon={wifiSvg}
            isInvalid={
              validateFields && !(computer_internet_access.length > 0)
                ? true
                : false
            }
            placeholder='Do you have internet at home?'
            options={[
              { title: 'Yes', value: 'Yes' },
              { title: 'No', value: 'No' },
            ]}
            selectedOptions={{
              title: stepsData.computer_internet_access,
            }}
            onSelect={({ value }) => {
              setValidateFields(false);
              setStepsData({
                ...stepsData,
                computer_internet_access: value,
              });
            }}
          />
        </Box>

        <div className='aoi__form__buttonWrapper'>
          <Button
            mt='52px'
            bg='ED.primary'
            color='ED.white'
            borderRadius='26'
            w='290px'
            h='52px'
            fontFamily='IBM Plex Sans'
            fontSize='xl'
            fontWeight='600'
            _hover={{ background: 'ED.primary' }}
            onClick={validateFormFields}
            className='btn-primary h4 h-btn text-white'
          >
            {isLoading ? <Loading height='32px' color='white' /> : 'Next step'}
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default StepFiveForm;
