import rawProducts from '@/data/products.json'
import { booksRegistry } from '@/app/books/lib/books-registry'

export type ProductLane = 'systems' | 'creative' | 'wealth' | 'books'
export type PreviewEvidenceKind = 'verified-delivery' | 'planned-outline'

export interface InspectableFileEntry {
  path: string
  kind: 'markdown' | 'pdf' | 'route' | 'outline'
  sizeLabel: string
  summary: string
  excerpt: string
}

export interface ProductPreviewManifest {
  productId: string
  slug: string
  name: string
  lane: ProductLane
  evidenceKind: PreviewEvidenceKind
  plateSvg: string
  archiveName: string
  deliveryStatusLabel: string
  buyIf: string[]
  skipIf: string[]
  files: InspectableFileEntry[]
}

const VERIFIED_BOOK_SLUGS = new Set([
  'love-and-poetry',
  'spartan-mindset',
  'self-development',
  'imagination',
  'manifestation',
  'golden-age',
])

const LIVE_DIRECT_SLUGS = new Set([
  'vibe-os',
  'soulbook',
  'reality-architect-os',
  ...VERIFIED_BOOK_SLUGS,
])

function normalizePunctuation(text: string): string {
  return text.replace(/\s*\u2014\s*/g, ' - ')
}

function classifyLane(id: string, category: string): ProductLane {
  const key = id.toLowerCase()
  const cat = category.toLowerCase()
  if (key.includes('book') || cat === 'books' || cat === 'book' || key === 'creators-soulbook') {
    return 'books'
  }
  if (
    key.includes('dpi') ||
    key.includes('income') ||
    key.includes('stream') ||
    key.includes('capability') ||
    key.includes('founders-circle')
  ) {
    return 'wealth'
  }
  if (
    key.includes('vibe') ||
    key.includes('suno') ||
    key.includes('visual') ||
    key.includes('aurora') ||
    key.includes('creative') ||
    key.includes('chronicles') ||
    key.includes('generative') ||
    key.includes('media-machine') ||
    key.includes('anti-slop') ||
    key.includes('mythic')
  ) {
    return 'creative'
  }
  return 'systems'
}

const BESPOKE_BOUNDARIES: Record<
  string,
  Pick<ProductPreviewManifest, 'buyIf' | 'skipIf'>
> = {
  'vibe-os': {
    buyIf: [
      'You want a practical system for tracking creative energy cycles and matching deep work to focus windows.',
      'You want an inspectable public web guide you can read right away at zero cost.',
    ],
    skipIf: [
      'You are looking for a hosted SaaS dashboard with team billing seats today (the web app is still in development).',
      'You want an automated calendar bot rather than a personal focus-window workflow.',
    ],
  },
  'creators-soulbook': {
    buyIf: [
      'You want a structured reflection framework across energy, mind, soul, craft, capital, circle, and legacy.',
      'You prefer a browser-local vault and printable framework pages with zero account wall.',
    ],
    skipIf: [
      'You want a cloud-synced mobile habit tracker with push notifications.',
      'You only need code or API automation scripts with zero personal planning.',
    ],
  },
  'agentic-creator-os': {
    buyIf: [
      'You work inside Claude Code, Codex, or Cursor and want structured skills, memory files, and review gates.',
      'You want clear separation between agent drafting and human editorial or deployment decisions.',
    ],
    skipIf: [
      'You prefer no-code browser widgets and never open a terminal or git repository.',
      'You want autonomous social posting without a human review step.',
    ],
  },
  'visual-creation-loop': {
    buyIf: [
      'You ship dark-mode product pages, essays, or social visuals and want consistent palette and composition rules.',
      'You want deterministic SVG schematic patterns alongside structured visual review criteria.',
    ],
    skipIf: [
      'You need character rigging or 3D game asset pipelines in Blender or Unreal.',
      'You prefer generic stock photo packs over reference-locked brand systems.',
    ],
  },
  'agent-fleet-pro': {
    buyIf: [
      'You run multiple coding agents across a codebase and want git worktree isolation plus file-path leases.',
      'You want an independent verifier pass and secret-scan gate before branches open draft PRs.',
    ],
    skipIf: [
      'You work solo in a single editor tab and rarely run background tasks.',
      'You want a hosted multi-tenant cloud dashboard rather than git-native CLI workflows.',
    ],
  },
  'dpi-field-kit': {
    buyIf: [
      'You operate digital products and want a local ledger pattern for tracking offer readiness and margin.',
      'You prefer auditable local workflows over connecting financial credentials to third-party analytics apps.',
    ],
    skipIf: [
      'You have not scoped your first digital product or service offer yet (start with the Capability Audit waitlist).',
      'You need statutory tax filing software rather than an offer readiness framework.',
    ],
  },
}

