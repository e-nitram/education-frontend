/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: [
      '127.0.0.1',
      'cdn.myadoptimizer.com',
      'cdn.transparent.ly',
      'api.transparent.ly',
      'leadcurrentcrm.com',
      'content.educationdynamics.com',
    ],
    deviceSizes: [640, 750, 828, 1080, 1366, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // TODO: troubleshoot serverActions
  experimental: {
    serverActions: true,
  },

  async redirects() {
    return [
      {
        source: '/get-started/1',
        destination: '/get-started',
        permanent: false,
      },
      {
        source: '/landing-page',
        destination: '/landing-page/1',
        permanent: false,
      },
    ];
  },
};

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'cm-1h',
    project: 'javascript-nextjs',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
);
