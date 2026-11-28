'use client'

import { useState, useMemo } from 'react'
import {
  COMPOSER_HARNESSES,
  ROLE_OPTIONS,
  SKILL_MODULES,
  composeSkillStack,
  type ComposerHarnessId,
  type OperatorRoleId,
} from '@/lib/self-service/skill-composer'
import { buildZipArchive } from '@/lib/self-service/zip'

export function SkillComposerClient() {
  const [projectName, setProjectName] = useState('my-agent-repo')
  const [roleId, setRoleId] = useState<OperatorRoleId>('solo-founder')
  const [harnessId, setHarnessId] = useState<ComposerHarnessId>('claude-code')
  const [selectedIds, setSelectedIds] = useState<string[]>(ROLE_OPTIONS['solo-founder'].defaultModules)
  const [includeMcp, setIncludeMcp] = useState(true)
  const [activePath, setActivePath] = useState('AGENTS.md')
  const [statusMessage, setStatusMessage] = useState('')

  const composed = useMemo(
    () =>
      composeSkillStack({
        projectName,
        roleId,
        harnessId,
        moduleIds: selectedIds,
        includeMcp,
      }),
    [projectName, roleId, harnessId, selectedIds, includeMcp],
  )

  const currentFile = composed.files.find((f) => f.path === activePath) ?? composed.files[0]

  function handleRoleChange(nextRole: OperatorRoleId) {
    setRoleId(nextRole)
    setSelectedIds(ROLE_OPTIONS[nextRole].defaultModules)
  }

  function toggleModule(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((item) => item !== id) : prev) : [...prev, id],
    )
  }

  function handleDownloadZip() {
    const archive = buildZipArchive(composed.files.map((f) => ({ path: f.path, content: f.content })))
    const blob = new Blob([archive], { type: 'application/zip' })
    const url = URL.createObjectURL(blob)
    const slug = projectName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'ai-stack'
    const a = document.createElement('a')
    a.href = url
    a.download = `${slug}-${harnessId}-skills.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setStatusMessage(`Downloaded ${slug}-${harnessId}-skills.zip (${composed.selectedModules.length} modules).`)
  }

  async function handleCopyFile(content: string, path: string) {
    try {
      await navigator.clipboard.writeText(content)
      setStatusMessage(`Copied ${path} to clipboard.`)
    } catch {
      setStatusMessage('Clipboard unavailable; copy directly from code block.')
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.15fr] lg:items-start">
      <div className="space-y-6 rounded-2xl border border-white/10 bg-[#0d1017] p-6">
        <div>
          <label htmlFor="sc-project" className="block font-mono text-xs text-emerald-300">
            1. Workspace or repository name
          </label>
          <input
            id="sc-project"
            type="text"
            maxLength={60}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
          />
        </div>

        <div>
          <p className="font-mono text-xs text-emerald-300">2. Primary operator role</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {(Object.keys(ROLE_OPTIONS) as OperatorRoleId[]).map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={roleId === id}
                onClick={() => handleRoleChange(id)}
                className={`rounded-xl border p-3 text-left transition motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 ${
                  roleId === id
                    ? 'border-emerald-300/70 bg-emerald-400/10 text-white'
                    : 'border-white/10 bg-black/40 text-slate-300 hover:border-white/25'
                }`}
              >
                <span className="block text-sm font-semibold">{ROLE_OPTIONS[id].label}</span>
                <span className="mt-1 block text-xs text-slate-400">{ROLE_OPTIONS[id].focus}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-emerald-300">3. Coding agent harness</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(Object.keys(COMPOSER_HARNESSES) as ComposerHarnessId[]).map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={harnessId === id}
                onClick={() => setHarnessId(id)}
                className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 ${
                  harnessId === id
                    ? 'border-emerald-300 bg-emerald-400/15 text-emerald-100'
                    : 'border-white/15 bg-black/40 text-slate-300 hover:border-white/30'
                }`}
              >
                {COMPOSER_HARNESSES[id].label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-emerald-300">4. Guardrail and skill contracts</p>
          <div className="mt-2 space-y-2">
            {SKILL_MODULES.map((mod) => {
              const active = selectedIds.includes(mod.id)
              return (
                <button
                  key={mod.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleModule(mod.id)}
                  className={`w-full rounded-xl border p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 ${
                    active
                      ? 'border-emerald-300/60 bg-emerald-400/10 text-white'
                      : 'border-white/10 bg-black/40 text-slate-300 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{mod.name}</span>
                    <span className="font-mono text-[11px] text-emerald-300">{mod.category}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{mod.summary}</p>
                </button>
              )
            })}
          </div>
        </div>

        <label className="inline-flex items-center gap-2 text-xs text-slate-300">
          <input
            type="checkbox"
            checked={includeMcp}
            onChange={(e) => setIncludeMcp(e.target.checked)}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
          />
          Include read-only `.mcp.json` discovery config
        </label>

        <button
          type="button"
          onClick={handleDownloadZip}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-emerald-300 px-6 text-sm font-semibold text-slate-950 transition motion-reduce:transition-none hover:bg-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          Download {composed.selectedModules.length}-module stack (.zip)
        </button>

        {statusMessage ? (
          <output className="block font-mono text-xs text-slate-400" aria-live="polite">
            {statusMessage}
          </output>
        ) : null}
      </div>

      <div className="min-w-0 rounded-2xl border border-white/10 bg-[#0d1017] p-6">
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {composed.files.map((file) => (
            <button
              key={file.path}
              type="button"
              aria-pressed={currentFile?.path === file.path}
              onClick={() => setActivePath(file.path)}
              className={`rounded-lg border px-3 py-1.5 font-mono text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 ${
                currentFile?.path === file.path
                  ? 'border-emerald-300 bg-emerald-400/15 text-emerald-100'
                  : 'border-white/15 text-slate-300'
              }`}
            >
              {file.path}
            </button>
          ))}
        </div>

        {currentFile ? (
          <div className="mt-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-slate-400">{currentFile.purpose}</p>
              <button
                type="button"
                onClick={() => handleCopyFile(currentFile.content, currentFile.path)}
                className="rounded-lg border border-white/20 px-3 py-1 text-xs text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
              >
                Copy {currentFile.path}
              </button>
            </div>
            <pre className="mt-3 max-h-[560px] overflow-auto rounded-xl border border-white/10 bg-black/70 p-4 font-mono text-xs leading-relaxed text-slate-200">
              <code>{currentFile.content}</code>
            </pre>
          </div>
        ) : null}
      </div>
    </div>
  )
}
