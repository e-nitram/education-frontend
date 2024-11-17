'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { createCallback } from '@/app/_actions/callback';
import { SessionBody, startSession } from '@/app/_modules/sessions';
import { Callback } from '@/app/_objects/callback';

/**
 * A functional component to run the scripts necessary to initialize a session upon client landing.
 *
 * @returns empty JSX fragments.
 */
export default function Session() {
  const searchParams = useSearchParams();

  /**
   * Responsible for building the body for a post request to create a new session. Pulls data from localStorage to build the body.
   *
   * @return {Promise<SessionBody>}
   */
  const getBody = useCallback(async () => {
    let data = localStorage.getItem('web_session_id');
    const web_session_id = null == data ? uuidv4() : JSON.parse(data);
    data = localStorage.getItem('queryParams');
    const queryParams = null == data ? {} : JSON.parse(data);

    const {
      utm_medium = null,
      utm_source = null,
      utm_content = null,
      utm_campaign = null,
      utm_term = null,
      utm_supplier_id = null,
      utm_sub_id = null,
      utm_ad_id = null,
      utm_id = null,
    } = queryParams;

    const ip = await getClientIP();

    const body: SessionBody = {
      client_ip: ip ?? '8.192.0.0',
      web_url: window.location.href,
      device_type: getDeviceType(),
      browser_type: getBrowser(),
      web_session_id: web_session_id,
      is_test: 'true' == process.env.NEXT_PUBLIC_DEV ? true : false,
      referer_url: document.referrer,
      utm_data:
        null != utm_supplier_id
          ? {
              source: utm_source,
              medium: utm_medium,
              campaign: utm_campaign,
              content: utm_content,
              term: utm_term,
              supplier_id: utm_supplier_id,
              sub_id: utm_sub_id,
              utm_id: utm_ad_id ?? utm_id,
            }
          : null,
    };

    return body;
  }, []);

  /**
   * Responsible for creating a session with the server. Updates and overwrights any query params from localstorage using key/value pairs found in the URL. Then initializes a new session.
   */
  useEffect(() => {
    const queryParams = JSON.parse(localStorage.getItem('queryParams') ?? '{}');

    let params: { [key: string]: string } = {};

    searchParams?.forEach((value, key) => {
      params[key] = value;
    });

    params = { ...queryParams, ...params };

    if ('ORG' == queryParams?.utm_supplier_id?.substring(0, 3)) {
      params['utm_supplier_id'] = queryParams['utm_supplier_id'];
    }

    localStorage.setItem('queryParams', JSON.stringify(params));

    window.dataLayer = window.dataLayer ?? [];

    window.dataLayer.push(params);

    /**
     * Responsible for calling the session controller on the server to start a new session. Stores data from the server on localstorage.
     */
    async function initializeSession() {
      const body = await getBody();

      let leadRes = JSON.parse(localStorage.getItem('leadRes') ?? '{}');
      let session = leadRes.session;
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
        currentDate - new Date(session.session_start_time).getTime() >
          10 * 60 * 1000
      ) {
        if (null != body.utm_data?.supplier_id) {
          body.utm_data.supplier_id = body.utm_data.supplier_id.replace(
            'SUP',
            'ORG',
          );
        }

        const queryParams = JSON.parse(
          localStorage.getItem('queryParams') ?? '{}',
        );
        queryParams.utm_supplier_id = queryParams.utm_supplier_id?.replace(
          'SUP',
          'ORG',
        );
        localStorage.setItem('queryParams', JSON.stringify(queryParams));
      }

      const res = await startSession(body);
      session = res;

      while (null == res) {
        const res = await startSession(body);
        session = res;
      }

      leadRes = { ...leadRes, session };

      localStorage.setItem('leadRes', JSON.stringify(leadRes));

      await createCallback(Callback.landing, 0);
    }
    initializeSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Wraps logic to get a client ip. Current implementation calls an external API to check the client ip address.
   * @return Returns a string for the client ip address or null if there was an error.
   */
  async function getClientIP(): Promise<string | null> {
    try {
      const response = await fetch('https://geolocation-db.com/json/');
      if (!response.ok) {
        return null;
      }
      const ip = await response.json();
      return ip?.IPv4;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('ERROR: failed to get clientIP', e);
      return null;
    }
  }

  /**
   * Wraps logic to get a device type.
   * @returns {string} a string, currently an enum value 'Mobile' or 'Desktop'
   */
  function getDeviceType(): string {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
      navigator.userAgent,
    )
      ? 'Mobile'
      : 'Desktop';
  }

  /**
   * Gets the browser version from userAgent.
   */
  function getBrowser() {
    return window.navigator.userAgent;
  }

  return <></>;
}
