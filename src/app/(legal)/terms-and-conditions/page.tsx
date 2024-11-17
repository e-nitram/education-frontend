import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import logo_w from '@/app/_components/logo_w.svg';

export const metadata: Metadata = {
  title: 'Education Directory Terms and Conditions',
  description: 'Terms and conditions for user of this website.',
  icons: '/favicon.png',
  alternates: {
    canonical: 'https://educationdirectory.net/terms-and-conditions',
  },
};

export default function TermsAndCondition() {
  return (
    <>
      <main className='flex flex-col gap-5 p-9 lg:p-20 xl:p-36'>
        <h1 className='font-serif text-xl text-primary'>
          Terms and Conditions for educationdirectory.net
        </h1>
        <h2 className='direction-column font-sans text-md font-semibold text-primary'>
          REVISED SEPTEMBER 3, 2020
        </h2>
        <p>
          PLEASE CHECK THIS PAGE FREQUENTLY FOR UPDATES. THE CURRENT VERSION OF
          THESE TERMS AND CONDITIONS APPLY EACH TIME YOU USE THE SITE. PLEASE
          THIS DOCUMENT CAREFULLY. IT CONTAINS VERY IMPORTANT INFORMATION ABOUT
          YOUR RIGHTS AND OBLIGATIONS, AS WELL AS LIMITATIONS AND EXCLUSIONS MAY
          APPLY TO YOU. THIS DOCUMENT CONTAINS A DISPUTE RESOLUTION CLAUSE.
        </p>
        <p>
          This Agreement (“Agreement”), is made by and between Education
          Directory (“We,” “Us,” or “Our”), with mailing address of 3219 E
          Camelback Rd. Ste 221, Phoenix, AZ 85018, pursuant to its provision of
          the Web Site called educationdirectory.net (“Web Site”), and you
          (“You,” “Your” or “Yourself”). The Web Site, all products or services
          offered on this site, all text, pictures, graphics, logos, button
          items, images, works of authorship and other information and all
          revisions, modifications, and enhancements thereto (“Content”) are
          subject to the following terms and conditions, which may be updated
          from time to time.
        </p>
        <p>
          UPON ACCESSING EDUCATIONDIRECTORY.NET, YOU AGREE TO THESE TERMS AND
          CONDITIONS. PLEASE READ THESE TERMS CAREFULLY. IF YOU DO NOT AGREE
          WITH ANY OF THESE TERMS OR CONDITIONS, OR IF ANY OR ALL OF THE
          FOLLOWING ARE PROHIBITED WITHIN YOUR JURISDICTION, DO NOT ACCESS OR
          OTHERWISE USE THIS WEB SITE, THE PRODUCTS, OR ANY INFORMATION
          CONTAINED ON THIS WEB SITE. YOUR ACCESS TO AND USE OF THIS WEB SITE
          CONSTITUTE YOUR AGREEMENT TO ABIDE BY, AND UNDERSTANDING OF EACH OF
          THE TERMS AND CONDITIONS SET FORTH BELOW. IF YOU HAVE ANY QUESTIONS,
          VISIT THE “CONTACT US” SECTION OF OUR WEB SITE TO SUBMIT QUESTIONS TO
          OUR CUSTOMER SERVICE REPRESENTATIVES.
        </p>
        <h2 className='font-sans text-md font-semibold text-primary'>
          1.MANDATORY ARBITRATION.
        </h2>
        <p>
          You understand and agree that all claims, disputes, or controversies
          between You and Education Directory and its parents, subsidiaries or
          related companies, including but not limited to tort and contract
          claims, claims based upon any federal, state, or local statute, law,
          order, ordinance, or regulation, and the issue of arbitrability, shall
          be resolved by final and binding arbitration using the American
          Arbitration Association’s (AAA) Commercial Arbitration Rules (AAA) in
          effect on the date of initiation of the arbitration, except as to
          those AAA Rules that conflict with or differ from this Agreement, by
          or more arbitrators appointed in accordance with the said rules at a
          location determined by the arbitrator(s). The arbitrator shall be a
          lawyer with more than ten years experience or a retired or former The
          arbitrator shall be independent of and unrelated to You.
          Notwithstanding any language in these Terms and Conditions to the
          contrary, no arbitration may be administered without the consent of
          parties to the arbitration. Any controversy concerning whether a is
          arbitrable shall be determined by the arbitrator(s) and not by the
          court. Judgment upon any award rendered by the arbitrator(s) may be
          entered by any state or federal court having jurisdiction thereof.
          This arbitration contract is made pursuant to a transaction in
          interstate commerce and its interpretation, application, enforcement,
          proceedings thereunder shall be governed by the Federal Arbitration
          Act 9 U.S.C. Sec. 1-16 (“FFA”). NEITHER YOU NOR WE SHALL BE OR
          CONSOLIDATE CLAIMS IN ARBITRATION BY OR AGAINST OTHER CONSUMERS OR
          ARBITRATE ANY CLAIM AS A REPRESENTATIVE OR MEMBER OF A CLASS OR IN A
          PRIVATE ATTORNEY GENERAL CAPACITY. The parties voluntarily and
          knowingly waive any right they have to a jury trial.
        </p>
        <h2 className='font-sans text-lg font-semibold text-primary'>
          CONTACTING US
        </h2>
        <p>
          If You have questions about any offer, Partner, completion, Web Site
          or this Agreement, please <br />
          email :{' '}
          <Link className='text-primary underline' href='/do-not-call'>
            info@educationdirectory.net.
          </Link>
        </p>
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
