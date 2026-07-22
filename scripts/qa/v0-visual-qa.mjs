import assert from "node:assert/strict"
import { access, mkdir, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"

import puppeteer from "puppeteer"

const baseUrl = (process.env.V0_QA_BASE_URL ?? "http://localhost:4337").replace(
  /\/$/,
  "",
)
const outputDirectory =
  process.env.V0_QA_OUTPUT_DIR ?? path.join(os.tmpdir(), "frankx-v0-qa")

const browserCandidates = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean)

async function firstExistingPath(paths) {
  for (const candidate of paths) {
    try {
      await access(candidate)
      return candidate
    } catch {
      // Try the next known browser installation.
    }
  }

  try {
    const bundled = puppeteer.executablePath()
    await access(bundled)
    return bundled
  } catch {
    return null
  }
}

function slugFor(route, viewport) {
  const routeSlug = route === "/" ? "home" : route.slice(1).replaceAll("/", "-")
  return `${routeSlug}-${viewport.name}`
}

async function auditDom(page) {
  return page.evaluate(() => {
    const isVisible = (element) => {
      const style = getComputedStyle(element)
      const rect = element.getBoundingClientRect()
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number.parseFloat(style.opacity) > 0 &&
        rect.width > 0 &&
        rect.height > 0
      )
    }

    const controls = [
      ...document.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ]
      .filter(isVisible)
      .map((element) => {
        const rect = element.getBoundingClientRect()
        const labelledBy = (element.getAttribute("aria-labelledby") ?? "")
          .split(/\s+/)
          .filter(Boolean)
          .map((id) => document.getElementById(id)?.textContent?.trim() ?? "")
          .filter(Boolean)
          .join(" ")
        const labelText =
          "labels" in element
            ? [...(element.labels ?? [])]
                .map((label) => label.textContent?.trim() ?? "")
                .filter(Boolean)
                .join(" ")
            : ""
        const label =
          element.getAttribute("aria-label") ||
          labelledBy ||
          labelText ||
          element.getAttribute("title") ||
          element.getAttribute("placeholder") ||
          element.textContent?.trim() ||
          ""
        return {
          tag: element.tagName.toLowerCase(),
          label: label.replace(/\s+/g, " ").slice(0, 120),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        }
      })

    const ids = [...document.querySelectorAll("[id]")].map(
      (element) => element.id,
    )
    const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))]

    const images = [...document.images].map((image) => {
      const rect = image.getBoundingClientRect()
      return {
        src: image.currentSrc || image.src,
        alt: image.getAttribute("alt"),
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        inViewport: rect.bottom > 0 && rect.top < window.innerHeight,
      }
    })

    const headingLevels = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
      .filter(isVisible)
      .map((heading) => Number(heading.tagName.slice(1)))
    const navigation = performance.getEntriesByType("navigation")[0]
    const resources = performance.getEntriesByType("resource")
    const firstContentfulPaint = performance
      .getEntriesByType("paint")
      .find((entry) => entry.name === "first-contentful-paint")

    return {
      title: document.title,
      lang: document.documentElement.lang,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      mainCount: document.querySelectorAll("main").length,
      duplicateIds,
      unnamedControls: controls.filter((control) => control.label.length === 0),
      controlsOutsideViewport: controls.filter(
        (control) =>
          (control.left < -1 && control.right > 0) ||
          (control.right > window.innerWidth + 1 &&
            control.left < window.innerWidth),
      ),
      images,
      brokenImages: images.filter(
        (image) =>
          (image.complete && image.naturalWidth === 0) ||
          (image.inViewport && !image.complete),
      ),
      imagesWithoutAlt: images.filter((image) => image.alt === null),
      headingLevels,
      performance: {
        firstContentfulPaintMs: firstContentfulPaint
          ? Math.round(firstContentfulPaint.startTime)
          : null,
        domContentLoadedMs: navigation
          ? Math.round(navigation.domContentLoadedEventEnd)
          : null,
        loadMs: navigation ? Math.round(navigation.loadEventEnd) : null,
        resourceCount: resources.length,
        transferBytes: Math.round(
          resources.reduce((total, resource) => total + resource.transferSize, 0),
        ),
        scriptDecodedBytes: Math.round(
          resources
            .filter((resource) => resource.initiatorType === "script")
            .reduce((total, resource) => total + resource.decodedBodySize, 0),
        ),
      },
      visibleReactFlowNodes: [...document.querySelectorAll(".react-flow__node")].filter(
        isVisible,
      ).length,
      visibleMobileSteps: [...document.querySelectorAll("button")].filter(
        (button) =>
          isVisible(button) &&
          /Creative brief|Reference set|Image generation/.test(
            button.textContent ?? "",
          ),
      ).length,
    }
  })
}

