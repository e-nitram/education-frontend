'use client';

import Image from 'next/image';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import logo_w from '@/app/_components/logo_w.svg';

import { submitForm } from './action';

export default function DoNotCallForm() {
  const [state, formAction] = useFormState(submitForm, null);

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <button className='w-1/3 rounded-full bg-secondary p-2 text-lotion'>
        {pending === true ? 'Pending...' : 'Submit'}
      </button>
    );
  }

  const errors = state?.details;

  return (
    <>
      <main className='grid justify-items-center p-9 text-base lg:p-20 xl:p-36'>
        <h1 className='text-center font-sans text-md font-semibold text-primary'>
          California and Nevada residents may use this form to opt out of the
          sale of their personal information to third parties.
        </h1>
        <div className='py-10'>
          <form
            action={formAction}
            className='m-auto flex w-full flex-col gap-4 md:w-80 lg:w-[390px]'
          >
            <div>
              <label htmlFor='first name'>First Name</label>
              <input
                type='text'
                placeholder='Enter first name'
                id='first name'
                name='first name'
                pattern='.{3,}'
                title='Must be at least 3 characters'
                className='shadow-field text-normal w-full border bg-white p-1 font-sans invalid:border-red focus:ring-primary'
              />
              {errors?.includes('first name') === true && (
                <p className='border-red px-5 text-sm font-semibold text-red'>
                  Required
                </p>
              )}
            </div>

            <div>
              <label htmlFor='last name'>Last Name</label>
              <input
                type='text'
                placeholder='Enter last name'
                id='last name'
                name='last name'
                pattern='.{3,}'
                title='Must be at least 3 characters'
                className='shadow-field text-normal w-full border bg-white p-1 font-sans invalid:border-red focus:ring-primary'
              />
              {errors?.includes('last name') === true && (
                <p className='border-red px-5 text-sm font-semibold text-red'>
                  Required
                </p>
              )}
            </div>

            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                placeholder='Enter email'
                id='email'
                name='email'
                pattern='^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$'
                title='Must be a valid email like name@domain.com'
                className='shadow-field text-normal w-full border bg-white p-1 font-sans invalid:border-red focus:ring-primary'
              />
              {errors?.includes('email') === true && (
                <p className='border-red px-5 text-sm font-semibold text-red'>
                  Required
                </p>
              )}
            </div>

            <div>
              <label htmlFor='phone'>Phone Number</label>
              <input
                type='text'
                placeholder='Enter phone'
                id='phone'
                name='phone'
                pattern='^\d{10}$'
                title='Must enter a ten digit phone number'
                className='shadow-field text-normal w-full border bg-white p-1 font-sans invalid:border-red focus:ring-primary'
              />
              {errors?.includes('phone') === true && (
                <p className='border-red px-5 text-sm font-semibold text-red'>
                  Required
                </p>
              )}
            </div>

            <div>
              <label htmlFor='state'>State</label>
              <input
                type='text'
                placeholder='Enter state'
                id='state'
                name='state'
                pattern='.{2,}'
                title='Must be at least 2 characters'
                className='shadow-field text-normal w-full border bg-white p-1 font-sans invalid:border-red focus:ring-primary'
              />
              {errors?.includes('state') === true && (
                <p className='border-red px-5 text-sm font-semibold text-red'>
                  Required
                </p>
              )}
            </div>
            <SubmitButton />
          </form>
        </div>

        <h1 className='text-xl font-bold'>PRIVACY NOTICE FOR CALIFORNIA RESIDENTS</h1>
<p className='text-sm'>Last Updated: June 24th, 2024</p>

<p>
  This Privacy Notice for California Residents ("Privacy Notice") supplements the information
  contained in the educationdirectory.net Privacy Policy (the "Privacy Policy") made available on
  the website located at https://educationdirectory.net (the "Site"). The Site is owned and operated
  by Candid Maven Inc. ("Company," "we," "us" or "our"). This Privacy Notice applies solely to
  residents of the State of California ("Users"). We adopt this Privacy Notice in compliance with
  the California Consumer Privacy Act of 2018 ("CCPA"), the California Privacy Rights Act of
  2020 ("CPRA") and other applicable California State privacy laws. Any terms defined in the
  CCPA and/or CPRA have the same meaning when used in this Privacy Notice. Users with
  disabilities who wish to access this Privacy Notice in an alternative format can contact us by
  calling us at: 877-835-5785; emailing us at: info@educationdirectory.net or sending us U.S.
  mail to: 3219 E Camelback Rd Ste 221, Phoenix, AZ 85018.
</p>

<h2 className='text-lg font-semibold'>Categories Of Information We Collect</h2>
<p>
  We collect information that identifies, relates to, describes, references, is capable of being
  associated with, or could reasonably be linked, directly or indirectly, with a particular User or
  device ("personal information"). In particular, we have collected the following categories of
  personal information from Users within the last twelve (12) months:
</p>

<table className='border-collapse border border-gray-400 w-full'>
  <thead>
    <tr className='bg-gray-200'>
      <th className='border border-gray-400 px-4 py-2'>Category</th>
      <th className='border border-gray-400 px-4 py-2'>Examples</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className='border border-gray-400 px-4 py-2'>A. Identifiers.</td>
      <td className='border border-gray-400 px-4 py-2'>A real name, alias, postal address, unique personal identifier, online identifier, Internet Protocol address, email address, account name, telephone number, or other similar identifiers.</td>
    </tr>
    <tr>
      <td className='border border-gray-400 px-4 py-2'>B. Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e)).</td>
      <td className='border border-gray-400 px-4 py-2'>A name, signature, Social Security number, physical characteristics or description, postal address, telephone number, passport number, driver's license or State identification card number, insurance policy number, education, employment, employment history, bank account number, credit card number, debit card number, or any other financial information, medical information, or health insurance information. Some personal information included in this category may overlap with other categories.</td>
    </tr>
    <tr>
      <td className='border border-gray-400 px-4 py-2'>C. Protected classification characteristics under California or federal law.</td>
      <td className='border border-gray-400 px-4 py-2'>Age (40 years or older), race, color, ancestry, national origin, citizenship, religion or creed, marital status, medical condition, physical or mental disability, sex (including gender, gender identity, gender expression, pregnancy or childbirth and related medical conditions), sexual orientation, veteran or military status, genetic information (including familial genetic information).</td>
    </tr>
    <tr>
      <td className='border border-gray-400 px-4 py-2'>F. Internet or other similar network activity.</td>
      <td className='border border-gray-400 px-4 py-2'>Browsing history, search history, information on a User's interaction with a website, application or advertisement.</td>
    </tr>
    <tr>
      <td className='border border-gray-400 px-4 py-2'>I. Professional or employment-related information.</td>
      <td className='border border-gray-400 px-4 py-2'>Current or past job history or performance evaluations.</td>
    </tr>
  </tbody>
