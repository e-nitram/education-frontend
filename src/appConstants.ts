export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
export const ACCESS_KEY = process.env.NEXT_PUBLIC_ACCESS_KEY;
export const CANDIMAVEN_BASE_URL = process.env.NEXT_PUBLIC_CANDIMAVEN_BASE_URL;
export const ADROLL_ADV_ID = process.env.NEXT_PUBLIC_ADROLL_ADV_ID;
export const ADROLL_PIX_ID = process.env.NEXT_PUBLIC_ADROLL_PIX_ID;
export const ADROLL_VERSION = process.env.NEXT_PUBLIC_ADROLL_VERSION;
export const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
export const LEADS_URL = process.env.NEXT_PUBLIC_LEADS_URL;
export const LEAD_COST = process.env.NEXT_PUBLIC_LEAD_COST;
export const TOTAL_REVENUE = process.env.NEXT_PUBLIC_TOTAL_REVENUE;
export const TEST_LEAD = process.env.NEXT_PUBLIC_TEST_LEAD as string;
export const BRAND_NAME = 'Education Dir';
export const Image_Quality = 30;
export const MAO_URL = process.env.NEXT_PUBLIC_MAO_URL;
export const MAO_TOKEN_INTERNAL = process.env.NEXT_PUBLIC_MAO_TOKEN_INTERNAL;
export const MAO_TOKEN_EXTERNAL = process.env.NEXT_PUBLIC_MAO_TOKEN_EXTERNAL;

export const APP_DATA = {
  URL: process.env.NEXT_PUBLIC_APP_URL ?? 'https://educationdirectory.net',
  variables: {
    GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    GOOGLE_TAG_ID: process.env.NEXT_PUBLIC_GOOGLE_TAG_ID,
    HEAP_SCRIPT_ID: process.env.NEXT_PUBLIC_HEAP_SCRIPT_ID,
    MICROSOFT_PIXEL_SCRIPT_ID:
      process.env.NEXT_PUBLIC_MICROSOFT_PIXEL_SCRIPT_ID,
    STATIC_AD_OPTIMIZER: Boolean(process.env.NEXT_PUBLIC_STATIC_AD_OPTIMIZER),
    VALIDATE_EMAIL_URL: process.env.NEXT_PUBLIC_VALIDATE_EMAIL_URL,
    VALIDATE_EMAIL_API_TOKEN: process.env.NEXT_PUBLIC_VALIDATE_EMAIL_API_TOKEN,
    VALIDATE_EMAIL_LIST_ID: process.env.NEXT_PUBLIC_VALIDATE_EMAIL_LIST_ID,
    DEV_MODE: process.env.NEXT_PUBLIC_DEV,
  },
};

export const defaultStepsData: StepData = {
  current: 1,
  gender: 'Female',
  online_or_campus: 'Either',
  hsyear: '2022',
  areas_of_interest: [
    'Art & Design',
    'Business',
    'Computers & Technology',
    'Criminal Justice',
    'Culinary',
    'Education & Teaching',
    'Entertainment',
    'Health & Wellness',
    'Hospitality',
    'Language',
    'Legal & Paralegal',
    'Liberal Arts',
    'Massage And Physical Therapy',
    'Nursing',
    'Psychology And Counseling',
    'Religious Studies',
    'Science & Engineering',
    'Trade & Vo-Tech',
  ],
  current_education_level: 'Some College',
  teaching_certificate: 'No',
  rn_license: 'No',
  email: '',
  phone: '',
  zip_code: '',
  address_line1: '',
  currently_enrolled_in_college: 'No',
  computer_internet_access: 'Yes',
  us_citizen: 'Yes',
  is_graduated_in_us: 'Yes',
  preferred_enrollment: '0',
  channel_name: 'Web',
  address_line2: '',
  age: '20',
  city: '',
  first_name: '',
  is_contacted_by_school: '',
  last_name: '',
  phone2: '',
  preferred_education_level: '',
  state: '',
  military: {
    military_status: 'No',
    military_affiliation: 'No',
    relationship: '',
  },
  searchIdentifier: '',
  tcpa: tcpaDisClosureText('', 0),
};

export function tcpaDisClosureText(phone: string, group: number) {
  if (0 == group) {
    return `By checking this box, I consent to representatives of Education Directory and University Bound to contact me about educational opportunities via email, text, or phone, including my mobile phone number ${formattedPhoneNumberFunc(
      phone,
    )} using an automatic dialer. Message and data rates may apply. I understand that my consent is not a requirement for enrollment, and I may withdraw my consent at any time.`;
  }

  return `By clicking Agree and Continue, I consent to representatives of Education Directory and University Bound to contact me about educational opportunities via email, text, or phone, including my mobile phone number ${formattedPhoneNumberFunc(
    phone,
  )} using an automatic dialer. Message and data rates may apply. I understand that my consent is not a requirement for enrollment, and I may withdraw my consent at any time.`;
}

export const persistStateRoutes = [
  'get-started',
  'landing-page',
  'results',
  'area-of-interest',
  'subjects',
  'school',
];
export const persistLeadRoutes = ['get-started', 'landing-page', 'results'];
export const persistAppDataRoutes = ['clicks'];

import addUserSvg from '@/assets/icons/addUserSvg.svg';
import brushSvg from '@/assets/icons/brush.svg';
import businessSvg from '@/assets/icons/business.svg';
import campusSvg from '@/assets/icons/campus.svg';
import clockSvg from '@/assets/icons/clock.svg';
import clockTwoSvg from '@/assets/icons/clock2.svg';
import doubleTickSvg from '@/assets/icons/doubleCheck.svg';
import healthcareSvg from '@/assets/icons/healthcare.svg';
import labFlaskSvg from '@/assets/icons/labFlask.svg';
import lawHammerSvg from '@/assets/icons/lawHammer.svg';
import liberalArtSvg from '@/assets/icons/liberalArt.svg';
import onlineSvg from '@/assets/icons/online.svg';
import eitherSvg from '@/assets/icons/onlineAndCampus.svg';
import phoneSvg from '@/assets/icons/phoneSvg.svg';
import psychologySvg from '@/assets/icons/psychology.svg';
import scholarshipSvg from '@/assets/icons/scholarship.svg';
import doneSvg from '@/assets/icons/tick.svg';
import vocationalSvg from '@/assets/icons/vocational.svg';
import butterflyLogo from '@/assets/logo/butterflyLogo.svg';
import tick from '@/assets/logo/done.svg';
import exposurejob from '@/assets/logo/exposurejob.svg';
import getADegree from '@/assets/logo/get-a-degree.svg';
import myClassesOnline from '@/assets/logo/my-classes-online.svg';
import myOnlineDegree from '@/assets/logo/my-online-degree.svg';
import postuniversity from '@/assets/logo/postuniversity.svg';
import purdue from '@/assets/logo/purdue.svg';
//thankyou modal logos
import thejobboard from '@/assets/logo/thejobboard.svg';
import thejobboardwhite from '@/assets/logo/thejobboardwhite.svg';
import uLogo from '@/assets/logo/u-logo.svg';
import universityBound from '@/assets/logo/university-bound.svg';
import GCU from '@/assets/school-logos/GCU.png';
import PG from '@/assets/school-logos/PG.png';
import SLU from '@/assets/school-logos/Saint_Leo_University.png';
import SNHU from '@/assets/school-logos/SNHU.png';
import UMA from '@/assets/school-logos/UMA.png';
import { ILogo, StepData } from '@/typings';

import { formattedPhoneNumberFunc } from './utils';

export const howItWorksData = [
  {
    id: 1,
    stepNumber: 1,
    icon: addUserSvg,
    width: '36px',
    height: '26px',
    content:
      'Expand your skills or start something new, discover colleges by subject areas that matter to you',
  },
  {
    id: 2,
    stepNumber: 2,
    icon: phoneSvg,
    width: '21px',
    height: '36px',
    content: 'Narrow down your college search based on your desired interests',
  },
  {
    id: 3,
    stepNumber: 3,
    icon: doneSvg,
    width: '36px',
    height: '36px',
    content:
      'Compare top schools and decide which institutions best fit your need',
  },
];

export const areaOfInterestData = [
  {
    id: 1,
    hero_image: {
      id: 2,
      asset:
        'https://res.cloudinary.com/developermaxenius/image/upload/v1670573888/Education-directory/art-design_banner_ne8maa.png',
      name: 'w',
    },
    hero_heading: 'ART & DESIGN',
    hero_text:
      'Expand your skills or start something new, discover colleges by subject areas that matter to you. Online colleges make it easier to attend college because you can attend from',
  },
  {
    id: 2,
    hero_image: {
      id: 2,
      asset:
        'https://res.cloudinary.com/developermaxenius/image/upload/v1670573888/Education-directory/art-design_banner_ne8maa.png',
      name: 'w',
    },
    hero_heading: 'ART & DESIGN',
    hero_text:
      'Expand your skills or start something new, discover colleges by subject areas that matter to you. Online colleges make it easier to attend college because you can attend from',
  },
  {
    id: 3,
    hero_image: {
      id: 2,
      asset:
        'https://res.cloudinary.com/developermaxenius/image/upload/v1670573888/Education-directory/art-design_banner_ne8maa.png',
      name: 'w',
    },
    hero_heading: 'ART & DESIGN',
    hero_text:
      'Expand your skills or start something new, discover colleges by subject areas that matter to you. Online colleges make it easier to attend college because you can attend from',
  },
  {
    id: 4,
    hero_image: {
      id: 2,
      asset:
        'https://res.cloudinary.com/developermaxenius/image/upload/v1670573888/Education-directory/art-design_banner_ne8maa.png',
      name: 'w',
    },
    title: 'ART & DESIGN',
    hero_heading: 'ART & DESIGN',
    hero_text:
      'Expand your skills or start something new, discover colleges by subject areas that matter to you. Online colleges make it easier to attend college because you can attend from',
  },
];

