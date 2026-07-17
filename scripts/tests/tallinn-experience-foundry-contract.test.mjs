import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { extname, join } from 'node:path'
import test from 'node:test'

const root = process.cwd()
const read = (path) => readFileSync(join(root, path), 'utf8')

const registry = read('data/tallinn-studio.ts')
const studio = read('components/tallinn-experience/TallinnStudioPage.tsx')
const amplifier = read('components/tallinn-experience/SessionAmplifier.tsx')
const form = read('components/tallinn-experience/TallinnInterestForm.tsx')
const formatPage = read('components/tallinn-experience/TallinnFormatPage.tsx')
const missingFormat = read('app/experiences/tallinn-2026/[slug]/not-found.tsx')
const trackedGlowButton = read('components/analytics/TrackedGlowButton.tsx')
const canonicalRoute = read('app/experiences/tallinn-2026/page.tsx')
const shortAliasRoute = read('app/experiences/mvu-tallinn-2026/page.tsx')
const longAliasRoute = read('app/experiences/mindvalley-university-tallinn-2026/page.tsx')
const formatRoute = read('app/experiences/tallinn-2026/[slug]/page.tsx')
const workshopRegistry = read('data/workshops.ts')
const workshopsPage = read('app/workshops/page.tsx')
const workshopDetail = read('app/workshops/[slug]/page.tsx')
const workshopClient = read('app/workshops/[slug]/WorkshopClient.tsx')
const glowCard = read('components/ui/glow-card.tsx')
const nextConfig = read('next.config.mjs')
const worksheet = read('app/experiences/tallinn-2026/purpose-to-practice/map/page.tsx')
const tailwindConfig = read('tailwind.config.js')

function sourceFiles(path) {
  const absolute = join(root, path)
  if (!existsSync(absolute)) return []
  return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const child = join(path, entry.name)
    if (entry.isDirectory()) return sourceFiles(child)
    return ['.ts', '.tsx', '.md', '.json'].includes(extname(entry.name)) ? [child] : []
  })
}

test('public studio has five audience roles, four outcomes, and four canonical formats', () => {
  const roles = [...registry.matchAll(/^    id: '(speaker|coach|tribe-host|venue|attendee)',/gm)]
  const outcomes = [...registry.matchAll(/^    id: '(sharper-room|participant-artifact|useful-follow-through|new-workshop)',/gm)]
  const formats = [...registry.matchAll(/^    slug: '(purpose-to-practice|speaker-session-amplifier|agentic-builder-lab|ai-music-creation-lab)',/gm)]

  assert.equal(roles.length, 5)
  assert.equal(outcomes.length, 4)
  assert.equal(formats.length, 4)
  assert.match(registry, /Proven foundation/)
  assert.match(registry, /Studio format/)
})

test('canonical page and both requested aliases render the same public studio', () => {
  assert.match(canonicalRoute, /<TallinnStudioPage/)
  assert.match(shortAliasRoute, /<TallinnStudioPage/)
  assert.match(longAliasRoute, /<TallinnStudioPage/)
  assert.match(shortAliasRoute, /canonical: 'https:\/\/frankx\.ai\/experiences\/tallinn-2026'/)
  assert.match(longAliasRoute, /canonical: 'https:\/\/frankx\.ai\/experiences\/tallinn-2026'/)
  assert.match(shortAliasRoute, /noindex: true/)
  assert.match(longAliasRoute, /noindex: true/)
  assert.doesNotMatch(canonicalRoute, /noindex/)
})

test('public experience copy keeps the official event boundary explicit', () => {
  assert.match(studio, /Make the room travel farther/)
  assert.match(registry, /Not organized, sponsored, or endorsed by Mindvalley/)
  assert.match(studio, /Official Mindvalley U 2026 artwork/)
  assert.match(studio, /Official Mindvalley U Tallinn 2024 community image/)
  assert.match(registry, /https:\/\/www\.mindvalley\.com\/u/)
  assert.match(nextConfig, /hostname: 'a\.storyblok\.com'/)
})

test('session amplifier creates an immediate before, in-room, and after plan', () => {
  assert.match(amplifier, /Before the room/)
  assert.match(amplifier, /Inside the room/)
  assert.match(amplifier, /After the room/)
  assert.match(amplifier, /aria-live="polite"/)
  assert.match(amplifier, /Core artifact/)
  assert.match(amplifier, /role=\$\{role\}&outcome=\$\{outcome\}/)
  assert.match(studio, /key={`amplifier:\$\{planKey\}`}/)
  assert.match(studio, /key={`interest:\$\{planKey\}`}/)
  assert.match(amplifier, /tallinn_amplifier_role_selected/)
  assert.match(amplifier, /tallinn_amplifier_outcome_selected/)
  assert.match(amplifier, /tallinn_amplifier_plan_selected/)
})

