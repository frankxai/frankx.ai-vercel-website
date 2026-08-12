'use client'

import { useEffect, useState } from 'react'
import { Check, Download, RotateCcw } from 'lucide-react'

import { qualityReflectionPrompts } from '@/lib/qualities'

const storageKey = 'frankx:core-qualities-map:v1'

export default function QualityReflection() {
  const [answers, setAnswers] = useState<string[]>(() => qualityReflectionPrompts.map(() => ''))
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey)
      if (!stored) return

      const parsed = JSON.parse(stored)
      if (
        Array.isArray(parsed) &&
        parsed.length === qualityReflectionPrompts.length &&
        parsed.every((answer) => typeof answer === 'string')
      ) {
        setAnswers(parsed)
        setSaved(true)
      }
    } catch {
      // Storage may be unavailable in private or restricted browser contexts.
    }
  }, [])

  const complete = answers.every((answer) => answer.trim().length > 0)

  function updateAnswer(index: number, value: string) {
    setAnswers((current) => current.map((answer, answerIndex) => (answerIndex === index ? value : answer)))
    setSaved(false)
  }

  function reset() {
    setAnswers(qualityReflectionPrompts.map(() => ''))
    setSaved(false)
    try {
      window.localStorage.removeItem(storageKey)
    } catch {
      // The visible reset still succeeds if browser storage is unavailable.
    }
  }

  function save() {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(answers))
      setSaved(true)
    } catch {
      download()
    }
  }

  function download() {
    const content = [
      'MY GOVERNING QUALITIES',
      `Mapped ${new Date().toLocaleDateString()}`,
      '',
      ...qualityReflectionPrompts.flatMap((prompt, index) => [
        `${String(index + 1).padStart(2, '0')} — ${prompt}`,
        answers[index].trim(),
        '',
      ]),
    ].join('\n')
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'my-governing-qualities.txt'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5 sm:p-8">
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/75">
            Private field sheet
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-white">Map your own foundation.</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">
            Nothing leaves this browser. Save locally or download a private field sheet when you are done.
          </p>
        </div>
        {answers.some(Boolean) && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-white/10 px-4 text-sm text-white/60 transition-colors hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {qualityReflectionPrompts.map((prompt, index) => (
          <label key={prompt} className="block">
            <span className="mb-2 flex items-start gap-3 text-sm leading-6 text-white/75">
              <span className="font-mono text-[10px] text-emerald-300/60">0{index + 1}</span>
              {prompt}
            </span>
            <textarea
              value={answers[index]}
              onChange={(event) => updateAnswer(index, event.target.value)}
              rows={4}
              className="w-full resize-y rounded-xl border border-white/10 bg-[#09090a] px-4 py-3 text-sm leading-6 text-white placeholder:text-white/25 focus:border-emerald-300/40 focus:outline-none focus:ring-2 focus:ring-emerald-300/20"
              placeholder="Your first honest answer…"
            />
          </label>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
        <p className="max-w-xl text-xs leading-5 text-white/50">
          {saved
            ? 'Saved on this device. It will return here until you clear the field sheet or your browser data.'
            : 'Keep these four answers nearby for one week. Notice which decisions become easier — and where the answers conflict.'}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={!complete}
            onClick={download}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-white/12 px-4 text-sm font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:border-white/8 disabled:text-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 motion-reduce:transition-none"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          <button
            type="button"
            disabled={!complete}
            onClick={save}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-emerald-300 px-5 text-sm font-semibold text-[#07110d] transition-colors hover:bg-emerald-200 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0b] motion-reduce:transition-none"
          >
            {saved ? <Check className="h-4 w-4" /> : null}
            {saved ? 'Saved on this device' : 'Save on this device'}
          </button>
        </div>
      </div>
    </div>
  )
}
