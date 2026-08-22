/**
 * Agentic fulfillment contract
 *
 * Purchase → verified webhook → grant access → email → community → analytics.
 * Decoupled SKUs must not require Frank. Private Research SKUs stay application-gated.
 */

import { getSkuById, type PortfolioSku } from '@/data/portfolio-registry'

export type FulfillmentEvent = {
  provider: 'stripe' | 'lemon_squeezy' | 'polar' | 'whop' | 'manual'
  eventId: string
  productId: string
  customerEmail: string
  customerName?: string
  amountCents?: number
  currency?: string
  rawType: string
}

export type FulfillmentStep =
  | { type: 'download'; assetIds: string[] }
  | { type: 'email'; templateId: string }
  | { type: 'community'; grant: NonNullable<PortfolioSku['fulfillment']['communityGrant']> }
  | { type: 'github'; repo: string }
  | { type: 'membership'; provider: string }
  | { type: 'application_queue'; reason: string }
  | { type: 'analytics'; name: string; props: Record<string, string> }

export type FulfillmentPlan = {
  productId: string
  email: string
  decoupled: boolean
  steps: FulfillmentStep[]
  humanRequired: boolean
}

export function buildFulfillmentPlan(event: FulfillmentEvent): FulfillmentPlan | { error: string } {
  const sku = getSkuById(event.productId)
  if (!sku) return { error: `Unknown productId: ${event.productId}` }

  const steps: FulfillmentStep[] = []
  const f = sku.fulfillment

  if (f.mode === 'application-review' || !f.decoupledFromFrank) {
    steps.push({
      type: 'application_queue',
      reason: 'SKU requires human review or Founder time — do not auto-grant full access',
    })
    steps.push({
      type: 'email',
      templateId: f.emailTemplateId || 'application-received',
    })
  } else {
    if (f.assets?.length) {
      steps.push({ type: 'download', assetIds: f.assets })
    }
    if (f.githubRepo) {
      steps.push({ type: 'github', repo: f.githubRepo })
    }
    if (f.communityGrant && f.communityGrant !== 'none') {
      steps.push({ type: 'community', grant: f.communityGrant })
    }
    if (f.mode === 'membership') {
      steps.push({ type: 'membership', provider: sku.checkout.primaryMor })
    }
    steps.push({
      type: 'email',
      templateId: f.emailTemplateId || `delivery-${sku.id}`,
    })
  }

  steps.push({
    type: 'analytics',
    name: 'commerce_fulfilled',
    props: {
      productId: sku.id,
      brand: sku.brand,
      provider: event.provider,
      decoupled: String(f.decoupledFromFrank),
    },
  })

  return {
    productId: sku.id,
    email: event.customerEmail,
    decoupled: f.decoupledFromFrank,
    steps,
    humanRequired: !f.decoupledFromFrank || f.mode === 'application-review',
  }
}

/**
 * Execute plan steps that are safe without external credentials.
 * Real email / Discord / Skool adapters plug in behind feature flags.
 */
export async function executeFulfillmentPlan(plan: FulfillmentPlan): Promise<{
  ok: boolean
  executed: string[]
  deferred: string[]
  logs: string[]
}> {
  const executed: string[] = []
  const deferred: string[] = []
  const logs: string[] = []

  for (const step of plan.steps) {
    switch (step.type) {
      case 'analytics':
        logs.push(`analytics:${step.name}:${JSON.stringify(step.props)}`)
        executed.push('analytics')
        break
      case 'download':
        // Delivery URLs are resolved by existing lib/delivery when wired
        logs.push(`download:assets=${step.assetIds.join(',')}`)
        executed.push('download')
        break
      case 'email':
        if (!process.env.RESEND_API_KEY && !process.env.EMAIL_SERVER) {
          deferred.push(`email:${step.templateId}`)
          logs.push('email:deferred:no_provider')
        } else {
          deferred.push(`email:${step.templateId}:provider_ready`)
          logs.push('email:queued')
        }
        break
      case 'community':
      case 'github':
      case 'membership':
      case 'application_queue':
        deferred.push(step.type)
        logs.push(`${step.type}:requires_integration`)
        break
      default:
        deferred.push('unknown')
    }
  }

  return {
    ok: true,
    executed,
    deferred,
    logs,
  }
}
