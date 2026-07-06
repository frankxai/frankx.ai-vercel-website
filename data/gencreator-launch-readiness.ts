export type LaunchReadinessStatus =
  | 'ready'
  | 'preview'
  | 'waitlist'
  | 'needs-build'
  | 'paused'

export type OfferTrack = 'create' | 'build' | 'sell' | 'life' | 'books'

export interface LaunchReadinessItem {
  id: string
  slug: string
  name: string
  track: OfferTrack
  tier: 'free' | 'low-ticket' | 'flagship' | 'advanced' | 'high-ticket'
  price: string
  route: string
  status: LaunchReadinessStatus
  ctaLabel: string
  ctaHref: string
  promise: string
  audience: string
  proof: string
  ownerAction: string
  showInShop: boolean
}

export const genCreatorPositioning = {
  headline:
    'GenCreator helps creators build personal AI operating systems that turn ideas into shipped work, audience, products, and revenue.',
  short: 'Build your personal AI operating system. Create, build, sell, and compound.',
  brandOrder: [
    'GenCreator by FrankX is the launch identity.',
    'Agentic Creator is the advanced builder track inside GenCreator.',
    'AI Architect Academy is delayed until the creator funnel is proven.',
  ],
}

export const genCreatorPaths = [
  {
    id: 'create',
    label: 'Create',
    title: 'I create content or music',
    route: '/music-lab',
    cta: 'Enter Create Track',
    description:
      'Turn prompts, taste, and tools into published songs, posts, books, and visible artifacts.',
  },
  {
    id: 'build',
    label: 'Build',
    title: 'I build AI systems',
    route: '/courses/build-your-ai-creator-os',
    cta: 'Build Your AI Creator OS',
    description:
      'Use Claude Code, agents, n8n, Vercel, and MCP to build a personal operating system.',
  },
  {
    id: 'sell',
    label: 'Sell',
    title: 'I want to sell my expertise',
    route: '/products',
    cta: 'Explore Offer Ladder',
    description:
      'Package your work into products, workshops, templates, newsletters, and systems people can buy.',
  },
] as const

export const flagshipOffer = {
  id: 'build-your-ai-creator-os',
  name: 'Build Your AI Creator OS',
  betaPrice: '$497 beta',
  fullPrice: '$997 full',
  route: '/courses/build-your-ai-creator-os',
  ctaHref: '/courses/build-your-ai-creator-os#apply',
  ctaLabel: 'Join Beta Waitlist',
  promise:
    'An 8-week GenCreator implementation lab where every member ships a personal AI OS and one public asset.',
  includes: [
    '8 implementation modules',
    'Weekly live labs',
    'Free Skool community plus cohort channels',
    'Claude Code, n8n, Vercel, MCP, and template workflows',
    'One shipped public artifact',
  ],
}

export const offerLadder = [
  {
    tier: 'Free',
    price: '$0',
    role: 'Trust and capture',
    offers: 'Starter Kit, newsletter, free Skool invite, Soulbook, books, 5 Suno prompts, assessment',
  },
  {
    tier: 'Low-ticket',
    price: '$27-$97',
    role: 'First purchase',
    offers: 'Suno Prompt Library, Creative AI Toolkit, Prompt Starter, Agentic Builder Pack',
  },
  {
    tier: 'Flagship',
    price: '$497 beta / $997 full',
    role: 'Core transformation',
    offers: 'Build Your AI Creator OS',
  },
  {
    tier: 'Advanced',
    price: '$1,497-$2,500',
    role: 'Technical acceleration',
    offers: 'Agentic Creator Lab',
  },
  {
    tier: 'High-ticket',
    price: 'from $4,800',
    role: 'Done-with-you implementation',
    offers: 'Creator Studio OS Sprint',
  },
] as const

export const communityLaunch = {
  model: 'One free Skool community first; paid access only as part of cohorts or labs.',
  freeChannels: ['Start Here', 'Wins', 'AI Creator OS', 'Music Lab', 'Agentic Builder', 'Office Hours'],
  ctaHref: '/newsletter?ref=gencreator-skool-invite',
  ctaLabel: 'Get Free Skool Invite',
  ownerAction: 'Paste verified Skool invite URL into the registry before linking directly.',
}

