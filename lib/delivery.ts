/**
 * FrankX Product Delivery System
 * Handles digital product delivery via email and access codes
 */

import { getProductById } from './products'

// Product delivery configuration
export interface DeliveryConfig {
  productId: string
  deliveryType: 'pdf' | 'access-code' | 'email-course' | 'external'
  files?: string[]
  accessCategories?: string[]
  emailTemplateId?: string
}

// Delivery configurations for each product
export const DELIVERY_CONFIG: Record<string, DeliveryConfig> = {
  'creative-ai-toolkit': {
    productId: 'creative-ai-toolkit',
    deliveryType: 'pdf',
    files: ['creative-ai-toolkit-v1.pdf'],
    emailTemplateId: 'product-delivery',
  },
  'vibe-os': {
    productId: 'vibe-os',
    deliveryType: 'pdf',
    files: ['Vibe-OS-Guide.pdf'],
    accessCategories: ['music-creation', 'state-management', 'creative'],
    emailTemplateId: 'free-product',
  },
  'creation-chronicles': {
    productId: 'creation-chronicles',
    deliveryType: 'pdf',
    files: ['creation-chronicles-framework.pdf'],
    emailTemplateId: 'product-delivery',
  },
  'generative-creator-os': {
    productId: 'generative-creator-os',
    deliveryType: 'access-code',
    files: ['GenCreator-OS-Guide.pdf'],
    accessCategories: ['image-generation', 'creative', 'writing', 'multi-modal'],
    emailTemplateId: 'premium-product',
  },
  'agentic-creator-os': {
    productId: 'agentic-creator-os',
    deliveryType: 'access-code',
    files: [
      'ACOS-Quickstart-Guide.pdf',
      'ACOS-Complete-Reference.pdf',
      'ACOS-Custom-Agent-Guide.pdf',
    ],
    accessCategories: ['agent-development', 'ai-architecture', 'coding'],
    emailTemplateId: 'premium-product',
  },
}

/**
 * Generate a secure access code for premium content
 */
export function generateAccessCode(productId: string): string {
  const prefix = productId.replace(/-/g, '').substring(0, 4).toUpperCase()
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

/**
 * Get product download URL (stored in /public/products/)
 */
export function getProductDownloadUrl(filename: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://frankx.ai'
  // Files would be stored in a protected location or CDN
  // For now, using a signed URL pattern
  const token = generateAccessCode('download')
  return `${baseUrl}/api/download/${filename}?token=${token}`
}

/**
 * Get the delivery configuration for a product
 */
export function getDeliveryConfig(productId: string): DeliveryConfig | undefined {
  return DELIVERY_CONFIG[productId]
}

/**
 * Email template data for product delivery
 */
export interface ProductEmailData {
  customerName: string
  customerEmail: string
  productName: string
  productId: string
  downloadLinks: Array<{ name: string; url: string }>
  accessCode?: string
  bonusContent?: string[]
}

/**
 * Generate email data for a product purchase
 */
export function generateProductEmailData(
  productId: string,
  customerName: string,
  customerEmail: string
): ProductEmailData | null {
  const product = getProductById(productId)
  const config = getDeliveryConfig(productId)

  if (!product || !config) {
    return null
  }

  const downloadLinks = (config.files || []).map((file) => ({
    name: file.replace('.pdf', '').replace(/-/g, ' '),
    url: getProductDownloadUrl(file),
  }))

  return {
    customerName,
    customerEmail,
    productName: product.name,
    productId,
    downloadLinks,
    accessCode: config.deliveryType === 'access-code' ? generateAccessCode(productId) : undefined,
    bonusContent: config.accessCategories,
  }
}

/**
 * Gumroad webhook payload type
 */
export interface GumroadWebhookPayload {
  email: string
  full_name: string
  product_id: string
  product_name: string
  sale_id: string
  sale_timestamp: string
  price: number
  currency: string
  test?: boolean
}

/**
 * Lemon Squeezy webhook payload type (simplified)
 */
export interface LemonSqueezyWebhookPayload {
  meta: {
    event_name: 'order_created' | 'subscription_created' | 'license_key_created'
  }
  data: {
    id: string
    attributes: {
      user_email: string
      user_name: string
      product_id: number
      product_name: string
      total: number
      currency: string
      status: string
    }
  }
}
