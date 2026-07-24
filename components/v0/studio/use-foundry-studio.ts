"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import {
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
} from "@xyflow/react"
import {
  cloneWorkflow,
  DEFAULT_WORKFLOW_ID,
  getSeedWorkflow,
  SEED_WORKFLOWS,
} from "@/lib/v0/foundry/seed-workflows"
import { createNode } from "@/lib/v0/foundry/node-factory"
import { validateConnection } from "@/lib/v0/foundry/graph"
import {
  getExecutionOrder,
  newRunId,
  RunController,
} from "@/lib/v0/foundry/run-engine"
import {
  deleteSavedWorkflow,
  downloadWorkflowJson,
  importWorkflowJson,
  loadSavedWorkflows,
  saveWorkflow,
} from "@/lib/v0/foundry/storage"
import type {
  ApprovalState,
  EngineStatus,
  FoundryNodeData,
  FoundryOutput,
  NodeCategory,
  NodeFields,
  Workflow,
} from "@/lib/v0/foundry/types"

export type FxNode = Node<FoundryNodeData, "foundry">
export type FxEdge = Edge

interface WorkflowMeta {
  id: string
  version: number
  title: string
  summary: string
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function toWorkflowMeta(w: Workflow): WorkflowMeta {
  return { id: w.id, version: w.version, title: w.title, summary: w.summary }
}

function workflowToNodes(w: Workflow): FxNode[] {
  return w.nodes.map((n) => ({
    id: n.id,
    type: "foundry",
    position: n.position,
    data: n.data,
  }))
}

const initialWorkflow = getSeedWorkflow(DEFAULT_WORKFLOW_ID)!

export interface Notice {
  tone: "info" | "success" | "error"
  message: string
}

export function useFoundryStudio() {
  const [nodes, setNodes, onNodesChange] = useNodesState<FxNode>(workflowToNodes(initialWorkflow))
  const [edges, setEdges, onEdgesChange] = useEdgesState<FxEdge>(initialWorkflow.edges)
  const [meta, setMeta] = useState<WorkflowMeta>(toWorkflowMeta(initialWorkflow))
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("pp-image")
  const [outputs, setOutputs] = useState<FoundryOutput[]>([])
  const [engineStatus, setEngineStatus] = useState<EngineStatus>("idle")
  const [activeEdgeId, setActiveEdgeId] = useState<string | null>(null)
  const [failedNodeId, setFailedNodeId] = useState<string | null>(null)
  const [notice, setNotice] = useState<Notice | null>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const [dirty, setDirty] = useState(false)
  const [savedIds, setSavedIds] = useState<string[]>(() => Object.keys(loadSavedWorkflows()))
  const [failNextRun, setFailNextRun] = useState(false)
  const [compareSelection, setCompareSelection] = useState<string[]>([])

  const controllerRef = useRef<RunController | null>(null)
  const fitViewRef = useRef<(() => void) | null>(null)

  const selectedNode = useMemo(
    () => nodes.find((n) => n.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId],
  )

  const orderedNodes = useMemo(
    () =>
      getExecutionOrder(
        nodes.map((n) => ({ id: n.id, type: "foundry", position: n.position, data: n.data })),
        edges.map((e) => ({ id: e.id, source: e.source, target: e.target, sourceHandle: e.sourceHandle ?? undefined, targetHandle: e.targetHandle ?? undefined })),
      ),
    [nodes, edges],
  )

  const buildWorkflowSnapshot = useCallback((): Workflow => {
    return {
      schemaVersion: initialWorkflow.schemaVersion,
      id: meta.id,
      version: meta.version,
      title: meta.title,
      summary: meta.summary,
      stepOrder: orderedNodes.map((n) => n.id),
      nodes: nodes.map((n) => ({ id: n.id, type: "foundry", position: n.position, data: n.data })),
      edges: edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        sourceHandle: e.sourceHandle ?? undefined,
        targetHandle: e.targetHandle ?? undefined,
      })),
      updatedAt: new Date().toISOString(),
    }
  }, [edges, meta, nodes, orderedNodes])

  const setNodeRunState = useCallback(
    (nodeId: string, runState: FoundryNodeData["runState"], failureReason?: string) => {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === nodeId
            ? { ...n, data: { ...n.data, runState, failureReason } }
            : n,
        ),
      )
    },
    [setNodes],
  )

  const resetRunStates = useCallback(() => {
    setNodes((prev) => prev.map((n) => ({ ...n, data: { ...n.data, runState: "idle", failureReason: undefined } })))
    setActiveEdgeId(null)
    setFailedNodeId(null)
  }, [setNodes])

  const dispatchEvent = useCallback(
    (workflowSnapshot: Workflow) => {
      return (event: Parameters<ConstructorParameters<typeof RunController>[1]>[0]) => {
        switch (event.type) {
          case "token":
            setActiveEdgeId(event.edgeId ?? null)
            break
          case "node-state":
            if (event.nodeId) setNodeRunState(event.nodeId, event.runState!, event.failureReason)
            break
          case "output":
            if (event.output) {
              setOutputs((prev) => [...prev.filter((o) => o.nodeId !== event.output!.nodeId), event.output!])
            }
            break
          case "status":
            setEngineStatus(event.status!)
            if (event.status === "failed" && event.nodeId) setFailedNodeId(event.nodeId)
            if (event.status === "complete" || event.status === "cancelled") setActiveEdgeId(null)
            break
        }
      }
    },
    [setNodeRunState],
  )

  const beginRun = useCallback(
    (startFromNodeId?: string) => {
      const snapshot = buildWorkflowSnapshot()
      if (!startFromNodeId) {
        resetRunStates()
        setOutputs([])
        setCompareSelection([])
      }
      const failAtNodeId = failNextRun
        ? orderedNodes.find((n) => n.data.modality)?.id
        : undefined
      const controller = new RunController(snapshot, dispatchEvent(snapshot), {
        runId: newRunId(),
        startFromNodeId,
        failAtNodeId,
        stepDelayMs: prefersReducedMotion() ? 0 : 520,
      })
      controllerRef.current = controller
      void controller.start()
      if (failNextRun) setFailNextRun(false)
    },
    [buildWorkflowSnapshot, dispatchEvent, failNextRun, orderedNodes, resetRunStates],
  )

  const run = useCallback(() => beginRun(), [beginRun])

  const cancel = useCallback(() => {
    controllerRef.current?.cancel()
    setEngineStatus("cancelled")
    setActiveEdgeId(null)
  }, [])

  const resumeReview = useCallback(() => {
    void controllerRef.current?.resume()
  }, [])

  const restartFromFailed = useCallback(() => {
    if (!failedNodeId) return
    setNodeRunState(failedNodeId, "idle", undefined)
    beginRun(failedNodeId)
  }, [beginRun, failedNodeId, setNodeRunState])

  const selectNode = useCallback((id: string | null) => setSelectedNodeId(id), [])

  const updateNodeFields = useCallback(
    (nodeId: string, patch: Partial<NodeFields>) => {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, fields: { ...n.data.fields, ...patch } } } : n,
        ),
      )
      setDirty(true)
    },
    [setNodes],
  )

  const updateNodeLabel = useCallback(
    (nodeId: string, label: string) => {
      setNodes((prev) => prev.map((n) => (n.id === nodeId ? { ...n, data: { ...n.data, label } } : n)))
      setDirty(true)
    },
    [setNodes],
  )

  const addNodeOfCategory = useCallback(
    (category: NodeCategory) => {
      const base = nodes.length ? nodes[nodes.length - 1].position : { x: 0, y: 0 }
      const node = createNode(category, { x: base.x + 60, y: base.y + 120 })
      setNodes((prev) => [...prev, node])
      setSelectedNodeId(node.id)
      setDirty(true)
      setNotice({ tone: "info", message: `Added ${node.data.label} node. Connect its ports on the canvas.` })
    },
    [nodes, setNodes],
  )

  const deleteSelectedNode = useCallback(
    (id?: string) => {
      const targetId = id ?? selectedNodeId
      if (!targetId) return
      const target = nodes.find((n) => n.id === targetId)
      if (!target) return
      if (target.data.required) {
        setNotice({ tone: "error", message: `"${target.data.label}" is required and cannot be deleted.` })
        return
      }
      setNodes((prev) => prev.filter((n) => n.id !== targetId))
      setEdges((prev) => prev.filter((e) => e.source !== targetId && e.target !== targetId))
      if (selectedNodeId === targetId) setSelectedNodeId(null)
      setDirty(true)
    },
    [nodes, selectedNodeId, setEdges, setNodes],
  )

  /** Pure, side-effect-free check used both for live canvas feedback and connect. */
  const isValidConnection = useCallback(
    (connection: Connection | Edge) => {
      const foundryNodes = nodes.map((n) => ({
        id: n.id,
        type: "foundry" as const,
        position: n.position,
        data: n.data,
      }))
      const foundryEdges = edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        sourceHandle: e.sourceHandle ?? undefined,
        targetHandle: e.targetHandle ?? undefined,
      }))
      return validateConnection(foundryNodes, foundryEdges, {
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
      }).ok
    },
    [nodes, edges],
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      const foundryNodes = nodes.map((n) => ({
        id: n.id,
        type: "foundry" as const,
        position: n.position,
        data: n.data,
      }))
      const foundryEdges = edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        sourceHandle: e.sourceHandle ?? undefined,
        targetHandle: e.targetHandle ?? undefined,
      }))
      const check = validateConnection(foundryNodes, foundryEdges, {
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
      })
      if (!check.ok) {
        setNotice({ tone: "error", message: check.reason ?? "Connection rejected." })
        return
      }
      const handleSuffix = connection.targetHandle ? `-${connection.targetHandle}` : ""
      setEdges((prev) =>
        addEdge({ ...connection, id: `e-${connection.source}-${connection.target}${handleSuffix}` }, prev),
      )
      setDirty(true)
    },
    [edges, nodes, setEdges],
  )

  const loadWorkflow = useCallback(
    (id: string) => {
      const saved = loadSavedWorkflows()[id]
      const source = saved ?? getSeedWorkflow(id)
      if (!source) return
      const wf = cloneWorkflow(source)
      setNodes(workflowToNodes(wf))
      setEdges(wf.edges)
      setMeta(toWorkflowMeta(wf))
      setOutputs([])
      setEngineStatus("idle")
      setActiveEdgeId(null)
      setFailedNodeId(null)
      setCompareSelection([])
      setSelectedNodeId(wf.nodes.find((n) => n.data.modality)?.id ?? wf.nodes[0]?.id ?? null)
      setDirty(false)
    },
    [setEdges, setNodes],
  )

  const save = useCallback(() => {
    const snapshot = buildWorkflowSnapshot()
    const result = saveWorkflow(snapshot)
    if (result.ok) {
      setSavedIds(Object.keys(loadSavedWorkflows()))
      setDirty(false)
      setNotice({ tone: "success", message: `Saved "${snapshot.title}" v${snapshot.version} to this browser.` })
    } else {
      setNotice({ tone: "error", message: result.error ?? "Save failed." })
    }
  }, [buildWorkflowSnapshot])

  const deleteSaved = useCallback((id: string) => {
    deleteSavedWorkflow(id)
    setSavedIds(Object.keys(loadSavedWorkflows()))
    setNotice({ tone: "info", message: `Removed "${id}" from this browser.` })
  }, [])

  const exportJson = useCallback(() => {
    downloadWorkflowJson(buildWorkflowSnapshot())
    setNotice({ tone: "success", message: "Exported workflow JSON." })
  }, [buildWorkflowSnapshot])

  const importJson = useCallback(
    (text: string) => {
      const result = importWorkflowJson(text)
      if (!result.ok || !result.workflow) {
        setImportError(result.error ?? "Import failed.")
        return
      }
      setImportError(null)
      const wf = result.workflow
      setNodes(workflowToNodes(wf))
      setEdges(wf.edges)
      setMeta(toWorkflowMeta(wf))
      setOutputs([])
      setEngineStatus("idle")
      setActiveEdgeId(null)
      setFailedNodeId(null)
      setSelectedNodeId(wf.nodes[0]?.id ?? null)
      setDirty(false)
      setNotice({ tone: "success", message: `Imported "${wf.title}".` })
    },
    [setEdges, setNodes],
  )

  const setOutputApproval = useCallback((outputId: string, approval: ApprovalState, rejectionNote?: string) => {
    setOutputs((prev) => prev.map((o) => (o.id === outputId ? { ...o, approval, rejectionNote } : o)))
  }, [])

  const toggleCompare = useCallback((outputId: string) => {
    setCompareSelection((prev) => {
      if (prev.includes(outputId)) return prev.filter((id) => id !== outputId)
      if (prev.length >= 2) return [prev[1], outputId]
      return [...prev, outputId]
    })
  }, [])

  const registerFitView = useCallback((fn: () => void) => {
    fitViewRef.current = fn
  }, [])

  const fitView = useCallback(() => fitViewRef.current?.(), [])

  return {
    // graph
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    isValidConnection,
    orderedNodes,
    // selection
    selectedNode,
    selectedNodeId,
    selectNode,
    // meta + catalog
    meta,
    seedWorkflows: SEED_WORKFLOWS,
    savedIds,
    loadWorkflow,
    // run
    engineStatus,
    activeEdgeId,
    failedNodeId,
    run,
    cancel,
    resumeReview,
    restartFromFailed,
    failNextRun,
    setFailNextRun,
    // editing
    updateNodeFields,
    updateNodeLabel,
    addNodeOfCategory,
    deleteSelectedNode,
    // outputs
    outputs,
    setOutputApproval,
    compareSelection,
    toggleCompare,
    // persistence
    save,
    deleteSaved,
    exportJson,
    importJson,
    importError,
    setImportError,
    dirty,
    // ui misc
    notice,
    setNotice,
    registerFitView,
    fitView,
  }
}

export type FoundryStudio = ReturnType<typeof useFoundryStudio>