function buildVerifiedBookEntries(p: any): InspectableFileEntry[] {
  const name = normalizePunctuation(String(p.name ?? p.title ?? p.slug))
  const book = booksRegistry.find((b) => b.slug === p.slug)
  const publishedChapters = (book?.chapters ?? []).filter((ch) => ch.published)
  const blobFile = p.delivery?.files?.[0]

  const entries: InspectableFileEntry[] = []

  if (blobFile?.blobKey) {
    entries.push({
      path: blobFile.blobKey,
      kind: 'pdf',
      sizeLabel: blobFile.size ?? 'Registered PDF',
      summary: normalizePunctuation(
        `Registered public PDF edition served directly via /api/download?product=${p.slug} with zero email gate.`,
      ),
      excerpt: [
        `Registered edition: ${name}`,
        `Direct download route: /api/download?product=${p.slug}`,
        `Web reader route: /books/${p.slug}`,
        ...(blobFile.size ? [`Registered file size: ${blobFile.size}`] : []),
        '',
        `Published web chapters (${publishedChapters.length}):`,
        ...publishedChapters.map((ch) =>
          normalizePunctuation(
            `  ${String(ch.number).padStart(2, '0')}. ${ch.title} (${ch.readingTime}) - ${ch.description}`,
          ),
        ),
      ].join('\n'),
    })
  }

  for (const ch of publishedChapters) {
    const lines = [
      `Chapter ${ch.number}: ${normalizePunctuation(ch.title)}`,
      `Route: /books/${p.slug}/${ch.slug}`,
      `Reading time: ${ch.readingTime}`,
      '',
      normalizePunctuation(ch.description),
    ]
    if (ch.epigraph?.text) {
      lines.push(
        '',
        `"${normalizePunctuation(ch.epigraph.text)}"`,
        `  - ${normalizePunctuation(ch.epigraph.author)}`,
      )
    }
    entries.push({
      path: `/books/${p.slug}/${ch.slug}`,
      kind: 'markdown',
      sizeLabel: ch.readingTime,
      summary: normalizePunctuation(ch.description),
      excerpt: lines.join('\n'),
    })
  }

  return entries
}

