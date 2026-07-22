import { getAdapter } from "./demo-adapters"
import { findCycleNodeIds } from "./graph"
import {
  type EngineStatus,
  type FoundryNode,
  type RunEvent,
  type Workflow,
} from "./types"

/**
 * RUN ENGINE - deterministic, cancellable driver for the demo.
 *
 * A single run token advances along the active dependency path (topological
 * order). Each node resolves in sequence: queued -> running -> complete, with
 * generation nodes producing an output. Review nodes pause the run
 * (review-needed) until the operator resumes; failures stop the run and can be
 * restarted from the failed node. No ambient loops - motion is driven only by
 * this progression.
 */

export interface RunOptions {
  runId: string
  /** Resume/restart entry point. Omit to run from the start. */
  startFromNodeId?: string
  /** Deterministic failure injection for demonstrating restart-from-failed. */
  failAtNodeId?: string
  /** Per-step delay in ms. Pass 0 for reduced motion (instant stepped states). */
  stepDelayMs?: number
}

type Listener = (event: RunEvent) => void

function topoSort(nodes: FoundryNode[], edges: Workflow["edges"]): FoundryNode[] {
  const indegree = new Map<string, number>()
  const adjacency = new Map<string, string[]>()
  nodes.forEach((n) => {
    indegree.set(n.id, 0)
    adjacency.set(n.id, [])
  })
  edges.forEach((e) => {
    if (!indegree.has(e.source) || !indegree.has(e.target)) return
    adjacency.get(e.source)!.push(e.target)
    indegree.set(e.target, (indegree.get(e.target) ?? 0) + 1)
  })

  // Stable ordering: process in the node array order to keep runs reproducible.
  const queue = nodes.filter((n) => (indegree.get(n.id) ?? 0) === 0).map((n) => n.id)
  const ordered: string[] = []
  while (queue.length) {
    const id = queue.shift()!
    ordered.push(id)
    for (const next of adjacency.get(id) ?? []) {
      indegree.set(next, (indegree.get(next) ?? 0) - 1)
      if ((indegree.get(next) ?? 0) === 0) queue.push(next)
    }
  }

  const byId = new Map(nodes.map((n) => [n.id, n]))
  // For DISPLAY ONLY (mobile step list): append any nodes left out by cycles so
  // the list never silently drops nodes. The run engine does NOT rely on this -
  // it fails closed via findCycleNodeIds before driving. Never treat this
  // best-effort ordering as a guarantee of acyclicity.
  nodes.forEach((n) => {
    if (!ordered.includes(n.id)) ordered.push(n.id)
  })
  return ordered.map((id) => byId.get(id)!).filter(Boolean)
}

/** Upstream input/reference node ids feeding a node - used for provenance. */
function collectSourceAssetIds(nodeId: string, workflow: Workflow): string[] {
  const parents = new Map<string, string[]>()
  workflow.edges.forEach((e) => {
    if (!parents.has(e.target)) parents.set(e.target, [])
    parents.get(e.target)!.push(e.source)
  })
  const byId = new Map(workflow.nodes.map((n) => [n.id, n]))
  const seen = new Set<string>()
  const sources: string[] = []
  const stack = [...(parents.get(nodeId) ?? [])]
  while (stack.length) {
    const id = stack.pop()!
    if (seen.has(id)) continue
    seen.add(id)
    const node = byId.get(id)
    if (node && (node.data.category === "input" || node.data.category === "reference")) {
      sources.push(id)
    }
    stack.push(...(parents.get(id) ?? []))
  }
  return sources.reverse()
}

export class RunController {
  private cancelled = false
  private paused = false
  private order: FoundryNode[] = []
  private pausedIndex = -1
  private opts: RunOptions
  private workflow: Workflow

  constructor(
    workflow: Workflow,
    private listener: Listener,
    opts: RunOptions,
  ) {
    this.workflow = workflow
    this.opts = opts
  }

  private get stepDelay() {
    return this.opts.stepDelayMs ?? 520
  }

  private wait(fraction = 1) {
    const ms = this.stepDelay * fraction
    if (ms <= 0) return Promise.resolve()
    return new Promise<void>((resolve) => setTimeout(resolve, ms))
  }

  cancel() {
    this.cancelled = true
    this.emit({ type: "status", status: "cancelled" })
  }

