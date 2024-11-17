'use client';

/**
 * Miniform
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { submitForm } from './actions';

type MiniFormProps = {
  tcpa?: {
    text?: string | null;
    checkbox?: boolean;
    precheck?: boolean;
  };
  styling?: {
    bg?: string;
    text?: string;
    buttonBg?: string;
    buttonText?: string;
    tcpa?: string;
  };
  subject?: string;
};

type SubmitButtonProps = {
  styling?: {
    text?: string;
    color?: string;
  };
};

/**
 * Creates a submission button that manages a loading state to render an appropriate message.
 *
 * @param {{text: string; color: string}} styling an optional configuration parameter that specifies colors for the text and backgound of the button. Default values are text: 'lotion' and color: 'secondary'
 */
function SubmitButton({
  styling = { text: 'lotion', color: 'secondary' },
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      id='submit-form-mini'
      aria-disabled={pending}
      className={`shadow-drop rounded-full bg-${styling.color} py-3 text-center text-md font-semibold text-${styling.text}`}
    >
      {true == pending ? 'Submitting...' : 'Get started'}
    </button>
  );
}

export default function MiniForm({
  tcpa = {
    text: 'By clicking this button, I consent to representatives of Education Directory and University Bound to contact me about educational opportunities via email, text, or phone, including my mobile phone number using an automatic dialer. Message and data rates may apply. I understand that my consent is not a requirement for enrollment, and I may withdraw my consent at any time.',
    checkbox: false,
    precheck: true,
  },
  styling = {
    bg: 'white',
    text: 'primary',
    buttonBg: 'secondary',
    buttonText: 'lotion',
    tcpa: 'black',
  },
  subject = 'MiniForm',
}: MiniFormProps) {
  const [state, formAction] = useFormState(submitForm, null);
  const errors = state?.details;

  return (
    <>
      <div className={`rounded-lg shadow-outset bg-${styling.bg} p-6`}>
        <h1
          className={`text-center font-sans text-lg font-semibold text-${styling.text}`}
        >
          Get Started
        </h1>
        <form
          className='m-autogap-4 flex w-full flex-col gap-4 md:w-80 lg:w-[390px] '
          action={formAction}
          autoComplete='on'
          id='mini-form'
        >
          <input
            type='text'
            name='email'
            placeholder='Email Address'
            id='email'
            autoComplete='email'
            pattern='^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'
            className={`shadow-field w-full rounded-full border bg-lotion p-5 font-sans text-sm font-semibold text-${styling.text} placeholder-${styling.text} invalid:border-red focus:border-${styling.text} focus:ring-primary`}
          />
          {true == errors?.includes('email') && (
            <p className='border-red px-5 text-sm font-semibold text-red'>
              Please enter a different email
            </p>
          )}
          <input
            type='text'
            name='phone'
            placeholder='Phone Number'
            id='phone'
            autoComplete='tel'
            pattern='^\d{10}$'
            className={`shadow-field w-full rounded-full border bg-lotion p-5 font-sans  text-sm font-semibold text-${styling.text} placeholder-${styling.text} invalid:border-red focus:border-${styling.text} focus:ring-primary`}
          />
          {true == errors?.includes('phone') && (
            <p className='border-red px-5 text-sm font-semibold text-red'>
              Please enter a valid phone number
            </p>
          )}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <input
                type='text'
                name='first_name'
                placeholder='First Name'
                id='first_name'
                autoComplete='given-name'
                pattern='.{3,}'
                className={`shadow-field w-full rounded-full border bg-lotion p-5 font-sans text-sm font-semibold text-${styling.text} placeholder-${styling.text} invalid:border-red focus:border-${styling.text} focus:ring-primary`}
              />
              {true == errors?.includes('first_name') && (
                <p className='border-red px-5 text-sm font-semibold text-red'>
                  Required
                </p>
              )}
            </div>
            <div>
              <input
                type='text'
                name='last_name'
                placeholder='Last Name'
                id='last_name'
                autoComplete='family-name'
                pattern='.{3,}'
                className={`shadow-field w-full rounded-full border bg-lotion p-5 font-sans text-sm font-semibold text-${styling.text} placeholder-${styling.text} invalid:border-red focus:border-${styling.text} focus:ring-primary`}
              />
              {true == errors?.includes('last_name') && (
                <p className='border-red px-5 text-sm font-semibold text-red'>
                  Required
                </p>
              )}
            </div>
          </div>
          {true == tcpa.checkbox ? (
            <div className='flex flex-row items-start gap-2'>
              {true == tcpa.precheck ? (
                <input
                  id='leadid_tcpa_disclosure_subj'
                  type='checkbox'
                  required
                  defaultChecked
                />
              ) : (
                <div className='flex flex-row gap-2 self-center py-4'>
                  <div className='align-center inline-flex'>
                    <label
                      className='relative flex cursor-pointer items-center rounded-full p-3'
                      htmlFor='customStyle'
                    >
                      <input
                        type='checkbox'
                        className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-lg border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-dark before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-primary checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                        id='leadid_tcpa_disclosure_subj'
                        required
                      />
                      <span className='pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-3.5 w-3.5'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          stroke='currentColor'
                          strokeWidth='1'
                        >
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </div>
                </div>
              )}
              <label
                htmlFor='leadid_tcpa_disclosure_subj'
                className={`text-justify text-${styling.tcpa}`}
              >
                {'' == tcpa.text
                  ? 'By clicking this button, I consent to representatives of Education Directory and University Bound to contact me about educational opportunities via email, text, or phone, including my mobile phone number using an automatic dialer. Message and data rates may apply. I understand that my consent is not a requirement for enrollment, and I may withdraw my consent at any time.'
                  : tcpa.text}
              </label>
            </div>
          ) : (
            <label
              htmlFor='leadid_tcpa_disclosure_subj'
              className={`text-justify text-${styling.tcpa}`}
            >
              {'' == tcpa.text
                ? 'By clicking this button, I consent to representatives of Education Directory and University Bound to contact me about educational opportunities via email, text, or phone, including my mobile phone number using an automatic dialer. Message and data rates may apply. I understand that my consent is not a requirement for enrollment, and I may withdraw my consent at any time.'
                : tcpa.text}
            </label>
          )}
          <SubmitButton
            styling={{ text: styling.buttonText, color: styling.buttonBg }}
          />
          <input
            type='hidden'
            id='leadid_tcpa_disclosure'
            value={
              '' == tcpa.text
                ? 'By clicking this button, I consent to representatives of Education Directory and University Bound to contact me about educational opportunities via email, text, or phone, including my mobile phone number using an automatic dialer. Message and data rates may apply. I understand that my consent is not a requirement for enrollment, and I may withdraw my consent at any time.'
                : tcpa.text ??
                  'By clicking this button, I consent to representatives of Education Directory and University Bound to contact me about educational opportunities via email, text, or phone, including my mobile phone number using an automatic dialer. Message and data rates may apply. I understand that my consent is not a requirement for enrollment, and I may withdraw my consent at any time.'
            }
          />
          <input id='leadid_token' name='universal_leadid' type='hidden' />
          <input id='subject' name='subject' type='hidden' value={subject} />
        </form>
      </div>
    </>
  );
}
