/**
 * Portfolio Product Registry — machine-readable Launch OS SSOT
 *
 * Single kernel for multi-brand digital products, MoR rails, fulfillment,
 * and discovery probes. UI hubs, checkout, and webhooks should resolve here
 * (or via thin adapters over products.ts / products.json / templates.json).
 *
 * Doctrine: docs/strategy/PORTFOLIO_PRODUCT_MODEL_LAUNCH_OS.md (FrankX repo)
 * Epic: frankxai/FrankX#124 Commerce Foundation
 */

export type BrandId = 'frankx' | 'gencreator' | 'arcanea' | 'starlight'
export type DoorId = 'architect' | 'builder' | 'creator-operator' | 'reader-ip'
export type MerchOfRecord = 'stripe' | 'stripe_managed' | 'polar' | 'lemon_squeezy' | 'whop' | 'skool' | 'gumroad' | 'etsy' | 'kdp' | 'none'
export type ProductStatus = 'draft' | 'waitlist' | 'preorder' | 'active' | 'sunset'
export type DeliveryMode = 'instant' | 'staged' | 'cohort' | 'application-review' | 'membership'
export type Cadence = 'free' | 'lifetime' | 'subscription' | 'application'

export interface Money {
  eur: number
  usd?: number
}

export interface CheckoutRefs {
  /** Primary MoR for this SKU — only one primary */
  primaryMor: MerchOfRecord
  stripePriceIdEnv?: string
  lemonSqueezyVariantId?: string
  polarProductId?: string
  whopProductId?: string
  skoolCommunityUrl?: string
  gumroadUrl?: string
  /** Owned success path after payment */
  successPath?: string
}

export interface FulfillmentSpec {
  mode: DeliveryMode
  decoupledFromFrank: boolean
  refundDays: number
  assets?: string[]
  communityGrant?: 'discord' | 'skool' | 'circle' | 'none'
  githubRepo?: string
  emailTemplateId?: string
}

export interface PortfolioSku {
  id: string
  slug: string
  brand: BrandId
  doors: DoorId[]
  title: string
  subtitle: string
  /** Buyer-language one-liner — no AI-slop */
  hook: string
  status: ProductStatus
  cadence: Cadence
  price: Money
  featured?: boolean
  /** Canonical marketing path on frankx.ai */
  path: string
  checkout: CheckoutRefs
  fulfillment: FulfillmentSpec
  outcomes: string[]
  notFor: string[]
  /** Link into legacy catalogs while reconciling */
  legacy?: {
    productsTsSlug?: string
    productsJsonId?: string
    templatesJsonId?: string
  }
  analyticsId: string
}

export interface PlatformProbe {
  id: string
  platform: MerchOfRecord | 'vercel_owned'
  role: 'canonical' | 'discovery' | 'community' | 'books' | 'excluded'
  notes: string
  enabled: boolean
}

/** Platform matrix — keep in sync with Launch OS doc */
export const platformMatrix: PlatformProbe[] = [
  {
    id: 'vercel-owned',
    platform: 'vercel_owned',
    role: 'canonical',
    notes: 'frankx.ai products hub is the only canonical catalog front door',
    enabled: true,
  },
  {
    id: 'stripe-owned',
    platform: 'stripe',
    role: 'canonical',
    notes: 'Default owned checkout rail when tax/ops ready',
    enabled: true,
  },
  {
    id: 'polar-dev',
    platform: 'polar',
    role: 'canonical',
    notes: 'Preferred MoR for developer-native / agentic SKUs',
    enabled: true,
  },
  {
    id: 'ls-digital',
    platform: 'lemon_squeezy',
    role: 'canonical',
    notes: 'Digital licenses; evaluate vs Polar / Stripe Managed per SKU',
    enabled: true,
  },
  {
    id: 'whop-probe',
    platform: 'whop',
    role: 'discovery',
    notes: 'Measured discovery for packs and memberships',
    enabled: true,
  },
  {
    id: 'skool-guild',
    platform: 'skool',
    role: 'community',
    notes: 'GenCreator Guild initial community surface',
    enabled: true,
  },
  {
    id: 'gumroad-longtail',
    platform: 'gumroad',
    role: 'discovery',
    notes: 'Long-tail skill packs only — not primary income path',
    enabled: true,
  },
  {
    id: 'etsy-arcanea',
    platform: 'etsy',
    role: 'discovery',
    notes: 'Arcanea templates / creative printables',
    enabled: true,
  },
  {
    id: 'kdp-books',
    platform: 'kdp',
    role: 'books',
    notes: 'Evergreen residual for books',
    enabled: true,
  },
  {
    id: 'ebay',
    platform: 'none',
    role: 'excluded',
    notes: 'Excluded by brand and digital-goods policy fit',
    enabled: false,
  },
]