export const logosData: ILogo[] = [
  {
    id: 1,
    image:
      'https://res.cloudinary.com/developermaxenius/image/upload/v1669615562/Edu-logos/snhu_tbbbcy.svg',
    link: 'https://www.snhu.edu/',
    name: 'snhu',
  },
  {
    id: 3,
    image:
      'https://res.cloudinary.com/developermaxenius/image/upload/v1669615564/Edu-logos/Berkeley_College_yozteb.svg',
    link: 'https://berkeley.yalecollege.yale.edu/',
    name: 'Berkeley College',
  },
  {
    id: 4,
    image:
      'https://res.cloudinary.com/developermaxenius/image/upload/v1669615557/Edu-logos/Penn_skb3cu.svg',
    link: 'https://www.upenn.edu/',
    name: 'Penn',
  },
  {
    id: 5,
    image:
      'https://res.cloudinary.com/developermaxenius/image/upload/v1669615559/Edu-logos/USC_University_yunqrw.svg',
    link: 'https://www.usc.edu/',
    name: 'USC University',
  },
  {
    id: 6,
    image:
      'https://res.cloudinary.com/developermaxenius/image/upload/v1669615563/Edu-logos/Purdue_hs8u7g.svg',
    link: 'https://www.purdue.edu/',
    name: 'Purdue',
  },
  {
    id: 7,
    image:
      'https://res.cloudinary.com/developermaxenius/image/upload/v1669615553/Edu-logos/Johns_Hopkins_uppnkp.svg',
    link: 'https://www.jhu.edu/',
    name: 'Johns Hopkins',
  },
];

export const navLinks = [
  {
    id: '#why-education-directory',
    name: 'Why Education Directory?',
  },
  {
    id: '#how-it-works',
    name: 'How it works',
  },
  {
    id: '#area-of-intrest',
    name: 'Vocations',
  },
  {
    id: '#schools',
    name: 'Schools',
  },
];

export const programNavLinks = [
  {
    id: 'overview',
    name: 'Overview',
  },
  {
    id: 'goals-outcomes',
    name: 'Goals & Outcomes',
  },
  {
    id: 'experience',
    name: 'Experience',
  },
  {
    id: 'careers',
    name: 'Careers',
  },
  {
    id: 'similar-programs',
    name: 'Similar programs',
  },
];
export const subNavLinks = [
  {
    id: 'overview',
    name: 'Overview',
  },
  {
    id: 'degrees',
    name: 'Degrees',
  },
  {
    id: 'requirements',
    name: 'Requirements',
  },
  {
    id: 'experience',
    name: 'Experience',
  },
  {
    id: 'careers',
    name: 'Careers',
  },
  {
    id: 'get-started',
    name: 'Get Started',
  },
];

export const aoiCareerLists = [
  {
    id: 1,
    name: 'Advertising art director',
  },
  {
    id: 2,
    name: 'Graphic designer',
  },
  {
    id: 3,
    name: 'Advertising art director',
  },
  {
    id: 4,
    name: 'Advertising art director',
  },
  {
    id: 6,
    name: 'Advertising art director',
  },
  {
    id: 8,
    name: 'Advertising art director',
  },
  {
    id: 9,
    name: 'Advertising art director',
  },
  {
    id: 189,
    name: 'Advertising art director',
  },
  {
    id: 37,
    name: 'Advertising art director',
  },
  {
    id: 49,
    name: 'Advertising art director',
  },
  {
    id: 65,
    name: 'Advertising art director',
  },
  {
    id: 63,
    name: 'Advertising art director',
  },
  {
    id: 38,
    name: 'Advertising art director',
  },
  {
    id: 23,
    name: 'Advertising art director',
  },
  {
    id: 19,
    name: 'Advertising art director',
  },
];
export const homePageData = {
  banner: {
    title: 'Find your perfect Degree program',
    description: `Expand your skills or start something new, discover
    colleges by subject areas that matter to you. Online
    colleges make it easier to attend college because you
    can attend from a distance and don’t have to commute.
    This is great news for you because earning a college
    degree may give you access to higher paying occupations*.`,
    image:
      'https://res.cloudinary.com/developermaxenius/image/upload/v1670573888/Education-directory/art-design_banner_ne8maa.png',
  },
  quote: {
    title: '“A Quote about how great it is to complete the form”',
    image: 'https://backend.educationdirectory.net/assets/quote_banner_home',
  },
};

export const aoiRequirements = [
  {
    id: 3,
    src: 'https://backend.educationdirectory.net/assets/requirements',
    title: 'What are the entry requirements to get onto an Art &Design Degree?',
    text: `Combine creativity with technological origination
                  and development of a project from start to finish.
                  Art programs can use interactive tools to create art
                  through technology, to share through digital media
                  or for business purposes such as marketing and
                  branding.`,
    lists: [
      {
        id: 2,
        list: 'Over 18 Years of Age',
      },
      {
        id: 23,
        list: 'Completed High School',
      },
      {
        id: 26,
        list: 'A Citizen of the United States',
      },
      {
        id: 82,
        list: 'Something else',
      },
    ],
  },
];
export const aoiDegrees = [
  {
    id: 3,
    src: 'https://backend.educationdirectory.net/assets/degrees',
    title: 'Which Art & Designs degrees can you study?',
    text: `Combine creativity with technological origination
                  and development of a project from start to finish.
                  Art programs can use interactive tools to create art
                  through technology, to share through digital media
                  or for business purposes such as marketing and
                  branding.`,
    lists: [
      {
        id: 2,
        list: 'Creative Technology BSc',
      },
      {
        id: 23,
        list: 'Fashion Jewellery BA',
      },
      {
        id: 26,
        list: 'Fine Art BFA/BA',
      },
      {
        id: 82,
        list: 'Graphic Design BA',
      },
    ],
  },
];

// export const thankYouCards = [
//   {
//     id: 0,
//     image:
//       'https://res.cloudinary.com/developermaxenius/image/upload/v1669615562/Edu-logos/snhu_tbbbcy.svg',
//     programs: {
//       options: [
//         {
//           title: 'AA Digital Photography',
//           value: 'AA Digital Photography',
//         },
//       ],
//       placeholder: 'AA Digital Photography',
//     },
//     questions: {
//       options: [
//         {
//           title: 'Here’s an additional question',
//           value: 'Here’s an additional question',
//         },
//       ],
//       placeholder: 'Here’s an additional question',
//     },
//   },
//   {
//     id: 1,
//     image:
//       'https://res.cloudinary.com/developermaxenius/image/upload/v1669615563/Edu-logos/Purdue_hs8u7g.svg',
//     programs: {
//       options: [
//         {
//           title: 'AASB Business',
//           value: 'AASB Business',
//         },
//       ],
//       placeholder: 'AASB Business',
//     },
//     questions: {
//       options: [
//         {
//           title: 'Here’s an additional question',
//           value: 'Here’s an additional question',
//         },
//       ],
//       placeholder: 'Here’s an additional question',
//     },
//   },
//   {
//     id: 2,
//     image:
//       'https://res.cloudinary.com/developermaxenius/image/upload/v1669615564/Edu-logos/Berkeley_College_yozteb.svg',
//     programs: {
//       options: [
//         {
//           title: 'BBA Financial Services',
//           value: 'BBA Financial Services',
//         },
//       ],
//       placeholder: 'BBA Financial Services',
//     },
//   },
// ];

