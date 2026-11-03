'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import {
  Check,
  Copy,
  FileText,
  FolderTree,
  Globe,
  ListChecks,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react'
import type { InspectableFileEntry, ProductPreviewManifest } from '@/lib/products/preview-manifests'

function FileKindIcon({ kind }: { kind: InspectableFileEntry['kind'] }) {
  if (kind === 'route') return <Globe className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
  if (kind === 'outline') return <ListChecks className="h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
  return <FileText className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
}

export default function ProductFileInspector({ manifest }: { manifest: ProductPreviewManifest }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const activeFile = manifest.files[selectedIndex] ?? manifest.files[0]
  if (!activeFile) return null

  const isVerified = manifest.evidenceKind === 'verified-delivery'

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = manifest.files.length
    if (count === 0) return

    let nextIndex: number | null = null
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      nextIndex = (index + 1) % count
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + count) % count
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = count - 1
    }

    if (nextIndex !== null) {
      event.preventDefault()
      setSelectedIndex(nextIndex)
      tabRefs.current[nextIndex]?.focus()
    }
  }

  const handleCopyTree = async () => {
    const header = isVerified
      ? `${manifest.name} (${manifest.archiveName})`
      : `${manifest.name} - Planned module outline (not yet packaged)`
    const treeText = [
      header,
      ...manifest.files.map((f) => `  - ${f.path} [${f.sizeLabel}]`),
    ].join('\n')
    try {
      await navigator.clipboard.writeText(treeText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const lines = activeFile.excerpt.split('\n')

  return (
    <section
      id="inspect-files"
      aria-labelledby={`inspector-heading-${manifest.slug}`}
      className="mt-16 space-y-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs tracking-[0.14em] text-cyan-300">
            {isVerified ? 'Verified public contents' : 'Planned scope preview'}
          </p>
          <h2
            id={`inspector-heading-${manifest.slug}`}
            className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          >
            {isVerified
              ? 'Published chapters, routes, and registered files'
              : 'Planned module outline (illustrative preview)'}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {isVerified ? (
              <>
                Inspect the live routes, published chapters, and registered files served from{' '}
                <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-slate-200">
                  {manifest.archiveName}
                </code>
                .
              </>
            ) : (
              <>
                This item is on the launch list and does not have a downloadable file archive yet.
                Entries below summarize the planned module scope under review.
              </>
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full border px-3 py-1.5 font-mono text-xs ${
              isVerified
                ? 'border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-200'
                : 'border-amber-500/25 bg-amber-500/[0.08] text-amber-200'
            }`}
          >
            {manifest.deliveryStatusLabel}
          </span>
          <button
            type="button"
            onClick={handleCopyTree}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 font-mono text-xs font-medium text-slate-200 transition-colors hover:border-cyan-400/40 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                <span>{isVerified ? 'Copied contents' : 'Copied outline'}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                <span>{isVerified ? 'Copy contents list' : 'Copy planned outline'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Two-Pane Workbench (Cycle 618b2107 + Flow 1694 pattern) */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0d1017] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="grid lg:grid-cols-12">
          {/* Left Inspector Rail */}
          <div className="border-b border-white/[0.08] bg-[#0b0d13] p-4 lg:col-span-5 lg:border-b-0 lg:border-r">
            <div className="mb-3 flex items-center justify-between px-2">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-slate-300">
                <FolderTree className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                {manifest.archiveName}
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                {manifest.files.length} {manifest.files.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div
              role="tablist"
              aria-label={`${manifest.name} ${isVerified ? 'verified contents' : 'planned module outline'}`}
              aria-orientation="vertical"
              className="space-y-1.5"
            >
              {manifest.files.map((file, idx) => {
                const selected = idx === selectedIndex
                const tabId = `file-tab-${manifest.slug}-${idx}`
                const panelId = `file-panel-${manifest.slug}-${idx}`
                return (
                  <button
                    key={file.path}
                    ref={(el) => {
                      tabRefs.current[idx] = el
                    }}
                    id={tabId}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls={panelId}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setSelectedIndex(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      selected
                        ? 'border border-cyan-400/35 bg-cyan-500/[0.10] text-white'
                        : 'border border-transparent bg-transparent text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <FileKindIcon kind={file.kind} />
                      <span className="truncate font-mono text-xs">{file.path}</span>
                    </span>
                    <span className="shrink-0 rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[11px] tabular-nums text-slate-400">
                      {file.sizeLabel}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Preview Pane */}
          <div
            id={`file-panel-${manifest.slug}-${selectedIndex}`}
            role="tabpanel"
            aria-labelledby={`file-tab-${manifest.slug}-${selectedIndex}`}
            className="flex flex-col justify-between bg-[#07090e] lg:col-span-7"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] bg-[#0b0e15] px-5 py-3.5">
                <span className="font-mono text-xs font-semibold text-slate-200">
                  {activeFile.path}
                </span>
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-slate-400">
                  {activeFile.kind} · {activeFile.sizeLabel}
                </span>
              </div>

              <p className="border-b border-white/[0.06] px-5 py-3 text-xs leading-relaxed text-slate-400">
                {activeFile.summary}
              </p>

              <pre className="overflow-x-auto p-5 font-mono text-xs leading-6 text-slate-200">
                <code>
                  {lines.map((line, lineIdx) => (
                    <span key={lineIdx} className="table-row">
                      <span className="table-cell select-none pr-4 text-right text-[11px] tabular-nums text-slate-600">
                        {lineIdx + 1}
                      </span>
                      <span className="table-cell whitespace-pre-wrap break-words">{line}</span>
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Explicit Fit & Boundary Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Good fit if</span>
          </div>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-300">
            {manifest.buyIf.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-300">
            <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Skip this if</span>
          </div>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-300">
            {manifest.skipIf.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
