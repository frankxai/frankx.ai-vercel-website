import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  arePortKindsCompatible,
  findCycleNodeIds,
  validateConnection,
  wouldCreateCycle,
} from "../../lib/v0/foundry/graph"
import { RunController } from "../../lib/v0/foundry/run-engine"
import {
  DEFAULT_WORKFLOW_ID,
  getSeedWorkflow,
} from "../../lib/v0/foundry/seed-workflows"
import type {
  FoundryEdge,
  FoundryNode,
  RunEvent,
  Workflow,
} from "../../lib/v0/foundry/types"
import {
  IMPORT_LIMITS,
  parseWorkflow,
  parseWorkflowJson,
} from "../../lib/v0/foundry/validation"

type PortKind = FoundryNode["data"]["inputs"][number]["kind"]

function makeNode(
  id: string,
  options: { inKind?: PortKind; outKind?: PortKind } = {},
): FoundryNode {
  return {
    id,
    type: "foundry",
    position: { x: 0, y: 0 },
    data: {
      label: id,
      category: "transform",
      fields: {},
      inputs: [
        {
          id: `${id}-in-0`,
          kind: options.inKind ?? "any",
          label: "Input",
        },
      ],
      outputs: [
        {
          id: `${id}-out-0`,
          kind: options.outKind ?? "any",
          label: "Output",
        },
      ],
      runState: "idle",
    },
  }
}

function makeEdge(source: string, target: string): FoundryEdge {
  return {
    id: `e-${source}-${target}`,
    source,
    target,
    sourceHandle: `${source}-out-0`,
    targetHandle: `${target}-in-0`,
  }
}

function validWorkflow(): Workflow {
  return structuredClone(getSeedWorkflow(DEFAULT_WORKFLOW_ID)!)
}

async function runWorkflow(workflow: Workflow, runId = "run_fixed") {
  const events: RunEvent[] = []
  const controller = new RunController(workflow, (event) => events.push(event), {
    runId,
    stepDelayMs: 0,
  })
  await controller.start()
  return { controller, events }
}

function stableOutputs(events: RunEvent[]) {
  return events
    .filter((event) => event.type === "output" && event.output)
    .map((event) => ({
      id: event.output!.id,
      nodeId: event.output!.nodeId,
      modality: event.output!.modality,
      posterSrc: event.output!.posterSrc,
      aspectRatio: event.output!.aspectRatio,
    }))
}

describe("Visual Foundry graph rules", () => {
  it("treats any as a wildcard and requires concrete type matches", () => {
    assert.equal(arePortKindsCompatible("any", "image"), true)
    assert.equal(arePortKindsCompatible("video", "any"), true)
    assert.equal(arePortKindsCompatible("image", "image"), true)
    assert.equal(arePortKindsCompatible("image", "video"), false)
  })

  it("rejects duplicate, self, incompatible, and cyclic connections", () => {
    const nodes = [makeNode("a"), makeNode("b"), makeNode("c")]
    const edges = [makeEdge("a", "b")]

    const duplicate = validateConnection(nodes, edges, {
      source: "a",
      target: "b",
      sourceHandle: "a-out-0",
      targetHandle: "b-in-0",
    })
    assert.equal(duplicate.ok, false)
    assert.match(duplicate.reason ?? "", /already exists/i)

    const self = validateConnection(nodes, edges, {
      source: "a",
      target: "a",
    })
    assert.equal(self.ok, false)
    assert.match(self.reason ?? "", /itself/i)

    const incompatible = validateConnection(
      [makeNode("image", { outKind: "image" }), makeNode("video", { inKind: "video" })],
      [],
      {
        source: "image",
        target: "video",
        sourceHandle: "image-out-0",
        targetHandle: "video-in-0",
      },
    )
    assert.equal(incompatible.ok, false)
    assert.match(incompatible.reason ?? "", /incompatible/i)

    const cyclic = validateConnection(nodes, edges, {
      source: "b",
      target: "a",
      sourceHandle: "b-out-0",
      targetHandle: "a-in-0",
    })
    assert.equal(cyclic.ok, false)
    assert.match(cyclic.reason ?? "", /cycle/i)
  })

  it("reports only true cycle members in stable node order", () => {
    const nodes = [makeNode("b"), makeNode("a"), makeNode("c")]
    const edges = [makeEdge("a", "b"), makeEdge("b", "a"), makeEdge("b", "c")]

    assert.equal(wouldCreateCycle(edges.slice(0, 1), "b", "a"), true)
    assert.deepEqual(findCycleNodeIds(nodes, edges), ["b", "a"])
  })

  it("detects self-loops without implicating downstream nodes", () => {
    const nodes = [makeNode("a"), makeNode("b")]
    const edges = [makeEdge("a", "a"), makeEdge("a", "b")]
    assert.deepEqual(findCycleNodeIds(nodes, edges), ["a"])
  })
})

