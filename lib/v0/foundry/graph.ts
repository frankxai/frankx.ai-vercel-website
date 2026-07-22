import type { FoundryEdge, FoundryNode, NodePort } from "./types"

/**
 * GRAPH UTILITIES - the single source of truth for typed connection rules and
 * DAG correctness. Shared by the studio controller (live connect), the canvas
 * (isValidConnection), the run engine (fail-closed on cycles), and the import
 * validator. Keeping this pure and dependency-free means the same rules apply
 * everywhere and are unit-testable in isolation.
 */

/** A candidate connection, matching @xyflow/react's Connection shape. */
export interface ConnectionLike {
  source: string | null
  target: string | null
  sourceHandle?: string | null
  targetHandle?: string | null
}

export interface ConnectionCheck {
  ok: boolean
  /** Human-readable reason a connection was rejected. */
  reason?: string
}

/**
 * Port-kind compatibility. `any` acts as a wildcard on either side (most inputs
 * are generic sinks); otherwise the two kinds must match exactly. This is
 * intentionally conservative so it never silently accepts a mismatched
 * modality (e.g. wiring a 3D output into an image-only input once inputs are
 * given concrete kinds).
 */
export function arePortKindsCompatible(sourceKind: NodePort["kind"], targetKind: NodePort["kind"]): boolean {
  if (sourceKind === "any" || targetKind === "any") return true
  return sourceKind === targetKind
}

function findPort(node: FoundryNode | undefined, handleId: string | null | undefined, direction: "in" | "out") {
  if (!node) return undefined
  const ports = direction === "in" ? node.data.inputs : node.data.outputs
  if (handleId) {
    const exact = ports.find((p) => p.id === handleId)
    if (exact) return exact
  }
  // Fall back to the sole port when a handle id is not supplied.
  return ports.length === 1 ? ports[0] : undefined
}

/** Does an edge source->target already exist in the given adjacency? */
function buildAdjacency(edges: Pick<FoundryEdge, "source" | "target">[]): Map<string, string[]> {
  const adjacency = new Map<string, string[]>()
  for (const e of edges) {
    if (!adjacency.has(e.source)) adjacency.set(e.source, [])
    adjacency.get(e.source)!.push(e.target)
  }
  return adjacency
}

/**
 * True if a path already exists from `from` to `to` along directed edges.
 * Used to decide whether adding source->target would close a cycle
 * (i.e. a path target -> ... -> source already exists).
 */
export function hasPath(
  edges: Pick<FoundryEdge, "source" | "target">[],
  from: string,
  to: string,
): boolean {
  if (from === to) return true
  const adjacency = buildAdjacency(edges)
  const seen = new Set<string>()
  const stack = [from]
  while (stack.length) {
    const current = stack.pop()!
    if (current === to) return true
    if (seen.has(current)) continue
    seen.add(current)
    for (const next of adjacency.get(current) ?? []) stack.push(next)
  }
  return false
}

/** Would adding source->target introduce a directed cycle? */
export function wouldCreateCycle(
  edges: Pick<FoundryEdge, "source" | "target">[],
  source: string,
  target: string,
): boolean {
  if (source === target) return true
  // A cycle forms iff target can already reach source.
  return hasPath(edges, target, source)
}

/**
 * Exact cycle membership via Tarjan's strongly-connected-components algorithm.
 *
 * Returns ONLY node ids that are actual members of a directed cycle - that is,
 * nodes in an SCC of size > 1, plus any node with a self-loop. Acyclic nodes
 * that merely sit downstream of a cycle are NOT included (this is the key
 * difference from a Kahn-residual approach, which over-reports them).
 *
 * Output order is deterministic and matches the input node order. Empty array
 * means the graph is a valid DAG.
 *
 * Implemented iteratively to avoid stack overflow on large graphs.
 */
