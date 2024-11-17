import { useRouter } from 'next/router';
import {
  createContext,
  FC,
  ReactNode,
  startTransition,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import { PayoutType } from '@/app/_objects/payouttype';
import {
  defaultStepsData,
  persistLeadRoutes,
  persistStateRoutes,
  tcpaDisClosureText,
} from '@/appConstants';
import {
  CallbackBody,
  submitCallback,
  updateCallback,
} from '@/pages/api/callbacks';
import insertLead from '@/pages/api/leads/insert';
import startSession from '@/pages/api/leads/startSession';
import {
  IAppContextProps,
  InsertLeadResponse,
  IResults,
  ISearchResponse,
  IState,
  NavType,
  ProgramSlug,
  Session,
  StepData,
} from '@/typings';
import { getCityState } from '@/utils';

import fetchDataFrom from '../pages/api/fetchDataFrom';

type IProps = {
  children: ReactNode;
};

export const AppContext = createContext({} as IAppContextProps);

export const AppContextProvider: FC<IProps> = ({ children }) => {
  const [deviceType, setDeviceType] = useState('' as string);
  const [width, setWidth] = useState(0 as number);
  const [appTitle, setAppTitle] = useState('Education Directory' as string);

  const [programSlug, setProgramSlug] = useState<ProgramSlug[]>([]);
  const [uniList, setUniList] = useState({});
  const [pageLogos, setPageLogos] = useState([] as any);
  const [currentPage, setCurrentPage] = useState<string>('');
  const [navType, setNavType] = useState<NavType>('tertiary');
  const [showSubNav, setShowSubNav] = useState<boolean>(false);
  const [searchIdentifier, setSearchIdentifier] = useState({
    accesskey: '',
    search_identifier: '',
  } as ISearchResponse);
  const [footerText, setFooterText] = useState<string>('');
  const [leadData, setLeadData] = useState<Partial<InsertLeadResponse>>();

  const [stepsData, setStepsData] = useState<StepData>(
    JSON.parse(JSON.stringify(defaultStepsData)),
  );
  const router = useRouter();
  const [queryParams, setQueryParams] = useState();

  useEffect(() => {
    const leadDataFromLS = localStorage.getItem('leadRes');
    if (leadDataFromLS !== null) {
      try {
        const parsedleadDataFromLS = JSON.parse(leadDataFromLS);
        if (
          persistLeadRoutes.some((route) => router.pathname.includes(route))
        ) {
          setLeadData(parsedleadDataFromLS);
        } else {
          const defaultLeadData = { session: parsedleadDataFromLS.session };
          localStorage.setItem('leadRes', JSON.stringify(defaultLeadData));
          setLeadData(defaultLeadData);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          'ERROR: failed to set lead data in app context provider',
          error,
        );
        return;
      }
    }
  }, [router.pathname]);

  useEffect(() => {
    setStepsData((prevStepsData) => ({
      ...prevStepsData,
      tcpa: tcpaDisClosureText(
        prevStepsData.phone,
        (leadData?.session?.session_id ?? 0) % 2,
      ),
    }));
  }, [leadData?.session?.session_id, stepsData.phone]);

  useEffect(() => {
    (async () => {
      if (stepsData?.zip_code.length > 4) {
        const { city, state } = await getCityState(stepsData.zip_code);
        setStepsData((prev) => ({ ...prev, city, state }));
      }
    })();
  }, [stepsData?.zip_code]);

  useEffect(() => {
    createSession();
    setWidth(window.innerWidth);
    fetchDataFrom('pages/').then(async (pages) => {
      const data = await pages.json();
      const uList: any = {};
      const result = data?.results[0]?.logos?.map((logo: any) => logo);
      setPageLogos(result);
      data?.results?.map(
        (p: any) =>
          (uList[p.careers_heading] = p.subjects?.map((r: any) => ({
            title: r.subject_as_heading,
            slug: r.slug,
          }))),
      );
      setUniList(uList);
    });

    fetchDataFrom('pages/?headers_only=True').then(async (heros) => {
      const heroResponse = await heros.json();
      const data = heroResponse?.results?.map((item: IResults) => {
        return {
          slug: item.slug,
          title: item.hero_heading,
          text: item.hero_text,
          image: item.hero_image,
        };
      });
      // Sort the data array by title
      const sortedData = data.sort(
        (a: { title: string }, b: { title: string }) =>
          a.title.localeCompare(b.title),
      );
      setProgramSlug(sortedData);
    });

    const webSessionExist: string | null =
      localStorage.getItem('web_session_id');
    if (webSessionExist == null) {
      const randomUuid = uuidv4();
      localStorage.setItem('web_session_id', JSON.stringify(randomUuid));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const existingQueryParams = JSON.parse(
      localStorage.getItem('queryParams') ?? '{}',
    );

    const updatedQueryParams = { ...existingQueryParams };
    Object.keys(router.query).forEach((key) => {
      updatedQueryParams[key] = router.query[key];
    });

    if ('ORG' == existingQueryParams?.utm_supplier_id?.substring(0, 3)) {
      updatedQueryParams['utm_supplier_id'] = updatedQueryParams[
        'utm_supplier_id'
      ].replace('SUP', 'ORG');
    }

    startTransition(() => setQueryParams(updatedQueryParams));
    localStorage.setItem('queryParams', JSON.stringify(updatedQueryParams));

    window.dataLayer = window.dataLayer ?? [];

    window.dataLayer.push(updatedQueryParams);
  }, [router.query]);

  // Persist get-started steps data state
  useEffect(() => {
    const persistsubmittedSchoolId = ['results', 'school'].some((route) =>
      router.pathname.includes(route),
    );
    if (!persistsubmittedSchoolId) {
      localStorage.removeItem('submittedSchoolId');
    }

    // Check if the current page is included in the `persistStateRoutes`
    const shouldPersistState = persistStateRoutes.some((route) =>
      router.pathname.includes(route),
    );

    const storedParams = localStorage.getItem('queryParams');
    const parsedParams = JSON.parse(storedParams ?? '');
    let areas = defaultStepsData.areas_of_interest;
    const subject_map: { [key: string]: string } = {
      art: 'Art & Design',
      business: 'Business',
      it: 'Computers & Technology',
      justice: 'Criminal Justice',
      culinary: 'Culinary',
      education: 'Education & Teaching',
      entertainment: 'Entertainment',
      health: 'Health & Wellness',
      hospitality: 'Hospitality',
      language: 'Language',
      legal: 'Legal & Paralegal',
      liberalarts: 'Liberal Arts',
      pt: 'Massage And Physical Therapy',
      nursing: 'Nursing',
      psychology: 'Psychology And Counseling',
      religious: 'Religious Studies',
      science: 'Science & Engineering',
      trade: 'Trade & Vo-Tech',
    };

    if ('string' === typeof parsedParams.subject) {
      areas = [subject_map[parsedParams.subject]];
    } else if (null != parsedParams.subject) {
      areas = parsedParams.subject
        .map((subject: string) => subject_map[subject])
        .filter(Boolean);
    }

    const storedData = localStorage.getItem('stepsState');
    const parsedData =
      storedData !== null
        ? JSON.parse(storedData)
        : { ...defaultStepsData, areas_of_interest: areas };
    if (shouldPersistState) {
      setStepsData({ ...stepsData, ...parsedData, areas_of_interest: areas });
    } else {
      setStepsData({
        ...defaultStepsData,
        online_or_campus: parsedData.online_or_campus,
        searchIdentifier: parsedData.search_identifier,
        areas_of_interest: areas,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, queryParams]);

  const updateStepsData = useCallback(() => {
    localStorage.setItem('stepsState', JSON.stringify(stepsData));
  }, [stepsData]);

  useEffect(() => {
    updateStepsData();
  }, [updateStepsData]);

  useEffect(() => {
    const storedIdentifier = localStorage.getItem('searchIdentifier');
    if (storedIdentifier !== null) {
      const parsedData = JSON.parse(storedIdentifier);
      setSearchIdentifier(parsedData);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (width > 1920) {
      setDeviceType('XL');
    } else if (width > 1366 && width <= 1920) {
      setDeviceType('Desktop');
    } else if (width > 550 && width <= 1366) {
      setDeviceType('Tablet');
    } else if (width <= 550) {
      setDeviceType('Mobile');
    }
  }, [width]);

  enum Callback {
    landing = 'landing',
    click = 'click',
    submission = 'submission',
    application = 'application',
    acceptance = 'acceptance',
    enrollment = 'enrollment',
  }

  /**
   * This function encapsulates the functionalities for running callbacks. This includes processing the data, posting data to Leads DB, submitting the request to the appropriate endpoint, and updating Leads DB with the response.
   *
   * @param type The type of triggering event.
   * @param revenue The raw value of the event.
   * @returns true if successful or false if failed.
   *
   * @POST Server logs document errors with fetch requests.
   */
  async function createCallback(
    event_type: keyof typeof Callback,
    revenue: number,
  ): Promise<boolean> {
    const leadResFromLS = localStorage.getItem('leadRes');
    const parsedData =
      leadResFromLS !== null ? JSON.parse(leadResFromLS) : null;
    if (undefined == parsedData?.session?.supplier_data?.supplier_id) {
      return false;
    }

    const session_id = parsedData.session?.session_id;
    const lead_id = parsedData.lead?.lead_id;
    const supplier = parsedData.session?.supplier_data;

    if (null == supplier?.supplier_id || null == session_id) {
      return false;
    }

    let path;

    switch (event_type) {
      case Callback.landing:
        path = supplier.landing_callback ?? '';
        break;
      case Callback.click:
        path = supplier.clickout_callback ?? '';
        break;
      case Callback.submission:
        path = supplier.submission_callback ?? '';
        break;
      default:
        return false;
    }

    if (null == path || undefined == path || 5 > path?.length) {
      return false;
    }

    path = path
      .replaceAll('replace_session_id', session_id.toString())
      .replaceAll('replace_lead_id', lead_id?.toString() ?? 'null')
      .replaceAll(
        'replace_value',
        processValue(
          event_type,
          supplier.payout_type,
          supplier.payout_amount,
          revenue,
        ).toString(),
      );

    let callback: CallbackBody | null = {
      method: supplier.callback_method ?? 'post',
      path: path,
      body: null,
      response: null,
      session_id: +session_id,
      event_type: event_type,
    };
    callback = await submitCallback(callback);
    if (null == callback) {
      return false;
    }

    try {
      const res =
        (await (
          await fetch(new URL(path), { method: callback?.method ?? 'get' })
        ).text()) ?? '';
      await updateCallback({ ...callback, response: res });

      return true;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('ERROR: failed to callback supplier', e, callback);
      await updateCallback({ ...callback, response: 'failed' });
      return false;
    }
  }

  /**
   * A utility function to process raw revenue into reportable revenue based upon business logic.
   *
   * @param event_type The type of triggering Callback event.
   * @param payout_type The type of payout.
   * @param payout_amount The corresponding ratio or value for the payout.
   * @param revenue The raw revenue from the event.
   * @returns The reportable revenue.
   */
  function processValue(
    event_type: keyof typeof Callback,
    payout_type: keyof typeof PayoutType,
    payout_amount: number,
    revenue: number,
  ): number {
    switch (payout_type) {
      case PayoutType.cpc:
        if (Callback.landing == event_type) {
          return payout_amount;
        }
        return 0;
      case PayoutType.cpl:
        if (Callback.submission == event_type) {
          return payout_amount;
        }
        return 0;
      case PayoutType.cpu:
        if (Callback.landing == event_type) {
          return payout_amount;
        }
        return 0;
      case PayoutType.revshare:
        return payout_amount * revenue;
      default:
        return 0;
    }
  }

  // Update current page on route change
  useEffect(() => {
    const { pathname } = router;
    setCurrentPage(pathname);
  }, [router]);

  const updateStepsState = useCallback(
    (state: Partial<IState>) => setStepsData((prev) => ({ ...prev, ...state })),
    [],
  );

  const updateNavType = useCallback((state: NavType) => setNavType(state), []);
  const updateShowSubNav = useCallback(
    (state: boolean) => setShowSubNav(state),
    [],
  );

  const updateAppTitle = useCallback((state: string) => setAppTitle(state), []);
  const updateCurrentPage = useCallback(
    (state: string) => setCurrentPage(state),
    [],
  );

  const updateFooterText = useCallback(
    (state: string) => setFooterText(state),
    [],
  );

  const handleWindowResize = () => setWidth(window.innerWidth);

  const handleStarted = async (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
    if (stepsData.current == 6) {
      stepsData.areas_of_interest?.filter((value) => value !== 'selectall');
    }
  };

  async function createSession() {
    const lsdata = localStorage.getItem('leadRes');
    let session: Session = null == lsdata ? null : JSON.parse(lsdata).session;
    const currentDate = Date.now();

    if (
      null != session &&
      null != session.session_start_time &&
      currentDate - new Date(session.session_start_time).getTime() <
        10 * 60 * 1000
    ) {
      return session;
    }

    if (
      null != session &&
      null != session.session_start_time &&
      currentDate - new Date(session.session_start_time).getTime() >=
        10 * 60 * 1000
    ) {
      const queryParams = JSON.parse(
        localStorage.getItem('queryParams') ?? '{}',
      );
      queryParams.utm_supplier_id = queryParams.utm_supplier_id?.replace(
        'SUP',
        'ORG',
      );
      localStorage.setItem('queryParams', JSON.stringify(queryParams));
    }

    try {
      let sessionRes = await startSession();
      let json = await sessionRes?.json();
      session = Array.isArray(json) ? json[0] : json;

      while (null == session) {
        sessionRes = await startSession();
        json = await sessionRes?.json();
        session = Array.isArray(json) ? json[0] : json;
      }
      setLeadData((prev: any) => ({ ...prev, session }));

      const leadResFromLS = localStorage.getItem('leadRes');
      const parsedData =
        leadResFromLS !== null ? JSON.parse(leadResFromLS) : null;

      const leadRes = { ...parsedData, session };

      localStorage.setItem('leadRes', JSON.stringify(leadRes));

      createCallback(Callback.landing, 0);
      return session;
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('ERROR: failed to create session', error);
      return null;
    }
  }

  const createLead = async () => {
    try {
      const leadResFromLS = localStorage.getItem('leadRes');
      const parsedData: Partial<InsertLeadResponse> =
        leadResFromLS !== null ? JSON.parse(leadResFromLS) : null;
      if (leadData?.session || parsedData.session) {
        const body = {
          session: leadData?.session || parsedData?.session,
          state: stepsData,
        };
        const leadRes = await insertLead(body);
        const json = await leadRes?.json();
        if ('lead' in json) {
          localStorage.setItem('leadRes', JSON.stringify(json));
        }
        setLeadData(json);
        return json;
      } else createSession();
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('ERROR: failed to create lead', error);
      return null;
    }
  };

  const defaultContext = {
    appName: 'Education Directory',
    appTitle,
    updateAppTitle,
    navType,
    updateNavType,
    updateStepsState,
    showSubNav,
    updateShowSubNav,
    currentPage,
    updateCurrentPage,
    stepsData,
    setStepsData,
    searchIdentifier,
    setSearchIdentifier,
    uniList,
    programSlug,
    handleStarted,
    pageLogos,
    deviceType,
    updateFooterText,
    footerText,
    leadData,
    createLead,
    queryParams,
    createSession,
    createCallback,
  };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
};
