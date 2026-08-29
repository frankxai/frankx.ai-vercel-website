export type StudyCategory =
  | 'landing-page'
  | 'product-page'
  | 'dashboard'
  | 'creator-tool'
  | 'community'
  | 'component'
  | 'micro-saas'

export interface V0Study {
  id: number
  wave: 1 | 2 | 3
  title: string
  description: string
  category: StudyCategory
  chatId: string
  demoUrl: string
}

export const creatorLaunchTemplate = {
  slug: 'creator-launch-os',
  name: 'Creator Launch OS',
  status: 'release-candidate',
  label: 'Free and open source',
  description:
    'An editorial storefront and release studio for digital-product creators, authors, educators, and independent communities.',
  sourceUrl: 'https://github.com/frankxai/creator-launch-os',
  deployUrl:
    'https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffrankxai%2Fcreator-launch-os&project-name=creator-launch-os&repository-name=creator-launch-os',
  capabilities: [
    'Zero-secret storefront, catalog, and product decision flow',
    'Honest no-payment checkout fallback until a hosted checkout is configured',
    'Sample release studio with clearly labeled demo metrics',
    'Metadata, sitemap, robots, Open Graph, health, loading, empty, error, and not-found states',
  ],
  evidence: [
    'Public MIT source with clean history',
    'TypeScript, lint, contract tests, and production build passed in cloud CI',
    'Vercel preview built from a zero-environment clean export',
    'Desktop and mobile visual review passed in bounded cloud capture',
  ],
} as const

export const studyCategories: Array<{ id: 'all' | StudyCategory; label: string }> = [
  { id: 'all', label: 'All studies' },
  { id: 'landing-page', label: 'Landing' },
  { id: 'product-page', label: 'Products' },
  { id: 'dashboard', label: 'Dashboards' },
  { id: 'creator-tool', label: 'Creator tools' },
  { id: 'community', label: 'Community' },
  { id: 'micro-saas', label: 'Micro-SaaS' },
  { id: 'component', label: 'Systems' },
]

