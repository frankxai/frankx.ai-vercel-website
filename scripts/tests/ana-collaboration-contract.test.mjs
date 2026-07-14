import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import { enumerateRoutes } from '../../lib/route-enumeration.mjs'

const readRepoFile = (path) =>
  readFile(new URL(`../../${path}`, import.meta.url), 'utf8')

const pageFiles = [
  'app/friends/ana/page.tsx',
  'app/allies/ana-cancino/page.tsx',
  'app/alliance/cecilia/page.tsx',
  'app/downloads/ana-ai-business-kit/page.tsx',
]

const visualFiles = [
  ...pageFiles,
  'components/ana/AnaProposalResponse.tsx',
  'components/ana/AnaTeamWorkflow.tsx',
  'components/ai-architecture/OfficialArchitectureAtlas.tsx',
]

test('Ana review routes stay out of search until she approves them', async () => {
  const [friend, ally, cecilia, download, portal, publicAllies, publicFriends, sitemap] = await Promise.all([
    readRepoFile(pageFiles[0]),
    readRepoFile(pageFiles[1]),
    readRepoFile(pageFiles[2]),
    readRepoFile(pageFiles[3]),
    readRepoFile('content/portal/ana.ts'),
    readRepoFile('app/allies/page.tsx'),
    readRepoFile('app/friends/page.tsx'),
    readRepoFile('app/sitemap.ts'),
  ])

  assert.match(friend, /noindex: true/)
  assert.match(ally, /noindex: true/)
  assert.match(cecilia, /noindex: true/)
  assert.match(download, /noindex: true/)
  assert.match(portal, /noindex: true/)
  assert.match(portal, /status: 'draft'/)
  assert.doesNotMatch(publicAllies, /Ana Team Operating Plan|\/allies\/ana-cancino/)
  assert.doesNotMatch(publicFriends, /Ana Cecilia Cancino|\/friends\/ana/)

  const routes = enumerateRoutes()
  for (const href of [
    '/friends/ana',
    '/allies/ana-cancino',
    '/alliance/cecilia',
    '/downloads/ana-ai-business-kit',
    '/experiences/tallinn-2026',
    '/experiences/tallinn-2026/purpose-to-practice',
  ]) {
    const route = routes.find((candidate) => candidate.href === href)
    assert.ok(route, `${href} must remain a valid route`)
    assert.equal(route.sitemap, false, `${href} must stay out of the public sitemap`)
  }
  assert.match(sitemap, /if \(route\.sitemap === false\) continue/)
})

