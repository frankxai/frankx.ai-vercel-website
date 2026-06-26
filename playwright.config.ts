import { defineConfig } from '@playwright/test'

/**
 * Pre-installed Chromium path used by the remote execution environment.
 * If the @playwright/test version pinned in package.json doesn't match the
 * downloaded browser bundle, point `executablePath` at this real Chromium so
 * we don't need to run `playwright install` (which the env disables). Set
 * PLAYWRIGHT_CHROMIUM_PATH to override locally on dev machines.
 */
const PREBUILT_CHROMIUM =
  process.env.PLAYWRIGHT_CHROMIUM_PATH || '/opt/pw-browsers/chromium'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: { executablePath: PREBUILT_CHROMIUM },
      },
    },
    // Firefox + WebKit only run when the matching browser bundles are
    // available locally (e.g. after `npx playwright install`). They're left
    // here for parity but skipped by default — CI matrix toggles them on.
    ...(process.env.PLAYWRIGHT_FULL_MATRIX
      ? [
          { name: 'firefox', use: { browserName: 'firefox' as const } },
          { name: 'webkit', use: { browserName: 'webkit' as const } },
        ]
      : []),
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
})
