export type SiteArchetypeId =
  | 'founder-authority'
  | 'digital-product'
  | 'ai-studio'
  | 'creator-publication'

export type DesignSystemId =
  | 'architectural-ivory'
  | 'obsidian-precision'
  | 'warm-editorial'
  | 'kinetic-blueprint'

export interface WebdesignArchitectInput {
  siteName: string
  archetype: SiteArchetypeId
  designSystem: DesignSystemId
  headline: string
  subhead: string
  primaryAction: string
  actionUrl: string
  proofItems: string[]
  faqQuestion: string
  faqAnswer: string
  enableJsonLd: boolean
  enableLlmsTxt: boolean
  enableAiRobots: boolean
}

export interface DesignSystemTokens {
  id: DesignSystemId
  name: string
  notes: string
  bg: string
  surface: string
  text: string
  muted: string
  accent: string
  accentInk: string
  border: string
  radius: string
  displayFont: string
}

export const DESIGN_SYSTEMS: Record<DesignSystemId, DesignSystemTokens> = {
  'architectural-ivory': {
    id: 'architectural-ivory',
    name: 'Architectural Ivory',
    notes: 'Warm paper ground, crisp slate hairlines, understated obsidian actions.',
    bg: '#FBF9F5',
    surface: '#F1EDE4',
    text: '#11161F',
    muted: '#4B5563',
    accent: '#11161F',
    accentInk: '#FBF9F5',
    border: '#D6CFC2',
    radius: '4px',
    displayFont: "'Georgia', 'Times New Roman', serif",
  },
  'obsidian-precision': {
    id: 'obsidian-precision',
    name: 'Obsidian Precision',
    notes: 'Deep void studio surface paired with clear emerald technical signals.',
    bg: '#090B10',
    surface: '#111622',
    text: '#F3F6FA',
    muted: '#A3B1C6',
    accent: '#34D399',
    accentInk: '#041A12',
    border: '#222B3D',
    radius: '10px',
    displayFont: "system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
  'warm-editorial': {
    id: 'warm-editorial',
    name: 'Warm Editorial',
    notes: 'Sandfolio canvas with espresso ink and high-contrast bronze accent.',
    bg: '#F4EFE6',
    surface: '#EAE1D2',
    text: '#1E1815',
    muted: '#574B44',
    accent: '#7A4B23',
    accentInk: '#FFFDF9',
    border: '#CFC3B0',
    radius: '8px',
    displayFont: "'Georgia', 'Times New Roman', serif",
  },
  'kinetic-blueprint': {
    id: 'kinetic-blueprint',
    name: 'Kinetic Blueprint',
    notes: 'Drafting slate background with cyan telemetry accents.',
    bg: '#070E18',
    surface: '#0E1929',
    text: '#F0F7FF',
    muted: '#9AB2CC',
    accent: '#38BDF8',
    accentInk: '#031321',
    border: '#1E314A',
    radius: '12px',
    displayFont: "system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
}

export const SITE_ARCHETYPE_PRESETS: Record<
  SiteArchetypeId,
  { label: string; summary: string; defaults: WebdesignArchitectInput }
> = {
  'founder-authority': {
    label: 'Founder Authority Hub',
    summary: 'Personal operating site anchored in real builds, writings, and clear inquiry routing.',
    defaults: {
      siteName: 'Northstar Systems',
      archetype: 'founder-authority',
      designSystem: 'architectural-ivory',
      headline: 'Independent architecture notes and open production tools.',
      subhead:
        'Explore working system templates, read field dispatches grounded in shipped commits, and inspect deliverables before reaching out.',
      primaryAction: 'Inspect open tools',
      actionUrl: 'https://example.com/tools',
      proofItems: [
        'Every published workflow carries its verification commands and known limits.',
        'Downloadable starter templates work locally without mandatory accounts.',
        'Plain-English scoping criteria posted upfront.',
      ],
      faqQuestion: 'How do visitors verify what works before subscribing?',
      faqAnswer:
        'Every public instrument runs interactively in the browser and exports inspectable files with zero hidden lock-in.',
      enableJsonLd: true,
      enableLlmsTxt: true,
      enableAiRobots: true,
    },
  },
  'digital-product': {
    label: 'Digital Product Launch',
    summary: 'Single clear product offer with inspectable file manifest and refund clarity.',
    defaults: {
      siteName: 'SpecKit Studio',
      archetype: 'digital-product',
      designSystem: 'obsidian-precision',
      headline: 'Ship tested Next.js & AI workflow kits you can audit before buying.',
      subhead:
        'Preview the exact directory tree, run a browser validator against your own prompt brief, and export a clean zip repository.',
      primaryAction: 'Inspect the starter module',
      actionUrl: 'https://example.com/starter-module',
      proofItems: [
        'Real TypeScript modules tested under strict compiler and ESLint checks.',
        'Zero external SaaS dependency or monthly seat tax.',
        'Clear update log paired with simple commercial license terms.',
      ],
      faqQuestion: 'Can I preview the deliverables before checkout?',
      faqAnswer:
        'Yes. A working single-module kit is open to test and download locally with zero signup.',
      enableJsonLd: true,
      enableLlmsTxt: true,
      enableAiRobots: true,
    },
  },
  'ai-studio': {
    label: 'AI Engineering Studio',
    summary: 'Applied AI practice showing observable evaluation loops instead of vague promises.',
    defaults: {
      siteName: 'VerifyGrid Engineering',
      archetype: 'ai-studio',
      designSystem: 'kinetic-blueprint',
      headline: 'Agent pipelines with independent review gates built into every step.',
      subhead:
        'We build production TypeScript and worker systems where drafting and verification run in separate contexts before anything reaches customers.',
      primaryAction: 'Read our build architecture',
      actionUrl: 'https://example.com/architecture',
      proofItems: [
        'Bounded API timeouts and automatic fallback paths.',
        'Zero secret forwarding or client-controlled pricing logic.',
        'Weekly deterministic test suites against recorded edge cases.',
      ],
      faqQuestion: 'What prevents an automated workflow from making unsafe changes?',
      faqAnswer:
        'Irreversible actions such as billing switches, credential updates, and public sends fail closed behind named human approval.',
      enableJsonLd: true,
      enableLlmsTxt: true,
      enableAiRobots: true,
    },
  },
  'creator-publication': {
    label: 'Creator Publication',
    summary: 'Reader-first editorial edition built for longform essays and serialized guides.',
    defaults: {
      siteName: 'Field Dispatch',
      archetype: 'creator-publication',
      designSystem: 'warm-editorial',
      headline: 'Slow technical essays on building calm creative software.',
      subhead:
        'Published monthly from an active studio notebook. Read full archives in your browser, download offline EPUBs, or follow via RSS and llms.txt.',
      primaryAction: 'Read the latest edition',
      actionUrl: 'https://example.com/latest',
      proofItems: [
        'Zero tracking pixels, popups, or algorithmic outrage feeds.',
        'Clean RSS and Markdown source endpoints alongside HTML.',
        'Full citations linked directly to tested repositories.',
      ],
      faqQuestion: 'How are AI tools used in preparing issues?',
      faqAnswer:
        'Structural checks and grammar lint run via local scripts; arguments, code examples, and final prose remain human-written and verified.',
      enableJsonLd: true,
      enableLlmsTxt: true,
      enableAiRobots: true,
    },
  },
}

const SLOP_PHRASES = [
  'revolutionizing',
  'game-changer',
  'unlock infinite',
  '10x faster',
  'seamless',
  'tapestry',
  'elevate your',
]

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return map[char] ?? char
  })
}