export const v0Studies: V0Study[] = [
  {
    id: 1,
    wave: 1,
    title: 'Homepage Hero',
    description: 'Personal-authority hero composition with proof signals and a restrained product path.',
    category: 'landing-page',
    chatId: 'kp1UCsrMJI8',
    demoUrl: 'https://demo-kzmp73pqpq4yhafic577.vusercontent.net',
  },
  {
    id: 2,
    wave: 1,
    title: 'Products Page',
    description: 'Filterable product presentation exploring hierarchy, featured offers, and collection browsing.',
    category: 'product-page',
    chatId: 'oyx6iwcSNW0',
    demoUrl: 'https://demo-kzmnco49r01u38scvpt5.vusercontent.net/products',
  },
  {
    id: 3,
    wave: 1,
    title: 'Research Hub',
    description: 'Research index with category navigation, evidence signals, and a dense reading surface.',
    category: 'dashboard',
    chatId: 'hz3M0ZGsSF5',
    demoUrl: 'https://demo-kzmfrqnxel1daa64b510.vusercontent.net/research',
  },
  {
    id: 4,
    wave: 1,
    title: 'Blog Landing',
    description: 'Editorial index with a lead story, supporting posts, and visible reading expectations.',
    category: 'landing-page',
    chatId: 'vDtmFp45TVR',
    demoUrl: 'https://demo-kzmp0oaq7ysi02dfvmnl.vusercontent.net/blog',
  },
  {
    id: 5,
    wave: 1,
    title: 'Inner Circle',
    description: 'Membership concept testing offer clarity, access levels, and member-content previews.',
    category: 'product-page',
    chatId: 'uaPnlaw4BIK',
    demoUrl: 'https://demo-kzmqkdpccsp0s5d342f9.vusercontent.net/inner-circle',
  },
  {
    id: 6,
    wave: 1,
    title: 'ACOS Product',
    description: 'Agent-orchestration product narrative with system proof and pricing architecture.',
    category: 'product-page',
    chatId: 'f6ToNz0ER5c',
    demoUrl: 'https://demo-kzmpc9qb5oxmrzbm1yz0.vusercontent.net',
  },
  {
    id: 7,
    wave: 1,
    title: 'AI Academy',
    description: 'Learning-platform study covering course discovery, progress, and credential states.',
    category: 'landing-page',
    chatId: 'kmqMZu6QQHA',
    demoUrl: 'https://demo-kzmqdniz3r3vtbckv0w2.vusercontent.net/ai-architect-academy',
  },
  {
    id: 8,
    wave: 1,
    title: 'About Page',
    description: 'Personal authority page with chronology, working principles, and evidence of practice.',
    category: 'landing-page',
    chatId: 'vf8toBMjzWP',
    demoUrl: 'https://demo-kzmjven0djm9woxa21xi.vusercontent.net/about',
  },
  {
    id: 9,
    wave: 1,
    title: 'Design System',
    description: 'Token and component reference exploring type, color, spacing, and reusable states.',
    category: 'component',
    chatId: 'nmegM49Dti2',
    demoUrl: 'https://demo-kzmljrx9qevuoynjg4t1.vusercontent.net/design-system',
  },
  {
    id: 10,
    wave: 1,
    title: 'Music Lab',
    description: 'Creator workspace concept for tracks, waveforms, production context, and catalog actions.',
    category: 'dashboard',
    chatId: 'r9XYZI8P0Mv',
    demoUrl: 'https://demo-kzmnibzj21qauou5xlcm.vusercontent.net/music-lab',
  },
  {
    id: 11,
    wave: 2,
    title: 'Soulbook',
    description: 'Guided reflection product study with progress, prompts, and a structured path.',
    category: 'product-page',
    chatId: 'qlakULoe76B',
    demoUrl: 'https://demo-kzmq92zhek8h1nsceani.vusercontent.net/soulbook',
  },
  {
    id: 12,
    wave: 2,
    title: 'AI Team',
    description: 'AI collaboration landscape exploring roles, departments, and connected capabilities.',
    category: 'landing-page',
    chatId: 'oPNEc2DTmO8',
    demoUrl: 'https://demo-kzmqowwh4n4vh5jyh6jo.vusercontent.net',
  },
  {
    id: 13,
    wave: 2,
    title: 'Labs',
    description: 'Build-session archive with active experiments, process notes, and replay discovery.',
    category: 'landing-page',
    chatId: 'bTEnogK4Jrn',
    demoUrl: 'https://demo-kzmo42sze9qnoaml93ym.vusercontent.net/labs',
  },
  {
    id: 14,
    wave: 2,
    title: 'Inner Circle v2',
    description: 'A second membership direction testing stronger hierarchy, FAQs, and offer framing.',
    category: 'product-page',
    chatId: 'tZ41YuKQJoo',
    demoUrl: 'https://demo-kzmisu11l2vafqrmp560.vusercontent.net/inner-circle',
  },
  {
    id: 15,
    wave: 2,
    title: 'Coaching',
    description: 'Service-product study covering program fit, method, tiers, and booking intent.',
    category: 'product-page',
    chatId: 'ixe64JX8hmQ',
    demoUrl: 'https://demo-kzmid0zlxhgrfar9tmd2.vusercontent.net/coaching',
  },
  {
    id: 16,
    wave: 2,
    title: 'Community',
    description: 'Builder-community concept with activity, members, resources, and event discovery.',
    category: 'community',
    chatId: 'eCYweJC6UTl',
    demoUrl: 'https://demo-kzmn6q9sjk9cmrje1k4y.vusercontent.net/community',
  },
  {
    id: 17,
    wave: 3,
    title: 'Agentic Micro-SaaS Hub',
    description: 'Product-shell exploration for an agentic SaaS offer, onboarding, usage, and upgrade paths.',
    category: 'micro-saas',
    chatId: 'uLvAQCH92Q6',
    demoUrl: 'https://demo-kzmfwbazgsw0i9pf5b3g.vusercontent.net',
  },
  {
    id: 18,
    wave: 3,
    title: 'AI CoE Command Console',
    description: 'Enterprise operating-console study for governance, models, prompts, and portfolio signals.',
    category: 'dashboard',
    chatId: 'kDrmtjc6u0W',
    demoUrl: 'https://demo-kzmg2hfy774lsmrau3jo.vusercontent.net/dashboard',
  },
  {
    id: 19,
    wave: 3,
    title: 'AI Music & Sound Browser',
    description: 'Music-catalog study with listening, prompt context, stems, and licensing navigation.',
    category: 'creator-tool',
    chatId: 'morpYvu35Ym',
    demoUrl: 'https://demo-kzmk1cfvg45y1i0npw7e.vusercontent.net',
  },
]

export const verticalRoadmap = [
  {
    stage: 'Now',
    audience: 'Digital-product creators',
    product: 'Creator Launch OS',
    outcome: 'Publish, explain, sell, and operate a focused catalog.',
  },
  {
    stage: 'Next',
    audience: 'Authors and publishers',
    product: 'Author & Book Launch OS',
    outcome: 'Sample reader, press kit, events, newsletter, and reader circle.',
  },
  {
    stage: 'Next',
    audience: 'Communities and cohorts',
    product: 'Community & Cohort OS',
    outcome: 'Onboarding, events, resources, roles, and recurring communication.',
  },
  {
    stage: 'Research',
    audience: 'AI builders',
    product: 'Agent Operations Console',
    outcome: 'Runs, tools, approvals, handoffs, cost, and trace visibility.',
  },
  {
    stage: 'Research',
    audience: 'Researchers and experts',
    product: 'Knowledge Studio',
    outcome: 'Evidence library, citations, briefs, newsletter, and paid reports.',
  },
] as const