</table>
<p>Personal information does not include:</p>
<ul className='list-disc pl-5'>
  <li>Publicly available information from government records.</li>
  <li>De-identified or aggregated User information.</li>
  <li>Information excluded from the CCPA and CPRA, such as:
    <ul className='list-disc pl-5'>
      <li>health or medical information covered by the Health Insurance Portability and
        Accountability Act of 1996 (HIPAA) and the California Confidentiality of
        Medical Information Act (CMIA) or clinical trial data;</li>
      <li>personal information covered by certain sector-specific privacy laws, including
        the Fair Credit Reporting Act (FRCA), the Gramm-Leach-Bliley Act (GLBA), the
        California Financial Information Privacy Act (FIPA), and the Driver's Privacy
        Protection Act of 1994.</li>
    </ul>
  </li>
</ul>

<p>We obtain the categories of personal information listed above from the following categories
of sources:</p>
<ul className='list-disc pl-5'>
  <li>Directly from our Users. For example, from online registration forms that our Users
    submit to us related to the products and/or services that we offer by and through the Site.</li>
  <li>Indirectly from our Users. For example, through information we collect from our Users in
    the course of providing our products and/or services to them.</li>
  <li>Directly and indirectly from activity on the Site. This includes the type of browser that
    you use (e.g., Safari, Chrome, Internet Explorer), your IP address, the type of operating
    system that you use (e.g., Windows or iOS) and the domain name of your Internet
    Service Provider. In addition, we obtain certain Site usage details and analytics that are
    collected automatically by us and our third party partners, such as Google® and Clarity®.</li>
  <li>When our Users interact with us on our social media accounts, including commenting on
    and/or liking our posts.</li>
  <li>Directly from Users via online registration forms that our Users submit to us in order to
    enter a promotion or sweepstakes featured on the Site.</li>
  <li>From third-parties that interact with us in connection with the products and/or services
    that we offer to our Users. For example, third party entities that assist us in sending direct
    and electronic mail, removing duplicate information from User lists, analyzing data and
    providing marketing analysis.</li>
  <li>From third-party data brokers or aggregators.</li>
  <li>From publicly availably sources, such as Internet search engines.</li>
