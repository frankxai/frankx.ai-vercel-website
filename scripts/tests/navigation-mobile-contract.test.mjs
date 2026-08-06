import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const readRepoFile = (path) => readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

test('the global mobile menu renders a real overlay at every non-desktop breakpoint', async () => {
  const navigation = await readRepoFile('components/NavigationMega.tsx')
  const overlay = await readRepoFile('components/MobileNavOverlay.tsx')

  assert.match(navigation, /import MobileNavOverlay from '@\/components\/MobileNavOverlay'/)
  assert.match(navigation, /<MobileNavOverlay isOpen=\{isOpen\}/)
  assert.match(navigation, /aria-controls="mobile-site-navigation"/)
  assert.doesNotMatch(navigation, /Mobile nav overlay removed/)
  assert.doesNotMatch(navigation, /import MobileNavOverlay.*\/\//)

  assert.match(overlay, /id="mobile-site-navigation"/)
  assert.match(overlay, /className="fixed inset-0[^\n]+lg:hidden"/)
  assert.doesNotMatch(overlay, /text-white md:hidden/)
  assert.match(overlay, /role="dialog"/)
  assert.match(overlay, /aria-modal="true"/)
})

test('the mobile menu contains focus, restores focus, and respects motion preferences', async () => {
  const overlay = await readRepoFile('components/MobileNavOverlay.tsx')

  assert.match(overlay, /previousFocus/)
  assert.match(overlay, /previousFocus\?\.focus\(\)/)
  assert.match(overlay, /e\.key === 'Tab'/)
  assert.match(overlay, /e\.key === 'Escape'/)
  assert.match(overlay, /data-mobile-nav-view="home"/)
  assert.match(overlay, /data-mobile-nav-view="section"/)
  assert.doesNotMatch(overlay, /offsetParent/)
  assert.match(overlay, /data-mobile-nav-autofocus/)
  assert.match(overlay, /useReducedMotion\(\)/)
  assert.match(overlay, /document\.body\.style\.overflow = 'hidden'/)
})

test('desktop and mobile navigation expose the workspace authorship model', async () => {
  const navigation = await readRepoFile('components/NavigationMega.tsx')
  const overlay = await readRepoFile('components/MobileNavOverlay.tsx')

  // The "Public agentic workspace" micro-caps under the wordmark are gone —
  // 8px uppercase mono at 60% opacity, in both the desktop nav and the mobile
  // overlay. The authorship model is still asserted below, by the parts that
  // carry it at a legible size. A tagline is not the contract; the Workspace
  // section and the source→artifact line are.
  assert.doesNotMatch(navigation, /Public agentic workspace/)
  assert.doesNotMatch(navigation, /text-\[8px\]/)
  assert.match(navigation, /label: 'Workspace'/)
  assert.match(navigation, /Source → agents → Frank → artifact/)
  assert.match(navigation, /const desktopSections: NavKey\[\] = \['explore', 'build', 'learn', 'gencreators'\]/)
  assert.doesNotMatch(navigation, /router\.push/)

  assert.doesNotMatch(overlay, /Public agentic workspace/)
  assert.doesNotMatch(overlay, /text-\[8px\]/)
  assert.match(overlay, /Source material, specialist passes, Frank’s decision, public artifact/)
  assert.match(overlay, /How Frank and the agent team build in public/)
})
