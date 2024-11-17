import { MetadataRoute } from 'next';

import { getSubjectsIndex } from '@/app/_modules/subjectPages';
import { areas } from '@/app/content/areas';
import { schools } from '@/app/content/schools';

interface School {
  slug: string;
}

interface Area {
  slug: string;
}

interface Subject {
  slug: string;
}

// TODO: implement async function
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // export default function sitemap(): MetadataRoute.Sitemap {
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

  // // get schools
  // const schoolRes = await fetch(`${DATA_URL}/api/schools?headers_only=True`);
  // const schools: School[] = await schoolRes.json();

  // // get aois
  // const areaRes = await fetch(`${DATA_URL}/api/pages?headers_only=True`);
  // const areaData = await areaRes.json();
  // const areas: Area[] = areaData.results;

  // // get subjects
  const subjects = (await getSubjectsIndex()) ?? [];

  return [
    {
      url: `${APP_URL}/`,
      lastModified: new Date(),
    },
    {
      url: `${APP_URL}/schools`,
      lastModified: new Date(),
    },
    ...schools.map((school: School) => {
      return {
        url: `${APP_URL}/schools/${school.slug}`,
        lastModified: new Date(),
      };
    }),
    ...areas.map((area: Area) => {
      return {
        url: `${APP_URL}/area-of-interest/${area.slug}`,
        lastModified: new Date(),
      };
    }),
    ...subjects.map((subject: Subject) => {
      return {
        url: `${APP_URL}/subjects/${subject.slug}`,
        lastModified: new Date(),
      };
    }),
    ...subjects.map((subject: Subject) => {
      return {
        url: `${APP_URL}/subjects/ad/${subject.slug}`,
        lastModified: new Date(),
      };
    }),
    {
      url: `${APP_URL}/terms-and-conditions`,
      lastModified: new Date(),
    },
    {
      url: `${APP_URL}/get-started`,
      lastModified: new Date(),
    },
    {
      url: `${APP_URL}/do-not-call`,
      lastModified: new Date(),
    },
    {
      url: `${APP_URL}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${APP_URL}/clicks`,
      lastModified: new Date(),
    },
    {
      url: `${APP_URL}/results`,
      lastModified: new Date(),
    },
    {
      url: `${APP_URL}/landing-page/1`,
      lastModified: new Date(),
    },
  ];
}