</ul>

<h2 className='text-lg font-semibold'>Use Of Personal Information</h2>
<p>We may use or disclose the personal information that we collect for one or more of the following
business purposes:</p>
<ul className='list-disc pl-5'>
  <li>To fulfill or meet the reason for which the information is provided. For example, if you
    provide us with personal information in connection with your request for a price quote
    and/or other information regarding the education-related products and/or services
    featured on the Site, we will use that personal information to better provide you with the
    requested quote/information.</li>
  <li>To provide you with information, products or services that you request from us.</li>
  <li>To create, maintain, customize and secure your account with us.</li>
  <li>To enable you to enter a sweepstakes or promotion featured on the Site.</li>
  <li>To provide you with e-mail, direct mail and telemarketing messages concerning certain
    Company products and/or services, as well as third-party products and/or services, that
    we believe may be of interest to you.</li>
  <li>To deliver relevant Site content and advertisements to you and measure or understand the
    effectiveness of the advertising we serve to you</li>
  <li>To carry out our obligations and enforce our rights arising from any contracts entered into
    between you and us, including the Site's Terms and Conditions.</li>
  <li>To improve the Site and better present its contents to you.</li>
  <li>For customer service purposes and to respond to inquiries from you.</li>
  <li>For testing, research, analysis and product development.</li>
  <li>As necessary or appropriate to protect our rights, property or safety, and that of our
    clients or others.</li>
  <li>To respond to law enforcement requests and as required by applicable law, court order, or
    governmental regulations.</li>
  <li>As described to you when collecting your personal information or as otherwise set forth
    in the CCPA.</li>
  <li>To evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution or
    other sale or transfer of some or all of our assets, whether as a going concern or as part of
    bankruptcy, liquidation or similar proceeding, in which personal information held by us is
    among the assets transferred.</li>
</ul>

<p>We will not collect additional categories of personal information or use the personal information
we collected for materially different, unrelated or incompatible purposes without providing you
with notice.</p>
        <h2 className='text-lg font-semibold'>Retention Of Personal Information And Sensitive Personal Information</h2>
<p>
  We retain all categories of your personal information and sensitive personal information that we
  collect for a period of ten (10) years. We may also use certain criteria to determine whether and
  when to delete certain categories of collected personal and sensitive personal information
  including:
</p>
<ul className='list-disc pl-5'>
  <li>Date of collection.</li>
  <li>Frequency of consumer interaction with us.</li>
  <li>Last interaction the consumer had with us.</li>
  <li>Whether the purpose of collection has been completed.</li>
</ul>

<h2 className='text-lg font-semibold'>Sharing Personal Information</h2>
<p>
  Subject to your right to opt-out of such sharing/sale, we may share, rent and/or sell your personal
  information with/to third parties for marketing purposes, as well as other business purposes.
  When we disclose personal information to a third party service provider or other entity, we enter
  into a contractual relationship that describes the purpose for which such third party may use the
  personal information and requires that third party to both keep the personal information
  confidential and not use it for any purpose other than the performance of its services under the
  applicable contract. Please note, we do not collect information from Users that we actually know
  are less than eighteen (18) years of age and we do not share or sell the personal information of
  Users that we actually know are less than eighteen (18) years of age. Without limiting the
  foregoing, we have not shared or sold the personal information of Users that we actually know
  are less than sixteen (16) years of age in the preceding twelve (12) months.
