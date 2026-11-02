import rawProducts from '@/data/products.json'

export type ProductLane = 'systems' | 'creative' | 'wealth' | 'books'

export interface InspectableFileEntry {
  path: string
  kind: 'markdown' | 'json' | 'sql' | 'typescript' | 'pdf'
  sizeLabel: string
  summary: string
  excerpt: string
}

export interface ProductPreviewManifest {
  productId: string
  slug: string
  name: string
  lane: ProductLane
  plateSvg: string
  archiveName: string
  deliveryStatusLabel: string
  buyIf: string[]
  skipIf: string[]
  files: InspectableFileEntry[]
}

const LIVE_DIRECT_SLUGS = new Set([
  'vibe-os',
  'soulbook',
  'love-and-poetry',
  'spartan-mindset',
  'self-development',
  'imagination',
  'manifestation',
  'golden-age',
  'reality-architect-os',
])

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

function slugifySegment(title: string, idx: number): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 32)
  const prefix = String(idx + 1).padStart(2, '0')
  return `${prefix}-${clean || 'module'}`
}

const BESPOKE_OVERRIDES: Record<
  string,
  Partial<Pick<ProductPreviewManifest, 'archiveName' | 'buyIf' | 'skipIf' | 'files'>>
> = {
  'vibe-os': {
    archiveName: 'vibe-os-guide-pack/',
    buyIf: [
      'You make music with Suno and want repeatable prompt structure instead of random slot-machine generations.',
      'You want an inspectable PDF guide and session checklist you can open right away at zero cost.',
    ],
    skipIf: [
      'You are looking for traditional DAW mixing plugins or acoustic studio hardware tutorials.',
      'You want an automated streaming distributor rather than a creative session workflow.',
    ],
    files: [
      {
        path: 'Vibe-OS-Guide.pdf',
        kind: 'pdf',
        sizeLabel: '1.4 MB',
        summary: 'Core session architecture covering genre tags, arrangement cues, and lyric pacing.',
        excerpt: `CHAPTER 01 · PROMPT ARCHITECTURE
[Genre anchor] + [Instrumentation] + [Tempo / groove] + [Vocal texture]

1. Anchor one primary sonic era before adding secondary flourishes.
2. Separate verse restraint from chorus lift using explicit section headers.
3. Log every keeper generation seed and prompt diff in your session sheet.`,
      },
      {
        path: 'workflows/session-iteration-checklist.md',
        kind: 'markdown',
        sizeLabel: '6 KB',
        summary: 'Step-by-step pass from initial 30-second motif check to final stem selection.',
        excerpt: `# Studio Iteration Pass
- [ ] Pass 1: Lock tempo, key feel, and vocal timbre on an 8-bar test lyric
- [ ] Pass 2: Structure [Intro], [Verse 1], [Chorus], and [Bridge] syllable counts
- [ ] Pass 3: Audition transitions on headphones and studio monitors before export`,
      },
      {
        path: 'templates/prompt-log.json',
        kind: 'json',
        sizeLabel: '4 KB',
        summary: 'Structured log template for tracking prompt revisions and keeper takes.',
        excerpt: `{
  "trackWorkingTitle": "Midnight Circuit",
  "stylePrompt": "analog synthwave, warm bassline, crisp snare, intimate alto vocal",
  "sectionTags": ["[Intro]", "[Verse]", "[Chorus]", "[Outro]"],
  "keeperTake": "v3-extended"
}`,
      },
    ],
  },
  'creators-soulbook': {
    archiveName: 'creators-soulbook-vault/',
    buyIf: [
      'You want a structured weekly reflection framework across energy, craft, relationships, and direction.',
      'You use Markdown or Obsidian and prefer plain-text templates you own locally.',
    ],
    skipIf: [
      'You want a hosted SaaS habit tracker with mobile push notifications.',
      'You only need code or API automation scripts with zero personal planning.',
    ],
  },
  'agentic-creator-os': {
    archiveName: 'agentic-creator-os/',
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
    archiveName: 'visual-creation-loop-v1/',
    buyIf: [
      'You ship dark-mode product pages, essays, or social visuals and want consistent palette and composition rules.',
      'You want deterministic SVG schematic scripts alongside structured image-generation prompts.',
    ],
    skipIf: [
      'You need character rigging or 3D game asset pipelines in Blender or Unreal.',
      'You prefer generic stock photo packs over reference-locked brand systems.',
    ],
    files: [
      {
        path: 'tokens/brand-visual-lock.json',
        kind: 'json',
        sizeLabel: '8 KB',
        summary: 'Reference-locked hex tokens, lighting rules, and negative prompt constraints.',
        excerpt: `{
  "canvas": "#0A0A0B",
  "elevated": "#111318",
  "hairline": "rgba(255, 255, 255, 0.08)",
  "primaryAccent": "#38BDF8",
  "negativeConstraints": [
    "floating neon brains",
    "unreadable raster text labels",
    "oversaturated magenta-cyan fog"
  ]
}`,
      },
      {
        path: 'scripts/generate-schematic-plate.mjs',
        kind: 'typescript',
        sizeLabel: '11 KB',
        summary: 'Deterministic 640x360 vector plate builder for product cards and architecture callouts.',
        excerpt: `export function buildPlateHeader({ lane, title, sku }) {
  return [
    \`<svg viewBox="0 0 640 360" width="640" height="360" role="img">\`,
    \`  <text x="36" y="42">\${lane}</text>\`,
    \`  <text x="36" y="68">\${title}</text>\`,
    \`  <text x="36" y="324">SKU // \${sku}</text>\`,
    \`</svg>\`
  ].join('\\n')
}`,
      },
      {
        path: 'rubrics/visual-critic-30pt.md',
        kind: 'markdown',
        sizeLabel: '7 KB',
        summary: 'Six-criterion scoring gate run before any hero image or diagram ships.',
        excerpt: `# 30-Point Visual QA Gate (Release floor: 26/30)
1. Reference fidelity (0-5): Matches locked palette and surface material
2. Hierarchy & focal point (0-5): Clear primary subject at thumbnail scale
3. Typography & overlay sharpness (0-5): Crisp vector or HTML labels only`,
      },
    ],
  },
  'agent-fleet-pro': {
    archiveName: 'agent-fleet-pro-v1/',
    buyIf: [
      'You run multiple coding agents across a codebase and want git worktree isolation plus file-path leases.',
      'You want an independent verifier pass and secret-scan gate before branches open draft PRs.',
    ],
    skipIf: [
      'You work solo in a single editor tab and rarely run background tasks.',
      'You want a hosted multi-tenant cloud dashboard rather than git-native CLI scripts.',
    ],
  },
  'dpi-field-kit': {
    archiveName: 'dpi-field-kit-v1/',
    buyIf: [
      'You operate digital products and want a local SQLite + JSONL ledger tracking G1-G5 offer readiness and margin.',
      'You prefer auditable local scripts over connecting financial credentials to third-party analytics apps.',
    ],
    skipIf: [
      'You have not scoped your first digital product or service offer yet (start with the free Capability Audit).',
      'You need statutory tax filing software rather than an operator catalog ledger.',
    ],
    files: [
      {
        path: 'schema/ledger.sql',
        kind: 'sql',
        sizeLabel: '5 KB',
        summary: 'Local SQLite tables for offer gates, webhook receipts, and weekly margin snapshots.',
        excerpt: `CREATE TABLE IF NOT EXISTS offer_gates (
  slug TEXT PRIMARY KEY,
  gate_stage TEXT NOT NULL CHECK (gate_stage IN ('G1','G2','G3','G4','G5')),
  checksum_verified INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);`,
      },
      {
        path: 'scripts/audit-readiness.mjs',
        kind: 'typescript',
        sizeLabel: '9 KB',
        summary: 'CLI verifier checking manifest files, pricing disclosures, and link status codes.',
        excerpt: `export function checkGateG3(offer) {
  const missing = []
  if (!offer.manifestFiles?.length) missing.push('manifestFiles')
  if (!offer.skipIfBoundary?.length) missing.push('skipIfBoundary')
  return { pass: missing.length === 0, missing }
}`,
      },
      {
        path: 'runbooks/friday-ledger-review.md',
        kind: 'markdown',
        sizeLabel: '6 KB',
        summary: '15-minute weekly review checklist covering refunds, support load, and next actions.',
        excerpt: `# Friday 15-Minute Catalog Review
1. Ingest latest webhook receipt JSONL entries into local SQLite.
2. Flag any offer with unresolved delivery errors or stale documentation.
3. Pick one bottleneck to resolve in next week's build block.`,
      },
    ],
  },
}

