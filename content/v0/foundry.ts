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
    'Desktop and mobile visual review pending machine capacity',
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
    demoUrl: 'https://demo-kzmnco49r01u38scvpt5.vusercontent.net',
  },
  {
    id: 3,
    wave: 1,
    title: 'Research Hub',
    description: 'Research index with category navigation, evidence signals, and a dense reading surface.',
    category: 'dashboard',
    chatId: 'hz3M0ZGsSF5',
    demoUrl: 'https://demo-kzmfrqnxel1daa64b510.vusercontent.net',
  },
  {
    id: 4,
    wave: 1,
    title: 'Blog Landing',
    description: 'Editorial index with a lead story, supporting posts, and visible reading expectations.',
    category: 'landing-page',
    chatId: 'vDtmFp45TVR',
    demoUrl: 'https://demo-kzmp0oaq7ysi02dfvmnl.vusercontent.net',
  },
  {
    id: 5,
    wave: 1,
    title: 'Inner Circle',
    description: 'Membership concept testing offer clarity, access levels, and member-content previews.',
    category: 'product-page',
    chatId: 'uaPnlaw4BIK',
    demoUrl: 'https://demo-kzmqkdpccsp0s5d342f9.vusercontent.net',
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
    demoUrl: 'https://demo-kzmqdniz3r3vtbckv0w2.vusercontent.net',
  },
  {
    id: 8,
    wave: 1,
    title: 'About Page',
    description: 'Personal authority page with chronology, working principles, and evidence of practice.',
    category: 'landing-page',
    chatId: 'vf8toBMjzWP',
    demoUrl: 'https://demo-kzmjven0djm9woxa21xi.vusercontent.net',
  },
  {
    id: 9,
    wave: 1,
    title: 'Design System',
    description: 'Token and component reference exploring type, color, spacing, and reusable states.',
    category: 'component',
    chatId: 'nmegM49Dti2',
    demoUrl: 'https://demo-kzmljrx9qevuoynjg4t1.vusercontent.net',
  },
  {
    id: 10,
    wave: 1,
    title: 'Music Lab',
    description: 'Creator workspace concept for tracks, waveforms, production context, and catalog actions.',
    category: 'dashboard',
    chatId: 'r9XYZI8P0Mv',
    demoUrl: 'https://demo-kzmnibzj21qauou5xlcm.vusercontent.net',
  },
  {
    id: 11,
    wave: 2,
    title: 'Soulbook',
    description: 'Guided reflection product study with progress, prompts, and a structured path.',
    category: 'product-page',
    chatId: 'qlakULoe76B',
    demoUrl: 'https://demo-kzmq92zhek8h1nsceani.vusercontent.net',
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
    demoUrl: 'https://demo-kzmo42sze9qnoaml93ym.vusercontent.net',
  },
  {
    id: 14,
    wave: 2,
    title: 'Inner Circle v2',
    description: 'A second membership direction testing stronger hierarchy, FAQs, and offer framing.',
    category: 'product-page',
    chatId: 'tZ41YuKQJoo',
    demoUrl: 'https://demo-kzmisu11l2vafqrmp560.vusercontent.net',
  },
  {
    id: 15,
    wave: 2,
    title: 'Coaching',
    description: 'Service-product study covering program fit, method, tiers, and booking intent.',
    category: 'product-page',
    chatId: 'ixe64JX8hmQ',
    demoUrl: 'https://demo-kzmid0zlxhgrfar9tmd2.vusercontent.net',
  },
  {
    id: 16,
    wave: 2,
    title: 'Community',
    description: 'Builder-community concept with activity, members, resources, and event discovery.',
    category: 'community',
    chatId: 'eCYweJC6UTl',
    demoUrl: 'https://demo-kzmn6q9sjk9cmrje1k4y.vusercontent.net',
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
    demoUrl: 'https://demo-kzmg2hfy774lsmrau3jo.vusercontent.net',
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

export const releaseGates = [
  'Public source with a clear license',
  'Useful demo path with no required secrets',
  'Loading, empty, error, and permission-aware states',
  'Type, lint, contract, and production-build evidence',
  'Clean Vercel deployment from the documented source',
  'Desktop, mobile, keyboard, and reduced-motion review',
] as const
