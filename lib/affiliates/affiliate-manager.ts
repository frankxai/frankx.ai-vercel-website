import { Affiliate, AffiliateCategory, AffiliateLink } from '@/types/affiliates'

// ── Deploy Platforms (Oracle-Safe, Revenue-Generating) ──────────────────────

const deployPlatforms: Affiliate[] = [
  {
    id: 'railway',
    name: 'Railway',
    url: 'https://railway.app',
    category: 'deploy-platform',
    commission: '15% recurring for 12 months + 15-25% template kickbacks',
    cookieDuration: '30 days',
    deployButton: true,
    templateMarketplace: true,
    signupUrl: 'https://railway.app/account',
    logoIcon: 'Train',
    brandColor: '#A855F7',
    oracleCompatible: true,
  },
  {
    id: 'vercel',
    name: 'Vercel',
    url: 'https://vercel.com',
    category: 'deploy-platform',
    commission: '$5/lead + 30% recurring for 6 months',
    cookieDuration: '30 days',
    deployButton: true,
    templateMarketplace: true,
    signupUrl: 'https://partners.dub.co/v0',
    logoIcon: 'Triangle',
    brandColor: '#000000',
    oracleCompatible: true,
  },
  {
    id: 'n8n',
    name: 'n8n',
    url: 'https://n8n.io',
    category: 'deploy-platform',
    commission: '30% recurring for 12 months',
    cookieDuration: '90 days',
    deployButton: false,
    templateMarketplace: true,
    signupUrl: 'https://n8n.io/affiliates/',
    logoIcon: 'Workflow',
    brandColor: '#FF6D5A',
    oracleCompatible: true,
  },
  {
    id: 'render',
    name: 'Render',
    url: 'https://render.com',
    category: 'deploy-platform',
    commission: 'No affiliate program',
    cookieDuration: 'N/A',
    deployButton: true,
    templateMarketplace: false,
    logoIcon: 'Globe',
    brandColor: '#46E3B7',
    oracleCompatible: true,
  },
]

// ── Monitoring (Oracle-Safe) ────────────────────────────────────────────────

const monitoringTools: Affiliate[] = [
  {
    id: 'better-stack',
    name: 'Better Stack',
    url: 'https://betterstack.com',
    category: 'monitoring',
    commission: '25% recurring for 12 months',
    cookieDuration: '60 days',
    signupUrl: 'https://betterstack.com/affiliates',
    logoIcon: 'Activity',
    brandColor: '#2DD4BF',
    oracleCompatible: true,
  },
]

// ── Sales Platforms (Where YOU sell templates) ───────────────────────────────

const salesPlatforms: Affiliate[] = [
  {
    id: 'polar',
    name: 'Polar.sh',
    url: 'https://polar.sh',
    category: 'sales-platform',
    commission: 'Keep 96% (4% + $0.40 fee)',
    cookieDuration: 'N/A',
    signupUrl: 'https://polar.sh',
    logoIcon: 'Snowflake',
    brandColor: '#0EA5E9',
    oracleCompatible: true,
  },
  {
    id: 'lemon-squeezy',
    name: 'Lemon Squeezy',
    url: 'https://lemonsqueezy.com',
    category: 'sales-platform',
    commission: 'Keep 95% (5% + $0.50 fee)',
    cookieDuration: 'N/A',
    signupUrl: 'https://lemonsqueezy.com',
    logoIcon: 'Citrus',
    brandColor: '#FFC233',
    oracleCompatible: true,
  },
]

// ── AI Tools (Content Affiliate Links) ──────────────────────────────────────

const aiTools: Affiliate[] = [
  {
    id: 'suno',
    name: 'Suno',
    url: 'https://suno.com/',
    category: 'ai-tool',
    commission: '25% (via Impact)',
    cookieDuration: '90 days',
    oracleCompatible: true,
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    url: 'https://www.midjourney.com',
    category: 'ai-tool',
    commission: 'No affiliate program',
    cookieDuration: 'N/A',
    oracleCompatible: true,
  },
]

