'use client'

import { useState, useMemo } from 'react'
import {
  DESIGN_SYSTEMS,
  SITE_ARCHETYPE_PRESETS,
  generateWebdesignBundle,
  type DesignSystemId,
  type SiteArchetypeId,
  type WebdesignArchitectInput,
} from '@/lib/self-service/webdesign-architect'
import { buildZipArchive } from '@/lib/self-service/zip'

export function WebdesignArchitectClient() {
  const [archetype, setArchetype] = useState<SiteArchetypeId>('founder-authority')
  const [input, setInput] = useState<WebdesignArchitectInput>(
    SITE_ARCHETYPE_PRESETS['founder-authority'].defaults,
  )
  const [proofText, setProofText] = useState<string>(
    SITE_ARCHETYPE_PRESETS['founder-authority'].defaults.proofItems.join('\n'),
  )
  const [viewTab, setViewTab] = useState<'preview' | 'files' | 'audit'>('preview')
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [activeFile, setActiveFile] = useState<string>('index.html')
  const [notice, setNotice] = useState<string>('')

  const effectiveInput = useMemo<WebdesignArchitectInput>(() => {
    const items = proofText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length >= 3)
      .slice(0, 4)
    return {
      ...input,
      proofItems: items.length > 0 ? items : input.proofItems,
    }
  }, [input, proofText])

  const bundle = useMemo(() => generateWebdesignBundle(effectiveInput), [effectiveInput])
  const htmlFile = bundle.files.find((f) => f.path === 'index.html')?.content ?? ''
  const inspectedFile = bundle.files.find((f) => f.path === activeFile) ?? bundle.files[0]

  function handlePreset(nextArchetype: SiteArchetypeId) {
    setArchetype(nextArchetype)
    const defaults = SITE_ARCHETYPE_PRESETS[nextArchetype].defaults
    setInput(defaults)
    setProofText(defaults.proofItems.join('\n'))
    setNotice(`Loaded ${SITE_ARCHETYPE_PRESETS[nextArchetype].label} preset.`)
  }

  function handleDownloadZip() {
    const bytes = buildZipArchive(
      bundle.files.map((f) => ({ path: f.path, content: f.content })),
    )
    const blob = new Blob([bytes], { type: 'application/zip' })
    const url = URL.createObjectURL(blob)
    const slug =
      effectiveInput.siteName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || 'frankx-web-kit'
    const link = document.createElement('a')
    link.href = url
    link.download = `${slug}-kit.zip`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setNotice(`Downloaded ${slug}-kit.zip (${bundle.files.length} files).`)
  }

  async function handleCopyFile(content: string, path: string) {
    try {
      await navigator.clipboard.writeText(content)
      setNotice(`Copied ${path} to clipboard.`)
    } catch {
      setNotice('Clipboard blocked by browser; copy directly from code view.')
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.15fr] lg:items-start">
      <div className="space-y-6 rounded-2xl border border-white/10 bg-[#0d1017] p-6">
        <div>
          <p className="font-mono text-xs text-emerald-300">1. Choose site archetype</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(Object.keys(SITE_ARCHETYPE_PRESETS) as SiteArchetypeId[]).map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={archetype === id}
                onClick={() => handlePreset(id)}
                className={`rounded-xl border p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 ${
                  archetype === id
                    ? 'border-emerald-300/70 bg-emerald-400/10 text-white'
                    : 'border-white/10 bg-black/40 text-slate-300 hover:border-white/25'
                }`}
              >
                <span className="block text-sm font-semibold">{SITE_ARCHETYPE_PRESETS[id].label}</span>
                <span className="mt-1 block text-xs text-slate-400">{SITE_ARCHETYPE_PRESETS[id].summary}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-emerald-300">2. Choose design system tokens</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(Object.keys(DESIGN_SYSTEMS) as DesignSystemId[]).map((id) => {
              const ds = DESIGN_SYSTEMS[id]
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={input.designSystem === id}
                  onClick={() => setInput({ ...input, designSystem: id })}
                  className={`rounded-xl border p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 ${
                    input.designSystem === id
                      ? 'border-emerald-300/70 bg-emerald-400/10 text-white'
                      : 'border-white/10 bg-black/40 text-slate-300 hover:border-white/25'
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{ds.name}</span>
                    <span className="inline-flex gap-1" aria-hidden="true">
                      <span className="h-3 w-3 rounded-full border border-white/20" style={{ backgroundColor: ds.bg }} />
                      <span className="h-3 w-3 rounded-full border border-white/20" style={{ backgroundColor: ds.accent }} />
                    </span>
                  </span>
                  <span className="mt-1 block text-xs text-slate-400">{ds.notes}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid gap-4">
          <div>
            <label htmlFor="fx-site-name" className="block text-xs font-medium text-slate-300">
              Brand or site name
            </label>
            <input
              id="fx-site-name"
              type="text"
              maxLength={80}
              value={input.siteName}
              onChange={(e) => setInput({ ...input, siteName: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
            />
          </div>

          <div>
            <label htmlFor="fx-headline" className="block text-xs font-medium text-slate-300">
              Primary headline (H1)
            </label>
            <input
              id="fx-headline"
              type="text"
              maxLength={140}
              value={input.headline}
              onChange={(e) => setInput({ ...input, headline: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
            />
          </div>

          <div>
            <label htmlFor="fx-subhead" className="block text-xs font-medium text-slate-300">
              Subhead or core promise
            </label>
            <textarea
              id="fx-subhead"
              rows={3}
              maxLength={600}
              value={input.subhead}
              onChange={(e) => setInput({ ...input, subhead: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="fx-cta" className="block text-xs font-medium text-slate-300">
                Primary CTA label
              </label>
              <input
                id="fx-cta"
                type="text"
                maxLength={60}
                value={input.primaryAction}
                onChange={(e) => setInput({ ...input, primaryAction: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
              />
            </div>
            <div>
              <label htmlFor="fx-url" className="block text-xs font-medium text-slate-300">
                Action HTTPS URL
              </label>
              <input
                id="fx-url"
                type="url"
                maxLength={500}
                value={input.actionUrl}
                onChange={(e) => setInput({ ...input, actionUrl: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
              />
            </div>
          </div>

          <div>
            <label htmlFor="fx-proof" className="block text-xs font-medium text-slate-300">
              Verifiable proof points (one per line)
            </label>
            <textarea
              id="fx-proof"
              rows={3}
              value={proofText}
              onChange={(e) => setProofText(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="fx-faq-q" className="block text-xs font-medium text-slate-300">
                FAQ question
              </label>
              <input
                id="fx-faq-q"
                type="text"
                maxLength={180}
                value={input.faqQuestion}
                onChange={(e) => setInput({ ...input, faqQuestion: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
              />
            </div>
            <div>
              <label htmlFor="fx-faq-a" className="block text-xs font-medium text-slate-300">
                FAQ direct answer
              </label>
              <input
                id="fx-faq-a"
                type="text"
                maxLength={500}
                value={input.faqAnswer}
                onChange={(e) => setInput({ ...input, faqAnswer: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-300">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={input.enableJsonLd}
                onChange={(e) => setInput({ ...input, enableJsonLd: e.target.checked })}
                className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
              />
              JSON-LD FAQ graph
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={input.enableLlmsTxt}
                onChange={(e) => setInput({ ...input, enableLlmsTxt: e.target.checked })}
                className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
              />
              llms.txt
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={input.enableAiRobots}
                onChange={(e) => setInput({ ...input, enableAiRobots: e.target.checked })}
                className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
              />
              AI robots.txt
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownloadZip}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-emerald-300 px-6 text-sm font-semibold text-slate-950 transition hover:bg-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          Download complete site kit (.zip · {bundle.files.length} files)
        </button>

        {notice ? (
          <output className="block font-mono text-xs text-slate-400" aria-live="polite">
            {notice}
          </output>
        ) : null}
      </div>

      <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0d1017] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex flex-wrap gap-2">
            {(
              [
                ['preview', 'Live preview'],
                ['files', `Export files (${bundle.files.length})`],
                ['audit', `Quality audit (${bundle.audit.score}/${bundle.audit.maxScore})`],
              ] as const
            ).map(([tab, label]) => (
              <button
                key={tab}
                type="button"
                aria-pressed={viewTab === tab}
                onClick={() => setViewTab(tab)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 ${
                  viewTab === tab
                    ? 'border-white bg-white text-slate-950'
                    : 'border-white/15 text-slate-300 hover:border-white/30'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {viewTab === 'preview' ? (
            <div className="flex gap-1.5">
              {(['desktop', 'mobile'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={device === mode}
                  onClick={() => setDevice(mode)}
                  className={`rounded-lg border px-2.5 py-1 font-mono text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 ${
                    device === mode
                      ? 'border-emerald-300 bg-emerald-400/15 text-emerald-100'
                      : 'border-white/15 text-slate-400'
                  }`}
                >
                  {mode === 'desktop' ? 'Desktop' : 'Mobile 390px'}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {viewTab === 'preview' ? (
          <div className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-3">
            <iframe
              title="Self-service website preview"
              sandbox=""
              srcDoc={htmlFile}
              className="mx-auto block h-[540px] rounded-lg border border-white/10 bg-white transition-all motion-reduce:transition-none"
              style={{ width: device === 'mobile' ? '390px' : '100%' }}
            />
          </div>
        ) : null}

        {viewTab === 'files' && inspectedFile ? (
          <div className="mt-5">
            <div className="flex flex-wrap gap-2">
              {bundle.files.map((file) => (
                <button
                  key={file.path}
                  type="button"
                  aria-pressed={inspectedFile.path === file.path}
                  onClick={() => setActiveFile(file.path)}
                  className={`rounded-lg border px-3 py-1.5 font-mono text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 ${
                    inspectedFile.path === file.path
                      ? 'border-emerald-300 bg-emerald-400/15 text-emerald-100'
                      : 'border-white/15 text-slate-300'
                  }`}
                >
                  {file.path}
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-slate-400">{inspectedFile.purpose}</p>
              <button
                type="button"
                onClick={() => handleCopyFile(inspectedFile.content, inspectedFile.path)}
                className="rounded-lg border border-white/20 px-3 py-1 text-xs text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
              >
                Copy {inspectedFile.path}
              </button>
            </div>
            <pre className="mt-3 max-h-[460px] overflow-auto rounded-xl border border-white/10 bg-black/70 p-4 font-mono text-xs leading-relaxed text-slate-200">
              <code>{inspectedFile.content}</code>
            </pre>
          </div>
        ) : null}

        {viewTab === 'audit' ? (
          <div className="mt-5 space-y-3">
            {bundle.audit.checks.map((check) => (
              <div
                key={check.id}
                className={`rounded-xl border p-4 ${
                  check.passed
                    ? 'border-emerald-400/30 bg-emerald-950/20'
                    : 'border-amber-300/35 bg-amber-950/25'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-white">{check.label}</span>
                  <span className={`font-mono text-xs ${check.passed ? 'text-emerald-300' : 'text-amber-200'}`}>
                    {check.passed ? 'PASS' : 'FIX'}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-300">{check.detail}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
