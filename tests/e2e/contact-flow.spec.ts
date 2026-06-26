import { test, expect, type Locator, type Page, type Route } from '@playwright/test'

/**
 * End-to-end coverage for the unified intake front door.
 *
 * Scope:
 *  - /contact loads, renders form, accepts a valid submission
 *  - Intent deep-link via ?intent= pre-selects the right pill
 *  - Validation: email format check fires client-side (no roundtrip)
 *  - Mobile viewport: form is operable with thumb-reachable targets
 *  - Strategic Advisor route: passcode gate blocks public access
 *  - Success state: shows the 24-hour artifact + calendar CTA
 *  - The intake API contract — these tests mock POST /api/intake so they
 *    don't depend on Resend / Notion / Slack being configured.
 *
 * Run locally:
 *   npm run dev          # in one terminal
 *   npm run test:e2e     # in another (uses webServer config to auto-launch)
 */

const INTAKE_ENDPOINT = '**/api/intake'
const PRIVATE_ACCESS_ENDPOINT = '**/api/private-access'

/**
 * The page can have other forms with overlapping labels (newsletter signup
 * also has an "Email" input). Always scope to the labelled contact form.
 */
function contactForm(page: Page): Locator {
  return page.getByRole('form', { name: 'Contact Frank' })
}

async function mockIntakeOk(page: Page) {
  await page.route(INTAKE_ENDPOINT, (route: Route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        ok: true,
        message: "Got it — you'll hear back within 1–2 working days.",
      }),
    }),
  )
}

async function mockIntakeServerError(page: Page) {
  await page.route(INTAKE_ENDPOINT, (route: Route) =>
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        ok: false,
        error: 'We hit a delivery hiccup. Please try again or email frank@frankx.ai directly.',
      }),
    }),
  )
}

async function fillContactForm(
  page: Page,
  opts: { name?: string; email?: string; message?: string } = {},
) {
  const form = contactForm(page)
  // Exact-match the labels — the consent checkbox copy contains "message"
  // and the contact form lives near other inputs (newsletter signup).
  await form.getByLabel('Name', { exact: true }).fill(opts.name ?? 'Test Builder')
  await form.getByLabel('Email', { exact: true }).fill(opts.email ?? 'builder@example.com')
  await form
    .getByLabel('Message', { exact: true })
    .fill(opts.message ?? 'Building a thing. Want to talk to Frank about it.')
  await form.getByLabel(/I consent/).check()
}

test.describe('/contact — happy path', () => {
  test('loads and submits successfully', async ({ page }) => {
    await mockIntakeOk(page)
    await page.goto('/contact')

    await expect(page.getByRole('heading', { name: /tell frank what you/i })).toBeVisible()
    await expect(
      contactForm(page).getByRole('button', { name: /general inquiry/i }),
    ).toBeVisible()

    await fillContactForm(page)
    await contactForm(page).getByRole('button', { name: /send to frank/i }).click()

    // Success card replaces the form — scope to its status role so we don't
    // collide with the FAQ section below that mentions similar copy.
    const success = page.getByRole('status').filter({ hasText: /got it/i })
    await expect(success).toBeVisible()
    await expect(success.getByRole('link', { name: /book the intro call now/i })).toBeVisible()
    await expect(success).toContainText(/a real reply from Frank follows/i)
  })

  test('shows the 24-hour artifact specific to the chosen intent', async ({ page }) => {
    await mockIntakeOk(page)
    await page.goto('/contact')

    await contactForm(page)
      .getByRole('button', { name: /implementation sprint/i })
      .click()
    await fillContactForm(page, { message: 'Need to ship in 8 days.' })
    await contactForm(page).getByRole('button', { name: /send to frank/i }).click()

    const success = page.getByRole('status').filter({ hasText: /got it/i })
    await expect(success).toContainText(/architecture critique/i)
  })

  test('deep-links to an intent via ?intent=', async ({ page }) => {
    await page.goto('/contact?intent=workshop')

    const pill = contactForm(page).getByRole('button', {
      name: /workshop \(1-day team build\)/i,
    })
    await expect(pill).toHaveAttribute('aria-pressed', 'true')

    await expect(page.getByText(/15-minute Loom critiquing your current stack/i)).toBeVisible()
  })

  test('ignores garbage ?intent= values and falls back to general', async ({ page }) => {
    await page.goto('/contact?intent=not-a-real-intent')

    const general = contactForm(page).getByRole('button', { name: /general inquiry/i })
    await expect(general).toHaveAttribute('aria-pressed', 'true')
  })
})