/**
 * P0 portfolio SKUs — DIY / self-service first.
 * Prices are hypotheses until Frank approves (human gate).
 */
export const portfolioSkus: PortfolioSku[] = [
  {
    id: 'six-primitives-primer',
    slug: 'six-primitives-primer',
    brand: 'frankx',
    doors: ['builder', 'architect', 'creator-operator'],
    title: 'Six Primitives Primer',
    subtitle: 'Free mental model + 10-day email course',
    hook: 'No card. No login. Just a clean agent model you can use tomorrow.',
    status: 'active',
    cadence: 'free',
    price: { eur: 0 },
    featured: false,
    path: '/products/six-primitives',
    checkout: { primaryMor: 'none', successPath: '/downloads/six-primitives-primer' },
    fulfillment: {
      mode: 'instant',
      decoupledFromFrank: true,
      refundDays: 0,
      assets: ['pdf-handout', 'email-course', 'github-starter'],
      communityGrant: 'none',
    },
    outcomes: [
      'Name the six primitives without notes',
      'Diagram an agent loop in 60 seconds',
      'Pick a first stack from the transfer matrix',
    ],
    notFor: ['Teams needing enterprise CoE governance on day one'],
    legacy: { productsTsSlug: 'six-primitives-primer' },
    analyticsId: 'sku_six_primitives_primer',
  },
  {
    id: 'six-primitives-pack',
    slug: 'six-primitives-pack',
    brand: 'frankx',
    doors: ['builder'],
    title: 'Six Primitives Pack',
    subtitle: 'Pocket book + Agent Cards that ship a first agent cleanly',
    hook: 'A polished bundle for the price of a coffee — real artifacts, not theory.',
    status: 'waitlist',
    cadence: 'lifetime',
    price: { eur: 7, usd: 8 },
    path: '/products/six-primitives',
    checkout: {
      primaryMor: 'stripe',
      stripePriceIdEnv: 'STRIPE_PRICE_SIX_PRIMITIVES_PACK',
      lemonSqueezyVariantId: '',
      successPath: '/checkout/success',
    },
    fulfillment: {
      mode: 'instant',
      decoupledFromFrank: true,
      refundDays: 30,
      assets: ['pocket-book', 'agent-cards-5', 'eval-15', 'vercel-checklist'],
      communityGrant: 'none',
    },
    outcomes: [
      'Ship a first agent with a validated Agent Card',
      'Run a 15-case eval starter suite',
      'Deploy with a one-page checklist',
    ],
    notFor: ['Anyone who has not skimmed the free Primer'],
    legacy: { productsTsSlug: 'six-primitives-pack' },
    analyticsId: 'sku_six_primitives_pack',
  },
  {
    id: 'six-primitives-toolkit',
    slug: 'six-primitives-toolkit',
    brand: 'frankx',
    doors: ['builder', 'architect'],
    title: 'Six Primitives Toolkit',
    subtitle: 'Production patterns, multi-stack deep-dives, practitioner community',
    hook: 'The workhorse tier. Most builders stop here and get years of leverage.',
    status: 'waitlist',
    cadence: 'lifetime',
    price: { eur: 197, usd: 215 },
    featured: true,
    path: '/products/six-primitives',
    checkout: {
      primaryMor: 'stripe',
      stripePriceIdEnv: 'STRIPE_PRICE_SIX_PRIMITIVES_TOOLKIT',
      lemonSqueezyVariantId: '',
      polarProductId: '',
      successPath: '/checkout/success',
    },
    fulfillment: {
      mode: 'instant',
      decoupledFromFrank: true,
      refundDays: 30,
      assets: ['branch-videos-6', 'agent-cards-30', 'cookbook-50', 'evals-100', 'observability'],
      communityGrant: 'discord',
    },
    outcomes: [
      'Re-implement one agent across six stacks',
      'Apply 50+ production patterns',
      'Stand up cost and trace observability',
    ],
    notFor: ['Curious readers who have not shipped a first agent'],
    legacy: { productsTsSlug: 'six-primitives-toolkit' },
    analyticsId: 'sku_six_primitives_toolkit',
  },
  {
    id: 'ai-team-blueprint',
    slug: 'ai-team-blueprint',
    brand: 'frankx',
    doors: ['architect', 'builder'],
    title: 'AI Team Blueprint',
    subtitle: 'Map, roles, and operating cadence for a high-agency AI team',
    hook: 'Stop hiring vibes. Install a team architecture you can run this quarter.',
    status: 'preorder',
    cadence: 'lifetime',
    price: { eur: 297, usd: 320 },
    path: '/products/ai-team-blueprint',
    checkout: {
      primaryMor: 'stripe',
      stripePriceIdEnv: 'STRIPE_PRICE_AI_TEAM_BLUEPRINT',
      successPath: '/checkout/success',
    },
    fulfillment: {
      mode: 'instant',
      decoupledFromFrank: true,
      refundDays: 30,
      assets: ['team-map', 'role-cards', 'cadence', 'eval-scorecards'],
      communityGrant: 'none',
    },
    outcomes: [
      'Publish a one-page AI team map',
      'Assign owner per agentic capability',
      'Run a weekly operating cadence with scorecards',
    ],
    notFor: ['Solo hobbyists without a team or client load'],
    analyticsId: 'sku_ai_team_blueprint',
  },
  {
    id: 'arcanea-world-seed-kit',
    slug: 'arcanea-world-seed-kit',
    brand: 'arcanea',
    doors: ['creator-operator', 'reader-ip'],
    title: 'Arcanea World Seed Kit',
    subtitle: 'Canon-safe world seed, character sparks, and scene prompts',
    hook: 'A complete creative seed you can grow — not a lore dump.',
    status: 'preorder',
    cadence: 'lifetime',
    price: { eur: 79, usd: 85 },
    path: '/products/arcanea-world-seed',
    checkout: {
      primaryMor: 'lemon_squeezy',
      lemonSqueezyVariantId: '',
      successPath: '/checkout/success',
    },
    fulfillment: {
      mode: 'instant',
      decoupledFromFrank: true,
      refundDays: 30,
      assets: ['world-seed', 'character-sparks', 'scene-prompts', 'visual-brief'],
      communityGrant: 'none',
    },
    outcomes: [
      'Stand up a coherent world bible stub in one sitting',
      'Generate three on-brand scenes from the seed',
      'Export social-ready prompt packs',
    ],
    notFor: ['Buyers seeking official Arcanea canon rights for commercial franchises'],
    analyticsId: 'sku_arcanea_world_seed',
  },
  {
    id: 'gencreator-guild',
    slug: 'gencreator-guild',
    brand: 'gencreator',
    doors: ['creator-operator', 'builder'],
    title: 'GenCreator Guild',
    subtitle: 'Monthly operating room for creators shipping with agents',
    hook: 'Continuity beats another abandoned course. Show up, ship, improve.',
    status: 'waitlist',
    cadence: 'subscription',
    price: { eur: 49, usd: 54 },
    path: '/products/gencreator-guild',
    checkout: {
      primaryMor: 'skool',
      skoolCommunityUrl: '',
      stripePriceIdEnv: 'STRIPE_PRICE_GENCREATOR_GUILD_MONTHLY',
      successPath: '/checkout/success',
    },
    fulfillment: {
      mode: 'membership',
      decoupledFromFrank: true,
      refundDays: 14,
      communityGrant: 'skool',
      assets: ['monthly-packs', 'office-hours-async', 'template-drops'],
    },
    outcomes: [
      'Run a monthly creator operating loop',
      'Ship one public artifact per month with peer review',
      'Access living skill packs as they drop',
    ],
    notFor: ['People who want 1:1 coaching disguised as community'],
    analyticsId: 'sku_gencreator_guild',
  },
  {
    id: 'vibe-os',
    slug: 'vibe-os',
    brand: 'frankx',
    doors: ['creator-operator'],
    title: 'Vibe OS',
    subtitle: 'Suno music mastery systems Frank actually uses',
    hook: 'Prompt packs, emotion maps, and production checklists — not generic AI music hype.',
    status: 'active',
    cadence: 'lifetime',
    price: { eur: 47, usd: 49 },
    featured: true,
    path: '/products/vibe-os',
    checkout: {
      primaryMor: 'stripe',
      stripePriceIdEnv: 'STRIPE_PRICE_VIBE_OS',
      successPath: '/checkout/success',
    },
    fulfillment: {
      mode: 'instant',
      decoupledFromFrank: true,
      refundDays: 30,
      assets: ['prompt-packs', 'emotion-map', 'production-checklist'],
      communityGrant: 'none',
    },
    outcomes: [
      'Generate on-brief tracks faster with genre systems',
      'Map emotion to sound choices deliberately',
      'Ship a release-ready checklist per track',
    ],
    notFor: ['Producers who already have a locked custom Suno OS'],
    legacy: { productsJsonId: 'vibe-os' },
    analyticsId: 'sku_vibe_os',
  },
  {
    id: 'creators-soulbook',
    slug: 'creators-soulbook',
    brand: 'frankx',
    doors: ['reader-ip', 'creator-operator'],
    title: "The Creator's Soulbook",
    subtitle: 'Life architecture OS with Obsidian vault',
    hook: 'Seven pillars. Real reflection systems. Free forever.',
    status: 'active',
    cadence: 'free',
    price: { eur: 0 },
    featured: true,
    path: '/soulbook',
    checkout: { primaryMor: 'none', successPath: '/soulbook/vault' },
    fulfillment: {
      mode: 'instant',
      decoupledFromFrank: true,
      refundDays: 0,
      assets: ['obsidian-vault', 'prompts-25', 'pillars-framework'],
      communityGrant: 'none',
    },
    outcomes: [
      'Map seven life pillars with structured exercises',
      'Choose a transformation lens that fits',
      'Install a ready Obsidian vault',
    ],
    notFor: [],
    legacy: { productsJsonId: 'creators-soulbook' },
    analyticsId: 'sku_creators_soulbook',
  },
  {
    id: 'starlight-agentic-architecture-pack',
    slug: 'starlight-agentic-architecture-pack',
    brand: 'starlight',
    doors: ['architect'],
    title: 'Starlight Agentic Architecture Pack',
    subtitle: 'Evidence-gated architecture education and patterns',
    hook: 'Substrate patterns without the hype — architecture you can defend.',
    status: 'waitlist',
    cadence: 'lifetime',
    price: { eur: 997, usd: 1080 },
    path: '/products/starlight-architecture',
    checkout: {
      primaryMor: 'polar',
      polarProductId: '',
      stripePriceIdEnv: 'STRIPE_PRICE_STARLIGHT_ARCH',
      successPath: '/checkout/success',
    },
    fulfillment: {
      mode: 'instant',
      decoupledFromFrank: true,
      refundDays: 30,
      assets: ['architecture-pack', 'eval-harness', 'governance-templates'],
      communityGrant: 'discord',
    },
    outcomes: [
      'Document an agentic architecture with evidence links',
      'Run governance and eval templates on a real system',
      'Brief stakeholders with a defensible narrative',
    ],
    notFor: ['Buyers wanting a hosted Starlight SaaS seat'],
    legacy: { productsTsSlug: 'six-primitives-architect' },
    analyticsId: 'sku_starlight_architecture',
  },
]