</p>

<p>In the preceding twelve (12) months, we have disclosed the following categories of personal
information for a business purpose:</p>
<ul className='list-disc pl-5'>
  <li>Category A Identifiers.</li>
  <li>Category B California Customer Records personal information categories.</li>
  <li>Category C Protected classification characteristics under California or federal law.</li>
  <li>Category F Internet or other similar network activity.</li>
  <li>Category I Professional or employment-related information.</li>
</ul>

<p>We disclose your personal information for a business purpose to the following categories of third
parties:</p>
<ul className='list-disc pl-5'>
  <li>Our affiliates.</li>
  <li>Service providers.</li>
  <li>Third parties who provide the education-related products and/or services featured on the
Site.</li>
  <li>Third parties who purchase and/or license your personal information for marketing
purposes, including: (a) providers of direct marketing services and applications, including
lookup and reference, data enhancement, suppression and validation; (b) e-mail
marketers; (c) telemarketers (where permitted by applicable law); and (d) direct
marketers. If a third party purchaser of your personal information wants to resell it, that
purchaser is required by law to provide you with explicit notice and an opportunity to
opt-out of further sales.</li>
  <li>Third parties to whom you authorize us to disclose your personal information in
connection with the products and/or services that we provide to you.</li>
</ul>

<p>In the preceding twelve (12) months, we have sold the following categories of personal
information to third parties:</p>
<ul className='list-disc pl-5'>
  <li>Category A Identifiers.</li>
  <li>Category B California Customer Records personal information categories.</li>
  <li>Category C Protected classification characteristics under California or federal law.</li>
  <li>Category F Internet or other similar network activity.</li>
  <li>Category I Professional or employment-related information.</li>
</ul>

<p>
  In the preceding twelve (12) months, we have: (a) sold personal information to the third parties
  who purchase and/or license your personal information for marketing purposes, as well as the
  third parties who provide the education-related products and/or services featured on the Site; and
  (b) shared your personal information for the business purposes set forth above.
</p>

<p>In the preceding twelve (12) months, we have:</p>
<ul className='list-disc pl-5'>
  <li>Received 595 requests for access to specific information and to exercise data portability
rights. We have complied with 12 of those requests (in whole or in part) and denied 557
requests. The median number of days within which we substantively responded to such
requests was N/A;</li>
  <li>Received 392 requests to correct personal information. We have complied with 11 of
those requests (in whole or in part) and denied 369 requests. The median number of days
within which we substantively responded to such requests was N/A;</li>
  <li>Received 0 requests to limit our use of sensitive personal information. We have complied
with 0 of those requests (in whole or in part) and denied 0 requests. The median number
of days within which we substantively responded to such requests was 0;</li>
  <li>Received 20,613 requests to delete personal information. We have complied with 0 of
those requests (in whole or in part) and denied 0 requests. The median number of days
within which we substantively responded to such requests was N/A; and</li>
  <li>Received 22,276 requests to opt-out from the sale/sharing of personal information. We
have complied with 22,276 of those requests (in whole or in part) and denied 0 requests.
The median number of days within which we substantively responded to such requests
was ~31.</li>
</ul>
        <h2 className='text-lg font-semibold'>Your Rights And Choices</h2>
<p>
  The CCPA and CPRA provides Users (California residents) with specific rights regarding their
  personal information. This section describes your CCPA and CPRA rights and explains how to
  exercise those rights.
</p>

<h3 className='text-md font-semibold'>Opt-Out From The Sale Of Your Personal Information</h3>
<p>
  You have the right to opt-out of our sale of your personal information to third parties. To exercise
  your right to opt-out of our sale of your personal information to third parties, please submit a
  verifiable User request to us by either:
</p>
<ul className='list-disc pl-5'>
  <li>Filling out form at the top of this page</li>
  <li>Calling us at: 877-835-5785</li>
  <li>Emailing us at: info@educationdirectory.net or</li>
  <li>Sending us U.S. mail to: 3219 E Camelback Rd Ste 221, Phoenix, AZ 85018</li>
