// * GLOBAL CLIENT TYPINGS =====================================================
// * Globally declared modules, types, and interfaces. Can be used anywhere in
// * the project without importing directly.
// * ===========================================================================

import { Dispatch, SetStateAction } from 'react';

import { Callback } from '@/app/_objects/callback';
import { SupplierBody } from '@/pages/api/suppliers';

declare module 'react-scroll';

interface IImage {
  id: number;
  name: string;
  asset: string;
}

interface ILogo {
  id: number;
  name: string;
  image: string;
  link: string;
}

interface IResults {
  hero_heading: string;
  hero_image: string;
  hero_text: string;
  slug: string;
}
interface IHero {
  id: string;
  hero_image: IImage | null;
  hero_heading: string;
  hero_text: string;
  hero_video: string | null;
}

interface IHeros {
  slug: any;
  slug: any;
  hero_heading: ReactNode;
  count: number;
  next: null;
  previous: null;
  results: IResults[];
}
interface IInterest {
  slug: any;
  slug: any;
  hero_heading: ReactNode;
  count: number;
  next: null;
  previous: null;
  results: IResults[];
}
interface IProgramsArray {
  slug: any;
  slug: any;
  hero_heading: ReactNode;
  count: number;
  next: null;
  previous: null;
  results: IProgram[];
}

interface IProgram {
  readonly id: number;
  readonly hero: number;
  readonly slug: string;
  banner: IHero;
  readonly subject_as_heading: string;
  readonly subject_as_text: string;
  readonly logos: ILogo[];
  readonly goals_image: IImage;
  readonly outcomes_image: IImage;
  readonly experience_image: IImage;
  readonly quote_bg_image: IImage;
  readonly goals_heading: string;
  readonly goals_text: string;
  readonly goals_list: string;
  readonly outcomes_heading: string;
  readonly outcomes_text: string;
  readonly outcomes_list: string;
  readonly experience_heading: string;
  readonly experience_text: string;
  readonly experience_list: string;
  readonly careers_heading: string;
  readonly careers_text: string;
  readonly careers_first_sub_heading: string;
  readonly careers_first_sub_heading_text: string;
  readonly careers_second_sub_heading: string;
  readonly careers_second_sub_heading_text: string;
  readonly careers_list: string;
  readonly quote_text: string;
  readonly quote_footer: string;
  readonly quote_video: string;
}

interface ICareer {
  careers_heading: string;
  careers_text: string;
  careers_first_sub_heading: string;
  careers_first_sub_heading_text: string;
  careers_second_sub_heading: string;
  careers_second_sub_heading_text: string;
  careers_list: string;
}

interface IPage {
  id: number;
  slug: string;
  hero: number;
  programs: IProgram[];
  banner: IHero;
  overview_heading: string;
  overview_text: string;
  degrees_can_study_heading: string;
  degrees_can_study_text: string;
  degrees_image: IImage;
  degrees_list: string;
  requirements_heading: string;
  requirements_text: string;
  requirements_image: IImage;
  requirements_list: string;
  experience_heading: string;
  experience_text: string;
  experience_image: IImage;
  experience_list: string;
  careers_heading: string;
  careers_text: string;
  careers_first_sub_heading: string;
  careers_first_sub_heading_text: string;
  careers_second_sub_heading: string;
  careers_second_sub_heading_text: string;
  careers_list: string;
  quote_text: string;
  quote_footer: string;
  quote_bg_image: IImage;
  quote_video: string | null;
  logos: ILogo[];
}

type TTitle = s;

interface ISelectOption {
  label: string;
  value: string;
  isDisabled?: boolean;
  description?: string;
}

type OptionType = {
  title?: string;
  label?: string;
  value?: string;
  OptionLabel?: string;
  QuestionValue?: string;
  IsVisible?: boolean;
  isDisabled?: boolean;
  result_identifier?: string;
  result_set_identifier?: string;
};

type SubmitIndentifiers = {
  result_identifier: string;
  result_set_identifier: string;
  schoolid?: string;
};

type IKeys =
  | 'classes'
  | 'like_to_start'
  | 'current_education_level'
  | 'hsyear'
  | 'currently_enrolled'
  | 'hold_licence'
  | 'email'
  | 'tel'
  | 'zip_code'
  | 'st_address'
  | 'us_citizen'
  | 'computer_internet_access';

