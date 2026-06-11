import type { CrossLink, CrossLinkSurface } from '@/content/partnerships/types'

/**
 * Canonical cross-link targets for partnership pages.
 *
 * Each constant is the single source of truth for one surface. When a route
 * moves (e.g., `/ai-coe` ships as a subdomain or shifts to a new path),
 * one edit here propagates to every partner config.
 */

export const SURFACE_HREFS: Record<CrossLinkSurface, string> = {
  'ai-coe': '/ai-coe',
  'ai-architecture': '/ai-architecture',
  'ai-architect-academy': '/ai-architect-academy',
  research: '/research',
  workshops: '/workshops',
  blog: '/blog',
  os: '/os',
  'learn-gemini': '/learn/gemini-mastery',
  'learn-claude': '/learn/claude-mastery',
  connect: '/connect',
}

export const SURFACE_LABELS: Record<CrossLinkSurface, string> = {
  'ai-coe': 'AI CoE blueprint',
  'ai-architecture': 'Reference architectures',
  'ai-architect-academy': 'AI Architect Academy',
  research: 'Research Hub',
  workshops: 'Workshops calendar',
  blog: 'Field notes',
  os: 'FrankX OS overview',
  'learn-gemini': 'Gemini & Google AI mastery portal',
  'learn-claude': 'Claude mastery portal',
  connect: 'Connect — in-person + QR landing',
}

/**
 * Helper for partner configs — pass a surface key and a partner-specific
 * rationale; href + canonical label resolve automatically.
 */
export function crossLink(
  surface: CrossLinkSurface,
  rationale: string,
  labelOverride?: string
): CrossLink {
  return {
    surface,
    label: labelOverride ?? SURFACE_LABELS[surface],
    href: SURFACE_HREFS[surface],
    rationale,
  }
}
