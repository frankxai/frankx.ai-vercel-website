/**
 * FrankX 2026 Newsletter Templates
 *
 * Composes existing helpers from lib/email-design-system.ts into a unified
 * issue layout: mascot header → intro → sections → pull quote → CTA → signoff.
 *
 * One base template, six thin per-stream variants that override accent color
 * and opening flourish. Mascot mood is selected per-issue from frontmatter.
 */
import {
  ctaButton,
  divider,
  emailWrapper,
  glassCard,
  highlightBox,
  mascotImage,
  resourceCard,
  sectionLabel,
  signatureBlock,
  tokens as T,
} from '@/lib/email-design-system'
import streamsJson from '@/data/newsletter-streams.json'
import type { Block, CompiledIssue, MascotMood, StreamId } from '@/lib/newsletter/types'

interface StreamMeta {
  id: string
  name: string
  tagline: string
  accentHex: string
  borderHex: string
  bgHex: string
  voice: string
  color: string
}

const STREAMS: Record<string, StreamMeta> = (streamsJson.streams as StreamMeta[]).reduce(
  (acc, s) => ({ ...acc, [s.id]: s }),
  {},
)

const DEFAULT_MOOD: Record<StreamId, MascotMood> = {
  'creation-chronicles': 'celebrating',
  'ai-architect': 'thinking',
  'music-lab': 'chill',
  arcanea: 'pointing',
  investor: 'pointing',
  'inner-circle': 'hero',
}

export function streamMeta(id: string): StreamMeta {
  const meta = STREAMS[id]
  if (!meta) throw new Error(`Unknown stream: ${id}`)
  return meta
}

export interface RenderArgs {
  issue: CompiledIssue
  utmCampaign?: string
  subjectVariant?: string
}

export function renderIssueEmail({ issue, utmCampaign }: RenderArgs): {
  subject: string
  html: string
  text: string
} {
  const fm = issue.frontmatter
  const meta = streamMeta(fm.stream)
  const mood = fm.mascotMood || DEFAULT_MOOD[fm.stream] || 'chibi'

  const blocks = issue.blocks
  const body = [
    streamHeader(meta, mood),
    ...blocks.map((b) => renderBlock(b, meta, utmCampaign)),
    streamFooter(meta),
  ].join('\n')

  const html = emailWrapper(
    glassCard(body, { accentColor: meta.accentHex, accentPosition: 'top', padding: '40px 32px' }),
    fm.preheader,
  )

  return {
    subject: fm.subject,
    html,
    text: renderPlainText(issue, meta),
  }
}

function streamHeader(meta: StreamMeta, mood: MascotMood): string {
  return `
    ${mascotImage(mood, 72, 'center')}
    <p style="font-family: ${T.monoStack}; font-size: 11px; font-weight: 700; color: ${meta.accentHex}; text-transform: uppercase; letter-spacing: 0.14em; margin: 0 0 8px 0; text-align: center;">
      ${meta.name}
    </p>
    <p style="font-family: ${T.fontStack}; font-size: 14px; color: ${T.textMuted}; margin: 0 0 28px 0; text-align: center; font-style: italic;">
      ${meta.tagline}
    </p>
    <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, ${meta.accentHex} 50%, transparent 100%); margin: 0 0 32px 0;"></div>
  `
}

function streamFooter(meta: StreamMeta): string {
  return `
    ${divider()}
    ${signatureBlock('Reply with what you’re building. I read every one.')}
  `
}

function renderBlock(block: Block, meta: StreamMeta, utmCampaign?: string): string {
  switch (block.type) {
    case 'intro':
      return `<p style="font-family: ${T.fontStack}; font-size: 17px; color: ${T.textPrimary}; line-height: 1.7; margin: 0 0 24px 0; letter-spacing: -0.005em;">${escapeInline(block.body || '')}</p>`
    case 'section':
      return renderSection(block, meta)
    case 'pullquote':
      return renderPullquote(block, meta)
    case 'list':
      return renderList(block.items || [], meta)
    case 'code':
      return renderCode(block.body || '', block.language || 'text')
    case 'cta':
      return ctaButton(
        block.label || 'Read more',
        appendUtm(block.href || '#', utmCampaign),
        'gradient',
        meta.accentHex,
      )
    case 'aside':
      return highlightBox('Aside', escapeInline(block.body || ''), meta.accentHex)
    case 'signoff':
      return `<p style="font-family: ${T.fontStack}; font-size: 15px; color: ${T.textSecondary}; line-height: 1.7; margin: 28px 0 8px 0; font-style: italic;">${escapeInline(block.body || '')}</p>`
    default:
      return ''
  }
}

