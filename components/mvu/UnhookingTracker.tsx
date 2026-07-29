'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Download, RotateCcw, ShieldCheck, Trash2 } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'

const STORAGE_KEY = 'frankx:mvu:unhooking-entry:v1'

type Entry = {
  facts: string
  body: string
  thought: string
  impulse: string
  beneficiary: string
  kindAction: string
  attachment: number
}

const EMPTY_ENTRY: Entry = {
  facts: '',
  body: '',
  thought: '',
  impulse: '',
  beneficiary: '',
  kindAction: '',
  attachment: 3,
}

const FIELDS: Array<{
  key: Exclude<keyof Entry, 'attachment'>
  label: string
  prompt: string
  placeholder: string
}> = [
  {
    key: 'facts',
    label: 'Facts',
    prompt: 'What would a camera and microphone record?',
    placeholder: 'The message has not received a reply in two days.',
  },
  {
    key: 'body',
    label: 'Body',
    prompt: 'Where is the activation, and how intense is it?',
    placeholder: 'Tight chest, warm face, 6/10.',
  },
  {
    key: 'thought',
    label: 'Story',
    prompt: 'What meaning did the mind add?',
    placeholder: 'They do not respect me.',
  },
  {
    key: 'impulse',
    label: 'Impulse',
    prompt: 'What does the pattern want you to do next?',
    placeholder: 'Send a sharp follow-up and prove my value.',
  },
  {
    key: 'beneficiary',
    label: 'Protected identity',
    prompt: 'Which version of “me” wants this outcome?',
    placeholder: 'The person who must always be taken seriously.',
  },
  {
    key: 'kindAction',
    label: 'Chosen action',
    prompt: 'What is kind, truthful, and boundaried now?',
    placeholder: 'Send one clear follow-up, then return attention to today’s work.',
  },
]

function normalizeEntry(value: unknown): Entry {
  if (!value || typeof value !== 'object') return { ...EMPTY_ENTRY }

  const candidate = value as Record<string, unknown>
  const stringValue = (key: keyof Entry) =>
    typeof candidate[key] === 'string' ? String(candidate[key]) : ''

  const savedAttachment =
    typeof candidate.attachment === 'number' && Number.isFinite(candidate.attachment)
      ? candidate.attachment
      : EMPTY_ENTRY.attachment

  return {
    facts: stringValue('facts'),
    body: stringValue('body'),
    thought: stringValue('thought'),
    impulse: stringValue('impulse'),
    beneficiary: stringValue('beneficiary'),
    kindAction: stringValue('kindAction'),
    attachment: Math.min(5, Math.max(0, Math.round(savedAttachment))),
  }
}

function asMarkdown(entry: Entry) {
  return `# Unhooking practice entry

Date: ${new Date().toISOString()}

- Observable facts: ${entry.facts || '—'}
- Body sensation: ${entry.body || '—'}
- Automatic story: ${entry.thought || '—'}
- Impulse: ${entry.impulse || '—'}
- Identity or beneficiary: ${entry.beneficiary || '—'}
- Outcome attachment (0–5): ${entry.attachment}
- Kindest truthful action: ${entry.kindAction || '—'}

Reflection: A thought appeared. I did not have to turn it into an instruction.
`
}

export function UnhookingTracker() {
  const [entry, setEntry] = useState<Entry>(EMPTY_ENTRY)
  const [hydrated, setHydrated] = useState(false)
  const skipNextSave = useRef(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) setEntry(normalizeEntry(JSON.parse(saved)))
    } catch {
      // A blocked or malformed local store should never block the practice.
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (skipNextSave.current) {
      skipNextSave.current = false
      return
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entry))
    } catch {
      // The tracker remains usable even when local storage is unavailable.
    }
  }, [entry, hydrated])

  const completed = useMemo(
    () => FIELDS.filter((field) => entry[field.key].trim().length > 0).length,
    [entry]
  )

  function update<K extends keyof Entry>(key: K, value: Entry[K]) {
    setEntry((current) => ({ ...current, [key]: value }))
  }

  function downloadEntry() {
    const blob = new Blob([asMarkdown(entry)], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `unhooking-entry-${new Date().toISOString().slice(0, 10)}.md`
    link.click()
    URL.revokeObjectURL(url)
    trackEvent('mvu_practice_action', {
      action: 'export_reflection',
      completed_signals: completed,
    })
  }

  function startFreshEntry() {
    setEntry({ ...EMPTY_ENTRY })
    trackEvent('mvu_practice_action', { action: 'start_fresh_entry' })
  }

  function clearEntry() {
    skipNextSave.current = true
    setEntry({ ...EMPTY_ENTRY })
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // The visible reset still succeeds.
    }
    trackEvent('mvu_practice_action', { action: 'delete_local_data' })
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-amber-300/20 bg-space">
      <div className="flex flex-col gap-5 border-b border-white/10 px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-300/70">
            Local practice instrument
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Trace one hook before it acts for you.
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/45">
          <ShieldCheck className="h-4 w-4 text-amber-300/70" aria-hidden />
          Saved only in this browser
        </div>
      </div>

      <div className="grid gap-px bg-white/10 lg:grid-cols-2">
        {FIELDS.map((field, index) => (
          <label key={field.key} className="block bg-void p-5 sm:p-7">
            <span className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-semibold text-white">
                {String(index + 1).padStart(2, '0')} · {field.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">
                {entry[field.key].trim() ? 'noticed' : 'open'}
              </span>
            </span>
            <span className="mt-2 block text-sm leading-6 text-white/50">
              {field.prompt}
            </span>
            <textarea
              value={entry[field.key]}
              onChange={(event) => update(field.key, event.target.value)}
              placeholder={field.placeholder}
              rows={3}
              className="mt-4 w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-amber-300/50 focus:ring-2 focus:ring-amber-300/10"
            />
          </label>
        ))}
      </div>

      <div className="border-t border-white/10 px-5 py-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="flex-1">
            <span className="flex justify-between text-xs text-white/55">
              <span>How attached am I to one result?</span>
              <span className="font-mono text-amber-300">{entry.attachment}/5</span>
            </span>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={entry.attachment}
              onChange={(event) => update('attachment', Number(event.target.value))}
              className="mt-3 w-full accent-amber-300"
            />
          </label>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 sm:w-32 sm:text-right">
            {completed}/6 signals named
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
          <button
            type="button"
            onClick={downloadEntry}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-void transition-colors hover:bg-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
          >
            <Download className="h-4 w-4" aria-hidden />
            Export this reflection
          </button>
          <button
            type="button"
            onClick={startFreshEntry}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/65 transition-colors hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Start a fresh entry
          </button>
          <button
            type="button"
            onClick={clearEntry}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-white/35 transition-colors hover:text-rose-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 sm:ml-auto"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            Delete local data
          </button>
        </div>
      </div>
    </div>
  )
}
