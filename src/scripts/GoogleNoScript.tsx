'use client';

export default function GoogleNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}`}
        height='0'
        width='0'
        className='invisible hidden'
      ></iframe>
    </noscript>
  );
}
