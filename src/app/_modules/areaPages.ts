'use server';

/**
 * This module is responsible for managing calls to the Area of Interest endpoint on the CMS Service.
 */

export type AreaHeader = {
  slug: string;
  draft: boolean;
  section_1_heading: string;
  section_1_text: string;
  section_1_image: Image;
  section_1_image_alt: string;
  subjects: SubjectStub[] | null;
};

type SubjectStub = {
  slug: string;
  draft: boolean;
  section_1_heading: string;
};

type Image = {
  id: number;
  name: string;
  asset: string;
};

/**
 * Fetches all Area of Interest Page Headers from the CMS database, iterating through paginated results arrays to concatenate all entries. Filters by draft=false when on production environment.
 *
 * @returns null if fetch error or no responses. Otherwise returns array of area entries.
 */
export async function getAreasIndex(): Promise<null | AreaHeader[]> {
  let query =
    (process.env.NEXT_PUBLIC_BASE_URL as string) +
    '/api/area/' +
    '?draft=' +
    process.env.NEXT_PUBLIC_DEV;
  let hasNext = true;
  const areas = [];

  try {
    while (hasNext) {
      const res = await fetch(query);
      const data = await res.json();
      areas.push(...data.results);

      if (null != data.next) {
        query = data.next;
      } else {
        hasNext = false;
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error({ message: 'failed to fetch areas', e });
    return null;
  }

  if (0 == areas.length) {
    return null;
  }
  return areas;
}

export type AreaPage = {
  id?: number;
  slug: string;
  draft: boolean;
  keywords: string[] | null;
  section_1_heading: string;
  section_1_text: string;
  section_1_image: Image;
  section_1_image_alt: string;
  form_tcpa: string | null;
  form_tcpa_checkbox: boolean;
  form_tcpa_precheck: boolean;
  section_2_heading: string | null;
  section_2_text: string | null;
  section_3_heading: string | null;
  section_3_text: string | null;
  section_3_image: Image | null;
  section_3_image_alt: string | null;
  section_4_heading: string | null;
  section_4_text: string | null;
  section_4_image: Image | null;
  section_4_image_alt: string | null;
  section_5_heading: string | null;
  section_5_text: string | null;
  section_5_image: Image | null;
  section_5_image_alt: string | null;
  section_6_heading: string | null;
  section_7_heading: string | null;
  section_7_text_1: string | null;
  section_7_text_2: string | null;
  quote_text: string | null;
  quote_source: string | null;
  quote_image: Image | null;
  quote_image_alt: string | null;
  section_9_heading: string | null;
  subjects: SubjectStub[] | null;
  footer_legal: string | null;
};

/**
 * Fetches the full area page data for rendering.Filters by draft=false when on production environment.
 *
 * @param area the slug of the desired area page.
 * @returns null if there was a fetch issue or the response was empty. Otherwise returns the area page entry.
 */
export async function getAreaPage(area: string): Promise<AreaPage | null> {
  'use server';
  try {
    const query =
      (process.env.NEXT_PUBLIC_BASE_URL as string) +
      '/api/area-page-news/' +
      area +
      '?draft=' +
      process.env.NEXT_PUBLIC_DEV;
    const res = await fetch(query);

    if (!res.ok) {
      return null;
    }

    const data: AreaPage = await res.json();

    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to get area page: ' + area, e);
    return null;
  }
}