export const templatePortfolio = [
  {
    lane: 'Creator businesses',
    promise: 'A focused site and operating layer for the way each creator earns trust and delivers value.',
    products: [
      {
        audience: 'Digital-product creators',
        product: 'Creator Launch OS',
        outcome: 'Catalog, product decisions, release operations, and delivery handoff.',
      },
      {
        audience: 'Authors and publishers',
        product: 'Author & Book Launch OS',
        outcome: 'Reader sample, press kit, events, newsletter, and reader circle.',
      },
      {
        audience: 'Newsletter and media operators',
        product: 'Independent Media OS',
        outcome: 'Issue archive, sponsorship inventory, referrals, and paid membership.',
      },
      {
        audience: 'Educators and cohort leaders',
        product: 'Course & Cohort OS',
        outcome: 'Curriculum, enrollment, live sessions, resources, and completion.',
      },
      {
        audience: 'Communities and memberships',
        product: 'Community Membership OS',
        outcome: 'Onboarding, roles, events, resources, and recurring communication.',
      },
      {
        audience: 'Coaches and consultants',
        product: 'Expert Services OS',
        outcome: 'Fit, method, proof, booking, client intake, and service delivery.',
      },
      {
        audience: 'Musicians and audio creators',
        product: 'Music Release OS',
        outcome: 'Listening, catalog context, credits, licensing, drops, and fan capture.',
      },
      {
        audience: 'Artists and photographers',
        product: 'Portfolio & Licensing OS',
        outcome: 'Collections, commissions, usage rights, licensing, and collector contact.',
      },
      {
        audience: 'Podcasters and video creators',
        product: 'Audience Network OS',
        outcome: 'Episodes, clips, guests, sponsors, resources, and subscriber paths.',
      },
      {
        audience: 'Speakers and event producers',
        product: 'Events & Speaker OS',
        outcome: 'Programs, dates, media kit, registration, partners, and follow-up.',
      },
      {
        audience: 'Agencies and creative studios',
        product: 'Studio Pipeline OS',
        outcome: 'Capabilities, case evidence, qualification, proposals, and client handoff.',
      },
      {
        audience: 'Indie games and worldbuilders',
        product: 'World Launch OS',
        outcome: 'Lore entry, playable proof, updates, community, and release milestones.',
      },
    ],
  },
  {
    lane: 'AI startups',
    promise: 'Production-oriented starters organized around the real operating risk, not a generic chat screen.',
    products: [
      {
        audience: 'AI SaaS founders',
        product: 'AI SaaS Starter',
        outcome: 'Authentication, usage, billing adapter, onboarding, support, and observability.',
      },
      {
        audience: 'Agent-product teams',
        product: 'Agent Product Starter',
        outcome: 'Runs, tools, approvals, handoffs, traces, cost, and failure recovery.',
      },
      {
        audience: 'Knowledge-product teams',
        product: 'Knowledge Studio',
        outcome: 'Ingestion, retrieval, citations, permissions, feedback, and source refresh.',
      },
      {
        audience: 'Research and intelligence teams',
        product: 'AI Research Desk',
        outcome: 'Research plans, evidence, synthesis, review, exports, and paid reports.',
      },
      {
        audience: 'Image, audio, and video startups',
        product: 'Generative Media Studio',
        outcome: 'Jobs, variants, provenance, rights, review, storage, and delivery.',
      },
      {
        audience: 'Vertical copilot founders',
        product: 'Vertical Copilot Starter',
        outcome: 'Domain intake, structured actions, human approval, history, and audit trail.',
      },
      {
        audience: 'API and developer-tool companies',
        product: 'Developer Business Starter',
        outcome: 'Documentation, keys, usage, examples, status, pricing, and support.',
      },
      {
        audience: 'Model and platform teams',
        product: 'Eval & Observability Console',
        outcome: 'Datasets, runs, comparisons, quality, latency, cost, and regressions.',
      },
      {
        audience: 'Enterprise AI programs',
        product: 'AI CoE Operating System',
        outcome: 'Portfolio, governance, models, policies, risk, value, and adoption.',
      },
      {
        audience: 'Automation and integration startups',
        product: 'Workflow Automation Hub',
        outcome: 'Connectors, triggers, runs, retries, approvals, and operational ownership.',
      },
    ],
  },
] as const

export const releaseGates = [
  'Public source with a clear license, rights, and provenance record',
  'Useful demo path with no required secrets',
  'Loading, empty, error, and permission-aware states',
  'Type, lint, contract, and production-build evidence',
  'Clean Vercel deployment from the documented source',
  'Desktop, mobile, keyboard, and reduced-motion review',
] as const