export const arrayDomain = [
  {
    id: 0,
    logo: thejobboard,
    color: {
      bg: 'white',
      text: 'dark',
      circleBorder: '#21a0aa',
      iconColor:
        'brightness(0) saturate(100%) invert(56%) sepia(26%) saturate(1262%) hue-rotate(136deg) brightness(90%) contrast(81%)',
    },
    options: [
      {
        title: 'BS Accounting',
        value: ' BS Accounting',
      },
    ],
    points: {
      1: 'Here’s a really good thing about this brand',
      2: 'Here’s a really good thing about this brand',
      3: 'Here’s a really good thing about this brand',
    },
    completed: tick,
  },
  {
    id: 1,
    logo: postuniversity,
    color: {
      bg: 'white',
      text: 'dark',
      circleBorder: '#632c50',
      iconColor:
        ' brightness(0) saturate(100%) invert(21%) sepia(12%) saturate(2494%) hue-rotate(268deg) brightness(99%) contrast(93%)',
    },
    options: [
      {
        title: 'BS Accounting',
        value: ' BS Accounting',
      },
    ],
    points: {
      1: 'Here’s a really good thing about this brand',
      2: 'Here’s a really good thing about this brand',
      3: 'Here’s a really good thing about this brand',
    },
    completed: tick,
  },
  {
    id: 2,
    logo: exposurejob,
    color: {
      bg: 'dark',
      text: 'white',
      circleBorder: '#fff',
      iconColor:
        'brightness(0) saturate(100%) invert(99%) sepia(0%) saturate(7472%) hue-rotate(184deg) brightness(111%) contrast(96%)',
    },
    options: [
      {
        title: 'BS Accounting',
        value: ' BS Accounting',
      },
    ],
    points: {
      1: 'Here’s a really good thing about this brand',
      2: 'Here’s a really good thing about this brand',
      3: 'Here’s a really good thing about this brand',
    },
    completed: tick,
  },
  {
    id: 3,
    logo: uLogo,
    color: {
      bg: 'mauve',
      text: 'white',
      circleBorder: '#fff',
      iconColor:
        'brightness(0) saturate(100%) invert(99%) sepia(0%) saturate(7472%) hue-rotate(184deg) brightness(111%) contrast(96%)',
    },
    options: [
      {
        title: 'BS Accounting',
        value: ' BS Accounting',
      },
    ],
    points: {
      1: 'Here’s a really good thing about this brand',
      2: 'Here’s a really good thing about this brand',
      3: 'Here’s a really good thing about this brand',
    },
    completed: tick,
  },
  {
    id: 4,
    logo: thejobboardwhite,
    color: {
      bg: 'lightSeaGreen-400',
      text: 'white',
      circleBorder: '#fff',
      iconColor:
        'brightness(0) saturate(100%) invert(99%) sepia(0%) saturate(7472%) hue-rotate(184deg) brightness(111%) contrast(96%)',
    },
    options: [
      {
        title: 'BS Accounting',
        value: ' BS Accounting',
      },
    ],
    points: {
      1: 'Here’s a really good thing about this brand',
      2: 'Here’s a really good thing about this brand',
      3: 'Here’s a really good thing about this brand',
    },
    completed: tick,
  },
  {
    id: 5,
    logo: butterflyLogo,
    color: {
      bg: 'medium-Aquamarine',
      text: 'dark',
      circleBorder: '#000',
      iconColor:
        ' brightness(0) saturate(100%) invert(0%) sepia(8%) saturate(7466%) hue-rotate(215deg) brightness(95%) contrast(95%)',
    },
    options: [
      {
        title: 'BS Accounting',
        value: ' BS Accounting',
      },
    ],
    points: {
      1: 'Here’s a really good thing about this brand',
      2: 'Here’s a really good thing about this brand',
      3: 'Here’s a really good thing about this brand',
    },
    completed: tick,
  },
];
export const svgsIcons = [
  {
    id: 9,
    icon: campusSvg,
  },
  {
    id: 9,
    icon: campusSvg,
  },
  {
    id: 9,
    icon: campusSvg,
  },
];

export const courseOptions = [
  {
    title: 'Art & Design',
    value: 'art-design',
  },
  {
    title: 'Business',
    value: 'business',
  },
  {
    title: 'Computers & Technology',
    value: 'computer',
  },
  {
    title: 'Law & Criminal Justice',
    value: 'law',
  },
  {
    title: 'Culinary',
    value: 'culinary',
  },
  {
    title: 'Education & Teaching',
    value: 'education',
  },
  {
    title: 'Trade & Vocational',
    value: 'trade',
  },
];

export const interestedPrograms = [
  {
    id: 1,
    image: getADegree,
  },
  {
    id: 2,
    image: universityBound,
  },
  {
    id: 3,
    image: myClassesOnline,
  },
  {
    id: 4,
    image: myOnlineDegree,
  },

  {
    id: 5,
    image: purdue,
  },
];

export const programGoals = [
  {
    id: 3,
    src: 'https://backend.educationdirectory.net/assets/goals_img',
    title: 'Applied Engineering program goals',
    text: 'This includes instruction in computer systems; electronics and instrumentation; programmable logic controllers (PLCs); electric, hydraulic and pneumatic control systems; actuator and sensor systems; process control; robotics; applications to specific industrial tasks; and report preparation.',
    lists: [
      {
        id: 2,
        list: 'Critical thinking and problem solving skills based on a fundamental knowledge of humanities, social sciences, mathematics, physics, chemistry, engineering science and a broad range of applied engineering technical areas;',
      },
      {
        id: 23,
        list: 'Knowledge of global and societal concerns, ethics, and sustainability when making engineering decisions;',
      },
      {
        id: 26,
        list: 'Leadership and effective communication;',
      },
      {
        id: 82,
        list: 'Civic engagement and contributions to society and Lifelong learning and professional development.',
      },
    ],
  },
];
export const programOutcomes = [
  {
    id: 3,
    src: 'https://backend.educationdirectory.net/assets/outcomes',
    title: 'What are the Student Learning Outcomes',
    text: 'Graduates of the Associate of Science in Applied Engineering program will be able to:',
    lists: [
      {
        id: 2,
        list: 'Setup, calibrate, operate, and interpret results from industry-level tools and equipment.',
      },
      {
        id: 23,
        list: 'Apply knowledge of math, physics, chemistry, and engineering to diagnosing and repairing systems.',
      },
      {
        id: 26,
        list: 'Collect, organize, analyze, and interpret data to produce meaningful conclusions and recommendations.',
      },
      {
        id: 82,
        list: 'Present test results and repair recommendations while demonstrating leadership with confidence as part of multidisciplinary teams.',
      },
      {
        id: 852,
        list: 'Reference technology magazines, periodicals, news articles, patents, and publications to stay current with contemporary and future technologies and issues.',
      },
    ],
  },
];

