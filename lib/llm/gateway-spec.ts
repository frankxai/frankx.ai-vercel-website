/**
 * Vibe OS Multi-LLM Gateway API Specification
 *
 * This specification defines the intelligent routing layer that orchestrates
 * requests across 5 LLM providers (Anthropic, OpenAI, Google, xAI, Meta).
 *
 * @version 1.0.0
 * @author Frank
 * @date 2026-02-17
 */

// ============================================================================
// Core Type Definitions
// ============================================================================

export type LLMProvider = 'anthropic' | 'openai' | 'google' | 'xai' | 'meta'

export type UserTier = 'free' | 'club' | 'pro' | 'byok'

export interface LLMModel {
  id: string
  name: string
  provider: LLMProvider
  capabilities: string[]
  contextWindow: number
  latency: 'fast' | 'medium' | 'slow'
  quality: 'good' | 'great' | 'excellent'
  pricing: {
    input: number  // per 1M tokens
    output: number // per 1M tokens
    cached?: number // per 1M tokens (if supported)
  }
  features: {
    streaming: boolean
    functionCalling: boolean
    vision: boolean
    jsonMode: boolean
    promptCaching: boolean
  }
}

export interface AgentTask {
  agentId: string
  input: string
  systemPrompt: string
  conversationHistory?: ConversationMessage[]

  // Routing hints
  preferredModel?: string
  requiresStructuredOutput?: boolean
  requiresReasoning?: boolean
  requiresVision?: boolean
  contextLength?: number
  maxLatency?: number // milliseconds
  maxCost?: number // dollars

  // User context
  userId: string
  tier: UserTier
  apiKeys?: UserAPIKeys
}

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

export interface UserAPIKeys {
  anthropic?: string
  openai?: string
  google?: string
  xai?: string
  meta?: string
}

export interface AgentResponse {
  content: string
  model: string
  provider: LLMProvider
  usage: {
    inputTokens: number
    outputTokens: number
    cachedTokens?: number
  }
  cost: {
    input: number
    output: number
    cached: number
    total: number
  }
  latency: number // milliseconds
  finishReason: 'stop' | 'length' | 'content_filter' | 'tool_calls'
  metadata?: Record<string, unknown>
}

export interface RoutingDecision {
  selectedModel: LLMModel
  reason: string
  alternatives: Array<{
    model: LLMModel
    score: number
    reason: string
  }>
  estimatedCost: number
  estimatedLatency: number
  fallbackChain: LLMModel[]
}

// ============================================================================
// Gateway Interface
// ============================================================================

export interface LLMGateway {
  /**
   * Routes and executes an agent task through optimal LLM provider
   *
   * @param task - Agent task with requirements and constraints
   * @returns Agent response with usage and cost metrics
   * @throws GatewayError if all providers fail
   */
  execute(task: AgentTask): Promise<AgentResponse>

  /**
   * Determines optimal model without executing
   *
   * @param task - Agent task for routing analysis
   * @returns Routing decision with model selection rationale
   */
  route(task: AgentTask): Promise<RoutingDecision>

  /**
   * Streams response from LLM provider
   *
   * @param task - Agent task
   * @param onChunk - Callback for each token/chunk
   * @returns Final complete response
   */
  executeStream(
    task: AgentTask,
    onChunk: (chunk: string) => void
  ): Promise<AgentResponse>

  /**
   * Validates user API keys for BYOK tier
   *
   * @param keys - User-provided API keys
   * @returns Validation results per provider
   */
  validateKeys(keys: UserAPIKeys): Promise<Record<LLMProvider, boolean>>

  /**
   * Estimates cost for a task without execution
   *
   * @param task - Agent task
   * @returns Cost estimate per model
   */
  estimateCost(task: AgentTask): Promise<Record<string, number>>
}

// ============================================================================
// Routing Strategy
// ============================================================================