async function attachDiagnostics(page, diagnostics) {
  await page.setRequestInterception(true)
  page.on("request", (request) => {
    const parsed = new URL(request.url())
    const isLocalAnalyticsScript =
      request.url().startsWith(baseUrl) &&
      (parsed.pathname === "/_vercel/insights/script.js" ||
        parsed.pathname === "/_vercel/speed-insights/script.js")
    if (isLocalAnalyticsScript) {
      void request.respond({
        status: 200,
        contentType: "application/javascript",
        body: "",
      })
      return
    }
    void request.continue()
  })
  page.on("console", (message) => {
    if (message.type() === "error") {
      diagnostics.consoleErrors.push(message.text())
    }
  })
  page.on("pageerror", (error) => diagnostics.pageErrors.push(error.message))
  page.on("requestfailed", (request) => {
    const url = request.url()
    if (url.startsWith(baseUrl)) {
      const reason = request.failure()?.errorText ?? "unknown"
      const parsed = new URL(url)
      const expectedLocalAbort =
        reason === "net::ERR_ABORTED" &&
        (parsed.searchParams.has("_rsc") ||
          parsed.pathname.startsWith("/_vercel/insights/") ||
          parsed.pathname.startsWith("/_vercel/speed-insights/"))
      if (expectedLocalAbort) return
      diagnostics.failedLocalRequests.push({
        url,
        reason,
      })
    }
  })
}

async function navigate(page, route) {
  const response = await page.goto(`${baseUrl}${route}`, {
    waitUntil: "networkidle2",
    timeout: 45_000,
  })
  assert.ok(response, `${route} returned no navigation response`)
  assert.equal(response.status(), 200, `${route} returned ${response.status()}`)
  await page.evaluate(() => document.fonts.ready)
  await page
    .waitForFunction(
      () =>
        [...document.images]
          .filter((image) => {
            const rect = image.getBoundingClientRect()
            return rect.bottom > 0 && rect.top < window.innerHeight
          })
          .every((image) => image.complete),
      { timeout: 5_000 },
    )
    .catch(() => undefined)
}

async function clickButton(page, label) {
  const clicked = await page.evaluate((buttonLabel) => {
    const button = [...document.querySelectorAll("button")].find(
      (candidate) => candidate.textContent?.trim() === buttonLabel,
    )
    if (!button) return false
    button.click()
    return true
  }, label)
  assert.equal(clicked, true, `Could not find button: ${label}`)
}

async function waitForButton(page, label, timeout = 20_000) {
  await page.waitForFunction(
    (buttonLabel) =>
      [...document.querySelectorAll("button")].some(
        (button) => button.textContent?.trim() === buttonLabel,
      ),
    { timeout },
    label,
  )
}

async function auditOutputActions(page) {
  return page.evaluate(() => {
    const section = [
      ...document.querySelectorAll(
        'section[aria-label="Outputs and provenance"]',
      ),
    ].find((candidate) => {
      const rect = candidate.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0
    })
    const list = section?.querySelector("ul")
    const clip = list?.parentElement
    if (!section || !list || !clip) {
      return { actionCount: 0, cardCount: 0, outside: ["filmstrip-missing"] }
    }

    const labels = [
      "Select for A/B compare",
      "Approve output",
      "Reject output with note",
      "View provenance",
    ]
    const clipRect = clip.getBoundingClientRect()
    const cards = [...list.querySelectorAll("li")]
    const outside = []
    const measurements = []
    let actionCount = 0

    for (const [cardIndex, card] of cards.entries()) {
      const cardRect = card.getBoundingClientRect()
      for (const label of labels) {
        const button = card.querySelector(`button[aria-label="${label}"]`)
        if (!button) {
          outside.push(`card-${cardIndex}:${label}:missing`)
          continue
        }
        actionCount += 1
        const rect = button.getBoundingClientRect()
        const containedByCard =
          rect.left >= cardRect.left - 1 &&
          rect.right <= cardRect.right + 1 &&
          rect.top >= cardRect.top - 1 &&
          rect.bottom <= cardRect.bottom + 1
        const verticallyVisible =
          rect.top >= clipRect.top - 1 && rect.bottom <= clipRect.bottom + 1
        measurements.push({
          cardIndex,
          label,
          button: {
            top: Math.round(rect.top),
            right: Math.round(rect.right),
            bottom: Math.round(rect.bottom),
            left: Math.round(rect.left),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          },
          card: {
            top: Math.round(cardRect.top),
            right: Math.round(cardRect.right),
            bottom: Math.round(cardRect.bottom),
            left: Math.round(cardRect.left),
          },
          clip: {
            top: Math.round(clipRect.top),
            right: Math.round(clipRect.right),
            bottom: Math.round(clipRect.bottom),
            left: Math.round(clipRect.left),
          },
          containedByCard,
          verticallyVisible,
        })
        if (
          !containedByCard ||
          !verticallyVisible ||
          rect.width < 31 ||
          rect.height < 31
        ) {
          outside.push(`card-${cardIndex}:${label}:clipped`)
        }
      }
    }

    return { actionCount, cardCount: cards.length, outside, measurements }
  })
}

