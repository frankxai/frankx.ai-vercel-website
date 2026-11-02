import registry from '@/data/products.json'
import type { ProductRecord } from '@/types/products'

type LegacyProductFields = {
  id: string
  slug: string
  title?: string
  description?: string
  price?: number
  category?: string
  badge?: string
  cta?: { label: string; href: string }
}

const MICRO_LADDER_SKUS: ProductRecord[] = [
  {
    id: 'reality-md-starter-pack',
    slug: 'reality-md-starter-pack',
    name: 'reality.md Starter Pack',
    category: 'Creator Systems',
    badge: 'MICRO SKU · $1',
    headline: 'Give Every AI Agent Your Exact Operating Context in One File.',
    subheadline: 'The canonical personal operating context template, 5-guardrail contract, and verification checklist for Claude Code, Codex, and Cursor.',
    promise: 'Stop repeating your stack, rules, and voice in every session. Drop reality.md into your workspace and align every agent in 5 minutes.',
    summary: 'Self-serve starter pack containing the annotated reality.md template, AGENTS.md band contract, and 10 high-leverage context prompts.',
    transformation: [
      'Eliminate context drift across Claude Code, Codex, Gemini, and Cursor sessions',
      'Lock your non-waivable rules, brand voice, and repo map into a single versioned file',
      'Verify agent alignment with a 5-minute deterministic startup checklist',
    ],
    socialProof: {
      stats: [
        { number: '$1', label: 'Instant Self-Serve Download' },
        { number: '5 min', label: 'Setup Time' },
      ],
      quotes: [],
    },
    offer: {
      primaryPrice: 1,
      primaryPriceDisplay: '$1',
      currency: 'USD',
      ctaPrimary: 'Get Starter Pack — $1',
      ctaPrimaryHref: '/checkout/reality-md-starter-pack',
      ctaPrimaryTracking: 'reality-md-starter-pack-primary',
      guarantee: {
        label: 'Instant Digital Delivery',
        description: 'Immediate markdown + PDF template bundle after checkout.',
      },
    },
    modules: [
      {
        title: 'Annotated reality.md Template',
        description: 'Ready-to-fill personal operating context covering identity, mission, stack, and non-waivable boundaries.',
      },
      {
        title: 'Multi-Harness Bootstrap Contract',
        description: 'Drop-in AGENTS.md and CLAUDE.md pointer rules so every local and cloud agent reads the same truth.',
      },
    ],
    pricingTiers: [
      {
        name: 'Starter Pack',
        price: '$1',
        description: 'Complete markdown + PDF starter bundle.',
        features: ['Annotated reality.md template', 'AGENTS.md wiring guide', '10 verification prompts'],
        ctaLabel: 'Download for $1',
        ctaHref: '/checkout/reality-md-starter-pack',
        featured: true,
      },
    ],
    faq: [
      {
        question: 'Which AI tools work with reality.md?',
        answer: 'Any tool that reads local markdown files: Claude Code, OpenAI Codex, Cursor, Windsurf, Google Antigravity, and OpenCode.',
      },
    ],
    analyticsId: 'reality-md-starter-pack',
    delivery: {
      methods: ['download', 'email'],
      requiresEmail: true,
      files: [
        {
          name: 'reality-md-starter-pack.zip',
          format: 'zip',
          blobKey: 'products/reality-md-starter-pack/reality-md-starter-pack.zip',
          description: 'reality.md template + multi-harness bootstrap guide',
        },
      ],
    },
  },
  {
    id: 'suno-power-pack-25',
    slug: 'suno-power-pack-25',
    name: '25 Suno Power Prompts Pack',
    category: 'Creative AI',
    badge: 'QUICK WIN · $7',
    headline: '25 Studio-Tested Suno v4 Prompts That Produce Release-Ready Tracks.',
    subheadline: 'Curated from 845+ production sessions across Cinematic, Electronic, Neo-Classical, and Focus Ambient genres.',
    promise: 'Skip wasted credits and muddied mixes. Copy, paste, and customize 25 proven meta-tag architectures in under 10 minutes.',
    summary: 'Self-serve micro-pack of our 25 highest-converting Suno prompt architectures with structural metatags and vocal/instrumental controls.',
    transformation: [
      'Master structural metatags ([Intro], [Build], [Drop], [Bridge]) for predictable song arrangement',
      'Dial in clean genre fusion without vocal bleed or muddied low-end',
      'Upgrade seamlessly to the full 150+ Suno Prompt Library whenever you are ready',
    ],
    socialProof: {
      stats: [
        { number: '25', label: 'Studio-Tested Prompts' },
        { number: '$7', label: 'Self-Serve Micro Pack' },
      ],
      quotes: [],
    },
    offer: {
      primaryPrice: 7,
      primaryPriceDisplay: '$7',
      currency: 'USD',
      ctaPrimary: 'Get 25 Power Prompts — $7',
      ctaPrimaryHref: '/checkout/suno-power-pack-25',
      ctaPrimaryTracking: 'suno-power-pack-25-primary',
      guarantee: {
        label: '30-Day Satisfaction Guarantee',
        description: 'Full refund or credit toward the $27 Complete Suno Prompt Library.',
      },
    },
    modules: [
      {
        title: '25 Genre-Calibrated Prompt Templates',
        description: 'Exact style, instrumentation, tempo, and production tags tested across hundreds of generations.',
      },
      {
        title: 'Meta-Tag Arrangement Cheat Sheet',
        description: 'One-page reference for controlling dynamics, transitions, and instrumental breaks.',
      },
    ],
    pricingTiers: [
      {
        name: '25 Power Prompts Pack',
        price: '$7',
        description: 'Instant PDF + Notion prompt pack.',
        features: ['25 studio-tested prompts', 'Meta-tag cheat sheet', 'Commercial workflow tips'],
        ctaLabel: 'Get Pack for $7',
        ctaHref: '/checkout/suno-power-pack-25',
        featured: true,
      },
    ],
    faq: [
      {
        question: 'How does this differ from the $27 Suno Prompt Library?',
        answer: 'This $7 pack gives you our top 25 starter prompts for immediate results. The $27 library expands to 150+ prompts across 12 genres with the full Notion database.',
      },
    ],
    analyticsId: 'suno-power-pack-25',
    delivery: {
      methods: ['download', 'email'],
      requiresEmail: true,
      files: [
        {
          name: 'suno-power-pack-25.pdf',
          format: 'pdf',
          blobKey: 'products/suno-power-pack-25/suno-power-pack-25.pdf',
          description: '25 Studio-Tested Suno Power Prompts + Meta-Tag Cheat Sheet',
        },
      ],
    },
  },
]