export const programsData = [
  {
    id: 4,
    src: 'https://backend.educationdirectory.net/assets/art-design',
    name: 'Software engineering, AS',
    description:
      'Expand your skills or start something new, discover colleges by subject areas that matter to you. Online colleges make it easier to attend college because you can attend from',
  },
  {
    id: 45,
    src: 'https://res.cloudinary.com/developermaxenius/image/upload/v1670573888/Education-directory/art-design_banner_ne8maa.png',
    name: 'Robotics degree',
    description:
      'Expand your skills or start something new, discover colleges by subject areas that matter to you. Online colleges make it easier to attend college because you can attend from',
  },
  {
    id: 34,
    src: 'https://backend.educationdirectory.net/assets/goals_img',
    name: 'Chemical Engineering',
    description:
      'Expand your skills or start something new, discover colleges by subject areas that matter to you. Online colleges make it easier to attend college because you can attend from',
  },
  {
    id: 484,
    src: 'https://backend.educationdirectory.net/assets/goals_img',
    name: 'Software engineering, AS',
    description:
      'Expand your skills or start something new, discover colleges by subject areas that matter to you. Online colleges make it easier to attend college because you can attend from',
  },
  {
    id: 984,
    src: 'https://res.cloudinary.com/developermaxenius/image/upload/v1670573888/Education-directory/art-design_banner_ne8maa.png',
    name: 'Robotics degree',
    description:
      'Expand your skills or start something new, discover colleges by subject areas that matter to you. Online colleges make it easier to attend college because you can attend from',
  },
  {
    id: 964,
    src: 'https://res.cloudinary.com/developermaxenius/image/upload/v1670573888/Education-directory/art-design_banner_ne8maa.png',
    name: 'Chemical Engineering',
    description:
      'Expand your skills or start something new, discover colleges by subject areas that matter to you. Online colleges make it easier to attend college because you can attend from',
  },
];
export const dummyPageData = {
  id: 2,
  logos: [
    {
      id: 2,
      name: 'Snhu',
      image: 'https://backend.educationdirectory.net/logos/snhu.svg',
      link: 'https://www.snhu.edu/',
    },
    {
      id: 3,
      name: 'Berkeley College',
      image:
        'https://backend.educationdirectory.net/logos/Berkeley_College.svg',
      link: 'https://berkeley.yalecollege.yale.edu/',
    },
    {
      id: 4,
      name: 'Penn',
      image: 'https://backend.educationdirectory.net/logos/Penn.svg',
      link: 'https://www.upenn.edu/',
    },
    {
      id: 5,
      name: 'USC University',
      image: 'https://backend.educationdirectory.net/logos/USC_University.svg',
      link: 'https://www.usc.edu/',
    },
    {
      id: 6,
      name: 'Purdue',
      image: 'https://backend.educationdirectory.net/logos/Purdue.svg',
      link: 'https://www.purdue.edu/',
    },
    {
      id: 7,
      name: 'Johns Hopkins',
      image: 'https://backend.educationdirectory.net/logos/Johns_Hopkins.svg',
      link: 'https://www.jhu.edu/',
    },
  ],
  programs: [
    {
      id: 1,
      logos: [
        {
          id: 2,
          name: 'Snhu',
          image: 'https://backend.educationdirectory.net/logos/snhu.svg',
          link: 'https://www.snhu.edu/',
        },
        {
          id: 3,
          name: 'Berkeley College',
          image:
            'https://backend.educationdirectory.net/logos/Berkeley_College.svg',
          link: 'https://berkeley.yalecollege.yale.edu/',
        },
        {
          id: 4,
          name: 'Penn',
          image: 'https://backend.educationdirectory.net/logos/Penn.svg',
          link: 'https://www.upenn.edu/',
        },
        {
          id: 5,
          name: 'USC University',
          image:
            'https://backend.educationdirectory.net/logos/USC_University.svg',
          link: 'https://www.usc.edu/',
        },
        {
          id: 6,
          name: 'Purdue',
          image: 'https://backend.educationdirectory.net/logos/Purdue.svg',
          link: 'https://www.purdue.edu/',
        },
        {
          id: 7,
          name: 'Johns Hopkins',
          image:
            'https://backend.educationdirectory.net/logos/Johns_Hopkins.svg',
          link: 'https://www.jhu.edu/',
        },
      ],
      goals_image: {
        id: 8,
        name: 'goals_img',
        asset: 'https://backend.educationdirectory.net/assets/goals_img',
      },
      outcomes_image: {
        id: 9,
        name: 'outcomes',
        asset: 'https://backend.educationdirectory.net/assets/outcomes',
      },
      experience_image: {
        id: 2,
        name: 'experience',
        asset: 'https://backend.educationdirectory.net/assets/experience',
      },
      qoute_bg_image: {
        id: 7,
        name: 'quote_image',
        asset: 'https://backend.educationdirectory.net/assets/quote_image',
      },
      slug: 'criminal-justice',
      subject_as_heading: 'Art & Design',
      subject_as_text:
        'The study of criminal justice involves understanding the legal system and related topics such as law enforcement, security, and criminal behavior. This study typically involves courses in criminal law, investigation techniques, and criminology. Additionally, many programs also provide students with the opportunity to gain hands-on experience through internships and field placements. The goal of these programs is to prepare students for a variety of criminal justice-related careers.',
      goals_heading: 'Criminal Justice Program Goals',
      goals_text:
        'A criminal justice degree program provides knowledge and tools to students who want to advance professionally into leadership and management roles in criminal justice organizations. Classes in this program focus on criminology, law enforcement, juvenile justice, corrections, and research methods specifically oriented toward criminal justice professionals.',
      goals_list:
        'Critical thinking and problem solving skills based on a fundamental knowledge of the criminal justice system;\r\nKnowledge of global and societal concerns, ethics, and sustainability when making decisions;\r\nLeadership and effective communication;\r\nCivic engagement and contributions to society and Lifelong learning and professional development.',
      outcomes_heading: 'What are the Student Learning Outcomes',
      outcomes_text:
        'The degree in Criminal Justice and Law Enforcement Administration provides an advanced knowledge of trends and developments in the management of criminal justice organizations. These online criminal justice courses offer leadership, critical thinking, and effective decision making required in organizations including law enforcement, corrections, court, and community-based justice delivery offices.',
      outcomes_list:
        'Develop and apply basic statistical skills and quantitative reasoning for critical evaluation of quantitative information;\r\nUnderstand the roles, functions, and impacts of an effective criminal justice system;\r\nExamine ethical standards and issues in criminal justice processes and in professional decision making including the ever-present tension between effective crime control and appropriate civil liberties;\r\nSurvey a range of theoretical approached that explain crime and apply theoretical reasoning and concepts to observations of crime and control;\r\nAppreciate the investigative profession as a scientific field sample and apply physical science methods to solve forensic problems.',
      experience_heading:
        'What experience do I need to be able to apply for a Criminal Justice program?',
      experience_text:
        'There is no one-size-fits-all answer to this question, as the experience required for a BA in criminal justice will vary depending on the specific program. However, most programs will require some prior experience in the field, whether it be through coursework, internships, or other opportunities. Additionally, a strong understanding of the law and the criminal justice system is typically required for admission into most programs.',
      experience_list:
        'Previous Experience;\r\nRequired Coursework;\r\nAbility to satisfy background check;',
      careers_heading: 'Criminal Justice Careers',
      careers_text:
        'There are a variety of careers available for those with criminal justice degrees. Many choose to work as lawyers, while others find jobs in law enforcement, corrections, and probation. \r\n\r\nThere are also many opportunities for those with these degrees to teach at the collegiate level.',
      careers_first_sub_heading: 'Earning Potential for Graduates',
      careers_first_sub_heading_text:
        'The earning potential for criminal justice graduates is quite high. Many individuals with these degrees are able to find jobs that pay quite well, especially if they are able to find positions in the more competitive fields. Additionally, those with law and criminal justice degrees may also have the opportunity to earn bonuses or other forms of supplemental income.\r\n\r\nThe salary of a criminal justice graduate can vary depending on the type of job and level of experience. Generally, criminal justice graduates can expect to earn more than graduates of other fields. Additionally, salaries can vary widely depending on the specific job title, employer, and location. According to the US Bureau of Labor Statistics, the median annual wage for police and detectives was $63,380 in May 2019.',
      careers_second_sub_heading:
        'What Jobs can Criminal Justice Graduates get?',
      careers_second_sub_heading_text:
        'Criminal justice graduates can pursue a variety of jobs in the legal, law enforcement, and security fields. These roles include police officer, detective, customs officer, border patrol agent, probation officer, and parole officer. Additionally, graduates may also pursue more specialized roles such as crime scene investigator, forensic scientist, private investigator, or lawyer. Many of these positions require specialized certifications or degrees in criminal justice.',
      careers_list:
        'Police Officer;\r\nDetective;\r\nCustoms Officer;\r\nBorder Patrol Agent;\r\nProbation Officer;\r\nParole Officer;\r\nCorrectional Officer;\r\nCrime Scene Investigator;\r\nForensic Scientist;\r\nPrivate Investigator;\r\nLawyer;\r\nJudge;\r\nJuvenile Court Officer;\r\nCourt Reporter;\r\nVictim Advocate;\r\nCounselor;\r\nSecurity Guard;\r\nFraud Examiner;\r\nFraud Investigator;\r\nCybercrime Investigator;\r\nIntelligence Analyst;\r\nHomeland Security Officer;\r\nHomeland Security Analyst;\r\nDrug Enforcement Agent;\r\nFBI Agent;\r\nSecret Service Agent;\r\nU.S. Marshal;\r\nTSA Agent',
      quote_text:
        '“Education Directory found me an AS in Applied Engineering and now I’m working in my dream job”',
      qoute_footer: '– Madame C.J. Walker',
      hero: 1,
    },
  ],
  requirements_image: {
    id: 3,
    name: 'requirements',
    asset: 'https://backend.educationdirectory.net/assets/requirements',
  },
  degrees_image: {
    id: 4,
    name: 'degrees',
    asset: 'https://backend.educationdirectory.net/assets/degrees',
  },
  experience_image: {
    id: 2,
    name: 'experience',
    asset: 'https://backend.educationdirectory.net/assets/experience',
  },
  qoute_bg_image: {
    id: 7,
    name: 'quote_image',
    asset: 'https://backend.educationdirectory.net/assets/quote_image',
  },
  slug: 'business',
  overview_heading: 'Business Overview',
  overview_text:
    'A business degree is an academic degree earned in business administration, management, or commerce. The degree is designed to prepare students for a career in business. Business degrees are offered at the undergraduate and graduate level, and some programs may also offer certification or licensure.\r\n\r\nUndergraduate business degrees are typically four-year programs that include coursework in accounting, finance, marketing, and management. Graduate business degrees are typically two-year programs that include coursework in advanced business topics. Business degrees may be earned in-person or online.\r\n\r\nBusiness degrees can lead to careers in a variety of industries, including accounting, finance, marketing, and management. Business degree holders may also pursue careers as entrepreneurs or start their own businesses.',
  degrees_can_study_heading: 'Which Business degrees can you study?',
  degrees_can_study_text:
    'A business degree can provide students with the skills and knowledge necessary to be successful in business. Business degrees typically include coursework in accounting, finance, marketing, and management. Business education programs may be offered at the undergraduate and graduate level, and some programs may also offer certification or licensure.  Some examples degrees include:',
  degrees_list:
    'Economics B.B.A;\r\nAccounting B.B.A;\r\n Entrepreneurship and Venture Management B.B.A;\r\n Finance B.B.A;\r\n Sports Business B.B.A;\r\n Marketing B.B.A',
  requirements_heading:
    'What are the entry requirements to get into a Business Degree?',
  requirements_text:
    'The requirements to get a business degree vary by program, but most programs require students to complete coursework in accounting, finance, marketing, and management. Some programs may also require students to take a business entrance exam, such as the GMAT or GRE. Business degrees may be earned in-person or online.  Entry Requirements can include:',
  requirements_list:
    'Over 18 years of Age;\r\nCompleted High School;\r\nA Citizen of the United States;\r\nMinimum Test Scores',
  experience_heading:
    'What experience do I need to be able to apply for a BS in Business Management?',
  experience_text:
    'Most business degree programs do not require students to have experience, but some programs may prefer or require students to have some experience in business. Check with the specific program for requirements.',
  experience_list:
    'A Portfolio;\r\nAn Interest in general business practices;\r\n CV;\r\n List of projects/ work experience',
  careers_heading: 'Business Careers',
  careers_text:
    'There are many careers in business. Business degree holders may pursue careers in a variety of industries, including accounting, finance, marketing, and management. Business degree holders may also pursue careers as entrepreneurs or start their own businesses.\r\n\r\nBusiness degree holders can find careers in many different industries and sectors. Some popular industries for business degree holders include banking and finance, consulting, human resources, marketing, and real estate. Business degree holders may also find careers in government, nonprofit organizations, and small businesses.',
  careers_first_sub_heading: 'Earning Potential for Graduates',
  careers_first_sub_heading_text:
    'The earning potential for business degree graduates is high. Business degree holders can find careers in many different industries and sectors, and the average salary for business degree holders is $75,000.\r\n\r\nBusiness degree holders can find careers in many different industries and sectors, and the average salary for business degree holders is $75,000. The highest-paying industries for business degree holders include banking and finance, consulting, and real estate. The lowest-paying industries for business degree holders include human resources and marketing.',
  careers_second_sub_heading: 'What Jobs can Business Graduates get?',
  careers_second_sub_heading_text:
    'There are many different types of jobs that business graduates can get. Business degree holders can find careers in many different industries and sectors, including banking and finance, consulting, human resources, marketing, and real estate. Business degree holders may also find careers in government, nonprofit organizations, and small businesses.',
  careers_list:
    'Business Owner;\r\nCEO;\r\nCFO;\r\nCOO;\r\nPresident;\r\nVice President;\r\nExecutive;\r\nManager;\r\nDirector;\r\nAssistant Manager;\r\nSupervisor;\r\nTeam Leader;\r\nBusiness Analyst;\r\nConsultant;\r\nProject Manager;\r\nBusiness Writer;\r\nBusiness Coach;\r\nBusiness Trainer;\r\nRecruiter;\r\nHuman Resources Manager;\r\nOffice Manager;\r\nAdministrative Assistant;\r\nExecutive Assistant;\r\nOffice Administrator;\r\nFacilities Manager',
  quote_text:
    '“I had to make my own living and my own opportunity. But I made it! Don’t sit down and wait for the opportunities to come. Get up and make them.”',
  qoute_footer: '– Madame C.J. Walker',
  hero: 2,
};