export const templateBundles = [
  {
    id: 'prompt-starter',
    name: 'Prompt Starter',
    price: '$59 bundle target',
    includes: 'Suno Prompt Library + Creative AI Toolkit',
    status: 'needs-build' as const,
    ownerAction: 'Verify both checkout destinations and create bundle delivery.',
  },
  {
    id: 'gencreator-toolkit',
    name: 'GenCreator Toolkit',
    price: '$97-$197',
    includes: 'Creative AI Toolkit, starter prompts, content workflows, launch checklist',
    status: 'needs-build' as const,
    ownerAction: 'Package one coherent kit instead of scattered template listings.',
  },
  {
    id: 'agentic-builder-pack',
    name: 'Agentic Builder Pack',
    price: '$197-$297',
    includes: 'Claude Code skills, MCP configs, n8n workflows, agent blueprints',
    status: 'needs-build' as const,
    ownerAction: 'Bundle selected template inventory into one advanced builder offer.',
  },
  {
    id: 'creator-website-templates',
    name: 'Creator Website Templates',
    price: '$97-$297',
    includes: 'Next.js creator site, blog CMS, product pages, newsletter capture',
    status: 'needs-build' as const,
    ownerAction: 'Choose one flagship template and produce screenshots, demo, and delivery zip.',
  },
]

