'use server';

export type SubjectHeader = {
  slug: string;
  draft: boolean;
  section_1_heading: string;
  section_1_text: string;
  section_1_image: Image;
  section_1_image_alt: string;
  area_of_interest: Area | null;
};

type Image = {
  id: number;
  name: string;
  asset: string;
};

type Area = {
  name: string;
  slug: string;
  id: number;
};

const BASE_URL =
  (process.env.NEXT_PUBLIC_BASE_URL as string) + '/api/subjects/';

/**
 * Fetches all Subject Page Headers from the CMS database, iterating through paginated results arrays to concatenate all entries. Filters by draft=false when on production environment.
 *
 * @returns null if fetch error or no responses. Otherwise returns array of subject entries.
 */
export async function getSubjectsIndex(): Promise<null | SubjectHeader[]> {
  let query = BASE_URL + '?draft=' + process.env.NEXT_PUBLIC_DEV;
  let hasNext = true;
  const subjects = [];

  try {
    while (hasNext) {
      const res = await fetch(query);
      const data = await res.json();
      subjects.push(...data.results);

      if (null != data.next) {
        query = data.next;
      } else {
        hasNext = false;
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to fetch subjects', e);
    return null;
  }

  if (0 == subjects.length) {
    return null;
  }
  return subjects;
}

/**
 * Fetches all Subject Page Headers for a designated area of interest. Filters by draft=false when on production environment.
 *
 * @param area The id for the designated area of interest.
 * @returns null if fetch error or no results. Otherwise returns an array of subject entries.
 */
export async function getRelatedSubjects(
  area: string,
): Promise<SubjectHeader[] | null> {
  'use server';
  try {
    const query =
      BASE_URL +
      '?draft=' +
      process.env.NEXT_PUBLIC_DEV +
      '&area_of_interest=' +
      area;
    const res = await fetch(query);

    if (!res.ok) {
      return null;
    }

    const data: { results: SubjectHeader[] } = await res.json();

    return data.results;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to get similar subjects', area, e);
    return null;
  }
}

export type SubjectPage = {
  id?: number;
  slug: string;
  draft: boolean;
  keywords: string[] | null;
  section_1_heading: string;
  section_1_text: string;
  section_1_image: TImage;
  section_1_image_alt: string;
  form_tcpa: string | null;
  form_tcpa_checkbox: boolean;
  form_tcpa_precheck: boolean;
  section_2_heading: string | null;
  section_2_text: string | null;
  section_3_heading: string | null;
  section_3_text: string | null;
  section_3_image: TImage | null;
  section_3_image_alt: string | null;
  section_4_heading: string | null;
  section_4_text: string | null;
  section_4_image: TImage | null;
  section_4_image_alt: string | null;
  section_5_heading: string | null;
  section_5_text: string | null;
  section_5_image: TImage | null;
  section_5_image_alt: string | null;
  section_6_heading: string | null;
  section_7_heading: string | null;
  section_7_text_1: string | null;
  section_7_text_2: string | null;
  quote_text: string | null;
  quote_source: string | null;
  quote_image: TImage | null;
  quote_image_alt: string | null;
  section_9_heading: string | null;
  area_of_interest: Area | null;
  footer_legal: string | null;
};

type TImage = {
  id: number;
  name: string;
  asset: string;
};

/**
 * Fetches the full subject page data for rendering.Filters by draft=false when on production environment.
 *
 * @param subject the slug of the desired subject page.
 * @returns null if there was a fetch issue or the response was empty. Otherwise returns the subject page entry.
 */
export async function getSubjectPage(
  subject: string,
): Promise<SubjectPage | null> {
  'use server';
  try {
    const query = BASE_URL + subject + '?draft=' + process.env.NEXT_PUBLIC_DEV;
    const res = await fetch(query);

    if (!res.ok) {
      return null;
    }

    const data: SubjectPage = await res.json();

    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('ERROR: Failed to get subject page: ' + subject, e);
    return null;
  }
}