function buildDefaultFiles(p: any, lane: ProductLane): InspectableFileEntry[] {
  const modules: Array<{ title: string; description: string }> = Array.isArray(p.modules)
    ? p.modules
    : []
  const transformations: string[] = Array.isArray(p.transformation) ? p.transformation : []
  const name = p.name ?? p.title ?? p.slug

  if (lane === 'books') {
    const blobFile = p.delivery?.files?.[0]
    const pdfName = blobFile?.blobKey?.split('/').pop() ?? `${p.slug}.pdf`
    const pdfSize = blobFile?.size ?? '1.1 MB'
    return [
      {
        path: pdfName,
        kind: 'pdf',
        sizeLabel: pdfSize,
        summary: p.summary ?? p.description ?? `Complete typeset PDF edition of ${name}.`,
        excerpt: [
          `EDITION · ${name}`,
          `FORMAT  · Typeset PDF + browser reader (/books/${p.slug})`,
          '',
          'INCLUDED ARCS:',
          ...(modules.length > 0
            ? modules.map((m, idx) => `  0${idx + 1}. ${m.title}: ${m.description}`)
            : ['  01. Opening premise and core mental models', '  02. Practice rituals and field notes']),
        ].join('\n'),
      },
      {
        path: `notes/${p.slug}-reading-companion.md`,
        kind: 'markdown',
        sizeLabel: '5 KB',
        summary: 'Key questions and reflection prompts distilled from the chapters.',
        excerpt: [
          `# ${name} · Reflection Prompts`,
          '',
          ...(transformations.length > 0
            ? transformations.map((t, i) => `${i + 1}. ${t}`)
            : ['1. Identify one principle from this edition to apply in this week\'s studio block.']),
        ].join('\n'),
      },
    ]
  }

  const modEntries: InspectableFileEntry[] = modules.slice(0, 3).map((m, idx) => {
    const seg = slugifySegment(m.title, idx)
    const isConfig = idx === 1 && lane !== 'creative'
    const ext = isConfig ? 'json' : 'md'
    const folder = idx === 0 ? 'architecture' : idx === 1 ? 'workflows' : 'verification'
    return {
      path: `${folder}/${seg}.${ext}`,
      kind: isConfig ? 'json' : 'markdown',
      sizeLabel: `${6 + idx * 3} KB`,
      summary: m.description,
      excerpt: isConfig
        ? JSON.stringify(
            {
              product: p.slug,
              module: m.title,
              purpose: m.description,
              verificationRequired: true,
            },
            null,
            2,
          )
        : [
            `# ${m.title}`,
            '',
            m.description,
            '',
            '## Operational checklist',
            ...(transformations.slice(0, 2).map((t) => `- [ ] ${t}`)),
          ].join('\n'),
    }
  })

  return [
    {
      path: 'PRODUCT.md',
      kind: 'markdown',
      sizeLabel: '4 KB',
      summary: `Scope, setup prerequisites, and delivery verification for ${name}.`,
      excerpt: [
        `# ${name}`,
        `SKU: ${p.slug} · Category: ${p.category ?? 'Digital System'}`,
        '',
        p.promise ?? p.headline ?? name,
        '',
        '## Outcomes',
        ...(transformations.slice(0, 3).map((t) => `- ${t}`)),
      ].join('\n'),
    },
    ...modEntries,
  ]
}