test('the Ana surfaces form one connected review journey', async () => {
  const [friend, ally, cecilia, download, links, socialLinks] = await Promise.all([
    readRepoFile(pageFiles[0]),
    readRepoFile(pageFiles[1]),
    readRepoFile(pageFiles[2]),
    readRepoFile(pageFiles[3]),
    readRepoFile('data/ana-collaboration.ts'),
    readRepoFile('lib/social-links.ts'),
  ])

  for (const [key, path] of [
    ['friendPage', '/friends/ana'],
    ['teamPlan', '/allies/ana-cancino'],
    ['privateWorkspace', '/portal/ana'],
    ['kitDownload', '/downloads/ana-ai-business-kit'],
    ['tallinnFoundry', '/experiences/tallinn-2026'],
    ['ceciliaRoom', '/alliance/cecilia'],
    ['architectureAtlas', '/ai-architecture'],
  ]) {
    assert.ok(links.includes(`${key}: '${path}'`), `${key} must own ${path}`)
  }
  assert.match(friend, /href: anaLinks\.teamPlan/)
  assert.match(friend, /href: anaLinks\.tallinnFoundry/)
  assert.match(friend, /href=\{anaLinks\.ceciliaRoom\}/)
  assert.match(ally, /href=\{anaLinks\.privateWorkspace\}/)
  assert.match(ally, /href=\{anaLinks\.friendPage\}/)
  assert.match(download, /href=\{anaLinks\.privateWorkspace\}/)
  assert.match(cecilia, /href=\{anaLinks\.teamPlan\}/)
  assert.match(links, /https:\/\/www\.anaceciliacancino\.com\//)
  assert.match(links, /ALLY_SOCIAL_LINKS\.anaCancino\.linkedin/)
  assert.match(socialLinks, /https:\/\/www\.linkedin\.com\/in\/ana-cancino-\//)
  assert.match(links, /https:\/\/github\.com\/frankxai\/ana-ai-business-kit/)
  assert.match(links, /START-HERE-TEAM\.md/)
  assert.match(links, /docs\/WHO-READS-WHAT\.md/)
})

test('the workflow explorer and proposal choices expose complete keyboard semantics', async () => {
  const [workflow, response] = await Promise.all([
    readRepoFile('components/ana/AnaTeamWorkflow.tsx'),
    readRepoFile('components/ana/AnaProposalResponse.tsx'),
  ])

  assert.match(workflow, /role="tablist"/)
  assert.match(workflow, /role="tab"/)
  assert.match(workflow, /role="tabpanel"/)
  assert.match(workflow, /aria-selected=\{active\}/)
  assert.match(workflow, /event\.key === 'ArrowRight'/)
  assert.match(workflow, /event\.key === 'Home'/)
  assert.doesNotMatch(workflow, /<nav aria-label="Ana HR workflow stages"/)
  assert.match(response, /peer-focus-visible:ring-2/)
  assert.match(response, /peer-focus-visible:ring-offset-2/)
})

test('Ana and Tallinn contracts are wired into both merge gates', async () => {
  const packageJson = await readRepoFile('package.json')
  assert.match(packageJson, /"test:ana-release"/)
  assert.match(packageJson, /"merge:gate": "npm run test:homepage-release && npm run test:ana-release/)
  assert.match(packageJson, /"merge:gate:ci": "npm run test:homepage-release && npm run test:ana-release/)
})

test('the workflow preserves Ana HR Operations sequence and human accountability', async () => {
  const workflow = await readRepoFile('data/ana-collaboration.ts')
  const expectedStages = [
    ['board', '00'],
    ['first-call', '01'],
    ['kickoff', '02'],
    ['job-description', '03'],
    ['offer', '04'],
    ['recruiting', '05'],
    ['invoice', '06'],
    ['handoff', '07'],
  ]

  let cursor = -1
  for (const [id, number] of expectedStages) {
    const stageIndex = workflow.indexOf(`id: '${id}'`, cursor + 1)
    assert.ok(stageIndex > cursor, `${id} must retain its place in the workflow`)
    assert.match(workflow.slice(stageIndex, stageIndex + 120), new RegExp(`number: '${number}'`))
    cursor = stageIndex
  }

  assert.match(workflow, /Humans remain accountable for shortlist, interview, and hiring decisions/)
  assert.match(workflow, /Ana separately approves price and wording/)
  assert.match(workflow, /Ana approves the invoice facts and final amount/)
  assert.match(workflow, /sending remains a separate human action/)
})

test('proposal responses reuse the governed intake route without creating a new send path', async () => {
  const form = await readRepoFile('components/ana/AnaProposalResponse.tsx')

  assert.match(form, /fetch\('\/api\/intake'/)
  assert.match(form, /intent: 'partnership'/)
  assert.match(form, /consent: data\.get\('consent'\) === 'on'/)
  assert.match(form, /website: String\(data\.get\('website'\)/)
  assert.match(form, /source: window\.location\.pathname/)
  assert.match(form, /not purchase, launch, data-processing, identity, or publication approval/)
  assert.doesNotMatch(form, /Resend|sendMail|notifyAdmin|SLACK_WEBHOOK|NOTION_API/i)
})

test('the download endpoint points to the maintained kit and labels the old ZIP as legacy', async () => {
  const [page, release] = await Promise.all([
    readRepoFile('app/downloads/ana-ai-business-kit/page.tsx'),
    readRepoFile('app/downloads/ana-ai-business-kit/latest.json/route.ts'),
  ])

  assert.match(page, /Current working flow · v\{currentVersion\}/)
  assert.match(page, /Earlier archive/)
  assert.match(page, /Keep it as an archive; use the current workflow/)
  assert.match(release, /version: '1\.1\.0'/)
  assert.match(release, /status: 'current'/)
  assert.match(release, /sourceRepo: 'https:\/\/github\.com\/frankxai\/ana-ai-business-kit'/)
  assert.match(release, /teamStartGuide:/)
  assert.match(release, /START-HERE-TEAM\.md/)
  assert.match(release, /readingMap:/)
  assert.match(release, /docs\/WHO-READS-WHAT\.md/)
  assert.match(release, /legacyArchive:/)
  assert.match(release, /recommended: false/)
})

test('Ana-facing copy excludes obsolete product language and internal shorthand', async () => {
  const sources = await Promise.all([
    ...pageFiles.map(readRepoFile),
    readRepoFile('components/ana/AnaTeamWorkflow.tsx'),
    readRepoFile('data/ana-collaboration.ts'),
    readRepoFile('content/portal/ana.ts'),
    readRepoFile('app/downloads/ana-ai-business-kit/latest.json/route.ts'),
  ])
  const combined = sources.join('\n')

  for (const pattern of [
    /Freedom Engine/i,
    /agent pack/i,
    /\bACOS\b/i,
    /passive income/i,
    /public-safe/i,
    /synthetic/i,
    /system of record/i,
    /autonomous recruiter/i,
    /four-person/i,
    /team of four/i,
    /three colleagues/i,
    /do not need to become developers/i,
    /difficult to teach/i,
    /made teachable/i,
    /without relying on Ana.?s memory/i,
    /bounded learning loop/i,
    /team proves the workflow/i,
    /named agent briefs/i,
    /AI Center of Excellence/i,
    /what should Frank/i,
    /Tell Frank/i,
    /before Frank builds/i,
  ]) {
    assert.doesNotMatch(combined, pattern)
  }

  for (const source of sources.slice(0, 4)) {
    assert.doesNotMatch(source, /\buppercase\b/, 'ordinary Ana-facing copy must not be forced to all caps')
  }
})

test('custom opacity values use Tailwind 3 arbitrary-value syntax', async () => {
  const allowedBareOpacity = new Set([
    0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100,
  ])
  const sources = await Promise.all(visualFiles.map(readRepoFile))

  for (const [index, source] of sources.entries()) {
    for (const match of source.matchAll(/\/(\d{1,3})(?![\d\]])/g)) {
      const value = Number(match[1])
      assert.ok(
        allowedBareOpacity.has(value),
        `${visualFiles[index]} contains unsupported bare opacity /${value}`,
      )
    }
    assert.doesNotMatch(source, /\bh-4\.5\b|\bw-4\.5\b/)
  }
})
