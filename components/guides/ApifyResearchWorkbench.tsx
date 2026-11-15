'use client'

import { useState } from 'react'
import { ArrowDownToLine, Check, Copy, FileJson, FlaskConical } from 'lucide-react'
import plan from '@/data/guides/apify-research-plan.json'
import evidence from '@/docs/ops/apify-product-lane/evaluation.template.json'
import { estimateAcceptedCost, estimateApifyEvents } from '@/lib/apify-cost-model'
import { trackEvent } from '@/lib/analytics'

const button = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:border-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300'
const field = 'mt-2 min-h-11 w-full rounded-xl border border-white/20 bg-[#090d0f] px-3 py-2 text-base text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300'
const money = (value: number | null) => value === null ? 'Unknown' : `$${value.toFixed(6)}`
type View = 'mcp' | 'api' | 'evidence'

export default function ApifyResearchWorkbench() {
  const [view, setView] = useState<View>('mcp')
  const [status, setStatus] = useState('')
  const [tier, setTier] = useState<'FREE' | 'BRONZE'>('BRONZE')
  const [pages, setPages] = useState('10')
  const [searches, setSearches] = useState('0')
  const [starts, setStarts] = useState('1')
  const [memory, setMemory] = useState('1')
  const [other, setOther] = useState('')
  const [accepted, setAccepted] = useState('')
  const numeric = (value: string) => value.trim() === '' ? NaN : Number(value)
  const eventUsd = estimateApifyEvents(tier, numeric(pages), numeric(searches), numeric(starts), numeric(memory))
  const perAccepted = estimateAcceptedCost(eventUsd, other.trim() === '' ? null : numeric(other), numeric(accepted))
  const selected = view === 'evidence' ? evidence : plan[view]
  const code = JSON.stringify(selected, null, 2)
  const track = (action: string) => trackEvent('apify_resource_action', { action, interface: view, content_id: 'apify-mcp-vs-actor-api' })

  async function copy() {
    try { await navigator.clipboard.writeText(code); setStatus('Copied to clipboard.'); track('copy') }
    catch { setStatus('Copy unavailable. Select the JSON below or download it.') }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([code + '\n'], { type: 'application/json' }))
    const anchor = document.createElement('a')
    anchor.href = url; anchor.download = `apify-${view}-template.json`; anchor.click()
    URL.revokeObjectURL(url); setStatus('Template downloaded.'); track('download')
  }

  return (
    <section aria-labelledby="apify-workbench-title" className="not-prose my-12 overflow-hidden rounded-3xl border border-emerald-300/25 bg-[#0c1215] text-white">
      <header className="border-b border-white/10 p-5 sm:p-8">
        <p className="flex items-center gap-2 font-mono text-xs tracking-wider text-emerald-300"><FlaskConical aria-hidden size={16} />Offline research workbench</p>
        <h3 id="apify-workbench-title" className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Inspect the request before the run.</h3>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">Same Actor. Same synthetic input. Compare the interface payloads, then export a blank evidence receipt. Everything here runs in your browser without calling Apify.</p>
      </header>
      <div className="p-5 sm:p-8">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Request view">
          {(['mcp', 'api', 'evidence'] as const).map(key => <button type="button" key={key} aria-pressed={view === key} onClick={() => { setView(key); setStatus('') }} className={`${button} ${view === key ? 'border-emerald-300 bg-emerald-300/10 text-emerald-200' : ''}`}>{key === 'mcp' ? 'MCP request' : key === 'api' ? 'Actor API request' : 'Evidence receipt'}</button>)}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-mono text-xs text-slate-400"><FileJson aria-hidden size={14} />{view === 'evidence' ? 'Blank template · no run recorded' : 'research.example · synthetic build 0.0.0'}</p>
          <div className="flex gap-2"><button type="button" onClick={copy} className={button}>{status.startsWith('Copied') ? <Check aria-hidden size={15} /> : <Copy aria-hidden size={15} />}Copy JSON</button><button type="button" onClick={download} className={button}><ArrowDownToLine aria-hidden size={15} />Save JSON</button></div>
        </div>
        <pre aria-label={view === 'evidence' ? 'Blank evidence receipt JSON' : `${view.toUpperCase()} request JSON`} tabIndex={0} className="mt-4 max-h-[28rem] overflow-auto rounded-2xl border border-white/10 bg-[#070b0d] p-4 text-xs leading-6 text-emerald-100/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"><code>{code}</code></pre>
        <p role="status" className="mt-2 min-h-6 text-sm text-emerald-200">{status}</p>
        <p className="text-xs leading-6 text-slate-400">The API payload includes limited permissions and explicit run options. Your MCP host still needs an Actor allowlist and permission enforcement. A real numbered build and separate spending authorization are required for execution.</p>
      </div>
      <div className="border-t border-white/10 p-5 sm:p-8">
        <p className="font-mono text-xs text-emerald-300">Cost model / editable assumptions</p>
        <h4 className="mt-3 text-xl font-semibold">What would the events cost?</h4>
        <p className="mt-3 text-sm leading-7 text-slate-300">RAG Web Browser event rates checked 15 November 2026. Enter charged events, including failed attempts where billable. This estimate excludes subscription, tax and any unentered downstream costs.</p>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <label className="text-sm text-slate-300">Pricing tier<select value={tier} onChange={e => setTier(e.target.value as 'FREE' | 'BRONZE')} className={field}><option value="BRONZE">BRONZE</option><option value="FREE">FREE</option></select></label>
          {[
            ['Fetched pages', pages, setPages, '1', '10000'],
            ['Search events', searches, setSearches, '1', '10000'],
            ['Actor starts', starts, setStarts, '1', '10000'],
            ['Memory per start (GB)', memory, setMemory, '1', '128'],
          ].map(([label, value, setter, step, max]) => <label key={label as string} className="text-sm text-slate-300">{label as string}<input type="number" min={label === 'Memory per start (GB)' ? '1' : '0'} max={max as string} step={step as string} value={value as string} onChange={e => (setter as (s: string) => void)(e.target.value)} className={field} /></label>)}
        </div>
        <div className="mt-6 border-y border-white/10 py-5"><p className="text-sm text-slate-300">Estimated Actor event subtotal</p><output className="mt-2 block font-mono text-3xl tracking-tight text-emerald-200" aria-live="polite">{money(eventUsd)}</output><p className="mt-2 text-xs leading-6 text-slate-400">Pages × page rate + searches × search rate + starts × billed memory GB × start rate. Use whole GB for this scenario; minimum one start event.</p></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-slate-300">Other attributable costs (USD)<input type="number" min="0" step="0.01" placeholder="Unknown until entered" value={other} onChange={e => setOther(e.target.value)} className={field} /><span className="mt-2 block text-xs leading-5 text-slate-400">Inference, storage, orchestration and human review. Enter 0 only when their combined cost is zero.</span></label>
          <label className="text-sm text-slate-300">Accepted artifacts<input type="number" min="0" max="10000" step="1" placeholder="Unmeasured" value={accepted} onChange={e => setAccepted(e.target.value)} className={field} /></label>
        </div>
        <p className="mt-5 text-sm text-slate-300">Estimated cost per accepted artifact <output className="ml-2 font-mono text-emerald-200" aria-live="polite">{money(perAccepted)}</output></p>
        <p className="mt-3 text-xs leading-6 text-slate-400">Blank inputs and zero accepted artifacts preserve an unknown unit cost. Reconcile actual runs against billing. <a href="https://apify.com/apify/rag-web-browser/pricing" className="text-emerald-200 underline underline-offset-4">Check current event rates</a>.</p>
      </div>
    </section>
  )
}
