import { trackEvent } from './analytics'

export interface ExperimentVariant {
  id: string
  name: string
  weight: number // 0-100 percentage
  metadata?: Record<string, any>
}

export interface FunnelExperiment {
  id: string
  name: string
  description: string
  variants: ExperimentVariant[]
  defaultVariantId: string
  cookieName: string
}

export const ACTIVE_FUNNEL_EXPERIMENTS: Record<string, FunnelExperiment> = {
  exp_ai_writing_offer_v1: {
    id: 'exp_ai_writing_offer_v1',
    name: 'AI Writing System Lead Magnet Offer Variant',
    description: 'Compares Direct PDF Download vs 2-Minute Diagnostic Quiz + Notion Vault Access',
    cookieName: 'fx_exp_ai_writing',
    defaultVariantId: 'A',
    variants: [
      { id: 'A', name: 'Direct PDF Download', weight: 50 },
      { id: 'B', name: 'Diagnostic Quiz + Notion Vault', weight: 50 },
    ],
  },
  exp_agent_stack_funnel_v1: {
    id: 'exp_agent_stack_funnel_v1',
    name: 'Agent Stack Funnel Type',
    description: 'Compares Architecture Diagnostic Quiz vs Direct Technical Blueprint Download',
    cookieName: 'fx_exp_agent_stack',
    defaultVariantId: 'A',
    variants: [
      { id: 'A', name: 'Diagnostic Quiz', weight: 50 },
      { id: 'B', name: 'Direct Blueprint', weight: 50 },
    ],
  },
  exp_top_prompts_v1: {
    id: 'exp_top_prompts_v1',
    name: 'Top 50 Prompts Format',
    description: 'Compares Notion Prompt Vault vs PDF Cheatsheet Download',
    cookieName: 'fx_exp_top_prompts',
    defaultVariantId: 'A',
    variants: [
      { id: 'A', name: 'Notion Prompt Vault', weight: 50 },
      { id: 'B', name: 'PDF Cheatsheet', weight: 50 },
    ],
  },
}

/**
 * Returns assigned variant for an experiment based on cookie or deterministic hash.
 */
export function getAssignedVariant(
  experimentId: string,
  cookieValue?: string | null,
  overrideParam?: string | null
): string {
  const experiment = ACTIVE_FUNNEL_EXPERIMENTS[experimentId]
  if (!experiment) return 'A'

  // Explicit override via query string ?variant=B
  if (overrideParam && experiment.variants.some((v) => v.id === overrideParam)) {
    return overrideParam
  }

  // Cookie-assigned variant
  if (cookieValue && experiment.variants.some((v) => v.id === cookieValue)) {
    return cookieValue
  }

  // Default fallback
  return experiment.defaultVariantId
}

/**
 * Tracks split test impression event.
 */
export function trackExperimentImpression(experimentId: string, variantId: string, path: string) {
  trackEvent('experiment_impression', {
    experiment_id: experimentId,
    variant_id: variantId,
    path,
  })
}

/**
 * Tracks split test conversion event (lead captured, quiz finished, download triggered).
 */
export function trackExperimentConversion(
  experimentId: string,
  variantId: string,
  conversionType: 'lead_captured' | 'quiz_completed' | 'waitlist_joined' | 'download_triggered',
  metadata: Record<string, any> = {}
) {
  trackEvent('experiment_conversion', {
    experiment_id: experimentId,
    variant_id: variantId,
    conversion_type: conversionType,
    ...metadata,
  })
}
