#!/usr/bin/env node
/**
 * Renders an issue MDX file to the email HTML + plaintext that actually ships.
 *
 * The old scripts/send-newsletter.ts hardcoded its content inline, so nothing
 * the drafting workflow produced could ever be sent. This reads the same file
 * the site archive reads — one source of truth per issue.
 *
 * Usage: node scripts/newsletter/render.mjs <issueNumber>
 * Output: content/newsletters/rendered/issue-N.{html,txt}
 */

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { marked } from 'marked'
import { getIssue, RENDER_DIR, DISCLOSURE, IDENTITY, colophon } from './lib.mjs'

const SITE = 'https://frankx.ai'

// Email clients drop <link> webfonts; Georgia carries the serif register that
// Playfair sets on the site.
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
const INK = '#17171a'
const MUTED = '#5b5b66'
const RULE = '#e4e1db'
const PAPER = '#faf9f7'
const ACCENT = '#0e7490'

// CAN-SPAM and the EU equivalents require a real postal identity in every
// commercial email. City + country is the minimum that is actually true today;
// set NEWSLETTER_POSTAL to the full registered address once the BV filing lands.
const POSTAL = process.env.NEWSLETTER_POSTAL || 'FrankX &middot; Amsterdam, Netherlands'

/** YAML parses unquoted dates into Date objects — normalise before display. */
function formatDate(value) {
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return String(value)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
}

function absolutize(html) {
  return html.replace(/href="\/([^"]*)"/g, `href="${SITE}/$1"`)
}

/**
 * MDX bodies occasionally carry JSX islands the email can't render.
 *
 * The obvious regex (`/^<[A-Z][\s\S]*?\/>$/gm`) is a content shredder: `[\s\S]*?`
 * crosses newlines, so a `<Callout>` block followed later by any `<Thing />`
 * deletes every paragraph in between — silently, because validate.mjs reads the
 * raw markdown and render.mjs reads the stripped copy, and nothing compared them.
 * Match line-locally instead, and report what was dropped.
 */
function stripJsx(md) {
  const dropped = []
  const out = md
    .replace(/^import .*$/gm, () => { dropped.push('import'); return '' })
    // Self-closing island on its own line: <Thing ... />
    .replace(/^[ \t]*<[A-Z][^\n>]*\/>[ \t]*$/gm, (m) => { dropped.push(m.trim().slice(0, 40)); return '' })
    // Paired block island, tags kept on their own lines — inner text is preserved.
    .replace(/^[ \t]*<\/?[A-Z][^\n>]*>[ \t]*$/gm, (m) => { dropped.push(m.trim().slice(0, 40)); return '' })
  return { md: out, dropped }
}

/**
 * The email and the archive must contain the same words. Compares visible text
 * before and after JSX stripping so a shredded body fails loudly instead of
 * sending short.
 */
function assertNoContentLoss(original, stripped, tolerance = 0.05) {
  const words = (s) => s.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
  const before = words(original)
  const after = words(stripped)
  const lost = before === 0 ? 0 : (before - after) / before
  if (lost > tolerance) {
    throw new Error(
      `render dropped ${Math.round(lost * 100)}% of the body (${before} → ${after} words). ` +
      `Refusing to produce a truncated email. Check MDX components in the issue.`
    )
  }
  return { before, after }
}

const escapeHtml = (s) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

function bodyToHtml(md) {
  const { md: clean } = stripJsx(md)
  assertNoContentLoss(md, clean)
  const html = marked.parse(clean, { mangle: false, headerIds: false })
  return absolutize(html)
    .replace(/<h4>/g, `<h4 style="font-family:${SANS};font-size:15px;font-weight:600;color:${INK};margin:24px 0 6px;">`)
    .replace(/<ul>/g, `<ul style="font-family:${SANS};margin:0 0 18px;padding-left:22px;">`)
    .replace(/<ol>/g, `<ol style="font-family:${SANS};margin:0 0 18px;padding-left:22px;">`)
    .replace(/<pre>/g, `<pre style="font-family:Consolas,Monaco,monospace;font-size:13px;line-height:1.5;background:#f4f2ee;border:1px solid ${RULE};border-radius:3px;padding:14px;margin:0 0 18px;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;">`)
    .replace(/<code>/g, `<code style="font-family:Consolas,Monaco,monospace;font-size:13px;background:#f4f2ee;padding:1px 4px;border-radius:2px;">`)
    .replace(/<img /g, `<img style="max-width:100%;height:auto;display:block;margin:0 0 18px;" `)
    .replace(/<table>/g, `<table role="presentation" width="100%" style="border-collapse:collapse;font-family:${SANS};font-size:14px;margin:0 0 18px;">`)
    .replace(/<(th|td)>/g, (_, t) => `<${t} style="border:1px solid ${RULE};padding:8px 10px;text-align:left;color:${INK};">`)
    .replace(/<strong>/g, `<strong style="font-weight:600;color:${INK};">`)
    .replace(/<h2>/g, `<h2 style="font-family:${SERIF};font-size:24px;line-height:1.3;font-weight:600;color:${INK};margin:40px 0 12px;">`)
    .replace(/<h3>/g, `<h3 style="font-family:${SANS};font-size:16px;font-weight:600;color:${INK};margin:28px 0 8px;">`)
    .replace(/<h1>/g, `<h1 style="font-family:${SERIF};font-size:30px;line-height:1.25;font-weight:600;color:${INK};margin:0 0 20px;">`)
    .replace(/<p>/g, `<p style="font-family:${SANS};font-size:16px;line-height:1.65;color:${INK};margin:0 0 18px;">`)
    .replace(/<li>/g, `<li style="font-family:${SANS};font-size:16px;line-height:1.65;color:${INK};margin:0 0 8px;">`)
    .replace(/<a /g, `<a style="color:${ACCENT};text-decoration:underline;" `)
    .replace(/<hr>/g, `<hr style="border:0;border-top:1px solid ${RULE};margin:36px 0;">`)
    .replace(/<blockquote>/g, `<blockquote style="margin:24px 0;padding:2px 0 2px 18px;border-left:2px solid ${ACCENT};color:${MUTED};font-style:italic;">`)
}