</ul>
<p>
  We endeavor to act on all opt-out requests as soon as practicable, but in all cases within fifteen
  (15) days of the receipt of your request.
</p>

<h3 className='text-md font-semibold'>Opt-Out From The Sharing Of Your Personal Information</h3>
<p>
  You have the right to opt-out of our sharing your personal information with third parties. To
  exercise your right to opt-out of our sharing your personal information with third parties, please
  submit a verifiable User request to us by either:
</p>
<ul className='list-disc pl-5'>
  <li>Filling out form at the top of this page</li>
  <li>Calling us at: 877-835-5785</li>
  <li>Emailing us at: info@educationdirectory.net or</li>
  <li>Sending us U.S. mail to: 3219 E Camelback Rd Ste 221, Phoenix, AZ 85018</li>
</ul>
<p>
  We endeavor to act on all opt-out requests as soon as practicable, but in all cases within fifteen
  (15) business days of the receipt of your request. Subject to the aforementioned fifteen (15)
  business day period, where we receive and confirm your verifiable opt-out request, we will cease
  sharing your Personal Information with third parties (and direct third parties to whom we
  sold/shared your personal information, to do the same).
</p>

<h3 className='text-md font-semibold'>Opt-Out From The Use And/Or Sharing Of Your Sensitive Personal Information</h3>
<p>
  You have the right to limit our use of your sensitive personal information, including any
  sensitive information from Category B (Personal information categories established by
  Applicable State Laws), Category C (Protected classification characteristics under Applicable
  State Laws or federal law) and/or Category I (Professional or employment-related information),
  to those uses which: (i) are necessary to perform the services or provide the goods requested by
  you; (ii) help us to ensure security and integrity of your personal information to the extent the
  use of your sensitive personal information is reasonably necessary and proportionate for these
  purposes; (iii) are short-term, transient uses including, but not limited to, non-personalized
  advertising shown as part of your then-current interaction with the Site, provided that your
  personal information is not disclosed to another third party and is not used to build a profile
  about you or otherwise alter your experience outside the then-current interaction with the Site;
  (iv) involve performing services on behalf of Company, including maintaining or servicing
  accounts, providing customer service, processing or fulfilling orders and transactions, verifying
  customer information, processing payments, providing financing, providing analytic services,
  providing storage, or providing similar services on behalf of Company; and (v) include activities
  to verify or maintain the quality or safety of a service or device that is owned, manufactured,
  manufactured for, or controlled by, Company, and to improve, upgrade, or enhance the service or
  device that is owned, manufactured, manufactured for, or controlled by, Company.
</p>
<p>
  You also have the right opt-out of our sharing your sensitive personal information with third
  parties, including any sensitive information from Category B (Personal information categories
  established by Applicable State Laws), Category C (Protected classification characteristics under
  Applicable State Laws or federal law) and/or Category I (Professional or employment-related
  information).
</p>
<p>
  To exercise your right to limit our use of your sensitive personal information and/or opt-out of
  our sharing your sensitive personal information with third parties, please submit a verifiable User
  request to us by either:
</p>
<ul className='list-disc pl-5'>
  <li>Filling out form at the top of this page</li>
  <li>Calling us at: 877-835-5785</li>
  <li>Emailing us at: info@educationdirectory.net or</li>
  <li>Sending us U.S. mail to: 3219 E Camelback Rd Ste 221, Phoenix, AZ 85018</li>
</ul>
<p>
  We endeavor to act on all such requests as soon as practicable, but in all cases within fifteen (15)
  business days of the receipt of your request. Subject to the aforementioned fifteen (15) business
  day period, where we receive and confirm your verifiable opt-out request, we will cease using
  your Sensitive Personal Information/sharing your Sensitive Personal Information with third
  parties (and direct our service providers, contractors and third parties to whom we sold/shared
  your personal information, to do the same).
</p>
        <h3 className='text-md font-semibold'>Access To Specific Information And Data Portability Rights</h3>
<p>
  You have the right to request that we disclose certain information to you about our collection and
  use of your personal information over the past twelve (12) months. Once we receive and confirm
  your verifiable User request, we will disclose to you:
