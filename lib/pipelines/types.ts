/**
 * Pipeline types for FrankX.AI processing pipelines
 */

export interface PipelineStep {
  id: string
  name: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  output?: any
  error?: string
}

export interface PipelineResult {
  success: boolean
  steps: PipelineStep[]
  output?: any
  error?: string
}

export interface ContentPipeline {
  id: string
  name: string
  steps: PipelineStep[]
  execute(): Promise<PipelineResult>
}

// Voice Search Optimization types
export interface VoiceSearchQuery {
  query: string
  intent: string
  entities: string[]
}

export interface VoiceSearchResult {
  query: VoiceSearchQuery
  optimizedContent: string
  keywords: string[]
  score: number
}