export const steps = [
  {
    step: 1,
    heading: 'I’d Like my Classes',
    radio: [
      {
        title: 'Online',
        value: 'online',
        icon: campusSvg,
      },
      {
        title: 'On Campus',
        value: 'on-campus',
        icon: eitherSvg,
      },
      {
        title: 'Either',
        value: 'either',
        icon: eitherSvg,
      },
    ],
    selected: '',
  },
  {
    step: 2,
    heading: 'When would you like to start?',
    radio: [
      {
        title: 'Immediately',
        value: '0',
        icon: eitherSvg,
      },
      {
        title: '1 - 3 Months',
        value: '1',
        icon: eitherSvg,
      },
      {
        title: '4 - 6 Months',
        value: '4',
        icon: eitherSvg,
      },
    ],
    selected: '',
  },
  {
    step: 3,
    heading: 'When would you like to start?',
    radio: [
      {
        title: 'Select All',
        value: 'selectall',
        icon: eitherSvg,
      },
      {
        title: '1 - 3 Months',
        value: '0',
        icon: eitherSvg,
      },
      {
        title: '4 - 6 Months',
        value: 'in6months',
        icon: eitherSvg,
      },
      {
        title: 'Immediately',
        value: 'immediately',
        icon: eitherSvg,
      },
      {
        title: '1 - 3 Months',
        value: 'in3months',
        icon: eitherSvg,
      },
      {
        title: '4 - 6 Months',
        value: 'in6months',
        icon: eitherSvg,
      },
    ],
    selected: '',
  },
];

//timer
export const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
};

export const INITIAL_COUNT = 60;

export function generateAgeYears(startYear = 1956, endYear = 2006) {
  const years = [];

  for (let i = endYear; i >= startYear; i--) {
    years.push({
      title: `${i}`,
      value: `${i}`,
    });
  }
  return years;
}
export function generateYears(numYears = 50) {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < numYears; i++) {
    years.push({
      title: `${currentYear - i}`,
      value: `${currentYear - i}`,
    });
  }
  return years;
}

export const stepOne = {
  key: 'classes',
  heading: 'I’d Like my Classes',
  options: [
    {
      title: 'Either',
      value: 'Either',
      icon: eitherSvg,
    },
    {
      title: 'Online',
      value: 'Online',
      icon: onlineSvg,
    },
    {
      title: 'On Campus',
      value: 'Campus',
      icon: campusSvg,
    },
  ],
};
export const stepTwo = {
  key: 'like_to_start',
  heading: 'When would you like to start?',
  subHeading: 'Select one answer',
  options: [
    {
      title: 'Immediately',
      value: '0',
      icon: clockSvg,
    },
    {
      title: '1 - 3 Months',
      value: '1',
      icon: clockTwoSvg,
    },
    {
      title: '4 - 6 Months',
      value: '4',
      icon: clockTwoSvg,
    },
  ],
};

export const stepThree = {
  key: 'interest',
  heading: 'Which areas of study are you interested in?',
  subHeading: 'Select one or more areas',
  options: [
    {
      title: 'Select All',
      value: 'selectall',
      icon: doubleTickSvg,
    },
    {
      title: 'Education & Teaching',
      value: 'Education & Teaching',
      icon: scholarshipSvg,
    },
    {
      title: 'Law & Criminal Justice',
      value: 'Criminal Justice',
      icon: lawHammerSvg,
    },
    {
      title: 'Art & Design',
      value: 'Art & Design',
      icon: brushSvg,
    },
    {
      title: 'Liberal Arts',
      value: 'Liberal Arts',
      icon: liberalArtSvg,
    },
    {
      title: 'Nursing & Healthcare',
      value: 'Nursing',
      icon: healthcareSvg,
    },
    {
      title: 'Business',
      value: 'Business',
      icon: businessSvg,
    },
    {
      title: 'Psychology & Counseling',
      value: 'Psychology And Counseling',
      icon: psychologySvg,
    },
    {
      title: 'Science & Engineering',
      value: 'Science & Engineering',
      icon: labFlaskSvg,
    },
    {
      title: 'Computers & Technology',
      value: 'Computers & Technology',
      icon: onlineSvg,
    },
    {
      title: 'Trade & Vo-Tech',
      value: 'Trade & Vo-Tech',
      icon: vocationalSvg,
    },
  ],
};

export const stepFour = {
  heading: 'Your Education',
  subHeading: 'Please answer all the questions',
  dropDown: [
    {
      key: 'current_education_level',
      placeholder: 'Highest level of education',
      options: [
        {
          title: 'High School Diploma',
          value: 'High School Diploma',
        },
        { title: 'GED', value: 'GED' },
        {
          title: 'Some College',
          value: 'Some College',
        },
        { title: 'Associates', value: 'Associates' },
        { title: 'Bachelors', value: 'Bachelors' },
        { title: 'Masters', value: 'Masters' },
        { title: 'Doctoral', value: 'Doctoral' },
      ],
    },
    {
      key: 'hsyear',
      placeholder: 'High School Graduation year',
      options: generateYears(),
    },
    {
      key: 'currently_enrolled_in_college',
      placeholder: 'Are you currently enrolled?',
      options: [
        { title: 'No', value: 'No' },
        { title: 'Yes', value: 'Yes' },
      ],
    },
    {
      key: 'license',
      placeholder: 'Select License',
      options: [
        { title: 'None', value: 'None' },
        // { title: 'RN Licence', value: 'RN Licence' },
        // { title: 'Teaching Certificate', value: 'Teaching Certificate' },
        { title: 'Both', value: 'Both' },
      ],
    },
  ],
};

// export const stepFive = {
//   heading: 'Your Education',
//   subHeading: 'Please answer all the questions',

// };

//schools mock data
export const cities = [
  {
    name: 'Alabama',
    colleges: ['University of Alabama', 'Auburn University'],
  },
  {
    name: 'Alaska',
    colleges: [
      'University of Alaska Anchorage',
      'University of Alaska Fairbanks',
    ],
  },
  {
    name: 'Arizona',
    colleges: ['Arizona State University', 'University of Arizona'],
  },
  {
    name: 'Arkansas',
    colleges: ['University of Arkansas', 'Arkansas State University'],
  },
  {
    name: 'California',
    colleges: ['University of California, Berkeley', 'Stanford University'],
  },
  {
    name: 'Colorado',
    colleges: ['University of Colorado Boulder', 'Colorado State University'],
  },
  {
    name: 'Connecticut',
    colleges: ['Yale University', 'University of Connecticut'],
  },
  {
    name: 'Delaware',
    colleges: ['University of Delaware', 'Delaware State University'],
  },
  {
    name: 'Florida',
    colleges: ['University of Florida', 'Florida State University'],
  },
  {
    name: 'Georgia',
    colleges: ['University of Georgia', 'Georgia Institute of Technology'],
  },
  {
    name: 'Hawaii',
    colleges: ['University of Hawaii at Manoa', 'Hawaii Pacific University'],
  },
  {
    name: 'Idaho',
    colleges: ['Boise State University', 'University of Idaho'],
  },
  {
    name: 'Illinois',
    colleges: [
      'University of Illinois at Urbana-Champaign',
      'Northwestern University',
    ],
  },
  {
    name: 'Indiana',
    colleges: ['Indiana University Bloomington', 'Purdue University'],
  },
  {
    name: 'Iowa',
    colleges: ['University of Iowa', 'Iowa State University'],
  },
  {
    name: 'Kansas',
    colleges: ['University of Kansas', 'Kansas State University'],
  },
  {
    name: 'Kentucky',
    colleges: ['University of Kentucky', 'University of Louisville'],
  },
  {
    name: 'Louisiana',
    colleges: ['Louisiana State University', 'Tulane University'],
  },
  {
    name: 'Maine',
    colleges: ['University of Maine', 'Bowdoin College'],
  },
  {
    name: 'Maryland',
    colleges: [
      'University of Maryland, College Park',
      'Johns Hopkins University',
    ],
  },
  {
    name: 'Massachusetts',
    colleges: ['Harvard University', 'Massachusetts Institute of Technology'],
  },
  {
    name: 'Michigan',
    colleges: ['University of Michigan', 'Michigan State University'],
  },
  {
    name: 'Minnesota',
    colleges: ['University of Minnesota', 'University of St. Thomas'],
  },
  {
    name: 'Mississippi',
    colleges: ['University of Mississippi', 'Mississippi State University'],
  },
  {
    name: 'Missouri',
    colleges: ['University of Missouri', 'Washington University in St. Louis'],
  },
  {
    name: 'Montana',
    colleges: ['University of Montana', 'Montana State University'],
  },
  {
    name: 'Nebraska',
    colleges: ['University of Nebraska-Lincoln', 'Creighton University'],
  },
  {
    name: 'Nevada',
    colleges: ['University of Nevada, Las Vegas', 'University of Nevada, Reno'],
  },
  {
    name: 'New Hampshire',
    colleges: ['Dartmouth College', 'University of New Hampshire'],
  },
  {
    name: 'New Jersey',
    colleges: ['Princeton University', 'Rutgers University'],
  },
  {
    name: 'New Mexico',
    colleges: ['University of New Mexico', 'New Mexico State University'],
  },
  {
    name: 'New York',
    colleges: ['Columbia University', 'New York University'],
  },
  {
    name: 'North Carolina',
    colleges: [
      'University of North Carolina at Chapel Hill',
      'Duke University',
    ],
  },
  {
    name: 'North Dakota',
    colleges: ['University of North Dakota', 'North Dakota State University'],
  },
  {
    name: 'Ohio',
    colleges: ['Ohio State University', 'University of Cincinnati'],
  },
  {
    name: 'Oklahoma',
    colleges: ['University of Oklahoma', 'Oklahoma State University'],
  },
  {
    name: 'Oregon',
    colleges: ['University of Oregon', 'Oregon State University'],
  },
  {
    name: 'Pennsylvania',
    colleges: ['University of Pennsylvania', 'Carnegie Mellon University'],
  },
  {
    name: 'Rhode Island',
    colleges: ['Brown University', 'University of Rhode Island'],
  },
  {
    name: 'South Carolina',
    colleges: ['University of South Carolina', 'Clemson University'],
  },
  {
    name: 'South Dakota',
    colleges: ['University of South Dakota', 'South Dakota State University'],
  },
  {
    name: 'Tennessee',
    colleges: ['University of Tennessee', 'Vanderbilt University'],
  },
  {
    name: 'Texas',
    colleges: ['University of Texas at Austin', 'Texas A&M University'],
  },
  {
    name: 'Utah',
    colleges: ['University of Utah', 'Brigham Young University'],
  },
  {
    name: 'Vermont',
    colleges: ['University of Vermont', 'Middlebury College'],
  },
  {
    name: 'Virginia',
    colleges: ['University of Virginia', 'Virginia Tech'],
  },
  {
    name: 'Washington',
    colleges: ['University of Washington', 'Washington State University'],
  },
  {
    name: 'West Virginia',
    colleges: ['West Virginia University', 'Marshall University'],
  },
  {
    name: 'Wisconsin',
    colleges: ['University of Wisconsin-Madison', 'Marquette University'],
  },
  {
    name: 'Wyoming',
    colleges: ['University of Wyoming', 'Casper College'],
  },
];