export interface WebdesignAuditResult {
  score: number
  maxScore: number
  checks: { id: string; label: string; passed: boolean; detail: string }[]
}

export interface WebdesignBundle {
  tokens: DesignSystemTokens
  files: { path: string; purpose: string; content: string }[]
  audit: WebdesignAuditResult
}

export function generateWebdesignBundle(input: WebdesignArchitectInput): WebdesignBundle {
  const tokens = DESIGN_SYSTEMS[input.designSystem]
  const safeUrl = /^https?:\/\//i.test(input.actionUrl.trim())
    ? input.actionUrl.trim()
    : 'https://example.com'

  const combinedText = `${input.headline} ${input.subhead} ${input.proofItems.join(' ')}`.toLowerCase()
  const matchedSlop = SLOP_PHRASES.filter((phrase) => combinedText.includes(phrase))

  const schemaObj = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: input.faqQuestion,
        acceptedAnswer: { '@type': 'Answer', text: input.faqAnswer },
      },
    ],
  }
  const schemaJson = JSON.stringify(schemaObj, null, 2)
  const embeddedSchema = schemaJson.replace(/<\//g, '<\\/')

  const tokensCss = `:root {
  --bg: ${tokens.bg};
  --surface: ${tokens.surface};
  --text: ${tokens.text};
  --muted: ${tokens.muted};
  --accent: ${tokens.accent};
  --accent-ink: ${tokens.accentInk};
  --border: ${tokens.border};
  --radius: ${tokens.radius};
  --font-display: ${tokens.displayFont};
  --font-sans: system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, monospace;
}
`

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'" />
  <title>${escapeHtml(input.siteName)} — ${escapeHtml(input.headline)}</title>
  <meta name="description" content="${escapeHtml(input.subhead.slice(0, 155))}" />
  ${input.enableJsonLd ? `<script type="application/ld+json">\n${embeddedSchema}\n  </script>` : ''}
  <style>
${tokensCss}
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--text); font-family: var(--font-sans); line-height: 1.6; }
    .shell { max-width: 1020px; margin: 0 auto; padding: clamp(24px, 5vw, 64px) clamp(18px, 4vw, 32px); }
    header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 20px; border-bottom: 1px solid var(--border); gap: 12px; flex-wrap: wrap; }
    .brand { font-weight: 700; letter-spacing: -0.02em; }
    .system { font-family: var(--font-mono); font-size: 12px; color: var(--muted); }
    .hero { padding: clamp(32px, 6vw, 68px) 0; border-bottom: 1px solid var(--border); }
    h1 { margin: 0; max-width: 18ch; font-family: var(--font-display); font-size: clamp(2.1rem, 5vw, 3.6rem); line-height: 1.05; letter-spacing: -0.03em; overflow-wrap: anywhere; }
    .subhead { margin: 18px 0 0; max-width: 58ch; color: var(--muted); font-size: 1.05rem; overflow-wrap: anywhere; }
    .cta { display: inline-flex; align-items: center; min-height: 46px; margin-top: 24px; padding: 12px 24px; border-radius: var(--radius); background: var(--accent); color: var(--accent-ink); font-weight: 600; text-decoration: none; }
    .cta:focus-visible { outline: 3px solid var(--text); outline-offset: 4px; }
    .grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); padding: 36px 0; }
    .card { padding: 20px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); }
    .idx { font-family: var(--font-mono); font-size: 12px; color: var(--muted); display: block; margin-bottom: 8px; }
    .faq { padding: 22px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); margin-bottom: 32px; }
    .faq h2 { margin: 0 0 8px; font-size: 1rem; }
    .faq p { margin: 0; color: var(--muted); font-size: 0.95rem; }
    footer { padding-top: 24px; border-top: 1px solid var(--border); font-size: 13px; color: var(--muted); display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
  </style>
</head>
<body>
  <div class="shell">
    <header>
      <span class="brand">${escapeHtml(input.siteName)}</span>
      <span class="system">${escapeHtml(tokens.name)}</span>
    </header>
    <main>
      <section class="hero">
        <h1>${escapeHtml(input.headline)}</h1>
        <p class="subhead">${escapeHtml(input.subhead)}</p>
        <a class="cta" href="${escapeHtml(safeUrl)}" rel="noopener noreferrer">${escapeHtml(input.primaryAction)}</a>
      </section>
      <section class="grid" aria-label="Proof points">
        ${input.proofItems
          .filter((item) => item.trim().length > 0)
          .slice(0, 4)
          .map(
            (item, i) => `<article class="card"><span class="idx">${String(i + 1).padStart(2, '0')}</span><p>${escapeHtml(item)}</p></article>`,
          )
          .join('\n        ')}
      </section>
      <section class="faq">
        <h2>${escapeHtml(input.faqQuestion)}</h2>
        <p>${escapeHtml(input.faqAnswer)}</p>
      </section>
    </main>
    <footer>
      <span>${escapeHtml(input.siteName)}</span>
      <span>Self-service export · ${escapeHtml(tokens.id)}</span>
    </footer>
  </div>
</body>
</html>
`

  const designMd = `# DESIGN.md — ${input.siteName}

- **System:** ${tokens.name} (\`${tokens.id}\`)
- **Notes:** ${tokens.notes}
- **Tokens:** \`bg=${tokens.bg}\`, \`surface=${tokens.surface}\`, \`text=${tokens.text}\`, \`accent=${tokens.accent}\`
- **Accessibility:** Keyboard focus outline 3px solid, \`prefers-reduced-motion: reduce\` enforced, mobile viewport scaling preserved.
`

  const llmsTxt = `# ${input.siteName}

> ${input.headline}

${input.subhead}

Primary action: ${input.primaryAction} (${safeUrl})

## Highlights
${input.proofItems.filter(Boolean).map((p) => `- ${p}`).join('\n')}
`

  const robotsTxt = `User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /
`

  const readmeMd = `# ${input.siteName} — Static Web Kit

Generated locally by the FrankX Self-Service Webdesign Architect (\`/tools/webdesign\`).

## Files
- \`index.html\` — Script-free, responsive single-page site with inline tokens and Content-Security-Policy meta guard.
- \`tokens.css\` — Portable CSS custom properties.
- \`DESIGN.md\` — Design system documentation for AI coding agents.
${input.enableJsonLd ? '- `schema.jsonld` — Standalone Schema.org FAQPage JSON-LD graph.\n' : ''}${input.enableLlmsTxt ? '- `llms.txt` — Answer/Agent Engine summary.\n' : ''}${input.enableAiRobots ? '- `robots.txt` — Explicit AI search crawler allow rules.\n' : ''}`

  const files: { path: string; purpose: string; content: string }[] = [
    { path: 'index.html', purpose: 'Standalone script-free responsive landing page.', content: html },
    { path: 'tokens.css', purpose: 'Extracted CSS color, surface, radius, and font tokens.', content: tokensCss },
    { path: 'DESIGN.md', purpose: 'Design rules for coding agents maintaining this site.', content: designMd },
    { path: 'README.md', purpose: 'Deploy and verification overview.', content: readmeMd },
  ]
  if (input.enableJsonLd) {
    files.push({ path: 'schema.jsonld', purpose: 'FAQPage structured data for AEO/GEO citations.', content: schemaJson })
  }
  if (input.enableLlmsTxt) {
    files.push({ path: 'llms.txt', purpose: 'Machine-readable site summary for LLMs.', content: llmsTxt })
  }
  if (input.enableAiRobots) {
    files.push({ path: 'robots.txt', purpose: 'Search and AI crawler allow rules.', content: robotsTxt })
  }

  const checks = [
    {
      id: 'anti-slop',
      label: 'Zero banned AI hype phrases',
      passed: matchedSlop.length === 0,
      detail: matchedSlop.length === 0 ? 'Clean editorial copy.' : `Found: ${matchedSlop.join(', ')}`,
    },
    {
      id: 'headline-clarity',
      label: 'Concise headline (< 110 chars)',
      passed: input.headline.trim().length > 8 && input.headline.trim().length <= 110,
      detail: `${input.headline.trim().length} characters.`,
    },
    {
      id: 'https-action',
      label: 'Safe HTTP/HTTPS action link',
      passed: /^https?:\/\//i.test(input.actionUrl.trim()),
      detail: safeUrl,
    },
    {
      id: 'aeo-jsonld',
      label: 'Structured JSON-LD FAQ graph',
      passed: input.enableJsonLd,
      detail: input.enableJsonLd ? 'Included in index.html and schema.jsonld.' : 'Disabled by user toggle.',
    },
    {
      id: 'ax-bundle',
      label: 'llms.txt + AI robots.txt bundle',
      passed: input.enableLlmsTxt && input.enableAiRobots,
      detail: input.enableLlmsTxt && input.enableAiRobots ? 'Included in downloadable ZIP.' : 'Enable both for full AX parity.',
    },
  ]

  return {
    tokens,
    files,
    audit: {
      score: checks.filter((c) => c.passed).length,
      maxScore: checks.length,
      checks,
    },
  }
}
