'use client'

import { useState } from 'react'
import { Check, Copy, Terminal } from 'lucide-react'

import { ACOS_INSTALL_COMMAND } from '@/lib/acos/install-command'

export function AcosInstallCard({
  command = ACOS_INSTALL_COMMAND,
}: {
  command?: string
}) {
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)

  async function copyInstall() {
    try {
      await navigator.clipboard.writeText(command)
      setFailed(false)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
      setFailed(true)
    }
  }

  return (
    <div id="install" className="scroll-mt-24 rounded-2xl border border-white/10 bg-black/40 text-left shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-mono">Git Bash or a terminal</span>
        </div>
        <button
          type="button"
          onClick={copyInstall}
          aria-live="polite"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy the command'}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-sm text-emerald-200">
        <code>{command}</code>
      </pre>
      <p className="px-4 pb-4 text-xs leading-5 text-slate-400">
        One paste installs the published source into ~/.claude. On Windows, use Git Bash.
        {failed ? ' Clipboard is blocked in this browser — select the command and copy it.' : ''}
      </p>
    </div>
  )
}
