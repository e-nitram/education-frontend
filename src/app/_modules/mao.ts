// API: https://gist.github.com/MyAdOptimizer/2e757af083ee93d50f2d67c460c61a89

const MAO_TOKEN_EXTERNAL = process.env.NEXT_PUBLIC_MAO_TOKEN_EXTERNAL;
const MAO_TOKEN_INTERNAL = process.env.NEXT_PUBLIC_MAO_TOKEN_INTERNAL;
const MAO_URL = process.env.NEXT_PUBLIC_MAO_URL;

export interface MAOOffer {
  brandName: string;
  headline: string;
  blurbs: string[];
  imageUrl: string;
  destUrl: string;
  impressionUrl: string;
  trackingURL: string;
  displayUrl: string;
  revenue: number;
}

/**
 * Gets the internal offers that have been manually input through the MAO CMS. These offers are used for basic clicks offers throughout the website. This query gets standardized results that can be cached on the server.
 *
 * @returns {Promise<null | MAOOffer[]>} an array of offers for rendering, and an empty array if there are none
 * returns null if there is an error
 */
export async function getMAOInternal(): Promise<null | MAOOffer[]> {
  const queryString =
    MAO_URL +
    '?LandingPageToken=' +
    MAO_TOKEN_INTERNAL +
    '&MediaChannel=ChannelA';

  try {
    const res = await fetch(queryString, { next: { revalidate: 300 } });

    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error('ERROR: bad MAO internal response', res);
      return null;
    }

    const rawData = await res.json();

    // Filter the data to include only fields from the Offer interface
    const filteredData = rawData.items.map((offer: MAOOffer) => ({
      brandName: offer.brandName,
      headline: offer.headline,
      blurbs: offer.blurbs,
      imageUrl: offer.imageUrl,
      destUrl: offer.destUrl,
      impressionUrl: offer.impressionUrl,
      trackingURL: offer.trackingURL,
      displayUrl: offer.displayUrl,
      revenue: offer.revenue,
    }));

    return filteredData;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`ERROR: Failed MAO internal: ${queryString}`, err);
    return null;
  }
}

export interface MAOParams {
  Device?: string;
  ClientIP?: string;
  ZipCode: string;
  State: string;
  AreaOfStudy?: string;
  Concentration?: string;
  DegreeLevel:
    | 'CERTIFICATE'
    | 'ASSOCIATES'
    | 'BACHELORS'
    | 'MASTERS'
    | 'DOCTORATE';
  HighSchoolGradYear:
    | '2023'
    | '2022'
    | '2021'
    | '2020'
    | '2019'
    | '2018'
    | '2017'
    | '2016'
    | '2015'
    | '2014'
    | '2013'
    | '2012'
    | '2011'
    | '2010'
    | '2009'
    | '2008'
    | '2007'
    | '2006'
    | '2005'
    | '2004'
    | '2003'
    | '2002'
    | '2001'
    | '1990';
  HighestEducationLevel:
    | 'STILL_IN_HIGH_SCHOOL'
    | 'NO_HIGH_SCHOOL_OR_GED'
    | 'HIGH_SCHOOL'
    | 'SOME_COLLEGE'
    | 'ASSOCIATES_DEGREE'
    | 'BACHELORS_DEGREE'
    | 'MASTERS_DEGREE'
    | 'DOCTORAL_DEGREE'
    | 'GED';
  LearningPreference: 'CAMPUS' | 'ONLINE' | 'BOTH';
  MilitaryStatus: 'true' | 'false' | 'null';
  RNDegree: 'true' | 'false' | 'null';
  StartDate?:
    | 'LESS_THAN_1_MONTH'
    | '1_TO_3_MONTHS'
    | '3_TO_6_MONTHS'
    | '6_TO_12_MONTHS'
    | 'OVER_12_MONTHS';
  USCitizen?: 'true' | 'false' | 'null';
  City?: string;
}

/**
 * Gets external offers fed from sources connected to MAO. This query uses standardized values for different params so to get results.
 *
 * @param {MAOOffer} params Structured parameters for the query to the API
 * @returns {Promise<null | MAOOffer[]>} an array of offers for rendering, or an empty array if there are none
 * returns null if the fetch request failed
 */