interface IAppContextProps {
  appTitle: string;
  updateAppTitle: (title: string) => void;
  appName: string;
  stepsData: StepData;
  searchIdentifier: ISearchResponse;
  setSearchIdentifier: (val: ISearchResponse) => void;
  setStepsData: Dispatch<SetStateAction<StepData>>;
  uniList: { [category: string]: IProgram[] };
  programSlug: ProgramSlug[] | [];
  currentPage: string;
  updateCurrentPage: (str) => void;
  navType: string;
  updateNavType: (str: NavType) => void;
  showSubNav: boolean;
  updateShowSubNav: (b: boolean) => void;
  handleStarted: (str: string) => void;
  pageLogos: [];
  deviceType: string;
  footerText: string;
  updateStepsState: (state: Partial<IState>) => void;
  updateFooterText: (str: string) => void;
  createLead: () => Promise<void>;
  leadData: any;
  createSession: () => void;
  createCallback: (event_type: keyof typeof Callback, revenue: number) => void;
}

type NavType = 'primary' | 'secondry' | 'tertiary';

type StepOneToThree = {
  current: number;
  classes: string;
  interest: string[];
};

type StepFourFive = {
  [key in StepData]: string;
};

type Gender = 'Male' | 'Female';
type TBoolean = 'Yes' | 'No';
type Classes = 'Online' | 'Either' | 'Campus';

interface StepData {
  [key: string]: any;
  current: number;
  gender: Gender | string;
  online_or_campus: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  phone2: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zip_code: string;
  rn_license: TBoolean | string;
  computer_internet_access: TBoolean | string;
  age: string;
  hsyear: string;
  current_education_level: string;
  preferred_education_level: string;
  currently_enrolled_in_college: TBoolean | string;
  us_citizen: TBoolean | string;
  preferred_enrollment: string;
  areas_of_interest: string[];
  is_contacted_by_school: TBoolean | string;
  military: {
    military_status: TBoolean | string;
    military_affiliation: string;
    relationship: string;
  };
  channel_name: 'Web' | 'Call Center' | 'Data Supplier';
  searchIdentifier: string;
  tcpa: string;
}

interface IState {
  current: number;
  gender: Gender | string;
  online_or_campus: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  phone2: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zip_code: string;
  rn_license: TBoolean | string;
  computer_internet_access: TBoolean | string;
  age: string;
  hsyear: string;
  current_education_level: string;
  preferred_education_level: string;
  currently_enrolled_in_college: TBoolean | string;
  us_citizen: TBoolean | string;
  preferred_enrollment: string;
  areas_of_interest: string[];
  teaching_certificate: string;
  is_contacted_by_school: TBoolean | string;
  military: {
    military_status: TBoolean | string;
    military_affiliation: string;
    relationship: string;
  };
  channel_name: 'Web' | 'Call Center' | 'Data Supplier';
  searchIdentifier: string;
  tcpa: string;
}

interface School {
  id: number;
  offers: Offer[] | [];
  slug: string;
  name: string;
  logo: string;
  description: string;
  student_acceptance: string;
  city: string;
  state: string;
  school_type: string;
  is_private: boolean;
  is_non_profit: boolean;
  accepting_candidates: boolean;
  footer_text: string;
  tcpa_text_edp: string;
  tcpa_text_school: string;
  important_disclosure: string;
}