export interface RoutingStrategy {
  /**
   * Analyzes task and selects optimal model
   *
   * Priority order:
   * 1. User tier constraints (free → Gemini only)
   * 2. Task requirements (structured output → GPT, vision → GPT/Claude Opus)
   * 3. Context length (>128k → Gemini)
   * 4. Cost optimization (prefer cheaper model if quality sufficient)
   * 5. Quality requirements (strategic tasks → Opus)
   *
   * @param task - Agent task
   * @param availableModels - Models user has access to
   * @returns Selected model and rationale
   */
  selectModel(task: AgentTask, availableModels: LLMModel[]): RoutingDecision
}

export class CostOptimizedRouting implements RoutingStrategy {
  selectModel(task: AgentTask, models: LLMModel[]): RoutingDecision {
    // Free tier: Force Gemini Flash
    if (task.tier === 'free') {
      const geminiFlash = models.find(m => m.id === 'gemini-2.0-flash')!
      return {
        selectedModel: geminiFlash,
        reason: 'Free tier restricted to Gemini 2.0 Flash',
        alternatives: [],
        estimatedCost: this.calculateCost(task, geminiFlash),
        estimatedLatency: 2000,
        fallbackChain: []
      }
    }

    // BYOK: Use preferred model or optimize
    if (task.tier === 'byok') {
      if (task.preferredModel) {
        const model = models.find(m => m.id === task.preferredModel)!
        return {
          selectedModel: model,
          reason: 'User-specified preferred model (BYOK)',
          alternatives: this.rankAlternatives(task, models),
          estimatedCost: this.calculateCost(task, model),
          estimatedLatency: this.estimateLatency(model),
          fallbackChain: this.buildFallbackChain(model, models)
        }
      }
    }

    // Structured output requirement → GPT-4o
    if (task.requiresStructuredOutput) {
      const gpt4o = models.find(m => m.id === 'gpt-4o')!
      return {
        selectedModel: gpt4o,
        reason: 'Task requires structured output (JSON mode)',
        alternatives: this.rankAlternatives(task, models),
        estimatedCost: this.calculateCost(task, gpt4o),
        estimatedLatency: 3000,
        fallbackChain: [models.find(m => m.id === 'claude-sonnet-4.5')!]
      }
    }

    // Long context (>128k) → Gemini 2.0 Pro
    if (task.contextLength && task.contextLength > 128000) {
      const geminiPro = models.find(m => m.id === 'gemini-2.0-pro')!
      return {
        selectedModel: geminiPro,
        reason: 'Context length >128k requires 1M context window',
        alternatives: this.rankAlternatives(task, models),
        estimatedCost: this.calculateCost(task, geminiPro),
        estimatedLatency: 4000,
        fallbackChain: []
      }
    }

    // Default: Claude Sonnet 4.5 (best reasoning)
    const claudeSonnet = models.find(m => m.id === 'claude-sonnet-4.5')!
    return {
      selectedModel: claudeSonnet,
      reason: 'Default model for reasoning tasks',
      alternatives: this.rankAlternatives(task, models),
      estimatedCost: this.calculateCost(task, claudeSonnet),
      estimatedLatency: 3500,
      fallbackChain: [
        models.find(m => m.id === 'gpt-4o')!,
        models.find(m => m.id === 'gemini-2.0-pro')!
      ]
    }
  }

  private calculateCost(task: AgentTask, model: LLMModel): number {
    const inputTokens = this.estimateTokens(task.input + task.systemPrompt)
    const outputTokens = 2000 // estimate
    return (
      (inputTokens / 1_000_000) * model.pricing.input +
      (outputTokens / 1_000_000) * model.pricing.output
    )
  }

  private estimateTokens(text: string): number {
    // Rough estimate: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4)
  }

  private estimateLatency(model: LLMModel): number {
    const latencyMap = {
      fast: 2000,
      medium: 3500,
      slow: 6000
    }
    return latencyMap[model.latency]
  }

