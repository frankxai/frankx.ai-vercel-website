export type ProductSocialProofStat = {
  number: string
  label: string
}

export type ProductTestimonial = {
  quote: string
  author: string
  role?: string
}

export type ProductModule = {
  title: string
  description: string
}

export type ProductBonus = {
  title: string
  value: string
  description: string
}

export type ProductFaq = {
  question: string
  answer: string
}

export type ProductGuarantee = {
  label: string
  description: string
}

export type ProductPricingTier = {
  name: string
  price: string
  description: string
  features: string[]
  ctaLabel: string
  ctaHref: string
  featured?: boolean
}

export type ProductOffer = {
  primaryPrice: number
  primaryPriceDisplay?: string
  originalPrice?: number
  currency: string
  ctaPrimary: string
  ctaPrimaryHref: string
  ctaPrimaryTracking?: string
  ctaSecondary?: string
  ctaSecondaryHref?: string
  ctaSecondaryTracking?: string
  guarantee: ProductGuarantee
  note?: string
}

export type ProductCaseStudy = {
  title: string
  description: string
  metric?: string
  quote?: string
  author?: string
  role?: string
  ctaLabel?: string
  ctaHref?: string
}

/**
 * Digital file available for download
 */
export type ProductFile = {
  name: string
  format: 'pdf' | 'zip' | 'video' | 'audio' | 'notion'
  blobKey: string // Vercel Blob storage key
  sizeBytes?: number
  description?: string
}

/**
 * Delivery configuration for digital products
 */
export type ProductDelivery = {
  methods: ('download' | 'email' | 'gated' | 'whop')[]
  files?: ProductFile[]
  requiresEmail?: boolean
  whopProductId?: string
}

export type ProductRecord = {
  id: string
  slug: string
  name: string
  badge?: string
  category?: string
  headline: string
  subheadline: string
  promise: string
  summary?: string
  transformation: string[]
  socialProof: {
    stats: ProductSocialProofStat[]
    quotes: ProductTestimonial[]
  }
  offer: ProductOffer
  modules: ProductModule[]
  bonuses?: ProductBonus[]
  pricingTiers?: ProductPricingTier[]
  caseStudies?: ProductCaseStudy[]
  faq: ProductFaq[]
  analyticsId?: string
  /** Digital delivery configuration */
  delivery?: ProductDelivery
}

