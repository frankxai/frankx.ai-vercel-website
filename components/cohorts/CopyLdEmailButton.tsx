'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

const LD_APPROVAL_EMAIL = `Subject: L&D Training Request: AI Architect Academy (Q1 2027 Founding Cohort — €1,450)

Hi [Manager Name],

I would like to allocate €1,450 from our engineering L&D / software training budget to reserve a seat in the AI Architect Academy Q1 2027 Founding Cohort (6 weeks, Feb–Mar 2027, founding rate vs. €2,250 standard).

Why this directly applies to our stack:
- Trust-boundary architecture & secret/claims admission gates
- Production evaluation harnesses & model-routing cost optimization (50–80% LLM spend reduction patterns)
- Multi-agent governance & weekly live architecture reviews on real production systems
- Lifetime re-join rights to future cohort updates so the training does not go stale

Open curriculum & labs to inspect upfront: https://aiarchitectacademy.com
Commercial terms: VAT-compliant EU Eenmanszaak invoice included (see https://www.frankx.ai/legal/imprint) + 30-day refund guarantee starting Day 1 of cohort kickoff.

Let me know if I can reserve a Founding Wave seat under our Q4/Q1 training allowance.

Thanks,
[Your Name]`

export function CopyLdEmailButton() {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')

  async function handleCopy() {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(LD_APPROVAL_EMAIL)
      } else if (typeof document !== 'undefined') {
        const textarea = document.createElement('textarea')
        textarea.value = LD_APPROVAL_EMAIL
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        const ok = document.execCommand('copy')
        document.body.removeChild(textarea)
        if (!ok) {
          throw new Error('Copy command unavailable')
        }
      } else {
        throw new Error('Clipboard unavailable')
      }
      setStatus('copied')
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-200 transition-colors hover:bg-cyan-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] motion-reduce:transition-none"
      >
        {status === 'copied' ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            <span>Copied L&amp;D approval email</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Copy full L&amp;D approval email</span>
          </>
        )}
      </button>
      <span className="text-xs text-zinc-400" role="status" aria-live="polite">
        {status === 'error'
          ? 'Clipboard blocked — select and copy the summary block above.'
          : status === 'copied'
            ? 'Ready to paste to your manager or People Ops.'
            : 'Includes syllabus link, VAT invoice note, and 30-day kickoff guarantee.'}
      </span>
    </div>
  )
}