function bodyToText(md) {
  const { md: clean } = stripJsx(md)
  assertNoContentLoss(md, clean)
  return clean
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => `${t} (${u.startsWith('/') ? SITE + u : u})`)
    .replace(/^---$/gm, '—')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export function renderIssue(n) {
  const issue = getIssue(n)
  if (!issue) throw new Error(`issue ${n} not found`)
  const { data, content } = issue
  const archiveUrl = `${SITE}/newsletter/archive/${data.slug}`

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">
<meta name="x-apple-disable-message-reformatting">
<title>${escapeHtml(data.subject)}</title></head>
<body style="margin:0;padding:0;background:${PAPER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(data.preview)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};padding:32px 16px;">
<tr><td align="center">
<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="width:600px;max-width:100%;background:#ffffff;border:1px solid ${RULE};border-radius:4px;">
<tr><td style="padding:36px 40px 0;">
  <div style="font-family:${SANS};font-size:11px;letter-spacing:0.08em;color:${MUTED};text-transform:uppercase;">
    FrankX &middot; Issue ${data.issue} &middot; ${formatDate(data.date)}
  </div>
  <div style="font-family:${SERIF};font-size:29px;line-height:1.25;color:${INK};margin:14px 0 6px;">${escapeHtml(data.subject)}</div>
  <div style="font-family:${SANS};font-size:15px;line-height:1.6;color:${MUTED};margin:0 0 4px;">${escapeHtml(data.theme)}</div>
  <hr style="border:0;border-top:1px solid ${RULE};margin:28px 0 0;">
</td></tr>
<tr><td style="padding:12px 40px 8px;">
${bodyToHtml(content)}
</td></tr>
<tr><td style="padding:8px 40px 36px;">
  <hr style="border:0;border-top:1px solid ${RULE};margin:8px 0 24px;">
  <p style="font-family:${SANS};font-size:14px;line-height:1.6;color:${MUTED};margin:0 0 6px;">
    &mdash; Frank
  </p>
  <p style="font-family:${SANS};font-size:12px;line-height:1.6;color:${MUTED};margin:0 0 10px;">
    ${colophon({ signals: data.signals, issue: data.issue })}
  </p>
  <p style="font-family:${SANS};font-size:12px;line-height:1.6;color:${MUTED};margin:0 0 18px;">
    ${DISCLOSURE} Reply to this email and Frank reads it.
  </p>
  <p style="font-family:${SANS};font-size:12px;line-height:1.6;color:${MUTED};margin:0;">
    <a href="${archiveUrl}" style="color:${MUTED};">Read in browser</a> &middot;
    <a href="${SITE}/newsletter/preferences" style="color:${MUTED};">Preferences</a> &middot;
    <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:${MUTED};">Unsubscribe</a>
  </p>
  <p style="font-family:${SANS};font-size:12px;line-height:1.6;color:${MUTED};margin:10px 0 0;">
    ${POSTAL} &middot; <a href="${SITE}/legal/imprint" style="color:${MUTED};">Imprint</a>
  </p>
</td></tr>
</table>
</td></tr></table>
</body></html>`

  const text = `FrankX · Issue ${data.issue} · ${formatDate(data.date)}
${data.subject}
${data.theme}

${'-'.repeat(60)}

${bodyToText(content)}

${'-'.repeat(60)}

— Frank

${colophon({ signals: data.signals, issue: data.issue })}

${DISCLOSURE} Reply to this email and Frank reads it.

Read in browser: ${archiveUrl}
Preferences: ${SITE}/newsletter/preferences
Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}

${POSTAL.replace(/&middot;/g, "·")} · ${SITE}/legal/imprint
`

  fs.mkdirSync(RENDER_DIR, { recursive: true })
  const htmlPath = path.join(RENDER_DIR, `issue-${data.issue}.html`)
  const textPath = path.join(RENDER_DIR, `issue-${data.issue}.txt`)
  fs.writeFileSync(htmlPath, html, 'utf8')
  fs.writeFileSync(textPath, text, 'utf8')

  return { issue: data, html, text, htmlPath, textPath, from: IDENTITY.from }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const n = process.argv[2]
  if (!n) {
    console.error('Usage: node scripts/newsletter/render.mjs <issueNumber>')
    process.exit(1)
  }
  const out = renderIssue(n)
  console.log(`Rendered issue ${out.issue.issue} — "${out.issue.subject}"`)
  console.log(`  from: ${out.from}`)
  console.log(`  html: ${out.htmlPath}`)
  console.log(`  text: ${out.textPath}`)
}