export function getSkuById(id: string): PortfolioSku | undefined {
  return portfolioSkus.find((s) => s.id === id || s.slug === id)
}

export function getSkusByBrand(brand: BrandId): PortfolioSku[] {
  return portfolioSkus.filter((s) => s.brand === brand)
}

export function getSkusByDoor(door: DoorId): PortfolioSku[] {
  return portfolioSkus.filter((s) => s.doors.includes(door))
}

export function getPublicSkus(): PortfolioSku[] {
  return portfolioSkus.filter((s) => s.status === 'active' || s.status === 'preorder' || s.status === 'waitlist')
}

export function getFeaturedSkus(): PortfolioSku[] {
  return portfolioSkus.filter((s) => s.featured)
}

export function getCheckoutReadySkus(): PortfolioSku[] {
  return portfolioSkus.filter((s) => {
    if (s.cadence === 'free' || s.checkout.primaryMor === 'none') return false
    const c = s.checkout
    if (c.primaryMor === 'stripe' && c.stripePriceIdEnv) return true
    if (c.primaryMor === 'lemon_squeezy' && c.lemonSqueezyVariantId) return true
    if (c.primaryMor === 'polar' && c.polarProductId) return true
    if (c.primaryMor === 'skool' && c.skoolCommunityUrl) return true
    return false
  })
}

/** Hub card model for premium products index */
export function toHubCards() {
  return getPublicSkus().map((s) => ({
    id: s.id,
    name: s.title,
    tagline: s.subtitle,
    description: s.hook,
    status:
      s.status === 'active'
        ? 'active'
        : s.status === 'preorder'
          ? 'preorder'
          : s.status === 'waitlist'
            ? 'early-access'
            : 'draft',
    href: s.path,
    brand: s.brand,
    priceEur: s.price.eur,
    featured: Boolean(s.featured),
    highlights: s.outcomes.slice(0, 3),
    analyticsId: s.analyticsId,
  }))
}
