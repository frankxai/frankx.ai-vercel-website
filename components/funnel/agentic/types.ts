export type FunnelStepType = 
  | 'identity'
  | 'objective'
  | 'experience'
  | 'ai_diagnose'
  | 'tier_offer'
  | 'delivery'

export interface FunnelOption {
  id: string
  label: string
  description?: string
  iconName?: string
  badge?: string
  recommendedTier?: string
  weight?: number
}

export interface FunnelQuestion {
  id: string
  step: FunnelStepType
  title: string
  subtitle: string
  options: FunnelOption[]
  multiSelect?: boolean
}

export interface FunnelUserAnswers {
  identity?: string
  objective?: string
  experience?: string
  selectedOptions?: string[]
  email?: string
  customNotes?: string
}

export interface AIAnalysisResult {
  readinessScore: number
  archetype: string
  coreBottleneck: string
  recommendedProductId: string
  recommendedProductName: string
  actionPlan: string[]
  dynamicHeadline: string
  valueMetrics: {
    estimatedTimeSavedWeekly: string
    estimatedAutomationBoost: string
  }
}

export interface DeliveryPackage {
  productId: string
  productName: string
  accessKey: string
  downloadUrl?: string
  communityInviteUrl?: string
  repoAccessGranted?: boolean
  roadmap: string[]
}