function buildVerifiedDirectEntries(p: any): InspectableFileEntry[] {
  if (VERIFIED_BOOK_SLUGS.has(p.slug)) {
    return buildVerifiedBookEntries(p)
  }

  if (p.slug === 'vibe-os') {
    return [
      {
        path: '/products/vibe-os/docs#quick-start',
        kind: 'route',
        sizeLabel: 'Live guide',
        summary:
          'Four-step public quick-start guide for logging creative energy (1-5) and matching work blocks to peak hours.',
        excerpt: [
          '# Vibe OS Documentation - Quick Start',
          'Route: /products/vibe-os/docs',
          '',
          '1. Write down the first check-in (a downloadable dashboard is not published yet; start with the energy number and the work in front of you).',
          '2. Log your first energy check-in (1-5) 3-4 times throughout the day.',
          '3. Review your patterns after 1 week to identify peak creative hours.',
          '4. Schedule deep creative work during peak hours and admin tasks during lower-energy windows.',
        ].join('\n'),
      },
      {
        path: '/products/vibe-os/docs#core-concepts',
        kind: 'route',
        sizeLabel: 'Live guide',
        summary:
          'Reference notes on creative states, 1-5 energy tracking, and task-to-state schedule alignment.',
        excerpt: [
          '# Core Concepts (/products/vibe-os/docs)',
          '',
          '- Creative States: Combination of energy level, focus quality, and mental mode.',
          '- Energy Tracking: Daily 1-5 check-ins that surface natural productivity cycles.',
          '- Workflow Optimization: Matching high-energy peaks to creation and low-energy blocks to maintenance.',
        ].join('\n'),
      },
      {
        path: '/waitlist?intent=vibe-os',
        kind: 'outline',
        sizeLabel: 'Waitlist',
        summary:
          'Optional launch-list signup for the interactive Vibe OS web application while it remains in development.',
        excerpt: [
          'Interactive web app status: In development (not yet downloadable).',
          'Public documentation status: Live today at /products/vibe-os/docs with zero email requirement.',
          'Waitlist route: /waitlist?intent=vibe-os',
        ].join('\n'),
      },
    ]
  }

  if (p.slug === 'soulbook') {
    return [
      {
        path: '/soulbook/vault',
        kind: 'route',
        sizeLabel: 'Live route',
        summary:
          'Interactive browser-local vault for logging journal entries, goals, streaks, and scores across the 7 Pillars.',
        excerpt: [
          '# Soulbook Interactive Vault (/soulbook/vault)',
          '',
          'Browser-local workspace (stored in localStorage with zero account wall):',
          '- 7 Pillars progress scores: Energy, Mind, Soul, Craft, Capital, Circle, Legacy',
          '- Guided pillar journal entries and active goal tracking',
          '- Streak tracking across daily reflection sessions',
        ].join('\n'),
      },
      {
        path: '/soulbook/framework',
        kind: 'route',
        sizeLabel: 'Live route',
        summary:
          'Printable reference page covering the 7 Pillars architecture and weekly review questions.',
        excerpt: [
          '# Soulbook 7 Pillars Framework (/soulbook/framework)',
          '',
          '- Full breakdown of Energy, Mind, Soul, Craft, Capital, Circle, and Legacy',
          '- Print-ready browser layout via PrintButton component',
          '- Companion perspectives at /soulbook/life-symphony and /soulbook/golden-path',
        ].join('\n'),
      },
      {
        path: '/soulbook/assessment',
        kind: 'route',
        sizeLabel: 'Live route',
        summary:
          'Interactive self-assessment mapping current strengths and neglected pillars.',
        excerpt: [
          '# Soulbook Pillar Assessment (/soulbook/assessment)',
          '',
          '- Score each of the 7 Pillars in your browser',
          '- Identify your highest-leverage focus pillar for the current week',
        ].join('\n'),
      },
    ]
  }

  // reality-architect-os
  const modules: Array<{ title: string; description: string }> = Array.isArray(p.modules)
    ? p.modules
    : []
  return [
    {
      path: 'https://github.com/frankxai/realityarchitect',
      kind: 'route',
      sizeLabel: 'Public repo',
      summary: normalizePunctuation(
        p.summary ?? 'Public GitHub starter repository for the reality.md memory spec and local CLI wrappers.',
      ),
      excerpt: [
        `Repository: ${p.offer?.ctaPrimaryHref ?? 'https://github.com/frankxai/realityarchitect'}`,
        'Access: Public GitHub repository (fork or clone directly)',
        '',
        'Declared repository modules:',
        ...modules.map((m, idx) =>
          normalizePunctuation(`  0${idx + 1}. ${m.title}: ${m.description}`),
        ),
      ].join('\n'),
    },
  ]
}

function buildPlannedOutlineEntries(p: any): InspectableFileEntry[] {
  const modules: Array<{ title: string; description: string }> = Array.isArray(p.modules)
    ? p.modules
    : []
  const transformations: string[] = Array.isArray(p.transformation) ? p.transformation : []
  const name = normalizePunctuation(String(p.name ?? p.title ?? p.slug))

  const overviewEntry: InspectableFileEntry = {
    path: `Overview · ${name}`,
    kind: 'outline',
    sizeLabel: 'Planned scope',
    summary: normalizePunctuation(
      `Illustrative scope summary for ${name}. Downloadable package files are not published yet; join the launch list for release updates.`,
    ),
    excerpt: [
      `Planned product: ${name}`,
      'Release state: Waitlist preview (not yet packaged for download or checkout)',
      `Waitlist route: ${p.id === 'founders-circle-guild' ? '/founder-application' : `/waitlist?intent=${p.slug}`}`,
      '',
      normalizePunctuation(String(p.promise ?? p.headline ?? name)),
      ...(transformations.length > 0
        ? [
            '',
            'Target outcomes under review:',
            ...transformations.map((t) => `- ${normalizePunctuation(t)}`),
          ]
        : []),
    ].join('\n'),
  }

  const moduleEntries: InspectableFileEntry[] = modules.map((m, idx) => ({
    path: `Module ${String(idx + 1).padStart(2, '0')} · ${normalizePunctuation(m.title)}`,
    kind: 'outline',
    sizeLabel: 'Planned module',
    summary: normalizePunctuation(m.description),
    excerpt: [
      `Planned module ${String(idx + 1).padStart(2, '0')}: ${normalizePunctuation(m.title)}`,
      'Status: Illustrative module outline (final file layout subject to pre-release verification)',
      '',
      normalizePunctuation(m.description),
    ].join('\n'),
  }))

  return [overviewEntry, ...moduleEntries]
}

