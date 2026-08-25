'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { trackEvent } from '@/lib/analytics'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void'

/**
 * The two calls to action that close the field guide. Extracted from the page
 * so the heading and copy above them stay server-rendered — only the click
 * handlers need the client, and the prose is what search and answer engines
 * read.
 *
 * `destination` values match the atlas's existing `ai_architecture_cta_opened`
 * usage, so the field guide's exits sit in one funnel with the rest of the page
 * rather than under a second event name that means the same thing.
 */
export default function RunItCta() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-5">
      <Link
        href="/ai-architect#run"
        onClick={() =>
          trackEvent('ai_architecture_cta_opened', {
            destination: 'ai_architect_run',
            placement: 'field_guide_close',
          })
        }
        className={`inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-100 ${FOCUS_RING}`}
      >
        Run the architecture review
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      {/*
        Same label as the /ai-architect hero, so it resolves to the same thing:
        the file itself, not the page describing it. A plain anchor because this
        is a static asset rather than a route.
      */}
      <a
        href="/skills/ai-architect-review/SKILL.md"
        onClick={() =>
          trackEvent('ai_architecture_cta_opened', {
            destination: 'skill_file',
            placement: 'field_guide_close',
          })
        }
        className={`rounded-sm text-sm font-medium text-slate-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white ${FOCUS_RING}`}
      >
        Get the skill (MIT)
      </a>
    </div>
  )
}