export const thanksPolicy =
  'I acknowledge that, by clicking the checkbox as my official signature, I consent to representatives of universityNames, contacting me about educational opportunities via email, text, or phone, including my mobile phone number(s), using an automatic dialer, or pre-recorded message. Message and data rates may apply. I understand that my consent is not a requirement for enrollment, and I may withdraw my consent at any time.';

export const adOptimizorData = {
  searchResultId: 'acbb214a-e69e-4394-bea0-3b48f6997cca',
  duration: 446,
  items: [
    {
      itemId: '458',
      brandName: 'Florida Career College',
      networkSort: 1,
      requestDuration: 306,
      sourceID: null,
      extClickID: 'testClickID',
      advertiserId: '409',
      displayName:
        'Earn A Business Office Administration Diploma - Start Building A Future You Can Be Proud Of',
      adCopyVersion: 1,
      headline:
        'Learn valuable technical skills like - Microsoft Word&#174;, Microsoft Excel&#174;, Microsoft PowerPoint&#174; and more!&lt;br /&gt;Prepare for career opportunities like: Administrative Assistant, Secretary, Customer Service Rep, and more!&lt;br /&gt;Fast: Prepare for a career in as few as 10 months&lt;br /&gt;Convenient: Daytime and evening classes available',
      blurbs: [
        'Learn valuable technical skills like - Microsoft Word®, Microsoft Excel®, Microsoft PowerPoint® and more!',
        'Prepare for career opportunities like: Administrative Assistant, Secretary, Customer Service Rep, and more!',
        'Fast: Prepare for a career in as few as 10 months',
        'Convenient: Daytime and evening classes available',
        'Helpful: Financial Aid available to those who qualify',
      ],
      programAdCopy: {
        customVar: [null, null, null],
        constraints: [],
        location: '',
        advertiserName: '',
        programName: '',
        programDescription: '',
        imageUrl: '',
      },
      imageUrl:
        'https://cdn.myadoptimizer.com/maojsfiles/images/LogoAdvertiser_000458_52ce13ea-5a04-42cc-8c44-919677e99f04.jpg',
      destUrl:
        'https://api.myadoptimizer.com/api/MAOHttpRedirect?src=https%3A%2F%2Finfo.floridacareercollege.com%2Fbusiness-office-administration%2F%3Fadkey%3DIS1CAEXN00%26ctc%3D877-425-6149%26utm_source%3Dcexplorer%26utm_medium%3Dcpc%26utm_campaign060118-fcc-cpc%26utm_content%3DFCC-Business%26CCK%3Dacbb214a-e69e-4394-bea0-3b48f6997cca%7Cfcc_business%26t%3DtestClickID&LandingPageID=43&EventID=acbb214a-e69e-4394-bea0-3b48f6997cca&AdNetworkAPIID=44&cpc=34.50&Brand=Florida Career College&Title=Earn A Business Office Administration Diploma - Start Building A Future You Can Be Proud Of&CB=1VawjEjip8ij5oaSZJZ0mw==&M=4XarSvqYDCayCqZpzLZFSg==&Weight=34.50&BidModifiers=50.00&NetworkAdID=458&SourceID=&LandingPageURL=',
      impressionUrl:
        'https://api.myadoptimizer.com/api/MAOSaveResults?LandingPageID=43&AdNetworkAPIID=44&EventID=acbb214a-e69e-4394-bea0-3b48f6997cca&AdCampaignID=458&RequestTypeID=4',
      revenue: 34.5,
      baseRevenue: 23.0,
      isOnlineSchool: null,
      schoolAddress: '',
      schoolCity: '',
      schoolState: '',
      schoolZipCode: '',
      bidModifierLog: [
        'Ad Placement: ICF - Value: 50.00%',
        'States: PA - Value: -10.00%',
        'Tuesday: 14:40 - Value: 10.00%',
      ],
      weight: 34.5,
      statusId: 1,
      trackingURL:
        'https://api.myadoptimizer.com/api/MAOLeadTracking?AdNetworkAPIID=44&LandingPageID=43&EventID=acbb214a-e69e-4394-bea0-3b48f6997cca&IP=123.32.32.123&AdCampaignID=458',
      displayUrl:
        'http://www.floridacareercollege.com/business-office-administration',
    },
    {
      itemId: '4583',
      brandName: 'Florida Career College',
      networkSort: 1,
      requestDuration: 306,
      sourceID: null,
      extClickID: 'testClickID',
      advertiserId: '409',
      displayName:
        'Earn A Business Office Administration Diploma - Start Building A Future You Can Be Proud Of',
      adCopyVersion: 1,
      headline:
        'Learn valuable technical skills like - Microsoft Word&#174;, Microsoft Excel&#174;, Microsoft PowerPoint&#174; and more!&lt;br /&gt;Prepare for career opportunities like: Administrative Assistant, Secretary, Customer Service Rep, and more!&lt;br /&gt;Fast: Prepare for a career in as few as 10 months&lt;br /&gt;Convenient: Daytime and evening classes available',
      blurbs: [
        'Learn valuable technical skills like - Microsoft Word®, Microsoft Excel®, Microsoft PowerPoint® and more!',
        'Prepare for career opportunities like: Administrative Assistant, Secretary, Customer Service Rep, and more!',
        'Fast: Prepare for a career in as few as 10 months',
        'Convenient: Daytime and evening classes available',
        'Helpful: Financial Aid available to those who qualify',
      ],
      programAdCopy: {
        customVar: [null, null, null],
        constraints: [],
        location: '',
        advertiserName: '',
        programName: '',
        programDescription: '',
        imageUrl: '',
      },
      imageUrl:
        'https://cdn.myadoptimizer.com/maojsfiles/images/LogoAdvertiser_000458_52ce13ea-5a04-42cc-8c44-919677e99f04.jpg',
      destUrl:
        'https://api.myadoptimizer.com/api/MAOHttpRedirect?src=https%3A%2F%2Finfo.floridacareercollege.com%2Fbusiness-office-administration%2F%3Fadkey%3DIS1CAEXN00%26ctc%3D877-425-6149%26utm_source%3Dcexplorer%26utm_medium%3Dcpc%26utm_campaign060118-fcc-cpc%26utm_content%3DFCC-Business%26CCK%3Dacbb214a-e69e-4394-bea0-3b48f6997cca%7Cfcc_business%26t%3DtestClickID&LandingPageID=43&EventID=acbb214a-e69e-4394-bea0-3b48f6997cca&AdNetworkAPIID=44&cpc=34.50&Brand=Florida Career College&Title=Earn A Business Office Administration Diploma - Start Building A Future You Can Be Proud Of&CB=1VawjEjip8ij5oaSZJZ0mw==&M=4XarSvqYDCayCqZpzLZFSg==&Weight=34.50&BidModifiers=50.00&NetworkAdID=458&SourceID=&LandingPageURL=',
      impressionUrl:
        'https://api.myadoptimizer.com/api/MAOSaveResults?LandingPageID=43&AdNetworkAPIID=44&EventID=acbb214a-e69e-4394-bea0-3b48f6997cca&AdCampaignID=458&RequestTypeID=4',
      revenue: 34.5,
      baseRevenue: 23.0,
      isOnlineSchool: null,
      schoolAddress: '',
      schoolCity: '',
      schoolState: '',
      schoolZipCode: '',
      bidModifierLog: [
        'Ad Placement: ICF - Value: 50.00%',
        'States: PA - Value: -10.00%',
        'Tuesday: 14:40 - Value: 10.00%',
      ],
      weight: 34.5,
      statusId: 1,
      trackingURL:
        'https://api.myadoptimizer.com/api/MAOLeadTracking?AdNetworkAPIID=44&LandingPageID=43&EventID=acbb214a-e69e-4394-bea0-3b48f6997cca&IP=123.32.32.123&AdCampaignID=458',
      displayUrl:
        'http://www.floridacareercollege.com/business-office-administration',
    },
  ],
};

