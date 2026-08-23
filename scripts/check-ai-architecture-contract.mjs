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
// These are the seven planes the field guide, the blog post, the diagrams and
// the ai-architect-review skill all use. The atlas used to carry a second,
// different set of seven under the same word, so a reader picked a plane at the
// top of the page and then read a different plane vocabulary below it (#515).
// One vocabulary now, and this list is what keeps it that way.
const PLANES = [
  'Experience',
  'Observability',
  'Evaluation',
  'Orchestration',
  'Tool surface',
  'Context and retrieval',
  'Model access',
]
// A hardcoded list would only record today's answer. The field guide's own
// referenceStack is the source the page renders, so the list above is checked
// against it: rename a plane there and this fails until the atlas is remapped,
// which is the divergence #515 was.
const guideData = await readFile(new URL('components/ai-architecture/pillar/guide-data.ts', root), 'utf8')
const stackStart = guideData.indexOf('referenceStack')
const stackEnd = guideData.indexOf('\nexport ', stackStart + 'referenceStack'.length)
const stackSegment = guideData.slice(stackStart, stackEnd === -1 ? guideData.length : stackEnd)
const guidePlanes = [...stackSegment.matchAll(/^\s{4}name:\s*'([^']+)'/gm)].map((match) => match[1])
if (guidePlanes.length !== PLANES.length || guidePlanes.some((name, index) => name !== PLANES[index])) {
  failures.push(
    `plane vocabulary drifted from the field guide — guide has [${guidePlanes.join(', ')}], contract has [${PLANES.join(', ')}]`,
  )
}

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
// The skill is the third place the seven planes are written down, and it is the
// copy that travels into other people's repositories. If it drifts from the
// guide, a reader gets one vocabulary on the page and another in their agent.
// Read the plane-walk table specifically: a whole-document search passes on the
// frontmatter alone, which is a gate that cannot fail.
const skillPlanes = [...skill.matchAll(/^\|\s*\d{2}\s*\|\s*([^|]+?)\s*\|/gm)].map((match) => match[1])
if (skillPlanes.length !== PLANES.length || skillPlanes.some((name, index) => name !== PLANES[index])) {
  failures.push(
    `skill plane walk drifted — skill has [${skillPlanes.join(', ')}], field guide has [${PLANES.join(', ')}]`,
  )
}

for (const anchor of MAPPING_ANCHORS) {
  const needle = canon(anchor)
  if (!runnerCanon.includes(needle)) failures.push(`review runner verdict mapping changed — anchor missing: "${anchor}"`)
  if (!skillCanon.includes(needle)) failures.push(`skill verdict mapping changed — anchor missing: "${anchor}"`)
}

if (failures.length) {
  console.error(JSON.stringify({ status: 'fail', failures }, null, 2))
  process.exit(1)
}

console.log(JSON.stringify({
  status: 'pass',
  architectures: sources.length,
  planes: [...new Set(sources.map((source) => source.layer))],
  runtimeShapes: [...new Set(sources.map((source) => source.runtime))],
}, null, 2))
