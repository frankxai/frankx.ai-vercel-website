// Mobile lab budgets are regressions on these routes, independent of field p75.
if (!process.env.PUPPETEER_EXECUTABLE_PATH) throw new Error('Set the pinned CI Chrome path before running Lighthouse')
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 4332',
      startServerReadyPattern: 'Ready in',
      startServerReadyTimeout: 60000,
      url: ['http://127.0.0.1:4332/products/aurora-ui-kit', 'http://127.0.0.1:4332/checkout/aurora-ui-kit'],
      numberOfRuns: 3,
      chromePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      settings: { onlyCategories: ['performance'], formFactor: 'mobile' },
    },
    assert: {
      assertions: {
        'http-status-code': 'error',
        'largest-contentful-paint': ['error', { maxNumericValue: 1800, aggregationMethod: 'median' }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.05, aggregationMethod: 'median' }],
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci/reports' },
  },
}