export const launchReadiness: LaunchReadinessItem[] = [
  {
    id: 'creators-soulbook',
    slug: 'soulbook',
    name: "The Creator's Soulbook",
    track: 'life',
    tier: 'free',
    price: '$0',
    route: '/soulbook',
    status: 'preview',
    ctaLabel: 'Explore Free Framework',
    ctaHref: '/soulbook',
    promise: 'Life architecture framework for creators.',
    audience: 'Creators who need personal clarity before product velocity.',
    proof: '7 pillars, AI prompts, and book-style framework already surfaced.',
    ownerAction: 'Verify gated vault/PDF delivery before claiming instant download.',
    showInShop: true,
  },
  {
    id: 'creative-ai-toolkit',
    slug: 'creative-ai-toolkit',
    name: 'Creative AI Toolkit',
    track: 'sell',
    tier: 'low-ticket',
    price: '$47',
    route: '/products/creative-ai-toolkit',
    status: 'waitlist',
    ctaLabel: 'Join Toolkit Waitlist',
    ctaHref: '/newsletter?ref=creative-ai-toolkit',
    promise: 'Prompts, workflows, and rituals for consistent creative output.',
    audience: 'Creators who want a first practical AI workflow kit.',
    proof: 'Sales copy and modules exist; delivery assets are not locally verified.',
    ownerAction: 'Confirm checkout, delivery file, onboarding email, and refund policy.',
    showInShop: true,
  },
  {
    id: 'vibe-os',
    slug: 'vibe-os',
    name: 'Vibe OS',
    track: 'create',
    tier: 'free',
    price: '$0',
    route: '/products/vibe-os',
    status: 'preview',
    ctaLabel: 'Use Free Vibe OS',
    ctaHref: '/products/vibe-os/app',
    promise: 'Creative state management for music and focused work.',
    audience: 'Music creators and builders managing creative energy.',
    proof: 'App and docs routes exist; PDF delivery still needs verification.',
    ownerAction: 'Verify downloadable guide path or remove PDF delivery promise.',
    showInShop: true,
  },
  {
    id: 'creation-chronicles',
    slug: 'creation-chronicles',
    name: 'Creation Chronicles',
    track: 'sell',
    tier: 'flagship',
    price: '$497-$997',
    route: '/products/creation-chronicles',
    status: 'waitlist',
    ctaLabel: 'Join Story System Waitlist',
    ctaHref: '/newsletter?ref=creation-chronicles',
    promise: 'Story system for authority, distribution, and revenue.',
    audience: 'Creators with ideas but no repeatable publishing engine.',
    proof: 'Strong sales architecture exists; product delivery is unverified.',
    ownerAction: 'Decide whether this is a standalone offer or module inside Build Your AI Creator OS.',
    showInShop: true,
  },
  {
    id: 'generative-creator-os',
    slug: 'generative-creator-os',
    name: 'Creator Studio OS',
    track: 'create',
    tier: 'advanced',
    price: 'Waitlist',
    route: '/products/generative-creator-os',
    status: 'waitlist',
    ctaLabel: 'Join Studio OS Waitlist',
    ctaHref: '/newsletter?ref=creator-studio-os',
    promise: 'Multi-modal creative studio system.',
    audience: 'Creators ready for multi-format production workflows.',
    proof: 'Product page exists; delivery asset not verified.',
    ownerAction: 'Rename consistently as Creator Studio OS and define paid scope.',
    showInShop: true,
  },
  {
    id: 'agentic-creator-os',
    slug: 'agentic-creator-os',
    name: 'Agentic Creator OS',
    track: 'build',
    tier: 'advanced',
    price: 'Open source + lab upsell',
    route: '/products/agentic-creator-os',
    status: 'preview',
    ctaLabel: 'Explore Agentic Track',
    ctaHref: '/products/agentic-creator-os',
    promise: 'Advanced builder layer for GenCreators ready to create agent systems.',
    audience: 'Technical creators using Claude Code, MCP, n8n, and Vercel.',
    proof: 'Docs and ACOS body of work exist; premium package delivery is not verified.',
    ownerAction: 'Keep free/open-source positioning; sell lab/cohort only after delivery is defined.',
    showInShop: true,
  },
  {
    id: 'suno-prompt-library',
    slug: 'suno-prompt-library',
    name: 'Suno Prompt Library',
    track: 'create',
    tier: 'low-ticket',
    price: '$27',
    route: '/products/suno-prompt-library',
    status: 'waitlist',
    ctaLabel: 'Join Prompt Library Waitlist',
    ctaHref: '/newsletter?ref=suno-prompt-library',
    promise: 'Battle-tested Suno prompts and production patterns.',
    audience: 'AI music creators who want better outputs quickly.',
    proof: 'Clear demand from music content; checkout/delivery assets not verified locally.',
    ownerAction: 'Verify Gumroad product and deliverable files before enabling direct checkout.',
    showInShop: true,
  },
  {
    id: 'aurora-ui-kit',
    slug: 'aurora-ui-kit',
    name: 'Aurora UI Kit',
    track: 'build',
    tier: 'low-ticket',
    price: '$19',
    route: '/products/aurora-ui-kit',
    status: 'needs-build',
    ctaLabel: 'Join Template Waitlist',
    ctaHref: '/newsletter?ref=aurora-ui-kit',
    promise: 'Design-forward UI kit and AI generation skill.',
    audience: 'Builders who want better-looking AI product pages.',
    proof: 'Product data exists; public product route and delivery zip need verification.',
    ownerAction: 'Either create public route and delivery zip or fold into Creator Website Templates.',
    showInShop: false,
  },
  {
    id: 'agentic-content-engine',
    slug: 'agentic-content-engine',
    name: 'Agentic Content Engine',
    track: 'build',
    tier: 'low-ticket',
    price: '$97',
    route: '/products/agentic-content-engine',
    status: 'needs-build',
    ctaLabel: 'Join Content Engine Waitlist',
    ctaHref: '/newsletter?ref=agentic-content-engine',
    promise: 'AI-assisted content platform and distribution engine.',
    audience: 'Creators who want a technical content system.',
    proof: 'Strong product concept; route and delivery need verification.',
    ownerAction: 'Fold into Agentic Builder Pack unless a complete demo exists.',
    showInShop: false,
  },
  {
    id: '5-suno-prompts',
    slug: '5-suno-prompts',
    name: '5 Suno Prompts',
    track: 'create',
    tier: 'free',
    price: '$0',
    route: '/music-lab',
    status: 'preview',
    ctaLabel: 'Get Music Letters',
    ctaHref: '/newsletter?ref=5-suno-prompts',
    promise: 'Free prompt sampler for AI music creators.',
    audience: 'New Suno users and music newsletter subscribers.',
    proof: 'Music Lab exists; PDF delivery path not verified.',
    ownerAction: 'Create the PDF or make the lead magnet an email series instead.',
    showInShop: true,
  },
  {
    id: 'book-love-and-poetry',
    slug: 'love-and-poetry',
    name: 'Love & Poetry',
    track: 'books',
    tier: 'free',
    price: '$0',
    route: '/books/love-and-poetry',
    status: 'preview',
    ctaLabel: 'Read Online',
    ctaHref: '/books/love-and-poetry',
    promise: 'Poetry collection for the emotional layer of the brand.',
    audience: 'Readers who connect through art, feeling, and voice.',
    proof: 'Online book route exists.',
    ownerAction: 'Verify downloadable PDF/EPUB before using download CTA.',
    showInShop: false,
  },
  {
    id: 'book-spartan-mindset',
    slug: 'spartan-mindset',
    name: 'Spartan Mindset',
    track: 'books',
    tier: 'free',
    price: '$0',
    route: '/books/spartan-mindset',
    status: 'preview',
    ctaLabel: 'Read Online',
    ctaHref: '/books/spartan-mindset',
    promise: 'Discipline and training philosophy.',
    audience: 'Readers drawn to discipline, health, and execution.',
    proof: 'Online book route exists.',
    ownerAction: 'Verify downloadable PDF/EPUB before using download CTA.',
    showInShop: false,
  },
  {
    id: 'book-self-development',
    slug: 'self-development',
    name: 'The Art of Self-Development',
    track: 'books',
    tier: 'free',
    price: '$0',
    route: '/books/self-development',
    status: 'preview',
    ctaLabel: 'Read Online',
    ctaHref: '/books/self-development',
    promise: 'Seven-pillar personal growth system.',
    audience: 'Readers entering through life architecture.',
    proof: 'Online book route exists.',
    ownerAction: 'Verify downloadable PDF/EPUB before using download CTA.',
    showInShop: false,
  },
  {
    id: 'book-imagination',
    slug: 'imagination',
    name: 'Imagination',
    track: 'books',
    tier: 'free',
    price: '$0',
    route: '/books/imagination',
    status: 'preview',
    ctaLabel: 'Read Online',
    ctaHref: '/books/imagination',
    promise: 'Creative visualization and mental models.',
    audience: 'Creators who want to strengthen imagination and taste.',
    proof: 'Online book route exists.',
    ownerAction: 'Verify downloadable PDF/EPUB before using download CTA.',
    showInShop: false,
  },
  {
    id: 'book-manifestation',
    slug: 'manifestation',
    name: 'Manifestation',
    track: 'books',
    tier: 'free',
    price: '$0',
    route: '/books/manifestation',
    status: 'preview',
    ctaLabel: 'Read Online',
    ctaHref: '/books/manifestation',
    promise: 'Reality architecture without vague mysticism.',
    audience: 'Readers drawn to intention, action, and psychological framing.',
    proof: 'Online book route exists.',
    ownerAction: 'Verify downloadable PDF/EPUB before using download CTA.',
    showInShop: false,
  },
  {
    id: 'golden-age-book',
    slug: 'golden-age',
    name: 'The Golden Age of Creators',
    track: 'books',
    tier: 'free',
    price: '$0',
    route: '/books/golden-age',
    status: 'preview',
    ctaLabel: 'Read Online',
    ctaHref: '/books/golden-age',
    promise: 'Manifesto for the creator economy and AI leverage.',
    audience: 'Creators who need the larger movement context.',
    proof: 'Book route and hero image exist.',
    ownerAction: 'Verify downloadable PDF/EPUB before using download CTA.',
    showInShop: false,
  },
]

export function getLaunchItem(id: string) {
  return launchReadiness.find((item) => item.id === id)
}

export function getShopLaunchItems() {
  return launchReadiness.filter((item) => item.showInShop)
}