test.describe('/contact — validation + errors', () => {
  test('catches an obvious email typo before submission', async ({ page }) => {
    // No mock — the API should never be hit if client validation works.
    let intakeCalled = false
    await page.route(INTAKE_ENDPOINT, (route: Route) => {
      intakeCalled = true
      return route.continue()
    })

    await page.goto('/contact')
    await fillContactForm(page, { email: 'not-an-email' })
    await contactForm(page).getByRole('button', { name: /send to frank/i }).click()

    await expect(page.getByText(/that email looks off/i)).toBeVisible()
    expect(intakeCalled).toBe(false)
  })

  test('surfaces server errors with a recovery email address', async ({ page }) => {
    await mockIntakeServerError(page)
    await page.goto('/contact')

    await fillContactForm(page)
    await contactForm(page).getByRole('button', { name: /send to frank/i }).click()

    await expect(page.getByText(/delivery hiccup/i)).toBeVisible()
    await expect(
      contactForm(page).getByText(/frank@frankx\.ai/i).first(),
    ).toBeVisible()
  })

  test('shows the live character counter on the message field', async ({ page }) => {
    await page.goto('/contact')

    const textarea = contactForm(page).getByLabel('Message', { exact: true })
    await textarea.fill('Hello there.')

    await expect(contactForm(page).getByText('12/4000')).toBeVisible()
  })
})

test.describe('/contact — mobile viewport (iPhone 12 Mini)', () => {
  test.use({ viewport: { width: 360, height: 780 } })

  test('hero, intent buttons, and form remain operable', async ({ page }) => {
    await mockIntakeOk(page)
    await page.goto('/contact')

    await expect(page.getByRole('heading', { name: /tell frank what you/i })).toBeVisible()

    // Form inputs are tappable — verify min touch target by checking computed height.
    const name = contactForm(page).getByLabel('Name', { exact: true })
    const box = await name.boundingBox()
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44)

    // Submit is full-width on mobile.
    const submit = contactForm(page).getByRole('button', { name: /send to frank/i })
    const submitBox = await submit.boundingBox()
    expect(submitBox?.width ?? 0).toBeGreaterThan(240)

    await fillContactForm(page)
    await submit.click()
    await expect(page.getByText(/got it\. your message is in/i)).toBeVisible()
  })

  test('font-size is at least 16px on inputs (prevents iOS zoom on focus)', async ({ page }) => {
    await page.goto('/contact')

    for (const labelText of ['Name', 'Email', 'Message']) {
      const field = contactForm(page).getByLabel(labelText, { exact: true })
      const fontSize = await field.evaluate(
        (el) => parseFloat(getComputedStyle(el).fontSize),
      )
      expect(fontSize, `${labelText} input font-size`).toBeGreaterThanOrEqual(16)
    }
  })
})

test.describe('/engagements/strategic-advisor — passcode gate', () => {
  test('blocks public visitors when no passcode cookie is set', async ({ page }) => {
    await page.goto('/engagements/strategic-advisor')

    await expect(
      page.getByRole('form', { name: /strategic advisor passcode/i }),
    ).toBeVisible()
    await expect(
      page.getByRole('textbox', { name: /passcode/i }),
    ).toBeVisible()
    await expect(page.getByRole('button', { name: /enter|verifying/i })).toBeVisible()

    // The strategic advisor copy must NOT be visible to the public.
    await expect(page.getByText(/Frank operates as a fractional/i)).toHaveCount(0)
  })

  test('shows an inline error on wrong passcode without leaking gate state', async ({ page }) => {
    await page.route(PRIVATE_ACCESS_ENDPOINT, (route: Route) =>
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ ok: false, error: 'Access denied.' }),
      }),
    )

    await page.goto('/engagements/strategic-advisor')
    const gate = page.getByRole('form', { name: /strategic advisor passcode/i })
    await gate.getByRole('textbox', { name: /passcode/i }).fill('wrong-code')
    await gate.getByRole('button', { name: /enter/i }).click()

    // Scope to the passcode form — Next's route announcer is also role=alert.
    await expect(gate.getByRole('alert')).toContainText(/access denied/i)
    // Fail-closed: gated copy must not leak alongside the error. A regression
    // that renders the protected page next to the alert must fail here.
    await expect(page.getByText(/Frank operates as a fractional/i)).toHaveCount(0)
  })

  test('passcode submit is a real button with adequate touch target', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 })
    await page.goto('/engagements/strategic-advisor')

    const submit = page.getByRole('button', { name: /enter/i })
    const box = await submit.boundingBox()
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44)
  })
})
