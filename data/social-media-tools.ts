export const SOCIAL_TOOL_LAST_VERIFIED = '2026-08-28'

export type SocialToolRole =
  | 'solo-founder'
  | 'creator-led'
  | 'developer-brand'
  | 'agency'
  | 'enterprise'

export type SocialToolCapability =
  | 'Publishing'
  | 'Analytics'
  | 'Inbox'
  | 'Approvals'
  | 'API'
  | 'MCP'
  | 'Self-host'
  | 'AI content'

export type EvidenceClass =
  | 'Official documentation'
  | 'Vendor claim'
  | 'First-party pilot'
  | 'Not tested'

export type SocialToolSource = {
  label: string
  url: string
}

export type SocialToolAffiliate = {
  program: 'Public affiliate program' | 'Partner or referral program' | 'No official program verified'
  programUrl?: string
  publicTerms?: string
  frankxRelationship: 'No tracked FrankX relationship'
}

export type SocialMediaTool = {
  id: string
  name: string
  productUrl: string
  pricingUrl: string
  category: string
  summary: string
  bestFor: string
  caution: string
  price: string
  priceDetail: string
  capabilities: SocialToolCapability[]
  automation: string
  deployment: 'SaaS' | 'SaaS or self-hosted' | 'Self-hosted'
  evidenceClass: EvidenceClass
  roleScores: Record<SocialToolRole, number>
  sources: SocialToolSource[]
  affiliate: SocialToolAffiliate
}

export type SocialToolRoleDefinition = {
  id: SocialToolRole
  eyebrow: string
  label: string
  job: string
  decision: string
  shortlist: string[]
}

export const SOCIAL_TOOL_ROLES: SocialToolRoleDefinition[] = [
  {
    id: 'solo-founder',
    eyebrow: 'One brand · low overhead',
    label: 'Solo founder',
    job: 'Publish consistently, understand what worked, and keep the operating bill honest.',
    decision: 'Start with Pallyy. Move to Metricool when deeper analytics or MCP access becomes central; keep Buffer as the simple baseline.',
    shortlist: ['pallyy', 'metricool', 'buffer'],
  },
  {
    id: 'creator-led',
    eyebrow: 'Voice · formats · community',
    label: 'Creator-led brand',
    job: 'Protect a distinct voice while adapting one idea across the channels that actually matter.',
    decision: 'Typefully leads for text-first brands, Later for visual planning, and Metricool for a broader analytics-and-publishing cockpit.',
    shortlist: ['typefully', 'later', 'metricool'],
  },
  {
    id: 'developer-brand',
    eyebrow: 'API · agents · owned logic',
    label: 'Developer / API brand',
    job: 'Give software and agents a reliable publishing boundary without making a dashboard the system of record.',
    decision: 'Ayrshare is the mature API-first route; Postiz is the open-source control route; Upload-Post is the cost-conscious API and white-label route.',
    shortlist: ['ayrshare', 'postiz', 'upload-post'],
  },
  {
    id: 'agency',
    eyebrow: 'Many brands · approvals · margin',
    label: 'Agency / multi-brand',
    job: 'Separate clients, govern approvals, preserve team throughput, and see cost per managed brand.',
    decision: 'Metricool is the balanced multi-brand cockpit; SocialBee is strong for content operations; Publer offers a leaner commercial model.',
    shortlist: ['metricool', 'socialbee', 'publer'],
  },
  {
    id: 'enterprise',
    eyebrow: 'Governance · service · attribution',
    label: 'Enterprise',
    job: 'Coordinate teams, permissions, listening, service workflows, and revenue evidence across a controlled stack.',
    decision: 'Sprout Social and Hootsuite are the dedicated enterprise suites. HubSpot makes sense when social must live inside an existing CRM and revenue-attribution system.',
    shortlist: ['sprout-social', 'hootsuite', 'hubspot'],
  },
]

export const SOCIAL_TOOL_CAPABILITIES: SocialToolCapability[] = [
  'Publishing',
  'Analytics',
  'Inbox',
  'Approvals',
  'API',
  'MCP',
  'Self-host',
  'AI content',
]