export function findCycleNodeIds(
  nodes: Pick<FoundryNode, "id">[],
  edges: Pick<FoundryEdge, "source" | "target">[],
): string[] {
  const known = new Set(nodes.map((n) => n.id))
  const adjacency = new Map<string, string[]>()
  nodes.forEach((n) => adjacency.set(n.id, []))
  const selfLoops = new Set<string>()
  for (const e of edges) {
    if (!known.has(e.source) || !known.has(e.target)) continue
    if (e.source === e.target) {
      selfLoops.add(e.source)
      continue
    }
    adjacency.get(e.source)!.push(e.target)
  }

  const index = new Map<string, number>()
  const lowlink = new Map<string, number>()
  const onStack = new Set<string>()
  const stack: string[] = []
  const inCycle = new Set<string>()
  let counter = 0

  // Iterative Tarjan: each work item tracks its neighbor cursor.
  type Frame = { node: string; i: number }
  for (const start of nodes) {
    if (index.has(start.id)) continue
    const frames: Frame[] = [{ node: start.id, i: 0 }]
    index.set(start.id, counter)
    lowlink.set(start.id, counter)
    counter++
    stack.push(start.id)
    onStack.add(start.id)

    while (frames.length) {
      const frame = frames[frames.length - 1]
      const neighbors = adjacency.get(frame.node) ?? []
      if (frame.i < neighbors.length) {
        const next = neighbors[frame.i]
        frame.i++
        if (!index.has(next)) {
          index.set(next, counter)
          lowlink.set(next, counter)
          counter++
          stack.push(next)
          onStack.add(next)
          frames.push({ node: next, i: 0 })
        } else if (onStack.has(next)) {
          lowlink.set(frame.node, Math.min(lowlink.get(frame.node)!, index.get(next)!))
        }
      } else {
        // Finished exploring frame.node - settle its SCC if it is a root.
        if (lowlink.get(frame.node) === index.get(frame.node)) {
          const component: string[] = []
          let w: string
          do {
            w = stack.pop()!
            onStack.delete(w)
            component.push(w)
          } while (w !== frame.node)
          if (component.length > 1) {
            for (const id of component) inCycle.add(id)
          }
        }
        frames.pop()
        if (frames.length) {
          const parent = frames[frames.length - 1].node
          lowlink.set(parent, Math.min(lowlink.get(parent)!, lowlink.get(frame.node)!))
        }
      }
    }
  }

  for (const id of selfLoops) inCycle.add(id)

  // Deterministic: emit in input node order.
  return nodes.map((n) => n.id).filter((id) => inCycle.has(id))
}

export function isAcyclic(
  nodes: Pick<FoundryNode, "id">[],
  edges: Pick<FoundryEdge, "source" | "target">[],
): boolean {
  return findCycleNodeIds(nodes, edges).length === 0
}

/**
 * Validate a candidate connection against all rules:
 * missing endpoints, self-links, direction, duplicates, typed-port
 * compatibility, and cycle prevention. Returns a readable reason on failure.
 */
export function validateConnection(
  nodes: FoundryNode[],
  edges: FoundryEdge[],
  connection: ConnectionLike,
): ConnectionCheck {
  const { source, target, sourceHandle, targetHandle } = connection

  if (!source || !target) {
    return { ok: false, reason: "Connection is missing a source or target node." }
  }
  if (source === target) {
    return { ok: false, reason: "A node cannot connect to itself." }
  }

  const byId = new Map(nodes.map((n) => [n.id, n]))
  const sourceNode = byId.get(source)
  const targetNode = byId.get(target)
  if (!sourceNode || !targetNode) {
    return { ok: false, reason: "Connection references a node that no longer exists." }
  }

  // Direction: the source handle must be an output, the target handle an input.
  const outPort = findPort(sourceNode, sourceHandle, "out")
  const inPort = findPort(targetNode, targetHandle, "in")
  if (!outPort) {
    return { ok: false, reason: `"${sourceNode.data.label}" has no output port to connect from.` }
  }
  if (!inPort) {
    return { ok: false, reason: `"${targetNode.data.label}" has no matching input port.` }
  }

  // Duplicate: same source/target pair into the same input handle.
  const duplicate = edges.some(
    (e) =>
      e.source === source &&
      e.target === target &&
      (e.targetHandle ?? null) === (targetHandle ?? inPort.id ?? null),
  )
  if (duplicate) {
    return { ok: false, reason: "That connection already exists." }
  }

  // Typed-port compatibility.
  if (!arePortKindsCompatible(outPort.kind, inPort.kind)) {
    return {
      ok: false,
      reason: `Incompatible ports: ${outPort.kind} output cannot feed a ${inPort.kind} input.`,
    }
  }

  // Cycle prevention.
  if (wouldCreateCycle(edges, source, target)) {
    return {
      ok: false,
      reason: `Connection rejected: it would create a cycle between "${sourceNode.data.label}" and "${targetNode.data.label}".`,
    }
  }

  return { ok: true }
}