</p>
<ul className='list-disc pl-5'>
  <li>The categories of personal information we collected about you.</li>
  <li>The categories of sources for the personal information we collected about you.</li>
  <li>Our business or commercial purpose for collecting or selling that personal information.</li>
  <li>The categories of third parties with whom we have shared that personal information.</li>
  <li>The specific pieces of personal information we collected about you (also called a data
portability request).</li>
  <li>If we sold or disclosed your personal information for a business purpose, two separate
lists disclosing:
    <ul className='list-disc pl-5'>
      <li>disclosures for a business purpose, identifying the personal information categories
that each category of recipient obtained.</li>
      <li>sales, identifying the personal information categories that each category of
recipient purchased; and</li>
    </ul>
  </li>
</ul>

<h3 className='text-md font-semibold'>Deletion Request Rights</h3>
<p>
  You have the right to request that we delete any of your personal information that we collected
  from you and retained, subject to certain exceptions. Once we receive and confirm your
  verifiable User request, we will delete (and direct our service providers to delete) your personal
  information from our (their) records, unless an exception applies. We may deny your deletion
  request if retaining the information is necessary for us or our service providers to:
</p>
<ol className='list-decimal pl-5'>
  <li>Complete the transaction for which we collected the personal information, provide a good
or service that you requested, take actions reasonably anticipated within the context of
our ongoing business relationship with you, or otherwise perform our obligations in
connection with our contract with you.</li>
  <li>Detect security incidents, protect against malicious, deceptive, fraudulent or illegal
activity, or prosecute those responsible for such activities.</li>
  <li>Debug products to identify and repair errors that impair existing intended functionality.</li>
  <li>Exercise free speech rights, ensure the right of another User to exercise their free speech
rights or exercise another right provided for by law.</li>
  <li>Comply with the California Electronic Communications Privacy Act (Cal. Penal Code §
1546 seq.).</li>
  <li>Engage in public or peer-reviewed scientific, historical, or statistical research in the
public interest that adheres to all other applicable ethics and privacy laws, when the
information's deletion may likely render impossible or seriously impair the research's
achievement, if you previously provided informed consent.</li>
  <li>Enable solely internal uses that are reasonably aligned with User expectations based on
your relationship with us.</li>
  <li>Comply with a legal obligation.</li>
  <li>Make other internal and lawful uses of that information that are compatible with the
context in which you provided it.</li>
</ol>

<h3 className='text-md font-semibold'>Right To Request Correction Of Inaccurate Personal Or Sensitive Personal Information</h3>
<p>
  You have the right to request correction of inaccurate personal and/or sensitive personal
  information that we collect. Upon receiving a verifiable consumer request for correction, we will
  make commercially reasonable efforts to correct information identified as inaccurate. Where we
  correct inaccurate personal and/or sensitive personal information, we shall instruct all service
  providers and/or contractors that maintain such personal and/or sensitive personal information in
  the course of providing services to us to make the necessary corrections in their respective
  systems.
</p>
        <h3 className='text-md font-semibold'>Exercising Access, Data Portability, Right To Correct And Deletion Rights</h3>
<p>
  To exercise your access, data portability, right to correct and/or deletion rights described above,
  please submit a verifiable User request to us by either:
</p>
<ul className='list-disc pl-5'>
  <li>Filling out form at the top of this page</li>
  <li>Calling us at: 877-835-5785</li>
  <li>Emailing us at: info@educationdirectory.net or</li>
  <li>Sending us U.S. mail to: 3219 E Camelback Rd Ste 221, Phoenix, AZ 85018</li>
</ul>
<p>
  Only you or a person registered with the California Secretary of State that you authorize to act on
  your behalf, may make a verifiable User request related to your personal information.
</p>
<p>
  You may only make a verifiable User request for access or data portability twice within a
  12-month period. The verifiable User request must:
</p>
<ul className='list-disc pl-5'>
  <li>Provide sufficient information that allows us to reasonably verify that you are the person
about whom we collected personal information or an authorized representative.</li>
  <li>Describe your request with sufficient detail that allows us to properly understand,
