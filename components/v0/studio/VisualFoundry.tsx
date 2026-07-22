"use client"

import { useMemo, useState } from "react"
import { Ban, Play, RotateCcw, SlidersHorizontal, UploadCloud, X } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./foundry.module.css"
import { useFoundryStudio } from "./use-foundry-studio"
import { CommandBar } from "./CommandBar"
import { NodePalette } from "./NodePalette"
import { WorkflowCanvas } from "./WorkflowCanvas"
import { Inspector } from "./Inspector"
import { OutputFilmstrip } from "./OutputFilmstrip"
import { ProvenancePanel } from "./ProvenancePanel"
import { ImportExportDialog } from "./ImportExportDialog"
import { MobileStepList } from "./MobileStepList"
import { NoticeToast, StatusChip } from "./Surfaces"
import { useDialogFocusTrap } from "./use-dialog-focus-trap"

interface ProvenanceState {
  mode: "single" | "compare"
  ids: string[]
}

/**
 * Creator Workflow Foundry - top-level product surface.
 *
 * Desktop: command bar + palette + canvas + inspector + filmstrip.
 * Mobile: a purpose-built step list, inspector sheet, and filmstrip.
 * One shared state hook drives both so behaviour never diverges.
 */
export function VisualFoundry() {
  const studio = useFoundryStudio()
  const [importOpen, setImportOpen] = useState(false)
  const [provenance, setProvenance] = useState<ProvenanceState | null>(null)
  // Mobile inspector is a sheet that must be opened by an explicit tap - it is
  // never open on first paint, even though a node is pre-selected for desktop.
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)

  const openMobileInspector = (id: string | null) => {
    studio.selectNode(id)
    if (id) setMobileSheetOpen(true)
  }
  const closeMobileInspector = () => setMobileSheetOpen(false)

  const activeNodeId = useMemo(
    () => studio.nodes.find((n) => n.data.runState === "running" || n.data.runState === "review-needed")?.id ?? null,
    [studio.nodes],
  )

  const provenanceOutputs = useMemo(() => {
    if (!provenance) return []
    return provenance.ids
      .map((id) => studio.outputs.find((o) => o.id === id))
      .filter((o): o is NonNullable<typeof o> => Boolean(o))
  }, [provenance, studio.outputs])

  const openProvenance = (outputId: string) => setProvenance({ mode: "single", ids: [outputId] })
  const openCompare = () => {
    if (studio.compareSelection.length >= 2) setProvenance({ mode: "compare", ids: studio.compareSelection })
  }

  return (
    <div className={cn(styles.foundry, "flex h-[100dvh] w-full flex-col overflow-hidden bg-[#0a0a0b] pt-14 font-sans text-[#f4f4f5] sm:pt-16")}>
      {/* ---------------------------- Desktop shell --------------------------- */}
      <div className="hidden h-full flex-col lg:flex">
        <CommandBar studio={studio} onOpenImportExport={() => setImportOpen(true)} />
        <div className="flex min-h-0 flex-1">
          <div className="w-64 shrink-0 border-r border-[#1e1e1e]">
            <NodePalette
              onAdd={studio.addNodeOfCategory}
              workflowTitle={studio.meta.title}
              nodeCount={studio.nodes.length}
            />
          </div>
          <div className="min-w-0 flex-1">
            <WorkflowCanvas
              nodes={studio.nodes}
              edges={studio.edges}
              onNodesChange={studio.onNodesChange}
              onEdgesChange={studio.onEdgesChange}
              onConnect={studio.onConnect}
              isValidConnection={studio.isValidConnection}
              onSelectNode={studio.selectNode}
              onDeleteSelected={() => studio.deleteSelectedNode()}
              activeEdgeId={studio.activeEdgeId}
              registerFitView={studio.registerFitView}
            />
          </div>
          <div className="w-80 shrink-0 border-l border-[#1e1e1e]">
            <Inspector
              node={studio.selectedNode}
              outputs={studio.outputs}
              onUpdateFields={studio.updateNodeFields}
              onUpdateLabel={studio.updateNodeLabel}
              onDelete={(id) => studio.deleteSelectedNode(id)}
              onOpenProvenance={openProvenance}
            />
          </div>
        </div>
        <div className="h-[216px] shrink-0 border-t border-[#1e1e1e]">
          <OutputFilmstrip
            outputs={studio.outputs}
            compareSelection={studio.compareSelection}
            engineStatus={studio.engineStatus}
            onToggleCompare={studio.toggleCompare}
            onSetApproval={studio.setOutputApproval}
            onOpenProvenance={openProvenance}
            onOpenCompare={openCompare}
          />
        </div>
      </div>

      {/* ----------------------------- Mobile shell --------------------------- */}
      <div className="flex h-full flex-col lg:hidden">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[#1e1e1e] bg-[#111113] px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#1e1e1e] bg-[#0a0a0b]">
            <SlidersHorizontal className="h-4 w-4 text-[#10b981]" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-[15px] font-semibold leading-tight text-[#f4f4f5]">
              Visual Foundry
            </h1>
            <p className="truncate text-[11px] leading-tight text-[#8a8a93]">
              Compose image, video, and 3D as a reusable workflow.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setImportOpen(true)}
            aria-label="Import / export JSON"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-[#1e1e1e] bg-[#0a0a0b] text-[#8a8a93] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50"
          >
            <UploadCloud className="h-4 w-4" />
          </button>
        </header>

        <div className="flex items-center gap-2 border-b border-[#1e1e1e] bg-[#111113] px-4 py-2">
          <label htmlFor="wf-select-mobile" className="sr-only">
            Load workflow
          </label>
          <select
            id="wf-select-mobile"
            value={studio.meta.id}
            onChange={(e) => studio.loadWorkflow(e.target.value)}
            className="h-10 flex-1 rounded-md border border-[#1e1e1e] bg-[#0a0a0b] px-2.5 text-[13px] text-[#f4f4f5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50"
          >
            {studio.seedWorkflows.map((w) => (
              <option key={w.id} value={w.id}>
                {w.title}  /  v{w.version}
              </option>
            ))}
          </select>
          <StatusChip status={studio.engineStatus} />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <MobileStepList
            steps={studio.orderedNodes as typeof studio.nodes}
            selectedNodeId={studio.selectedNodeId}
            activeNodeId={activeNodeId}
            onSelectNode={openMobileInspector}
          />
        </div>

        <div className="h-[184px] shrink-0 border-t border-[#1e1e1e]">
          <OutputFilmstrip
            outputs={studio.outputs}
            compareSelection={studio.compareSelection}
            engineStatus={studio.engineStatus}
            onToggleCompare={studio.toggleCompare}
            onSetApproval={studio.setOutputApproval}
            onOpenProvenance={openProvenance}
            onOpenCompare={openCompare}
          />
        </div>

        <div className="shrink-0 border-t border-[#1e1e1e] bg-[#111113] px-4 py-3">
          <MobileRunButton studio={studio} />
        </div>

        {/* Inspector sheet - only when explicitly opened, never on first paint */}
        {mobileSheetOpen && studio.selectedNode ? (
          <MobileInspectorSheet
            studio={studio}
            onClose={closeMobileInspector}
            onOpenProvenance={openProvenance}
          />
        ) : null}
      </div>

      {/* -------------------------------- Overlays ---------------------------- */}
      {importOpen ? <ImportExportDialog studio={studio} onClose={() => setImportOpen(false)} /> : null}
      {provenance && provenanceOutputs.length ? (
        <ProvenancePanel mode={provenance.mode} outputs={provenanceOutputs} onClose={() => setProvenance(null)} />
      ) : null}
      <NoticeToast notice={studio.notice} onDismiss={() => studio.setNotice(null)} />
    </div>
  )
}

function MobileInspectorSheet({
  studio,
  onClose,
  onOpenProvenance,
}: {
  studio: ReturnType<typeof useFoundryStudio>
  onClose: () => void
  onOpenProvenance: (outputId: string) => void
}) {
  const panelRef = useDialogFocusTrap<HTMLDivElement>(onClose)
  const node = studio.selectedNode
  if (!node) return null

  return (
    <div className="fixed inset-0 z-40 flex flex-col justify-end lg:hidden">
      <div
        aria-hidden="true"
        onMouseDown={onClose}
        className="absolute inset-0 bg-black/60"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Inspector: ${node.data.label}`}
        tabIndex={-1}
        className="relative max-h-[82dvh] overflow-hidden rounded-t-lg border-t border-[#1e1e1e] bg-[#111113] outline-none"
      >
        <div className="flex items-center justify-between border-b border-[#1e1e1e] px-4 py-2.5">
          <span className="font-display text-sm font-medium text-[#f4f4f5]">Inspector</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inspector"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#1e1e1e] text-[#8a8a93] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[calc(82dvh-49px)] overflow-y-auto">
          <Inspector
            node={node}
            outputs={studio.outputs}
            onUpdateFields={studio.updateNodeFields}
            onUpdateLabel={studio.updateNodeLabel}
            onDelete={(id) => {
              studio.deleteSelectedNode(id)
              onClose()
            }}
            onOpenProvenance={onOpenProvenance}
          />
        </div>
      </div>
    </div>
  )
}

function MobileRunButton({ studio }: { studio: ReturnType<typeof useFoundryStudio> }) {
  const { engineStatus, run, cancel, resumeReview, restartFromFailed } = studio
  const base =
    "flex h-12 w-full items-center justify-center gap-2 rounded-full text-[14px] font-medium transition-colors focus:outline-none focus-visible:ring-2"

  if (engineStatus === "running") {
    return (
      <button
        type="button"
        onClick={cancel}
        className={cn(base, "border border-[#e26d6d]/60 bg-[#e26d6d]/10 text-[#e26d6d] focus-visible:ring-[#e26d6d]")}
      >
        <Ban className="h-4 w-4" aria-hidden="true" /> Cancel run
      </button>
    )
  }
  if (engineStatus === "review-needed") {
    return (
      <button type="button" onClick={resumeReview} className={cn(base, "bg-[#10b981] text-[#04120c] focus-visible:ring-[#10b981]")}>
        <Play className="h-4 w-4" aria-hidden="true" /> Resume run
      </button>
    )
  }
  if (engineStatus === "failed") {
    return (
      <button type="button" onClick={restartFromFailed} className={cn(base, "bg-[#10b981] text-[#04120c] focus-visible:ring-[#10b981]")}>
        <RotateCcw className="h-4 w-4" aria-hidden="true" /> Restart from failed
      </button>
    )
  }
  return (
    <button type="button" onClick={run} className={cn(base, "bg-[#10b981] text-[#04120c] focus-visible:ring-[#10b981]")}>
      <Play className="h-4 w-4" aria-hidden="true" /> Run workflow
    </button>
  )
}
