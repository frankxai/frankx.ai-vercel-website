#!/usr/bin/env node
// Run with Node 22 and type stripping enabled. Optional input: --traffic=/absolute/path/to/traffic.json.

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resolveProgramDestination } from '../lib/affiliates/resolve-destination.ts'
import { isCanonicalBlogSlug } from '../lib/blog-redirects.mjs'
import { programToRecord, sponsorDecision, toolSlug } from '../lib/tools/record.ts'

const root = fileURLToPath(new URL('..', import.meta.url))
const canonicalOrigin = 'https://www.frankx.ai'
const siteHosts = new Set(['frankx.ai', 'www.frankx.ai'])

function normalizePage(value) {
  if (typeof value !== 'string' || !/^(?:\/|https:\/\/)/.test(value)) return null
  try {
    const url = new URL(value, canonicalOrigin)
    if (!siteHosts.has(url.hostname)) return null
    return url.pathname.replace(/\/$/, '') || '/'
  } catch {
    return null
  }
}

function auditedProse(source) {
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (frontmatter && /^(?:draft|noindex):\s*true\s*(?:#.*)?$/m.test(frontmatter[1])) return null
  const body = frontmatter ? source.slice(frontmatter[0].length) : source
  return body
    .replace(/\r\n/g, '\n')
    .replace(/^[ \t]{0,3}([~]{3,}|[\x60]{3,})[^\n]*\n[\s\S]*?(?:^[ \t]{0,3}\1[ \t]*$|(?![\s\S]))/gm, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/{\/\*[\s\S]*?\*\/}/g, '')
    .replace(/([\x60]+)[^\n]*?\1/g, '')
}

function escapeAlias(alias) {
  return alias.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
}

export function inspectArticle(source, programs, now = new Date()) {
  const prose = auditedProse(source)
  if (prose === null) return null

  const targets = new Set(Array.from(
    prose.matchAll(/(?<!!)\[[^\]\n]*\]\(\s*<?([^\s)>]+)>?|(?:href|url)\s*=\s*["']([^"']+)["']/g),
    ([, markdown, jsx]) => markdown ?? jsx,
  ))
  const componentIds = Array.from(
    prose.matchAll(/<(?:ArticleRecommendation|AffiliateCTA|AffiliateLink)\b[^>]*?\baffiliateId\s*=\s*["']([^"']+)["']/gs),
    ([, id]) => id,
  )
  const localTargets = new Set([...targets].map(normalizePage).filter(Boolean))
  const placements = []
  const opportunities = []
  const enrollmentCandidates = []

  for (const program of programs) {
    if (!program.hasProgram) continue
    const decision = sponsorDecision(programToRecord(program), now)
    const aliases = [program.tool, ...(program.aliases ?? [])]
    // A component is a placement when it resolves to this program at all, not only while sponsorship is current: an
    // expired hop program still renders a local /go/ link from its component, so the audit must flag it for review
    // rather than hide the placement that needs renewed verification.
    const component = componentIds.some(id => {
      if (!aliases.some(alias => alias.toLowerCase() === id.toLowerCase())) return false
      return resolveProgramDestination(id, [program], undefined, now) !== undefined
    })
    const hop = localTargets.has('/go/' + toolSlug(program.tool))
    const issued = Boolean(program.ourLink && targets.has(program.ourLink))
    const forms = [hop && 'hop', issued && 'issued URL', component && 'component'].filter(Boolean)
    if (forms.length) {
      const state = decision.sponsored ? 'eligible' : 'review destination'
      placements.push({ tool: program.tool, forms, state })
      continue
    }
    const mentioned = aliases.some(alias => new RegExp(
      '(?<![\\p{L}\\p{N}_])' + escapeAlias(alias) + '(?![\\p{L}\\p{N}_])',
      'iu',
    ).test(prose))
    if (!mentioned) continue
    if (decision.sponsored) opportunities.push(program.tool)
    else if (program.status === 'active' && !program.ourLink) enrollmentCandidates.push(program.tool)
  }
  return { placements, opportunities, enrollmentCandidates }
}

function readTraffic(path, explicit) {
  if (!existsSync(path)) {
    if (explicit) throw new Error('Traffic file could not be found: ' + path)
    return { byPath: new Map(), source: 'No traffic file supplied', metric: 'Visitors' }
  }
  const data = JSON.parse(readFileSync(path, 'utf8'))
  if (!Array.isArray(data.pages)) throw new Error('Traffic file must contain a pages array')
  const metric = data.metric ?? 'visitors'
  if (!['visitors', 'pageviews', 'clicks'].includes(metric)) {
    throw new Error('Traffic metric must be visitors, pageviews or clicks')
  }
  const byPath = new Map()
  for (const page of data.pages) {
    const path = normalizePage(page.path)
    const value = page[metric]
    if (path && typeof value === 'number' && Number.isFinite(value) && value >= 0) {
      if (byPath.has(path)) throw new Error('Duplicate traffic path: ' + path)
      byPath.set(path, value)
    }
  }
  const window = data.window?.since && data.window?.until
    ? ' (' + data.window.since + ' to ' + data.window.until + ')'
    : ''
  return {
    byPath,
    source: (data.source ?? 'Traffic file, provider unspecified') + window,
    metric: metric[0].toUpperCase() + metric.slice(1),
  }
}

function collectArticles(programs, byPath, now) {
  return ['blog', 'guides'].flatMap(section => {
    const dir = join(root, 'content', section)
    return readdirSync(dir).sort().flatMap(file => {
      if (!file.endsWith('.mdx')) return []
      const slug = file.slice(0, -4)
      if (section === 'blog' && !isCanonicalBlogSlug(slug)) return []
      const evidence = inspectArticle(readFileSync(join(dir, file), 'utf8'), programs, now)
      if (!evidence) return []
      const path = '/' + section + '/' + slug
      return [{ path, traffic: byPath.get(path) ?? null, ...evidence }]
    })
  }).sort((a, b) => (b.traffic ?? -1) - (a.traffic ?? -1) || a.path.localeCompare(b.path))
}

function tableRows(rows, getValues) {
  return rows.map(row => '| ' + getValues(row).join(' | ') + ' |').join('\n') || '| — | — | — |'
}

function main(args) {
  const explicitTraffic = args.find(arg => arg.startsWith('--traffic='))?.slice('--traffic='.length)
  const trafficFile = explicitTraffic ?? join(root, 'docs', 'ops', 'analytics', 'traffic-latest.json')
  const { byPath, metric, source } = readTraffic(trafficFile, Boolean(explicitTraffic))
  const { programs } = JSON.parse(readFileSync(join(root, 'data', 'affiliate', 'programs.json'), 'utf8'))
  const now = new Date()
  const rows = collectArticles(programs, byPath, now)
  const displayTraffic = row => row.traffic ?? '—'
  const placementRows = tableRows(rows.filter(row => row.placements.length), row => [
    row.path, displayTraffic(row), row.placements.map(placement =>
      placement.tool + ' (' + placement.forms.join(', ') + '; ' + placement.state + ')',
    ).join(', '),
  ])
  const opportunityRows = tableRows(rows.filter(row => row.opportunities.length), row => [
    row.path, displayTraffic(row), row.opportunities.join(', '),
  ])
  const enrollmentRows = tableRows(rows.filter(row => row.enrollmentCandidates.length), row => [
    row.path, displayTraffic(row), row.enrollmentCandidates.join(', '),
  ])

  const report = [
    '# Affiliate placement audit', '',
    'Checked ' + now.toISOString().slice(0, 10) + ' against the local blog and guide sources.', '',
    'Traffic source — ' + source + '. A dash means traffic was unavailable for the route.', '',
    'Source placements require a rendered-page check for the disclosure and link attributes. ' +
      'Program eligibility depends on the catalog evidence and its review date.', '',
    '## Existing placements', '', '| Page | ' + metric + ' | Tool and placement |', '| --- | ---: | --- |', placementRows, '',
    '## Mentions of eligible programs without a recognized placement', '',
    '| Page | ' + metric + ' | Check editorial fit |', '| --- | ---: | --- |', opportunityRows, '',
    '## Mentions of programs without a recorded issued link', '',
    '| Page | ' + metric + ' | Check enrollment |', '| --- | ---: | --- |', enrollmentRows, '',
  ].join('\n')
  console.log(report)
  if (args.includes('--write')) {
    const out = join(root, 'docs', 'ops', 'affiliate', 'AUDIT.md')
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, report)
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main(process.argv.slice(2))
