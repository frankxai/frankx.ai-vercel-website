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

  assert.match(navigation, /Public agentic workspace/)
  assert.match(navigation, /label: 'Workspace'/)
  assert.match(navigation, /Source → agents → Frank → artifact/)
  assert.match(navigation, /const desktopSections: NavKey\[\] = \['explore', 'build', 'learn', 'gencreators', 'music'\]/)
  assert.doesNotMatch(navigation, /router\.push/)

  assert.match(overlay, /Public agentic workspace/)
  assert.match(overlay, /Source material, specialist passes, Frank’s decision, public artifact/)
  assert.match(overlay, /How Frank and the agent team build in public/)
})

// PR #409 collapsed the nav to four doors and set the logo tagline in all-caps
// mono without being asked. Both are Frank's calls, so they are pinned here.
test('site chrome keeps Music as its own door and never sets the logo tagline in caps', async () => {
  const navigation = await readRepoFile('components/NavigationMega.tsx')
  const overlay = await readRepoFile('components/MobileNavOverlay.tsx')

  assert.match(navigation, /label: 'Music'/)
  assert.match(overlay, /key: 'music'/)

  for (const [name, source] of [
    ['NavigationMega', navigation],
    ['MobileNavOverlay', overlay],
  ]) {
    const taglineClasses = source.match(/className="([^"]*)"\s*>\s*\n?\s*Public agentic workspace/)?.[1] ?? ''
    assert.doesNotMatch(taglineClasses, /uppercase/, `${name} logo tagline must not be all-caps`)
    assert.match(taglineClasses, /font-serif/, `${name} logo tagline must use the serif`)
    // white/40 on #030712 computes to ~3.7:1 and fails WCAG 1.4.3 at this size.
    assert.match(taglineClasses, /text-white\/(?:5[0-9]|[6-9][0-9]|100)\b/, `${name} logo tagline needs >=white/50 for AA contrast`)
  }

  // The serif is the scarce premium accent, not a replacement tic. It stays out
  // of dense UI (menu columns, footer columns) per WEB_EXPERIENCE_STANDARD.
  const menuGroupHeading = navigation.match(/<h5 className="([^"]*)"/)?.[1] ?? ''
  assert.doesNotMatch(menuGroupHeading, /uppercase|font-serif/, 'menu group headings: no caps, no serif')
})

// All-caps is near-banned. The chrome renders on every page, so it is the one
// place the rule is absolute — a sitewide sweep of the remaining ~640 violations
// is tracked separately.
test('global chrome carries no all-caps at all', async () => {
  for (const path of [
    'components/NavigationMega.tsx',
    'components/MobileNavOverlay.tsx',
    'components/Footer.tsx',
    'components/CommandPalette.tsx',
  ]) {
    const source = await readRepoFile(path)
    const offenders = source.match(/className="[^"]*\buppercase\b[^"]*"/g) ?? []
    assert.deepEqual(offenders, [], `${path} must not use uppercase`)
  }
})

// A door this wide needs wayfinding on mobile too — a flat 20+ item list is 20+
// uninterrupted tab stops for keyboard and screen-reader users.
test('the widest mobile door renders grouped, not as one flat list', async () => {
  const overlay = await readRepoFile('components/MobileNavOverlay.tsx')

  assert.match(overlay, /groups\?: \{ label: string; items: string\[\] \}\[\]/)
  assert.match(overlay, /section\.groups \? \(/)
  for (const label of ['Current work', 'Systems & products', 'Worlds', 'Connect']) {
    assert.ok(overlay.includes(`label: '${label}'`), `mobile explore door needs the ${label} group`)
  }
})

// Routes #409 orphaned by dropping them from the menu. They all still exist, so
// unlinking them only made them unreachable.
test('the workspace door still reaches the routes #409 orphaned', async () => {
  const navigation = await readRepoFile('components/NavigationMega.tsx')

  for (const href of [
    '/intelligence-atlas',
    '/starlight-intelligence-system',
    '/acos',
    '/resources',
    '/downloads',
    '/vault',
    '/magic',
    '/bio',
    '/media-kit',
    '/licensing',
    '/contact',
  ]) {
    assert.ok(navigation.includes(`href: '${href}'`), `navigation must link ${href}`)
  }
})
