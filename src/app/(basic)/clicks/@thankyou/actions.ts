import {
  getMAOBanners,
  getMAOExternal,
  getMAOOther,
  MAOOffer,
  MAOParams,
} from '@/app/_modules/mao';

const mappedAreasOfStudy: {
  AreaOfStudy: string;
  Concentration: string;
}[] = [
  {
    AreaOfStudy: 'Criminal Justice & Law Enforcement',
    Concentration: 'Criminal Justice & Law Enforcement',
  },
  {
    AreaOfStudy: 'Criminal Justice & Law Enforcement',
    Concentration: 'Criminal Justice & Law Enforcement',
  },
  {
    AreaOfStudy: 'Arts / Design / Fashion',
    Concentration: 'Design & Visual Communications',
  },
  {
    AreaOfStudy: 'General Studies / Undecided',
    Concentration: 'Liberal Arts',
  },
  {
    AreaOfStudy: 'Health & Medical / Nursing',
    Concentration: 'Nurse Education',
  },
  {
    AreaOfStudy: 'Health & Medical / Nursing',
    Concentration: 'Nurse Education',
  },
  {
    AreaOfStudy: 'Health & Medical / Nursing',
    Concentration: 'Nurse Education',
  },
  {
    AreaOfStudy: 'Business',
    Concentration: 'Business',
  },
  {
    AreaOfStudy: 'Psychology & Social Work',
    Concentration: 'Counseling Psychology',
  },
  {
    AreaOfStudy: 'Psychology & Social Work',
    Concentration: 'Counseling Psychology',
  },
  {
    AreaOfStudy: 'Computers & IT',
    Concentration: 'Engineering',
  },
  {
    AreaOfStudy: 'Computers & IT',
    Concentration: 'Computer Science',
  },
  {
    AreaOfStudy: 'Computers & IT',
    Concentration: 'Computer Science',
  },
  {
    AreaOfStudy: 'Trades & Careers',
    Concentration: 'Construction Management',
  },
  {
    AreaOfStudy: 'Trades & Careers',
    Concentration: 'Construction Management',
  },
  {
    AreaOfStudy: 'Education & Teaching',
    Concentration: 'Education and Teaching',
  },
  {
    AreaOfStudy: 'Education & Teaching',
    Concentration: 'Education and Teaching',
  },
  {
    AreaOfStudy: 'Culinary Arts & Hospitality',
    Concentration: 'Culinary Arts',
  },
  {
    AreaOfStudy: 'Business',
    Concentration: 'Business',
  },
];

function getParams() {
  const params: MAOParams = {
    Device: 'server',
    ClientIP: '8.192.0.0',
    ZipCode: '90210',
    State: 'CA',
    AreaOfStudy: '',
    Concentration: '',
    DegreeLevel: 'BACHELORS',
    HighSchoolGradYear: '2001',
    HighestEducationLevel: 'HIGH_SCHOOL',
    LearningPreference: 'BOTH',
    MilitaryStatus: 'false',
    RNDegree: 'false',
    StartDate: 'LESS_THAN_1_MONTH',
    USCitizen: 'true',
    City: 'Server',
  };

  return params;
}

/**
 * Wraps the logic to fetch data from MAO. Combines results for different areas of interest, removing duplicates and sorting by revenue. Limits external results to eight and then concatenates other results.
 *
 * @returns {Promise<{offers: MAOOffer[], banners: MAOOffer[]}>}
 */
export async function initialFetch(): Promise<{
  offers: MAOOffer[];
  banners: MAOOffer[];
}> {
  const params = getParams();
  const externalPromises = mappedAreasOfStudy.map((area) => {
    const currentParams = {
      ...params,
      AreaOfStudy: area.AreaOfStudy,
      Concentration: area.Concentration,
    };
    return getMAOExternal(currentParams);
  });

  const [bannerPromise, otherPromise] = await Promise.all([
    getMAOBanners(),
    getMAOOther(),
  ]);

  const externalResults = await Promise.allSettled(externalPromises).then(
    (results) =>
      results
        .filter((result) => result.status === 'fulfilled')
        .map((result) => (result as PromiseFulfilledResult<MAOOffer[]>).value),
  );

  const uniqueItems: MAOOffer[] = externalResults
    .reduce((acc, items) => acc.concat(items), [])
    .filter(
      (item, index, self) =>
        self.findIndex((i) => i.brandName === item.brandName) === index,
    )
    .sort((a, b) => Number(b.revenue) - Number(a.revenue))
    .slice(0, 8);

  uniqueItems.push(...(otherPromise ?? []));

  return {
    offers: uniqueItems,
    banners: bannerPromise ?? [],
  };
}

export async function streamFetch() {}
