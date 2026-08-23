'use client'

import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void'

export type ExplorerFile = {
  name: string
  bytes: number
  href: string
  html?: string
}

export type ExplorerExample = {
  slug: string
  title: string
  goal: string
  files: ExplorerFile[]
}

const kb = (bytes: number) => `${Math.round(bytes / 1024)} KB`

/**
 * Prose styling for the compiled artifact markdown. Written as scoped child
 * selectors rather than a global stylesheet rule: these documents are dense with
 * tables and fenced commands, and their type scale is a property of this one
 * surface, not of the site.
 */
const ARTIFACT_PROSE = [
  'text-sm leading-7 text-slate-300',
  '[&>*:first-child]:mt-0',
  '[&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:text-white',
  '[&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-white',
  '[&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-white',
  '[&_p]:my-4',
  '[&_strong]:font-semibold [&_strong]:text-white',
  '[&_a]:text-emerald-300 [&_a]:underline [&_a]:decoration-emerald-300/30 [&_a]:underline-offset-4',
  '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1',
  '[&_code]:rounded [&_code]:bg-white/[0.06] [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8em] [&_code]:text-emerald-200',
  '[&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-black/50 [&_pre]:p-4',
  '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-xs [&_pre_code]:text-slate-300',
  '[&_table]:my-6 [&_table]:w-full [&_table]:min-w-[36rem] [&_table]:border-collapse [&_table]:text-xs',
  '[&_th]:border-b [&_th]:border-white/15 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-white',
  '[&_td]:border-b [&_td]:border-white/[0.07] [&_td]:px-3 [&_td]:py-2 [&_td]:align-top',
  '[&_blockquote]:border-l [&_blockquote]:border-white/15 [&_blockquote]:pl-4 [&_blockquote]:text-slate-400',
  '[&_hr]:my-8 [&_hr]:border-white/10',
].join(' ')

/**
 * ArtifactExplorer — a shell over artifact sets that were compiled server-side.
 * It holds the two rails and the current selection; it never parses markdown and
 * never fetches. Files without compiled prose are download rows, which is the
 * honest shape: the whole set is on disk, and the page carries the two documents
 * worth reading in a browser.
 */
export default function ArtifactExplorer({ examples }: { examples: ExplorerExample[] }) {
  const [slug, setSlug] = useState(examples[0].slug)
  const example = examples.find((entry) => entry.slug === slug) ?? examples[0]
  const readable = example.files.filter((file) => file.html)
  const [fileName, setFileName] = useState(readable[0]?.name ?? '')

  const active = readable.find((file) => file.name === fileName) ?? readable[0]

  useEffect(() => {
    if (active) trackEvent('ai_architect_artifact_opened', { example: slug, file: active.name })
  }, [slug, active])

  const selectExample = (next: string) => {
    const target = examples.find((entry) => entry.slug === next)
    setSlug(next)
    setFileName(target?.files.find((file) => file.html)?.name ?? '')
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-black/40">
      <div className="flex flex-wrap gap-2 border-b border-white/[0.07] p-3">
        {examples.map((entry) => {
          const selected = entry.slug === example.slug
          return (
            <button
              key={entry.slug}
              type="button"
              onClick={() => selectExample(entry.slug)}
              aria-pressed={selected}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${FOCUS_RING} ${
                selected ? 'bg-white text-slate-950' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {entry.title}
            </button>
          )
        })}
      </div>

      <div className="border-b border-white/[0.07] px-6 py-5 sm:px-8">
        <p className="font-mono text-xs text-emerald-300">Goal the run started from</p>
        <p className="mt-2 max-w-3xl leading-7 text-slate-300">{example.goal}</p>
      </div>

      <div className="grid gap-0 lg:grid-cols-[260px_1fr]">
        <div className="border-b border-white/[0.07] p-4 lg:border-b-0 lg:border-r">
          <p className="px-2 font-mono text-xs uppercase tracking-wider text-white/50">
            docs/architecture/
          </p>
          <ul className="mt-3 space-y-px">
            {example.files.map((file) => {
              if (!file.html) {
                return (
                  <li key={file.name}>
                    <a
                      href={file.href}
                      download
                      className={`flex items-baseline justify-between gap-3 rounded-lg px-2 py-1.5 font-mono text-xs text-slate-400 transition-colors hover:bg-white/5 hover:text-white ${FOCUS_RING}`}
                    >
                      <span className="break-all">{file.name}</span>
                      <span className="shrink-0 text-slate-600">{kb(file.bytes)}</span>
                    </a>
                  </li>
                )
              }
              const selected = file.name === active?.name
              return (
                <li key={file.name}>
                  <button
                    type="button"
                    onClick={() => setFileName(file.name)}
                    aria-pressed={selected}
                    className={`flex w-full items-baseline justify-between gap-3 rounded-lg px-2 py-1.5 text-left font-mono text-xs transition-colors ${FOCUS_RING} ${
                      selected
                        ? 'bg-white/[0.08] text-white'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="break-all">{file.name}</span>
                    <span className="shrink-0 text-slate-600">{kb(file.bytes)}</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <p className="mt-4 px-2 text-xs leading-5 text-slate-600">
            Two files are readable here. The rest download.
          </p>
        </div>

        <div className="min-w-0 p-6 sm:p-8">
          {active ? (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/[0.07] pb-4">
                <p className="font-mono text-sm text-slate-300">{active.name}</p>
                <a
                  href={active.href}
                  download
                  className={`inline-flex items-center gap-2 rounded-sm text-sm text-slate-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white ${FOCUS_RING}`}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download
                </a>
              </div>
              {/* The markdown is a committed fixture in this repository, compiled
                  server-side by `marked` — the same trust model and pipeline as
                  content/rails. No user input reaches this string. */}
              <div
                className={`mt-6 overflow-x-auto ${ARTIFACT_PROSE}`}
                dangerouslySetInnerHTML={{ __html: active.html as string }}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
