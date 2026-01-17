// Types for AI Architecture
export type PrototypeCategory = 'ai-gateway' | 'agent-system' | 'data-pipeline' | 'monitoring'
export type CloudProvider = 'aws' | 'gcp' | 'azure' | 'multi-cloud'
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'

export interface ArchitecturePrototype {
  id: string
  title: string
  description: string
  category: PrototypeCategory
  difficulty: DifficultyLevel
  providers: CloudProvider[]
  steps?: any[]
  examples?: any[]
  recommendations?: any[]
  technologies?: any[]
  useCases?: any[]
  integrationPatterns?: any[]
}

export const CATEGORY_META: Record<PrototypeCategory, any> = {
  'ai-gateway': { name: 'AI Gateway', description: 'API Gateway patterns' },
  'agent-system': { name: 'Agent System', description: 'Multi-agent systems' },
  'data-pipeline': { name: 'Data Pipeline', description: 'Data processing pipelines' },
  'monitoring': { name: 'Monitoring', description: 'Observability and monitoring' },
}

export const CLOUD_PROVIDER_META: Record<CloudProvider, any> = {
  'aws': { name: 'AWS', description: 'Amazon Web Services' },
  'gcp': { name: 'GCP', description: 'Google Cloud Platform' },
  'azure': { name: 'Azure', description: 'Microsoft Azure' },
  'multi-cloud': { name: 'Multi-Cloud', description: 'Multiple cloud providers' },
}

export const DIFFICULTY_META: Record<DifficultyLevel, any> = {
  'beginner': { name: 'Beginner', description: 'Entry level' },
  'intermediate': { name: 'Intermediate', description: 'Moderate complexity' },
  'advanced': { name: 'Advanced', description: 'Expert level' },
}
