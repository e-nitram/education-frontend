import React from 'react';

export default function ClicksLayout({
  children,
  clicks,
  thankyou,
}: {
  children: React.ReactNode;
  clicks: React.ReactNode;
  thankyou: React.ReactNode;
}) {
  return (
    <>
      <div>{children}</div>
      {clicks}
      {thankyou}
    </>
  );
}