function buildDefaultBoundaries(p: any, lane: ProductLane): { buyIf: string[]; skipIf: string[] } {
  const isFree = (p.offer?.primaryPrice ?? p.price ?? 0) === 0
  if (lane === 'books') {
    return {
      buyIf: [
        `You want a focused, distraction-free PDF or web edition of ${normalizePunctuation(String(p.name ?? p.title))}.`,
        'You value reflective essays and structured mental models you can revisit offline.',
      ],
      skipIf: [
        'You are looking for a runnable software repository or TypeScript starter template.',
        'You want a step-by-step API integration tutorial rather than a written book.',
      ],
    }
  }
  if (lane === 'wealth') {
    return {
      buyIf: [
        'You want sober, numerate frameworks showing setup hours, maintenance load, and readiness gates.',
        isFree
          ? 'You want to preview the planned diagnostic scope before committing build hours to a new offer.'
          : 'You already ship technical or creative work and want to follow the planned local tracking templates.',
      ],
      skipIf: [
        'You are looking for effortless earnings claims or hands-off financial schemes.',
        'You need an immediately downloadable software archive today rather than a launch-list preview.',
      ],
    }
  }
  if (lane === 'creative') {
    return {
      buyIf: [
        'You want repeatable studio workflows, prompt structures, and quality checklists for creative output.',
        'You want to review the planned module scope and join the launch list for release notice.',
      ],
      skipIf: [
        'You want one-click unreviewed content generation with zero human taste direction.',
        'You need an immediately downloadable pack today rather than a planned release.',
      ],
    }
  }
  return {
    buyIf: [
      'You work in Git, Markdown, and CLI agent tools and want portable, inspectable configurations.',
      'You value explicit verification gates and clear file boundaries over black-box automation.',
    ],
    skipIf: [
      'You want a hosted no-code SaaS subscription rather than local workflow specifications.',
      'You need an immediately downloadable archive today rather than joining the launch list.',
    ],
  }
}

export const PRODUCT_PREVIEW_MANIFESTS: Record<string, ProductPreviewManifest> = Object.fromEntries(
  (rawProducts as any[]).flatMap((p) => {
    const name = normalizePunctuation(String(p.name ?? p.title ?? p.slug))
    const lane = classifyLane(p.id, p.category ?? '')
    const bespoke = BESPOKE_BOUNDARIES[p.id]
    const defaults = buildDefaultBoundaries(p, lane)
    const isDirect = LIVE_DIRECT_SLUGS.has(p.slug)
    const evidenceKind: PreviewEvidenceKind = isDirect ? 'verified-delivery' : 'planned-outline'

    const archiveName = isDirect
      ? VERIFIED_BOOK_SLUGS.has(p.slug)
        ? `/books/${p.slug}`
        : p.slug === 'vibe-os'
          ? '/products/vibe-os/docs'
          : p.slug === 'soulbook'
            ? '/soulbook'
            : 'github.com/frankxai/realityarchitect'
      : 'Planned module outline'

    const deliveryStatusLabel = isDirect
      ? VERIFIED_BOOK_SLUGS.has(p.slug)
        ? 'Public reader + PDF live'
        : 'Public access live'
      : p.id === 'founders-circle-guild'
        ? 'Application cohort · Planned scope'
        : 'Planned outline · Waitlist open'

    const manifest: ProductPreviewManifest = {
      productId: p.id,
      slug: p.slug,
      name,
      lane,
      evidenceKind,
      plateSvg: `/images/products/plates/${p.slug}.svg`,
      archiveName,
      deliveryStatusLabel,
      buyIf: bespoke?.buyIf ?? defaults.buyIf,
      skipIf: bespoke?.skipIf ?? defaults.skipIf,
      files: isDirect ? buildVerifiedDirectEntries(p) : buildPlannedOutlineEntries(p),
    }

    return [
      [p.id, manifest],
      [p.slug, manifest],
    ]
  }),
)

export function getPreviewManifest(idOrSlug: string): ProductPreviewManifest | undefined {
  return PRODUCT_PREVIEW_MANIFESTS[idOrSlug]
}
