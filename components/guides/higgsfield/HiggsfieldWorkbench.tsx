'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Copy, Play, ExternalLink } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { buildHiggsfieldBrief, HIGGSFIELD_REFERRAL, higgsfieldWorkflows, higgsfieldLessons, higgsfieldSources } from '@/data/higgsfield-guide'

const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0a0b]'

export default function HiggsfieldWorkbench() {
  const [selected, setSelected] = useState<string>(higgsfieldWorkflows[0].id)
  const [objective, setObjective] = useState('')
  const [ratio, setRatio] = useState('9:16')
  const [copyStatus, setCopyStatus] = useState('')
  const briefDetailsRef = useRef<HTMLDetailsElement>(null)
  const briefRef = useRef<HTMLTextAreaElement>(null)
  const workflow = higgsfieldWorkflows.find(item => item.id === selected) ?? higgsfieldWorkflows[0]
  const brief = buildHiggsfieldBrief(workflow, objective, ratio)

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief)
      setCopyStatus('Brief copied. Replace the bracketed fields before generating.')
      trackEvent('higgsfield_brief_copy', { workflow: workflow.id })
    } catch {
      if (briefDetailsRef.current) briefDetailsRef.current.open = true
      briefRef.current?.focus()
      briefRef.current?.select()
      setCopyStatus('Select the brief below and copy it with your keyboard.')
    }
  }

  return (
    <section id="workflow" aria-labelledby="workflow-heading" className="mb-16 mt-8 scroll-mt-28">
      <p className="mb-4 text-xs leading-5 text-slate-400">Official sources checked October 5, 2026. Creator examples may show earlier interfaces; the briefs are planning suggestions.</p>
      <p className="text-lg leading-8 text-slate-300 max-w-3xl">Choose what you want to make. Prepare the references and brief, then open Higgsfield and select the recommended workspace.</p>
      <div className="mt-8 border-y border-white/10 py-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="workflow-heading" className="text-2xl font-semibold tracking-tight text-white">What are you making?</h2>
          <span className="text-xs font-mono text-emerald-300">01 / Choose a workflow</span>
        </div>
        <fieldset className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <legend className="sr-only">Choose your production goal</legend>
          {higgsfieldWorkflows.map(item => (
            <label key={item.id} className={`relative flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${selected === item.id ? 'border-emerald-400/60 bg-emerald-400/10 text-emerald-100' : 'border-white/10 text-slate-300 hover:border-white/30'}`}>
              <input type="radio" name="higgsfield-workflow" value={item.id} checked={selected === item.id} onChange={() => { setSelected(item.id); setCopyStatus(''); trackEvent('higgsfield_workflow_select', { workflow: item.id }) }} className="h-4 w-4 shrink-0 accent-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300" />
              {item.label}
            </label>
          ))}
        </fieldset>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <div aria-live="polite" aria-atomic="true" className="min-w-0">
            <p className="text-sm font-medium text-emerald-300">Start in {workflow.tool}</p>
            <p className="mt-2 text-xl leading-8 text-white">{workflow.deliverable}</p>
            <p className="mt-4 text-sm leading-6 text-slate-300"><span className="font-semibold text-white">Bring:</span> {workflow.inputs}</p>
            <ol className="mt-5 space-y-4">
              {workflow.steps.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6 text-slate-300"><span aria-hidden="true" className="font-mono text-emerald-300">0{index + 1}</span><span>{step}</span></li>)}
            </ol>
            <p className="mt-5 border-l-2 border-emerald-400/50 pl-4 text-sm leading-6 text-slate-300"><span className="font-semibold text-white">Review before export.</span> {workflow.check}</p>
            <a href={`#${workflow.anchor}`} className={`mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-emerald-300 underline underline-offset-4 ${focus}`}>Read the workflow <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.025] p-5">
            <h3 className="text-lg font-semibold text-white">Prepare your brief</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">Use it as a planning brief in Higgsfield or an assistant. Adapt it to the tool’s supported inputs.</p>
            <label htmlFor="higgsfield-objective" className="mt-5 block text-sm text-slate-300">Your objective <span className="text-slate-400">(optional)</span></label>
            <input id="higgsfield-objective" value={objective} maxLength={300} onChange={event => { setObjective(event.target.value); setCopyStatus('') }} placeholder="e.g. Show our ceramic mug in morning light" className={`mt-2 min-h-11 w-full rounded-lg border border-white/15 bg-black/20 px-3 text-sm text-white placeholder:text-slate-400 ${focus}`} />
            <label htmlFor="higgsfield-ratio" className="mt-4 block text-sm text-slate-300">Delivery ratio</label>
            <select id="higgsfield-ratio" value={ratio} onChange={event => { setRatio(event.target.value); setCopyStatus('') }} className={`mt-2 min-h-11 w-full rounded-lg border border-white/15 bg-[#111113] px-3 text-sm text-white ${focus}`}>
              <option value="9:16">9:16 · Vertical</option><option value="16:9">16:9 · Landscape</option><option value="1:1">1:1 · Square</option>
            </select>
            <button type="button" onClick={copyBrief} className={`mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-5 text-sm font-medium text-white hover:bg-white/5 ${focus}`}>
              {copyStatus.startsWith('Brief copied') ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />} Copy production brief
            </button>
            <p role="status" className="mt-3 min-h-10 text-xs leading-5 text-emerald-200">{copyStatus || 'Your objective stays in this page. It is not sent to analytics.'}</p>
            <details ref={briefDetailsRef} className="mt-3 text-sm text-slate-300"><summary className={`cursor-pointer py-2 ${focus}`}>View the full brief</summary><textarea ref={briefRef} aria-label="Production brief" readOnly value={brief} rows={12} className={`mt-3 w-full resize-y rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs leading-6 text-slate-300 ${focus}`} /></details>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-start gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <TrackedLink href={HIGGSFIELD_REFERRAL} eventName="higgsfield_referral_click" eventProperties={{ workflow: workflow.id, placement: 'workbench' }} rel="sponsored noopener" target="_blank" className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 text-sm font-semibold text-[#07120e] hover:bg-emerald-300 ${focus}`}>Open Higgsfield <ArrowRight size={17} aria-hidden="true" /><span className="sr-only"> (affiliate link, opens in a new tab)</span></TrackedLink>
          <p className="max-w-md text-xs leading-5 text-slate-400">Affiliate link: FrankX may earn a commission if you purchase through this link. Check the current plan and generation cost before spending credits.</p>
        </div>
      </div>
      <nav aria-label="In this guide" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
        <a href="#watch-and-apply" className={`underline underline-offset-4 ${focus}`}>Watch and apply</a><a href="#pricing-and-credits" className={`underline underline-offset-4 ${focus}`}>Pricing and credits</a><a href="#mcp-and-api" className={`underline underline-offset-4 ${focus}`}>MCP and API</a><Link href="/learn/higgsfield-mastery" className={`underline underline-offset-4 ${focus}`}>Learning path</Link>
      </nav>
    </section>
  )
}

