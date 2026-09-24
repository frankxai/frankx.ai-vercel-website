'use client'

import { useState } from 'react'
import { Check, Copy, Terminal } from 'lucide-react'

const HARNESSES = [
  { id: 'claude', label: 'Claude Code' },
  { id: 'cursor', label: 'Cursor' },
  { id: 'antigravity', label: 'Antigravity' },
  { id: 'grok', label: 'Grok' },
] as const

const SHELLS = [
  { id: 'bash', label: 'Terminal' },
  { id: 'powershell', label: 'Windows' },
] as const

type HarnessId = (typeof HARNESSES)[number]['id']
type ShellId = (typeof SHELLS)[number]['id']

function installCommand(harness: HarnessId, shell: ShellId) {
  const clone = 'git clone --depth 1 https://github.com/frankxai/agentic-creator-os.git'
  const run = `./install.sh --platform=${harness}`
  if (shell === 'powershell') {
    return `${clone}; Set-Location agentic-creator-os; bash ${run}`
  }
  return `${clone} && cd agentic-creator-os && ${run}`
}

export function InstallCommand({ id = 'install' }: { id?: string }) {
  const [harness, setHarness] = useState<HarnessId>('claude')
  const [shell, setShell] = useState<ShellId>('bash')
  const [copied, setCopied] = useState(false)
  const command = installCommand(harness, shell)

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div id={id} className="mx-auto max-w-2xl scroll-mt-28 rounded-2xl border border-white/10 bg-black/40 text-left shadow-2xl">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 px-4 py-3">
        <Terminal className="h-3.5 w-3.5 text-slate-400" aria-hidden />
        <div className="flex flex-wrap gap-1" role="radiogroup" aria-label="Harness">
          {HARNESSES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={harness === item.id}
              onClick={() => setHarness(item.id)}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                harness === item.id ? 'bg-emerald-500/15 text-emerald-100' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-1" role="radiogroup" aria-label="Shell">
          {SHELLS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={shell === item.id}
              onClick={() => setShell(item.id)}
              className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                shell === item.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-sm text-emerald-200">
        <code>{command}</code>
      </pre>
      <div className="flex flex-col gap-3 border-t border-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-slate-400">
          One command. It clones the public repository and runs <span className="font-mono text-slate-300">install.sh</span>.
          Back up an existing Claude profile first. The script can replace files with the same name.
        </p>
        <button
          type="button"
          onClick={copy}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-emerald-950 transition-transform duration-150 ease-out hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.97] motion-reduce:active:scale-100"
        >
          {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
          <span aria-live="polite">{copied ? 'Copied' : 'Copy install command'}</span>
        </button>
      </div>
    </div>
  )
}
