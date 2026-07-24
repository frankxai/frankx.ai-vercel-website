import { parseWorkflow, parseWorkflowJson, type ValidationResult } from "./validation"
import type { Workflow } from "./types"

/**
 * STORAGE - local browser only.
 *
 * Saved workflows live in localStorage under a namespaced key. This is a demo
 * persistence layer; Codex replaces it with server persistence + authorization
 * (see integration notes in the manifest). Export/import round-trips through
 * validated JSON so malformed files are rejected with a visible error.
 */

const STORAGE_KEY = "frankx.visual-foundry.workflows.v1"

export interface StoredWorkflows {
  [id: string]: Workflow
}

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined"
}

export function loadSavedWorkflows(): StoredWorkflows {
  if (!isBrowser()) return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== "object") return {}
    const result: StoredWorkflows = {}
    for (const [id, value] of Object.entries(parsed as Record<string, unknown>)) {
      const check = parseWorkflow(value)
      if (check.ok && check.workflow) result[id] = check.workflow
    }
    return result
  } catch {
    return {}
  }
}

export function saveWorkflow(workflow: Workflow): { ok: boolean; error?: string } {
  if (!isBrowser()) return { ok: false, error: "Storage is unavailable in this environment." }
  try {
    const current = loadSavedWorkflows()
    current[workflow.id] = { ...workflow, updatedAt: new Date().toISOString() }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Could not write to local storage." }
  }
}

export function deleteSavedWorkflow(id: string): void {
  if (!isBrowser()) return
  const current = loadSavedWorkflows()
  delete current[id]
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current))
}

/** Serialize a workflow to a downloadable, pretty-printed JSON string. */
export function exportWorkflowJson(workflow: Workflow): string {
  return JSON.stringify(workflow, null, 2)
}

/** Trigger a browser download of a workflow JSON file. */
export function downloadWorkflowJson(workflow: Workflow): void {
  if (!isBrowser()) return
  const blob = new Blob([exportWorkflowJson(workflow)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = `${workflow.id}.v${workflow.version}.json`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

/** Validate + parse an imported JSON string (with size ceiling + full checks). */
export function importWorkflowJson(text: string): ValidationResult {
  return parseWorkflowJson(text)
}