evaluate, and respond to it.</li>
</ul>
<p>
  We cannot respond to your request or provide you with personal information if we cannot verify
  your identity or authority to make the request and confirm that the personal information relates to
  you. Making a verifiable User request does not require you to create an account with us. We will
  only use personal information provided in a verifiable User request to verify the requestor's
  identity or authority to make the request.
</p>

<h3 className='text-md font-semibold'>Response Timing And Format</h3>
<p>
  We endeavor to respond to all verifiable User requests within forty-five (45) days of the receipt
  thereof. If we require more time (up to ninety (90) days), we will inform you of the reason and
  extension period in writing. We will deliver our written response by mail or electronically, at
  your option. Any disclosures we provide will only cover the twelve (12) month period preceding
  the receipt of your verifiable request. The response we provide will also explain the reasons we
  cannot comply with a request, if applicable. For data portability requests, we will select a format
  to provide your personal information that is readily useable and should allow you to transmit the
  information from one entity to another entity without hindrance.
</p>
<p>
  We do not charge a fee to process or respond to your verifiable User request unless it is
  excessive, repetitive, or manifestly unfounded. If we determine that the request warrants a fee,
  we will tell you why we made that decision and provide you with a cost estimate before
  completing your request.
</p>

<h3 className='text-md font-semibold'>Authorized Agents</h3>
<p>
  Users may permit an authorized agent to exercise any rights granted under the CCPA and CPRA
  as set forth above. Any individual acting on your behalf as an agent must register with the
  California Secretary of State. Further, in order to utilize an authorized agent, you must provide
  the authorized agent with written permission from you to act on your behalf for these purposes.
  When you use an authorized agent to submit a request to delete, request to correct or a request to
  know, we may require the authorized agent to provide proof that you gave the agent signed
  permission to submit the subject request. We may also require you to do either of the following:
  (a) verify your own identity directly with us; or (b) directly confirm with us that you provided
  the authorized agent permission to submit the request.
</p>
        <h3 className='text-md font-semibold'>Non-Discrimination</h3>
<p>
  We will not discriminate against you for exercising any of your CCPA and/or CPRA rights.
  Unless permitted by the CCPA and/or CPRA, we will not:
</p>
<ul className='list-disc pl-5'>
  <li>Deny you goods or services;</li>
  <li>Charge you different prices or rates for goods or services, including through granting
discounts or other benefits, or imposing penalties;</li>
  <li>Provide you a different level or quality of goods or services; and/or</li>
  <li>Suggest that you may receive a different price or rate for goods or services or a different
level or quality of goods or services.</li>
</ul>

<h3 className='text-md font-semibold'>Changes To This Privacy Notice</h3>
<p>
  We reserve the right to amend this Privacy Notice in our discretion and at any time. When we
  make changes to this Privacy Notice, we will notify you by email or through a notice on the
  Site's homepage.
</p>

<h3 className='text-md font-semibold'>Contact Information</h3>
<p>
  If you have any questions or comments about this Privacy Notice, our Privacy Policy, the ways
  in which we collect and use your personal information, your choices and rights regarding such
  use, or wish to exercise your rights under California law, please do not hesitate to contact us by
  either:
</p>
<ul className='list-disc pl-5'>
  <li>Calling us at: 877-835-5785</li>
  <li>Emailing us at: info@educationdirectory.net or</li>
  <li>Sending us U.S. mail to: 3219 E Camelback Rd Ste 221, Phoenix, AZ 85018</li>
</ul>
        
</main>
      <div className='flex flex-col justify-between gap-6 bg-primary px-9 pb-6 pt-10 font-sans text-white md:flex-row lg:gap-10 lg:px-20 xl:px-36'>
        <div className='flex flex-col gap-6 md:flex-row md:items-start'>
          <Image
            className='hidden xl:block'
            src={logo_w}
            width={260}
            height={60}
            alt='EducationDirectory.net'
          />
          <Image
            className='block xl:hidden'
            src={logo_w}
            width={172}
            height={40}
            alt='EducationDirectory.net'
          />
        </div>
      </div>
    </>
  );
}