interface Offer {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface ISearchBody {
  accesskey: string;
  prospect: {
    gender: 'F' | 'M';
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    phone2: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    zip_code: string;
    computer_internet_access: TBoolean;
    age: string;
    hsyear: string;
    current_education_level: string;
    preferred_education_level: string;
    us_citizen: TBoolean;
    military: {
      military_status: TBoolean | string;
      military_affiliation: string;
      relationship: string;
    };
    preferred_enrollment: number;
    online_or_campus: TClassType;
    ip: string;
  };
  search: {
    areas_of_interest: (
      | 'Art & Design'
      | 'Business'
      | 'Computers & Technology'
      | 'Criminal Justice'
      | 'Culinary'
      | 'Education & Teaching'
      | 'Entertainment'
      | 'Health & Wellness'
      | 'Hospitality'
      | 'Language'
      | 'Legal & Paralegal'
      | 'Liberal Arts'
      | 'Massage And Physical Therapy'
      | 'Nursing'
      | 'Psychology And Counseling'
      | 'Religious Studies'
      | 'Science & Engineering'
      | 'Trade & Vo-Tech'
    )[];
    can_complete_enrollment: TBoolean;
    currently_enrolled_in_college: TBoolean | string;
    rn_license: TBoolean;
    teaching_certificate: TBoolean;
    is_contacted_by_school: string;
    graduated_in_us: string;
    channel_name: 'Web' | 'Call Center' | 'Data Supplier';
    ss1: string;
    ss2: string;
    ss3: string;
    ss4: string;
    web_url: string;
    webinitiatingurl: string;
    traffic_trusted_form_url: string;
    traffic_jornaya_leadid: string;
    traffic_trustedform_token: string;
    traffic_category: string;
    supplier_jornaya_leadid: string;
    supplier_trustedform_token: string;
    supplier_trustedform_url: string;
    time_to_call: string;
    callcenter: {
      cc_rep_id: string;
      PublisherBrandName: string;
      callid: string;
      sessionid: string;
      cc_inbound_transfer_company: string;
      cc_dba: string;
      cc_inbound_transfer_dba: string;
      cc_outbound_company: string;
    };
    test_flag: number;
    tcpa_text: string;
  };
  other_info: {
    client_ids: string;
    level_of_interest: string;
    browser_user_agent: string;
    time_zone: string;
    device_type: string;
    lead_unique_id: string;
    web_session_id: string;
    site_name: string;
    landing_page: string;
    supplier_campaign: string;
    utm_id?: string;
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_content: string;
    utm_term: string;
    utm_supplier_id: string;
    utm_supplier: string;
    utm_web_url: string;
    utm_sub_id: string;
    utm_ad_id: string;
    traffic_source_type: 'coreg' | 'edu' | 'grant' | 'job' | 'other';
  };
}

interface ISearchResponse {
  accesskey: string;
  search_identifier: string;
  error?: string;
}
type StepFourFive = {
  [key in IKeys]: string;
};
interface Lead {
  lead_id: number;
  external_lead_id: null | string;
  session_id: number;
  web_url: string;
}

interface Session {
  session_id?: number;
  client_ip: string | null;
  web_url: string;
  device_type: string | null;
  web_session_id: string | null;
  browser_type: string | null;
  is_test: boolean;
  session_start_time?: string;
  utm_data?: UTMBody | null;
  supplier_data?: SupplierBody | null;
  referer_url?: string | null;
}

interface UTMBody {
  id?: number;
  utm_id: string | null;
  source: string;
  medium: string;
  campaign: string | null;
  sub_id: string | null;
  term: string | null;
  content: string | null;
  supplier_id: string;
}

interface Consent {
  consent_id: number;
  lead_id: number;
  tcpa_timestamp_traffic: string;
  tcpa_timestamp_marketing: null | string;
  tcpa_text_traffic: null | string;
  tcpa_timestamp_client: null | string;
}
interface ThirdPartyToken {
  third_party_tokens_id: number;
  lead_id: number;
  traffic_jornaya_lead_id: string;
  traffic_trusted_form_url: string;
  traffic_trustedform_token: string;
}

interface UTM {
  utm_id: number;
  lead_id: number;
  source: null | string;
  medium: null | string;
  campaign: null | string;
  content: null | string;
  term: null | string;
  supplier_id: null | string;
  sub_id: null | string;
  ad_id: null | string;
}

interface Profile {
  profile_id: number;
  lead_id: number;
  salutation: null;
  first_name: null;
  last_name: null;
  phone_primary: string;
  phone_secondary: null;
  email: string;
}

interface Address {
  address_id: number;
  profile_id: number;
  address_line_one: string;
  address_line_two: null;
  city: string;
  state: string;
  zip_code: string;
}

interface ProfileCriteria {
  profile_criteria_id: number;
  profile_id: null;
  lead_id: number;
  age: number;
  gender: null;
  is_us_citizen: boolean;
  is_us_military: boolean;
  military_status: string;
  military_branch: null;
  high_school_graduation_year: number;
}

interface Qualification {
  qualification_id: number;
  profile_id: number;
  lead_id: number;
  enrollment_timeline: string;
  current_edu_level: string;
  preferred_edu_level: null;
  learning_preference: string;
  is_graduated_in_us: string;
  computer_internet_access: string;
  level_of_interest: string;
  time_of_day: null;
  previously_contacted: null;
  rn_license: string;
  teaching_certificate: string;
}

interface InsertLeadResponse {
  lead: Lead;
  leadStatus: {
    lead_status_id: number;
    lead_id: number;
    api_response_json: {
      status: null | string;
      message: null | string;
    };
    original_status: null | string;
    current_status: null | string;
    status_update_timestamp: null | string;
    reject_reason: null | string;
  };
  session: Session;
  consent: Consent;
  thirdPartyToken: ThirdPartyToken;
  utm: UTM;
  profile: Profile;
  address: Address;
  profileCriteria: ProfileCriteria;
  qualification: Qualification;
}

interface QuestionOptions {
  OptionLabel: string;
  OptionValue: string;
}

interface IAnswers {
  question_key: string;
  question_value: string;
}

//interface for search results
interface IQuestionResultSearch {
  IsVisible: boolean;
  QuestionDescription: null;
  QuestionFieldName: string;
  QuestionLabel: null;
  QuestionNotes: null;
  QuestionOptions: QuestionOptions[] | null;
  QuestionRequired: boolean;
  QuestionType: boolean;
  QuestionValue: string;
  Rules: null;
}
interface IPrograms {
  online: boolean;
  program: string;
  questions: IQuestionResultSearch[] | null;
  result_identifier: string;
  // OptionLabel: string;
  // QuestionValue: string;
  // result_set_identifier: string;
}

interface IResultSearch {
  brand_name: string;
  clientid: string;
  consent: string;
  degree_level: string;
  distance_miles: number;
  location: string;
  exclusive: 'No' | 'Yes';
  logo: string;
  online: boolean;
  payout: number;
  program: string;
  programs: IPrograms[]; // Update the type of programs
  questions: IQuestionResultSearch[];
  result_identifier: string;
  result_set_identifier: string;
  result_type: string;
  school: string;
  schoolid: string;
  state: string;
  status?: boolean;
}

interface CurrentStatus {
  width: number;
  completed: number;
  isForward: boolean;
}
interface IProps {
  statusHandler: (currentStatus: CurrentStatus) => void;
}

type DropdownsType = {
  dropdown1: string;
  dropdown2: string;
  dropdown3: string;
} & { [key: string]: string };

//program slug
interface ProgramSlug {
  slug: string;
  title: string;
  text: string;
  image: string;
}

interface IHomePage {
  id: number;
  logos: ILogo[];
  quote_bg_image: IImage;
  slug: string;
  quote_text: string;
  quote_footer: string;
  quote_video: null | string;
  hero: number;
}

type IQueryParams = {
  LandingPageToken: string;
  Device: string;
  ClientIP: string;
  ZipCode: string;
  State: string;
  AdPlacement: string;
  AreaOfStudy: string;
  Concentration: string;
  DegreeLevel: string;
  HighSchoolGradYear: string;
  HighestEducationLevel: string;
  LearningPreference: string;
  LikelihoodToEnroll: string;
  MilitaryStatus: boolean;
  RNDegree: boolean;
  StartDate: string;
  USCitizen: boolean;
  Accreditations: string;
  ProgramLength: string;
  ProgramRequirements: string;
  City: string;
  CustomVar1: string;
};

interface AdOptimizorResponse {
  searchResultId: string;
  duration: number;
  items: AdItem[];
}

interface AdItem {
  itemId: string;
  brandName: string;
  networkSort: number;
  requestDuration: number;
  sourceID: null | string;
  extClickID: string;
  advertiserId: string;
  displayName: string;
  adCopyVersion: number;
  headline: string;
  blurbs: string[];
  programAdCopy: {
    customVar: (null | string)[];
    constraints: any[];
    location: string;
    advertiserName: string;
    programName: string;
    programDescription: string;
    imageUrl: string;
  };
  imageUrl: string;
  destUrl: string;
  impressionUrl: string;
  revenue: number;
  baseRevenue: number;
  isOnlineSchool: null | boolean;
  schoolAddress: string;
  schoolCity: string;
  schoolState: string;
  schoolZipCode: string;
  bidModifierLog: string[];
  weight: number;
  statusId: number;
  trackingURL: string;
  displayUrl: string;
}

interface IPost {
  readonly id: number;
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly text: string;
  readonly image: IImage;
  readonly date: string;
  readonly author: string;
  readonly category: string;
  readonly tags: string[];
}
