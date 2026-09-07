// Rebuild exact editorial figures: node docs/managed-ai-agents-2026/render-figures.mjs
// No generated text, invented vendor marks, external requests or runtime dependencies.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../../', import.meta.url))
const out = path.join(root, 'public/images/blog/managed-ai-agents')
const esc = (s) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')
const t = (x, y, s, size = 24, fill = '#c5cbd0', weight = 400) => `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-weight="${weight}">${esc(s)}</text>`
const line = (x1, y1, x2, y2, color = '#30383b', extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" ${extra}/>`
const rect = (x, y, w, h, color = '#141a1d', r = 20) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${color}"/>`
function brand(name, x, y, w = 44, h = 44) {
  // The official Blossom includes generous artboard whitespace. Preserve the
  // asset and scale the complete artboard to match the other visible marks.
  if (name === 'openai') { x -= w * 0.45; y -= h * 0.45; w *= 1.9; h *= 1.9 }
  const ext = name === 'hermes' ? 'png' : 'svg'
  const file = path.join(out, 'brands', `${name}.${ext}`)
  if (!existsSync(file)) throw new Error(`Missing official asset: ${file}`)
  const mime = ext === 'svg' ? 'image/svg+xml' : 'image/png'
  return `<image x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" href="data:${mime};base64,${readFileSync(file).toString('base64')}"/>`
}
function doc(title, desc, height, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M 0 1 L 9 5 L 0 9" fill="none" stroke="#72d9bd" stroke-width="1.5"/></marker></defs><rect width="1200" height="${height}" rx="28" fill="#0a0a0b"/><g font-family="Inter, Arial, sans-serif">${body}</g></svg>\n`
}
function header(kicker, title, subtitle) {
  return t(60, 58, kicker, 20, '#72d9bd', 500) + t(60, 122, title, 48, '#f2f5f3', 600) + t(60, 164, subtitle, 23)
}

let map = header('FrankX · Founder architecture · September 2026', 'Choose the layer before the logo', 'The practical difference is the work you still operate.')
map += t(60, 224, 'Layer / job', 19, '#a4b0b5') + t(378, 224, 'Candidates', 19, '#a4b0b5') + t(862, 224, 'Your responsibility', 19, '#a4b0b5')
const rows = [
  { y: 252, no: '01', name: 'Team workspace', job: 'People direct and review', own: ['Access, instructions', 'and artifact review'], content: brand('claude', 382, 278) + t(444, 309, 'Claude', 25, '#f2f5f3', 500) + brand('openai', 618, 278) + t(680, 309, 'ChatGPT', 25, '#f2f5f3', 500) + t(382, 370, 'Hyperagent', 27, '#f2f5f3', 500) },
  { y: 420, no: '02', name: 'Product runtime', job: 'Your app requests work', own: ['Identity, job contracts', 'and outcome checks'], content: brand('claude', 382, 447) + t(444, 476, 'Managed Agents', 23, '#f2f5f3', 500) + brand('openai', 382, 506, 36, 36) + t(435, 534, 'Responses + SDK', 21, '#f2f5f3', 500) + brand('vercel', 681, 510, 30, 30) + t(725, 534, 'eve β', 21, '#f2f5f3', 500) },
  { y: 588, no: '03', name: 'Workflow engine', job: 'Known steps and routing', own: ['Process logic, retries', 'and model integration'], content: brand('n8n', 382, 630, 130, 52) + t(548, 665, 'Cloud or self-hosted', 24, '#f2f5f3', 500) },
  { y: 756, no: '04', name: 'Persistent assistant', job: 'Your runtime and memory', own: ['Updates, persistence', 'and connected tools'], content: brand('openclaw', 382, 779) + t(442, 810, 'OpenClaw', 24, '#f2f5f3', 500) + brand('hermes', 618, 779) + t(678, 810, 'Hermes', 24, '#f2f5f3', 500) + brand('railway', 382, 842, 30, 30) + t(430, 867, 'Hosting example: Railway', 21) },
]
for (const row of rows) {
  map += line(60, row.y, 1140, row.y) + t(60, row.y + 40, row.no, 20, '#72d9bd', 500) + t(60, row.y + 81, row.name, 27, '#f2f5f3', 500) + t(60, row.y + 119, row.job, 21)
  map += row.content + t(862, row.y + 71, row.own[0], 21) + t(862, row.y + 104, row.own[1], 21)
}
map += line(60, 925, 1140, 925) + t(60, 968, 'Editorial classification · Official marks identify products; no ranking or affiliation implied.', 19)
writeFileSync(path.join(out, 'platform-map.svg'), doc('Managed agent platform map', 'Four operating layers with official product marks and the responsibilities retained by the founder. Read the accompanying HTML table for the full comparison.', 1000, map))

const economics = { jobs: 1000, accepted: 900, modelPerJob: 0.2, runtimeHoursPerJob: 0.5, runtimeHourly: 0.08, otherInfrastructure: 50, reviewMinutesPerJob: 2, reviewHourly: 60 }
const model = economics.jobs * economics.modelPerJob
const runtime = economics.jobs * economics.runtimeHoursPerJob * economics.runtimeHourly
const review = economics.jobs * economics.reviewMinutesPerJob / 60 * economics.reviewHourly
const technical = model + runtime + economics.otherInfrastructure
const total = technical + review
const dollars = (n) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 2 })
let cost = header('FrankX · Unit economics · Illustrative assumptions', 'What does finished work cost?', '1,000 jobs attempted. 900 accepted. Review time valued at $60/hour.')
const values = [{ label: 'Model', value: model, color: '#10b981', note: '1,000 jobs × $0.20' }, { label: 'Runtime', value: runtime, color: '#06b6d4', note: '500 running hours × $0.08' }, { label: 'Other infrastructure', value: economics.otherInfrastructure, color: '#658da2', note: 'Authored monthly allowance' }, { label: 'Human review', value: review, color: '#d0d9d6', note: '2 minutes per job × $60/hour' }]
let x = 60
for (const item of values) { const w = item.value / total * 1080; cost += rect(x, 210, w, 38, item.color, 0); x += w }
cost += t(60, 287, 'Share of economic cost; bar widths follow the stated amounts.', 20)
values.forEach((item, i) => {
  const y = 343 + i * 66
  cost += rect(60, y - 17, 13, 13, item.color, 3) + t(90, y, item.label, 23, '#f2f5f3', 500) + t(432, y, item.note, 22) + t(982, y, dollars(item.value), 27, '#f2f5f3', 500) + line(60, y + 22, 1140, y + 22)
})
cost += rect(60, 602, 1080, 150, '#10251f', 22) + t(88, 644, 'Economic total / accepted outcomes', 22, '#b8d8cb') + t(88, 706, `${dollars(total)} / ${economics.accepted}`, 43, '#f2f5f3', 600) + t(680, 700, dollars(total / economics.accepted), 62, '#72d9bd', 600) + t(878, 700, 'per accepted job', 23, '#f2f5f3')
cost += t(60, 795, `Technical subtotal: ${dollars(technical)}. Add tools, retries and incidents when present. No vendor benchmark.`, 20)
writeFileSync(path.join(out, 'outcome-economics.svg'), doc('Cost per accepted outcome', 'Illustrative arithmetic, not measured performance. Model $200; runtime $40; infrastructure $50; review $2,000. Total $2,290 divided by 900 accepted jobs equals $2.54 after rounding.', 840, cost))

