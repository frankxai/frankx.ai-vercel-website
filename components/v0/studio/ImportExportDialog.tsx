"use client"

import { useRef, useState } from "react"
import { Download, FileUp, FolderOpen, Trash2 } from "lucide-react"
import type { FoundryStudio } from "./use-foundry-studio"
import { Modal } from "./Modal"
import { ErrorBanner } from "./Surfaces"

/**
 * Import / export dialog. Exports the current workflow to JSON, imports pasted
 * or uploaded JSON through the validator (malformed files surface a visible
 * error), and lists workflows saved in this browser.
 */
export function ImportExportDialog({ studio, onClose }: { studio: FoundryStudio; onClose: () => void }) {
  const { exportJson, importJson, importError, setImportError, savedIds, seedWorkflows, loadWorkflow, deleteSaved } =
    studio
  const [draft, setDraft] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const savedOnly = savedIds.filter((id) => !seedWorkflows.some((w) => w.id === id))

  const handleFile = async (file: File | undefined) => {
    if (!file) return
    const text = await file.text()
    setDraft(text)
    importJson(text)
  }

  return (
    <Modal title="Import / export workflow" onClose={onClose} widthClass="max-w-lg">
      <div className="space-y-5 p-4">
        <section>
          <h3 className="mb-2 font-mono text-[10px] uppercase tracking-wide text-[#8a8a93]">Export</h3>
          <button
            type="button"
            onClick={exportJson}
            className="inline-flex items-center gap-2 rounded-md border border-[#1e1e1e] bg-[#0a0a0b] px-3 py-2 text-[13px] text-[#f4f4f5] transition-colors hover:border-[#10b981]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50"
          >
            <Download className="h-4 w-4 text-[#10b981]" aria-hidden="true" />
            Download current workflow JSON
          </button>
        </section>

        <section>
          <h3 className="mb-2 font-mono text-[10px] uppercase tracking-wide text-[#8a8a93]">Import</h3>
          {importError ? (
            <div className="mb-2">
              <ErrorBanner message={importError} onDismiss={() => setImportError(null)} />
            </div>
          ) : null}
          <label htmlFor="import-json" className="sr-only">
            Paste workflow JSON
          </label>
          <textarea
            id="import-json"
            rows={5}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder='{ "schemaVersion": "1.0.0", "id": "...", "nodes": [...] }'
            className="w-full resize-none rounded-md border border-[#1e1e1e] bg-[#0a0a0b] px-2.5 py-2 font-mono text-xs text-[#f4f4f5] placeholder:text-[#5c5c64] focus:outline-none focus-visible:border-[#10b981] focus-visible:ring-2 focus-visible:ring-[#10b981]/40"
          />
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => importJson(draft)}
              disabled={!draft.trim()}
              className="inline-flex items-center gap-2 rounded-md bg-[#10b981] px-3 py-2 text-[13px] font-medium text-[#04120c] transition-colors hover:bg-[#0fca8f] disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]"
            >
              <FileUp className="h-4 w-4" aria-hidden="true" />
              Import from text
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-md border border-[#1e1e1e] px-3 py-2 text-[13px] text-[#f4f4f5] transition-colors hover:border-[#2a2a2e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981]/50"
            >
              <FolderOpen className="h-4 w-4" aria-hidden="true" />
              Choose file…
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="sr-only"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>
        </section>

        <section>
          <h3 className="mb-2 font-mono text-[10px] uppercase tracking-wide text-[#8a8a93]">Saved in this browser</h3>
          {savedOnly.length === 0 ? (
            <p className="text-[12px] text-[#5c5c64]">No saved workflows yet. Use Save in the command bar.</p>
          ) : (
            <ul className="flex flex-col gap-1">
              {savedOnly.map((id) => (
                <li
                  key={id}
                  className="flex items-center gap-2 rounded-md border border-[#1e1e1e] bg-[#0a0a0b] px-2.5 py-1.5"
                >
                  <span className="flex-1 truncate font-mono text-[12px] text-[#f4f4f5]">{id}</span>
                  <button
                    type="button"
                    onClick={() => {
                      loadWorkflow(id)
                      onClose()
                    }}
                    className="rounded px-2 py-1 text-[12px] text-[#06b6d4] hover:bg-[#06b6d4]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06b6d4]/50"
                  >
                    Load
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteSaved(id)}
                    aria-label={`Delete saved workflow ${id}`}
                    className="flex h-7 w-7 items-center justify-center rounded text-[#8a8a93] hover:text-[#e26d6d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e26d6d]/50"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Modal>
  )
}
