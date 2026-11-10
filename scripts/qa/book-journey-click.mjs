export const CLICK_RETRY_PATTERN = /Node is either not clickable or not an Element|Node is detached from document/i

export function measurePointerTarget(selector) {
  const element = document.querySelector(selector)
  if (!element) return { ok: false, scrollY }
  const bounds = element.getBoundingClientRect()
  const hit = document.elementFromPoint(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)
  const reachable = hit === element || element.contains(hit)
  const inViewport = bounds.width > 0 && bounds.height > 0 && bounds.top >= 0 && bounds.bottom <= innerHeight
  return {
    ok: reachable && inViewport,
    reachable,
    inViewport,
    top: Math.round(bounds.top),
    left: Math.round(bounds.left),
    obstructedBy: hit?.closest('a,button,nav,header')?.outerHTML.slice(0, 500),
    scrollY,
  }
}

export function createJourneyClickHelpers({ page, size, defaultIntervalMs = 100 }) {
  // waitForFunction re-checks from inside the page (requestAnimationFrame or timers), and those never run while
  // setJavaScriptEnabled(false) is in effect. A smooth-scrolling fragment jump is still moving at the first check,
  // so no-JavaScript position checks poll from Node instead, with the same condition and a bounded budget.
  // A check passes only once the condition holds and scrollY (plus top/left when measured) is unchanged since the
  // previous check, so a smooth scroll or layout transition that is still in flight never counts as landed.
  async function pollInPage(measure, arg, description, attempts = 50, intervalMs = defaultIntervalMs) {
    let last
    let previous
    for (let attempt = 1; attempt <= attempts; attempt++) {
      last = await page.evaluate(measure, arg)
      const positionStable =
        previous?.scrollY === last.scrollY &&
        (last.top === undefined || previous?.top === last.top) &&
        (last.left === undefined || previous?.left === last.left)
      if (last.ok && positionStable) return last
      previous = last
      await new Promise(resolveWait => setTimeout(resolveWait, intervalMs))
    }
    throw new Error(`${description}; not reached after ${attempts} checks ${intervalMs}ms apart, last measured ${JSON.stringify(last)}`)
  }

  async function clickTarget(selector, { scroll = true, tapOnMobile = false, maxAttempts = 3 } = {}) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      await page.waitForSelector(selector, { visible: true })
      if (scroll) {
        await page.$eval(selector, element => element.scrollIntoView({ block: 'center', behavior: 'instant' }))
      }
      const target = await pollInPage(
        measurePointerTarget,
        selector,
        `${selector}: pointer target must be visible, stable, and unobstructed`,
      )
      try {
        if (tapOnMobile && size.name.startsWith('mobile')) await page.tap(selector)
        else await page.click(selector)
        return target
      } catch (error) {
        if (attempt === maxAttempts || !CLICK_RETRY_PATTERN.test(error?.message || '')) {
          throw error
        }
      }
    }
  }

  return { pollInPage, clickTarget }
}