  private emit(event: RunEvent) {
    if (this.cancelled && event.status !== "cancelled") return
    this.listener(event)
  }

  async start() {
    // Fail closed: never run a graph that contains a cycle. Surface the exact
    // affected node ids instead of silently ordering around them.
    const cycleNodeIds = findCycleNodeIds(this.workflow.nodes, this.workflow.edges)
    if (cycleNodeIds.length > 0) {
      const reason = `Cannot run: the workflow contains a cycle involving ${cycleNodeIds.join(", ")}. Remove a connection to make it a DAG.`
      for (const id of cycleNodeIds) {
        this.emit({ type: "node-state", nodeId: id, runState: "failed", failureReason: reason })
      }
      this.emit({ type: "status", status: "failed", nodeId: cycleNodeIds[0], failureReason: reason })
      return
    }

    this.order = topoSort(this.workflow.nodes, this.workflow.edges)
    const requestedStartIndex = this.opts.startFromNodeId !== undefined
      ? this.order.findIndex((n) => n.id === this.opts.startFromNodeId)
      : 0
    if (requestedStartIndex < 0) {
      this.emit({
        type: "status",
        status: "failed",
        failureReason: `Resume node "${this.opts.startFromNodeId}" does not exist.`,
      })
      return
    }

    this.emit({ type: "status", status: "running" })
    await this.drive(requestedStartIndex)
  }

  /** Resume from a paused review node: mark it complete, then continue. */
  async resume() {
    if (!this.paused || this.pausedIndex < 0) return
    const reviewNode = this.order[this.pausedIndex]
    this.paused = false
    this.emit({ type: "node-state", nodeId: reviewNode.id, runState: "complete" })
    this.emit({ type: "status", status: "running" })
    await this.wait(0.5)
    await this.drive(this.pausedIndex + 1)
  }

  private async drive(startIndex: number) {
    for (let i = startIndex; i < this.order.length; i++) {
      if (this.cancelled) return
      const node = this.order[i]

      const incoming = this.workflow.edges.find((e) => e.target === node.id)
      if (incoming) {
        this.emit({ type: "token", edgeId: incoming.id })
        await this.wait(0.6)
      }
      if (this.cancelled) return

      this.emit({ type: "node-state", nodeId: node.id, runState: "queued" })
      await this.wait(0.3)
      if (this.cancelled) return

      this.emit({ type: "node-state", nodeId: node.id, runState: "running" })
      await this.wait()
      if (this.cancelled) return

      if (this.opts.failAtNodeId === node.id) {
        this.emit({
          type: "node-state",
          nodeId: node.id,
          runState: "failed",
          failureReason: "Demo adapter returned a non-retryable error. Restart from this node to continue.",
        })
        this.emit({ type: "status", status: "failed", nodeId: node.id })
        return
      }

      if (node.data.modality && node.data.adapterId) {
        const adapter = getAdapter(node.data.adapterId)
        if (adapter) {
          const result = await adapter.run({
            node,
            workflow: this.workflow,
            runId: this.opts.runId,
            sourceAssetIds: collectSourceAssetIds(node.id, this.workflow),
          })
          this.emit({ type: "output", output: result.output })
          this.emit({ type: "node-state", nodeId: node.id, runState: "complete", output: result.output })
          await this.wait(0.2)
          continue
        }
      }

      if (node.data.category === "review") {
        this.paused = true
        this.pausedIndex = i
        this.emit({ type: "node-state", nodeId: node.id, runState: "review-needed" })
        this.emit({ type: "status", status: "review-needed", nodeId: node.id })
        return
      }

      this.emit({ type: "node-state", nodeId: node.id, runState: "complete" })
      await this.wait(0.2)
    }

    if (!this.cancelled) this.emit({ type: "status", status: "complete" })
  }
}

/** Public helper: linear execution order for the mobile step list. */
export function getExecutionOrder(nodes: FoundryNode[], edges: Workflow["edges"]): FoundryNode[] {
  return topoSort(nodes, edges)
}

export function newRunId(): string {
  const rand = Math.random().toString(36).slice(2, 8)
  return `run_${Date.now().toString(36)}${rand}`
}

export const ENGINE_STATUS_LABELS: Record<EngineStatus, string> = {
  idle: "Idle",
  running: "Running",
  "review-needed": "Review needed",
  complete: "Complete",
  failed: "Failed",
  cancelled: "Cancelled",
}