export function HiggsfieldLessons() {
  const [active, setActive] = useState<string | null>(null)
  return (
    <section id="watch-and-apply" aria-labelledby="lessons-heading" className="my-16 scroll-mt-28 border-t border-white/10 pt-10">
      <p className="text-xs font-mono text-emerald-300">02 / Watch, then make something</p>
      <h2 id="lessons-heading" className="mt-3 text-3xl font-semibold tracking-tight text-white">Watch and apply</h2>
      <p className="mt-4 max-w-2xl leading-7 text-slate-300">Learn from the original creators, then complete one small exercise. The exercises below are FrankX suggestions. Interface, pricing, and access can change after a video is published.</p>
      <div className="mt-8 divide-y divide-white/10">
        {higgsfieldLessons.map((lesson, index) => (
          <article key={lesson.id} className="grid gap-6 py-8 first:pt-0 md:grid-cols-[1fr_1.05fr]">
            <div className="min-w-0">
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-[#111113]">
                {active === lesson.id ? <iframe ref={frame => frame?.focus()} tabIndex={0} src={`https://www.youtube.com/embed/${lesson.youtubeId}?rel=0&start=${lesson.start}`} title={lesson.title} className="absolute inset-0 h-full w-full" allow="encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /> : <button type="button" onClick={() => { setActive(lesson.id); trackEvent('higgsfield_tutorial_load', { video_id: lesson.youtubeId }) }} className={`absolute inset-0 flex w-full flex-col items-center justify-center gap-4 p-6 text-center hover:bg-white/[0.03] ${focus}`}><span className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300/30 text-emerald-300"><Play size={22} aria-hidden="true" /></span><span className="text-sm font-medium text-white">Load {lesson.creator}’s tutorial</span><span className="text-xs text-slate-400">Connects to YouTube when you click</span></button>}
              </div>
              <a href={`https://www.youtube.com/watch?v=${lesson.youtubeId}`} target="_blank" rel="noopener noreferrer" className={`mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-slate-300 underline underline-offset-4 ${focus}`}>Watch on YouTube <ExternalLink size={14} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-mono text-emerald-300">0{index + 1} · {lesson.creator === 'Higgsfield AI' ? 'Official demonstration' : 'Creator tutorial'}</p>
              <h3 className="mt-2 text-xl font-semibold leading-7 text-white">{lesson.title}</h3>
              <a href={lesson.creatorChannel} target="_blank" rel="noopener noreferrer" className={`mt-2 inline-block py-1 text-sm text-slate-400 underline underline-offset-4 ${focus}`}>By {lesson.creator}</a>
              <p className="mt-3 text-sm leading-6 text-slate-300">{lesson.lesson}</p>
              <p className="mt-4 text-sm leading-6 text-white"><span className="font-semibold text-emerald-300">Try this:</span> {lesson.exercise}</p>
              <p className="mt-4 text-xs leading-5 text-slate-400">{lesson.scope}</p>
            </div>
          </article>
        ))}
      </div>
      <a href={higgsfieldSources.academy} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-11 items-center gap-2 text-sm text-emerald-300 underline underline-offset-4 ${focus}`}>Continue in Higgsfield Academy <ArrowRight size={16} aria-hidden="true" /></a>
    </section>
  )
}
