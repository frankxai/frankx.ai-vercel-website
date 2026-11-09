#!/usr/bin/env node
// Submit changed frankx.ai URLs to IndexNow (Bing, Copilot, ChatGPT search, Yandex, Seznam, Naver).
// Dry run unless --send. Before sending it confirms the live key file serves the key, because
// a 403 from IndexNow says nothing about which side is wrong.
//
//   node scripts/search/indexnow.mjs --changed-since origin/main~20        # content files changed in git
//   node scripts/search/indexnow.mjs --since 2026-11-01                    # sitemap entries with newer lastmod
//   node scripts/search/indexnow.mjs --urls https://www.frankx.ai/blog/x   # explicit list (comma separated)
//   node scripts/search/indexnow.mjs --all --send                          # whole sitemap, actually submit
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { parseArgs } from 'node:util'
import {
  INDEXNOW_ENDPOINT, INDEXNOW_MAX_URLS, SITE_ORIGIN,
  chunk, contentPathToUrl, filterOwnHost, findIndexNowKey, parseSitemap,
} from './search-plane.mjs'

const { values: opt } = parseArgs({
  options: {
    'changed-since': { type: 'string' },
    since: { type: 'string' },
    urls: { type: 'string' },
    all: { type: 'boolean', default: false },
    send: { type: 'boolean', default: false },
    origin: { type: 'string', default: SITE_ORIGIN },
    receipts: { type: 'string', default: join(homedir(), '.starlight', 'search-ops', 'indexnow') },
  },
})

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'frankx-search-plane/1.0' } })
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`)
  return res.text()
}

async function sitemapEntries(origin) {
  const root = parseSitemap(await fetchText(`${origin}/sitemap.xml`))
  if (!root.isIndex) return root.entries
  const nested = await Promise.all(root.entries.map(async (e) => parseSitemap(await fetchText(e.loc)).entries))
  return nested.flat()
}

function changedContentUrls(ref, origin) {
  const out = execFileSync('git', ['diff', '--name-only', '--diff-filter=AM', `${ref}...HEAD`], { encoding: 'utf8' })
  return out.split('\n').map((p) => contentPathToUrl(p.trim(), origin)).filter(Boolean)
}

async function collectUrls() {
  if (opt.urls) return opt.urls.split(',').map((u) => u.trim())
  if (opt['changed-since']) return changedContentUrls(opt['changed-since'], opt.origin)
  if (opt.since || opt.all) {
    const entries = await sitemapEntries(opt.origin)
    return entries.filter((e) => opt.all || (e.lastmod && e.lastmod.slice(0, 10) >= opt.since)).map((e) => e.loc)
  }
  throw new Error('pick one of --urls, --changed-since <ref>, --since <YYYY-MM-DD>, --all')
}

async function main() {
  const key = process.env.INDEXNOW_KEY || findIndexNowKey('public')
  if (!key) throw new Error('no IndexNow key: set INDEXNOW_KEY or add public/<32-hex>.txt containing the key')
  const urls = filterOwnHost(await collectUrls(), opt.origin)
  const host = new URL(opt.origin).host
  console.log(`${urls.length} URL(s) for ${host}`)
  urls.slice(0, 20).forEach((u) => console.log(`  ${u}`))
  if (urls.length > 20) console.log(`  ... ${urls.length - 20} more`)
  if (!opt.send) return console.log('dry run: add --send to submit')
  if (urls.length === 0) return console.log('nothing to submit')

  const keyLocation = `${opt.origin}/${key}.txt`
  const served = (await fetchText(keyLocation)).trim()
  if (served !== key) throw new Error(`${keyLocation} does not serve the key; deploy it before submitting`)

  const results = []
  for (const batch of chunk(urls, INDEXNOW_MAX_URLS)) {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key, keyLocation, urlList: batch }),
    })
    results.push({ status: res.status, count: batch.length, body: (await res.text()).slice(0, 500) })
    console.log(`IndexNow ${res.status} for ${batch.length} URL(s)`)
    if (res.status === 429) break
  }

  mkdirSync(opt.receipts, { recursive: true })
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const receipt = join(opt.receipts, `indexnow-${stamp}.json`)
  writeFileSync(receipt, JSON.stringify({ at: new Date().toISOString(), host, endpoint: INDEXNOW_ENDPOINT, urls, results }, null, 2))
  console.log(`receipt: ${receipt}`)
  if (results.some((r) => r.status >= 400)) process.exitCode = 1
}

main().catch((err) => {
  console.error(`indexnow: ${err.message}`)
  process.exitCode = 1
})
