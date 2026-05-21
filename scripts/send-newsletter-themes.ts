#!/usr/bin/env npx ts-node
/**
 * FrankX Newsletter Theme Pack Sender
 *
 * Sends one tasteful newsletter edition per official content theme:
 * - Creator Systems
 * - Vibe Sessions
 * - Intelligence Dispatches
 * - Creativity
 * - Flagship
 *
 * Usage:
 *   npx ts-node scripts/send-newsletter-themes.ts preview
 *   npx ts-node scripts/send-newsletter-themes.ts send-test friemerx@gmail.com Frank
 *
 * Env:
 *   RESEND_API_KEY
 *   RESEND_FROM_EMAIL (recommended: Frank <frank@mail.frankx.ai>)
 */

import fs from 'fs'
import path from 'path'
import { Resend } from 'resend'

type ThemeId =
  | 'creator-systems'
  | 'vibe-sessions'
  | 'intelligence-dispatches'
  | 'creativity'
  | 'flagship'

interface ResourceLink {
  label: string
  url: string
  note: string
}

interface ThemeEdition {
  id: ThemeId
  themeName: string
  subject: string
  preheader: string
  headline: string
  intro: string
  insights: Array<{ title: string; body: string }>
  buildThisWeek: string[]
  resources: ResourceLink[]
  cta: { text: string; url: string }
}

const DATE = new Date().toISOString().slice(0, 10)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Frank <frank@mail.frankx.ai>'
const BASE_ARCHIVE_DIR = path.join(process.cwd(), 'content', 'newsletters', 'themes')

