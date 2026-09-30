import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'tests/features/*.feature',
  steps: 'tests/steps/*.ts',
});

export default defineConfig({
  testDir,
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    // @mobiel-scenario's alleen op mobiel, @desktop-scenario's alleen op desktop
    { name: 'desktop', use: { ...devices['Desktop Chrome'] }, grepInvert: /@mobiel/ },
    { name: 'mobiel', use: { ...devices['Pixel 7'] }, grepInvert: /@desktop/ },
  ],
  webServer: {
    command: 'npx http-server . -p 4173 -c-1 --silent',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
  },
});
