import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

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
]

test('Ana review routes stay out of search until she approves them', async () => {
  const [friend, ally, cecilia, download, portal] = await Promise.all([
    readRepoFile(pageFiles[0]),
    readRepoFile(pageFiles[1]),
    readRepoFile(pageFiles[2]),
    readRepoFile(pageFiles[3]),
    readRepoFile('content/portal/ana.ts'),
  ])

  assert.match(friend, /noindex: true/)
  assert.match(ally, /noindex: true/)
  assert.match(cecilia, /noindex: true/)
  assert.match(download, /robots: \{ index: false, follow: true, nocache: true \}/)
  assert.match(portal, /noindex: true/)
})

test('the Ana surfaces form one connected review journey', async () => {
  const [friend, ally, cecilia, download, links] = await Promise.all([
    readRepoFile(pageFiles[0]),
    readRepoFile(pageFiles[1]),
    readRepoFile(pageFiles[2]),
    readRepoFile(pageFiles[3]),
    readRepoFile('data/ana-collaboration.ts'),
  ])

  assert.match(friend, /href="\/allies\/ana-cancino"/)
  assert.match(friend, /href="\/alliance\/cecilia"/)
  assert.match(ally, /href="\/portal\/ana"/)
  assert.match(ally, /href="\/friends\/ana"/)
  assert.match(ally, /href="\/alliance\/cecilia"/)
  assert.match(download, /href="\/portal\/ana"/)
  assert.match(cecilia, /href="\/allies\/ana-cancino"/)
  assert.match(links, /https:\/\/www\.anaceciliacancino\.com\//)
  assert.match(links, /https:\/\/www\.linkedin\.com\/in\/ana-cancino-\//)
  assert.match(links, /https:\/\/github\.com\/frankxai\/ana-ai-business-kit/)
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

  assert.match(page, /Current HR workflow · v\{currentVersion\}/)
  assert.match(page, /Earlier archive/)
  assert.match(page, /not the recommended HR Operations workflow/)
  assert.match(release, /version: '1\.0\.0'/)
  assert.match(release, /status: 'current'/)
  assert.match(release, /sourceRepo: 'https:\/\/github\.com\/frankxai\/ana-ai-business-kit'/)
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
  ]) {
    assert.doesNotMatch(combined, pattern)
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