function buildDefaultBoundaries(p: any, lane: ProductLane): { buyIf: string[]; skipIf: string[] } {
  const isFree = (p.offer?.primaryPrice ?? p.price ?? 0) === 0
  if (lane === 'books') {
    return {
      buyIf: [
        `You want a focused, distraction-free PDF or web edition of ${p.name ?? p.title}.`,
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
          ? 'You want a structured diagnostic reference before committing build hours to a new offer.'
          : 'You already ship technical or creative work and want clean local tracking and packaging templates.',
      ],
      skipIf: [
        'You are looking for effortless earnings claims or hands-off financial schemes.',
        'You prefer opaque SaaS dashboards over local markdown, JSON, and SQLite files.',
      ],
    }
  }
  if (lane === 'creative') {
    return {
      buyIf: [
        'You want repeatable studio workflows, prompt structures, and quality checklists for creative output.',
        'You prefer inspectable templates you can adapt to your own brand voice and aesthetic.',
      ],
      skipIf: [
        'You want one-click unreviewed content generation with zero human taste direction.',
        'You do not work with AI audio, visual, or editorial tools in your current projects.',
      ],
    }
  }
  return {
    buyIf: [
      'You work in Git, Markdown, and CLI agent tools and want portable, inspectable configurations.',
      'You value explicit verification gates and clear file boundaries over black-box automation.',
    ],
    skipIf: [
      'You want a hosted no-code SaaS subscription rather than local repository files.',
      'You prefer not to run Node, CLI scripts, or markdown workflows on your own machine.',
    ],
  }
}

export const PRODUCT_PREVIEW_MANIFESTS: Record<string, ProductPreviewManifest> = Object.fromEntries(
  (rawProducts as any[]).flatMap((p) => {
    const name = p.name ?? p.title ?? p.slug
    const lane = classifyLane(p.id, p.category ?? '')
    const override = BESPOKE_OVERRIDES[p.id] ?? {}
    const defaults = buildDefaultBoundaries(p, lane)
    const isDirect = LIVE_DIRECT_SLUGS.has(p.slug)

    const manifest: ProductPreviewManifest = {
      productId: p.id,
      slug: p.slug,
      name,
      lane,
      plateSvg: `/images/products/plates/${p.slug}.svg`,
      archiveName: override.archiveName ?? `${p.slug}-pack/`,
      deliveryStatusLabel: isDirect ? 'Public access live' : 'Preview · Waitlist open',
      buyIf: override.buyIf ?? defaults.buyIf,
      skipIf: override.skipIf ?? defaults.skipIf,
      files: override.files ?? buildDefaultFiles(p, lane),
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
