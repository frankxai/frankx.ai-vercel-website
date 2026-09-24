'use client'

import { useState } from 'react'
import { Check, Copy, Terminal } from 'lucide-react'
import { installCommand, type HarnessId, type ShellId } from '@/lib/acos/install-command'

const HARNESSES = [
  { id: 'claude', label: 'Claude Code' },
  { id: 'cursor', label: 'Cursor' },
  { id: 'antigravity', label: 'Antigravity' },
  { id: 'grok', label: 'Grok' },
] as const

const SHELLS = [
  { id: 'bash', label: 'Bash (Git Bash on Windows)' },
  { id: 'powershell', label: 'PowerShell + Git Bash' },
] as const

const INSTALL_EFFECT: Record<HarnessId, string> = {
  claude: 'Copies the broader ACOS skills, agents, commands and hooks into your Claude profile. Existing files with the same names can be replaced.',
  cursor: 'Writes .cursorrules in this project. It does not install the Claude skill and agent files into Cursor.',
  antigravity: 'Creates .antigravity/ and harnesses/antigravity/ in this project. Review the generated MCP configuration before use.',
  grok: 'Creates GROK.md and .grok/ in this project. Review the generated hooks before trusting them.',
}

export function InstallCommand({ id = 'install' }: { id?: string }) {
  const [harness, setHarness] = useState<HarnessId>('claude')
  const [shell, setShell] = useState<ShellId>('bash')
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const command = installCommand(harness, shell)

  function selectHarness(value: HarnessId) {
    setHarness(value)
    setCopyState('idle')
  }

  function selectShell(value: ShellId) {
    setShell(value)
    setCopyState('idle')
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }
  }

  return (
    <div id={id} className="mx-auto max-w-2xl scroll-mt-28 rounded-2xl border border-white/10 bg-black/40 text-left shadow-2xl">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 px-4 py-3">
        <Terminal className="h-3.5 w-3.5 text-slate-400" aria-hidden />
        <div className="flex flex-wrap gap-1" role="group" aria-label="Agent runtime">
          {HARNESSES.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={harness === item.id}
              onClick={() => selectHarness(item.id)}
              className={`min-h-11 rounded-full px-3 py-2 text-xs font-semibold transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                harness === item.id ? 'bg-emerald-500/15 text-emerald-100' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-1" role="group" aria-label="Shell">
          {SHELLS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={shell === item.id}
              onClick={() => selectShell(item.id)}
              className={`min-h-11 rounded-full px-3 py-2 text-xs font-semibold transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                shell === item.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-sm leading-relaxed text-emerald-200">
        <code>{command}</code>
      </pre>
      <div className="flex flex-col gap-3 border-t border-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-slate-400">
          Run from your project root with Git and Bash installed (Git for Windows for PowerShell). This leaves an{' '}
          <span className="font-mono text-slate-300">agentic-creator-os/</span> source folder here.{' '}
          {INSTALL_EFFECT[harness]} This sets up the public ACOS source. The standalone Foundation bundle is still being packaged.
        </p>
        <button
          type="button"
          onClick={copy}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 transition-transform duration-150 ease-out hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.97] motion-reduce:active:scale-100"
        >
          {copyState === 'copied' ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
          <span>{copyState === 'copied' ? 'Copied' : 'Copy setup command'}</span>
        </button>
      </div>
      {copyState === 'error' && (
        <p className="px-4 pb-3 text-xs text-rose-300">Clipboard unavailable. Select the command above to copy it.</p>
      )}
      <p className="sr-only" role="status" aria-live="polite">
        {copyState === 'copied' ? 'Command copied to clipboard' : copyState === 'error' ? 'Clipboard unavailable' : ''}
      </p>
    </div>
  )
}
