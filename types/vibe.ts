/**
 * Vibe OS Ecosystem Type Definitions
 *
 * Core types for the Vibe OS multi-agent, multi-LLM creative platform.
 * These types are used across hub pages, agent interactions, and cloud infrastructure.
 */

// =============================================================================
// Agent Types
// =============================================================================

export type AgentCategory =
  | 'music'          // Music production and Suno workflows
  | 'content'        // Writing, SEO, blog creation
  | 'technical'      // Code, architecture, systems
  | 'visual'         // Design, imagery, UI/UX
  | 'research'       // Information gathering, analysis
  | 'worldbuilding'  // Arcanea Cloud, narrative creation

export interface VibeAgent {
  id: string
  name: string
  category: AgentCategory
  personality: string
  specialty: string

  // LLM Configuration
  llm: string                    // Default model ID (e.g., 'claude-sonnet-4.5')
  systemPrompt: string           // Base system instructions
  temperature?: number           // Creativity level (0-1)
  maxTokens?: number             // Response length limit

  // Capabilities
  capabilities: string[]         // What this agent can do
  workflows: AgentWorkflow[]     // Predefined workflows

  // Access Control
  pricing: AgentPricing
  requiredTier?: 'free' | 'club' | 'pro' | 'enterprise'

  // UI Metadata
  avatar?: string                // Image path
  color: string                  // Brand color (hex)
  icon: string                   // Icon name
  badge?: string                 // Optional badge text
}

export interface AgentWorkflow {
  id: string
  name: string
  description: string
  steps: string[]
  estimatedTime?: string
  exampleOutput?: string
}

export interface AgentPricing {
  tier: 'free' | 'premium'
  dailyLimit?: number            // For free tier
  costPerRequest?: number        // For usage-based pricing
}

// =============================================================================
// LLM Provider Types
// =============================================================================

export type LLMProvider =
  | 'anthropic'      // Claude family
  | 'openai'         // GPT family
  | 'google'         // Gemini family
  | 'xai'            // Grok family
  | 'meta'           // Llama family

export interface LLMModel {
  id: string
  name: string
  provider: LLMProvider

  // Capabilities
  capabilities: LLMCapability[]
  contextWindow: number          // Max tokens

  // Performance
  latency: 'fast' | 'medium' | 'slow'
  quality: 'good' | 'great' | 'excellent'

  // Pricing (per 1M tokens)
  pricing: {
    input: number
    output: number
    cached?: number              // For prompt caching
  }

  // Features
  features: {
    streaming?: boolean
    functionCalling?: boolean
    vision?: boolean
    jsonMode?: boolean
    promptCaching?: boolean
  }
}

export type LLMCapability =
  | 'text-generation'
  | 'code-generation'
  | 'reasoning'
  | 'vision'
  | 'structured-output'
  | 'long-context'
  | 'multimodal'

// =============================================================================
// Session Types
// =============================================================================

export interface AgentSession {
  id: string
  userId: string
  agentId: string
  llmModel: string

  // Conversation
  messages: Message[]
  createdAt: Date
  updatedAt: Date
  status: 'active' | 'completed' | 'expired'

  // Context
  context?: Record<string, any>  // User preferences, past sessions, etc.

  // Metrics
  tokensUsed: number
  estimatedCost: number
}

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    model?: string
    tokens?: number
    cost?: number
  }
}

// =============================================================================
// User Content Types
// =============================================================================

export type ContentType =
  | 'music'          // Suno prompts/songs
  | 'text'           // Blog posts, articles
  | 'visual'         // Generated images
  | 'code'           // Code snippets
  | 'world'          // Arcanea Cloud worlds

export interface UserContent {
  id: string
  userId: string
  type: ContentType

  // Content
  title: string
  prompt: string
  output: string

  // Metadata
  agentId: string
  llmModel: string
  createdAt: Date
  published: boolean

  // External IDs
  sunoId?: string              // For music
  blogSlug?: string            // For published blogs
  worldId?: string             // For Arcanea worlds
}

// =============================================================================
// Vibe Club Types
// =============================================================================

export type VibeTier = 'free' | 'club' | 'pro' | 'enterprise'

export interface VibeMembership {
  userId: string
  tier: VibeTier

  // Subscription
  subscriptionId?: string      // Lemon Squeezy subscription ID
  status: 'active' | 'canceled' | 'expired'
  renewsAt?: Date

  // Usage
  monthlyRequests: number
  requestLimit: number

  // Benefits
  features: string[]
  agentAccess: string[]        // Agent IDs user can access
}

export interface VibePack {
  id: string
  month: string                // e.g., "2026-02"
  theme: string

  // Contents
  playlists: VibePlaylist[]
  prompts: SunoPrompt[]
  workflows: AgentWorkflow[]
  bonusContent?: string

  // Tiers
  freeTier: boolean
  clubTier: boolean
  proTier: boolean
}

export interface VibePlaylist {
  id: string
  title: string
  description: string
  state: 'alpha' | 'beta' | 'theta' | 'delta'  // Neuro-state
  songIds: string[]            // Suno song IDs
  duration: number             // Total minutes
}

export interface SunoPrompt {
  id: string
  title: string
  genre: string
  mood: string
  energy: 'low' | 'medium' | 'high'
  prompt: string
  tags: string[]
}

// =============================================================================
// Arcanea Cloud Types
// =============================================================================

export interface ArcaneanWorld {
  id: string
  userId: string
  name: string
  description: string

  // Structure
  gate: number                 // 1-10 (based on 10 Gates)
  element: 'fire' | 'water' | 'earth' | 'air' | 'aether'

  // Content
  lore: WorldLore[]
  characters: WorldCharacter[]
  locations: WorldLocation[]

  // Metadata
  createdAt: Date
  updatedAt: Date
  published: boolean
  collaborators?: string[]     // User IDs
}

export interface WorldLore {
  id: string
  title: string
  content: string
  category: 'mythology' | 'history' | 'magic' | 'culture'
  tags: string[]
}

export interface WorldCharacter {
  id: string
  name: string
  race: string
  backstory: string
  personality: string
  avatar?: string              // Generated image path
}

export interface WorldLocation {
  id: string
  name: string
  description: string
  type: 'city' | 'dungeon' | 'wilderness' | 'realm'
  image?: string               // Generated concept art
}

// =============================================================================
// API Types
// =============================================================================

export interface LLMRequest {
  agentId: string
  messages: Message[]
  model?: string               // Override default agent model
  options?: {
    temperature?: number
    maxTokens?: number
    stream?: boolean
  }
}

export interface LLMResponse {
  message: Message
  usage: {
    inputTokens: number
    outputTokens: number
    totalCost: number
  }
  model: string
}

export interface CostEstimate {
  model: string
  inputTokens: number
  outputTokens: number
  cost: number
  provider: LLMProvider
}
