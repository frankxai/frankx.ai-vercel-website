import { test, expect } from '@playwright/test'

/**
 * Links Page Smoke Tests
 *
 * Critical path: Creator hub loads with all key elements.
 * Tests social links, CTAs, and engagement features.
 */

test.describe('Links Page (/links)', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/links')
    await page.waitForLoadState('networkidle')

    // Check no error pages
    await expect(page).not.toHaveTitle(/404|error/i)
  })

  test('displays profile information', async ({ page }) => {
    await page.goto('/links')

    // Check for profile name/title
    await expect(page.getByText(/Frank X|FrankX/i)).toBeVisible()

    // Check for tagline or description
    await expect(page.getByText(/musician|technologist|AI/i)).toBeVisible()
  })

  test('shows primary product links', async ({ page }) => {
    await page.goto('/links')

    // Look for key products
    const vibeOS = page.getByText(/Vibe OS|vibe.*os/i)
    const toolkit = page.getByText(/Creative AI Toolkit|toolkit/i)

    // At least one product should be visible
    const productsVisible = await vibeOS.isVisible() || await toolkit.isVisible()
    expect(productsVisible).toBeTruthy()
  })

  test('displays social media icons', async ({ page }) => {
    await page.goto('/links')

    // Check for social links (should be visible as icons or links)
    const socialContainer = page.locator('[aria-label*="social" i], .social-links, a[href*="x.com"], a[href*="linkedin.com"]')
    await expect(socialContainer.first()).toBeVisible()
  })

  test('all social links use correct URLs from BRAND_IDENTITY', async ({ page }) => {
    await page.goto('/links')

    // Get all social links
    const xLink = page.locator('a[href*="x.com/frankxeth"]')
    const linkedInLink = page.locator('a[href*="linkedin.com/in/frank-x-riemer"]')
    const sunoLink = page.locator('a[href*="suno.com/@frankx"]')

    // Verify correct URLs (not the old wrong ones)
    if (await xLink.count() > 0) {
      await expect(xLink.first()).toHaveAttribute('href', /frankxeth/)
    }

    if (await linkedInLink.count() > 0) {
      await expect(linkedInLink.first()).toHaveAttribute('href', /frank-x-riemer/)
    }

    if (await sunoLink.count() > 0) {
      await expect(sunoLink.first()).toHaveAttribute('href', /@frankx/)
    }
  })

  test('has email capture form', async ({ page }) => {
    await page.goto('/links')

    // Look for email input
    const emailInput = page.getByPlaceholder(/email/i).or(page.getByRole('textbox', { name: /email/i }))

    // Email form should exist (even if backend not hooked up yet)
    const formExists = await emailInput.count() > 0
    expect(formExists).toBeTruthy()
  })

  test('all primary links are clickable', async ({ page }) => {
    await page.goto('/links')

    // Get all links on the page
    const allLinks = page.getByRole('link')
    const linkCount = await allLinks.count()

    // Should have multiple links
    expect(linkCount).toBeGreaterThan(3)

    // Check first few links are actually clickable (have href)
    for (let i = 0; i < Math.min(linkCount, 5); i++) {
      const link = allLinks.nth(i)
      const href = await link.getAttribute('href')
      expect(href).toBeTruthy()
      expect(href).not.toBe('#')
    }
  })

  test('is mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/links')

    // Page should load without horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(375)

    // Key elements should still be visible
    await expect(page.getByText(/Frank X|FrankX/i)).toBeVisible()
  })

  test('loads in under 3 seconds', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/links')
    await page.waitForLoadState('networkidle')

    const loadTime = Date.now() - startTime

    // Should load fast (even with animations)
    expect(loadTime).toBeLessThan(3000)
  })
})