let flow = header('FrankX · Production reference pattern', 'Make every job recoverable', 'One execution owner. Bounded work. Reviewable delivery.')
const nodes = [
  ['01', 'Versioned job contract', 'Inputs · acceptance rule · budget · scoped identity'],
  ['02', 'One execution owner', 'Job status · timeout · bounded retries'],
  ['03', 'Bounded agent worker', 'Tools · model · isolated workspace'],
  ['04', 'Policy or human review', 'Draft + evidence → accept or request revision'],
  ['05', 'Authorized executor', 'Validated action · idempotency key'],
  ['06', 'Delivery receipt', 'Artifact · destination · cost · acceptance result'],
]
const ys = [205, 351, 497, 643, 789, 935]
nodes.forEach((n, i) => {
  const y = ys[i]
  flow += rect(88, y, 734, 104, i === 3 ? '#102b22' : '#141a1d') + t(112, y + 42, n[0], 20, '#72d9bd', 500) + t(164, y + 41, n[1], 29, '#f2f5f3', 500) + t(164, y + 79, n[2], 21)
  if (i < nodes.length - 1) flow += line(455, y + 105, 455, ys[i + 1] - 6, '#72d9bd', 'marker-end="url(#arrow)"')
  flow += line(824, y + 52, 930, y + 52, '#456358', 'stroke-dasharray="5 6"')
})
flow += rect(930, 205, 210, 834, '#11201c') + t(955, 252, 'Durable', 25, '#f2f5f3', 500) + t(955, 286, 'job record', 25, '#f2f5f3', 500)
;['Tenant + job ID', 'State changes', 'Sources', 'Trace + costs', 'Review result', 'Delivery key'].forEach((s, i) => { flow += t(955, 394 + i * 78, s, 21) })
flow += '<path d="M 88 695 H 42 V 549 H 82" fill="none" stroke="#72d9bd" stroke-width="2" marker-end="url(#arrow)"/>'
flow += t(58, 1084, 'Revision uses the same job ID and retry ceiling. Every transition updates the durable record.', 21)
writeFileSync(path.join(out, 'production-contract.svg'), doc('Recoverable agent production workflow', 'A versioned contract enters an execution owner and bounded worker, then review, authorized execution and delivery. Revisions return to the worker within a retry budget. A durable job record records transitions.', 1120, flow))
writeFileSync(path.join(root, 'docs/managed-ai-agents-2026/economics.json'), JSON.stringify({ assumptions: economics, computed: { model, runtime, review, technical, total, costPerAccepted: total / economics.accepted }, status: 'Illustration, not a benchmark' }, null, 2) + '\n')

const assetSources = {
  'claude.svg': 'https://claude.ai/favicon.svg',
  'openai.svg': 'https://cdn.openai.com/brand/openai-logos.zip#OpenAI-logos/SVGs/OAI_OpenAI-Blossom_White.svg',
  'vercel.svg': 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-white.svg',
  'n8n.svg': 'https://n8n.io/brandguidelines/logo-white.svg',
  'railway.svg': 'https://railway.com/brand/logo-light.svg',
  'openclaw.svg': 'https://openclaw.ai/favicon.svg',
  'hermes.png': 'https://hermes-agent.nousresearch.com/icon.png',
}
writeFileSync(path.join(root, 'docs/managed-ai-agents-2026/brand-assets.json'), JSON.stringify({ retrieved: '2026-09-07', purpose: 'Subordinate editorial identification. No affiliation or endorsement. Vendor assets remain unchanged and retain their respective rights. No general trademark license asserted.', assets: Object.entries(assetSources).map(([file, source]) => ({ file: `public/images/blog/managed-ai-agents/brands/${file}`, source, sha256: createHash('sha256').update(readFileSync(path.join(out, 'brands', file))).digest('hex') })) }, null, 2) + '\n')
console.log('Rendered platform map, economics and production contract; wrote asset provenance and arithmetic.')
