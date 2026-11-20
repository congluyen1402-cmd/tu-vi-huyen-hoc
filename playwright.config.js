const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 8000
  },
  fullyParallel: false,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'node server.js',
    port: 8080,
    reuseExistingServer: !process.env.CI,
    timeout: 10000
  },
  projects: [
    {
      name: 'Desktop Chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'Mobile Pixel 7',
      use: { ...devices['Pixel 7'] }
    },
    {
      name: 'Mobile iPhone 13',
      use: {
        ...devices['iPhone 13'],
        defaultBrowserType: 'chromium'
      }
    }
  ]
});
