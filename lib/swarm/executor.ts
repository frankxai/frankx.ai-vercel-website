/**
 * Single-agent execution through the Vercel AI Gateway.
 *
 * Follows lib/ai/gateway-client.ts exactly: plain `"provider/model"` strings,
 * `generateObject` with a zod schema, `isGatewayAvailable()` gate, graceful
 * no-op → null when the Gateway is unconfigured. Never throws to the caller;
 * a failed call returns null so one agent cannot sink the session.
 */

import { generateObject } from 'ai'
import type { z } from 'zod'
import { isGatewayAvailable } from '@/lib/ai/gateway-client'
import { gatewayModelFor, usdOf } from './models'
import type { CatalogAgent } from './catalog'

export { isGatewayAvailable }
export {
  AgentVerdict,
  SynthesisOutput,
  type AgentVerdictT,
  type SynthesisOutputT,
} from './schemas'

export interface AgentRunResult<T> {
  id: string
  model: string
  ok: boolean
  output: T | null
  usage: { inputTokens: number; outputTokens: number }
  costUsd: number
  error?: string
}

export interface Executor {
  runAgent<T>(args: {
    agent: CatalogAgent
    schema: z.ZodType<T>
    system: string
    prompt: string
    maxOutputTokens: number
  }): Promise<AgentRunResult<T>>
}

/**
 * The production executor. Injected into the orchestrator so tests can supply a
 * fake (the orchestrator never imports `ai` transitively at module top when a
 * fake is passed — this module is only imported by the route, not the test).
 */
export const gatewayExecutor: Executor = {
  async runAgent<T>({ agent, schema, system, prompt, maxOutputTokens }: {
    agent: CatalogAgent
    schema: z.ZodType<T>
    system: string
    prompt: string
    maxOutputTokens: number
  }): Promise<AgentRunResult<T>> {
    const model = gatewayModelFor(agent.id, agent.recommended_model)
    if (!isGatewayAvailable()) {
      return { id: agent.id, model, ok: false, output: null, usage: { inputTokens: 0, outputTokens: 0 }, costUsd: 0, error: 'gateway-unconfigured' }
    }
    try {
      const result = await generateObject({
        model,
        schema,
        system,
        prompt,
        temperature: 0.2,
        maxOutputTokens,
      })
      const usage = {
        inputTokens: result.usage?.inputTokens ?? 0,
        outputTokens: result.usage?.outputTokens ?? 0,
      }
      return {
        id: agent.id,
        model,
        ok: true,
        output: result.object as T,
        usage,
        costUsd: usdOf(model, usage),
      }
    } catch (err) {
      return { id: agent.id, model, ok: false, output: null, usage: { inputTokens: 0, outputTokens: 0 }, costUsd: 0, error: (err as Error).message }
    }
  },
}
