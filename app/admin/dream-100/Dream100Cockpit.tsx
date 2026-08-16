'use client'

import { useEffect, useMemo, useState } from 'react'
import { ExternalLink, Save, Search } from 'lucide-react'

import { dream100, type Dream100Member } from '@/lib/dream100'

const stages = ['observe', 'understand', 'contribute', 'converse', 'collaborate'] as const
type Stage = (typeof stages)[number]
type Note = {
  memberId: string
  stage: Stage
  lastTouch: string
  nextContribution: string
  privateNotes: string
  updatedAt?: string
}
type NotesResponse = {
  snapshotId: string
  persistence: 'kv' | 'unavailable'
  notes: Record<string, Note>
}

const emptyNote = (memberId: string): Note => ({
  memberId,
  stage: 'observe',
  lastTouch: '',
  nextContribution: '',
  privateNotes: '',
})

export default function Dream100Cockpit() {
  const [query, setQuery] = useState('')
  const [cohort, setCohort] = useState<'all' | Dream100Member['cohort']>('priority')
  const [selectedId, setSelectedId] = useState(dream100.members.find((member) => member.priority === 1)?.id ?? dream100.members[0].id)
  const [notes, setNotes] = useState<Record<string, Note>>({})
  const [persistence, setPersistence] = useState<'loading' | 'kv' | 'unavailable'>('loading')
  const [draft, setDraft] = useState<Note>(emptyNote(selectedId))
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    fetch('/api/admin/dream-100')
      .then((response) => response.json() as Promise<NotesResponse>)
      .then((data) => {
        setNotes(data.notes)
        setPersistence(data.persistence)
      })
      .catch(() => setPersistence('unavailable'))
  }, [])

  useEffect(() => {
    setDraft(notes[selectedId] ?? emptyNote(selectedId))
    setSaveState('idle')
  }, [notes, selectedId])

  const selected = dream100.members.find((member) => member.id === selectedId) ?? dream100.members[0]
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return dream100.members
      .filter((member) => cohort === 'all' || member.cohort === cohort)
      .filter((member) => !normalized || member.name.toLowerCase().includes(normalized) || member.category.includes(normalized))
      .sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name))
  }, [cohort, query])

  async function save() {
    setSaveState('saving')
    const response = await fetch('/api/admin/dream-100', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft),
    })
    if (!response.ok) {
      setSaveState('error')
      return
    }
    const data = (await response.json()) as { note: Note }
    setNotes((current) => ({ ...current, [selectedId]: data.note }))
    setPersistence('kv')
    setSaveState('saved')
  }

  return (
    <main className="min-h-screen bg-[#030712] px-4 pb-20 pt-28 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300/70">Private · contribution cockpit</p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">Dream 100</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
              Research and relationship memory for deliberate, human-reviewed contribution. This surface never publishes or contacts anyone automatically.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 font-mono text-xs">
            <Metric value="100" label="members" />
            <Metric value={String(dream100.signals.length)} label="signals" />
            <Metric value={String(Object.keys(notes).length)} label="noted" />
          </div>
        </header>

        {persistence === 'unavailable' ? (
          <p className="mt-5 rounded-xl border border-amber-300/20 bg-amber-300/[0.06] px-4 py-3 text-xs text-amber-100/75">
            Relationship storage is unavailable. The public registry remains read-only; edits will not persist until Vercel KV is configured.
          </p>
        ) : null}

        <section className="mt-8 grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)_320px]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
            <div className="border-b border-white/10 p-4">
              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3">
                <Search className="h-4 w-4 text-slate-500" />
                <span className="sr-only">Search members</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the registry" className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-600" />
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                {(['priority', 'active', 'horizon', 'all'] as const).map((value) => (
                  <button key={value} type="button" onClick={() => setCohort(value)} className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold capitalize ${cohort === value ? 'border-amber-300/35 bg-amber-300/10 text-amber-200' : 'border-white/10 text-slate-500 hover:text-white'}`}>
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div className="max-h-[720px] overflow-y-auto">
              {filtered.map((member) => (
                <button key={member.id} type="button" onClick={() => setSelectedId(member.id)} className={`grid w-full grid-cols-[1fr_auto] gap-3 border-b border-white/[0.06] px-4 py-4 text-left transition ${selectedId === member.id ? 'bg-amber-300/[0.07]' : 'hover:bg-white/[0.03]'}`}>
                  <span>
                    <span className="block text-sm font-semibold text-white">{member.name}</span>
                    <span className="mt-1 block text-[11px] capitalize text-slate-500">{member.category.replace(/-/g, ' ')}</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-slate-600">{notes[member.id]?.stage ?? 'observe'}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-5 border-b border-white/10 pb-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-amber-300/60">Relationship record</p>
                <h2 className="mt-2 text-2xl font-bold">{selected.name}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{selected.why}</p>
              </div>
              <a href={selected.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white">
                Official surface <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-6 grid gap-6">
              <fieldset>
                <legend className="text-xs font-semibold text-slate-300">Relationship stage</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-5">
                  {stages.map((stage, index) => (
                    <button key={stage} type="button" onClick={() => setDraft((current) => ({ ...current, stage }))} className={`rounded-xl border p-3 text-left ${draft.stage === stage ? 'border-amber-300/35 bg-amber-300/10' : 'border-white/10 bg-black/15'}`}>
                      <span className="block font-mono text-[10px] text-slate-600">{String(index + 1).padStart(2, '0')}</span>
                      <span className="mt-2 block text-xs font-semibold capitalize text-white">{stage}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="grid gap-2 text-xs font-semibold text-slate-300">
                Last meaningful touch
                <input value={draft.lastTouch} onChange={(event) => setDraft((current) => ({ ...current, lastTouch: event.target.value }))} placeholder="Date, artifact, or conversation" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-normal text-white outline-none focus:border-amber-300/35" />
              </label>
              <label className="grid gap-2 text-xs font-semibold text-slate-300">
                Next useful contribution
                <textarea value={draft.nextContribution} onChange={(event) => setDraft((current) => ({ ...current, nextContribution: event.target.value }))} rows={4} placeholder="What can we make, verify, improve, or amplify without asking for anything?" className="resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-normal leading-6 text-white outline-none focus:border-amber-300/35" />
              </label>
              <label className="grid gap-2 text-xs font-semibold text-slate-300">
                Private context
                <textarea value={draft.privateNotes} onChange={(event) => setDraft((current) => ({ ...current, privateNotes: event.target.value }))} rows={5} placeholder="Interests, boundaries, evidence, and relationship memory" className="resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-normal leading-6 text-white outline-none focus:border-amber-300/35" />
              </label>
              <div className="flex items-center gap-4">
                <button type="button" onClick={save} disabled={saveState === 'saving' || persistence === 'unavailable'} className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40">
                  <Save className="h-4 w-4" /> {saveState === 'saving' ? 'Saving' : 'Save record'}
                </button>
                <span className={`text-xs ${saveState === 'error' ? 'text-red-300' : 'text-slate-500'}`}>
                  {saveState === 'saved' ? 'Saved to private storage.' : saveState === 'error' ? 'Nothing was written.' : notes[selectedId]?.updatedAt ? `Updated ${new Date(notes[selectedId].updatedAt!).toLocaleString()}` : ''}
                </span>
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Architecture lens</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{selected.frankxAngle}</p>
            </div>
            <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/60">Creator lens</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{selected.genCreatorAngle}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">This week’s source queue</p>
              <ol className="mt-4 space-y-4">
                {dream100.signals.slice(0, 4).map((signal) => (
                  <li key={signal.id}>
                    <a href={signal.sourceUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold leading-5 text-white hover:text-amber-200">{signal.title}</a>
                    <span className="mt-1 block text-[11px] text-slate-600">{signal.publishedAt}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}

function Metric({ value, label }: { value: string; label: string }) {
  return <div><span className="block text-lg font-bold text-white">{value}</span><span className="mt-1 block text-[10px] uppercase tracking-[0.14em] text-slate-600">{label}</span></div>
}

