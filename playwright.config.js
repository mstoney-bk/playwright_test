const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // Retries let Test Engine see a test fail and then pass in the same run (flaky)
  retries: process.env.CI ? 1 : 0,

  reporter: [
    ['line'],
    // Sends results to Test Engine when BUILDKITE_ANALYTICS_TOKEN is set
    ['buildkite-test-collector/playwright/reporter'],
  ],

  use: {
    baseURL: 'http://localhost:3000',
  },

  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],

  // Starts the demo app before the tests run
  webServer: {
    command: 'node server.js',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