const THEMES: ThemeEdition[] = [
  {
    id: 'creator-systems',
    themeName: 'Creator Systems',
    subject: 'Creator Systems Weekly: Build AI Workflows That Actually Ship',
    preheader: 'Move from scattered prompts to reliable systems with quality gates.',
    headline: 'From Prompt Chaos to Creator Systems',
    intro:
      'This edition is for builders turning experiments into repeatable output. The core idea: tools help, but systems deliver. High-performing teams pair AI acceleration with workflow clarity, platform quality, and disciplined review.',
    insights: [
      {
        title: 'AI amplifies your system quality',
        body: 'Recent DORA research shows AI works as an amplifier. Teams with clean workflows and strong internal platforms gain more. Teams with weak systems mostly scale confusion.',
      },
      {
        title: 'Platform quality is leverage',
        body: 'When your internal tooling and patterns are standardized, every prompt compounds. System quality is not overhead. It is speed insurance.',
      },
      {
        title: 'Think in loops, not one-offs',
        body: 'Codify your best process: intake, draft, review, polish, publish. Repetition with judgment beats random brilliance over time.',
      },
    ],
    buildThisWeek: [
      'Define one 5-step workflow for your most repeated content task.',
      'Add one quality gate before publish (claims, links, or voice).',
      'Document the workflow so another teammate can run it cleanly.',
    ],
    resources: [
      {
        label: '2025 DORA report announcement (Google Cloud Blog)',
        url: 'https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report',
        note: 'AI as amplifier, near-universal adoption, workflow quality focus.',
      },
      {
        label: '2025 DORA report landing page',
        url: 'https://cloud.google.com/resources/content/2025-dora-ai-assisted-software-development-report',
        note: 'AI capabilities model and team profile framing.',
      },
      {
        label: 'ACOS quickstart on FrankX',
        url: 'https://www.frankx.ai/blog/acos-zero-to-production-quickstart',
        note: 'Practical implementation pattern for creator-side systems.',
      },
    ],
    cta: {
      text: 'Explore Creator Systems',
      url: 'https://www.frankx.ai/acos',
    },
  },
  {
    id: 'vibe-sessions',
    themeName: 'Vibe Sessions',
    subject: 'Vibe Sessions: Better AI Music Through Taste, Not Noise',
    preheader: 'Use stronger prompting and arrangement intention for cleaner musical outcomes.',
    headline: 'Make the Model Serve the Mood',
    intro:
      'The fastest path to better AI music is not more generation. It is clearer intent. Define mood, texture, arrangement arc, and vocal role before you hit create.',
    insights: [
      {
        title: 'Prompt adherence is improving',
        body: 'Suno v4.5 introduced stronger style interpretation and richer vocal behavior. This rewards precise musical language over generic genre labels.',
      },
      {
        title: 'Structure still needs human direction',
        body: 'Even with better model quality, emotional pacing and song identity still come from human choices. AI gives options; you shape meaning.',
      },
      {
        title: 'Iteration beats novelty',
        body: 'Take one promising output and iterate with controlled changes to mood, instrumentation, and lyric density. Systematic refinement outperforms fresh starts.',
      },
    ],
    buildThisWeek: [
      'Write one prompt with mood + arrangement + vocal intent in one sentence.',
      'Generate three versions and compare only one variable per version.',
      'Commit one final track with a short production note for future reuse.',
    ],
    resources: [
      {
        label: 'Introducing v4.5 (Suno)',
        url: 'https://suno.com/blog/introducing-v4-5',
        note: 'Official release notes on expressiveness and prompt adherence.',
      },
      {
        label: 'What’s new in v4.5 (Suno Help)',
        url: 'https://help.suno.com/en/articles/5782593',
        note: 'Detailed feature behavior and limits.',
      },
      {
        label: 'Suno model timeline',
        url: 'https://help.suno.com/en/articles/5782721',
        note: 'Model progression context for production planning.',
      },
    ],
    cta: {
      text: 'Enter Music Lab',
      url: 'https://www.frankx.ai/music-lab',
    },
  },
  {
    id: 'intelligence-dispatches',
    themeName: 'Intelligence Dispatches',
    subject: 'Intelligence Dispatch: Strategic AI Signals That Matter',
    preheader: 'What to watch now in capability growth, regulation, and implementation risk.',
    headline: 'Signal Over Hype, Every Week',
    intro:
      'Intelligence work is about selecting the few signals that change decisions. This week: capability velocity, governance maturity, and the gap between local productivity and system-level performance.',
    insights: [
      {
        title: 'Capability growth continues to accelerate',
        body: 'The AI Index trajectory reinforces what builders already feel: model capabilities and investment are moving fast, but adoption quality is uneven across organizations and sectors.',
      },
      {
        title: 'Policy is converging toward responsible deployment',
        body: 'OECD guidance continues to push trustworthy AI principles into real implementation contexts, especially for public sector and critical use domains.',
      },
      {
        title: 'Execution quality remains the bottleneck',
        body: 'Teams with clear value-stream thinking and operational rigor convert AI potential into outcomes. Others stay stuck in pilot mode.',
      },
    ],
    buildThisWeek: [
      'Pick one strategic signal and map it to one concrete roadmap decision.',
      'Add a risk note to every AI initiative: model, data, workflow, owner.',
      'Review one pilot and decide: scale, redesign, or stop.',
    ],
    resources: [
      {
        label: 'Stanford 2025 AI Index Report',
        url: 'https://hai.stanford.edu/ai-index/2025-ai-index-report?u=',
        note: 'Broad benchmark for capabilities, investment, and policy context.',
      },
      {
        label: 'OECD Generative AI topic',
        url: 'https://www.oecd.org/en/topics/generative-ai.html',
        note: 'Adoption patterns and policy framing across OECD countries.',
      },
      {
        label: 'OECD: Governing with AI in public administration',
        url: 'https://www.oecd.org/en/about/news/press-releases/2025/09/oecd-encourages-responsible-use-of-ai-by-governments-to-strengthen-efficiency-effectiveness-and-trust.html',
        note: 'Scaling challenges and responsible deployment lessons.',
      },
    ],
    cta: {
      text: 'Read Intelligence Dispatches',
      url: 'https://www.frankx.ai/blog',
    },
  },
  {
    id: 'creativity',
    themeName: 'Creativity',
    subject: 'Creativity Letter: Keep Human Taste in the Loop',
    preheader: 'Fast tools are useful. Taste, context, and care still define the work.',
    headline: 'Creativity Is Still a Human Craft',
    intro:
      'In an AI-rich environment, creative edge comes from discernment. Good work now depends less on raw generation and more on edit quality, emotional clarity, and contribution to real people.',
    insights: [
      {
        title: 'Community shapes creative quality',
        body: 'Strong creative ecosystems accelerate learning and standards. Builders improve faster when they share process, feedback, and references openly.',
      },
      {
        title: 'Constraint improves originality',
        body: 'Define scope before you create: audience, medium, and desired effect. Constraint-first creation usually produces stronger and more coherent output.',
      },
      {
        title: 'Meaning beats volume',
        body: 'Publishing more is easy. Publishing work that helps someone think or feel differently is the real bar.',
      },
    ],
    buildThisWeek: [
      'Create one piece with a strict constraint (format + audience + outcome).',
      'Edit once for clarity, once for emotional signal, once for usefulness.',
      'Share one learning note publicly with your source references.',
    ],
    resources: [
      {
        label: 'Open Source Guides: Building Community',
        url: 'https://opensource.guide/building-community/',
        note: 'Practical patterns for sustainable contributor culture.',
      },
      {
        label: 'OECD Generative AI topic',
        url: 'https://www.oecd.org/en/topics/generative-ai.html',
        note: 'Useful context on where and how generative AI is being used.',
      },
      {
        label: 'Props to the Builders (FrankX)',
        url: 'https://www.frankx.ai/blog/props-to-the-builders-of-this-era',
        note: 'Current FrankX positioning on grounded collaboration and craft.',
      },
    ],
    cta: {
      text: 'Read Creativity Essays',
      url: 'https://www.frankx.ai/blog/ai-doesnt-have-to-be-soulless',
    },
  },
  {
    id: 'flagship',
    themeName: 'Flagship',
    subject: 'Flagship Briefing: The Signals Worth Building Around',
    preheader: 'A long-view synthesis across strategy, systems, and creative execution.',
    headline: 'Flagship Thinking for Builders at Scale',
    intro:
      'Flagship work should reduce uncertainty, not add noise. This edition synthesizes the most decision-relevant signals across capability growth, software delivery, and governance so your next quarter is anchored in reality.',
    insights: [
      {
        title: 'Pair macro signals with local evidence',
        body: 'Use global reports to frame direction, then validate against your own delivery metrics and user outcomes before major strategic commitments.',
      },
      {
        title: 'System quality determines AI ROI',
        body: 'AI ROI is a systems question: platform maturity, workflow clarity, and decision cadence. Tool adoption without operating discipline rarely compounds.',
      },
      {
        title: 'Flagship artifacts should be executable',
        body: 'A flagship piece should include decisions, tradeoffs, and a concrete action path. Insight without implementation is just commentary.',
      },
    ],
    buildThisWeek: [
      'Create one 2-page strategic memo with 3 decisions and owners.',
      'Attach one benchmark source and one internal metric per decision.',
      'Define one 30-day experiment for your highest-uncertainty bet.',
    ],
    resources: [
      {
        label: 'Stanford 2025 AI Index Report',
        url: 'https://hai.stanford.edu/ai-index/2025-ai-index-report?u=',
        note: 'Macro capability and investment direction.',
      },
      {
        label: '2025 DORA report announcement',
        url: 'https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report',
        note: 'System-level software delivery implications for AI adoption.',
      },
      {
        label: 'OECD updated AI Principles',
        url: 'https://www.oecd.org/en/about/news/press-releases/2024/05/oecd-updates-ai-principles-to-stay-abreast-of-rapid-technological-developments.html',
        note: 'Interoperable policy baseline for trustworthy deployment.',
      },
    ],
    cta: {
      text: 'Open Flagship Reading',
      url: 'https://www.frankx.ai/blog/frankx-intelligence-atlas-volume-1',
    },
  },
]

