// API: https://github.com/Candid-Maven/education-directory-net-frontend/blob/master/src/pages/api/getMAO.ts

const MAO_TOKEN_EXTERNAL = process.env.NEXT_PUBLIC_MAO_TOKEN_EXTERNAL;
const MAO_TOKEN_INTERNAL = process.env.NEXT_PUBLIC_MAO_TOKEN_INTERNAL;
const MAO_URL = process.env.NEXT_PUBLIC_MAO_URL;

export interface Offer {
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
 * @returns an array of offers for rendering, and an empty array if there are none
 * throws an error if the fetch request failed
 */
export async function getMAOInternal() {
  const queryString =
    MAO_URL +
    '?LandingPageToken=' +
    MAO_TOKEN_INTERNAL +
    '&MediaChannel=ChannelA';

  try {
    const res = await fetch(queryString, { next: { revalidate: 300 } });

    if (!res.ok) {
      throw new Error('Failed to fetch MAO internal data.');
    }

    const rawData = await res.json();

    if ('true' === process.env.NEXT_PUBLIC_DEV) {
      return rawData;
    }

    // Filter the data to include only fields from the Offer interface
    const filteredData = rawData.items.map((offer: Offer) => ({
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

    return { items: filteredData, searchResultId: rawData.searchResultId };
  } catch (err) {
    throw new Error(`Failed MAO internal: ${queryString}`, { cause: err });
  }
}

export interface IMAOParams {
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
 * @returns an array of offers for rendering, and an empty array if there are none
 * throws an error if the fetch request failed
 */
export async function getMAOExternal(params: IMAOParams) {
  const queryString =
    `${MAO_URL}?LandingPageToken=${MAO_TOKEN_EXTERNAL}` +
    '&MediaChannel=ChannelB' +
    '&ClientIP=108.83.3.143' +
    '&Device=Desktop' +
    `&ZipCode=${params.ZipCode}` +
    `&DegreeLevel=${params.DegreeLevel}` +
    `&HighestEducationLevel=${params.HighestEducationLevel}` +
    `&USCitizen=${params.USCitizen}` +
    `&MilitaryStatus=${params.MilitaryStatus}` +
    '&userAgent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36';

  try {
    const res = await fetch(queryString, { cache: 'force-cache' });

    if (!res.ok) {
      throw new Error('Failed to fetch MAO external data.');
    }

    const rawData = await res.json();

    if ('true' === process.env.NEXT_PUBLIC_DEV) {
      return rawData;
    }

    // Filter the data to include only fields from the Offer interface
    const filteredData = rawData.items.map((offer: Offer) => ({
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

    return { items: filteredData, searchResultId: rawData.searchResultId };
  } catch (err) {
    throw new Error(`Failed MAO external: ${queryString}`, { cause: err });
  }
}

/**
 * Gets higher-value offers that are directly configured on MAO CMS. These offers are intended to be highlighted in some form.
 *
 * @returns an array of offers for rendering, and an empty array if there are none
 * throws an error if the fetch request failed
 */
export async function getMAOBanners() {
  const queryString =
    MAO_URL +
    '?LandingPageToken=' +
    MAO_TOKEN_INTERNAL +
    '&MediaChannel=ChannelC';

  try {
    const res = await fetch(queryString, { cache: 'force-cache' });

    if (!res.ok) {
      throw new Error('Failed to fetch MAO banner data.');
    }

    const rawData = await res.json();

    if ('true' === process.env.NEXT_PUBLIC_DEV) {
      return rawData;
    }

    // Filter the data to include only fields from the Offer interface
    const filteredData = rawData.items.map((offer: Offer) => ({
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

    return { items: filteredData, searchResultId: rawData.searchResultId };
  } catch (err) {
    throw new Error(`Failed MAO banner: ${queryString}`, { cause: err });
  }
}

/**
 * Gets offers configured in MAO CMS for other verticals, such as insurance or jobs.
 *
 * @returns an array of offers for rendering, and an empty array if there are none
 * throws an error if the fetch request failed
 */
export async function getMAOOther() {
  const queryString =
    MAO_URL +
    '?LandingPageToken=' +
    MAO_TOKEN_INTERNAL +
    '&MediaChannel=ChannelD';

  try {
    const res = await fetch(queryString, { cache: 'force-cache' });

    if (!res.ok) {
      throw new Error('Failed to fetch MAO other data.');
    }

    const rawData = await res.json();

    if ('true' === process.env.NEXT_PUBLIC_DEV) {
      return rawData;
    }

    // Filter the data to include only fields from the Offer interface
    const filteredData = rawData.items.map((offer: Offer) => ({
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

    return { items: filteredData, searchResultId: rawData.searchResultId };
  } catch (err) {
    throw new Error(`Failed MAO other: ${queryString}`, { cause: err });
  }
}
