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
  assert.match(overlay, /data-mobile-nav-autofocus/)
  assert.match(overlay, /useReducedMotion\(\)/)
  assert.match(overlay, /document\.body\.style\.overflow = 'hidden'/)
})
