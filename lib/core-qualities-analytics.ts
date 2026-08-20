import type { QualitySlug } from '@/lib/qualities'

export const coreQualitiesAnalyticsEvents = {
  navigation: 'core_qualities_navigation',
  evidenceOpened: 'core_qualities_evidence_opened',
  fieldSheet: 'core_qualities_field_sheet',
} as const

type NavigationSource =
  | 'overview'
  | 'detail'
  | 'research_hub'
  | 'related_qualities'
  | 'about'
  | 'footer'
  | 'mobile_nav'
  | 'desktop_nav'

type NavigationPlacement =
  | 'hero_primary'
  | 'hero_secondary'
  | 'hero_cta'
  | 'system_map'
  | 'quality_chapter'
  | 'breadcrumb'
  | 'pagination'
  | 'qualities_bridge_primary'
  | 'qualities_bridge_secondary'
  | 'content_reverse_link'
  | 'principles'
  | 'workspace_column'
  | 'workspace_group'

type NavigationDestination =
  | 'reflection'
  | 'evidence'
  | 'practice'
  | 'quality_detail'
  | 'overview'
  | 'research_program'

export interface NavigationProperties {
  source: NavigationSource
  placement: NavigationPlacement
  destination: NavigationDestination
  quality_slug?: QualitySlug
  source_path?: string
  direction?: 'previous' | 'next'
}

export interface EvidenceProperties {
  source: 'overview' | 'detail'
  placement: 'evidence_ledger' | 'evidence_footer' | 'research_question'
  destination: string
  evidence_kind: 'research' | 'essay' | 'book_chapter' | 'build'
  quality_slug?: QualitySlug
}

export interface FieldSheetProperties {
  action: 'clear' | 'save' | 'download'
  outcome?: 'stored' | 'download_fallback'
  trigger?: 'button' | 'storage_fallback'
}

export function coreQualitiesNavigationEvent(properties: NavigationProperties) {
  return {
    eventName: coreQualitiesAnalyticsEvents.navigation,
    eventProperties: { ...properties },
  }
}

export function coreQualitiesEvidenceEvent(properties: EvidenceProperties) {
  return {
    eventName: coreQualitiesAnalyticsEvents.evidenceOpened,
    eventProperties: { ...properties },
  }
}

export function coreQualitiesFieldSheetEvent(properties: FieldSheetProperties) {
  return {
    eventName: coreQualitiesAnalyticsEvents.fieldSheet,
    eventProperties: { ...properties },
  }
}
