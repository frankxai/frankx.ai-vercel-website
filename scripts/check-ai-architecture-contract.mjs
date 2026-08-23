import { access, readFile } from 'node:fs/promises'

const root = new URL('../', import.meta.url)
const sources = JSON.parse(await readFile(new URL('data/ai-architecture/official-sources.json', root), 'utf8'))
const home = await readFile(new URL('components/ai-architecture/OfficialArchitectureAtlas.tsx', root), 'utf8')
const blueprintIndex = await readFile(new URL('app/ai-architecture/blueprints/page.tsx', root), 'utf8')
const legacyShell = await readFile(new URL('components/ai-architecture/AIArchitectureShell.tsx', root), 'utf8')

await Promise.all([
  access(new URL('app/ai-architecture/page.tsx', root)),
  access(new URL('app/ai-architecture/[slug]/page.tsx', root)),
  access(new URL('app/ai-architecture/blueprints/page.tsx', root)),
])

const failures = []
if (sources.length < 8) failures.push('official source atlas contains fewer than eight architectures')
if (!sources.every((source) =>
  source.docsUrl &&
  source.source?.kind &&
  source.source?.label &&
  source.source?.url &&
  Array.isArray(source.flow) &&
  source.flow.length >= 4
)) {
  failures.push('every architecture must include docs, repository, and a four-stage flow')
}
// The catalog used to be keyed to three named vendors. It is now keyed to the
// execution shape a reference needs, which is the property that decides which
// platforms stay open to you; the vendor is an example of it. These checks keep
// the same guarantee -- the reader is always told where a thing can run -- on
// the axis that does not go stale when a vendor is added.
const RUNTIMES = ['Request-scoped', 'Durable runtime', 'Managed service', 'Either']
if (!sources.every((source) => RUNTIMES.includes(source.runtime))) {
  failures.push(`every architecture needs a runtime from: ${RUNTIMES.join(', ')}`)
}
// 'Either' is not coverage -- it is the absence of a constraint.
if (!['Request-scoped', 'Durable runtime', 'Managed service'].every((shape) =>
  sources.some((source) => source.runtime === shape)
)) {
  failures.push('catalog must cover all three real runtime shapes, not only "Either"')
}
// The atlas derives its filter buttons from these values, so a typo does not
// fail loudly -- it ships as a selectable plane with one architecture behind it.
// Membership, not truthiness, is what makes the declaration meaningful.
const PLANES = [
  'Experience',
  'Orchestration',
  'Runtime',
  'Intelligence',
  'Integration',
  'Reliability',
  'Operations',
]
const unknownPlanes = [...new Set(
  sources.map((source) => source.layer).filter((layer) => !PLANES.includes(layer)),
)]
if (unknownPlanes.length) {
  failures.push(`unknown plane(s): ${unknownPlanes.join(', ')} -- must be one of: ${PLANES.join(', ')}`)
}
// The atlas is meant to be a complete map, so every plane needs an architecture
// standing in it. A plane with no entry is a gap the reader cannot see.
const emptyPlanes = PLANES.filter((plane) => !sources.some((source) => source.layer === plane))
if (emptyPlanes.length) {
  failures.push(`plane(s) with no architecture: ${emptyPlanes.join(', ')}`)
}
// The page is meant to read as cross-platform. Naming only the three internal
// deployment targets is the regression this guards against.
const PLATFORMS = ['Vercel', 'Cloudflare', 'AWS', 'Google Cloud', 'Azure', 'Railway', 'Fly.io', 'Modal']
if (PLATFORMS.filter((name) => home.includes(name)).length < 6) {
  failures.push('atlas must present platforms broadly, not just the internal three')
}
if (!home.includes('Every external link in this catalog was checked')) failures.push('visible link-verification statement missing')
if (home.includes('Working repository')) failures.push('generic repository label remains')
if (blueprintIndex.includes('/blueprint/') || legacyShell.includes('/blueprint/')) failures.push('legacy broken /blueprint route remains')
if (!blueprintIndex.includes('/ai-architecture/${blueprint.slug}') || !legacyShell.includes('/ai-architecture/${blueprint.slug}')) {
  failures.push('canonical blueprint route is missing')
}

// The browser review (ReviewRunner) and the skill's Interview mode define the
// same four questions twice, by design — one is TSX, one is markdown a coding
// agent reads. Nothing structural ties them together, so this pins them:
// punctuation-insensitive matching, because curly and straight apostrophes
// differ between the two files on purpose.
const runner = await readFile(new URL('app/ai-architect/ReviewRunner.tsx', root), 'utf8')
const skill = await readFile(new URL('public/skills/ai-architect-review/SKILL.md', root), 'utf8')
const canon = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, '')
const runnerCanon = canon(runner)
const skillCanon = canon(skill)
const INTERVIEW_QUESTIONS = [
  "How many modules import a model provider's SDK?",
  "Where does the loop's exit condition live?",
  'Can you point to the line where retrieved text becomes labelled data?',
  "Do you know your longest production run and your platform's ceiling?",
]
for (const question of INTERVIEW_QUESTIONS) {
  const needle = canon(question)
  if (!runnerCanon.includes(needle)) failures.push(`review runner dropped an interview question: ${question}`)
  if (!skillCanon.includes(needle)) failures.push(`skill dropped an interview question: ${question}`)
}
if (!runner.includes("['trust', 'run', 'loop', 'model']")) {
  failures.push('review runner fix-first priority changed — update the skill Interview mode to match')
}
if (!skillCanon.includes(canon('trust boundary, then long-run home, then orchestration shape, then model seam'))) {
  failures.push('skill fix-first priority changed — update the review runner to match')
}
// The MADE/OPEN semantics are pinned by anchor phrases that appear in both the
// runner's options and the skill's Interview mode table. Changing what earns a
// verdict on either side means touching one of these, which fails here until
// the other side is updated to match.
const MAPPING_ANCHORS = [
  'exactly one', // model MADE
  'more than one', // model OPEN
  'counter, budget, or state machine', // loop MADE
  'in the prompt', // loop OPEN
  'side effects are gated', // trust MADE
  'not traced', // trust OPEN
  'ceiling is higher', // run MADE
  'close or lower', // run OPEN
]
for (const anchor of MAPPING_ANCHORS) {
  const needle = canon(anchor)
  if (!runnerCanon.includes(needle)) failures.push(`review runner verdict mapping changed — anchor missing: "${anchor}"`)
  if (!skillCanon.includes(needle)) failures.push(`skill verdict mapping changed — anchor missing: "${anchor}"`)
}