function renderNewsletterHTML(theme: ThemeEdition, recipientName: string): string {
  const insightsHTML = theme.insights
    .map(
      (item, idx) => `
      <div style="margin: 0 0 14px 0; padding: 16px 18px; border: 1px solid #e5e7eb; border-radius: 14px; background: #ffffff;">
        <p style="margin: 0 0 8px 0; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #9ca3af; font-weight: 600;">Insight ${idx + 1}</p>
        <h3 style="margin: 0 0 8px 0; font-size: 18px; line-height: 1.3; color: #111827; font-weight: 600;">${item.title}</h3>
        <p style="margin: 0; font-size: 15px; line-height: 1.65; color: #374151;">${item.body}</p>
      </div>
    `,
    )
    .join('')

  const checklistHTML = theme.buildThisWeek
    .map(
      (step) => `
      <li style="margin: 0 0 10px 0; color: #1f2937; font-size: 15px; line-height: 1.6;">${step}</li>
    `,
    )
    .join('')

  const resourcesHTML = theme.resources
    .map(
      (resource) => `
      <li style="margin: 0 0 10px 0; color: #374151; font-size: 14px; line-height: 1.6;">
        <a href="${resource.url}" style="color: #0f766e; text-decoration: none; font-weight: 600;">${resource.label}</a><br />
        <span style="color: #6b7280;">${resource.note}</span>
      </li>
    `,
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${theme.subject}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;background-image:radial-gradient(circle at 1px 1px, rgba(15,23,42,0.06) 1px, transparent 0);background-size:18px 18px;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${theme.preheader}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;border:1px solid #e5e7eb;border-radius:24px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.06);">
          <tr>
            <td style="padding:22px 24px;background:linear-gradient(180deg,#ffffff 0%,#f9fafb 100%);border-bottom:1px solid #eef2f7;">
              <p style="margin:0 0 6px 0;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#6b7280;font-weight:600;">FrankX Newsletter</p>
              <p style="margin:0;font-size:15px;color:#111827;font-weight:600;">${theme.themeName}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 24px 10px 24px;">
              <p style="margin:0 0 10px 0;font-size:16px;color:#4b5563;">Hi ${recipientName},</p>
              <h1 style="margin:0 0 14px 0;font-size:34px;line-height:1.2;letter-spacing:-0.02em;color:#111827;font-weight:700;">${theme.headline}</h1>
              <p style="margin:0 0 24px 0;font-size:16px;line-height:1.75;color:#374151;">${theme.intro}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 24px 6px 24px;">
              ${insightsHTML}
            </td>
          </tr>

          <tr>
            <td style="padding:8px 24px 6px 24px;">
              <div style="padding:18px;border:1px solid #dbeafe;border-radius:14px;background:#f8fbff;">
                <p style="margin:0 0 10px 0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#2563eb;font-weight:700;">Build This Week</p>
                <ol style="margin:0;padding-left:18px;">
                  ${checklistHTML}
                </ol>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:12px 24px 10px 24px;">
              <div style="padding:18px;border:1px solid #e5e7eb;border-radius:14px;background:#fcfcfd;">
                <p style="margin:0 0 10px 0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;font-weight:700;">Research Signals</p>
                <ul style="margin:0;padding-left:18px;">
                  ${resourcesHTML}
                </ul>
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:18px 24px 26px 24px;">
              <a href="${theme.cta.url}" style="display:inline-block;padding:14px 24px;border-radius:12px;background:#111827;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;letter-spacing:0.01em;">${theme.cta.text}</a>
            </td>
          </tr>

          <tr>
            <td style="padding:0 24px 24px 24px;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#9ca3af;text-align:center;">
                You are receiving this because you're part of the FrankX builder community.<br />
                <a href="{{RESEND_UNSUBSCRIBE_URL}}" style="color:#6b7280;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function renderNewsletterText(theme: ThemeEdition, recipientName: string): string {
  const insights = theme.insights
    .map((item, index) => `${index + 1}. ${item.title}\n${item.body}`)
    .join('\n\n')
  const buildSteps = theme.buildThisWeek.map((step, index) => `${index + 1}. ${step}`).join('\n')
  const resources = theme.resources
    .map((resource) => `- ${resource.label}\n  ${resource.url}\n  ${resource.note}`)
    .join('\n')

  return `FRANKX NEWSLETTER | ${theme.themeName}\n${DATE}\n\nHi ${recipientName},\n\n${theme.headline}\n\n${theme.intro}\n\nINSIGHTS\n${insights}\n\nBUILD THIS WEEK\n${buildSteps}\n\nRESEARCH SIGNALS\n${resources}\n\nCTA\n${theme.cta.text}: ${theme.cta.url}\n\n---\nFrankX.ai\nUnsubscribe: {{RESEND_UNSUBSCRIBE_URL}}\n`
}

function ensureArchiveDir() {
  fs.mkdirSync(BASE_ARCHIVE_DIR, { recursive: true })
}

function archiveEdition(theme: ThemeEdition, html: string, text: string) {
  ensureArchiveDir()
  const baseName = `${DATE}-${theme.id}`
  const htmlPath = path.join(BASE_ARCHIVE_DIR, `${baseName}.html`)
  const textPath = path.join(BASE_ARCHIVE_DIR, `${baseName}.txt`)
  fs.writeFileSync(htmlPath, html, 'utf8')
  fs.writeFileSync(textPath, text, 'utf8')
  return { htmlPath, textPath }
}

async function sendThemeEdition(
  resend: Resend,
  theme: ThemeEdition,
  email: string,
  recipientName: string,
) {
  const html = renderNewsletterHTML(theme, recipientName)
  const text = renderNewsletterText(theme, recipientName)
  const archive = archiveEdition(theme, html, text)

  const result = await resend.emails.send({
    from: FROM_EMAIL,
    to: [email],
    subject: theme.subject,
    html,
    text,
  })

  if (result.error) {
    throw new Error(`${theme.id} send failed: ${result.error.message}`)
  }

  return {
    id: result.data?.id,
    themeId: theme.id,
    subject: theme.subject,
    ...archive,
  }
}

async function previewAll(recipientName = 'Frank') {
  console.log('\nGenerating previews for all theme editions...\n')
  for (const theme of THEMES) {
    const html = renderNewsletterHTML(theme, recipientName)
    const text = renderNewsletterText(theme, recipientName)
    const archive = archiveEdition(theme, html, text)
    console.log(`✓ ${theme.themeName}: ${archive.htmlPath}`)
  }
}

async function sendAll(email: string, recipientName: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY not found in environment')
  }

  const resend = new Resend(apiKey)
  const sent: Array<{ themeId: string; id?: string; subject: string }> = []

  for (const theme of THEMES) {
    console.log(`\nSending ${theme.themeName} -> ${email}`)
    const result = await sendThemeEdition(resend, theme, email, recipientName)
    sent.push({ themeId: result.themeId, id: result.id, subject: result.subject })
    console.log(`✓ Sent ${theme.themeName} | id=${result.id || 'n/a'}`)
  }

  return sent
}

