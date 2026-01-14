import { test, expect } from '@playwright/test'

/**
 * Homepage Smoke Tests
 *
 * Critical path: User lands on homepage and sees key elements.
 * If these fail, the site is fundamentally broken.
 */

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/')

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')

    // Check page loaded (no error pages)
    await expect(page).toHaveTitle(/FrankX/i)
  })

  test('displays hero section', async ({ page }) => {
    await page.goto('/')

    // Check for main heading
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()

    // Check for CTA button
    const ctaButton = page.getByRole('link', { name: /get started|start|explore/i })
    await expect(ctaButton).toBeVisible()
  })

  test('shows navigation', async ({ page }) => {
    await page.goto('/')

    // Check navigation exists
    const nav = page.getByRole('navigation')
    await expect(nav).toBeVisible()

    // Check key nav links exist
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible()
  })

  test('displays social links in footer', async ({ page }) => {
    await page.goto('/')

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    // Check footer exists
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()

    // Check at least one social link exists
    const socialLinks = footer.locator('a[href*="x.com"], a[href*="linkedin.com"], a[href*="suno.com"]')
    await expect(socialLinks.first()).toBeVisible()
  })

  test('has no console errors', async ({ page }) => {
    const errors: string[] = []

    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Allow some errors but flag critical ones
    const criticalErrors = errors.filter(err =>
      !err.includes('ResizeObserver') && // Known harmless warning
      !err.includes('favicon')            // Favicon 404s are cosmetic
    )

    expect(criticalErrors).toHaveLength(0)
  })
})