// The /ai-architect page renders the team from this file rather than restating
// it, so a truncated or re-shaped copy would silently ship a shorter roster and
// a shorter artifact contract with it. The ids are the plugin's eight agents.
const TEAM_AGENT_IDS = [
  'delivery-engineer',
  'discovery-analyst',
  'economics-analyst',
  'eval-engineer',
  'experience-designer',
  'independent-verifier',
  'principal-architect',
  'trust-reviewer',
]
const team = JSON.parse(await readFile(new URL('data/ai-architect/team.json', root), 'utf8'))
if (!Array.isArray(team.agents) || team.agents.length !== 8) {
  failures.push(`team roster must carry the plugin's eight agents, found ${team.agents?.length ?? 0}`)
} else {
  const ids = team.agents.map((agent) => agent.id).sort()
  const missing = TEAM_AGENT_IDS.filter((id) => !ids.includes(id))
  if (missing.length) failures.push(`team roster is missing agent(s): ${missing.join(', ')}`)
  const incomplete = team.agents.filter((agent) =>
    !agent.name ||
    !agent.purpose ||
    !agent.model ||
    !Array.isArray(agent.writes) ||
    agent.writes.length === 0 ||
    !Array.isArray(agent.stops_when) ||
    agent.stops_when.length === 0
  )
  if (incomplete.length) {
    failures.push(`team roster rows missing name, purpose, model, writes, or stop conditions: ${incomplete.map((agent) => agent.id).join(', ')}`)
  }
}

// The worked examples are rendered from content/ and downloaded from public/.
// The two copies drift silently: the page keeps rendering while every download
// link 404s. This asserts the download copy of the anchor file is present.
const EXAMPLE_SLUGS = ['support-triage', 'personal-ai-coe', 'contract-rag']
for (const slug of EXAMPLE_SLUGS) {
  for (const file of ['SYSTEM.md', 'review.md']) {
    try {
      await access(new URL(`public/artifacts/ai-architect/${slug}/${file}`, root))
    } catch {
      failures.push(`worked example download missing: public/artifacts/ai-architect/${slug}/${file}`)
    }
    try {
      await access(new URL(`content/ai-architect/examples/${slug}/${file}`, root))
    } catch {
      failures.push(`worked example source missing: content/ai-architect/examples/${slug}/${file}`)
    }
  }
}

// Every priced row in a shipped example names a vendor. That is the point: a
// price with no provider and no source URL is the "memory" the economics analyst
// refuses to accept. The vendor is therefore only allowed to appear alongside the
// evidence that makes it checkable, and this is what enforces the pairing.
for (const slug of EXAMPLE_SLUGS) {
  for (const base of ['content/ai-architect/examples', 'public/artifacts/ai-architect']) {
    const rel = `${base}/${slug}/prices.json`
    let prices
    try {
      prices = JSON.parse(await readFile(new URL(rel, root), 'utf8'))
    } catch {
      failures.push(`worked example price sheet missing or unparseable: ${rel}`)
      continue
    }
    if (!Array.isArray(prices.rows) || prices.rows.length === 0) {
      failures.push(`price sheet has no rows: ${rel}`)
      continue
    }
    const unsourced = prices.rows.filter((row) => !row.source_url || !row.retrieved_at)
    if (unsourced.length) {
      failures.push(`price rows without a source URL and retrieval date in ${rel}: ${unsourced.map((row) => row.item).join('; ')}`)
    }
  }
}

// The /ai-architect page states the stage count in four places -- a headline, an
// FAQ answer that also becomes JSON-LD, the install intro, and the roster heading.
// Hand-typed, they drift against each other and against the roster while every
// other gate stays green: the page shipped "nine gated stages" over an eight-agent
// roster. Every one of them must read the count from STAGE_COUNT_WORD, which is
// derived from the roster, so this bans the literal rather than blessing a number.
const hubPage = await readFile(new URL('app/ai-architect/page.tsx', root), 'utf8')
if (!hubPage.includes('const STAGE_COUNT_WORD =')) {
  failures.push('the /ai-architect page must derive its stage count from the roster (STAGE_COUNT_WORD)')
}
const literalStageCount = hubPage.match(
  /\b(one|two|three|four|five|six|seven|eight|nine|ten)[- ](?:gated )?stages?\b/gi,
)
if (literalStageCount) {
  failures.push(`/ai-architect page states a stage count as a literal instead of STAGE_COUNT_WORD: ${[...new Set(literalStageCount)].join(', ')}`)
}

if (failures.length) {
  console.error(JSON.stringify({ status: 'fail', failures }, null, 2))
  process.exit(1)
}

console.log(JSON.stringify({
  status: 'pass',
  architectures: sources.length,
  teamAgents: team.agents.length,
  planes: [...new Set(sources.map((source) => source.layer))],
  runtimeShapes: [...new Set(sources.map((source) => source.runtime))],
}, null, 2))