export const schoolFields = [
  'result_set_identifier',
  'distance_miles',
  'degree_level',
  'result_type',
  'school',
  'brand_name',
  'logo',
  'schoolid',
  'clientid',
  'consent',
  'payout',
  'location',
  'state',
  'exclusive',
];
export const programFields = [
  'result_identifier',
  'online',
  'program',
  'questions',
];

// Below structure has co-dependancy with thankyou-modal mappings
// TODO: move below structure into the form/component level
export const intrestedSubjectArea = [
  {
    title: 'Business',
    value: 'Business',
  },
  {
    title: 'Psychology',
    value: 'Psychology And Counseling',
  },
  {
    title: 'Criminal Justice & Legal',
    value: 'Criminal Justice',
  },
  {
    title: 'Technology',
    value: 'Computers & Technology',
  },
  {
    title: 'Education & Liberal Arts',
    value: 'Education & Teaching',
  },
  {
    title: 'Healthcare',
    value: 'Nursing',
  },
  {
    title: 'Art & Design',
    value: 'Art & Design',
  },
  {
    title: 'Hospitality & Culinary Arts',
    value: 'Hospitality',
  },
  {
    title: 'Nursing',
    value: 'Nursing',
  },
  {
    title: 'Trade and Vocational',
    value: 'Trade & Vo-Tech',
  },
];

export const usMilitaryAssociated = [
  {
    title: 'Active Duty(AD)',
    value: 'Active Duty(AD)',
  },
  {
    title: 'Selective Reserve(SR)',
    value: 'Reserve',
  },
  {
    title: 'Spouse of AD os SR',
    value: 'Spouse of AD os SR',
  },
  {
    title: 'Veteren',
    value: 'Veteren',
  },
  {
    title: 'None',
    value: 'None',
  },
];

export const doNotSellMyInfoForm = [
  {
    id: '1',
    type: 'text',
    label: 'First Name',
    value: '',
    error: '',
    placeholder: 'Enter first name',
  },
  {
    id: '2',
    type: 'text',
    label: 'Last Name',
    value: '',
    error: '',
    placeholder: 'Enter last name',
  },
  {
    id: '3',
    type: 'email',
    label: 'Email',
    value: '',
    error: '',
    placeholder: 'Enter email',
  },
  {
    id: '4',
    type: 'tel',
    label: 'Phone',
    value: '',
    error: '',
    placeholder: 'Enter phone',
  },
  {
    id: '5',
    type: 'text',
    label: 'State',
    value: '',
    error: '',
    placeholder: 'Enter state',
  },
];

export const interestedProgramsData = [
  {
    school_logo: SNHU,
    school_name: 'Southern New Hampshire University',
    location: 'Online',
    star_rating: '5 Stars',
    comment_1: 'Low Online Tuition',
    review_1: 'Transfer Up to 90 Credits',
    description:
      'At SNHU, we think the “best” online university is likely different for different students. When you’re thinking about what the best online university may be for you, you’ll want to consider the best combination of high-quality education, low cost, a generous transfer policy (if you have college credits already), a best-in-class online experience, and the best student support. And, of course, the availability of the degree you want.',
    primary_colour_pixel: '#093372',
    secondary_color_pixel: 'white',
    website: 'https://www.snhu.edu',
    program_specialist: [
      'Accounting (BS)',
      'Finance (BS)',
      'Criminal Justice (BS)',
      'Homeland Security and Counterterrorism (BS)',
      'Game Art & Development (BA)',
      'Social Media Marketing (BS)',
    ],
  },
  {
    school_logo: PG,
    school_name: 'Purdue Global',
    location: 'Online',
    star_rating: '4.5 Stars',
    comment_1: 'Your Comeback Starts Now',
    review_1: 'Ranked #8 Most Innovative School in the U.S.',
    description:
      "Not sure if Purdue Global is right for you? Experience a Purdue Global undergraduate program for an introductory 3-week period. There's no financial obligation and no cost to apply.",
    primary_colour_pixel: '#d4ba91',
    secondary_color_pixel: '',
    website: 'https://www.purdueglobal.edu',
    program_specialist: [
      'Communication (BS)',
      'Master of Business Administration',
      'Management and Leadership (MS))',
      'Master of Health Care Administration',
      'Bachelor of Science in Analytics',
      'Bachelor of Science in Psychology',
    ],
  },
  {
    school_logo: GCU,
    school_name: 'Grand Canyon University',
    location: 'Online',
    star_rating: '4.5 Stars',
    comment_1: 'Online Classes Starting Every Week',
    review_1: '2nd in Wage Growth',
    description:
      'Grand Canyon University is a private Christian university located in Phoenix, Arizona. We are dedicated to helping our students change their lives for the better through education. We offer a wide range of programs at both the undergraduate and graduate levels that you can earn on campus and online. Our dedicated faculty and staff will be with you every step of the way to ensure you reach your goals.',
    primary_colour_pixel: '#4b2e8d',
    secondary_color_pixel: 'white',
    website: 'https://www.gcu.edu ',
    program_specialist: [
      'Bachelor of Arts in Advertising and Graphic Design',
      'Bachelor of Arts in Christian Studies',
      'Bachelor of Arts in Digital Design',
      'Bachelor of Arts in History',
      'Bachelor of Science in Psychology',
      'Bachelor of Science in Hospitality Management',
    ],
  },
  {
    school_logo: UMA,
    school_name: 'Ultimate Medical Academy',
    location: 'Online',
    star_rating: '4 Stars',
    comment_1: 'Earn Your Healthcare Degree',
    review_1: 'Nonprofit Allied Health School',
    description:
      'Ultimate Medical Academy has been committed to helping students succeed in healthcare careers for the past 29 years. That’s why we offer students a connected support system from the start of their education to beyond graduation.',
    primary_colour_pixel: '#0095c7',
    secondary_color_pixel: 'white',
    website: 'https://www.ultimatemedical.edu',
    program_specialist: [
      'Health Sciences - Medical Administrative Assistant',
      'Health and Human Services',
      'Medical Billing and Coding',
      'Emergency Medical Technician',
      'Healthcare Accounting',
      'Healthcare Management',
    ],
  },
  {
    school_logo: SLU,
    school_name: 'Saint Leo University',
    location: 'Online',
    star_rating: '4 Stars',
    comment_1: 'High-quality, Accessible, and Fexible Learning ',
    review_1: 'Catholic Roots',
    description:
      'Saint Leo University has a rich history of providing students with a transformative, values-centered education. With over 40 majors and minors to choose from, our core mission is to inspire students to become their best selves and lead the way for those that follow.',
    primary_colour_pixel: '#056153',
    secondary_color_pixel: 'white ',
    website: 'https://www.saintleo.edu',
    program_specialist: [
      "Associate's Degree in Cybersecurity",
      "Associate's Degree in Criminal Justice",
      "Bachelor's Degree in Biology",
      "Master's Degree in Criminal Justice",
      'Minor in Marketing and Sales in Sport',
      'Minor in Psychology',
    ],
  },
];

export const schoolsList = [
  {
    id: '2',
    title:
      'Southern New Hampshire University is the greatest college and they want you',
    icon: scholarshipSvg,
  },
  {
    id: '4',
    title:
      'Purdue University Specialise in something cool and they want you to go there',
    icon: scholarshipSvg,
  },
  {
    id: '6',
    title: 'Lots of fun to be had at Berkeley College',
    icon: scholarshipSvg,
  },
];

export const privacyPolicyInformationCollectedList = [
  'Provide products and services requested by you;',
  'Provide customer support, including responding to your requests and questions and troubleshooting and resolving problems or complaints, and for any other purposes that we deem appropriate;',
  'Verify the information you provide to us;',
  'Communicate with you;',
  'Confirm your identity and eligibility to use the Services;',
  'Establish and manage your account, as applicable;',
  'Perform research and analysis to develop and improve the Services and other products and services that we may offer;',
  'Understand and anticipate your use of or interest in, our products, services, and content, and the products, services, and content offered by others;',
  'Develop and display products, services, and content tailored to your interests on the Services and other online properties;',
  'Measure the overall effectiveness of our online advertising, content, and programming, and other activities;',
  'Offer you personalized information and products, services, promotions, contests, or scholarships of ours, our affiliates, or our third-party business partners that may be of interest to you;',
  'Manage our business and operations;',
  'We use the information we automatically collect (such as contact information, IP address and basic browser and system details) to help us optimize our sites and the services we offer on the Sites and may offer in the future;',
  'To provide you with a customized browsing experience;',
  'Protect the security and integrity of the Services;',
  'Carry out our obligations and enforce our rights arising from this Privacy Policy, the Terms of Use and any other applicable agreements and policies;',
  'Use or post User Contributions as permitted in our Terms of Use; and',
  'Fulfill any other purposes for which you provide your information and for any other purpose as described to you at the time your information is collected or for which your consent is given.',
];