export function normalizeProductRecord(raw: ProductRecord | LegacyProductFields): ProductRecord {
  const rec = raw as ProductRecord & LegacyProductFields
  const isLegacy = !rec.offer || !rec.name || !Array.isArray(rec.transformation)

  const normalized: ProductRecord = isLegacy
    ? {
        id: rec.id,
        slug: rec.slug,
        name: rec.name ?? rec.title ?? rec.slug,
        category: rec.category ?? 'Books & Guides',
        badge: rec.badge ?? 'BOOK',
        headline: rec.headline ?? rec.title ?? rec.description ?? '',
        subheadline: rec.subheadline ?? rec.description ?? '',
        promise: rec.promise ?? rec.description ?? '',
        summary: rec.summary ?? rec.description ?? '',
        transformation: Array.isArray(rec.transformation)
          ? rec.transformation
          : [
              'Read the complete essays and synthesis directly in the web reader',
              'Apply practical creator and systems frameworks at your own pace',
              'Download companion templates and reference checklists',
            ],
        socialProof: rec.socialProof ?? {
          stats: [{ number: rec.price === 0 ? 'Free' : `$${rec.price ?? 0}`, label: 'Reader Access' }],
          quotes: [],
        },
        offer: rec.offer ?? {
          primaryPrice: rec.price ?? 0,
          primaryPriceDisplay: rec.price === 0 ? 'Free Online Reader' : `$${rec.price ?? 0}`,
          currency: 'USD',
          ctaPrimary: rec.cta?.label ?? 'Read Online',
          ctaPrimaryHref: rec.cta?.href ?? `/products/${rec.slug}`,
          ctaPrimaryTracking: `${rec.slug}-primary`,
          guarantee: {
            label: 'Open Reader Access',
            description: 'Read immediately in your browser with zero friction.',
          },
        },
        modules: Array.isArray(rec.modules) ? rec.modules : [],
        pricingTiers: Array.isArray(rec.pricingTiers) ? rec.pricingTiers : [],
        faq: Array.isArray(rec.faq) ? rec.faq : [],
        analyticsId: rec.analyticsId ?? rec.id,
        delivery: rec.delivery,
      }
    : { ...rec }

  // Enforce TRUTH.md §1 & §2: DIY / self-serve only; strip legacy 1:1 consulting or retainer offers
  if (normalized.id === 'founders-circle-guild') {
    normalized.transformation = normalized.transformation.map((line) =>
      line.replace(/1:1 architectural reviews/gi, 'asynchronous blueprint reviews')
    )
    if (Array.isArray(normalized.pricingTiers)) {
      normalized.pricingTiers = normalized.pricingTiers.map((tier) =>
        tier.name.includes('1:1') || tier.ctaHref?.includes('/consulting')
          ? {
              ...tier,
              name: 'Team Blueprint License',
              price: '$497',
              description: 'Self-serve multi-seat architecture blueprints, evaluation harnesses, and async audit checklists.',
              features: [
                'Multi-seat blueprint & repo template license',
                'Deterministic evaluation & governance scripts',
                'Self-paced implementation playbooks',
              ],
              ctaLabel: 'Join Waitlist',
              ctaHref: '/waitlist?intent=founders-circle-guild',
            }
          : tier
      )
    }
  }

  return normalized
}

