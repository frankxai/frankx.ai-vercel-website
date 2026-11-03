/** Read-only receipt for a Vercel preview or production release. No publication. */
import assert from 'node:assert/strict'
const args = Object.fromEntries(process.argv.slice(2).reduce((rows, value, i, all) => {
  if (i % 2 === 0) rows.push([value.replace(/^--/, ''), all[i + 1]])
  return rows
}, []))
const base = new URL(args.url || 'https://www.frankx.ai')
assert.ok(base.protocol === 'https:' || (base.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(base.hostname)))
assert.ok(/^[a-z0-9-]+$/.test(args.slug || ''), 'Pass --slug <entry-slug>')
assert.ok(['draft', 'published'].includes(args.expect), 'Pass --expect draft|published')
const headers = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
  ? { 'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET } : {}
const results = await Promise.all(['/journal', '/journal/feed.xml', '/sitemap.xml', `/journal/${args.slug}`].map(async pathname => {
  const response = await fetch(new URL(pathname, base), { headers, signal: AbortSignal.timeout(30000) })
  return { pathname, status: response.status, text: await response.text() }
}))
const [index, feed, sitemap, entry] = results
for (const result of [index, feed, sitemap]) assert.equal(result.status, 200, `${result.pathname}: unexpected HTTP status`)
const target = `/journal/${args.slug}`
for (const result of [index, feed, sitemap]) assert.equal(result.text.includes(target), args.expect === 'published', `${result.pathname}: journal inclusion disagrees`)
if (args.expect === 'draft') assert.equal(entry.status, 404, 'Draft detail must be unavailable')
else {
  assert.equal(entry.status, 200)
  assert.ok(entry.text.includes(`https://www.frankx.ai${target}`), 'Missing canonical origin')
  assert.ok(entry.text.includes('BlogPosting'), 'Missing article metadata')
  assert.ok(!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(entry.text), 'Published entry is noindex')
}
if (args.deployment) assert.ok(index.text.includes(`data-dpl-id="${args.deployment}"`), 'Wrong Vercel deployment')
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), environment: base.origin, expected: args.expect, slug: args.slug, deployment: args.deployment || null, routes: results.map(({ pathname, status }) => ({ pathname, status })), verdict: 'pass' }, null, 2))
