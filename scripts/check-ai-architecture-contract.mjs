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
if (!sources.every((source) => typeof source.layer === 'string' && source.layer.length > 0)) {
  failures.push('every architecture must declare the plane it belongs to')
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
