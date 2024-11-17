import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1366,
  viewportHeight: 768,
  hideXHRInCommandLog: true,

  e2e: {
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 60000,
    specPattern: '**/*cy.{js,ts}',
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.{jsx,tsx}',
  },
});
