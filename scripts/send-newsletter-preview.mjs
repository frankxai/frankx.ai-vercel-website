import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import dotenv from 'dotenv'

for (const file of ['.env.local', '.env', '.env.production.local']) {
  dotenv.config({ path: path.join(process.cwd(), file), override: false })
}

const recipient = process.argv[2] || 'friemerx@gmail.com'
const apiKey = process.env.RESEND_API_KEY
const from = process.env.NEWSLETTER_PREVIEW_FROM || 'Frank <frank@mail.frankx.ai>'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://frankx.ai'

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), rel), 'utf8'))
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function excerpt(content) {
  return content
    .replace(/^# .+$/gm, '')
    .replace(/[#>*_`-]/g, '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(' ')
    .slice(0, 360)
}

function inferOffer(issueNumber) {
  if (issueNumber <= 3) return 'Free newsletter'
  if (issueNumber === 4 || issueNumber === 5) return 'Inner Circle'
  if (issueNumber === 6) return 'Builder Lab Primer'
  if ([7, 8, 11].includes(issueNumber)) return 'Agentic Creator OS'
  if (issueNumber === 9) return 'Alliance / enterprise'
  return 'Builder Lab Primer'
}

const issuesDir = path.join(process.cwd(), 'content/newsletters/issues')
const issues = fs
  .readdirSync(issuesDir)
  .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
  .map((file) => {
    const raw = fs.readFileSync(path.join(issuesDir, file), 'utf8')
    const parsed = matter(raw)
    return {
      issue: parsed.data.issue,
      slug: parsed.data.slug,
      subject: parsed.data.subject,
      preview: parsed.data.preview,
      date: parsed.data.date,
      status: parsed.data.status || 'draft',
      theme: parsed.data.theme,
      spotlight: parsed.data.spotlight,
      offer: inferOffer(parsed.data.issue),
      excerpt: excerpt(parsed.content),
    }
  })
  .sort((a, b) => a.issue - b.issue)

const planned = readJson('data/newsletter-editions.json').editions
  .filter((edition) => !issues.some((issue) => issue.issue === edition.issue))
  .sort((a, b) => a.issue - b.issue)

const html = `<!doctype html>
<html>
  <body style="margin:0;background:#070b12;color:#e5edf8;font-family:Inter,Arial,sans-serif;">
    <div style="max-width:760px;margin:0 auto;padding:32px 20px;">
      <p style="margin:0 0 8px;color:#67e8f9;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">FrankX Newsletter Intelligence</p>
      <h1 style="margin:0;font-size:34px;line-height:1.1;letter-spacing:-0.02em;">All editions preview packet</h1>
      <p style="margin:14px 0 28px;color:#9ca3af;font-size:15px;line-height:1.65;">This is the internal review view: what exists, what each issue does for the reader, how it connects to the site, and what is planned next. Nothing here was broadcast to the list.</p>

      <div style="padding:18px;border:1px solid rgba(103,232,249,0.28);border-radius:14px;background:rgba(8,145,178,0.12);margin-bottom:22px;">
        <p style="margin:0;color:#cffafe;font-size:13px;line-height:1.6;"><strong>Operating rule:</strong> useful first, conversion second. Each edition should leave the reader with a sharper decision, a better workflow, or a reply worth sending.</p>
      </div>

      <h2 style="margin:0 0 12px;font-size:19px;">Tracked editions</h2>
      ${issues
        .map(
          (issue) => `
        <div style="padding:18px;border:1px solid rgba(255,255,255,0.12);border-radius:14px;background:rgba(255,255,255,0.035);margin:0 0 12px;">
          <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:8px;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">Issue ${issue.issue} · ${escapeHtml(issue.date)} · ${escapeHtml(issue.status)}</p>
            <p style="margin:0;color:#67e8f9;font-size:12px;">${escapeHtml(issue.offer)}</p>
          </div>
          <h3 style="margin:0 0 8px;font-size:20px;line-height:1.25;">${escapeHtml(issue.subject)}</h3>
          <p style="margin:0 0 10px;color:#cbd5e1;font-size:14px;line-height:1.6;">${escapeHtml(issue.preview)}</p>
          <p style="margin:0 0 10px;color:#94a3b8;font-size:13px;line-height:1.65;">${escapeHtml(issue.excerpt)}</p>
          <a href="${siteUrl}/newsletter/archive/${issue.slug}" style="color:#67e8f9;font-size:13px;text-decoration:none;">Open archive preview</a>
        </div>`
        )
        .join('')}

      <h2 style="margin:28px 0 12px;font-size:19px;">Planned calendar</h2>
      ${planned
        .map(
          (edition) => `
        <div style="padding:16px;border:1px solid rgba(255,255,255,0.1);border-radius:12px;background:rgba(255,255,255,0.025);margin:0 0 10px;">
          <p style="margin:0 0 6px;color:#9ca3af;font-size:12px;">Issue ${edition.issue} · ${escapeHtml(edition.plannedDate)} · ${escapeHtml(edition.pillar)} · ${escapeHtml(edition.streamId)}</p>
          <h3 style="margin:0 0 8px;font-size:17px;">${escapeHtml(edition.title)}</h3>
          <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.6;">Offer path: ${escapeHtml(edition.offerId)}. Draft next with a reader-useful artifact, simulation packet, and approval gate.</p>
        </div>`
        )
        .join('')}

      <p style="margin:28px 0 0;color:#64748b;font-size:12px;line-height:1.6;">Sent as a single-recipient admin preview to ${escapeHtml(recipient)}. Audience broadcast remains approval-gated.</p>
    </div>
  </body>
</html>`

const text = [
  'FrankX Newsletter Intelligence - all editions preview packet',
  '',
  ...issues.map((issue) => `Issue ${issue.issue}: ${issue.subject}\n${issue.preview}\nOffer path: ${issue.offer}\n${siteUrl}/newsletter/archive/${issue.slug}\n`),
  'Planned calendar:',
  ...planned.map((edition) => `Issue ${edition.issue}: ${edition.title} - ${edition.plannedDate} - ${edition.offerId}`),
].join('\n')

if (!apiKey) {
  console.error('RESEND_API_KEY is not configured. Preview email was not sent.')
  process.exit(1)
}

const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from,
    to: recipient,
    subject: 'FrankX Newsletter Intelligence: all editions preview',
    html,
    text,
  }),
})

const body = await response.text()

if (!response.ok) {
  console.error(body)
  process.exit(1)
}

console.log(body)