async function sendOne(themeId: ThemeId, email: string, recipientName: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY not found in environment')
  }

  const theme = THEMES.find((item) => item.id === themeId)
  if (!theme) {
    throw new Error(`Unknown theme: ${themeId}`)
  }

  const resend = new Resend(apiKey)
  return sendThemeEdition(resend, theme, email, recipientName)
}

async function main() {
  const args = process.argv.slice(2)
  const command = args[0] || 'preview'

  console.log('\n' + '═'.repeat(68))
  console.log('  FrankX Newsletter Theme Pack')
  console.log('═'.repeat(68))
  console.log(`From: ${FROM_EMAIL}`)
  console.log('Themes: Creator Systems, Vibe Sessions, Intelligence Dispatches, Creativity, Flagship')

  if (command === 'preview') {
    await previewAll(args[1] || 'Frank')
    return
  }

  if (command === 'send-test') {
    const email = args[1] || 'friemerx@gmail.com'
    const name = args[2] || 'Frank'
    const sent = await sendAll(email, name)
    console.log('\nSent editions:')
    for (const item of sent) {
      console.log(`- ${item.themeId}: ${item.id || 'n/a'}`)
    }
    return
  }

  if (command === 'send-theme') {
    const themeId = (args[1] || '') as ThemeId
    const email = args[2] || 'friemerx@gmail.com'
    const name = args[3] || 'Frank'
    const result = await sendOne(themeId, email, name)
    console.log(`\nSent ${themeId}: ${result.id || 'n/a'}`)
    return
  }

  console.log('\nUsage:')
  console.log('  npx ts-node scripts/send-newsletter-themes.ts preview [name]')
  console.log('  npx ts-node scripts/send-newsletter-themes.ts send-test [email] [name]')
  console.log('  npx ts-node scripts/send-newsletter-themes.ts send-theme <theme-id> [email] [name]')
  console.log("\nTheme IDs: creator-systems, vibe-sessions, intelligence-dispatches, creativity, flagship")
}

main().catch((error) => {
  console.error('\n❌', error.message)
  process.exit(1)
})
