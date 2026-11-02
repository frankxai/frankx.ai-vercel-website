'use client'

import { useRef, useState, useSyncExternalStore, type FormEvent } from 'react'
import { Copy, Download, FileText } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const subscribe = () => () => {}
const clientReady = () => true
const serverReady = () => false

export default function EvidenceBrief() {
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady)
  const [brief, setBrief] = useState('')
  const [status, setStatus] = useState('')
  const output = useRef<HTMLTextAreaElement>(null)

  function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = (name: string) => String(data.get(name) || '').trim()
    const text = `# Website improvement brief\n\n## Reader and page\nWebsite: ${value('page')}\nReader task: ${value('task')}\nMarket and language: ${value('market')}\n\n## Evidence available\n${value('evidence')}\n\n## Assignment\nChoose refresh, new page, technical repair or no change. Check existing pages for overlap. Explain the decision using the evidence above. Keep estimates and observations separate; missing values remain unknown.\n\nAllowed actions: ${value('scope')}\nPublication: not authorized by this brief. Return a draft, source-to-claim mapping, implementation diff and checks actually run.\n\n## Acceptance\n- Support material claims with source passages.\n- Reproduce calculations outside the model.\n- Preserve the existing URL unless separately authorized.\n- Verify mobile reading, keyboard use, links and canonical.\n- Record actual cost or unknown, failures and human review.\n- Define a baseline and observation window before claiming improvement.\n`
    setBrief(text)
    setStatus('Brief prepared. Review the text before giving it to your assistant.')
    trackEvent('search_brief_prepared', { content_id: 'seo-aeo' })
    requestAnimationFrame(() => output.current?.focus())
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(brief)
      setStatus('Brief copied.')
      trackEvent('search_brief_copied', { content_id: 'seo-aeo' })
    } catch {
      output.current?.focus()
      output.current?.select()
      setStatus('Automatic copy is unavailable. The brief is selected; copy it with your keyboard.')
    }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([brief], { type: 'text/markdown;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'website-improvement-brief.md'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setStatus('Brief download requested.')
    trackEvent('search_brief_downloaded', { content_id: 'seo-aeo' })
  }

  const fieldClass = 'mt-2 w-full rounded-xl border border-white/20 bg-[#111113] px-4 py-3 text-base text-white placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300'
  const buttonClass = 'inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 hover:border-emerald-300'

  return (
    <section id="prepare-brief" aria-labelledby="prepare-brief-title" className="scroll-mt-28 border-t border-white/10 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">Your website</p>
      <h2 id="prepare-brief-title" className="mt-3 text-3xl font-semibold tracking-tight">Give your assistant a better starting point.</h2>
      <p className="mt-4 max-w-2xl leading-7 text-slate-300">Prepare a brief from the evidence you already have. This form runs in your browser and does not send field values to a server. Clear the form when you finish.</p>
      <noscript><p className="mt-4 leading-7 text-slate-300">The brief builder needs JavaScript. Use the <a href="/downloads/seo-aeo/content-brief.md" className="underline underline-offset-4">downloadable brief</a> to work offline.</p></noscript>
      <form onSubmit={generate} onReset={() => { setBrief(''); setStatus('Brief and fields cleared.') }} className="mt-8">
        <fieldset disabled={!ready} className="space-y-5">
          <legend className="sr-only">Prepare a website improvement brief</legend>
        <div className="grid gap-5 md:grid-cols-2">
          <label htmlFor="search-page" className="block text-sm font-medium text-slate-200">Page URL
            <input id="search-page" name="page" type="url" required maxLength={2048} placeholder="https://your-site.com/guide" className={fieldClass} />
          </label>
          <label htmlFor="search-market" className="block text-sm font-medium text-slate-200">Market and language
            <input id="search-market" name="market" required maxLength={200} placeholder="For example: Netherlands, English" className={fieldClass} />
          </label>
        </div>
        <label htmlFor="search-task" className="block text-sm font-medium text-slate-200">What should the reader accomplish?
          <input id="search-task" name="task" required maxLength={500} placeholder="Describe one useful result" className={fieldClass} />
        </label>
        <label htmlFor="search-evidence" className="block text-sm font-medium text-slate-200">What evidence do you have?
          <textarea id="search-evidence" name="evidence" required maxLength={12000} rows={4} placeholder="Add source URLs, dated observations and unknowns. Keep credentials and personal data out." className={fieldClass} />
        </label>
        <label htmlFor="search-scope" className="block text-sm font-medium text-slate-200">What may the assistant change?
          <input id="search-scope" name="scope" required maxLength={1000} placeholder="For example: draft one article; make no account or deployment changes" className={fieldClass} />
        </label>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-[#0a0a0b] hover:bg-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"><FileText aria-hidden="true" size={18} />Prepare the brief</button>
          <button type="reset" className={buttonClass}>Clear</button>
        </div>
        </fieldset>
      </form>
      {brief && (
        <div className="mt-8">
          <label htmlFor="search-brief-output" className="text-sm font-semibold text-white">Your editable brief</label>
          <textarea ref={output} id="search-brief-output" rows={16} value={brief} maxLength={20000} onChange={event => setBrief(event.target.value)} className={`${fieldClass} font-mono text-sm leading-6`} />
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={copy} className={buttonClass}><Copy aria-hidden="true" size={16} />Copy brief</button>
            <button type="button" onClick={download} className={buttonClass}><Download aria-hidden="true" size={16} />Download brief</button>
          </div>
        </div>
      )}
      <p role="status" className="mt-4 min-h-6 text-sm text-emerald-200">{status}</p>
    </section>
  )
}
