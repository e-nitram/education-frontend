'use client';

import { useMediaQuery } from '@chakra-ui/react';
import Link from 'next/link';
import React, { FC, useContext, useEffect, useMemo, useState } from 'react';

import { AppContext } from '@/context/AppContext';

import emailSvg from '@/assets/icons/email.svg';
import homeSvg from '@/assets/icons/home.svg';
import mobileSvg from '@/assets/icons/mobile.svg';
import userSvg from '@/assets/icons/user.svg';
import updateLead from '@/pages/api/leads/update';
import { primary } from '@/theme';
import { formatPhoneNumber, validateEmail } from '@/utils';
import { validatePhone } from '@/utils/fieldvalidation';

import AddressAutocomplete from '../AutoComplete/Places';
import Input from '../Input';
import Loading from '../Loading';

import styles from './index.module.css';

type TProp = {
  readonly primaryForm?: boolean;
  readonly textColorBlack: boolean;
  readonly termsColor?: string;
};
const ProgramsForm: FC<TProp> = ({ textColorBlack }: TProp) => {
  const { stepsData, setStepsData, leadData, createLead } =
    useContext(AppContext);
  const [isMobile] = useMediaQuery(`(max-width: ${primary.breakpoints[1]})`);
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [leadId, setLeadId] = useState<null | string>(null);

  const enabled = useMemo(() => {
    return (
      stepsData.first_name.length >= 3 &&
      stepsData.last_name.length >= 3 &&
      stepsData.email.length > 5 &&
      stepsData.phone.length === 10 &&
      stepsData.address_line1.length > 4
    );
  }, [stepsData]);

  useEffect(() => {
    function checkLeadId() {
      const leadid_token = document.getElementById(
        'leadid_token',
      ) as HTMLInputElement;

      if ('' !== leadid_token?.value) {
        setLeadId(leadid_token?.value);
        clearInterval(interval);
      }
    }

    // Set the interval inside the useEffect
    const interval = setInterval(checkLeadId, 1000);

    // Clear the interval when the component unmounts or when leadId changes
    return () => {
      clearInterval(interval);
    };
  }, [leadId]);

  const clickHandler = async () => {
    setLoading(true);

    if (enabled) {
      setLoading(false);
      return;
    }

    if (!isValidEmail || !isValidAddress || !isValidName || !isValidPhone) {
      setLoading(false);
      return;
    }

    setStepsData({
      ...stepsData,
      tcpa: `By clicking this button, I consent to representatives of Education Directory and University Bound to contact me about educational opportunities via email, text, or phone, including my mobile phone number ${formatPhoneNumber(
        stepsData?.phone,
      )} using an automatic dialer. Message and data rates may apply. I understand that my consent is not a requirement for enrollment, and I may withdraw my consent at any time.`,
    });

    localStorage.setItem('stepsState', JSON.stringify(stepsData));

    // Get Trusted Form scripts data from DOM
    const formToken = (
      document.getElementById('xxTrustedFormToken_0') as HTMLInputElement
    )?.value
      ?.split('/')
      .pop();
    const traffic_trustedform_token = formToken ?? '';
    const formCert = (
      document.getElementById('xxTrustedFormCertUrl_0') as HTMLInputElement
    )?.value;
    const traffic_trusted_form_url = formCert;

    const traffic_jornaya_leadid = leadId;

    // Pull existing Trusted Form data from localstorage
    const scriptsFromLS = localStorage.getItem('trustedForm');
    const storedScriptsData =
      scriptsFromLS != null ? JSON.parse(scriptsFromLS) : {};

    // Override traffic values
    const trustedForm = {
      ...storedScriptsData,
      traffic_jornaya_leadid: traffic_jornaya_leadid,
      traffic_trustedform_token: traffic_trustedform_token,
      traffic_trusted_form_url: traffic_trusted_form_url,
    };

    localStorage.setItem('trustedForm', JSON.stringify(trustedForm));

    const locl = localStorage.getItem('leadRes');
    const localparse = locl !== null ? JSON.parse(locl) : '';
    const profile_id =
      leadData?.profile?.profile_id ?? localparse.profile?.profile_id;
    const newLead = createLead();
    const newProfile = updateLead('profile', profile_id, {
      first_name: stepsData.first_name,
      last_name: stepsData.last_name,
    });
    //  Update consent object of current lead
    const consent_id =
      leadData?.consent?.consent_id ?? localparse.consent?.consent_id;
    const newConsent = updateLead('consent', consent_id, {
      tcpa_text_traffic: stepsData.tcpa,
    });

    await Promise.all([newLead, newProfile, newConsent]);

    setStepsData({
      ...stepsData,
      applyNow: false,
      current: 1,
    });

    // Didn't work. Not sure why not.
    // router.push('/get-started');
  };

  const handleAddressSelect = (address: string, zipCode: string) => {
    setStepsData((prev: any) => ({
      ...prev,
      address_line1: address,
      zip_code: zipCode,
    }));
    setIsValidAddress(true);
  };

  return (
    <>
      <form className='max-w-[360px]'>
        <div className='m-auto flex w-full flex-col gap-4 md:w-80 lg:w-[390px]'>
          <Input
            icon={emailSvg}
            value={stepsData.email}
            isInvalid={!isValidEmail}
            type='email'
            placeholder='Email Address'
            onChange={(e) => {
              setStepsData({ ...stepsData, email: e.target.value });
            }}
            onBlur={async () => {
              setIsValidEmail(await validateEmail(stepsData.email));
            }}
          />
          <Input
            icon={mobileSvg}
            type='tel'
            isInvalid={!isValidPhone}
            value={validatePhone(stepsData.phone)}
            placeholder='Phone number'
            maxLength={14}
            onChange={(e) =>
              setStepsData({
                ...stepsData,
                phone: e.target.value.replace(/[^+\d]+/g, ''),
              })
            }
            onBlur={() => {
              setIsValidPhone(10 == stepsData.phone.length);
            }}
          />
          <div className='grid grid-cols-2 gap-4'>
            <Input
              type='text'
              placeholder='First Name'
              value={stepsData.first_name}
              icon={userSvg}
              isInvalid={!isValidName}
              onChange={(e) =>
                setStepsData({ ...stepsData, first_name: e.target.value })
              }
              onBlur={() => {
                setIsValidName(3 < stepsData.first_name.length);
              }}
            />
            <Input
              type='text'
              placeholder='Last Name'
              value={stepsData.last_name}
              icon={userSvg}
              isInvalid={!isValidName}
              onChange={(e) =>
                setStepsData({ ...stepsData, last_name: e.target.value })
              }
              onBlur={() => {
                setIsValidName(3 < stepsData.last_name.length);
              }}
            />
          </div>
          <AddressAutocomplete
            onSelectAddress={handleAddressSelect}
            invalid={!isValidAddress}
            icon={homeSvg}
            placeholder='Enter your address'
            bg={isMobile ? primary.colors.ED.white : primary.colors.ED.light}
            value={stepsData.address_line1}
          />
          <div className='flex flex-row items-start'>
            <input type='checkbox' id='leadid_tcpa_disclosure_aoi' required />
            <label htmlFor='leadid_tcpa_disclosure_aoi'>
              <p
                className={`${
                  textColorBlack ? 'text-dark' : 'text-lotion'
                } ml-3 text-justify text-xs leading-tight`}
              >
                By checking this box, I consent to representatives of Education
                Directory and University Bound to contact me about educational
                opportunities via email, text, or phone, including my mobile
                phone number {formatPhoneNumber(stepsData?.phone)} using an
                automatic dialer. Message and data rates may apply. I understand
                that my consent is not a requirement for enrollment, and I may
                withdraw my consent at any time.
              </p>
            </label>
          </div>
          <div className={styles.buttonWrapper} style={{ textAlign: 'center' }}>
            {enabled ? (
              <Link href='/get-started'>
                <button
                  onClick={() => clickHandler()}
                  className='color-white z-10 h-[52px] w-[287px] rounded-full bg-secondary font-sans text-md font-[600] text-white'
                >
                  Apply now
                </button>
              </Link>
            ) : (
              <button className='color-white z-10 h-[52px] w-[287px] rounded-full bg-secondary font-sans text-md font-[600] text-white'>
                {loading ? (
                  <Loading height='32px' color='white' />
                ) : (
                  'Fill above'
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default ProgramsForm;