test('interest form uses the consent-based unified intake pipeline', () => {
  assert.match(form, /fetch\('\/api\/intake'/)
  assert.match(form, /intent: 'workshop'/)
  assert.match(form, /name="consent"/)
  assert.match(form, /No newsletter or unrelated marketing/)
  assert.match(form, /<Link\s+href="\/privacy"/)
  assert.match(form, /Tribe, project, or venue/)
  assert.match(form, /Interest only\. No ticket, payment, or venue promise/)
  assert.match(form, /new AbortController\(\)/)
  assert.match(form, /controller\.abort\(\), 15_000/)
  assert.match(form, /signal: controller\.signal/)
  assert.match(form, /Tallinn Session Studio interest/)
  assert.doesNotMatch(form, /Tallinn Tribe Studio/)
  assert.doesNotMatch(form, /captureEnabled|TALLINN_CAPTURE_MODE|TALLINN_PRIVACY_NOTICE_APPROVED/)
})

test('public conversion paths are measurable and accurately labeled', () => {
  assert.match(trackedGlowButton, /trackEvent\(eventName, eventProperties\)/)
  assert.match(studio, /tallinn_studio_cta_clicked/)
  assert.match(formatPage, /tallinn_format_cta_clicked/)
  assert.match(workshopsPage, /workshop_studio_cta_clicked/)
  assert.match(missingFormat, /tallinn_studio_recovery_clicked/)
  assert.match(registry, /sourceLabel: 'Explore the workshop studio'/)
  assert.match(formatPage, /\{format\.sourceLabel\}/)
  assert.doesNotMatch(formatPage, /See the source work/)
})

test('public Tallinn source tree contains no collaborator, stay, budget, or internal demand details', () => {
  const files = [
    ...sourceFiles('app/experiences/tallinn-2026'),
    ...sourceFiles('app/experiences/mvu-tallinn-2026'),
    ...sourceFiles('app/experiences/mindvalley-university-tallinn-2026'),
    ...sourceFiles('components/tallinn-experience'),
    'data/tallinn-studio.ts',
  ]
  const publicSource = files.map((path) => `${path}\n${read(path)}`).join('\n')

  for (const forbidden of [
    /\bAna\b/i,
    /Tallink/i,
    /roomOnlyCapEur/i,
    /minimumConfirmed/i,
    /decisionWindow/i,
    /TALLINN_TIME_WINDOWS/i,
    /budget cap/i,
    /staying there/i,
    /€\s*250/,
  ]) {
    assert.doesNotMatch(publicSource, forbidden)
  }
})

test('obsolete public planning and dedicated Tallinn capture files are removed', () => {
  for (const path of [
    'data/tallinn-experiences.ts',
    'components/tallinn-experience/TallinnFoundryPage.tsx',
    'components/tallinn-experience/TallinnOfferPage.tsx',
    'app/api/tallinn-interest/route.ts',
    'lib/email-templates-tallinn.ts',
    'docs/specs/tallinn-experience-operations-2026-07-14.md',
    'docs/specs/tallinn-purpose-to-practice-facilitator-pack-2026-07-14.md',
  ]) {
    assert.equal(existsSync(join(root, path)), false, `${path} should not remain public`)
  }
})

test('workshop catalog separates delivered work from studio architectures', () => {
  assert.match(workshopsPage, /Delivered by Frank/)
  assert.match(workshopsPage, /Personally developed \+ delivered/)
  assert.match(workshopsPage, /Delivered, studio-assisted/)
  assert.match(workshopsPage, /Studio drafts/)
  assert.match(workshopRegistry, /slug: 'ikigai-branding',[\s\S]*provenance: 'delivered-personal'/)
  assert.match(workshopRegistry, /slug: 'build-first-ai-agent',[\s\S]*provenance: 'delivered-studio-assisted'/)
  assert.match(workshopDetail, /workshop\.provenance/)
  assert.match(workshopClient, /workshop\.provenance === 'studio-draft'/)
  assert.match(workshopsPage, /Workshop registry requires one personally delivered workshop/)
  assert.doesNotMatch(workshopDetail, /EventScheduled|CourseJsonLd|EventJsonLd/)
  assert.match(workshopDetail, /Workshop Studio/)
})

test('Tallinn surfaces use shared void, surface, and aurora tokens', () => {
  const publicSurfaces = [studio, amplifier, form, formatPage, workshopsPage].join('\n')

  assert.match(tailwindConfig, /'tallinn-aurora'/)
  assert.match(tailwindConfig, /'workshop-aurora'/)
  assert.match(tailwindConfig, /'studio-continuation'/)
  assert.match(publicSurfaces, /bg-void/)
  assert.match(publicSurfaces, /surface-2/)
  assert.doesNotMatch(publicSurfaces, /bg-\[#0|ring-offset-\[#0|bg-\[radial-gradient/)
})

test('format routes preserve legacy URLs through safe public aliases', () => {
  assert.match(registry, /TALLINN_LEGACY_FORMAT_ALIASES/)
  assert.match(formatRoute, /generateStaticParams/)
  assert.match(formatRoute, /TALLINN_PUBLIC_ROUTE_SLUGS/)
  assert.match(formatRoute, /canonical: `https:\/\/frankx\.ai\/experiences\/tallinn-2026\/\$\{format\.slug\}`/)
})

test('motion-sensitive glow behavior and print isolation remain safe', () => {
  assert.match(glowCard, /useReducedMotion/)
  assert.match(glowCard, /shouldReduceMotion \? undefined/)
  assert.match(glowCard, /motion-reduce:transition-none/)
  assert.doesNotMatch(glowCard, /as any|as unknown as/)
  assert.match(worksheet, /body \* \{ visibility: hidden; \}/)
  assert.match(worksheet, /#tallinn-worksheet, #tallinn-worksheet \* \{ visibility: visible; \}/)
  assert.doesNotMatch(worksheet, /body > \*:not\(#main\)/)
})
