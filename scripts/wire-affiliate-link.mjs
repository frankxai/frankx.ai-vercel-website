#!/usr/bin/env node
// One-off: insert an affiliate link on the FIRST body-prose mention of a tool in each given post.
// Guards: skips frontmatter, heading lines (#), lines that already contain a markdown link to the tool,
// and mentions already inside a [..](..) link. Links exactly once per file. Idempotent.
//
// Usage: node scripts/wire-affiliate-link.mjs "<tool>" "<url>" slug1 slug2 ...

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const [tool, url, ...slugs] = process.argv.slice(2)
if (!tool || !url || !slugs.length) {
  console.error('usage: node scripts/wire-affiliate-link.mjs "<tool>" "<url>" slug...')
  process.exit(1)
}
const BLOG = join(process.cwd(), 'content', 'blog')
const rx = new RegExp(`(^|[^[\\w])(${tool})(?![\\w\\]])`) // standalone, not already [linked

for (const slug of slugs) {
  const f = join(BLOG, `${slug}.mdx`)
  if (!existsSync(f)) { console.log(`MISS ${slug}`); continue }
  let raw = readFileSync(f, 'utf8')
  if (raw.includes(`](${url})`)) { console.log(`SKIP ${slug} (already linked)`); continue }

  const lines = raw.split('\n')
  let inFm = false, fmDone = false, done = false
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i]
    if (ln.trim() === '---') { if (!fmDone) { inFm = !inFm; if (!inFm) fmDone = true; } continue }
    if (inFm || !fmDone) continue
    if (ln.startsWith('#')) continue          // skip headings
    if (ln.includes('](')) continue           // skip lines that already have a link (avoid nesting)
    if (!rx.test(ln)) continue
    lines[i] = ln.replace(rx, (m, pre, name) => `${pre}[${name}](${url})`)
    done = true
    break
  }
  if (done) { writeFileSync(f, lines.join('\n')); console.log(`WIRED ${slug}`) }
  else console.log(`no-anchor ${slug}`)
}
