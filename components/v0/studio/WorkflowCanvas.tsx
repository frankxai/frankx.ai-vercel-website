"use client"

import { useCallback, useEffect, useMemo } from "react"
import {
  BaseEdge,
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  getSmoothStepPath,
  useReactFlow,
  type Edge,
  type EdgeProps,
  type EdgeTypes,
  type Connection,
  type NodeTypes,
  type OnConnect,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { FoundryNode } from "./FoundryNode"
import type { FxEdge, FxNode } from "./use-foundry-studio"

/**
 * Desktop workflow canvas. Interactions: pan/zoom, select, connect valid ports,
 * fit view, and (via the parent) add/delete. The active dependency edge carries
 * a single run token that advances once - no ambient looping.
 */

function TokenEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 8,
  })
  const active = Boolean((data as { active?: boolean } | undefined)?.active)
  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />
      {active ? (
        <circle
          r={4}
          className="fx-run-token"
          fill="var(--color-fx-emerald)"
          style={{ offsetPath: `path("${edgePath}")` }}
          aria-hidden="true"
        />
      ) : null}
    </>
  )
}

const nodeTypes: NodeTypes = { foundry: FoundryNode as unknown as NodeTypes[string] }
const edgeTypes: EdgeTypes = { foundry: TokenEdge }

export interface WorkflowCanvasProps {
  nodes: FxNode[]
  edges: FxEdge[]
  onNodesChange: OnNodesChange<FxNode>
  onEdgesChange: OnEdgesChange<FxEdge>
  onConnect: OnConnect
  isValidConnection: (connection: Connection | FxEdge) => boolean
  onSelectNode: (id: string | null) => void
  onDeleteSelected: () => void
  activeEdgeId: string | null
  registerFitView: (fn: () => void) => void
}

function Flow(props: WorkflowCanvasProps) {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    isValidConnection,
    onSelectNode,
    onDeleteSelected,
    activeEdgeId,
    registerFitView,
  } = props

  const { fitView } = useReactFlow()

  useEffect(() => {
    registerFitView(() => fitView({ padding: 0.2, duration: 300 }))
  }, [fitView, registerFitView])

  const styledEdges = useMemo<Edge[]>(
    () =>
      edges.map((e) => ({
        ...e,
        type: "foundry",
        className: activeEdgeId === e.id ? "fx-edge-active" : undefined,
        data: { ...(e.data ?? {}), active: activeEdgeId === e.id },
      })),
    [edges, activeEdgeId],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        const target = event.target as HTMLElement
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return
        event.preventDefault()
        onDeleteSelected()
      }
    },
    [onDeleteSelected],
  )

  return (
    <div
      className="fx-canvas h-full w-full"
      onKeyDown={handleKeyDown}
      role="application"
      aria-label="Workflow canvas. Use arrow keys to pan, plus and minus to zoom, and Delete to remove the selected node."
    >
      <ReactFlow
        nodes={nodes}
        edges={styledEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        onNodeClick={(_, node) => onSelectNode(node.id)}
        onPaneClick={() => onSelectNode(null)}
        deleteKeyCode={null}
        minZoom={0.3}
        maxZoom={1.6}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        style={{ backgroundColor: "var(--color-fx-bg)" }}
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="#1e1e1e" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  )
}

export function WorkflowCanvas(props: WorkflowCanvasProps) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  )
}
