'use client';

// import { School } from '@/app/_modules/offers';
import Image from 'next/image';
import { startTransition, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { School } from '@/app/_modules/leadCurrent';
import { submitOffers } from '@/app/(basic)/sharedresults/actions';

/**
 * Creates a submit button that provides a loading state while submitting form data.
 */
function SubmitButton() {
  'use client';
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      id='submit-form-mini'
      aria-disabled={pending}
      className='shadow-drop w-full rounded-full bg-primary py-3 text-center text-md font-semibold text-white shadow md:w-3/4'
    >
      {true == pending ? 'Submitting...' : 'Submit Request'}
    </button>
  );
}

/**
 * Creates a form that renders shared offers with selections for programs and questions.
 *
 * @param {string} phoneNumber User phone number
 * @param {School[]} initialOffers Initial listing of offers
 */
export default function ResultsForm({
  phoneNumber,
  initialOffers,
  search,
}: {
  phoneNumber: string;
  initialOffers: School[];
  search: string;
}) {
  const [offers, setOffers] = useState<School[]>(initialOffers);
  const [_state, formAction] = useFormState(submitOffers);

  if (typeof window != 'undefined') {
    window.dataLayer = window.dataLayer ?? [];
  }

  /**
   * Removes an offer from the array.
   * POST: Offer is removed from dataLayer cart and local array.
   *
   * @param brandName The unique
   */
  function removeOffer(brandName: string) {
    const temp = offers.filter((offer) => brandName != offer.brand_name);
    window.dataLayer.filter(
      (item) => item.ecommerce?.items[0]?.item_name != brandName,
    );
    startTransition(() => setOffers(temp));
  }

  /**
   * Adds the selected school to the dataLayer cart. Deduplicates elements in the cart.
   *
   * @param {School} school offer to add to cart
   * @returns {void}
   */
  function addToCart(school: School): void {
    if (typeof window == 'undefined') {
      return;
    }
    window.dataLayer = window.dataLayer ?? [];

    const existingItemIndex = window.dataLayer.findIndex(
      (item) => item.ecommerce?.items[0]?.item_name === school.brand_name,
    );

    if (existingItemIndex == -1) {
      window.dataLayer.push({
        event: 'add_to_cart',
        ecommerce: {
          currency: 'USD',
          value: school.payout,
          items: [
            {
              item_id: school.schoolid,
              item_name: school.brand_name,
              price: school.payout,
              quantity: 1,
            },
          ],
        },
      });
    }
  }

  return (
    <>
      <form
        id='submit-results-shared'
        action={formAction}
        className='gap-3 px-9 lg:gap-4 xl:gap-6'
      >
        <div className='flex flex-col gap-4'>
          {offers.map((school, index) => {
            addToCart(school);
            return (
              <div key={index}>
                <div className='rounded-lg shadow-box'>
                  <div className='flex flex-col gap-2 rounded-lg bg-white p-4 py-3'>
                    <div className='flex flex-row gap-4'>
                      <div className='h-14 w-16'>
                        <Image
                          src={school.logo}
                          width={65}
                          height={54}
                          alt={school.brand_name}
                        />
                      </div>
                      <h3 className='self-center font-sans text-18 font-semibold text-primary'>
                        {school.brand_name}
                      </h3>
                    </div>
                    <select
                      key={`program-${index}`}
                      name={'program-' + index}
                      id={'program-' + index}
                      required
                      className='shadow-field w-full rounded-lg border-2 border-black bg-lotion px-2 py-3 font-sans text-xs invalid:border-red focus:ring-primary'
                    >
                      {school.programs.map((program, pi) => (
                        <option
                          key={`${index}p${pi}`}
                          value={`${program.result_set_identifier}::${program.result_identifier}`}
                        >
                          {program.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {null != school.questions &&
                    0 <= school.questions.findIndex((q) => q.IsVisible) && (
                      <div
                        key={`${index}-qs`}
                        className='flex flex-col gap-4 rounded-b-lg bg-light p-4 pt-3'
                      >
                        {school.questions?.map((question, qi) => {
                          if (!question.IsVisible) {
                            return (
                              <div key={index + 'q' + qi}>
                                <input
                                  type='hidden'
                                  id={'question-' + index + '-' + qi + 'key'}
                                  name={'question-' + index + '-' + qi + 'key'}
                                  value={`${question.QuestionFieldName}::${question.QuestionValue}::${question.QuestionLabel}`}
                                />
                              </div>
                            );
                          }
                          if ('DropDown' == question.QuestionType) {
                            return (
                              <div
                                key={index + 'q' + qi}
                                className='flex flex-col gap-3'
                              >
                                <label
                                  htmlFor={'question-' + index + '-' + qi}
                                  className='font-sans text-xs'
                                >
                                  {question.QuestionLabel}
                                </label>
                                <select
                                  key={`question-${index}-${qi}`}
                                  id={'question-' + index + '-' + qi}
                                  name={'question-' + index + '-' + qi}
                                  required={question.QuestionRequired}
                                  className='shadow-field w-full rounded-lg border-2 border-black bg-lotion px-2 py-3 font-sans text-xs invalid:border-red focus:ring-primary'
                                >
                                  {question.QuestionOptions.map(
                                    (option, oi) => (
                                      <option
                                        key={`option-${index}-${qi}-${oi}`}
                                        value={`${question.QuestionFieldName}::${option.OptionValue}::${option.OptionLabel}`}
                                        className='font-sans text-xs'
                                      >
                                        {option.OptionLabel}
                                      </option>
                                    ),
                                  )}
                                </select>
                              </div>
                            );
                          } else if ('TextBox' == question.QuestionType) {
                            return (
                              <div key={index + 'q' + qi}>
                                <input
                                  type='hidden'
                                  id={'question-' + index + '-' + qi + 'key'}
                                  name={'question-' + index + '-' + qi + 'key'}
                                  value={question.QuestionFieldName}
                                />
                                <label
                                  htmlFor={'question-' + index + '-' + qi}
                                  className='font-sans text-xs'
                                >
                                  {question.QuestionLabel}
                                </label>
                                <input
                                  id={'question-' + index + '-' + qi}
                                  name={'question-' + index + '-' + qi}
                                  className='font-sans text-xs'
                                />
                              </div>
                            );
                          } else if ('Radio' === question.QuestionType) {
                            return (
                              <div key={index + 'q' + qi}>
                                <fieldset>
                                  <legend className='font-sans text-xs'>
                                    {question.QuestionLabel}
                                  </legend>
                                  {question.QuestionOptions.map(
                                    (option, oi) => (
                                      <div key={index + 'q' + qi + 'o' + oi}>
                                        <input
                                          type='radio'
                                          id={`question-${index}-${qi}-${oi}`}
                                          name={`question-${index}-${qi}`}
                                          value={`${question.QuestionFieldName}::${option.OptionValue}::${option.OptionLabel}`}
                                          required={question.QuestionRequired}
                                        />
                                        <label
                                          htmlFor={`question-${index}-${qi}-${oi}`}
                                          className='font-sans text-xs'
                                        >
                                          {option.OptionLabel}
                                        </label>
                                      </div>
                                    ),
                                  )}
                                </fieldset>
                              </div>
                            );
                          }
                        })}
                      </div>
                    )}
                </div>
                <div className='flex flex-row flex-wrap justify-between'>
                  <div />
                  <button
                    className='font-sans text-xs'
                    onClick={(_e) => removeOffer(school.brand_name)}
                  >
                    Not interested
                  </button>
                </div>
                <input
                  type='hidden'
                  id={`brand_name-${index}`}
                  name={`brand_name-${index}`}
                  value={school.brand_name}
                />
                <input
                  type='hidden'
                  id={`payout-${index}`}
                  name={`payout-${index}`}
                  value={school.payout}
                />
              </div>
            );
          })}
        </div>

        <div className='flex flex-row gap-2 py-4'>
          <div className='align-center inline-flex'>
            <label
              className='relative flex cursor-pointer items-center rounded-full p-3'
              htmlFor='customStyle'
            >
              <input
                type='checkbox'
                className="before:content[''] peer relative h-8 w-8 cursor-pointer appearance-none rounded-lg border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-dark before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-primary checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                id='leadid_tcpa_disclosure_sharedresults'
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
          {/* <input id='tcpa_checkbox' type='checkbox' required defaultChecked /> */}
          <label
            htmlFor='leadid_tcpa_disclosure_sharedresults'
            className='relative cursor-pointer font-sans text-12'
          >
            {`I acknowledge that, by clicking the checkbox as my official signature, I consent to representatives of ${
              offers.map((offer: School) => offer?.brand_name).join(', ') ?? ''
            }, contacting me about educational opportunities via email, text, or phone, including my phone ${phoneNumber.replace(
              /(\d{3})(\d{3})(\d{4})/,
              '($1) $2-$3',
            )}, using an automatic dialer, or pre-recorded message. Message and data rates may apply. I understand that my consent is not a requirement for enrollment, and I may withdraw my consent at any time.`}
          </label>
        </div>
        <input id='leadid_token' name='universal_leadid' type='hidden' />
        <input type='hidden' id='search_id' name='search_id' value={search} />
        <SubmitButton />
      </form>
    </>
  );
}