// ── Productivity Tools ──────────────────────────────────────────────────────

const productivityTools: Affiliate[] = [
  {
    id: 'notion',
    name: 'Notion',
    url: 'https://www.notion.so',
    category: 'productivity',
    commission: '50% first payment',
    cookieDuration: '90 days',
    signupUrl: 'https://www.notion.so/affiliates',
    oracleCompatible: true,
  },
  {
    id: 'zapier',
    name: 'Zapier',
    url: 'https://zapier.com',
    category: 'productivity',
    commission: '30% recurring',
    cookieDuration: '45 days',
    oracleCompatible: true,
  },
  {
    id: 'make',
    name: 'Make.com',
    url: 'https://www.make.com',
    category: 'productivity',
    commission: '25% recurring',
    cookieDuration: '60 days',
    oracleCompatible: true,
  },
]

// ── Creative Tools ──────────────────────────────────────────────────────────

const creativeTools: Affiliate[] = [
  {
    id: 'canva-pro',
    name: 'Canva Pro',
    url: 'https://www.canva.com/pro/',
    category: 'creative-tool',
    commission: 'Up to $36 per subscriber',
    cookieDuration: '30 days',
    oracleCompatible: true,
  },
  {
    id: 'adobe-suite',
    name: 'Adobe Creative Suite',
    url: 'https://www.adobe.com/creativecloud.html',
    category: 'creative-tool',
    commission: '85% first month',
    cookieDuration: '30 days',
    oracleCompatible: true,
  },
]

// ── Business Tools ──────────────────────────────────────────────────────────

const businessTools: Affiliate[] = [
  {
    id: 'convertkit',
    name: 'ConvertKit',
    url: 'https://convertkit.com',
    category: 'business-tool',
    commission: '30% recurring',
    cookieDuration: '60 days',
    oracleCompatible: true,
  },
  {
    id: 'teachable',
    name: 'Teachable',
    url: 'https://teachable.com',
    category: 'business-tool',
    commission: '30-50% recurring',
    cookieDuration: '90 days',
    oracleCompatible: true,
  },
  {
    id: 'gumroad',
    name: 'Gumroad',
    url: 'https://gumroad.com',
    category: 'business-tool',
    commission: '10% via Gumroad Discover',
    cookieDuration: '30 days',
    oracleCompatible: true,
  },
]

// ── AVOID LIST (Oracle Non-Compete) ─────────────────────────────────────────
// NOT included in the registry. Listed here as documentation only.
// AWS, GCP, Azure, DigitalOcean, Vultr, Linode, Hetzner

// ── Combined Registry ───────────────────────────────────────────────────────

const affiliates: Affiliate[] = [
  ...deployPlatforms,
  ...monitoringTools,
  ...salesPlatforms,
  ...aiTools,
  ...productivityTools,
  ...creativeTools,
  ...businessTools,
]

// ── Exports ─────────────────────────────────────────────────────────────────

export const getAffiliate = (id: string): Affiliate | undefined => {
  return affiliates.find((a) => a.id === id)
}

export const getAllAffiliates = (): Affiliate[] => {
  return affiliates
}

export const getByCategory = (category: AffiliateCategory): Affiliate[] => {
  return affiliates.filter((a) => a.category === category)
}

export const getDeployPlatforms = (): Affiliate[] => {
  return affiliates.filter((a) => a.category === 'deploy-platform' && a.deployButton)
}

export const getOracleCompatible = (): Affiliate[] => {
  return affiliates.filter((a) => a.oracleCompatible)
}

export const getAffiliateLink = (
  affiliateId: string,
  trackingId?: string
): AffiliateLink | undefined => {
  const affiliate = getAffiliate(affiliateId)
  if (!affiliate) return undefined

  const url = new URL(affiliate.url)
  if (trackingId) {
    url.searchParams.set('ref', trackingId)
  }

  return {
    ...affiliate,
    trackingUrl: url.toString(),
  }
}
