'use client';

import { useEffect } from 'react';

import {
  AddressBody,
  ConsentBody,
  LeadBody,
  ProfileBody,
  TokenBody,
} from '@/app/_modules/lead';

/**
 * Gets the session ID from localStorage
 *
 * @return {number} The Session ID value or -1 if failure
 */
function getSessionID(): number {
  const data = localStorage.getItem('leadRes');
  if (null == data) {
    // ERROR: session not created on landing
    return -1;
  }
  const leadRes = JSON.parse(data);
  const session_id = leadRes.session.session_id;

  return session_id;
}

/**
 * Writes the data to LocalStorage
 *
 * @param session
 * @param lead
 * @param consent
 * @param tokens
 * @param profile
 */
function writeData(
  lead: LeadBody | null,
  consent: ConsentBody | null,
  tokens: TokenBody | null,
  profile: ProfileBody | null,
  address: AddressBody | null,
) {
  const data = localStorage.getItem('leadRes');
  const leadRes = null == data ? null : JSON.parse(data);

  localStorage.setItem(
    'leadRes',
    JSON.stringify({
      ...leadRes,
      lead,
      consent,
      tokens,
      profile,
      address,
    }),
  );
}

/**
 * Stub component to store functions above.
 */
export default function Lead() {
  useEffect(() => {});
  return <></>;
}