const baseProducts = (registry as Array<ProductRecord | LegacyProductFields>).map(normalizeProductRecord)
const existingIds = new Set(baseProducts.map((p) => p.id))
export const products: ProductRecord[] = [
  ...baseProducts,
  ...MICRO_LADDER_SKUS.filter((sku) => !existingIds.has(sku.id)),
]

export type ProductCard = {
  id: string
  name: string
  headline: string
  summary: string
  badge?: string
  category?: string
  href: string
  primaryCtaHref?: string
  primaryCtaLabel?: string
  price: number
  priceDisplay?: string
  currency?: string
  isWaitlist?: boolean
  originalPrice?: number
  highlights: string[]
  testimonial?: {
    text: string
    author: string
    role?: string
  }
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

/**
 * Get products with downloadable files
 */
export function getDownloadableProducts() {
  return products.filter((product) => product.delivery?.files?.length)
}

/**
 * Check if product requires email for download
 */
export function requiresEmailCapture(product: ProductRecord): boolean {
  return product.delivery?.requiresEmail === true
}

/**
 * Get delivery methods for a product
 */
export function getDeliveryMethods(product: ProductRecord) {
  return product.delivery?.methods ?? []
}

export function getProductCards(): ProductCard[] {
  return products
    .filter((product) => !product.id.includes('arcanea') && !product.slug?.includes('arcanea'))
    .map((product) => {
      const firstQuote = product.socialProof?.quotes?.[0]
      const legacy = product as ProductRecord & {
        title?: string
        description?: string
        price?: number
        cta?: { label: string; href: string }
      }

      const price = product.offer?.primaryPrice ?? legacy.price ?? 0
      const currency = product.offer?.currency ?? 'USD'
      const priceDisplay =
        product.offer?.primaryPriceDisplay ??
        (price === 0 ? 'Free' : currency === 'EUR' ? `€${price}` : `$${price}`)

      const isWaitlist = Boolean(
        product.offer?.ctaPrimary?.toLowerCase().includes('waitlist') ||
        product.offer?.ctaPrimaryHref?.startsWith('/waitlist') ||
        legacy.cta?.label?.toLowerCase().includes('waitlist')
      )

      const primaryCtaHref = isWaitlist
        ? (product.offer?.ctaPrimaryHref ?? `/waitlist?intent=${product.slug}`)
        : (price === 0
            ? (product.offer?.ctaPrimaryHref ?? legacy.cta?.href ?? `/products/${product.slug}`)
            : (product.offer?.ctaPrimaryHref ?? `/checkout/${product.slug}`))

      const primaryCtaLabel =
        product.offer?.ctaPrimary ??
        legacy.cta?.label ??
        (isWaitlist ? 'Join Waitlist' : (price === 0 ? 'Free Access' : 'Acquire'))

      return {
        id: product.id,
        name: product.name ?? legacy.title ?? product.slug,
        headline: product.headline ?? legacy.description ?? '',
        summary: product.summary ?? product.promise ?? legacy.description ?? '',
        badge: product.badge,
        category: product.category,
        href: `/products/${product.slug}`,
        primaryCtaHref,
        primaryCtaLabel,
        price,
        priceDisplay,
        currency,
        isWaitlist,
        originalPrice: product.offer?.originalPrice,
        highlights: product.transformation?.slice(0, 3) ?? [],
        testimonial: firstQuote
          ? {
              text: firstQuote.quote,
              author: firstQuote.author,
              role: firstQuote.role,
            }
          : undefined,
      }
    })
}