export async function getMAOExternal(
  params: MAOParams,
): Promise<null | MAOOffer[]> {
  const queryString =
    `${MAO_URL}?LandingPageToken=${MAO_TOKEN_EXTERNAL}` +
    '&MediaChannel=ChannelB' +
    '&ClientIP=108.83.3.143' +
    '&Device=Mobile' +
    `&ZipCode=${params.ZipCode}` +
    `&State=${params.State}` +
    `&Concentration=${params.Concentration}` +
    `&DegreeLevel=${params.DegreeLevel}` +
    `&HighSchoolGradYear=${params.HighSchoolGradYear}` +
    `&HighestEducationLevel=${params.HighestEducationLevel}` +
    `&LearningPreference=${params.LearningPreference}` +
    '&LikelihoodToEnroll=VERY_LIKELY' +
    `&USCitizen=${params.USCitizen}` +
    `&City=${params.City}` +
    `&MilitaryStatus=${params.MilitaryStatus}` +
    '&StartDate=1_TO_3_MONTHS' +
    `&RNDegree=${params.RNDegree}` +
    '&CurrentURL=https://www.google.com/RenderData.html' +
    '&userAgent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36';

  try {
    const res = await fetch(queryString, { cache: 'force-cache' });

    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error('ERROR: bad MAO external response', res);
      return null;
    }

    const rawData = await res.json();

    if ('true' === process.env.NEXT_PUBLIC_DEV) {
      return rawData.items;
    }

    // Filter the data to include only fields from the Offer interface
    const filteredData = rawData.items.map((offer: MAOOffer) => ({
      brandName: offer.brandName,
      headline: offer.headline,
      blurbs: offer.blurbs,
      imageUrl: offer.imageUrl,
      destUrl: offer.destUrl,
      impressionUrl: offer.impressionUrl,
      trackingURL: offer.trackingURL,
      displayUrl: offer.displayUrl,
      revenue: offer.revenue,
    }));

    return filteredData;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`ERROR: Failed MAO external: ${queryString}`, err);
    return null;
  }
}

/**
 * Gets higher-value offers that are directly configured on MAO CMS. These offers are intended to be highlighted in some form.
 *
 * @returns {Promise<null | MAOOffer[]>} an array of offers for rendering, and an empty array if there are none
 * returns null if the fetch request failed
 */
export async function getMAOBanners(): Promise<null | MAOOffer[]> {
  const queryString =
    MAO_URL +
    '?LandingPageToken=' +
    MAO_TOKEN_INTERNAL +
    '&MediaChannel=ChannelC';

  try {
    const res = await fetch(queryString, { cache: 'force-cache' });

    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error('ERROR: bad MAO banner response', res);
      return null;
    }

    const rawData = await res.json();

    if ('true' === process.env.NEXT_PUBLIC_DEV) {
      return rawData.items;
    }

    // Filter the data to include only fields from the Offer interface
    const filteredData = rawData.items.map((offer: MAOOffer) => ({
      brandName: offer.brandName,
      headline: offer.headline,
      blurbs: offer.blurbs,
      imageUrl: offer.imageUrl,
      destUrl: offer.destUrl,
      impressionUrl: offer.impressionUrl,
      trackingURL: offer.trackingURL,
      displayUrl: offer.displayUrl,
      revenue: offer.revenue,
    }));

    return filteredData;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`ERROR: Failed MAO banner: ${queryString}`, err);
    return null;
  }
}

/**
 * Gets offers configured in MAO CMS for other verticals, such as insurance or jobs.
 *
 * @returns {Promise<null | MAOOffer[]>} an array of offers for rendering, and an empty array if there are none
 * returns null if the fetch request failed
 */
export async function getMAOOther(): Promise<null | MAOOffer[]> {
  const queryString =
    MAO_URL +
    '?LandingPageToken=' +
    MAO_TOKEN_INTERNAL +
    '&MediaChannel=ChannelD';

  try {
    const res = await fetch(queryString, { cache: 'force-cache' });

    if (!res.ok) {
      // eslint-disable-next-line no-console
      console.error('ERROR: bad MAO other response', res);
      return null;
    }

    const rawData = await res.json();

    if ('true' === process.env.NEXT_PUBLIC_DEV) {
      return rawData.items;
    }

    // Filter the data to include only fields from the Offer interface
    const filteredData = rawData.items.map((offer: MAOOffer) => ({
      brandName: offer.brandName,
      headline: offer.headline,
      blurbs: offer.blurbs,
      imageUrl: offer.imageUrl,
      destUrl: offer.destUrl,
      impressionUrl: offer.impressionUrl,
      trackingURL: offer.trackingURL,
      displayUrl: offer.displayUrl,
      revenue: offer.revenue,
    }));

    return filteredData;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`ERROR: Failed MAO other: ${queryString}`, err);
    return null;
  }
}
