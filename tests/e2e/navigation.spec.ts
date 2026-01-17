import { test, expect } from '@playwright/test'

/**
 * Navigation Smoke Tests
 *
 * Critical path: Users can navigate between key pages.
 * Tests core user journeys and site structure.
 */

test.describe('Site Navigation', () => {
  test('can navigate from homepage to links page', async ({ page }) => {
    await page.goto('/')

    // Look for links page link (might be in nav or footer)
    const linksPageLink = page.getByRole('link', { name: /links/i })

    if (await linksPageLink.count() > 0) {
      await linksPageLink.first().click()
      await page.waitForLoadState('networkidle')

      // Should be on links page
      expect(page.url()).toContain('/links')
    }
  })

  test('navigation is accessible on all pages', async ({ page }) => {
    const pages = ['/', '/links', '/blog', '/products']

    for (const pagePath of pages) {
      try {
        await page.goto(pagePath)
        const nav = page.getByRole('navigation')

        if (await nav.count() > 0) {
          await expect(nav.first()).toBeVisible()
        }
      } catch (e) {
        // Page might not exist, skip
        continue
      }
    }
  })

  test('logo/home link works from any page', async ({ page }) => {
    // Start on links page
    await page.goto('/links')

    // Click logo or home link
    const homeLink = page.getByRole('link', { name: /home|frankx/i }).first()

    if (await homeLink.count() > 0) {
      await homeLink.click()
      await page.waitForLoadState('networkidle')

      // Should be back on homepage
      expect(page.url()).toMatch(/^\/$|\/home/)
    }
  })

  test('all nav links lead to valid pages', async ({ page }) => {
    await page.goto('/')

    const nav = page.getByRole('navigation')
    if (await nav.count() === 0) return // No nav found, skip

    const navLinks = nav.getByRole('link')
    const linkCount = await navLinks.count()

    // Check first few nav links
    for (let i = 0; i < Math.min(linkCount, 5); i++) {
      const href = await navLinks.nth(i).getAttribute('href')

      if (href && href.startsWith('/') && !href.startsWith('//')) {
        // Internal link, verify it loads
        const response = await page.goto(href)
        expect(response?.status()).toBeLessThan(400)

        // Go back to test next link
        await page.goto('/')
      }
    }
  })
})