  private rankAlternatives(
    task: AgentTask,
    models: LLMModel[]
  ): Array<{ model: LLMModel; score: number; reason: string }> {
    return models
      .map(model => ({
        model,
        score: this.scoreModel(task, model),
        reason: this.explainScore(task, model)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
  }

  private scoreModel(task: AgentTask, model: LLMModel): number {
    let score = 0

    // Cost efficiency (0-40 points)
    const costPerToken = (model.pricing.input + model.pricing.output) / 2
    score += Math.max(0, 40 - costPerToken * 2)

    // Quality match (0-30 points)
    const qualityPoints = { good: 10, great: 20, excellent: 30 }
    score += qualityPoints[model.quality]

    // Capability match (0-20 points)
    if (task.requiresStructuredOutput && model.features.jsonMode) score += 20
    if (task.requiresVision && model.features.vision) score += 20
    if (task.requiresReasoning && model.quality === 'excellent') score += 20

    // Latency (0-10 points)
    const latencyPoints = { fast: 10, medium: 5, slow: 0 }
    score += latencyPoints[model.latency]

    return score
  }

  private explainScore(task: AgentTask, model: LLMModel): string {
    const reasons: string[] = []

    if (model.features.jsonMode && task.requiresStructuredOutput) {
      reasons.push('Supports structured output')
    }

    if (model.quality === 'excellent') {
      reasons.push('Excellent quality')
    }

    if (model.latency === 'fast') {
      reasons.push('Fast response time')
    }

    const costPerToken = (model.pricing.input + model.pricing.output) / 2
    if (costPerToken < 5) {
      reasons.push('Cost-efficient')
    }

    return reasons.join(', ') || 'Standard option'
  }

  private buildFallbackChain(primary: LLMModel, all: LLMModel[]): LLMModel[] {
    return all
      .filter(m => m.id !== primary.id && m.provider !== primary.provider)
      .sort((a, b) => {
        // Prioritize quality, then cost
        if (a.quality !== b.quality) {
          const qualityRank = { excellent: 3, great: 2, good: 1 }
          return qualityRank[b.quality] - qualityRank[a.quality]
        }
        const aCost = (a.pricing.input + a.pricing.output) / 2
        const bCost = (b.pricing.input + b.pricing.output) / 2
        return aCost - bCost
      })
      .slice(0, 2)
  }
}

// ============================================================================
// Rate Limiting
// ============================================================================

export interface RateLimiter {
  /**
   * Checks if user can make request based on tier limits
   *
   * Limits:
   * - Free: 10 Music Producer/day, 5 Creation Engine/day, Gemini only
   * - Club: Unlimited (soft limit 1000/day), all models
   * - Pro: Unlimited, all models + priority
   * - BYOK: Unlimited (user's API key limits apply)
   *
   * @param userId - User identifier
   * @param agentId - Agent being invoked
   * @param tier - User subscription tier
   * @returns Whether request is allowed
   */
  checkLimit(userId: string, agentId: string, tier: UserTier): Promise<boolean>

  /**
   * Records a usage event
   *
   * @param userId - User identifier
   * @param agentId - Agent used
   * @param tokens - Total tokens consumed
   * @param cost - Actual cost in dollars
   */
  recordUsage(
    userId: string,
    agentId: string,
    tokens: number,
    cost: number
  ): Promise<void>

  /**
   * Gets current usage stats for user
   *
   * @param userId - User identifier
   * @returns Usage statistics
   */
  getUsage(userId: string): Promise<{
    daily: Record<string, number>
    monthly: Record<string, number>
    totalCost: number
  }>
}

// ============================================================================
// Session Management
// ============================================================================

export interface SessionManager {
  /**
   * Creates or retrieves agent session
   *
   * Sessions stored in Vercel KV with 30-day TTL.
   * Structure: {userId}:{agentId}:{sessionId}
   *
   * @param userId - User identifier
   * @param agentId - Agent identifier
   * @returns Session ID
   */
  createSession(userId: string, agentId: string): Promise<string>

  /**
   * Appends message to conversation history
   *
   * @param sessionId - Session identifier
   * @param message - Conversation message
   */
  appendMessage(sessionId: string, message: ConversationMessage): Promise<void>

  /**
   * Retrieves conversation history
   *
   * @param sessionId - Session identifier
   * @param limit - Max messages to retrieve (default: 50)
   * @returns Conversation messages
   */
  getHistory(sessionId: string, limit?: number): Promise<ConversationMessage[]>

  /**
   * Deletes session and all conversation history
   *
   * @param sessionId - Session identifier
   */
  deleteSession(sessionId: string): Promise<void>
}

// ============================================================================
// Error Handling
// ============================================================================

export class GatewayError extends Error {
  constructor(
    message: string,
    public code: string,
    public provider?: LLMProvider,
    public originalError?: Error
  ) {
    super(message)
    this.name = 'GatewayError'
  }
}

export const ErrorCodes = {
  PROVIDER_UNAVAILABLE: 'PROVIDER_UNAVAILABLE',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INVALID_API_KEY: 'INVALID_API_KEY',
  CONTEXT_LENGTH_EXCEEDED: 'CONTEXT_LENGTH_EXCEEDED',
  CONTENT_FILTERED: 'CONTENT_FILTERED',
  INSUFFICIENT_TIER: 'INSUFFICIENT_TIER',
  ALL_PROVIDERS_FAILED: 'ALL_PROVIDERS_FAILED'
} as const

// ============================================================================
// Usage Example
// ============================================================================

/**
 * Example: Music Producer agent request
 *
 * const gateway: LLMGateway = new MultiLLMGateway()
 *
 * const task: AgentTask = {
 *   agentId: 'music-producer',
 *   userId: 'user_123',
 *   tier: 'club',
 *   input: 'Create a Suno prompt for deep work coding session',
 *   systemPrompt: vibe-agents.json['music-producer'].systemPrompt,
 *   requiresReasoning: true,
 *   maxCost: 0.05
 * }
 *
 * // Get routing decision
 * const routing = await gateway.route(task)
 * console.log(routing.selectedModel.id) // 'claude-sonnet-4.5'
 * console.log(routing.reason) // 'Default model for reasoning tasks'
 *
 * // Execute request
 * const response = await gateway.execute(task)
 * console.log(response.content) // Suno prompt + production notes
 * console.log(response.cost.total) // $0.042
 * console.log(response.model) // 'claude-sonnet-4.5'
 */

// ============================================================================
// Implementation Notes
// ============================================================================

/**
 * 1. Provider SDK Integration:
 *    - Anthropic: @anthropic-ai/sdk
 *    - OpenAI: openai
 *    - Google: @google/generative-ai
 *    - xAI: axios (REST API)
 *    - Meta: Together AI or Replicate
 *
 * 2. Vercel KV Schema:
 *    - Sessions: `session:{sessionId}` → ConversationMessage[]
 *    - Rate limits: `ratelimit:{userId}:{agentId}:{date}` → count
 *    - Usage: `usage:{userId}:{month}` → { tokens, cost }
 *
 * 3. Fallback Behavior:
 *    - If primary provider fails → try fallbackChain[0]
 *    - If all providers fail → throw ALL_PROVIDERS_FAILED
 *    - Log all failures to monitoring (Vercel Analytics)
 *
 * 4. Cost Tracking:
 *    - Record every request to analytics
 *    - Monthly aggregation per user
 *    - Alert if user exceeds expected cost (fraud prevention)
 *
 * 5. Security:
 *    - API keys encrypted at rest (Vercel Secrets)
 *    - BYOK keys never logged
 *    - Rate limiting to prevent abuse
 *    - Content filtering on all responses
 */