export const privacyPolicyInformationWeCollectList = [
  {
    text: 'Directly from consumers. For example, from information that consumers provide to us related to the services we provide.',
  },
  {
    text: 'Directly and indirectly from schools, our marketing partners, affiliates, and service providers. For example, through information we collect from our partners in the course of providing or receiving services.',
  },
  {
    text: 'Directly and indirectly from activity on our website(s). For example, from submissions through our website portal or website usage details collected automatically.',
  },
];

export const privacyPolicyPersonalInformationList = [
  {
    text: 'To fulfill the purpose for which the information is provided. For example, if you share your personal information to request info on any schools or programs, we will use that personal information to respond to your inquiry.',
  },
  {
    text: 'To provide you with emails, event registrations, and other notices concerning our products or services, or events or news, that may be of interest to you.',
  },
  {
    text: 'To improve our website and present its contents to you.',
  },
  {
    text: 'For testing, research, analysis and product development.',
  },
  {
    text: 'As necessary or appropriate to protect the rights, property or safety of us, our clients or others, or to enforce our Terms of Use.',
  },
  {
    text: 'To respond to law enforcement requests and as required by applicable law, court order, or governmental regulations.',
  },
];

export const privacyPolicyCollectInformationList = [
  {
    text: 'Information Provided by You. We collect information provided by you when you (1) inquire about or obtain our services or products; (2) communicate with us or request information about or from us, whether via email or other means; (3) fill out forms or fields on the Services; (4) register as a user or sign-up for any of our newsletters, materials or services through the Services; (5) enter into online transactions; (6) create profiles; (7) provide college reviews or participate in our online surveys or questionnaires; (8) input information into our interactive programming features or participate in our online forums; (9) participate in any of our marketing initiatives, including contests, scholarship offers, events, or promotions; and (10) post to the Services or provide user-generated content or submissions to us, including without limitation media files, photos, videos, documents or other information, and contributions to a chat room, list serve, blog, or other open forum or community feature that we make available on the Services ("User Contributions").',
  },
  {
    text: 'Information from Other Sources. We may collect information about you from other services that we may provide, our affiliates, third-party or public sources (such as from public forums, social networks, and blogs), other users of the Services, and our business partners.',
  },
  {
    text: 'Automatic Information Collection. We and our service providers use automatic data collection technologies to collect and store Usage Information (as defined below). This information helps us evaluate how our visitors use and navigate the Site on an aggregate basis, including but not limited to the number and frequency of visitors to each Site, and the length of their visits. We may combine this automatically collected log information with other information we collect about you. We do this to improve services we offer you, to improve marketing, analytics, or site functionality. We also may allow third-party advertising companies and ad networks to use automatic data collection technologies to collect Usage Information for purposes of providing interest based ads. See the Automatic Information Collected Technologies and Usage Information and the Third-Party Advertisers and Interest-Based Ads sections for more information.',
  },
];

export const privacyPolicyShareYourInformationList = [
  {
    text: 'With Candid Maven’s affiliated companies for support of our internal and business operations, for cross-marketing purposes or in connection with a request made by you or your opt-in or consent.',
  },
  {
    text: 'With our non-affiliated third-party business partners, service providers, and vendors to enable them to assist us in providing you the products or services you request through the Services or to provide us with support for our internal and business operations, such as customer service, data processing, data storage, research, analytics, web hosting, marketing, providing suggestions and strategies to improve our business processes and the services we provide, and delivery of promotional or transactional materials. We may provide your personal information to companies that provide services to help us with our business activities such as offering customer service. These companies are authorized to use your Personal Information only as necessary to provide these services to us. With other non-affiliated companies, parties, or organizations (with whom we maintain business relationships) when you engage in certain activities through the Services or services that are sponsored or provided by them, including, but not limited to requesting or purchasing products or services offered by these third parties, electing to receive information or communications from them, or electing to participate in contests, sweepstakes, games, scholarships, or other programs sponsored or provided by these third parties, in whole or in part.',
  },
  {
    text: 'If you submit information to an advertiser or other third party that is made available on or through Candid Maven, the information obtained during your visit to that advertiser’s website, and the information you give to the advertiser will be governed by the advertiser’s privacy policy. For further information on such advertiser’s use of your information, please visit the applicable privacy policy of such advertisers. Advertisers made available on this site have separate policy practices for which Candid Maven has no responsibility or liability.',
  },
  {
    text: 'In addition, from time to time, we may share Personal Information (such as e-mail addresses and other contact information such as name, email address and phone number) with selected third parties, so they may offer educational or non-educational goods and services that we believe may be of interest to our customers. To opt-out of our sharing of your information with such third parties, see the Your Choices about How We Use and Disclose Your Information section.',
  },
  {
    text: 'With any person who, in our reasonable judgment, is authorized to receive your information, such as your agent, attorney, parent, legal guardian, or co-signor of a loan application.',
  },
  {
    text: 'We may disclose information we collect from or about you when we believe disclosure is appropriate to comply with the law; when we believe that disclosure is necessary to comply with a judicial proceeding, court order or other similar legal process served on our Site; to enforce or apply applicable terms and conditions and other agreements; or to protect the rights, property, or safety of our company, our affiliates, our other customers or users of the Services, or others. If some or all of our business assets are sold or transferred, whether through a sale, acquisition, merger, consolidation, reorganization, bankruptcy, or other corporate change involving us and/or our affiliates, we may transfer the corresponding information regarding our customers and users of the Services, including Personal Information, to third parties evaluating or facilitating the transaction. We also may retain a copy of such information. Nothing in this Privacy Policy is intended to interfere with our ability to transfer all or part of our business, equity interests, or assets (including the Services) to an affiliate or non-affiliated third party at any time, for any purpose, without any limitation, and without notice or any compensation to you, whatsoever.',
  },
  {
    text: 'We cannot ensure that all of your private communications and other Personal Information will never be disclosed in ways not otherwise described in this Policy. For example, we may be forced to disclose information to the government or third parties under certain circumstances, third parties may unlawfully intercept or access transmissions or private communications, or users may abuse or misuse your personal information that they unlawfully collect from the Site. We will try to protect your privacy, however, we do not promise, and you should not expect, that your Personal Information or private communications will always remain private.',
  },
];

export const privacyPolicy = {
  rightsAndChoices: [
    {
      text: 'Promotional Emails or other Electronic Communications. If you do not wish to receive promotional emails or other electronic communications from us, including but not limited to our e-newsletters, contact us at info@educationdirectory.net to opt-out or follow the unsubscribe process at the bottom of the promotional email or other electronic communication. Note that even if you opt-out, you may still receive transactional or account-related emails from us (e.g., emails related to the completion of your registration, correction of user data, password reset requests, reminder emails that you have requested, and any other similar communications essential to your transactions on or made through the Services).',
    },
    {
      text: 'Telephone Calls and Texts. If you do not wish to receive promotional telephone calls from us, contact us at info@educationdirectory.net to opt-out, and we will add your phone number to our internal Do Not Call List. If you do not wish to receive texts, please follow the unsubscribe process in the text by typing “STOP” and sending it to us.',
    },
    {
      text: 'Automatic Information Collection Technologies and Advertising. Our systems currently recognize "do not track" signals from your browser. In addition, the "help" function of your browser should contain instructions on how to set your browser to not accept new cookies, to notify you when a cookie is issued, or how to disable cookies altogether. If Flash cookies are used on the Services, you can manage your Flash cookie settings, by visiting the Flash player settings page on Adobe\'s website. If you disable or refuse cookies, please note that some parts of the Services may be inaccessible or not function properly.',
    },
    {
      text: 'Disclosure of Your Information to Third-Parties for Advertising. If you no longer want us to share your Personal Information with non-affiliated third parties for promotional purposes, contact us at info@educationdirectory.net to opt-out. Any opt-out request will only apply from the date of your request, and we will not be responsible for any communications that you may receive from third parties who received your Personal Information prior to your request. In these cases, please contact the third parties directly.',
    },
  ],
  informationCollectionAndUsage: [
    {
      text: 'Cookies (or browser cookies). A cookie is a small data file that is sent to your browser or related software and stored on your computer\'s hard drive when you visit a website. Generally, cookies can track what you look at and where you travel on websites and what transactions you make. They can also store Personal Information about you, including your username and password. A "session cookie" expires immediately when you end your browsing session with the particular website. A "persistent cookie" stores information on your hard drive so when you end your browsing session and return to the same website later, the cookie information is still available. The Services may use both types of cookies.',
    },
    {
      text: 'Flash Cookies. Certain features of the Services may use locally stored objects (or Flash cookies) to collect and store information about your preferences and navigation to, from and on the Services.',
    },
    {
      text: 'Pixels. Pages of the Services and any emails we send to you may contain small electronic files known as pixels that permit us, for example, to count users who have visited those pages or opened our emails and for other related website analytics (e.g., recording the popularity of certain website content and verifying system and server integrity).',
    },
    {
      text: 'We may receive reports based on the use of these technologies by these companies on an individual as well as aggregated basis.',
    },
  ],
};

export const privacyPolicyCollectionAndUsageList = [
  {
    text: '',
  },
  {
    text: '',
  },
  {
    text: '',
  },
  {
    text: '',
  },
];