async function assertDialogFocus(page, dialogLabel) {
  const result = await page.evaluate((label) => {
    const dialog = document.querySelector(
      `[role="dialog"][aria-label="${label}"]`,
    )
    return {
      found: Boolean(dialog),
      focusInside: Boolean(dialog?.contains(document.activeElement)),
    }
  }, dialogLabel)
  assert.equal(result.found, true, `${dialogLabel} dialog is missing`)
  assert.equal(result.focusInside, true, `${dialogLabel} did not contain focus`)
}

function validateAudit(route, viewport, audit, diagnostics) {
  assert.ok(audit.title.length > 0, `${route} has no document title`)
  assert.ok(audit.lang.length > 0, `${route} has no document language`)
  assert.ok(audit.mainCount <= 1, `${route} renders multiple main landmarks`)
  assert.ok(
    audit.scrollWidth <= audit.viewportWidth + 1,
    `${route} overflows horizontally at ${viewport.name}: ${audit.scrollWidth}px > ${audit.viewportWidth}px`,
  )
  assert.deepEqual(audit.duplicateIds, [], `${route} has duplicate ids`)
  assert.deepEqual(audit.unnamedControls, [], `${route} has unnamed controls`)
  assert.deepEqual(
    audit.controlsOutsideViewport,
    [],
    `${route} has controls outside the ${viewport.name} viewport`,
  )
  assert.deepEqual(audit.brokenImages, [], `${route} has broken images`)
  assert.deepEqual(audit.imagesWithoutAlt, [], `${route} has images without alt text`)
  assert.deepEqual(diagnostics.pageErrors, [], `${route} raised page errors`)
  assert.deepEqual(
    diagnostics.failedLocalRequests,
    [],
    `${route} has failed local requests`,
  )
  assert.deepEqual(diagnostics.consoleErrors, [], `${route} logged console errors`)
  assert.ok(
    audit.performance.firstContentfulPaintMs !== null &&
      audit.performance.firstContentfulPaintMs <= 4_000,
    `${route} exceeded the 4s local FCP budget`,
  )
  assert.ok(
    audit.performance.domContentLoadedMs !== null &&
      audit.performance.domContentLoadedMs <= 6_000,
    `${route} exceeded the 6s local DOM-ready budget`,
  )
  assert.ok(
    audit.performance.loadMs !== null && audit.performance.loadMs <= 8_000,
    `${route} exceeded the 8s local load budget`,
  )
  assert.ok(
    audit.performance.resourceCount <= 150,
    `${route} loaded ${audit.performance.resourceCount} resources`,
  )
  assert.ok(
    audit.performance.scriptDecodedBytes <= 5_000_000,
    `${route} decoded ${audit.performance.scriptDecodedBytes} script bytes`,
  )
}

await mkdir(outputDirectory, { recursive: true })
const executablePath = await firstExistingPath(browserCandidates)
assert.ok(executablePath, "No compatible Chrome or Edge executable was found")

const report = {
  schemaVersion: "1.1.0",
  baseUrl,
  startedAt: new Date().toISOString(),
  executablePath,
  outputDirectory,
  pages: [],
  interaction: null,
  mobileInteraction: null,
  reducedMotion: null,
}

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--disable-dev-shm-usage"],
})