describe("Visual Foundry import validation", () => {
  it("accepts every first-party seed workflow", () => {
    for (const id of [
      "wf-product-photography",
      "wf-launch-film",
      "wf-identity-study",
      "wf-product-3d",
    ]) {
      assert.equal(parseWorkflow(getSeedWorkflow(id)).ok, true, id)
    }
  })

  it("rejects duplicate identifiers and missing edge endpoints", () => {
    const duplicateNode = validWorkflow()
    duplicateNode.nodes.push(structuredClone(duplicateNode.nodes[0]))
    assert.match(parseWorkflow(duplicateNode).error ?? "", /duplicate node id/i)

    const duplicateEdge = validWorkflow()
    duplicateEdge.edges.push(structuredClone(duplicateEdge.edges[0]))
    assert.match(parseWorkflow(duplicateEdge).error ?? "", /duplicate edge id/i)

    const missingEndpoint = validWorkflow()
    missingEndpoint.edges[0].target = "missing"
    assert.match(parseWorkflow(missingEndpoint).error ?? "", /does not exist/i)
  })

  it("requires stepOrder to be an exact node permutation", () => {
    const workflow = validWorkflow()
    const dropped = workflow.stepOrder.pop()!
    const result = parseWorkflow(workflow)
    assert.equal(result.ok, false)
    assert.match(result.error ?? "", /every node exactly once/i)
    assert.match(result.error ?? "", new RegExp(dropped))
  })

  it("rejects unsupported versions, cycles, overlong fields, and oversized JSON", () => {
    const versioned = validWorkflow()
    versioned.schemaVersion = "9.9.9"
    assert.match(parseWorkflow(versioned).error ?? "", /schema version/i)

    const cyclic: Workflow = {
      schemaVersion: "1.0.0",
      id: "wf-cycle",
      version: 1,
      title: "Cycle",
      summary: "",
      stepOrder: ["a", "b"],
      nodes: [makeNode("a"), makeNode("b")],
      edges: [makeEdge("a", "b"), makeEdge("b", "a")],
      updatedAt: "2026-07-19T00:00:00.000Z",
    }
    assert.match(parseWorkflow(cyclic).error ?? "", /cycle/i)

    const overlong = validWorkflow()
    overlong.nodes[0].data.fields.prompt = "x".repeat(
      IMPORT_LIMITS.maxStringLength + 1,
    )
    assert.equal(parseWorkflow(overlong).ok, false)

    assert.match(parseWorkflowJson("{ invalid").error ?? "", /not valid json/i)
    assert.match(
      parseWorkflowJson(" ".repeat(IMPORT_LIMITS.maxSerializedBytes + 1)).error ?? "",
      /too large/i,
    )
  })

  it("round-trips valid workflow JSON transactionally", () => {
    const workflow = validWorkflow()
    const result = parseWorkflowJson(JSON.stringify(workflow))
    assert.equal(result.ok, true)
    assert.equal(result.workflow?.id, workflow.id)
  })
})

describe("Visual Foundry deterministic run engine", () => {
  it("repeats stable outputs for the same workflow and run id", async () => {
    const workflow = getSeedWorkflow("wf-identity-study")!
    const first = await runWorkflow(workflow)
    const second = await runWorkflow(workflow)
    assert.deepEqual(stableOutputs(first.events), stableOutputs(second.events))
    assert.deepEqual(
      stableOutputs(first.events).map((output) => output.nodeId).sort(),
      ["id-var-a", "id-var-b"],
    )
    assert.equal(first.events.at(-1)?.status, "complete")
  })

  it("pauses for review and resumes to completion", async () => {
    const { controller, events } = await runWorkflow(
      getSeedWorkflow("wf-product-photography")!,
    )
    assert.equal(events.at(-1)?.status, "review-needed")
    assert.equal(events.some((event) => event.status === "complete"), false)

    await controller.resume()
    assert.equal(events.at(-1)?.status, "complete")
  })

  it("fails closed on a cyclic workflow without producing output", async () => {
    const cyclic: Workflow = {
      schemaVersion: "1.0.0",
      id: "wf-cycle",
      version: 1,
      title: "Cycle",
      summary: "",
      stepOrder: ["a", "b"],
      nodes: [makeNode("a"), makeNode("b")],
      edges: [makeEdge("a", "b"), makeEdge("b", "a")],
      updatedAt: "2026-07-19T00:00:00.000Z",
    }
    const { events } = await runWorkflow(cyclic)
    assert.equal(events.at(-1)?.status, "failed")
    assert.deepEqual(
      events
        .filter((event) => event.runState === "failed")
        .map((event) => event.nodeId)
        .sort(),
      ["a", "b"],
    )
    assert.equal(events.some((event) => event.type === "output"), false)
  })
})