function renderSection(block: Block, meta: StreamMeta): string {
  const heading = block.heading
    ? `<h2 style="font-family: ${T.fontStack}; font-size: 22px; font-weight: 700; color: ${T.textPrimary}; margin: 32px 0 14px 0; letter-spacing: -0.02em; line-height: 1.3;">${escapeInline(block.heading)}</h2>`
    : ''
  const body = block.body
    ? `<p style="font-family: ${T.fontStack}; font-size: 16px; color: ${T.textSecondary}; line-height: 1.7; margin: 0 0 16px 0;">${escapeInline(block.body).replace(/\n\n+/g, '</p><p style="font-family: ' + T.fontStack + '; font-size: 16px; color: ' + T.textSecondary + '; line-height: 1.7; margin: 0 0 16px 0;">')}</p>`
    : ''
  const items = block.items?.length ? renderList(block.items, meta) : ''
  return `${heading}${body}${items}`
}

function renderPullquote(block: Block, meta: StreamMeta): string {
  const author = block.author
    ? `<p style="font-family: ${T.fontStack}; font-size: 13px; color: ${T.textMuted}; margin: 12px 0 0 0; letter-spacing: 0.02em;">— ${escapeInline(block.author)}</p>`
    : ''
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
      <tr>
        <td style="padding: 24px 28px; border-left: 3px solid ${meta.accentHex}; background-color: ${T.bgCard};">
          <p style="font-family: Georgia, 'Cormorant Garamond', serif; font-size: 20px; font-style: italic; color: ${T.textPrimary}; margin: 0; line-height: 1.5; letter-spacing: -0.01em;">"${escapeInline(block.body || '')}"</p>
          ${author}
        </td>
      </tr>
    </table>
  `
}

function renderList(items: string[], meta: StreamMeta): string {
  const rows = items
    .map(
      (item) =>
        `<tr><td style="padding: 8px 0; font-family: ${T.fontStack}; font-size: 15px; color: ${T.textSecondary}; line-height: 1.65;"><span style="color: ${meta.accentHex}; font-weight: 700; margin-right: 10px;">›</span>${escapeInline(item)}</td></tr>`,
    )
    .join('')
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 12px 0 20px 0;">${rows}</table>`
}

function renderCode(body: string, _language: string): string {
  const escaped = body.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 16px 0;">
      <tr>
        <td style="padding: 18px 20px; background-color: #0b0b14; border: 1px solid ${T.borderGlass}; border-radius: ${T.radiusSmall};">
          <pre style="font-family: ${T.monoStack}; font-size: 13px; color: ${T.textSecondary}; margin: 0; line-height: 1.55; white-space: pre-wrap; word-wrap: break-word;">${escaped}</pre>
        </td>
      </tr>
    </table>`
}

function appendUtm(href: string, utmCampaign?: string): string {
  if (!utmCampaign) return href
  if (href.startsWith('#') || href.startsWith('mailto:')) return href
  const sep = href.includes('?') ? '&' : '?'
  return `${href}${sep}utm_source=resend&utm_medium=email&utm_campaign=${encodeURIComponent(utmCampaign)}`
}

function escapeInline(text: string): string {
  // Light markdown: **bold**, *italic*, [text](url), `code`, line breaks
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return escaped
    .replace(/\*\*([^*]+)\*\*/g, '<strong style="color: ' + T.textPrimary + ';">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, `<code style="font-family: ${T.monoStack}; font-size: 0.92em; background-color: rgba(34, 211, 238, 0.08); color: ${T.accentCyan}; padding: 2px 6px; border-radius: 4px;">$1</code>`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" style="color: ${T.accentCyan}; text-decoration: underline;">$1</a>`)
    .replace(/\n/g, '<br>')
}

function renderPlainText(issue: CompiledIssue, meta: StreamMeta): string {
  const lines: string[] = [
    meta.name.toUpperCase(),
    meta.tagline,
    '',
    '────────────────────',
    '',
  ]
  for (const b of issue.blocks) {
    if (b.type === 'intro') {
      lines.push(b.body || '', '')
    } else if (b.type === 'section') {
      if (b.heading) lines.push(b.heading, '')
      if (b.body) lines.push(b.body, '')
    } else if (b.type === 'list') {
      for (const item of b.items || []) lines.push(`• ${item}`)
      lines.push('')
    } else if (b.type === 'pullquote') {
      lines.push(`"${b.body}"`, b.author ? `— ${b.author}` : '', '')
    } else if (b.type === 'code') {
      lines.push(b.body || '', '')
    } else if (b.type === 'cta') {
      lines.push(`→ ${b.label}: ${b.href}`, '')
    } else if (b.type === 'signoff') {
      lines.push(b.body || '', '')
    }
  }
  lines.push('', '— Frank', 'https://frankx.ai')
  return lines.join('\n')
}

export { resourceCard, sectionLabel, highlightBox } // re-export for downstream use