try {
  const viewports = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844, isMobile: true },
  ]
  const routes = ["/v0", "/v0/templates/visual-foundry", "/v0/studio"]

  for (const viewport of viewports) {
    for (const route of routes) {
      const page = await browser.newPage()
      const diagnostics = {
        consoleErrors: [],
        pageErrors: [],
        failedLocalRequests: [],
      }
      await attachDiagnostics(page, diagnostics)
      await page.setViewport(viewport)
      await navigate(page, route)

      const audit = await auditDom(page)
      if (route === "/v0/studio" && viewport.name === "desktop") {
        assert.ok(audit.visibleReactFlowNodes >= 5, "Desktop canvas has too few visible nodes")
      }
      if (route === "/v0/studio" && viewport.name === "mobile") {
        assert.equal(audit.visibleReactFlowNodes, 0, "Mobile should not render the node canvas")
        assert.ok(audit.visibleMobileSteps >= 3, "Mobile step view is missing")
      }
      validateAudit(route, viewport, audit, diagnostics)

      const screenshotPath = path.join(
        outputDirectory,
        `${slugFor(route, viewport)}.webp`,
      )
      await page.screenshot({
        path: screenshotPath,
        type: "webp",
        quality: 88,
        fullPage: route !== "/v0/studio",
      })
      report.pages.push({ route, viewport, screenshotPath, audit, diagnostics })
      await page.close()
    }
  }

  const interactionPage = await browser.newPage()
  const interactionDiagnostics = {
    consoleErrors: [],
    pageErrors: [],
    failedLocalRequests: [],
  }
  await attachDiagnostics(interactionPage, interactionDiagnostics)
  await interactionPage.setViewport({ width: 1440, height: 900 })
  await navigate(interactionPage, "/v0/studio")

  const importTrigger = 'button[aria-label="Import / export JSON"]'
  await interactionPage.focus(importTrigger)
  await interactionPage.click(importTrigger)
  await interactionPage.waitForSelector(
    '[role="dialog"][aria-label="Import / export workflow"]',
  )
  await assertDialogFocus(interactionPage, "Import / export workflow")
  for (let index = 0; index < 10; index += 1) {
    await interactionPage.keyboard.press("Tab")
    await assertDialogFocus(interactionPage, "Import / export workflow")
  }
  await interactionPage.keyboard.down("Shift")
  await interactionPage.keyboard.press("Tab")
  await interactionPage.keyboard.up("Shift")
  await assertDialogFocus(interactionPage, "Import / export workflow")
  await interactionPage.keyboard.press("Escape")
  await interactionPage.waitForSelector(
    '[role="dialog"][aria-label="Import / export workflow"]',
    { hidden: true },
  )
  const focusRestored = await interactionPage.evaluate(
    (selector) => document.activeElement === document.querySelector(selector),
    importTrigger,
  )
  assert.equal(focusRestored, true, "Dialog did not restore focus to its trigger")

  await clickButton(interactionPage, "Run workflow")
  await waitForButton(interactionPage, "Resume run")

  const reviewScreenshot = path.join(outputDirectory, "v0-studio-review.webp")
  await interactionPage.screenshot({
    path: reviewScreenshot,
    type: "webp",
    quality: 90,
  })
  await clickButton(interactionPage, "Resume run")
  await waitForButton(interactionPage, "Run workflow")

  const completionState = await interactionPage.evaluate(() => ({
    text: document.body.innerText,
    outputImages: [...document.images].filter((image) =>
      image.src.includes("/images/v0-foundry/"),
    ).length,
  }))
  assert.match(completionState.text, /Complete/)
  assert.ok(completionState.outputImages >= 1, "Completed run produced no visible output")
  const outputActions = await auditOutputActions(interactionPage)
  assert.ok(outputActions.cardCount >= 1, "Completed run rendered no output cards")
  assert.equal(outputActions.actionCount, outputActions.cardCount * 4)
  assert.deepEqual(outputActions.outside, [], "Output actions are clipped")
  validateAudit(
    "/v0/studio interaction",
    { name: "desktop" },
    await auditDom(interactionPage),
    interactionDiagnostics,
  )
  const completeScreenshot = path.join(outputDirectory, "v0-studio-complete.webp")
  await interactionPage.screenshot({
    path: completeScreenshot,
    type: "webp",
    quality: 90,
  })
  report.interaction = {
    status: "pass",
    reviewScreenshot,
    completeScreenshot,
    outputImages: completionState.outputImages,
    outputActions,
    keyboard: {
      dialogFocusTrap: "pass",
      focusRestored: true,
    },
    diagnostics: interactionDiagnostics,
  }
  await interactionPage.close()

  const mobilePage = await browser.newPage()
  const mobileDiagnostics = {
    consoleErrors: [],
    pageErrors: [],
    failedLocalRequests: [],
  }
  await attachDiagnostics(mobilePage, mobileDiagnostics)
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true })
  await navigate(mobilePage, "/v0/studio")
  assert.equal(
    await mobilePage.$('[role="dialog"][aria-label^="Inspector:"]'),
    null,
    "Mobile inspector opened without an explicit tap",
  )
  const mobileStepLabel = await mobilePage.evaluate(() => {
    const button = [...document.querySelectorAll("button")].find((candidate) =>
      candidate.textContent?.includes("Creative brief"),
    )
    if (!button) return null
    button.focus()
    button.click()
    return button.textContent?.replace(/\s+/g, " ").trim() ?? null
  })
  assert.ok(mobileStepLabel, "Could not open the first mobile workflow step")
  const inspector = await mobilePage.waitForSelector(
    '[role="dialog"][aria-label^="Inspector:"]',
  )
  assert.ok(inspector, "Mobile inspector did not open after an explicit tap")
  const inspectorLabel = await mobilePage.$eval(
    '[role="dialog"][aria-label^="Inspector:"]',
    (element) => element.getAttribute("aria-label"),
  )
  assert.ok(inspectorLabel)
  await assertDialogFocus(mobilePage, inspectorLabel)
  for (let index = 0; index < 6; index += 1) {
    await mobilePage.keyboard.press("Tab")
    await assertDialogFocus(mobilePage, inspectorLabel)
  }
  await mobilePage.keyboard.press("Escape")
  await mobilePage.waitForSelector(
    '[role="dialog"][aria-label^="Inspector:"]',
    { hidden: true },
  )
  const mobileFocusRestored = await mobilePage.evaluate(() =>
    document.activeElement?.textContent?.includes("Creative brief"),
  )
  assert.equal(
    mobileFocusRestored,
    true,
    "Mobile inspector did not restore focus to its triggering step",
  )

  await clickButton(mobilePage, "Run workflow")
  await waitForButton(mobilePage, "Resume run")
  await clickButton(mobilePage, "Resume run")
  await waitForButton(mobilePage, "Run workflow")
  const mobileOutputActions = await auditOutputActions(mobilePage)
  const mobileCompleteScreenshot = path.join(
    outputDirectory,
    "v0-studio-complete-mobile.webp",
  )
  await mobilePage.screenshot({
    path: mobileCompleteScreenshot,
    type: "webp",
    quality: 90,
  })
  assert.ok(mobileOutputActions.cardCount >= 1, "Mobile rendered no output cards")
  assert.equal(
    mobileOutputActions.actionCount,
    mobileOutputActions.cardCount * 4,
  )
  assert.deepEqual(
    mobileOutputActions.outside,
    [],
    `Mobile output actions are clipped: ${JSON.stringify(mobileOutputActions.measurements)}`,
  )
  validateAudit(
    "/v0/studio mobile interaction",
    { name: "mobile" },
    await auditDom(mobilePage),
    mobileDiagnostics,
  )
  report.mobileInteraction = {
    status: "pass",
    inspectorExplicitOpen: true,
    inspectorFocusTrap: "pass",
    inspectorFocusRestored: true,
    outputActions: mobileOutputActions,
    completeScreenshot: mobileCompleteScreenshot,
    diagnostics: mobileDiagnostics,
  }
  await mobilePage.close()

  const reducedMotionPage = await browser.newPage()
  await reducedMotionPage.setViewport({ width: 1440, height: 900 })
  await reducedMotionPage.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ])
  await navigate(reducedMotionPage, "/v0/studio")
  const reducedStart = performance.now()
  await clickButton(reducedMotionPage, "Run workflow")
  await waitForButton(reducedMotionPage, "Resume run", 2_000)
  const reducedElapsedMs = Math.round(performance.now() - reducedStart)
  const infiniteAnimations = await reducedMotionPage.evaluate(() =>
    document
      .getAnimations()
      .filter((animation) => animation.effect?.getTiming().iterations === Infinity)
      .length,
  )
  assert.ok(
    reducedElapsedMs < 1_500,
    `Reduced-motion run took ${reducedElapsedMs}ms`,
  )
  assert.equal(infiniteAnimations, 0, "Reduced-motion mode left an infinite animation running")
  report.reducedMotion = {
    status: "pass",
    elapsedToReviewMs: reducedElapsedMs,
    infiniteAnimations,
  }
  await reducedMotionPage.close()
} finally {
  await browser.close()
  report.finishedAt = new Date().toISOString()
  await writeFile(
    path.join(outputDirectory, "report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  )
}

console.log(JSON.stringify(report, null, 2))