export const SOCIAL_MEDIA_TOOLS: SocialMediaTool[] = [
  {
    id: 'pallyy',
    name: 'Pallyy',
    productUrl: 'https://pallyy.com/',
    pricingUrl: 'https://pallyy.com/pricing',
    category: 'Founder scheduler',
    summary: 'A focused publishing, analytics, inbox, approval, and link-in-bio workspace with unusually clear one-brand economics.',
    bestFor: 'Solo founders and compact creator teams that want a calm operating surface.',
    caution: 'The lower plans have post and account limits; model extra social sets before using it for an agency portfolio.',
    price: 'Free · Starter $15/mo · Pro $25/mo',
    priceDetail: 'One social set on listed plans; additional sets are publicly listed at $10/month.',
    capabilities: ['Publishing', 'Analytics', 'Inbox', 'Approvals', 'API', 'AI content'],
    automation: 'API on paid plans',
    deployment: 'SaaS',
    evidenceClass: 'Official documentation',
    roleScores: { 'solo-founder': 96, 'creator-led': 88, 'developer-brand': 70, agency: 76, enterprise: 35 },
    sources: [
      { label: 'Official pricing', url: 'https://pallyy.com/pricing' },
      { label: 'Official API overview', url: 'https://pallyy.com/features/api' },
    ],
    affiliate: {
      program: 'Public affiliate program',
      programUrl: 'https://pallyy.getrewardful.com/',
      frankxRelationship: 'No tracked FrankX relationship',
    },
  },
  {
    id: 'metricool',
    name: 'Metricool',
    productUrl: 'https://metricool.com/',
    pricingUrl: 'https://metricool.com/pricing/',
    category: 'Analytics cockpit',
    summary: 'A broad planning, analytics, reporting, inbox, ads, and competitor-analysis suite with an official MCP surface on every plan.',
    bestFor: 'Founders and agencies that value reporting depth, multi-brand operations, and an AI-assistant connection.',
    caution: 'The free plan excludes LinkedIn and X; API access starts higher than MCP access, so do not treat those surfaces as equivalent.',
    price: 'Free · Starter from $20/mo annual',
    priceDetail: 'Starter begins at 5 brands; Advanced adds team and API capabilities. Monthly billing costs more.',
    capabilities: ['Publishing', 'Analytics', 'Inbox', 'Approvals', 'API', 'MCP', 'AI content'],
    automation: 'Official MCP on every plan; API on Advanced and Custom',
    deployment: 'SaaS',
    evidenceClass: 'Official documentation',
    roleScores: { 'solo-founder': 92, 'creator-led': 92, 'developer-brand': 84, agency: 95, enterprise: 68 },
    sources: [
      { label: 'Official pricing', url: 'https://metricool.com/pricing/' },
      { label: 'Official MCP versus API guide', url: 'https://help.metricool.com/mcp-vs-api-access-what-is-the-difference-5y3ib' },
    ],
    affiliate: {
      program: 'Public affiliate program',
      programUrl: 'https://help.metricool.com/affiliate-program-66g59',
      frankxRelationship: 'No tracked FrankX relationship',
    },
  },
  {
    id: 'buffer',
    name: 'Buffer',
    productUrl: 'https://buffer.com/',
    pricingUrl: 'https://buffer.com/pricing',
    category: 'Simple baseline',
    summary: 'A familiar multi-network publishing and analytics product with channel-based pricing and a self-serve API path.',
    bestFor: 'Founders who want a low-learning-curve scheduler and developers who need a modest API surface.',
    caution: 'Paid cost scales by channel, and a channel-priced model can become less attractive as the portfolio expands.',
    price: 'Free · paid from $6/channel/mo',
    priceDetail: 'Free lists 3 channels and 10 scheduled posts per channel.',
    capabilities: ['Publishing', 'Analytics', 'Inbox', 'Approvals', 'API', 'AI content'],
    automation: 'Personal API key; documented multi-platform posting API',
    deployment: 'SaaS',
    evidenceClass: 'Official documentation',
    roleScores: { 'solo-founder': 86, 'creator-led': 80, 'developer-brand': 88, agency: 74, enterprise: 55 },
    sources: [
      { label: 'Official pricing', url: 'https://buffer.com/pricing' },
      { label: 'Official API guide', url: 'https://buffer.com/resources/social-media-api-multi-platform-posting/' },
    ],
    affiliate: {
      program: 'Public affiliate program',
      programUrl: 'https://buffer.com/partners',
      publicTerms: 'Buffer publicly lists 25% of a referred customer’s payments for 12 months.',
      frankxRelationship: 'No tracked FrankX relationship',
    },
  },
  {
    id: 'postiz',
    name: 'Postiz',
    productUrl: 'https://postiz.com/',
    pricingUrl: 'https://postiz.com/pricing',
    category: 'Open-source control',
    summary: 'An open-source scheduler with hosted plans, public API documentation, agent-oriented positioning, and a self-hosting path.',
    bestFor: 'Developer brands that want source access or an owned deployment boundary.',
    caution: 'Self-hosting creates an operations obligation; the public API documents rate limits that should shape agent queues.',
    price: 'Hosted from $29/mo · self-host option',
    priceDetail: 'Hosted tiers publicly list 5 to 100 social channels.',
    capabilities: ['Publishing', 'Analytics', 'Approvals', 'API', 'Self-host', 'AI content'],
    automation: 'Public API and OAuth; agent workflows can sit above it',
    deployment: 'SaaS or self-hosted',
    evidenceClass: 'Official documentation',
    roleScores: { 'solo-founder': 78, 'creator-led': 72, 'developer-brand': 96, agency: 82, enterprise: 45 },
    sources: [
      { label: 'Official pricing', url: 'https://postiz.com/pricing' },
      { label: 'Official API introduction', url: 'https://docs.postiz.com/public-api/introduction' },
      { label: 'Official agent overview', url: 'https://postiz.com/agent' },
    ],
    affiliate: {
      program: 'Public affiliate program',
      programUrl: 'https://affiliate.postiz.com/',
      frankxRelationship: 'No tracked FrankX relationship',
    },
  },
  {
    id: 'blotato',
    name: 'Blotato',
    productUrl: 'https://www.blotato.com/',
    pricingUrl: 'https://www.blotato.com/pricing',
    category: 'AI content workflow',
    summary: 'An AI-assisted content creation and publishing system with API, MCP, n8n, and Make-oriented automation paths.',
    bestFor: 'High-output creator workflows that want generation and distribution in the same operating loop.',
    caution: 'Credits and automation are part of the economics; the trial does not include the API.',
    price: 'Starter $29/mo · Creator $97/mo',
    priceDetail: 'Starter publicly lists 20 social accounts and API access; higher plans expand accounts and credits.',
    capabilities: ['Publishing', 'Analytics', 'Inbox', 'API', 'MCP', 'AI content'],
    automation: 'API, MCP, n8n, and Make surfaces',
    deployment: 'SaaS',
    evidenceClass: 'Official documentation',
    roleScores: { 'solo-founder': 74, 'creator-led': 91, 'developer-brand': 88, agency: 77, enterprise: 40 },
    sources: [
      { label: 'Official pricing', url: 'https://www.blotato.com/pricing' },
      { label: 'Official product overview', url: 'https://www.blotato.com/' },
    ],
    affiliate: {
      program: 'No official program verified',
      frankxRelationship: 'No tracked FrankX relationship',
    },
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    productUrl: 'https://www.hubspot.com/products/marketing/social-inbox',
    pricingUrl: 'https://www.hubspot.com/pricing/marketing',
    category: 'CRM-connected suite',
    summary: 'Social publishing and monitoring embedded in a larger CRM, marketing, service, attribution, and automation platform.',
    bestFor: 'Organizations already committed to HubSpot that need social activity tied to contacts, campaigns, and revenue.',
    caution: 'Social management is positioned in Marketing Hub Professional and Enterprise, making it excessive for a simple scheduling job.',
    price: 'Marketing Hub Pro from $890/mo',
    priceDetail: 'Starter is cheaper but does not carry the full social-management capability evaluated here.',
    capabilities: ['Publishing', 'Analytics', 'Inbox', 'Approvals', 'API', 'AI content'],
    automation: 'HubSpot platform APIs and workflows around a CRM system of record',
    deployment: 'SaaS',
    evidenceClass: 'Official documentation',
    roleScores: { 'solo-founder': 54, 'creator-led': 58, 'developer-brand': 55, agency: 78, enterprise: 93 },
    sources: [
      { label: 'Official marketing pricing', url: 'https://www.hubspot.com/pricing/marketing' },
      { label: 'Official social publishing guide', url: 'https://knowledge.hubspot.com/social/create-and-publish-social-posts' },
    ],
    affiliate: {
      program: 'Public affiliate program',
      programUrl: 'https://www.hubspot.com/partners/affiliates',
      publicTerms: 'HubSpot publicly lists 30% recurring commission for up to one year and a 180-day cookie window.',
      frankxRelationship: 'No tracked FrankX relationship',
    },
  },
  {
    id: 'sprout-social',
    name: 'Sprout Social',
    productUrl: 'https://sproutsocial.com/',
    pricingUrl: 'https://sproutsocial.com/pricing/',
    category: 'Enterprise social suite',
    summary: 'A high-governance social suite spanning publishing, analytics, engagement, listening, service, permissions, and enterprise workflows.',
    bestFor: 'Larger teams that can justify per-seat economics through governance, service, and reporting depth.',
    caution: 'Per-seat pricing is structurally different from founder and channel-based tools; it is rarely the rational solo-brand starting point.',
    price: 'Essentials from $79/seat/mo annual',
    priceDetail: 'Professional and Advanced expand profiles, analytics, API, sentiment, and helpdesk workflows.',
    capabilities: ['Publishing', 'Analytics', 'Inbox', 'Approvals', 'API', 'AI content'],
    automation: 'API on higher plans; enterprise integration surface',
    deployment: 'SaaS',
    evidenceClass: 'Official documentation',
    roleScores: { 'solo-founder': 30, 'creator-led': 46, 'developer-brand': 55, agency: 88, enterprise: 98 },
    sources: [
      { label: 'Official pricing', url: 'https://sproutsocial.com/pricing/' },
      { label: 'Official platform overview', url: 'https://sproutsocial.com/' },
    ],
    affiliate: {
      program: 'Partner or referral program',
      programUrl: 'https://sproutsocial.com/partnership-program/',
      publicTerms: 'Sprout presents a partnership program rather than a general public affiliate offer.',
      frankxRelationship: 'No tracked FrankX relationship',
    },
  },
  {
    id: 'hootsuite',
    name: 'Hootsuite',
    productUrl: 'https://www.hootsuite.com/',
    pricingUrl: 'https://www.hootsuite.com/plans',
    category: 'Enterprise social suite',
    summary: 'A broad social-management platform with publishing, engagement, analytics, listening, AI assistance, and enterprise controls.',
    bestFor: 'Organizations that need a mature suite, large-team governance, and wide workflow coverage.',
    caution: 'The suite is priced for operational breadth; smaller teams should prove they need that breadth before adopting it.',
    price: 'Standard from $99/mo',
    priceDetail: 'Professional and Advanced add account, analytics, team, and governance depth; Enterprise is custom.',
    capabilities: ['Publishing', 'Analytics', 'Inbox', 'Approvals', 'MCP', 'AI content'],
    automation: 'Official plans reference AI and MCP connector capabilities',
    deployment: 'SaaS',
    evidenceClass: 'Official documentation',
    roleScores: { 'solo-founder': 42, 'creator-led': 58, 'developer-brand': 52, agency: 87, enterprise: 96 },
    sources: [
      { label: 'Official plans', url: 'https://www.hootsuite.com/plans' },
      { label: 'Official platform overview', url: 'https://www.hootsuite.com/' },
    ],
    affiliate: {
      program: 'Partner or referral program',
      programUrl: 'https://www.hootsuite.com/partners',
      frankxRelationship: 'No tracked FrankX relationship',
    },
  },
  {
    id: 'later',
    name: 'Later',
    productUrl: 'https://later.com/',
    pricingUrl: 'https://later.com/pricing/',
    category: 'Visual creator suite',
    summary: 'A visual planning, publishing, analytics, link-in-bio, and creator-marketing platform with a strong creator-commerce orientation.',
    bestFor: 'Visual-first creators and brands coordinating Instagram, TikTok, and campaign assets.',
    caution: 'Its public API is oriented to influencer reporting rather than acting as a general scheduling control plane.',
    price: 'Starter from $18.75/mo annual',
    priceDetail: 'Growth and Scale increase social sets, profiles, users, analytics, and collaboration capacity.',
    capabilities: ['Publishing', 'Analytics', 'Inbox', 'Approvals', 'AI content'],
    automation: 'No general public scheduling API verified',
    deployment: 'SaaS',
    evidenceClass: 'Official documentation',
    roleScores: { 'solo-founder': 76, 'creator-led': 94, 'developer-brand': 38, agency: 82, enterprise: 70 },
    sources: [
      { label: 'Official pricing', url: 'https://later.com/pricing/' },
      { label: 'Official platform overview', url: 'https://later.com/' },
    ],
    affiliate: {
      program: 'Public affiliate program',
      programUrl: 'https://later.com/affiliate-program/',
      publicTerms: 'Later publicly describes commission eligibility for up to one year; current rate should be confirmed at enrollment.',
      frankxRelationship: 'No tracked FrankX relationship',
    },
  },
  {
    id: 'socialbee',
    name: 'SocialBee',
    productUrl: 'https://socialbee.com/',
    pricingUrl: 'https://socialbee.com/pricing/',
    category: 'Content operations',
    summary: 'A publishing, content-category, AI, collaboration, inbox, and analytics workspace with founder and agency tiers.',
    bestFor: 'Brands and agencies that plan evergreen content categories and want structured reuse.',
    caution: 'The value depends on adopting its category-and-recycling operating model, not merely using another calendar.',
    price: 'Bootstrap $29/mo · Pro $99/mo',
    priceDetail: 'Accelerate sits between them; public agency tiers extend workspace and client capacity.',
    capabilities: ['Publishing', 'Analytics', 'Inbox', 'Approvals', 'AI content'],
    automation: 'Native AI and workflow integrations; no general public publishing API used in this ranking',
    deployment: 'SaaS',
    evidenceClass: 'Official documentation',
    roleScores: { 'solo-founder': 88, 'creator-led': 90, 'developer-brand': 60, agency: 94, enterprise: 58 },
    sources: [
      { label: 'Official pricing', url: 'https://socialbee.com/pricing/' },
      { label: 'Official product overview', url: 'https://socialbee.com/' },
    ],
    affiliate: {
      program: 'Public affiliate program',
      programUrl: 'https://socialbee.com/affiliates/',
      frankxRelationship: 'No tracked FrankX relationship',
    },
  },
  {
    id: 'publer',
    name: 'Publer',
    productUrl: 'https://publer.com/',
    pricingUrl: 'https://publer.com/plans',
    category: 'Lean multi-brand suite',
    summary: 'A scheduler, analytics, collaboration, approval, and AI workspace with granular account economics and an API on higher plans.',
    bestFor: 'Budget-aware agencies and multi-brand operators that want broad scheduling without enterprise per-seat pricing.',
    caution: 'The modular pricing model needs to be calculated against the exact number of accounts and members you will operate.',
    price: 'Professional from about $5/mo',
    priceDetail: 'Public pricing scales with social accounts and team configuration; annual billing reduces the displayed unit cost.',
    capabilities: ['Publishing', 'Analytics', 'Inbox', 'Approvals', 'API', 'AI content'],
    automation: 'API on Business and Enterprise',
    deployment: 'SaaS',
    evidenceClass: 'Official documentation',
    roleScores: { 'solo-founder': 86, 'creator-led': 84, 'developer-brand': 80, agency: 92, enterprise: 50 },
    sources: [
      { label: 'Official plans', url: 'https://publer.com/plans' },
      { label: 'Official API documentation', url: 'https://publer.com/docs' },
    ],
    affiliate: {
      program: 'Public affiliate program',
      programUrl: 'https://publer.com/ambassador',
      publicTerms: 'Publer publicly lists up to 70% of the first payment and up to 30% recurring.',
      frankxRelationship: 'No tracked FrankX relationship',
    },
  },
  {
    id: 'typefully',
    name: 'Typefully',
    productUrl: 'https://typefully.com/',
    pricingUrl: 'https://typefully.com/pricing',
    category: 'Text-first studio',
    summary: 'A focused writing, scheduling, analytics, collaboration, API, and MCP workspace for text-led social networks.',
    bestFor: 'Founder voices and creator brands centered on X, LinkedIn, Bluesky, Threads, Mastodon, or Substack Notes.',
    caution: 'It is intentionally narrower than an all-format social suite; visual-commerce and service workflows belong elsewhere.',
    price: 'Free · paid from $12.50/mo annual',
    priceDetail: 'Current plan boundaries should be checked for brand and workspace needs before purchase.',
    capabilities: ['Publishing', 'Analytics', 'Approvals', 'API', 'MCP', 'AI content'],
    automation: 'API v2, MCP, Zapier, and webhooks',
    deployment: 'SaaS',
    evidenceClass: 'Official documentation',
    roleScores: { 'solo-founder': 92, 'creator-led': 97, 'developer-brand': 84, agency: 55, enterprise: 30 },
    sources: [
      { label: 'Official pricing', url: 'https://typefully.com/pricing' },
      { label: 'Official API v2 documentation', url: 'https://typefully.com/docs/api' },
    ],
    affiliate: {
      program: 'Public affiliate program',
      programUrl: 'https://support.typefully.com/en/articles/8718287-typefully-affiliate-program',
      frankxRelationship: 'No tracked FrankX relationship',
    },
  },
  {
    id: 'mixpost',
    name: 'Mixpost',
    productUrl: 'https://mixpost.app/',
    pricingUrl: 'https://mixpost.app/pricing',
    category: 'Self-hosted control plane',
    summary: 'A self-hosted social-management application with one-time licensing, multi-tenancy, API, MCP, webhooks, and approval capabilities.',
    bestFor: 'Developers and agencies that prefer source-adjacent control and can own infrastructure operations.',
    caution: 'A one-time license is not a zero-cost service; hosting, upgrades, backups, monitoring, and channel changes remain your responsibility.',
    price: 'Lite free · Pro $299 one-time',
    priceDetail: 'Enterprise is publicly listed at $1,199 one-time; plan terms and support scope should be reviewed.',
    capabilities: ['Publishing', 'Analytics', 'Approvals', 'API', 'MCP', 'Self-host'],
    automation: 'API, MCP, and webhooks in paid self-hosted editions',
    deployment: 'Self-hosted',
    evidenceClass: 'Official documentation',
    roleScores: { 'solo-founder': 66, 'creator-led': 60, 'developer-brand': 95, agency: 84, enterprise: 55 },
    sources: [
      { label: 'Official pricing', url: 'https://mixpost.app/pricing' },
      { label: 'Official product overview', url: 'https://mixpost.app/' },
    ],
    affiliate: {
      program: 'No official program verified',
      frankxRelationship: 'No tracked FrankX relationship',
    },
  },
  {
    id: 'ayrshare',
    name: 'Ayrshare',
    productUrl: 'https://www.ayrshare.com/',
    pricingUrl: 'https://www.ayrshare.com/pricing/',
    category: 'Social API infrastructure',
    summary: 'A product-facing social API and MCP platform designed for applications that publish, analyze, moderate, and manage user profiles.',
    bestFor: 'Software products and agent systems that need a vendor-supported, multi-network API boundary.',
    caution: 'It is infrastructure rather than a creator calendar, and pricing begins far above entry-level schedulers.',
    price: 'Premium $149/mo · Launch $299/mo',
    priceDetail: 'Business publicly starts at $599/month; profile and call requirements determine the real bill.',
    capabilities: ['Publishing', 'Analytics', 'Inbox', 'API', 'MCP'],
    automation: 'API-first plus official MCP surface',
    deployment: 'SaaS',
    evidenceClass: 'Official documentation',
    roleScores: { 'solo-founder': 42, 'creator-led': 45, 'developer-brand': 99, agency: 90, enterprise: 92 },
    sources: [
      { label: 'Official pricing', url: 'https://www.ayrshare.com/pricing/' },
      { label: 'Official product overview', url: 'https://www.ayrshare.com/' },
    ],
    affiliate: {
      program: 'No official program verified',
      frankxRelationship: 'No tracked FrankX relationship',
    },
  },
  {
    id: 'upload-post',
    name: 'Upload-Post',
    productUrl: 'https://www.upload-post.com/',
    pricingUrl: 'https://www.upload-post.com/pricing-comparison/',
    category: 'API and white-label layer',
    summary: 'A multi-network upload API and MCP service with free usage, white-label options, and plans scaled by upload volume and profiles.',
    bestFor: 'Developers, automators, and agencies that need a pragmatic publishing layer or embedded white-label capability.',
    caution: 'Compare upload, profile, and platform limits with your actual queue; it is not a full listening-and-service suite.',
    price: 'Free · Basic from $16/mo annual',
    priceDetail: 'Monthly Basic is publicly listed at $24; Professional and above expand volume, profiles, and white-label capabilities.',
    capabilities: ['Publishing', 'Analytics', 'API', 'MCP'],
    automation: 'API and MCP; white-label capability from higher plans',
    deployment: 'SaaS',
    evidenceClass: 'Official documentation',
    roleScores: { 'solo-founder': 70, 'creator-led': 76, 'developer-brand': 96, agency: 92, enterprise: 65 },
    sources: [
      { label: 'Official pricing comparison', url: 'https://www.upload-post.com/pricing-comparison/' },
      { label: 'Official product overview', url: 'https://www.upload-post.com/' },
    ],
    affiliate: {
      program: 'Public affiliate program',
      programUrl: 'https://www.upload-post.com/affiliates/',
      publicTerms: 'Upload-Post publicly lists 50% recurring commission.',
      frankxRelationship: 'No tracked FrankX relationship',
    },
  },
]

export function getSocialTool(id: string) {
  return SOCIAL_MEDIA_TOOLS.find((tool) => tool.id === id)
}

export function getSocialToolsForRole(role: SocialToolRole) {
  return [...SOCIAL_MEDIA_TOOLS].sort((a, b) => b.roleScores[role] - a.roleScores[role])
}
