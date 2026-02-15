// ── Affiliate Types ─────────────────────────────────────────────────────────
// Categories separate deploy platforms (where templates get hosted) from
// tool recommendations (affiliate links embedded in content/blog posts).

export type AffiliateCategory =
  | 'deploy-platform'    // Railway, Vercel, n8n — where templates are deployed
  | 'sales-platform'     // Polar.sh, Lemon Squeezy — where templates are sold
  | 'ai-tool'            // Claude, Suno, Midjourney — recommended tools
  | 'productivity'       // Notion, Zapier, Make — workflow tools
  | 'creative-tool'      // Figma, Adobe, Canva — design tools
  | 'business-tool'      // Stripe, ConvertKit, Teachable — business infra
  | 'monitoring'         // Better Stack — observability for deployed systems

export interface Affiliate {
  id: string
  name: string
  url: string
  category: AffiliateCategory
  commission: string
  cookieDuration: string
  // Deploy platform specifics
  deployButton?: boolean        // Has a native deploy button mechanism
  templateMarketplace?: boolean // Has a template marketplace for listings
  signupUrl?: string            // Where to sign up for the affiliate program
  logoIcon?: string             // Lucide or custom icon name
  brandColor?: string           // Hex color for button styling
  // Oracle non-compete
  oracleCompatible: boolean     // Safe to promote given Oracle employment
}

export type AffiliateLink = Affiliate & {
  trackingUrl: string
}

// ── Deploy Target Config ────────────────────────────────────────────────────
// Maps blueprint slugs to their compatible deploy platforms

export interface DeployTarget {
  platform: string              // affiliate id (e.g., 'railway', 'vercel')
  label: string                 // Button text (e.g., 'Deploy to Railway')
  deployUrl: string             // URL with affiliate tracking
  templateId?: string           // Platform-specific template ID
  variant?: 'primary' | 'secondary' | 'outline'
}

export interface BlueprintDeployConfig {
  blueprintSlug: string
  deployTargets: DeployTarget[]
  purchaseUrl?: string          // Lemon Squeezy / Polar checkout URL
  githubTemplateUrl?: string    // Free GitHub template repo
}

// ── Template Product ────────────────────────────────────────────────────────
// Represents a purchasable template product

export type TemplateStatus = 'coming-soon' | 'active' | 'archived'
export type LicenseType = 'personal' | 'commercial' | 'enterprise'

export interface TemplateProduct {
  id: string
  slug: string
  title: string
  subtitle: string
  price: number
  originalPrice?: number
  currency: 'USD'
  status: TemplateStatus
  licenseType: LicenseType
  // Delivery
  lemonSqueezyVariantId?: string
  polarProductId?: string
  githubRepo?: string
  // Content
  features: string[]
  techStack: string[]
  includesOCI: boolean
  // Revenue attribution
  blueprintSlug?: string         // Related blueprint for cross-linking
  deployPlatforms: string[]      // Which platforms it can deploy to
}
