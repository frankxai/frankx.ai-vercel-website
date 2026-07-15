'use client'

import { useState } from 'react'
import { Check, Copy, ExternalLink, PackageCheck } from 'lucide-react'

import { anaInstallCommands, anaLinks } from '@/data/ana-collaboration'

export function AnaPluginInstall() {
  const [copied, setCopied] = useState(false)

  async function copyCommands() {
    await navigator.clipboard.writeText(anaInstallCommands.join('\n'))
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="install" aria-labelledby="install-title" className="scroll-mt-24 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.045]">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        <div className="p-6 sm:p-8 lg:p-10">
          <PackageCheck className="h-6 w-6 text-ana-gold" aria-hidden="true" />
          <p className="mt-6 text-sm font-medium text-ana-gold">Shared Codex plugin</p>
          <h2 id="install-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Install the same operating method across the team.</h2>
          <p className="mt-5 text-base leading-7 text-ana-cream/65">The marketplace points every teammate to one maintained source. The plugin carries reusable instructions and checks; private working files remain in the tools Ana approves.</p>
          <a href={anaLinks.kitRepo} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-ana-cream transition hover:border-white/30">
            Open the GitHub source
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="border-t border-white/10 bg-black/25 p-5 sm:p-7 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-ana-cream">ana-hr-operations</p>
              <p className="mt-1 font-mono text-xs text-ana-cream/45">frankxai/ana-ai-business-kit · main</p>
            </div>
            <button type="button" onClick={copyCommands} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ana-cream px-4 py-2 text-sm font-semibold text-ana-obsidian focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ana-gold">
              {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy install'}
            </button>
          </div>
          <pre className="mt-6 overflow-x-auto rounded-[1.5rem] border border-white/10 bg-[#090a0a] p-5 text-sm leading-7 text-emerald-100"><code>{anaInstallCommands.join('\n')}</code></pre>
          <ol className="mt-6 grid gap-3 text-sm leading-6 text-ana-cream/60 sm:grid-cols-3">
            <li><span className="text-ana-gold">1.</span> Add the marketplace once.</li>
            <li><span className="text-ana-gold">2.</span> Install the team plugin.</li>
            <li><span className="text-ana-gold">3.</span> Open a new Codex task.</li>
          </ol>
          <p className="mt-5 text-xs leading-5 text-ana-cream/40">Updates come from the maintained GitHub source. Workspace approvals may still be required in managed team environments.</p>
        </div>
      </div>
    </section>
  )
}
